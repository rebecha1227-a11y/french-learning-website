"use strict";
const { nav:_nav, profile, aiTips, dashboard,
        curriculum, questionBank, mistakes, youtube } = window.siteData;

const TASK_KEY      = "fq-tasks-v3";
const MISTAKE_KEY   = "fq-mistakes-v3";
const EXAM_KEY      = "fq-exam-date";
const STUDY_LOG_KEY = "fq-study-log"; // { "2025-06-01": { done: 2, total: 4 } }

let selectedUnitId  = curriculum.books[0].units[0].id;
let activeUnitTab   = "lecture";
const renderedPages = new Set();

/* ── helpers ── */
function esc(s){ return String(s ?? "").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;") }
function getTasks(){ try{ return JSON.parse(localStorage.getItem(TASK_KEY)||"[]") }catch{ return [] } }
function saveTasks(a){ localStorage.setItem(TASK_KEY, JSON.stringify(a)) }
function getMistakes(){ try{ return JSON.parse(localStorage.getItem(MISTAKE_KEY)||"[]") }catch{ return [] } }
function saveMistakes(a){ localStorage.setItem(MISTAKE_KEY, JSON.stringify(a)) }
function getExamDate(){ return localStorage.getItem(EXAM_KEY) || "2027-05-01" }
function saveExamDate(d){ localStorage.setItem(EXAM_KEY, d) }
function getStudyLog(){ try{ return JSON.parse(localStorage.getItem(STUDY_LOG_KEY)||"{}") }catch{ return {} } }
function saveStudyLog(o){ localStorage.setItem(STUDY_LOG_KEY, JSON.stringify(o)) }

/* ── FIX #4: 北京时间 today ── */
function getTodayBJT(){
  return new Date(new Date().toLocaleString("en-US", {timeZone:"Asia/Shanghai"}))
    .toISOString().slice(0,10);
}

/* today's date as YYYY-MM-DD（统一用北京时间） */
function todayStr(){ return getTodayBJT(); }

/* ── FIX #6: 答案比对核心函数 ── */
function editDistance(a, b){
  const m = a.length, n = b.length;
  const dp = Array.from({length:m+1}, (_,i) => Array.from({length:n+1}, (_,j) => i===0?j:j===0?i:0));
  for(let i=1;i<=m;i++) for(let j=1;j<=n;j++){
    dp[i][j] = a[i-1]===b[j-1] ? dp[i-1][j-1]
      : 1 + Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]);
  }
  return dp[m][n];
}

function strSimilarity(a, b){
  const longer = a.length >= b.length ? a : b;
  const shorter = a.length >= b.length ? b : a;
  if(!longer.length) return 1.0;
  return (longer.length - editDistance(longer, shorter)) / longer.length;
}

function normalizeAnswer(s){
  return String(s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")   // 去掉变音符
    .replace(/[.,!?;:'"()\-–—«»]/g, "") // 去掉标点
    .replace(/\s+/g, " ")
    .trim();
}

/* 判断用户答案是否正确（支持多种答案 / 相近匹配） */
function checkAnswerCorrect(userRaw, correctRaw){
  if(!correctRaw) return false;
  const user = normalizeAnswer(userRaw);
  if(!user) return false;

  // correctRaw 可能含多个答案，用 / 或 , 分隔
  const answers = String(correctRaw).split(/[/,]/).map(a => normalizeAnswer(a));

  for(const ans of answers){
    if(!ans) continue;
    // 完全相等（标点归一化后）
    if(user === ans) return true;
    // 相似度 > 0.82（允许1-2个字母拼写错误）
    if(strSimilarity(user, ans) > 0.82) return true;
    // 用户答案包含标准答案 or 反之（针对短答案）
    if(ans.length <= 6 && (user.includes(ans) || ans.includes(user))) return true;
  }
  return false;
}

function normalizeForMatch(s){
  return String(s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function getCurrentUserObj(){
  return typeof window.getUser === "function" ? window.getUser() : null;
}

function inferNameFromEmail(email){
  const raw = String(email || "").split("@")[0].trim();
  return raw || "学习者";
}

function getDisplayName(){
  const user = getCurrentUserObj();
  const metaName = user?.user_metadata?.username || user?.user_metadata?.name;
  if(metaName && String(metaName).trim()) return String(metaName).trim();
  const savedName = localStorage.getItem("fq-username");
  if(savedName && savedName.trim()) return savedName.trim();
  if(user?.email) return inferNameFromEmail(user.email);
  return profile?.name || "学习者";
}

function compactDisplayName(name){
  const s = String(name || "").trim();
  if(!s) return "学习者";
  return s.length > 16 ? `${s.slice(0,16)}…` : s;
}

function getCompletionRate(tasks = getTasks()){
  if(!tasks.length) return 0;
  return Math.round(tasks.filter(t => t.done).length / tasks.length * 100);
}

function getLast7DaysDone(log = getStudyLog()){
  let sum = 0;
  for(let i = 0; i < 7; i++){
    const d = new Date(new Date().toLocaleString("en-US",{timeZone:"Asia/Shanghai"}));
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0,10);
    const entry = log[key];
    if(entry?.done) sum += entry.done;
  }
  return sum;
}

function taskRelatesToUnit(task, unit){
  if(!task || !unit) return false;
  if(task.unitId && task.unitId === unit.id) return true;
  const hay = normalizeForMatch(`${task.title || ""} ${task.detail || ""}`);
  if(!hay) return false;
  const code = normalizeForMatch(unit.code || "");
  const title = normalizeForMatch(unit.title || "");
  return (code && hay.includes(code)) || (title && hay.includes(title));
}

/* Update study log for a given date based on tasks */
function syncStudyLog(dateStr){
  const tasks  = getTasks().filter(t => (t.date||todayStr()) === dateStr);
  const log    = getStudyLog();
  if(tasks.length){
    log[dateStr] = { done: tasks.filter(t=>t.done).length, total: tasks.length };
  } else {
    delete log[dateStr];
  }
  saveStudyLog(log);
}

/* ── FIX #5: 顺延未完成任务到今天 ── */
function carryOverIncompleteTasks(){
  const today = todayStr();
  const tasks = getTasks();
  let changed = false;
  tasks.forEach(t => {
    if(!t.done && t.date && t.date < today){
      t.date = today;
      changed = true;
    }
  });
  if(changed){
    saveTasks(tasks);
    syncStudyLog(today);
  }
}

function getAllUnits(){
  return curriculum.books.flatMap((b,bi) =>
    b.units.map((u,ui) => ({
      ...u,
      level: b.level,
      progress: computeUnitProgress(u.id, bi, ui)
    }))
  );
}

function computeUnitProgress(unitId, bi, ui){
  const unit    = curriculum.books?.[bi]?.units?.[ui] || { id:unitId };
  const tasks   = getTasks();
  const related = tasks.filter(t => taskRelatesToUnit(t, unit));
  if(!related.length) return 0;
  const pct = Math.round(related.filter(t=>t.done).length / related.length * 100);
  return Math.max(0, Math.min(100, pct));
}

function getSelectedUnit(){ return getAllUnits().find(u => u.id === selectedUnitId) || getAllUnits()[0] }

function getCountdownDays(){
  const examDate = getExamDate();
  const now = new Date(new Date().toLocaleString("en-US",{timeZone:"Asia/Shanghai"}));
  const exam = new Date(examDate);
  const d = exam - new Date(now.toDateString());
  return Math.max(0, Math.ceil(d/86400000));
}

/* ── NAV ── */
const NAV_ITEMS = [
  { id:"dashboard",     label:"今日学习",  icon:"◉", desc:"任务、进度、今日计划" },
  { id:"curriculum",    label:"课程主线",  icon:"✦", desc:"教材单元、讲义、练习" },
  { id:"question-bank", label:"题库中心",  icon:"◎", desc:"真题、相似题、筛选练习" },
  { id:"mistakes",      label:"错题复盘",  icon:"※", desc:"记录错题、错因分析、二刷" },
  { id:"youtube",       label:"视频补充",  icon:"▶", desc:"YouTube 解析与扩展学习" },
];

/* ── PAGE ROUTING ── */
window.showPage = function(pageId){
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.querySelectorAll(".inner-page").forEach(p => { p.innerHTML = ""; });
  document.querySelectorAll(".tnav-btn, .tnav-home").forEach(b => b.classList.remove("active"));

  if(pageId === "home"){
    document.getElementById("page-home").classList.add("active");
    document.querySelector(".tnav-home")?.classList.add("active");
    window.scrollTo({top:0, behavior:"smooth"});
    return;
  }

  document.querySelectorAll(".tnav-btn").forEach(b => {
    b.classList.toggle("active", b.dataset.page === pageId);
  });

  const el = document.getElementById("page-"+pageId);
  if(!el) return;
  el.classList.add("active");
  renderInnerPage(pageId, el);
  window.scrollTo({top:0, behavior:"smooth"});
};

function renderInnerPage(id, el){
  const item   = NAV_ITEMS.find(n => n.id === id) || { label:id, desc:"" };
  const showHeader = id !== "unit-detail";
  const header = showHeader ? `<div class="inner-header">
    <button class="inner-back-btn" onclick="showPage('home')">← 首页</button>
    <span class="inner-page-title">${esc(item.label)}</span>
    <span class="inner-page-sub">${esc(item.desc)}</span>
  </div>` : "";
  let body = "";
  switch(id){
    case "dashboard":     body = buildDashboard();   break;
    case "curriculum":    body = buildCurriculum();  break;
    case "unit-detail":   body = buildUnitDetail();  break;
    case "question-bank": body = buildQBank();       break;
    case "mistakes":      body = buildMistakes();    break;
    case "youtube":       body = buildYoutube();     break;
  }
  el.innerHTML = header + body;
  if(id === "dashboard")   bindDashboardEvents(el);
  if(id === "curriculum")  bindCurriculumEvents(el);
  if(id === "unit-detail") bindUnitDetailEvents(el);
  if(id === "mistakes")    bindMistakeEvents(el);
}

/* ── TOPBAR ── */
function renderTopbar(){
  const nav = document.getElementById("topbar-nav");
  document.getElementById("topbar-days").textContent = getCountdownDays();

  const home = document.createElement("button");
  home.className = "tnav-home active";
  home.textContent = "⌂ 首页";
  home.onclick = () => showPage("home");
  nav.appendChild(home);

  NAV_ITEMS.forEach(item => {
    const btn = document.createElement("button");
    btn.className = "tnav-btn";
    btn.dataset.page = item.id;
    btn.innerHTML = `<span class="tnav-icon">${item.icon}</span>${item.label}`;
    btn.onclick = () => showPage(item.id);
    nav.appendChild(btn);
  });
}

/* ── FIX #3: 连续打卡 streak ── */
/* 从昨天开始往前数，再单独判断今天是否打卡 */
function computeStreak(log){
  const bjt = new Date(new Date().toLocaleString("en-US",{timeZone:"Asia/Shanghai"}));
  const todayKey = bjt.toISOString().slice(0,10);

  let streak = 0;
  // 先从昨天往前检查
  const d = new Date(bjt);
  d.setDate(d.getDate() - 1);
  while(true){
    const key = d.toISOString().slice(0,10);
    const entry = log[key];
    if(entry && entry.done > 0){ streak++; d.setDate(d.getDate()-1); }
    else break;
  }
  // 今天若已打卡，streak +1
  const todayEntry = log[todayKey];
  if(todayEntry && todayEntry.done > 0) streak++;

  return streak > 0 ? streak+" 天" : "0 天";
}

/* ── PROFILE CARD ── */
function renderProfileCard(){
  const card      = document.getElementById("profile-card");
  if(!card) return;

  const log       = getStudyLog();
  const tasks     = getTasks();
  const today     = todayStr();
  const todayLog  = log[today] || { done:0, total:0 };
  const streak    = computeStreak(log);
  const examDate  = getExamDate();
  const username  = compactDisplayName(getDisplayName());
  const user      = getCurrentUserObj();
  const loggedIn  = !!user;
  const totalDone = tasks.filter(t => t.done).length;
  const completionRate = getCompletionRate(tasks);

  card.innerHTML = `
    <div class="profile-head">
      <div class="profile-avatar">${loggedIn ? "已登录" : "访客"}</div>
      <div class="profile-identity">
        <span class="profile-name vt">${esc(username)}</span>
        <p class="profile-meta">A1 → B1</p>
        <p class="profile-meta" style="font-size:11px;margin-top:1px">🎯 TCF Canada ${esc(examDate)}</p>
        <p class="profile-email">${esc(user?.email || "未登录，本地模式")}</p>
      </div>
      <div class="profile-actions">
        ${loggedIn ? `<button class="profile-settings-btn" id="profile-settings-btn">设置</button>` : ""}
        <button class="profile-auth-btn ${loggedIn ? "logout" : "login"}" id="profile-auth-btn">
          ${loggedIn ? "退出" : "登录"}
        </button>
      </div>
    </div>
    <div class="profile-stats">
      <div class="profile-stat">
        <span class="profile-stat-val">${totalDone}</span>
        <span class="profile-stat-key">累计完成任务</span>
      </div>
      <div class="profile-stat">
        <span class="profile-stat-val">${completionRate}<small style="font-size:11px">%</small></span>
        <span class="profile-stat-key">总体完成率</span>
      </div>
      <div class="profile-stat">
        <span class="profile-stat-val">${streak}</span>
        <span class="profile-stat-key">连续打卡</span>
      </div>
      <div class="profile-stat">
        <span class="profile-stat-val" style="font-size:13px;color:var(--accent-green)">${todayLog.done}/${todayLog.total||"—"}</span>
        <span class="profile-stat-key">今日完成</span>
      </div>
    </div>`;

  card.querySelector("#profile-auth-btn")?.addEventListener("click", window.handleProfileAuthClick);
  card.querySelector("#profile-settings-btn")?.addEventListener("click", () => {
    if(typeof window.openProfileSettings === "function") window.openProfileSettings();
  });
}

/* ── FIX #1: 退出登录——即使 Supabase 超时也强制清除本地状态 ── */
window.handleProfileAuthClick = async function(event){
  const btn = event?.currentTarget || event?.target;
  if(typeof window.isLoggedIn === "function" && window.isLoggedIn()){
    if(btn){
      btn.disabled = true;
      btn.textContent = "退出中…";
    }
    try {
      if(typeof window.doLogout === "function"){
        // 给 doLogout 8 秒，超时就强制本地退出
        const result = await Promise.race([
          window.doLogout(),
          new Promise(resolve => setTimeout(() => resolve("timeout"), 8000))
        ]);
        if(result === "timeout"){
          console.warn("退出超时，强制本地清除");
          forceLocalLogout();
        }
      } else {
        forceLocalLogout();
      }
    } catch(e) {
      console.error("退出异常:", e);
      forceLocalLogout();
    }
    return;
  }
  if(typeof window.openAuthModal === "function") window.openAuthModal();
};

function forceLocalLogout(){
  // 清除认证相关 localStorage，保留学习数据
  ["supabase.auth.token", "sb-kpzkcxuvqxcvlkcffoxm-auth-token"].forEach(k => {
    try{ localStorage.removeItem(k); }catch{}
  });
  // 同时尝试清除所有 supabase session key
  Object.keys(localStorage).forEach(k => {
    if(k.startsWith("sb-") && k.endsWith("-auth-token")) localStorage.removeItem(k);
  });
  // 强制刷新页面（最稳妥的方式）
  window.location.reload();
}

const ICON_MAP = {
  dashboard:     { icon:"◉", color:"var(--accent-blue)"   },
  curriculum:    { icon:"✦", color:"var(--accent-gold)"   },
  "question-bank":{ icon:"◎", color:"var(--accent-green)"  },
  mistakes:      { icon:"※", color:"var(--accent-rose)"   },
  youtube:       { icon:"▶", color:"var(--accent-purple)" },
};

function renderFeatureNav(){
  const g = document.getElementById("feature-nav-grid");
  g.innerHTML = NAV_ITEMS.map(item => {
    const c = ICON_MAP[item.id] || { icon:"•", color:"var(--text-sub)" };
    return `<button class="feature-nav-btn" data-page="${esc(item.id)}">
      <span class="feature-nav-icon" style="color:${c.color}">${c.icon}</span>
      <span class="feature-nav-label" style="color:${c.color}">${esc(item.label)}</span>
      <span class="feature-nav-desc">${esc(item.desc)}</span>
    </button>`;
  }).join("");
  g.querySelectorAll(".feature-nav-btn").forEach(b =>
    b.addEventListener("click", () => showPage(b.dataset.page))
  );
}

/* ── FIX #5: 标签内联编辑 ── */
function makeTagEditable(tagEl, task){
  tagEl.style.cursor = "pointer";
  tagEl.title = "点击修改标签";
  tagEl.addEventListener("click", e => {
    e.stopPropagation();
    const options = ["讲义","练习","复盘","真题","视频","复习"];
    const sel = document.createElement("select");
    sel.style.cssText = "padding:2px 4px;font-size:12px;border:1px solid var(--border);border-radius:2px;background:var(--bg-inset);color:var(--text-main);cursor:pointer";
    options.forEach(opt => {
      const o = document.createElement("option");
      o.value = opt; o.textContent = opt;
      if(opt === task.type) o.selected = true;
      sel.appendChild(o);
    });
    tagEl.replaceWith(sel);
    sel.focus();
    const commit = () => {
      const ts = getTasks();
      const t = ts.find(x => x.id === task.id);
      if(t){ t.type = sel.value; saveTasks(ts); }
      task.type = sel.value;
      const newTag = document.createElement("span");
      newTag.className = "task-tag";
      newTag.dataset.t = sel.value;
      newTag.textContent = sel.value;
      sel.replaceWith(newTag);
      makeTagEditable(newTag, task);
      renderTodayTasks();
      renderProfileCard();
    };
    sel.addEventListener("change", commit);
    sel.addEventListener("blur", () => {
      // 如果没有 change，还原
      setTimeout(() => {
        if(sel.parentNode){
          const newTag = document.createElement("span");
          newTag.className = "task-tag";
          newTag.dataset.t = task.type;
          newTag.textContent = task.type;
          sel.replaceWith(newTag);
          makeTagEditable(newTag, task);
        }
      }, 150);
    });
  });
}

/* ── TODAY TASKS (home page widget) ── */
function renderTodayTasks(){
  carryOverIncompleteTasks(); // FIX #5: 自动顺延

  const el       = document.getElementById("today-tasks-card");
  const today    = todayStr();
  const tasks    = getTasks();
  const log      = getStudyLog();
  const weekDone = getLast7DaysDone(log);
  const overallCompletion = getCompletionRate(tasks);

  const activeDate = el.dataset.activeDate || today;
  const dayTasks   = tasks.filter(t => (t.date||today) === activeDate);
  const done       = dayTasks.filter(t => t.done).length;

  el.dataset.activeDate = activeDate;

  el.innerHTML = `
    <div class="card-header-row">
      <span class="card-title">📅 今日学习任务</span>
      <span class="streak-badge">🔥 ${computeStreak(getStudyLog())}</span>
    </div>
    <div class="date-selector-row">
      <label class="form-label" style="font-size:11px;color:var(--text-dim);margin-right:6px">日期</label>
      <input class="form-input" id="ht-date" type="date" value="${activeDate}" style="width:auto;padding:4px 8px;font-size:12px"/>
    </div>
    <div class="add-task-row" style="margin-top:8px">
      <input class="add-task-input" id="ht-inp" type="text" placeholder="添加今日任务…"/>
      <select class="add-task-select" id="ht-sel">
        <option>讲义</option><option>练习</option><option>复盘</option>
        <option>真题</option><option>视频</option><option>复习</option>
      </select>
      <button class="add-task-btn" id="ht-add">＋</button>
    </div>
    <div class="task-list" id="ht-list">
      ${dayTasks.length ? dayTasks.map(t => {
        // FIX #7: 复习任务显示原题信息
        const isReview = t.type === "复习" && t.reviewData;
        return `
          <div class="task-item ${t.done?"done":""}" data-tid="${esc(t.id)}">
            <div class="task-cb">${t.done?"✓":""}</div>
            <div class="task-body">
              <div class="task-title">${esc(t.title)}</div>
              ${isReview ? `<div class="task-review-box">
                <span class="task-review-q">📝 ${esc(t.reviewData.question?.slice(0,60) || "")}…</span>
                <span class="task-review-ans">正确答案：${esc(t.reviewData.correctAnswer || "")}</span>
              </div>` : `<div class="task-detail">${esc(t.detail||t.time||"")}</div>`}
            </div>
            <span class="task-tag" data-t="${esc(t.type)}">${esc(t.type)}</span>
            <button class="btn-danger btn-small" data-dt="${esc(t.id)}" style="margin-left:4px;flex-shrink:0">✕</button>
          </div>`;
      }).join("") : `<div class="task-empty">这一天还没有任务，先添加一个学习目标吧。</div>`}
    </div>
    <div class="task-summary-row">
      <div class="task-summary-box">
        <span class="task-summary-val">${done}<small style="font-size:13px">/${dayTasks.length}</small></span>
        <div class="task-summary-key">今日完成</div>
      </div>
      <div class="task-summary-box">
        <span class="task-summary-val" style="color:var(--accent-gold)">${weekDone}</span>
        <div class="task-summary-key">近7天完成</div>
      </div>
      <div class="task-summary-box">
        <span class="task-summary-val" style="color:var(--accent-rose)">${overallCompletion}%</span>
        <div class="task-summary-key">总体完成率</div>
      </div>
    </div>`;

  // FIX #5: 标签内联编辑
  el.querySelectorAll(".task-tag[data-t]").forEach(tagEl => {
    const tid = tagEl.closest("[data-tid]")?.dataset.tid;
    const task = dayTasks.find(t => t.id === tid);
    if(task) makeTagEditable(tagEl, task);
  });

  document.getElementById("ht-date").addEventListener("change", e => {
    el.dataset.activeDate = e.target.value;
    renderTodayTasks();
    renderHeatmap();
    renderProfileCard();
  });

  el.querySelectorAll(".task-item[data-tid]").forEach(item =>
    item.addEventListener("click", e => {
      if(e.target.closest("[data-dt]") || e.target.tagName === "SELECT") return;
      const ts = getTasks();
      const t  = ts.find(x => x.id === item.dataset.tid);
      if(t){
        t.done = !t.done;
        saveTasks(ts);
        syncStudyLog(t.date || today);
        if(window.syncTask) syncTask(t);
        const log = getStudyLog();
        if(window.syncStudyLogDay) syncStudyLogDay(t.date||today, log[t.date||today]||{done:0,total:0});
        renderTodayTasks();
        renderHeatmap();
        renderProfileCard();
        renderCourseProgress();
      }
    })
  );

  el.querySelectorAll("[data-dt]").forEach(btn =>
    btn.addEventListener("click", e => {
      e.stopPropagation();
      const ts   = getTasks();
      const t    = ts.find(x => x.id === btn.dataset.dt);
      const dStr = t?.date || today;
      if(window.deleteTask) deleteTask(btn.dataset.dt);
      saveTasks(ts.filter(x => x.id !== btn.dataset.dt));
      syncStudyLog(dStr);
      const log = getStudyLog();
      if(window.syncStudyLogDay && log[dStr]) syncStudyLogDay(dStr, log[dStr]);
      if(window.deleteStudyLogDay && !log[dStr]) deleteStudyLogDay(dStr);
      renderTodayTasks();
      renderHeatmap();
      renderProfileCard();
      renderCourseProgress();
    })
  );

  const addFn = () => {
    const inp  = document.getElementById("ht-inp");
    const sel  = document.getElementById("ht-sel");
    const v    = inp.value.trim();
    if(!v) return;
    const ts   = getTasks();
    const date = el.dataset.activeDate || today;
    const newTask = { id:"t-"+Date.now(), title:v, type:sel.value, done:false, detail:"", date };
    ts.push(newTask);
    saveTasks(ts);
    syncStudyLog(date);
    if(window.syncTask) syncTask(newTask);
    const log = getStudyLog();
    if(window.syncStudyLogDay) syncStudyLogDay(date, log[date]||{done:0,total:0});
    inp.value = "";
    renderTodayTasks();
    renderHeatmap();
    renderProfileCard();
    renderCourseProgress();
  };
  document.getElementById("ht-add").addEventListener("click", addFn);
  document.getElementById("ht-inp").addEventListener("keydown", e => { if(e.key==="Enter") addFn(); });
}

/* ── COURSE PROGRESS ── */
function renderCourseProgress(){
  const el    = document.getElementById("course-progress-card");
  const units = getAllUnits().slice(0,8);
  el.innerHTML = `
    <div class="card-header-row">
      <span class="card-title">📚 课程进度</span>
      <button class="btn-ghost" onclick="showPage('curriculum')" style="font-size:11px;padding:4px 9px">全部 →</button>
    </div>
    <div class="progress-unit-list">
      ${units.map(u => `
        <div class="progress-unit-row">
          <span class="progress-unit-label" title="${esc(u.title)}">${esc(u.code)} ${esc(u.title)}</span>
          <div class="progress-bar-wrap">
            <div class="progress-bar-fill ${u.progress>=100?"done":""}" style="width:${u.progress}%"></div>
          </div>
          <span class="prog-pct">${u.progress}%</span>
        </div>`).join("")}
    </div>`;
}

/* ── COUNTDOWN ── */
function renderCountdown(){
  const examDate = getExamDate();
  const days     = getCountdownDays();
  document.getElementById("countdown-card").innerHTML = `
    <div style="text-align:center;padding:6px 0 4px">
      <span class="cd-num">${days}</span>
      <span class="cd-label">天后考试</span>
      <p class="cd-target">${esc(examDate)} · TCF Canada</p>
      <span class="cd-goal">目标 B1 · NCLC</span>
    </div>
    <div style="margin-top:10px;display:flex;align-items:center;gap:6px;justify-content:center">
      <label style="font-size:11px;color:var(--text-dim)">自定义考试日期</label>
      <input id="exam-date-input" type="date" value="${esc(examDate)}"
        style="padding:3px 7px;background:var(--bg-inset);border:1px solid var(--border);
               border-radius:var(--card-r);font-size:12px;color:var(--text-main)"/>
      <button id="exam-date-save" class="btn-ghost btn-small">保存</button>
    </div>`;

  document.getElementById("exam-date-save").addEventListener("click", () => {
    const val = document.getElementById("exam-date-input").value;
    if(!val) return;
    saveExamDate(val);
    if(window.syncExamDate) syncExamDate(val);
    renderCountdown();
    renderProfileCard();
    document.getElementById("topbar-days").textContent = getCountdownDays();
  });
}

/* ── FIX #4: 热力图——按月渲染 + 北京时间 + 正确的星期对应 ── */
function renderHeatmap(){
  const el  = document.getElementById("heatmap-card");
  const log = getStudyLog();

  // 北京时间
  const bjt   = new Date(new Date().toLocaleString("en-US",{timeZone:"Asia/Shanghai"}));
  const year  = bjt.getFullYear();
  const month = bjt.getMonth(); // 0-based
  const todayDate = bjt.getDate();

  // 当前北京时间字符串，用于右上角显示
  const timeStr = bjt.toLocaleString("zh-CN",{
    timeZone:"Asia/Shanghai",
    year:"numeric", month:"2-digit", day:"2-digit",
    hour:"2-digit", minute:"2-digit"
  });

  // 本月第一天是星期几（周日=0, 周一=1…）
  const firstDayOfWeek = new Date(year, month, 1).getDay(); // 0=Sunday
  // 本月总天数
  const daysInMonth = new Date(year, month+1, 0).getDate();

  // 星期标签，从周日开始
  const dayLabels = ["日","一","二","三","四","五","六"];

  // 构建每一天的 cell，先填 offset 空格，再填日期格
  let cellsHtml = "";
  // 空白占位（让1号对准正确的列）
  for(let i=0; i<firstDayOfWeek; i++){
    cellsHtml += `<div class="hm-cell hm-empty"></div>`;
  }
  for(let d=1; d<=daysInMonth; d++){
    const mm = String(month+1).padStart(2,"0");
    const dd = String(d).padStart(2,"0");
    const key = `${year}-${mm}-${dd}`;
    const e   = log[key];
    let level = 0;
    if(e && e.done > 0){
      if(e.done >= e.total) level = 3;
      else if(e.done >= e.total/2) level = 2;
      else level = 1;
    }
    const isToday = d === todayDate;
    cellsHtml += `<div class="hm-cell ${level===0?"":level===1?"l1":level===2?"l2":"l3"} ${isToday?"hm-today":""}"
      title="${year}年${month+1}月${d}日 ${["周日","周一","周二","周三","周四","周五","周六"][new Date(year,month,d).getDay()]}${e?` — 完成${e.done}/${e.total}`:""}"></div>`;
  }

  el.innerHTML = `
    <div class="card-header-row" style="margin-bottom:6px">
      <span class="card-title">🔥 学习热力图</span>
      <span style="font-size:11px;color:var(--text-dim);font-family:'VT323',monospace">${timeStr} 北京时间</span>
    </div>
    <div style="font-size:11px;color:var(--text-dim);margin-bottom:4px">${year}年${month+1}月</div>
    <div class="heatmap-week-labels">${dayLabels.map(d=>`<span class="hm-wlabel">${d}</span>`).join("")}</div>
    <div class="heatmap-grid">${cellsHtml}</div>
    <div class="heatmap-legend">少
      <span class="hm-swatch" style="background:var(--bg-card2)"></span>
      <span class="hm-swatch" style="background:#c9dbc5"></span>
      <span class="hm-swatch" style="background:#8ab88a"></span>
      <span class="hm-swatch" style="background:var(--accent-teal)"></span>
      多
    </div>`;
}

function renderAiTip(){
  document.getElementById("aitip-card").innerHTML =
    `<div class="aitip-label">🤖 AI 备考建议</div>` +
    aiTips.map(t=>`<div class="aitip-item">${esc(t)}</div>`).join("");
}

/* ══════════════════════════════════
   DASHBOARD (inner page)
══════════════════════════════════ */
function buildDashboard(){
  const today    = todayStr();
  const log      = getStudyLog();
  const tasks    = getTasks();
  const todayTasks = tasks.filter(t => (t.date||today) === today);
  const todayDone  = todayTasks.filter(t => t.done).length;
  const weekDone   = getLast7DaysDone(log);
  const overallCompletion = getCompletionRate(tasks);
  const focus = todayTasks[0]?.type || "待设置";

  // 热力图（按月，同 renderHeatmap 逻辑）
  const bjt   = new Date(new Date().toLocaleString("en-US",{timeZone:"Asia/Shanghai"}));
  const year  = bjt.getFullYear();
  const month = bjt.getMonth();
  const firstDayOfWeek = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month+1, 0).getDate();
  const todayDate = bjt.getDate();
  const dayLabels = ["日","一","二","三","四","五","六"];
  let cellsHtml = "";
  for(let i=0;i<firstDayOfWeek;i++) cellsHtml += `<div class="hm-cell hm-empty"></div>`;
  for(let d=1;d<=daysInMonth;d++){
    const key = `${year}-${String(month+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`;
    const e=log[key]; let l=0;
    if(e&&e.done>0){ l=e.done>=e.total?3:e.done>=e.total/2?2:1; }
    cellsHtml += `<div class="hm-cell ${l===0?"":l===1?"l1":l===2?"l2":"l3"} ${d===todayDate?"hm-today":""}" title="${year}年${month+1}月${d}日"></div>`;
  }

  const examDate = getExamDate();
  return `<div class="dash-content-stack">
  <div class="dash-metric-row">
    <div class="dash-metric-box">
      <span class="dash-metric-val">${todayDone}/${todayTasks.length}</span>
      <span class="dash-metric-key">今日学习完成</span>
    </div>
    <div class="dash-metric-box">
      <span class="dash-metric-val">${weekDone}</span>
      <span class="dash-metric-key">近7天完成任务</span>
    </div>
    <div class="dash-metric-box">
      <span class="dash-metric-val">${overallCompletion}%</span>
      <span class="dash-metric-key">总体完成率</span>
    </div>
    <div class="dash-metric-box">
      <span class="dash-metric-val">${esc(focus)}</span>
      <span class="dash-metric-key">当前重心</span>
    </div>
  </div>

  <div class="card card-pad">
    <div class="card-hdr"><span class="section-kicker">Exam</span><h4>考试目标设置</h4></div>
    <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
      <label style="font-size:13px;color:var(--text-sub)">目标考试日期</label>
      <input id="dash-exam-input" type="date" value="${esc(examDate)}"
        style="padding:6px 10px;background:var(--bg-inset);border:2px solid var(--border);
               border-radius:var(--card-r);font-size:13px;color:var(--text-main)"/>
      <button id="dash-exam-save" class="btn-primary" style="padding:6px 14px">保存</button>
      <span id="dash-exam-msg" style="font-size:12px;color:var(--accent-teal)"></span>
    </div>
  </div>

  <div class="card card-pad">
    <div class="card-hdr"><span class="section-kicker">Tasks</span><h4>今日学习任务</h4></div>
    <div class="date-selector-row">
      <label style="font-size:12px;color:var(--text-dim)">选择日期</label>
      <input id="dt-date" type="date" value="${today}"
        style="padding:5px 8px;background:var(--bg-inset);border:2px solid var(--border);
               border-radius:var(--card-r);font-size:12px;color:var(--text-main)"/>
    </div>
    <div class="add-task-row">
      <input class="add-task-input" id="dt-inp" type="text" placeholder="添加任务…"/>
      <select class="add-task-select" id="dt-sel">
        <option>讲义</option><option>练习</option><option>复盘</option>
        <option>真题</option><option>视频</option><option>复习</option>
      </select>
      <button class="add-task-btn" id="dt-add">＋</button>
    </div>
    <div class="stack" id="dt-list"></div>
  </div>

  <div class="card card-pad">
    <div class="card-hdr"><span class="section-kicker">Heatmap</span><h4>学习热力图</h4></div>
    <div style="font-size:11px;color:var(--text-dim);margin-bottom:4px">${year}年${month+1}月</div>
    <div class="heatmap-week-labels">${dayLabels.map(d=>`<span class="hm-wlabel">${d}</span>`).join("")}</div>
    <div class="heatmap-grid" id="dt-heatmap">${cellsHtml}</div>
    <div class="heatmap-legend">少
      <span class="hm-swatch" style="background:var(--bg-card2)"></span>
      <span class="hm-swatch" style="background:#c9dbc5"></span>
      <span class="hm-swatch" style="background:#8ab88a"></span>
      <span class="hm-swatch" style="background:var(--accent-teal)"></span>
      多
    </div>
  </div>
  </div>`;
}

function refreshDashboardList(el, dateStr){
  const tasks    = getTasks();
  const dayTasks = tasks.filter(t => (t.date||todayStr()) === dateStr);
  const list     = el.querySelector("#dt-list");
  if(!list) return;
  list.innerHTML = dayTasks.map(t=>`
    <div class="task-item ${t.done?"done":""}" data-tid="${esc(t.id)}">
      <div class="task-cb">${t.done?"✓":""}</div>
      <div class="task-body">
        <div class="task-title">${esc(t.title)}</div>
        <div class="task-detail">${esc(t.detail||t.time||"")}</div>
      </div>
      <span class="task-tag" data-t="${esc(t.type)}">${esc(t.type)}</span>
      <button class="btn-danger btn-small" data-dt="${esc(t.id)}" style="margin-left:4px;flex-shrink:0">✕</button>
    </div>`).join("");

  // 标签内联编辑
  list.querySelectorAll(".task-tag[data-t]").forEach(tagEl => {
    const tid = tagEl.closest("[data-tid]")?.dataset.tid;
    const task = dayTasks.find(t => t.id === tid);
    if(task) makeTagEditable(tagEl, task);
  });

  list.querySelectorAll(".task-item[data-tid]").forEach(item =>
    item.addEventListener("click", e => {
      if(e.target.closest("[data-dt]") || e.target.tagName === "SELECT") return;
      const ts = getTasks();
      const t  = ts.find(x => x.id === item.dataset.tid);
      if(t){
        t.done = !t.done;
        saveTasks(ts);
        syncStudyLog(t.date||todayStr());
        if(window.syncTask) syncTask(t);
        const logObj = getStudyLog();
        if(window.syncStudyLogDay) syncStudyLogDay(t.date||todayStr(), logObj[t.date||todayStr()]||{done:0,total:0});
        refreshDashboardList(el, dateStr);
        refreshDashboardHeatmap(el);
        renderTodayTasks(); renderHeatmap(); renderProfileCard(); renderCourseProgress();
      }
    })
  );
  list.querySelectorAll("[data-dt]").forEach(btn =>
    btn.addEventListener("click", e => {
      e.stopPropagation();
      const ts = getTasks();
      const t  = ts.find(x => x.id === btn.dataset.dt);
      const d  = t?.date || todayStr();
      if(window.deleteTask) deleteTask(btn.dataset.dt);
      saveTasks(ts.filter(x => x.id !== btn.dataset.dt));
      syncStudyLog(d);
      const logObj = getStudyLog();
      if(window.syncStudyLogDay && logObj[d]) syncStudyLogDay(d, logObj[d]);
      if(window.deleteStudyLogDay && !logObj[d]) deleteStudyLogDay(d);
      refreshDashboardList(el, dateStr);
      refreshDashboardHeatmap(el);
      renderTodayTasks(); renderHeatmap(); renderProfileCard(); renderCourseProgress();
    })
  );
}

function refreshDashboardHeatmap(el){
  const hm  = el.querySelector("#dt-heatmap");
  if(!hm) return;
  const log = getStudyLog();
  const bjt = new Date(new Date().toLocaleString("en-US",{timeZone:"Asia/Shanghai"}));
  const year = bjt.getFullYear();
  const month = bjt.getMonth();
  const firstDayOfWeek = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month+1, 0).getDate();
  const todayDate = bjt.getDate();
  let cellsHtml = "";
  for(let i=0;i<firstDayOfWeek;i++) cellsHtml += `<div class="hm-cell hm-empty"></div>`;
  for(let d=1;d<=daysInMonth;d++){
    const key = `${year}-${String(month+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`;
    const e=log[key]; let l=0;
    if(e&&e.done>0){ l=e.done>=e.total?3:e.done>=e.total/2?2:1; }
    cellsHtml += `<div class="hm-cell ${l===0?"":l===1?"l1":l===2?"l2":"l3"} ${d===todayDate?"hm-today":""}"></div>`;
  }
  hm.innerHTML = cellsHtml;
}

function bindDashboardEvents(el){
  let activeDate = todayStr();

  el.querySelector("#dash-exam-save")?.addEventListener("click", () => {
    const val = el.querySelector("#dash-exam-input")?.value;
    if(!val) return;
    saveExamDate(val);
    if(window.syncExamDate) syncExamDate(val);
    renderCountdown(); renderProfileCard();
    document.getElementById("topbar-days").textContent = getCountdownDays();
    const msg = el.querySelector("#dash-exam-msg");
    if(msg){ msg.textContent="✓ 已保存"; setTimeout(()=>msg.textContent="",2000); }
  });

  el.querySelector("#dt-date")?.addEventListener("change", e => {
    activeDate = e.target.value;
    refreshDashboardList(el, activeDate);
  });

  refreshDashboardList(el, activeDate);

  const addFn = () => {
    const inp = el.querySelector("#dt-inp");
    const sel = el.querySelector("#dt-sel");
    const v   = inp.value.trim();
    if(!v) return;
    const ts  = getTasks();
    const newTask = { id:"t-"+Date.now(), title:v, type:sel.value, done:false, detail:"", date:activeDate };
    ts.push(newTask);
    saveTasks(ts);
    syncStudyLog(activeDate);
    if(window.syncTask) syncTask(newTask);
    const logObj = getStudyLog();
    if(window.syncStudyLogDay) syncStudyLogDay(activeDate, logObj[activeDate]||{done:0,total:0});
    inp.value = "";
    refreshDashboardList(el, activeDate);
    refreshDashboardHeatmap(el);
    renderTodayTasks(); renderHeatmap(); renderProfileCard(); renderCourseProgress();
  };
  el.querySelector("#dt-add")?.addEventListener("click", addFn);
  el.querySelector("#dt-inp")?.addEventListener("keydown", e => { if(e.key==="Enter") addFn(); });
}

/* ══════════════════════════════════
   CURRICULUM
══════════════════════════════════ */
function buildCurriculum(){
  return `
    <p style="font-size:13px;color:var(--text-sub)">选择教材单元，进入讲义和练习题。</p>
    ${curriculum.books.map((book,bi) => `
      <div class="card card-pad">
        <div class="card-hdr">
          <span class="section-kicker">Book</span>
          <h4>${esc(book.level)}</h4>
        </div>
        <p style="font-size:12px;color:var(--text-sub);margin-bottom:10px">${esc(book.caption)}</p>
        <div class="unit-grid">
          ${book.units.map((unit,ui) => {
            const p = computeUnitProgress(unit.id, bi, ui);
            return `<button class="unit-card" data-unit-id="${esc(unit.id)}">
              <span class="unit-code">${esc(unit.code)}</span>
              <h5>${esc(unit.title)}</h5>
              <p class="unit-focus">${esc(unit.focus)}</p>
              <div class="unit-pbar"><div class="unit-pbar-fill" style="width:${p}%"></div></div>
              <span class="unit-pct">${p}%</span>
            </button>`;
          }).join("")}
        </div>
      </div>`).join("")}`;
}

function bindCurriculumEvents(el){
  el.querySelectorAll("[data-unit-id]").forEach(btn =>
    btn.addEventListener("click", () => {
      selectedUnitId = btn.dataset.unitId;
      activeUnitTab  = "lecture";
      showPage("unit-detail");
    })
  );
}

/* ══════════════════════════════════
   UNIT DETAIL
══════════════════════════════════ */
function buildUnitDetail(){
  const unit = getSelectedUnit();
  return `
    <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px;flex-wrap:wrap">
      <div>
        <span class="section-kicker">${esc(unit.level)}</span>
        <h4 style="font-family:'VT323',monospace;font-size:22px;color:var(--text-main)">
          ${esc(unit.code)} · ${esc(unit.title)}
        </h4>
        <p style="font-size:12px;color:var(--text-dim);margin-top:2px">${esc(unit.focus)}</p>
      </div>
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        <button class="btn-ghost" onclick="showPage('curriculum')">← 返回课程</button>
        <button class="btn-ghost" onclick="exportUnit('lecture')">↓ 讲义</button>
        <button class="btn-ghost" onclick="exportUnit('exercises')">↓ 练习</button>
      </div>
    </div>

    <div class="unit-tabs">
      <button class="unit-tab ${activeUnitTab==="lecture"?"active":""}" data-tab="lecture">📖 讲义</button>
      <button class="unit-tab ${activeUnitTab==="exercises"?"active":""}" data-tab="exercises">✏️ 练习题</button>
    </div>

    <div class="card card-pad" id="tab-lec">${renderLecture(unit)}</div>
    <div class="card card-pad hidden" id="tab-ex">${renderExercises(unit)}</div>`;
}

function bindUnitDetailEvents(el){
  const lec = el.querySelector("#tab-lec");
  const ex  = el.querySelector("#tab-ex");
  if(activeUnitTab==="exercises"){ lec?.classList.add("hidden"); ex?.classList.remove("hidden"); }

  el.querySelectorAll(".unit-tab[data-tab]").forEach(btn =>
    btn.addEventListener("click", () => {
      activeUnitTab = btn.dataset.tab;
      el.querySelectorAll(".unit-tab").forEach(b => b.classList.toggle("active", b.dataset.tab===activeUnitTab));
      lec?.classList.toggle("hidden", activeUnitTab!=="lecture");
      ex?.classList.toggle("hidden",  activeUnitTab!=="exercises");
    })
  );

  /* FIX #6: 修复答案判定逻辑 */
  el.querySelectorAll(".grade-btn").forEach(btn =>
    btn.addEventListener("click", () => {
      const row     = btn.closest(".ex-grade-row");
      const inp     = row.querySelector(".grade-input");
      const resEl   = row.querySelector(".grade-result");
      const correct = btn.dataset.correct || "";
      const user    = inp.value.trim();

      if(!user){
        resEl.textContent = "请先填写答案";
        resEl.className   = "grade-result wrong";
        return;
      }

      const ok = checkAnswerCorrect(user, correct);
      resEl.textContent = ok ? "✓ 正确" : `✗ 错误（参考：${correct}）`;
      resEl.className   = "grade-result "+(ok?"correct":"wrong");

      if(!ok && user){
        const unit = getSelectedUnit();
        const ml   = getMistakes();
        // 避免同一道题重复加入
        const alreadyExists = ml.some(m =>
          m.question === (btn.dataset.prompt||"练习题") && m.myAnswer === user
        );
        if(!alreadyExists){
          ml.push({
            id:            "m-"+Date.now(),
            date:          todayStr(),
            source:        unit.level+" "+unit.code,
            question:      btn.dataset.prompt||"练习题",
            myAnswer:      user,
            correctAnswer: correct,
            reason:"", reflection:"", tags:["待分析"]
          });
          saveMistakes(ml);
          if(window.syncMistake) syncMistake(ml[ml.length-1]);
          const n = document.createElement("span");
          n.textContent = " → 已加入错题池";
          n.style.cssText = "font-size:11px;color:var(--accent-rose);margin-left:6px";
          resEl.after(n);
          setTimeout(()=>n.remove(), 3000);
        }
      }
    })
  );
}

window.exportUnit = function(tab){
  const unit   = getSelectedUnit();
  const bodyEl = document.getElementById(tab==="lecture"?"tab-lec":"tab-ex");
  if(!bodyEl) return;
  const title  = `${unit.level} ${unit.code} ${unit.title}—${tab==="lecture"?"讲义":"练习题"}`;
  const html   = `<!DOCTYPE html><html lang="zh-CN"><head><meta charset="UTF-8"/>
    <title>${title}</title>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700&family=VT323&display=swap" rel="stylesheet"/>
    <style>*{box-sizing:border-box}body{font-family:'Noto Sans SC',sans-serif;max-width:820px;margin:40px auto;padding:0 28px;color:#26201a;line-height:1.75;background:#f7f0de}
    h1{font-family:'VT323',monospace;font-size:38px;margin:0 0 4px}.meta{color:#8a7a60;font-size:.85rem;margin:0 0 28px;padding-bottom:16px;border-bottom:2px solid #b8a882}
    .lec-summary,.ex-answer-box,.ex-passage{padding:10px;border:1px solid #b8a882;background:#fff8ed;margin:6px 0}
    .lec-section-label,.ex-type{font-family:'VT323',monospace;color:#3f62a0}
    .lec-table{width:100%;border-collapse:collapse}.lec-table th,.lec-table td{border:1px solid #b8a882;padding:7px 10px;text-align:left}
    .lec-table th{background:#ede3c8}.lec-examples{padding:10px;border:1px solid #b8a882;background:#fff8ed}
    .lec-example-row{display:grid;grid-template-columns:1fr 1fr;gap:10px;font-size:13px}
    .lec-vocab-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:6px}
    .lec-vocab-card{padding:8px;border:1px solid #b8a882;background:#fff8ed}
    .ex-list{padding-left:18px}.grade-btn,.grade-input,.grade-result{display:none}
    @media print{details{display:block}}</style>
    </head><body><h1>${title}</h1>
    <p class="meta">TCF Canada 备考·导出 ${new Date().toLocaleDateString("zh-CN",{year:"numeric",month:"long",day:"numeric"})}</p>
    ${bodyEl.innerHTML}</body></html>`;
  const blob = new Blob([html], {type:"text/html;charset=utf-8"});
  const a    = document.createElement("a");
  a.href     = URL.createObjectURL(blob);
  a.download = `${unit.code.replace(/\s/g,"_")}_${tab==="lecture"?"讲义":"练习题"}.html`;
  a.click();
  URL.revokeObjectURL(a.href);
};

/* ══════════════════════════════════
   QUESTION BANK
══════════════════════════════════ */
function buildQBank(){
  return `
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:9px">
      ${questionBank.stats.map(s=>`
        <div class="dash-metric-box">
          <span class="dash-metric-val">${esc(s.value)}</span>
          <span class="dash-metric-key">${esc(s.label)}</span>
        </div>`).join("")}
    </div>
    <div class="split-layout">
      <div class="card card-pad">
        <div class="card-hdr"><span class="section-kicker">Modules</span><h4>模块设计</h4></div>
        <div class="stack">
          ${questionBank.modules.map(m=>`
            <div class="info-card"><h5>${esc(m.name)}</h5>
            <p style="font-size:13px;color:var(--text-sub)">${esc(m.description)}</p></div>`).join("")}
        </div>
      </div>
      <div class="card card-pad">
        <div class="card-hdr"><span class="section-kicker">Flows</span><h4>推荐节奏</h4></div>
        <ul class="bullet-list">${questionBank.flows.map(f=>`<li>${esc(f)}</li>`).join("")}</ul>
      </div>
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:10px">
      ${(questionBank.items||[]).map(item=>`
        <div class="qb-card">
          <div style="display:flex;gap:7px;flex-wrap:wrap;margin-bottom:4px">
            <span class="difficulty-badge" data-level="${esc(item.difficulty)}">${esc(item.difficulty)}</span>
            <span class="status-pill">${esc(item.status)}</span>
          </div>
          <h5>${esc(item.title)}</h5>
          <p style="font-size:12px;color:var(--text-sub)">${esc(item.description)}</p>
          <span class="resource-link">模块：${esc(item.module)}</span>
        </div>`).join("")}
    </div>`;
}

/* ══════════════════════════════════
   MISTAKES
══════════════════════════════════ */
const UNIT_OPTS    = getAllUnits().map(u=>`<option value="${esc(u.id)}">${esc(u.level)} ${esc(u.code)} ${esc(u.title)}</option>`).join("");
const DEFAULT_TAGS = ["语法","词汇","听力","阅读","审题","表达","待分析"];

function buildMistakes(){
  const ml      = getMistakes();
  const allTags = [...new Set([...DEFAULT_TAGS,...ml.flatMap(m=>m.tags||[])])];
  const tableHtml = ml.length===0
    ? `<p style="color:var(--text-dim);font-size:13px;padding:16px 0">还没有错题记录。做练习题时答错会自动加入，也可以手动填写。</p>`
    : `<div class="mistake-table-wrap"><table class="mistake-table" id="mistake-table">
        <thead><tr><th>日期</th><th>来源</th><th>题目</th><th>我的答案</th><th>正确答案</th><th>错误原因</th><th>反思</th><th>标签</th><th>操作</th></tr></thead>
        <tbody>${ml.map(m=>`
          <tr data-tags="${(m.tags||[]).join(",")}">
            <td>${esc(m.date)}</td><td>${esc(m.source)}</td>
            <td class="editable-cell" data-field="question" data-mid="${esc(m.id)}">${esc(m.question)}</td>
            <td style="color:var(--accent-rose)">${esc(m.myAnswer)}</td>
            <td style="color:var(--accent-green)">${esc(m.correctAnswer)}</td>
            <td class="editable-cell" data-field="reason" data-mid="${esc(m.id)}" contenteditable="true" style="min-width:80px;cursor:text">${esc(m.reason)}</td>
            <td class="editable-cell" data-field="reflection" data-mid="${esc(m.id)}" contenteditable="true" style="min-width:80px;cursor:text">${esc(m.reflection)}</td>
            <td>
              <div class="mistake-tag-cell" data-mid="${esc(m.id)}">
                ${(m.tags||[]).map(t=>`<span class="mistake-cat-tag selectable-tag" data-tag="${esc(t)}">${esc(t)}</span>`).join(" ")}
                <button class="btn-ghost btn-small mis-add-tag-btn" data-mid="${esc(m.id)}" style="font-size:10px;padding:1px 5px;margin-top:2px">＋标签</button>
              </div>
            </td>
            <td style="white-space:nowrap">
              <button class="btn-danger btn-small" data-dm="${esc(m.id)}">删</button><br>
              <button class="btn-ghost btn-small" data-at="${esc(m.id)}" style="margin-top:3px">复习</button>
            </td>
          </tr>`).join("")}
        </tbody>
      </table></div>`;

  return `
    <div class="card card-pad">
      <div class="card-hdr"><span class="section-kicker">Record</span><h4>新增错题记录</h4></div>
      <div class="mistake-form">
        <div class="form-row">
          <div><label class="form-label">日期</label><input class="form-input" id="mf-date" type="date" value="${todayStr()}"/></div>
          <div><label class="form-label">来源</label>
            <select class="form-select" id="mf-src">
              <option value="">选择来源</option>
              <optgroup label="单元">${UNIT_OPTS}</optgroup>
              <option value="tcf-real">TCF 真题</option>
              <option value="similar">相似题</option>
            </select>
          </div>
        </div>
        <div><label class="form-label">题目内容</label><input class="form-input" id="mf-q" type="text" placeholder="输入题目内容…"/></div>
        <div class="form-row">
          <div><label class="form-label">我的错误答案</label><input class="form-input" id="mf-my" type="text"/></div>
          <div><label class="form-label">正确答案</label><input class="form-input" id="mf-cor" type="text"/></div>
        </div>
        <div><label class="form-label">错误原因 & 原答题思路</label><textarea class="form-textarea" id="mf-reason" placeholder="为什么错了？当时怎么想的？"></textarea></div>
        <div><label class="form-label">反思</label><textarea class="form-textarea" id="mf-ref" placeholder="下次遇到同类题应该怎么做？"></textarea></div>
        <div><label class="form-label">标签</label>
          <div class="tag-filter-row" id="mf-tags">
            ${DEFAULT_TAGS.map(t=>`<span class="tag-pill" style="border-color:var(--accent-purple);color:var(--accent-purple)" data-tag="${esc(t)}">${esc(t)}</span>`).join("")}
          </div>
        </div>
        <div style="display:flex;gap:9px">
          <button class="btn-primary" id="mf-submit">保存错题</button>
          <button class="btn-ghost" id="mf-clear">清空</button>
        </div>
      </div>
    </div>
    <div class="card card-pad">
      <div class="card-hdr" style="flex-wrap:wrap;gap:10px">
        <div><span class="section-kicker">Pool</span><h4>错题池（${ml.length}条）</h4></div>
        <div style="display:flex;gap:8px">
          <button class="btn-ghost btn-small" id="exp-mis">↓ 导出CSV</button>
          <button class="btn-danger btn-small" id="clr-all">清空全部</button>
        </div>
      </div>
      <div class="tag-filter-row" id="mis-filter">
        <span class="tag-pill selected" style="background:var(--accent-purple);border-color:var(--accent-purple);color:white" data-filter="全部">全部</span>
        ${allTags.map(t=>`<span class="tag-pill" style="border-color:var(--accent-purple);color:var(--accent-purple)" data-filter="${esc(t)}">${esc(t)}</span>`).join("")}
      </div>
      ${tableHtml}
      <p style="font-size:11px;color:var(--text-dim);margin-top:6px">💡 错误原因和反思列可直接点击编辑。点击标签旁的"＋标签"可添加/修改标签。点击"复习"将题目加入今日学习任务。</p>
    </div>
    <div class="card card-pad">
      <div class="card-hdr"><span class="section-kicker">Loop</span><h4>错题复习循环</h4></div>
      <div class="split-layout">
        <div><ol class="number-list">${mistakes.loop.map(l=>`<li>${esc(l)}</li>`).join("")}</ol></div>
        <div><ul class="bullet-list">${mistakes.categories.map(c=>`<li>${esc(c)}</li>`).join("")}</ul></div>
      </div>
    </div>`;
}

function bindMistakeEvents(el){
  let selTags = ["待分析"];
  el.querySelectorAll("#mf-tags .tag-pill").forEach(p =>
    p.addEventListener("click", () => {
      const t = p.dataset.tag;
      if(selTags.includes(t)){ selTags=selTags.filter(x=>x!==t); p.classList.remove("selected"); }
      else{ selTags.push(t); p.classList.add("selected"); }
    })
  );

  el.querySelector("#mf-submit")?.addEventListener("click", () => {
    const q = el.querySelector("#mf-q").value.trim();
    if(!q){ alert("请填写题目内容"); return; }
    const ml = getMistakes();
    const newM = {
      id:            "m-"+Date.now(),
      date:          el.querySelector("#mf-date").value,
      source:        el.querySelector("#mf-src").value||"手动",
      question:      q,
      myAnswer:      el.querySelector("#mf-my").value,
      correctAnswer: el.querySelector("#mf-cor").value,
      reason:        el.querySelector("#mf-reason").value,
      reflection:    el.querySelector("#mf-ref").value,
      tags:          selTags.length ? selTags : ["待分析"]
    };
    ml.push(newM);
    saveMistakes(ml);
    if(window.syncMistake) syncMistake(newM);
    renderedPages.delete("mistakes");
    renderInnerPage("mistakes", document.getElementById("page-mistakes"));
  });

  el.querySelector("#mf-clear")?.addEventListener("click", () => {
    ["#mf-q","#mf-my","#mf-cor","#mf-reason","#mf-ref"].forEach(s => el.querySelector(s).value="");
  });

  /* 内联编辑：错误原因 & 反思 */
  el.querySelectorAll(".editable-cell[contenteditable='true']").forEach(cell => {
    cell.addEventListener("blur", () => {
      const mid   = cell.dataset.mid;
      const field = cell.dataset.field;
      const val   = cell.textContent.trim();
      const ml    = getMistakes();
      const m     = ml.find(x => x.id === mid);
      if(m && field in m){
        m[field] = val;
        saveMistakes(ml);
        if(window.syncMistake) syncMistake(m);
      }
    });
    cell.addEventListener("keydown", e => {
      if(e.key === "Enter" && !e.shiftKey){ e.preventDefault(); cell.blur(); }
    });
  });

  /* FIX #7 (标签内联修改): ＋标签按钮 */
  el.querySelectorAll(".mis-add-tag-btn").forEach(btn => {
    btn.addEventListener("click", e => {
      e.stopPropagation();
      const mid = btn.dataset.mid;
      const ml  = getMistakes();
      const m   = ml.find(x => x.id === mid);
      if(!m) return;

      // 弹出标签选择器
      const existing = new Set(m.tags || []);
      const allOpts  = [...new Set([...DEFAULT_TAGS, ...m.tags])];
      const picker   = document.createElement("div");
      picker.style.cssText = "position:absolute;z-index:100;background:var(--bg-card);border:2px solid var(--border);border-radius:var(--card-r);padding:8px;box-shadow:var(--px-shadow);display:flex;flex-wrap:wrap;gap:4px;max-width:200px";
      allOpts.forEach(tag => {
        const tp = document.createElement("span");
        tp.className = "tag-pill" + (existing.has(tag)?" selected":"");
        tp.style.cssText = existing.has(tag)
          ? "background:var(--accent-purple);border-color:var(--accent-purple);color:white;cursor:pointer"
          : "border-color:var(--accent-purple);color:var(--accent-purple);cursor:pointer";
        tp.textContent = tag;
        tp.addEventListener("click", ev => {
          ev.stopPropagation();
          if(existing.has(tag)){ existing.delete(tag); }
          else{ existing.add(tag); }
          m.tags = [...existing];
          saveMistakes(ml);
          if(window.syncMistake) syncMistake(m);
          // 更新标签显示
          const cell = el.querySelector(`.mistake-tag-cell[data-mid="${mid}"]`);
          if(cell){
            const addBtn = cell.querySelector(".mis-add-tag-btn");
            cell.innerHTML = m.tags.map(t=>`<span class="mistake-cat-tag">${esc(t)}</span>`).join(" ");
            cell.appendChild(addBtn || btn);
          }
          picker.remove();
        });
        picker.appendChild(tp);
      });
      btn.parentNode.style.position = "relative";
      btn.parentNode.appendChild(picker);
      const closePicker = (ev) => {
        if(!picker.contains(ev.target) && ev.target !== btn){
          picker.remove();
          document.removeEventListener("click", closePicker);
        }
      };
      setTimeout(() => document.addEventListener("click", closePicker), 0);
    });
  });

  el.querySelectorAll("[data-dm]").forEach(btn =>
    btn.addEventListener("click", () => {
      if(window.deleteMistake) deleteMistake(btn.dataset.dm);
      saveMistakes(getMistakes().filter(x=>x.id!==btn.dataset.dm));
      renderedPages.delete("mistakes");
      renderInnerPage("mistakes", document.getElementById("page-mistakes"));
    })
  );

  /* FIX #7: "复习"按钮——加入今日任务并携带原题数据 */
  el.querySelectorAll("[data-at]").forEach(btn =>
    btn.addEventListener("click", () => {
      const m = getMistakes().find(x=>x.id===btn.dataset.at);
      if(!m) return;
      const ts = getTasks();
      const today = todayStr();

      // 避免重复加入
      const already = ts.some(t => t.type==="复习" && t.reviewMistakeId===m.id && t.date===today);
      if(already){
        btn.textContent="已在今日任务";
        btn.disabled=true;
        return;
      }

      ts.push({
        id:             "t-"+Date.now(),
        title:          `复习错题：${m.question.slice(0,28)}`,
        type:           "复习",
        done:           false,
        detail:         `来源：${m.source} | 正确答案：${m.correctAnswer}`,
        date:           today,
        reviewMistakeId: m.id,
        reviewData: {
          question:      m.question,
          correctAnswer: m.correctAnswer,
          source:        m.source
        }
      });
      saveTasks(ts);
      syncStudyLog(today);
      if(window.syncTask) syncTask(ts[ts.length-1]);
      const logObj = getStudyLog();
      if(window.syncStudyLogDay) syncStudyLogDay(today, logObj[today]||{done:0,total:0});
      renderTodayTasks(); renderHeatmap(); renderProfileCard();
      btn.textContent="✓ 已加入";
      btn.disabled=true;
    })
  );

  el.querySelector("#clr-all")?.addEventListener("click", () => {
    if(confirm("确定清空全部错题？")){
      saveMistakes([]);
      if(window.clearAllMistakes) clearAllMistakes();
      renderedPages.delete("mistakes");
      renderInnerPage("mistakes", document.getElementById("page-mistakes"));
    }
  });

  el.querySelectorAll("#mis-filter .tag-pill").forEach(p =>
    p.addEventListener("click", () => {
      el.querySelectorAll("#mis-filter .tag-pill").forEach(x=>x.classList.remove("selected"));
      p.classList.add("selected");
      const f = p.dataset.filter;
      el.querySelectorAll("#mistake-table tbody tr").forEach(r => {
        r.style.display = (f==="全部" || r.dataset.tags.includes(f)) ? "" : "none";
      });
    })
  );

  el.querySelector("#exp-mis")?.addEventListener("click", () => {
    const ml = getMistakes();
    if(!ml.length){ alert("没有错题可导出"); return; }
    const hdr  = ["日期","来源","题目","我的答案","正确答案","错误原因","反思","标签"];
    const rows = ml.map(m=>[m.date,m.source,m.question,m.myAnswer,m.correctAnswer,m.reason,m.reflection,(m.tags||[]).join("|")].map(v=>`"${String(v||"").replace(/"/g,'""')}"`).join(","));
    const blob = new Blob(["\uFEFF"+[hdr.join(","),...rows].join("\n")],{type:"text/csv;charset=utf-8"});
    const a    = document.createElement("a");
    a.href     = URL.createObjectURL(blob);
    a.download = `错题记录_${todayStr()}.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
  });
}

/* ══════════════════════════════════
   YOUTUBE
══════════════════════════════════ */
function buildYoutube(){
  return `
    <div class="youtube-cards-grid">
      ${youtube.cards.map(c=>`
        <div class="info-card"><h5>${esc(c.title)}</h5>
        <p style="font-size:13px;color:var(--text-sub)">${esc(c.body)}</p></div>`).join("")}
    </div>
    <div class="tv-card">
      <div class="card-hdr"><span class="section-kicker">Resources</span><h4>参考视频资源</h4></div>
      <div class="tv-screen">
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:10px">
          ${(youtube.resources||[]).map(item=>`
            <div class="info-card" style="background:var(--bg-inset)">
              <h5>${esc(item.title)}</h5>
              <p style="font-size:11px;color:var(--text-sub)">${esc(item.note)}</p>
              <span class="resource-link">${esc(item.linkLabel)}</span>
            </div>`).join("")}
        </div>
      </div>
      <div class="input-row">
        <input class="text-input" type="text" placeholder="粘贴 YouTube 链接…"/>
        <button class="btn-primary muted" disabled>解析</button>
      </div>
      <p class="helper-text">功能开发中，后续自动生成总结、讲义和练习。</p>
    </div>`;
}

/* ══════════════════════════════════
   LECTURE / EXERCISE RENDERERS
══════════════════════════════════ */
function renderTable(rows){
  if(!rows?.length) return "";
  const [hdr,...body] = rows;
  return `<div class="lec-table-wrap"><table class="lec-table">
    <thead><tr>${hdr.map(h=>`<th>${esc(h)}</th>`).join("")}</tr></thead>
    <tbody>${body.map(r=>`<tr>${r.map((c,i)=>i===0?`<td style="font-weight:600">${esc(c)}</td>`:`<td>${esc(c)}</td>`).join("")}</tr>`).join("")}</tbody>
  </table></div>`;
}

function renderGrammarSection(sec){
  const exHtml = (sec.examples||[]).map(ex=>`
    <div class="lec-example-row">
      <span class="lec-ex-fr">${esc(ex.fr)}</span>
      <span class="lec-ex-zh">${esc(ex.zh)}</span>
    </div>`).join("");
  return `<div class="lec-grammar-block">
    <div class="lec-grammar-title">${esc(sec.title)}</div>
    <p class="lec-explanation">${esc(sec.explanation)}</p>
    ${renderTable(sec.table)}
    ${exHtml?`<div class="lec-examples">${exHtml}</div>`:""}
    ${sec.pitfall?`<div class="lec-pitfall">⚠ ${esc(sec.pitfall)}</div>`:""}
  </div>`;
}

function renderVocabGroup(g){
  return `<div class="lec-vocab-group">
    <div class="lec-vocab-theme">${esc(g.theme)}</div>
    <div class="lec-vocab-grid">
      ${(g.words||[]).map(w=>`
        <div class="lec-vocab-card">
          <span class="lec-word-fr">${esc(w.fr)}</span>
          <span class="lec-word-zh">${esc(w.zh)}</span>
          ${w.example?`<span class="lec-word-ex">${esc(w.example)}</span>`:""}
        </div>`).join("")}
    </div>
  </div>`;
}

function renderLecture(unit){
  const lec = unit.lecture;
  if(!lec) return `<p style="color:var(--text-dim);font-size:13px">本单元讲义即将补充。</p>`;
  const canDo   = (lec.canDo||[]).map(c=>`<li>${esc(c)}</li>`).join("");
  const grammar = lec.grammarSections?.length
    ? lec.grammarSections.map(renderGrammarSection).join("")
    : `<ul class="bullet-list">${(lec.grammar||[]).map(g=>`<li>${esc(g)}</li>`).join("")}</ul>`;
  const vocab   = lec.vocabularyGroups?.length
    ? lec.vocabularyGroups.map(renderVocabGroup).join("")
    : `<ul class="bullet-list">${(lec.vocabulary||[]).map(v=>`<li>${esc(v)}</li>`).join("")}</ul>`;
  return `
    <div class="lec-summary">${esc(lec.summary||"")}</div>
    ${canDo?`<div class="lec-section"><span class="lec-section-label">学完你应该会</span><ul class="lec-cando-list">${canDo}</ul></div>`:""}
    ${grammar?`<div class="lec-section"><span class="lec-section-label">语法精讲</span>${grammar}</div>`:""}
    ${vocab?`<div class="lec-section"><span class="lec-section-label">词汇积累</span>${vocab}</div>`:""}
    ${lec.phonetique?`<div class="lec-phonetique"><span class="lec-section-label">语音重点</span><p>${esc(lec.phonetique)}</p></div>`:""}
    ${lec.tcf?`<div class="lec-tcf"><span class="lec-tcf-badge">TCF 关联</span><span style="font-size:12px">${esc(lec.tcf)}</span></div>`:""}`;
}

function renderExercises(unit){
  if(!unit.exercises?.length) return `<p style="color:var(--text-dim);font-size:13px">本单元练习题即将补充。</p>`;
  return unit.exercises.map(ex => {
    if(ex.passage) return `<div class="ex-block">
      <span class="ex-type">${esc(ex.type)}</span>
      <p class="ex-instruction">${esc(ex.instruction)}</p>
      <div class="ex-passage">${esc(ex.passage)}</div>
      <div>${(ex.items||[]).map(item=>`
        <div style="margin-bottom:8px">
          <span class="ex-blank-num">第 ${esc(item.blank)} 空</span>
          <div class="ex-grade-row" data-correct="${esc(item.answer)}">
            <input class="grade-input" type="text" placeholder="填写答案…"/>
            <button class="grade-btn" data-prompt="${esc(ex.instruction||"填空")}" data-correct="${esc(item.answer)}">提交</button>
            <span class="grade-result"></span>
          </div>
          <details class="ex-answer-box" style="margin-top:4px">
            <summary>查看答案</summary>
            <span class="ex-answer">${esc(item.answer)}</span>
            ${item.explanation?`<span class="ex-explain"> — ${esc(item.explanation)}</span>`:""}
          </details>
        </div>`).join("")}
      </div>
    </div>`;

    const items = Array.isArray(ex.items) ? ex.items : [ex];
    return `<div class="ex-block">
      <span class="ex-type">${esc(ex.type)}</span>
      <ol class="ex-list">
        ${items.map(item=>`
          <li class="ex-item">
            <p class="ex-prompt">${esc(item.prompt)}</p>
            <div class="ex-grade-row" data-correct="${esc(item.answer||item.modelAnswer||"")}">
              <input class="grade-input" type="text" placeholder="填写答案…"/>
              <button class="grade-btn" data-prompt="${esc(item.prompt)}" data-correct="${esc(item.answer||item.modelAnswer||"")}">提交</button>
              <span class="grade-result"></span>
            </div>
            <details class="ex-answer-box" style="margin-top:4px">
              <summary>查看答案</summary>
              <span class="ex-answer">${esc(item.answer||item.modelAnswer||"")}</span>
              ${item.explanation?`<p class="ex-explain">${esc(item.explanation)}</p>`:""}
              ${item.keyPoints?`<ul class="ex-explain">${item.keyPoints.map(k=>`<li>${esc(k)}</li>`).join("")}</ul>`:""}
            </details>
          </li>`).join("")}
      </ol>
    </div>`;
  }).join("");
}

/* ══════════════════════════════════
   INIT
══════════════════════════════════ */
document.addEventListener("DOMContentLoaded", () => {
  carryOverIncompleteTasks(); // FIX #5: 页面加载时自动顺延
  renderTopbar();
  renderProfileCard();
  renderFeatureNav();
  renderTodayTasks();
  renderCourseProgress();
  renderCountdown();
  renderHeatmap();
  renderAiTip();
});
