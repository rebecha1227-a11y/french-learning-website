"use strict";
const { nav:_nav, profile, aiTips, dashboard,
        curriculum, questionBank, mistakes, youtube } = window.siteData;

const TASK_KEY      = "fq-tasks-v3";
const MISTAKE_KEY   = "fq-mistakes-v3";
const EXAM_KEY      = "fq-exam-date";
const STUDY_LOG_KEY = "fq-study-log"; // { "2025-06-01": { done: 2, total: 4 } }
const EX_STATS_KEY  = "fq-exercise-stats-v1";
const UNIT_RECO_KEY = "fq-unit-reco-v1";
const UNIT_LEARN_KEY = "fq-unit-learning-v1"; // { [unitId]: { lectureDone, exerciseKeys:[] } }
const MISTAKE_TAG_KEY = "fq-mistake-tag-library-v1";
const ROLLOVER_SETTINGS_KEY = "fq-rollover-settings-v1";
const METRICS_KEY = "fq-product-metrics-v1";
const TASK_VIEW_KEY = "fq-task-view-v1";
const BJT_TZ        = "Asia/Shanghai";
const WEEKDAY_CN    = ["周日","周一","周二","周三","周四","周五","周六"];

let selectedUnitId  = curriculum.books[0].units[0].id;
let activeUnitTab   = "lecture";
const renderedPages = new Set();
let authActionPending = false;
let autoRolloverNotice = "";

/* ── helpers ── */
function esc(s){ return String(s ?? "").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;") }
function normalizeTaskDates(task){
  const today = todayStr();
  const plannedDate = task.plannedDate || task.date || today;
  const workingDate = task.workingDate || task.date || plannedDate;
  const normalized = {
    ...task,
    plannedDate,
    workingDate,
    date: workingDate,
    rolloverCount: Number(task.rolloverCount || 0),
    rolloverMode: task.rolloverMode || ""
  };
  if(normalized.done && !normalized.completedAt) normalized.completedAt = "";
  return normalized;
}
function getTaskWorkingDate(task){ return task?.workingDate || task?.date || task?.plannedDate || todayStr() }
function getTaskPlannedDate(task){ return task?.plannedDate || task?.date || todayStr() }
function buildCompletedAtByDateKey(dateStr){
  const key = parseDateKey(dateStr) ? dateStr : todayStr();
  return `${key}T12:00:00+08:00`;
}
function getCompletedDateKey(task){
  if(!task?.completedAt) return "";
  const raw = String(task.completedAt).trim();
  if(parseDateKey(raw)) return raw;
  const parsed = new Date(raw);
  if(Number.isNaN(parsed.getTime())) return "";
  const p = getBjtParts(parsed);
  return dateKey(p.year, p.month, p.day);
}
function getTasks(){
  try{
    const list = JSON.parse(localStorage.getItem(TASK_KEY)||"[]");
    if(!Array.isArray(list)) return [];
    let changed = false;
    const normalized = list.map(t => {
      const n = normalizeTaskDates(t || {});
      if(
        n.plannedDate !== t?.plannedDate ||
        n.workingDate !== t?.workingDate ||
        n.date !== t?.date ||
        Number(n.rolloverCount || 0) !== Number(t?.rolloverCount || 0) ||
        (n.rolloverMode || "") !== (t?.rolloverMode || "")
      ){
        changed = true;
      }
      return n;
    });
    if(changed) localStorage.setItem(TASK_KEY, JSON.stringify(normalized));
    return normalized;
  }catch{
    return [];
  }
}
function saveTasks(a){ localStorage.setItem(TASK_KEY, JSON.stringify(a)) }
function getMistakes(){ try{ return JSON.parse(localStorage.getItem(MISTAKE_KEY)||"[]") }catch{ return [] } }
function saveMistakes(a){ localStorage.setItem(MISTAKE_KEY, JSON.stringify(a)) }
function getExamDate(){ return localStorage.getItem(EXAM_KEY) || "2027-05-01" }
function saveExamDate(d){ localStorage.setItem(EXAM_KEY, d) }
function getStudyLog(){ try{ return JSON.parse(localStorage.getItem(STUDY_LOG_KEY)||"{}") }catch{ return {} } }
function saveStudyLog(o){ localStorage.setItem(STUDY_LOG_KEY, JSON.stringify(o)) }
function getExerciseStats(){ try{ return JSON.parse(localStorage.getItem(EX_STATS_KEY)||"{}") }catch{ return {} } }
function saveExerciseStats(o){ localStorage.setItem(EX_STATS_KEY, JSON.stringify(o)) }
function getRecoState(){ try{ return JSON.parse(localStorage.getItem(UNIT_RECO_KEY)||"{}") }catch{ return {} } }
function saveRecoState(o){ localStorage.setItem(UNIT_RECO_KEY, JSON.stringify(o)) }
function getUnitLearningState(){ try{ return JSON.parse(localStorage.getItem(UNIT_LEARN_KEY)||"{}") }catch{ return {} } }
function saveUnitLearningState(o){ localStorage.setItem(UNIT_LEARN_KEY, JSON.stringify(o)) }
function getRolloverSettings(){
  try{
    const raw = JSON.parse(localStorage.getItem(ROLLOVER_SETTINGS_KEY) || "{}");
    return {
      enabled: raw.enabled !== false,   // 默认开启
      notify: raw.notify !== false,
      lastRunDate: raw.lastRunDate || "",
      lastRunMoved: Number(raw.lastRunMoved || 0)
    };
  }catch{
    return { enabled: true, notify: true, lastRunDate: "", lastRunMoved: 0 };
  }
}
function saveRolloverSettings(s){
  localStorage.setItem(ROLLOVER_SETTINGS_KEY, JSON.stringify({
    enabled: !!s.enabled,
    notify: s.notify !== false,
    lastRunDate: s.lastRunDate || "",
    lastRunMoved: Number(s.lastRunMoved || 0)
  }));
}
function getTaskViewSettings(){
  try{
    const raw = JSON.parse(localStorage.getItem(TASK_VIEW_KEY) || "{}");
    return { showCompleted: raw.showCompleted !== false };
  }catch{
    return { showCompleted: true };
  }
}
function saveTaskViewSettings(s){
  localStorage.setItem(TASK_VIEW_KEY, JSON.stringify({
    showCompleted: s.showCompleted !== false
  }));
}
function trackMetric(name, count = 1){
  try{
    const curr = JSON.parse(localStorage.getItem(METRICS_KEY) || "{}");
    curr[name] = Number(curr[name] || 0) + Number(count || 1);
    curr.updatedAt = new Date().toISOString();
    localStorage.setItem(METRICS_KEY, JSON.stringify(curr));
  }catch{}
}

function getBjtParts(date = new Date()){
  const parts = new Intl.DateTimeFormat("zh-CN", {
    timeZone: BJT_TZ,
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  }).formatToParts(date);
  const map = {};
  parts.forEach(p => {
    if(p.type !== "literal") map[p.type] = p.value;
  });
  return {
    year: Number(map.year),
    month: Number(map.month),
    day: Number(map.day),
    hour: Number(map.hour),
    minute: Number(map.minute),
    second: Number(map.second)
  };
}

function dateKey(y, m, d){
  return `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

function parseDateKey(key){
  const m = String(key || "").match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if(!m) return null;
  return { year: Number(m[1]), month: Number(m[2]), day: Number(m[3]) };
}

function shiftDateKey(key, offsetDays){
  const p = parseDateKey(key);
  if(!p) return key;
  const utc = new Date(Date.UTC(p.year, p.month - 1, p.day));
  utc.setUTCDate(utc.getUTCDate() + offsetDays);
  return dateKey(utc.getUTCFullYear(), utc.getUTCMonth() + 1, utc.getUTCDate());
}

function getWeekdayIndex(y, m, d){
  return new Date(Date.UTC(y, m - 1, d, 12)).getUTCDay();
}

/* today's date as YYYY-MM-DD（统一用北京时间） */
function todayStr(){
  const p = getBjtParts();
  return dateKey(p.year, p.month, p.day);
}

function getBjtClockText(){
  return new Intl.DateTimeFormat("zh-CN", {
    timeZone: BJT_TZ,
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date());
}

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

function answerTokens(s){
  return normalizeAnswer(s)
    .split(" ")
    .map(x => x.trim())
    .filter(Boolean);
}

function keywordCoverage(user, ans){
  const u = new Set(answerTokens(user));
  const a = answerTokens(ans);
  if(!a.length) return 0;
  const hit = a.filter(w => u.has(w)).length;
  return hit / a.length;
}

function splitAnswers(raw){
  return String(raw || "")
    .split(/\s*(?:\/|;|\||\n|或|或者|\bor\b)\s*/i)
    .map(a => normalizeAnswer(a))
    .filter(Boolean);
}

/* 判断用户答案是否正确（支持多种答案 / 相近匹配） */
function checkAnswerCorrect(userRaw, correctRaw){
  if(!correctRaw) return false;
  const user = normalizeAnswer(userRaw);
  if(!user) return false;
  const correctWhole = normalizeAnswer(correctRaw);
  if(correctWhole && user === correctWhole) return true;

  // correctRaw 可能含多个答案
  const answers = splitAnswers(correctRaw);

  for(const ans of answers){
    if(!ans) continue;
    // 完全相等（标点归一化后）
    if(user === ans) return true;
    // 短答案适当放宽（允许轻微拼写/单复数波动）
    if(ans.length <= 6 && (user.includes(ans) || ans.includes(user))) return true;
    // 同词序/轻错别字
    if(strSimilarity(user, ans) >= 0.92) return true;
    // 中等容错：关键词覆盖 + 语句相似
    const cover = keywordCoverage(user, ans);
    const sim = strSimilarity(user, ans);
    if(cover >= 0.8 && sim >= 0.75) return true;
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
  const today = todayStr();
  for(let i = 0; i < 7; i++){
    const key = shiftDateKey(today, -i);
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
  const tasks  = getTasks();
  const doneByCompletionDate = tasks.filter(t => t.done && getCompletedDateKey(t) === dateStr).length;
  const log    = getStudyLog();
  const prev   = log[dateStr];
  if(doneByCompletionDate > 0){
    const done = doneByCompletionDate;
    const total = doneByCompletionDate;
    if(prev?.manual){
      const mergedDone = Math.max(done, Number(prev.done || 0), 1);
      const mergedTotal = Math.max(total, Number(prev.total || 0), mergedDone);
      log[dateStr] = { ...prev, done: mergedDone, total: mergedTotal, manual: true };
    } else {
      log[dateStr] = { done, total, manual: false };
    }
  } else {
    if(prev?.manual){
      const done = Math.max(Number(prev.done || 0), 1);
      const total = Math.max(Number(prev.total || 0), done);
      log[dateStr] = { ...prev, done, total, manual: true };
    } else {
      delete log[dateStr];
    }
  }
  saveStudyLog(log);
}

function syncStudyLogCloud(dateStr){
  const log = getStudyLog();
  if(window.syncStudyLogDay && log[dateStr]) syncStudyLogDay(dateStr, log[dateStr]);
  if(window.deleteStudyLogDay && !log[dateStr]) deleteStudyLogDay(dateStr);
}

function refreshLearningWidgets(){
  renderTodayTasks();
  renderHeatmap();
  renderProfileCard();
  renderCourseProgress();
}

function toggleManualCheckin(dateStr){
  const log = getStudyLog();
  const cur = log[dateStr];
  if(cur?.manual){
    delete log[dateStr];
    saveStudyLog(log);
    syncStudyLog(dateStr);
  } else {
    const done = Math.max(Number(cur?.done || 0), 1);
    const total = Math.max(Number(cur?.total || 0), done);
    log[dateStr] = { done, total, manual: true, repaired: true };
    saveStudyLog(log);
  }
  syncStudyLogCloud(dateStr);
}

function applyAutoRolloverIfNeeded(){
  const settings = getRolloverSettings();
  if(!settings.enabled) return;
  const today = todayStr();
  if(settings.lastRunDate === today) return;

  const tasks = getTasks();
  const moved = [];
  tasks.forEach(t => {
    const wd = getTaskWorkingDate(t);
    if(!t.done && wd < today){
      t.workingDate = today;
      t.date = today;
      t.rolloverCount = Number(t.rolloverCount || 0) + 1;
      t.rolloverMode = "auto";
      moved.push(t);
    }
  });

  settings.lastRunDate = today;
  settings.lastRunMoved = moved.length;
  saveRolloverSettings(settings);

  if(!moved.length) return;
  saveTasks(tasks);
  if(window.syncTask) moved.forEach(t => syncTask(t));
  trackMetric("rollover_auto_runs", 1);
  trackMetric("rollover_auto_count", moved.length);
  autoRolloverNotice = settings.notify ? `已自动顺延 ${moved.length} 条未完成任务到今天` : "";
}

function getPlanningExecutionRate(tasks = getTasks()){
  const today = todayStr();
  const dueTasks = tasks.filter(t => getTaskPlannedDate(t) <= today);
  if(!dueTasks.length) return 0;
  const done = dueTasks.filter(t => t.done).length;
  return Math.round((done / dueTasks.length) * 100);
}

function getLearningConsistency(log = getStudyLog(), days = 30){
  const today = todayStr();
  let active = 0;
  for(let i = 0; i < days; i++){
    const key = shiftDateKey(today, -i);
    if(log[key]?.done > 0) active++;
  }
  return Math.round((active / days) * 100);
}

function getUnitAccuracy(unitId){
  const stats = getExerciseStats();
  const s = stats[unitId];
  if(!s || !s.total) return 0;
  return Math.round((s.correct / s.total) * 100);
}

function ensureRecommendedTasksForUnit(unit){
  if(!unit?.id) return;
  const accuracy = getUnitAccuracy(unit.id);
  if(accuracy < 80) return;

  const today = todayStr();
  const nextDay = shiftDateKey(today, 1);
  const recoState = getRecoState();
  if(recoState[unit.id] === nextDay) return;

  const tasks = getTasks();
  const exists = tasks.some(t =>
    t.recommendedFromUnitId === unit.id && t.recommendedForDate === nextDay
  );
  if(exists){
    recoState[unit.id] = nextDay;
    saveRecoState(recoState);
    return;
  }

  const title = `${unit.code} ${unit.title}`;
  const recTasks = [
    { title: `词汇复习：${title}`, type: "复盘", detail: "复习本单元核心词汇 15-20 个" },
    { title: `语法巩固：${title}`, type: "练习", detail: "完成本单元语法点针对练习" },
    { title: `下一单元预习`, type: "讲义", detail: `预习 ${title} 的下一单元讲义与场景表达` }
  ].map((r, i) => ({
    id: `t-rec-${Date.now()}-${i}`,
    title: r.title,
    type: r.type,
    done: false,
    detail: r.detail,
    date: nextDay,
    plannedDate: nextDay,
    workingDate: nextDay,
    completedAt: "",
    rolloverCount: 0,
    rolloverMode: "",
    recommendedFromUnitId: unit.id,
    recommendedForDate: nextDay
  }));

  tasks.push(...recTasks);
  saveTasks(tasks);
  if(window.syncTask){
    recTasks.forEach(t => syncTask(t));
  }
  recoState[unit.id] = nextDay;
  saveRecoState(recoState);
  if(typeof renderTodayTasks === "function") renderTodayTasks();
  if(typeof renderHeatmap === "function") renderHeatmap();
  if(typeof renderProfileCard === "function") renderProfileCard();
  if(typeof renderCourseProgress === "function") renderCourseProgress();
}

function recordExerciseResult(unitId, isCorrect){
  if(!unitId) return;
  const stats = getExerciseStats();
  const curr = stats[unitId] || { total: 0, correct: 0 };
  curr.total += 1;
  if(isCorrect) curr.correct += 1;
  stats[unitId] = curr;
  saveExerciseStats(stats);
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

function getExerciseItems(unit){
  if(!unit?.exercises?.length) return [];
  const items = [];
  unit.exercises.forEach((ex, exIndex) => {
    if(Array.isArray(ex.items) && ex.items.length){
      ex.items.forEach((item, itemIndex) => {
        items.push({ exIndex, itemIndex, item });
      });
    } else {
      items.push({ exIndex, itemIndex: 0, item: ex });
    }
  });
  return items;
}

function buildExerciseKey(unitId, exIndex, itemIndex){
  return `${unitId}::${exIndex}::${itemIndex}`;
}

function getUnitLearning(unitId){
  const state = getUnitLearningState();
  const u = state[unitId] || {};
  return {
    lectureDone: !!u.lectureDone,
    exerciseKeys: Array.isArray(u.exerciseKeys) ? u.exerciseKeys : []
  };
}

function saveUnitLearning(unitId, data){
  const state = getUnitLearningState();
  state[unitId] = {
    lectureDone: !!data.lectureDone,
    exerciseKeys: [...new Set(data.exerciseKeys || [])]
  };
  saveUnitLearningState(state);
}

function markLectureDone(unitId){
  const curr = getUnitLearning(unitId);
  curr.lectureDone = true;
  saveUnitLearning(unitId, curr);
}

function markExerciseDone(unitId, exerciseKey){
  if(!exerciseKey) return;
  const curr = getUnitLearning(unitId);
  if(!curr.exerciseKeys.includes(exerciseKey)){
    curr.exerciseKeys.push(exerciseKey);
    saveUnitLearning(unitId, curr);
  }
}

function getUnitStructuredProgress(unit){
  if(!unit?.id) return null;
  const curr = getUnitLearning(unit.id);
  const allItems = getExerciseItems(unit);
  const totalExercises = allItems.length;
  const doneExerciseCount = curr.exerciseKeys.filter(k => k.startsWith(`${unit.id}::`)).length;
  const clampedDone = Math.min(doneExerciseCount, totalExercises);
  const hasStructuredData = curr.lectureDone || clampedDone > 0;
  if(!hasStructuredData) return null;

  const lecturePart = curr.lectureDone ? 50 : 0;
  const exercisePart = totalExercises > 0 ? Math.round((clampedDone / totalExercises) * 50) : 50;
  const pct = Math.max(0, Math.min(100, lecturePart + exercisePart));
  return {
    pct,
    lectureDone: curr.lectureDone,
    exerciseDone: clampedDone,
    exerciseTotal: totalExercises
  };
}

function computeUnitProgress(unitId, bi, ui){
  const unit    = curriculum.books?.[bi]?.units?.[ui] || { id:unitId };
  const structured = getUnitStructuredProgress(unit);
  if(structured) return structured.pct;
  const tasks   = getTasks();
  const related = tasks.filter(t => taskRelatesToUnit(t, unit));
  if(!related.length) return 0;
  const pct = Math.round(related.filter(t=>t.done).length / related.length * 100);
  return Math.max(0, Math.min(100, pct));
}

function getSelectedUnit(){ return getAllUnits().find(u => u.id === selectedUnitId) || getAllUnits()[0] }

function formatDateCN(dateStr){
  const p = parseDateKey(dateStr);
  if(!p) return dateStr || "";
  return `${p.month}月${p.day}日`;
}

function getCountdownDays(){
  const examDate = getExamDate();
  const t = parseDateKey(todayStr());
  const e = parseDateKey(examDate);
  if(!t || !e) return 0;
  const todayUtc = Date.UTC(t.year, t.month - 1, t.day);
  const examUtc = Date.UTC(e.year, e.month - 1, e.day);
  const d = examUtc - todayUtc;
  return Math.max(0, Math.ceil(d / 86400000));
}

/* ── NAV ── */
const NAV_ITEMS = [
  { id:"dashboard",     label:"今日学习",  icon:"◉", desc:"任务、进度、今日计划" },
  { id:"curriculum",    label:"课程主线",  icon:"✦", desc:"教材单元、讲义、练习" },
  { id:"question-bank", label:"题库中心",  icon:"◎", desc:"真题、相似题、筛选练习", wip:true },
  { id:"mistakes",      label:"错题复盘",  icon:"※", desc:"记录错题、错因分析、二刷" },
  { id:"youtube",       label:"视频补充",  icon:"▶", desc:"YouTube 解析与扩展学习", wip:true },
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
    btn.className = "tnav-btn" + (item.wip ? " tnav-wip" : "");
    btn.dataset.page = item.id;
    btn.innerHTML = `<span class="tnav-icon">${item.icon}</span>${item.label}${item.wip ? `<span class="tnav-wip-badge">建设中</span>` : ""}`;
    if(item.wip){
      btn.title = "功能建设中，敬请期待";
      btn.onclick = () => showPage(item.id);
    } else {
      btn.onclick = () => showPage(item.id);
    }
    nav.appendChild(btn);
  });
}

/* ── FIX #3: 连续打卡 streak ── */
/* 从昨天开始往前数，再单独判断今天是否打卡 */
function computeStreak(log){
  const todayKey = todayStr();

  let streak = 0;
  // 先从昨天往前检查
  let key = shiftDateKey(todayKey, -1);
  while(true){
    const entry = log[key];
    if(entry && entry.done > 0){
      streak++;
      key = shiftDateKey(key, -1);
    }
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
  const continuity = getLearningConsistency(log);
  const planRate = getPlanningExecutionRate(tasks);

  card.innerHTML = `
    <div class="profile-head">
      <div class="profile-avatar">${loggedIn ? "已登录" : "访客"}</div>
      <div class="profile-identity">
        <span class="profile-name vt">${esc(username)}</span>
        <div class="profile-meta-row">
          <span class="profile-level-chip">目标 A1-B1</span>
          <span class="profile-exam-chip">TCF ${esc(examDate)}</span>
        </div>
        <p class="profile-email">${esc(user?.email || "未登录，本地模式")}</p>
      </div>
      <div class="profile-actions">
        ${loggedIn ? `<button class="profile-settings-btn" id="profile-settings-btn">设置</button>` : ""}
        ${loggedIn ? `<button class="profile-settings-btn" id="profile-sync-btn">同步</button>` : ""}
        <button class="profile-auth-btn ${loggedIn ? "logout" : "login"}" id="profile-auth-btn" ${authActionPending ? "disabled" : ""}>
          ${authActionPending ? "处理中…" : (loggedIn ? "退出" : "登录")}
        </button>
      </div>
    </div>
    <div class="profile-stats">
      <div class="profile-stat">
        <span class="profile-stat-val">${totalDone}</span>
        <span class="profile-stat-key">累计完成任务</span>
      </div>
      <div class="profile-stat">
        <span class="profile-stat-val">${continuity}<small style="font-size:11px">%</small></span>
        <span class="profile-stat-key">学习连续性</span>
      </div>
      <div class="profile-stat">
        <span class="profile-stat-val">${planRate}<small style="font-size:11px">%</small></span>
        <span class="profile-stat-key">计划执行率</span>
      </div>
      <div class="profile-stat">
        <span class="profile-stat-val">${streak}</span>
        <span class="profile-stat-key">连续打卡</span>
      </div>
      <div class="profile-stat">
        <span class="profile-stat-val" style="font-size:13px;color:var(--accent-green)">${todayLog.done}/${todayLog.total||"—"}</span>
        <span class="profile-stat-key">今日学习日志</span>
      </div>
    </div>`;

  card.querySelector("#profile-auth-btn")?.addEventListener("click", window.handleProfileAuthClick);
  card.querySelector("#profile-settings-btn")?.addEventListener("click", () => {
    if(typeof window.openProfileSettings === "function") window.openProfileSettings();
  });
  card.querySelector("#profile-sync-btn")?.addEventListener("click", () => {
    if(typeof window.openCloudSyncPanel === "function") window.openCloudSyncPanel();
  });
}

/* ── FIX #1: 退出登录——即使 Supabase 超时也强制清除本地状态 ── */
window.handleProfileAuthClick = async function(event){
  const btn = event?.currentTarget || event?.target;
  if(authActionPending) return;
  if(typeof window.isLoggedIn === "function" && window.isLoggedIn()){
    authActionPending = true;
    if(btn){
      btn.disabled = true;
      btn.textContent = "退出中…";
    }
    try {
      if(typeof window.doLogout === "function"){
        const result = await window.doLogout();
        if(!result?.ok){
          console.warn("退出超时，强制本地清除");
          forceLocalLogout();
          return;
        }
      } else {
        forceLocalLogout();
        return;
      }
    } catch(e) {
      console.error("退出异常:", e);
      forceLocalLogout();
      return;
    } finally {
      authActionPending = false;
      if(btn){
        btn.disabled = false;
        btn.textContent = "退出";
      }
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
    const wipAttr = item.wip ? `data-wip="true" title="功能建设中，敬请期待"` : "";
    const wipBadge = item.wip ? `<span class="feature-nav-wip-badge">建设中</span>` : "";
    return `<button class="feature-nav-btn${item.wip ? " feature-nav-wip" : ""}" data-page="${esc(item.id)}" ${wipAttr}>
      ${wipBadge}
      <span class="feature-nav-icon" style="color:${item.wip ? "var(--text-dim)" : c.color}">${c.icon}</span>
      <span class="feature-nav-label" style="color:${item.wip ? "var(--text-dim)" : c.color}">${esc(item.label)}</span>
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
      if(t){
        t.type = sel.value;
        saveTasks(ts);
        if(window.syncTask) syncTask(t);
      }
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

/* ── TODAY TASKS (home page widget — 只读+勾选，管理操作去内页) ── */
function renderTodayTasks(){
  const el       = document.getElementById("today-tasks-card");
  if(!el) return;
  const today    = todayStr();
  const tasks    = getTasks();
  const log      = getStudyLog();
  const weekDone = getLast7DaysDone(log);
  const planRate = getPlanningExecutionRate(tasks);

  const dayTasksRaw = tasks.filter(t => {
    if(!t.done) return getTaskWorkingDate(t) === today;
    const doneKey = getCompletedDateKey(t);
    if(doneKey) return doneKey === today;
    return getTaskWorkingDate(t) === today;
  });
  const dayTasks = [...dayTasksRaw].sort((a,b) => {
    if(!!a.done === !!b.done) return 0;
    return a.done ? 1 : -1;
  });
  const doneCount = dayTasksRaw.filter(t => t.done).length;

  const noticeBanner = autoRolloverNotice
    ? `<div class="rollover-notice">↩ ${esc(autoRolloverNotice)}</div>`
    : "";

  el.innerHTML = `
    <div class="card-header-row">
      <span class="card-title">📅 今日学习任务</span>
      <span class="streak-badge">🔥 ${computeStreak(log)}</span>
    </div>
    ${noticeBanner}
    <div class="task-list" id="ht-list">
      ${dayTasks.length ? dayTasks.map(t => {
        const rolloverInfo = t.rolloverCount > 0
          ? `<div class="task-rollover-info">↩ 顺延 ${t.rolloverCount} 次 · 原计划 ${formatDateCN(t.plannedDate)}</div>`
          : "";
        return `
          <div class="task-item ${t.done?"done":""}" data-tid="${esc(t.id)}">
            <button class="task-cb-btn" data-cb="${esc(t.id)}" aria-label="切换完成状态">
              <div class="task-cb">${t.done?"✓":""}</div>
            </button>
            <div class="task-body">
              <div class="task-title">${esc(t.title)}</div>
              ${rolloverInfo}
            </div>
            <div class="task-actions">
              <span class="task-tag" data-t="${esc(t.type)}" style="pointer-events:none">${esc(t.type)}</span>
            </div>
          </div>`;
      }).join("") : `<div class="task-empty">今天还没有任务，去今日学习页添加吧。</div>`}
    </div>
    <div style="margin-top:8px;text-align:right">
      <button class="btn-ghost btn-small" onclick="showPage('dashboard')" style="font-size:12px">+ 添加任务 · 今日学习 →</button>
    </div>
    <div class="task-summary-row">
      <div class="task-summary-box">
        <span class="task-summary-val">${doneCount}<small style="font-size:13px">/${dayTasksRaw.length}</small></span>
        <div class="task-summary-key">今日完成</div>
      </div>
      <div class="task-summary-box">
        <span class="task-summary-val" style="color:var(--accent-gold)">${weekDone}</span>
        <div class="task-summary-key">近7天完成</div>
      </div>
      <div class="task-summary-box">
        <span class="task-summary-val" style="color:var(--accent-rose)">${planRate}%</span>
        <div class="task-summary-key">计划执行率</div>
      </div>
    </div>`;

  autoRolloverNotice = "";

  el.querySelectorAll("[data-cb]").forEach(btn =>
    btn.addEventListener("click", e => {
      e.stopPropagation();
      const ts = getTasks();
      const t = ts.find(x => x.id === btn.dataset.cb);
      if(!t) return;
      const prevCompletedDate = getCompletedDateKey(t);
      if(t.done){
        t.done = false;
        t.completedAt = "";
      } else {
        t.done = true;
        t.completedAt = buildCompletedAtByDateKey(today);
      }
      saveTasks(ts);
      const nowCompletedDate = getCompletedDateKey(t);
      if(prevCompletedDate) syncStudyLog(prevCompletedDate);
      if(nowCompletedDate) syncStudyLog(nowCompletedDate);
      if(window.syncTask) syncTask(t);
      if(prevCompletedDate) syncStudyLogCloud(prevCompletedDate);
      if(nowCompletedDate) syncStudyLogCloud(nowCompletedDate);
      refreshLearningWidgets();
    })
  );
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

function buildHeatmapCardHtml(){
  const log = getStudyLog();
  const nowParts = getBjtParts();
  const year = nowParts.year;
  const month = nowParts.month; // 1-based
  const todayDate = nowParts.day;
  const timeStr = getBjtClockText();
  const firstDayOfWeek = getWeekdayIndex(year, month, 1);
  const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();
  const dayLabels = ["日","一","二","三","四","五","六"];

  let cellsHtml = "";
  for(let i=0; i<firstDayOfWeek; i++){
    cellsHtml += `<div class="hm-cell hm-empty"></div>`;
  }
  for(let d=1; d<=daysInMonth; d++){
    const key = dateKey(year, month, d);
    const e = log[key];
    let level = 0;
    const doneCount = Number(e?.done || 0);
    if(doneCount > 0){
      if(doneCount >= 4) level = 3;
      else if(doneCount >= 2) level = 2;
      else level = 1;
    }
    const isToday = d === todayDate;
    const weekday = WEEKDAY_CN[getWeekdayIndex(year, month, d)];
    cellsHtml += `<div class="hm-cell ${level===0?"":level===1?"l1":level===2?"l2":"l3"} ${isToday?"hm-today":""}"
      title="${year}年${month}月${d}日 ${weekday}${e?` — 完成${e.done}/${e.total}`:" — 未完成任务"}"></div>`;
  }

  return `
    <div class="heatmap-head">
      <span class="card-title heatmap-head-title">🔥 学习热力图</span>
      <span class="heatmap-head-time">${timeStr} 北京时间</span>
    </div>
    <div style="font-size:11px;color:var(--text-dim);margin-bottom:4px">${year}年${month}月</div>
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

/* ── FIX #4: 热力图——按月渲染 + 北京时间 + 正确的星期对应 ── */
function renderHeatmap(){
  const el  = document.getElementById("heatmap-card");
  if(!el) return;
  el.innerHTML = buildHeatmapCardHtml();
}

function renderAiTip(){
  document.getElementById("aitip-card").innerHTML =
    `<div class="aitip-label">🤖 AI 备考建议</div>` +
    aiTips.map(t=>`<div class="aitip-item">${esc(t)}</div>`).join("");
}

/* ══════════════════════════════════
   DASHBOARD (inner page)
══════════════════════════════════ */

/* ── Taskboard helpers ── */
function getWeekRange(refDateStr) {
  const ref = refDateStr || todayStr();
  const p = parseDateKey(ref);
  if(!p) return [];
  const dow = getWeekdayIndex(p.year, p.month, p.day); // 0=Sun
  const mondayOffset = dow === 0 ? -6 : 1 - dow;
  const days = [];
  for(let i = 0; i < 7; i++) days.push(shiftDateKey(ref, mondayOffset + i));
  return days; // Mon → Sun
}

function getTaskboardDateKey(task){
  if(task?.done){
    const doneDate = getCompletedDateKey(task);
    if(doneDate) return doneDate;
  }
  return getTaskWorkingDate(task);
}

function buildTaskboardToday(activeDate) {
  const date = activeDate || todayStr();
  const tasks = getTasks();
  const dayTasks = tasks.filter(t => getTaskboardDateKey(t) === date)
    .sort((a,b) => { if(!!a.done === !!b.done) return 0; return a.done ? 1 : -1; });
  return `
    <div class="date-selector-row" style="margin-bottom:10px">
      <label style="font-size:12px;color:var(--text-dim)">日期</label>
      <input id="dt-date" type="date" value="${date}"
        style="padding:5px 8px;background:var(--bg-inset);border:2px solid var(--border);
               border-radius:var(--card-r);font-size:12px;color:var(--text-main)"/>
    </div>
    <div class="add-task-row" style="margin-bottom:10px">
      <input class="add-task-input" id="dt-inp" type="text" placeholder="添加任务…"/>
      <select class="add-task-select" id="dt-sel">
        <option>讲义</option><option>练习</option><option>复盘</option>
        <option>真题</option><option>视频</option><option>复习</option>
      </select>
      <button class="add-task-btn" id="dt-add">＋</button>
    </div>
    <div class="stack" id="dt-list">
      ${dayTasks.length ? dayTasks.map(t => `
        <div class="task-item ${t.done ? "done" : ""}" data-tid="${esc(t.id)}">
          <div class="task-cb">${t.done ? "✓" : ""}</div>
          <div class="task-body">
            <div class="task-title">${esc(t.title)}</div>
            ${t.detail ? `<div class="task-detail">${esc(t.detail)}</div>` : ""}
          </div>
          <span class="task-tag" data-t="${esc(t.type)}">${esc(t.type)}</span>
          <button class="btn-danger btn-small" data-dt="${esc(t.id)}" style="margin-left:4px;flex-shrink:0">✕</button>
        </div>`).join("")
      : `<div class="task-empty">这天还没有任务，先添加一个学习目标吧。</div>`}
    </div>`;
}

function buildTaskboardWeek() {
  const today = todayStr();
  const weekDays = getWeekRange(today);
  const tasks = getTasks();
  const weekdayNames = ["周一","周二","周三","周四","周五","周六","周日"];
  return `
    <div style="display:flex;flex-direction:column;gap:6px">
      ${weekDays.map((dayKey, i) => {
        const p = parseDateKey(dayKey);
        const dayTasks = tasks.filter(t => getTaskboardDateKey(t) === dayKey);
        const done = dayTasks.filter(t => t.done);
        const pending = dayTasks.filter(t => !t.done);
        const isToday = dayKey === today;
        return `
          <div class="week-day-zone" data-drop-day="${esc(dayKey)}"
               style="background:${isToday ? "var(--bg-inset)" : "var(--bg-panel)"};
                      border:2px solid ${isToday ? "var(--accent-blue)" : "var(--border)"};
                      border-radius:var(--card-r);overflow:hidden">
            <div style="display:flex;align-items:center;gap:10px;padding:9px 12px">
              <span style="font-family:'VT323',monospace;font-size:15px;min-width:32px;
                           color:${isToday ? "var(--accent-blue)" : "var(--text-dim)"}">${weekdayNames[i]}</span>
              <span style="font-size:12px;color:var(--text-sub)">${p?.month}/${p?.day}</span>
              ${isToday ? `<span style="font-size:10px;padding:1px 6px;background:var(--accent-blue);color:white;border-radius:2px">今日</span>` : ""}
              <span style="margin-left:auto;display:flex;gap:10px;align-items:center">
                ${done.length ? `<span style="font-size:11px;color:var(--accent-green)">✓ ${done.length}</span>` : ""}
                ${pending.length ? `<span style="font-size:11px;color:var(--accent-rose)">○ ${pending.length}</span>` : ""}
                ${!dayTasks.length ? `<span style="font-size:11px;color:var(--text-dim)">无任务</span>` : ""}
              </span>
            </div>
            ${dayTasks.length ? `
              <div style="padding:0 12px 9px;display:flex;flex-direction:column;gap:0">
                ${[...pending, ...done].map(t => {
                  const rolloverBadge = t.rolloverCount > 0
                    ? `<span class="week-rollover-badge" title="顺延 ${t.rolloverCount} 次">↩${t.rolloverCount}</span>`
                    : "";
                  return `
                  <div class="week-task-row" draggable="true" data-drag-task="${esc(t.id)}"
                       style="display:flex;align-items:center;gap:8px;padding:5px 0;
                              border-top:1px solid var(--border-light)">
                    <span class="week-drag-handle" title="拖拽移到其他天">⠿</span>
                    <button class="week-task-cb ${t.done?"week-task-cb-done":""}" data-week-cb="${esc(t.id)}"
                            aria-label="切换完成状态" title="${t.done ? "取消完成" : "标记完成"}">
                      ${t.done ? "✓" : "○"}
                    </button>
                    <span style="font-size:12px;flex:1;color:${t.done ? "var(--text-dim)" : "var(--text-main)"};
                                 text-decoration:${t.done ? "line-through" : "none"}">${esc(t.title)}</span>
                    ${rolloverBadge}
                    <span class="task-tag" data-t="${esc(t.type)}" style="pointer-events:none">${esc(t.type)}</span>
                  </div>`}).join("")}
              </div>` : `<div class="week-drop-hint">拖拽任务到这里</div>`}
          </div>`;
      }).join("")}
    </div>`;
}

function bindWeekEvents(bodyEl) {
  if(!bodyEl) return;
  let draggedTaskId = null;

  /* 勾选完成/取消 */
  bodyEl.querySelectorAll("[data-week-cb]").forEach(btn => {
    btn.addEventListener("click", e => {
      e.stopPropagation();
      const ts = getTasks();
      const t = ts.find(x => x.id === btn.dataset.weekCb);
      if(!t) return;
      const prev = getCompletedDateKey(t);
      t.done = !t.done;
      t.completedAt = t.done ? buildCompletedAtByDateKey(getTaskWorkingDate(t)) : "";
      saveTasks(ts);
      const now = getCompletedDateKey(t);
      if(prev) syncStudyLog(prev);
      if(now)  syncStudyLog(now);
      if(window.syncTask) syncTask(t);
      if(prev) syncStudyLogCloud(prev);
      if(now)  syncStudyLogCloud(now);
      bodyEl.innerHTML = buildTaskboardWeek();
      bindWeekEvents(bodyEl);
      renderTodayTasks(); renderHeatmap(); renderProfileCard();
    });
  });

  /* 拖拽：开始 */
  bodyEl.querySelectorAll("[data-drag-task]").forEach(row => {
    row.addEventListener("dragstart", e => {
      draggedTaskId = row.dataset.dragTask;
      row.classList.add("week-dragging");
      e.dataTransfer.effectAllowed = "move";
    });
    row.addEventListener("dragend", () => {
      row.classList.remove("week-dragging");
    });
  });

  /* 拖拽：放入目标天 */
  bodyEl.querySelectorAll("[data-drop-day]").forEach(zone => {
    zone.addEventListener("dragover", e => {
      e.preventDefault();
      zone.classList.add("week-drag-over");
    });
    zone.addEventListener("dragleave", e => {
      if(!zone.contains(e.relatedTarget)) zone.classList.remove("week-drag-over");
    });
    zone.addEventListener("drop", e => {
      e.preventDefault();
      zone.classList.remove("week-drag-over");
      if(!draggedTaskId) return;
      const targetDay = zone.dataset.dropDay;
      const ts = getTasks();
      const t = ts.find(x => x.id === draggedTaskId);
      if(!t) return;
      if(getTaskWorkingDate(t) === targetDay){ draggedTaskId = null; return; }
      t.workingDate = targetDay;
      t.date = targetDay;
      saveTasks(ts);
      if(window.syncTask) syncTask(t);
      draggedTaskId = null;
      bodyEl.innerHTML = buildTaskboardWeek();
      bindWeekEvents(bodyEl);
      renderTodayTasks(); renderHeatmap(); renderProfileCard();
    });
  });
}

function buildTaskboardMonth(expandedDate) {
  const today = todayStr();
  const p = getBjtParts();
  const { year, month } = p;
  const tasks = getTasks();
  const firstDayOfWeek = getWeekdayIndex(year, month, 1);
  const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();
  const dayLabels = ["日","一","二","三","四","五","六"];

  const tasksByDay = {};
  for(let d = 1; d <= daysInMonth; d++) {
    const key = dateKey(year, month, d);
    const dt = tasks.filter(t => getTaskboardDateKey(t) === key);
    tasksByDay[key] = { done: dt.filter(t=>t.done).length, pending: dt.filter(t=>!t.done).length, tasks: dt };
  }

  let cells = "";
  for(let i=0; i<firstDayOfWeek; i++) cells += `<div></div>`;
  for(let d=1; d<=daysInMonth; d++) {
    const key = dateKey(year, month, d);
    const td = tasksByDay[key];
    const isToday = key === today;
    const isExpanded = key === expandedDate;
    const hasTasks = td.done > 0 || td.pending > 0;
    let bg = "var(--bg-panel)", bc = "var(--border-light)";
    if(isToday) { bg = "rgba(63,98,160,0.08)"; bc = "var(--accent-blue)"; }
    else if(hasTasks && td.pending === 0) { bg = "rgba(80,127,70,0.1)"; bc = "var(--accent-green)"; }
    else if(hasTasks && td.done > 0) { bg = "rgba(184,131,46,0.1)"; bc = "var(--accent-gold)"; }
    cells += `
      <div class="month-day-cell" data-day="${esc(key)}" style="
        background:${bg};border:1px solid ${bc};border-radius:2px;padding:4px 3px;
        cursor:${hasTasks?"pointer":"default"};min-height:44px;
        ${isExpanded ? "outline:2px solid var(--accent-blue);outline-offset:1px" : ""}">
        <div style="font-size:11px;font-weight:600;color:${isToday?"var(--accent-blue)":"var(--text-sub)"};text-align:center">${d}</div>
        ${td.done > 0 ? `<div style="font-size:9px;color:var(--accent-green);text-align:center">✓${td.done}</div>` : ""}
        ${td.pending > 0 ? `<div style="font-size:9px;color:var(--accent-rose);text-align:center">○${td.pending}</div>` : ""}
      </div>`;
  }

  let expandedHtml = "";
  if(expandedDate && tasksByDay[expandedDate]) {
    const ep = parseDateKey(expandedDate);
    const ed = tasksByDay[expandedDate];
    expandedHtml = `
      <div style="margin-top:10px;padding:11px;background:var(--bg-inset);border:1px solid var(--border-light);border-radius:var(--card-r)">
        <div style="font-family:'VT323',monospace;font-size:15px;color:var(--text-main);margin-bottom:7px">${ep?.month}月${ep?.day}日 · 任务详情</div>
        ${ed.tasks.length ? ed.tasks.map(t=>`
          <div style="display:flex;align-items:center;gap:8px;padding:5px 0;border-bottom:1px solid var(--border-light)">
            <span style="color:${t.done?"var(--accent-green)":"var(--text-dim)"}">${t.done?"✓":"○"}</span>
            <span style="flex:1;font-size:12px;color:${t.done?"var(--text-dim)":"var(--text-main)"};
                         text-decoration:${t.done?"line-through":"none"}">${esc(t.title)}</span>
            <span class="task-tag" data-t="${esc(t.type)}" style="pointer-events:none">${esc(t.type)}</span>
          </div>`).join("")
        : `<div style="font-size:12px;color:var(--text-dim)">这天没有任务记录</div>`}
      </div>`;
  }

  return `
    <div style="font-size:13px;font-weight:500;color:var(--text-sub);margin-bottom:8px">${year}年${month}月
      <span style="font-size:11px;color:var(--text-dim);font-weight:400;margin-left:8px">点击有任务的日期查看详情</span>
    </div>
    <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:3px;margin-bottom:4px">
      ${dayLabels.map(d=>`<div style="text-align:center;font-size:11px;color:var(--text-dim);padding:3px;font-family:'VT323',monospace">${d}</div>`).join("")}
    </div>
    <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:3px">${cells}</div>
    <div style="display:flex;gap:12px;flex-wrap:wrap;margin-top:8px;font-size:11px;color:var(--text-dim)">
      <span><span style="display:inline-block;width:10px;height:10px;background:rgba(80,127,70,0.2);border:1px solid var(--accent-green);border-radius:1px;vertical-align:middle"></span> 全部完成</span>
      <span><span style="display:inline-block;width:10px;height:10px;background:rgba(184,131,46,0.15);border:1px solid var(--accent-gold);border-radius:1px;vertical-align:middle"></span> 部分完成</span>
      <span><span style="display:inline-block;width:10px;height:10px;background:var(--bg-panel);border:1px solid var(--border-light);border-radius:1px;vertical-align:middle"></span> 待办</span>
    </div>
    <div id="month-expanded-detail">${expandedHtml}</div>`;
}

function buildTaskboardYear(expandedMonth) {
  const p = getBjtParts();
  const { year } = p;
  const currentMonth = p.month;
  const tasks = getTasks();
  const monthNames = ["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"];

  const months = Array.from({length:12}, (_,i) => {
    const m = i + 1;
    const dim = new Date(Date.UTC(year, m, 0)).getUTCDate();
    let done = 0, pending = 0;
    for(let d = 1; d <= dim; d++) {
      const key = dateKey(year, m, d);
      const dt = tasks.filter(t => getTaskboardDateKey(t) === key);
      done += dt.filter(t=>t.done).length;
      pending += dt.filter(t=>!t.done).length;
    }
    return { m, done, pending, total: done+pending };
  });

  const cardsHtml = months.map(({ m, done, pending, total }) => {
    const isCurrent = m === currentMonth;
    const isExpanded = m === expandedMonth;
    const pct = total > 0 ? Math.round(done/total*100) : 0;
    return `
      <div class="month-year-card" data-month="${m}" style="
        padding:10px;background:${isCurrent?"var(--bg-inset)":"var(--bg-panel)"};
        border:2px solid ${isCurrent?"var(--accent-blue)":isExpanded?"var(--accent-teal)":"var(--border)"};
        border-radius:var(--card-r);cursor:pointer;transition:all var(--transition)">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px">
          <span style="font-family:'VT323',monospace;font-size:16px;
                       color:${isCurrent?"var(--accent-blue)":"var(--text-main)"}">${monthNames[m-1]}</span>
          ${isCurrent?`<span style="font-size:9px;padding:1px 5px;background:var(--accent-blue);color:white;border-radius:2px">本月</span>`:""}
        </div>
        <div style="font-size:11px;color:var(--text-sub)">
          ${total ? `<span style="color:var(--accent-green)">✓${done}</span>  <span style="color:var(--accent-rose)">○${pending}</span>` : `<span style="color:var(--text-dim)">无任务</span>`}
        </div>
        ${total ? `<div style="margin-top:5px;height:3px;background:var(--bg-card2);border-radius:2px;overflow:hidden">
          <div style="height:100%;background:var(--accent-teal);width:${pct}%"></div>
        </div>` : ""}
      </div>`;
  }).join("");

  let expandedHtml = "";
  if(expandedMonth) {
    const dim = new Date(Date.UTC(year, expandedMonth, 0)).getUTCDate();
    const monthTasks = [];
    for(let d = 1; d <= dim; d++) {
      const key = dateKey(year, expandedMonth, d);
      const dt = tasks.filter(t => getTaskboardDateKey(t) === key);
      if(dt.length) monthTasks.push({ key, d, dt });
    }
    expandedHtml = `
      <div style="margin-top:10px;padding:11px;background:var(--bg-inset);border:1px solid var(--border-light);border-radius:var(--card-r)">
        <div style="font-family:'VT323',monospace;font-size:15px;color:var(--text-main);margin-bottom:8px">${year}年${monthNames[expandedMonth-1]} · 任务详情</div>
        ${monthTasks.length ? monthTasks.map(({ key, d, dt }) => `
          <div style="margin-bottom:8px">
            <div style="font-size:11px;color:var(--text-dim);margin-bottom:3px">${expandedMonth}月${d}日</div>
            ${dt.map(t=>`
              <div style="display:flex;align-items:center;gap:8px;padding:4px 0;border-bottom:1px solid var(--border-light)">
                <span style="color:${t.done?"var(--accent-green)":"var(--text-dim)"}">${t.done?"✓":"○"}</span>
                <span style="flex:1;font-size:12px;color:${t.done?"var(--text-dim)":"var(--text-main)"};
                             text-decoration:${t.done?"line-through":"none"}">${esc(t.title)}</span>
                <span class="task-tag" data-t="${esc(t.type)}" style="pointer-events:none">${esc(t.type)}</span>
              </div>`).join("")}
          </div>`).join("")
        : `<div style="font-size:12px;color:var(--text-dim)">这个月没有任务记录</div>`}
      </div>`;
  }

  return `
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:7px">${cardsHtml}</div>
    <div id="year-expanded-detail">${expandedHtml}</div>`;
}

function buildDashboard(){
  const today    = todayStr();
  const log      = getStudyLog();
  const tasks    = getTasks();
  const todayTasks = tasks.filter(t => getTaskWorkingDate(t) === today);
  const todayDone  = todayTasks.filter(t => t.done).length;
  const weekDone   = getLast7DaysDone(log);
  const examDate   = getExamDate();
  const days       = getCountdownDays();

  return `<div class="dash-content-stack">

  <!-- ── 三格指标 ── -->
  <div class="dash-metric-row" style="grid-template-columns:1fr 1fr 1fr">
    <div class="dash-metric-box">
      <span class="dash-metric-val">${todayDone}<small style="font-size:14px;color:var(--text-dim)">/${todayTasks.length}</small></span>
      <span class="dash-metric-key">今日学习完成</span>
    </div>
    <div class="dash-metric-box">
      <span class="dash-metric-val">${weekDone}</span>
      <span class="dash-metric-key">近7天完成任务</span>
    </div>
    <div class="dash-metric-box" style="position:relative">
      <span class="dash-metric-val" style="color:var(--accent-rose)">${days}</span>
      <span class="dash-metric-key" id="dash-exam-key-label">距考试 · ${esc(examDate)}</span>
      <button id="dash-exam-edit-btn"
        style="position:absolute;top:7px;right:8px;font-size:10px;padding:2px 7px;
               background:var(--bg-card2);border:1px solid var(--border);border-radius:var(--card-r);
               color:var(--text-dim);cursor:pointer;line-height:1.4;font-family:inherit">设置</button>
      <div id="dash-exam-popover"
        style="display:none;position:absolute;top:calc(100% + 6px);right:0;z-index:60;
               background:var(--bg-card);border:2px solid var(--border);border-radius:var(--card-r);
               padding:13px;box-shadow:var(--px-shadow);min-width:230px">
        <div style="font-size:12px;color:var(--text-sub);margin-bottom:8px;font-weight:500">自定义考试日期</div>
        <input id="dash-exam-input" type="date" value="${esc(examDate)}"
          style="width:100%;padding:6px 8px;background:var(--bg-inset);border:2px solid var(--border);
                 border-radius:var(--card-r);font-size:12px;color:var(--text-main);display:block;margin-bottom:8px"/>
        <button id="dash-exam-save" class="btn-primary" style="width:100%;padding:7px">保存</button>
        <span id="dash-exam-msg" style="display:block;font-size:11px;color:var(--accent-teal);margin-top:5px;min-height:14px"></span>
      </div>
    </div>
  </div>

  <!-- ── 任务看板 ── -->
  <div class="card card-pad">
    <div class="card-hdr" style="margin-bottom:12px">
      <span class="section-kicker">Tasks</span><h4>任务看板</h4>
    </div>
    <div style="display:flex;gap:6px;margin-bottom:14px;flex-wrap:wrap" id="taskboard-tabs">
      <button class="unit-tab active" data-tb="today">今日</button>
      <button class="unit-tab" data-tb="week">本周</button>
      <button class="unit-tab" data-tb="month">本月</button>
      <button class="unit-tab" data-tb="year">今年</button>
    </div>
    <div id="taskboard-body"></div>
  </div>

  <!-- ── 热力图 ── -->
  <div class="card card-pad">
    <div id="dt-heatmap-card">${buildHeatmapCardHtml()}</div>
  </div>
  </div>`;
}

function refreshDashboardList(el, dateStr){
  const tasks    = getTasks();
  const dayTasks = tasks.filter(t => getTaskboardDateKey(t) === dateStr);
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
        const prevCompletedDate = getCompletedDateKey(t);
        t.done = !t.done;
        const completionDate = parseDateKey(dateStr) ? dateStr : getTaskWorkingDate(t);
        t.completedAt = t.done ? buildCompletedAtByDateKey(completionDate) : "";
        saveTasks(ts);
        const nowCompletedDate = getCompletedDateKey(t);
        if(prevCompletedDate) syncStudyLog(prevCompletedDate);
        if(nowCompletedDate) syncStudyLog(nowCompletedDate);
        if(window.syncTask) syncTask(t);
        if(prevCompletedDate) syncStudyLogCloud(prevCompletedDate);
        if(nowCompletedDate) syncStudyLogCloud(nowCompletedDate);
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
      if(window.deleteTask) deleteTask(btn.dataset.dt);
      const completedDate = t ? getCompletedDateKey(t) : "";
      saveTasks(ts.filter(x => x.id !== btn.dataset.dt));
      if(completedDate){
        syncStudyLog(completedDate);
        syncStudyLogCloud(completedDate);
      }
      refreshDashboardList(el, dateStr);
      refreshDashboardHeatmap(el);
      renderTodayTasks(); renderHeatmap(); renderProfileCard(); renderCourseProgress();
    })
  );
}

function refreshDashboardHeatmap(el){
  const hm  = el.querySelector("#dt-heatmap-card");
  if(!hm) return;
  hm.innerHTML = buildHeatmapCardHtml();
}

function refreshDashboardHeatmapIfActive(){
  const page = document.getElementById("page-dashboard");
  if(!page || !page.classList.contains("active")) return;
  refreshDashboardHeatmap(page);
}

function bindDashboardEvents(el){
  let dashActiveTab  = "today";
  let dashActiveDate = todayStr();
  let dashExpandedDate  = null;
  let dashExpandedMonth = null;

  /* ── Exam date popover ── */
  const editBtn = el.querySelector("#dash-exam-edit-btn");
  const popover = el.querySelector("#dash-exam-popover");
  let popoverCloseHandler = null;

  editBtn?.addEventListener("click", e => {
    e.stopPropagation();
    const nowHidden = popover.style.display === "none" || !popover.style.display;
    popover.style.display = nowHidden ? "block" : "none";
    if(nowHidden) {
      if(popoverCloseHandler) document.removeEventListener("click", popoverCloseHandler);
      popoverCloseHandler = ev => {
        if(!popover.contains(ev.target) && ev.target !== editBtn) {
          popover.style.display = "none";
          document.removeEventListener("click", popoverCloseHandler);
          popoverCloseHandler = null;
        }
      };
      setTimeout(() => document.addEventListener("click", popoverCloseHandler), 0);
    }
  });

  el.querySelector("#dash-exam-save")?.addEventListener("click", () => {
    const val = el.querySelector("#dash-exam-input")?.value;
    if(!val) return;
    saveExamDate(val);
    if(window.syncExamDate) syncExamDate(val);
    renderCountdown(); renderProfileCard();
    document.getElementById("topbar-days").textContent = getCountdownDays();
    const keyLabel = el.querySelector("#dash-exam-key-label");
    if(keyLabel) keyLabel.textContent = `距考试 · ${val}`;
    const valEl = el.querySelector(".dash-metric-box:nth-child(3) .dash-metric-val");
    if(valEl) valEl.textContent = getCountdownDays();
    const msg = el.querySelector("#dash-exam-msg");
    if(msg) { msg.textContent = "✓ 已保存"; setTimeout(()=>msg.textContent="",2000); }
    popover.style.display = "none";
  });

  /* ── Taskboard tabs ── */
  const tabsEl  = el.querySelector("#taskboard-tabs");
  const bodyEl  = el.querySelector("#taskboard-body");

  const renderView = () => {
    if(dashActiveTab === "today") {
      bodyEl.innerHTML = buildTaskboardToday(dashActiveDate);
      bindTodayEvents();
    } else if(dashActiveTab === "week") {
      bodyEl.innerHTML = buildTaskboardWeek();
      bindWeekEvents(bodyEl);
    } else if(dashActiveTab === "month") {
      bodyEl.innerHTML = buildTaskboardMonth(dashExpandedDate);
      bindMonthEvents();
    } else if(dashActiveTab === "year") {
      bodyEl.innerHTML = buildTaskboardYear(dashExpandedMonth);
      bindYearEvents();
    }
  };

  tabsEl?.querySelectorAll("[data-tb]").forEach(btn =>
    btn.addEventListener("click", () => {
      dashActiveTab = btn.dataset.tb;
      dashExpandedDate  = null;
      dashExpandedMonth = null;
      tabsEl.querySelectorAll(".unit-tab").forEach(b =>
        b.classList.toggle("active", b.dataset.tb === dashActiveTab));
      renderView();
    })
  );

  /* ── Today view events ── */
  function bindTodayEvents() {
    bodyEl.querySelector("#dt-date")?.addEventListener("change", e => {
      dashActiveDate = e.target.value;
      bodyEl.innerHTML = buildTaskboardToday(dashActiveDate);
      bindTodayEvents();
    });

    const addFn = () => {
      const inp = bodyEl.querySelector("#dt-inp");
      const sel = bodyEl.querySelector("#dt-sel");
      const v   = inp?.value?.trim();
      if(!v) return;
      const ts = getTasks();
      const newTask = {
        id:"t-"+Date.now(), title:v, type:sel?.value||"讲义",
        done:false, detail:"",
        date:dashActiveDate, plannedDate:dashActiveDate, workingDate:dashActiveDate,
        completedAt:"", rolloverCount:0, rolloverMode:""
      };
      ts.push(newTask);
      saveTasks(ts);
      if(window.syncTask) syncTask(newTask);
      inp.value = "";
      bodyEl.innerHTML = buildTaskboardToday(dashActiveDate);
      bindTodayEvents();
      refreshDashboardHeatmap(el);
      renderTodayTasks(); renderHeatmap(); renderProfileCard(); renderCourseProgress();
    };
    bodyEl.querySelector("#dt-add")?.addEventListener("click", addFn);
    bodyEl.querySelector("#dt-inp")?.addEventListener("keydown", e => { if(e.key==="Enter") addFn(); });

    bodyEl.querySelectorAll(".task-item[data-tid]").forEach(item =>
      item.addEventListener("click", ev => {
        if(ev.target.closest("[data-dt]") || ev.target.tagName === "SELECT") return;
        const ts = getTasks();
        const t  = ts.find(x => x.id === item.dataset.tid);
        if(t) {
          const prev = getCompletedDateKey(t);
          t.done = !t.done;
          t.completedAt = t.done ? buildCompletedAtByDateKey(dashActiveDate) : "";
          saveTasks(ts);
          const now = getCompletedDateKey(t);
          if(prev) syncStudyLog(prev);
          if(now)  syncStudyLog(now);
          if(window.syncTask) syncTask(t);
          if(prev) syncStudyLogCloud(prev);
          if(now)  syncStudyLogCloud(now);
          bodyEl.innerHTML = buildTaskboardToday(dashActiveDate);
          bindTodayEvents();
          refreshDashboardHeatmap(el);
          renderTodayTasks(); renderHeatmap(); renderProfileCard(); renderCourseProgress();
        }
      })
    );

    bodyEl.querySelectorAll("[data-dt]").forEach(btn =>
      btn.addEventListener("click", ev => {
        ev.stopPropagation();
        const ts = getTasks();
        const t  = ts.find(x => x.id === btn.dataset.dt);
        if(window.deleteTask) deleteTask(btn.dataset.dt);
        const cd = t ? getCompletedDateKey(t) : "";
        saveTasks(ts.filter(x => x.id !== btn.dataset.dt));
        if(cd) { syncStudyLog(cd); syncStudyLogCloud(cd); }
        bodyEl.innerHTML = buildTaskboardToday(dashActiveDate);
        bindTodayEvents();
        refreshDashboardHeatmap(el);
        renderTodayTasks(); renderHeatmap(); renderProfileCard(); renderCourseProgress();
      })
    );

    bodyEl.querySelectorAll(".task-tag[data-t]").forEach(tagEl => {
      const tid  = tagEl.closest("[data-tid]")?.dataset.tid;
      const task = getTasks().find(t => t.id === tid);
      if(task) makeTagEditable(tagEl, task);
    });
  }

  /* ── Month view events ── */
  function bindMonthEvents() {
    bodyEl.querySelectorAll(".month-day-cell").forEach(cell =>
      cell.addEventListener("click", () => {
        const day = cell.dataset.day;
        if(!day) return;
        const hasTasks = getTasks().some(t => getTaskboardDateKey(t) === day);
        if(!hasTasks) return;
        dashExpandedDate = dashExpandedDate === day ? null : day;
        bodyEl.innerHTML = buildTaskboardMonth(dashExpandedDate);
        bindMonthEvents();
      })
    );
  }

  /* ── Year view events ── */
  function bindYearEvents() {
    bodyEl.querySelectorAll(".month-year-card").forEach(card =>
      card.addEventListener("click", () => {
        const m = Number(card.dataset.month);
        dashExpandedMonth = dashExpandedMonth === m ? null : m;
        bodyEl.innerHTML = buildTaskboardYear(dashExpandedMonth);
        bindYearEvents();
      })
    );
  }

  /* Initial render */
  renderView();
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
  const structured = getUnitStructuredProgress(unit) || { pct: 0, lectureDone: false, exerciseDone: 0, exerciseTotal: getExerciseItems(unit).length };
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

    <div class="card card-pad" style="margin-top:10px">
      <div class="card-hdr"><span class="section-kicker">Progress</span><h4>单元完成情况</h4></div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
        <button class="btn-ghost btn-small" id="unit-mark-lecture-btn">${structured.lectureDone ? "✓ 讲义已完成" : "标记讲义已学完"}</button>
        <span style="font-size:12px;color:var(--text-sub)">练习正确进度：${structured.exerciseDone}/${structured.exerciseTotal || 0}</span>
        <span style="font-size:12px;color:var(--accent-teal)">单元进度：${structured.pct}%（讲义50% + 练习50%）</span>
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

  el.querySelector("#unit-mark-lecture-btn")?.addEventListener("click", () => {
    const unit = getSelectedUnit();
    markLectureDone(unit.id);
    renderInnerPage("unit-detail", document.getElementById("page-unit-detail"));
    renderCourseProgress();
  });

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
      const unit = getSelectedUnit();
      if(ok){
        markExerciseDone(unit.id, btn.dataset.eid || "");
      }
      recordExerciseResult(unit.id, ok);
      if(ok){
        ensureRecommendedTasksForUnit(unit);
      }

      if(!ok && user){
        const ml   = getMistakes();
        // 避免同一道题重复加入
        const alreadyExists = ml.some(m =>
          m.question === (btn.dataset.prompt||"练习题") &&
          normalizeAnswer(m.myAnswer) === normalizeAnswer(user) &&
          normalizeAnswer(m.correctAnswer) === normalizeAnswer(correct)
        );
        if(!alreadyExists){
          ml.push({
            id:            "m-"+Date.now(),
            date:          todayStr(),
            source:        unit.level+" "+unit.code,
            question:      btn.dataset.prompt||"练习题",
            myAnswer:      user,
            correctAnswer: correct,
            reason:"",
            reflection:"",
            tags:[],
            mastered: false,
            reviewCount: 0,
            lastReviewedAt: ""
          });
          saveMistakes(ml);
          if(window.syncMistake) syncMistake(ml[ml.length-1]);
          resEl.innerHTML = `✗ 错误（参考：${esc(correct)}）<span class="mistake-auto-added">✓ 已自动加入错题库</span>`;
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
    <div class="wip-banner">
      <span class="wip-banner-icon">🚧</span>
      <div>
        <strong>功能建设中</strong>
        <p>题库模块正在搭建，计划收录 TCF Canada 听力、阅读、口语、写作真题与相似题，支持按难度和知识点筛选练习。</p>
      </div>
    </div>
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
const DEFAULT_TAGS = ["语法","词汇","听力","阅读","审题","表达"];

function getMistakeTagLibrary(){
  try{
    const raw = JSON.parse(localStorage.getItem(MISTAKE_TAG_KEY) || "null");
    if(Array.isArray(raw) && raw.length){
      return [...new Set(raw.map(x => String(x || "").trim()).filter(Boolean))];
    }
  }catch{}
  return [...DEFAULT_TAGS];
}

function saveMistakeTagLibrary(tags){
  const cleaned = [...new Set((tags || []).map(x => String(x || "").trim()).filter(Boolean))];
  localStorage.setItem(MISTAKE_TAG_KEY, JSON.stringify(cleaned.length ? cleaned : DEFAULT_TAGS));
}

function buildMistakes(){
  const ml = getMistakes().map(m => ({
    ...m,
    mastered: !!m.mastered,
    reviewCount: Number(m.reviewCount || 0),
    lastReviewedAt: m.lastReviewedAt || ""
  }));
  const tagLibrary = getMistakeTagLibrary();
  const allTags = [...new Set([...tagLibrary,...ml.flatMap(m=>m.tags||[])])];
  const activeRows = ml.filter(m => !m.mastered).length;
  const masteredRows = ml.filter(m => m.mastered).length;
  const tableHtml = ml.length===0
    ? `<p style="color:var(--text-dim);font-size:13px;padding:16px 0">还没有错题记录。做练习题时答错会自动加入，也可以手动填写。</p>`
    : `<div class="mistake-table-wrap"><table class="mistake-table" id="mistake-table">
        <thead><tr><th>日期</th><th>来源</th><th>题目</th><th>我的答案</th><th>正确答案</th><th>错误原因</th><th>反思</th><th>标签</th><th>操作</th></tr></thead>
        <tbody>${ml.map(m=>`
          <tr data-tags="${(m.tags||[]).join(",")}" data-mastered="${m.mastered ? "1" : "0"}">
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
              <button class="btn-ghost btn-small" data-rv="${esc(m.id)}" style="margin-top:3px">${m.mastered ? "再练" : "重练"}</button>
            </td>
          </tr>`).join("")}
        </tbody>
      </table></div>`;

  return `
    <div class="card card-pad">
      <div class="card-hdr" style="flex-wrap:wrap;gap:10px">
        <div><span class="section-kicker">Pool</span><h4>错题池（未掌握 ${activeRows} 条 / 已掌握 ${masteredRows} 条）</h4></div>
        <div style="display:flex;gap:8px">
          <button class="btn-ghost btn-small" id="mf-toggle">＋ 手动记录错题</button>
          <button class="btn-ghost btn-small" id="exp-mis">↓ 导出CSV</button>
          <button class="btn-danger btn-small" id="clr-all">清空全部</button>
        </div>
      </div>
      <div id="mf-card" style="display:none;margin-bottom:14px;padding:14px;background:var(--bg-inset);border:1px solid var(--border);border-radius:var(--card-r)">
        <p style="font-size:12px;color:var(--text-sub);margin:0 0 10px">练习题答错时会自动入库；以下表单用于手动补录 TCF 真题、听力等场景的错误。</p>
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
              ${allTags.map(t=>`<span class="tag-pill" style="border-color:var(--accent-purple);color:var(--accent-purple)" data-tag="${esc(t)}">${esc(t)}</span>`).join("")}
            </div>
          </div>
          <div style="display:flex;gap:9px">
            <button class="btn-primary" id="mf-submit">保存错题</button>
            <button class="btn-ghost" id="mf-clear">清空</button>
          </div>
        </div>
      </div>
      <div class="tag-filter-row" id="mis-status-filter">
        <span class="tag-pill selected" style="background:var(--accent-teal);border-color:var(--accent-teal);color:white" data-status="未掌握">未掌握</span>
        <span class="tag-pill" style="border-color:var(--accent-teal);color:var(--accent-teal)" data-status="全部">全部</span>
        <span class="tag-pill" style="border-color:var(--accent-teal);color:var(--accent-teal)" data-status="已掌握">已掌握</span>
      </div>
      <div class="tag-filter-row" id="mis-filter">
        <span class="tag-pill selected" style="background:var(--accent-purple);border-color:var(--accent-purple);color:white" data-filter="全部">全部</span>
        ${allTags.map(t=>`<span class="tag-pill" style="border-color:var(--accent-purple);color:var(--accent-purple)" data-filter="${esc(t)}">${esc(t)}</span>`).join("")}
      </div>
      <div class="tag-filter-row" id="mis-tag-manager">
        <input class="form-input" id="mis-tag-input" type="text" placeholder="自定义标签名" style="max-width:180px;padding:4px 8px;font-size:12px"/>
        <button class="btn-ghost btn-small" id="mis-tag-add">添加标签</button>
        <button class="btn-ghost btn-small" id="mis-tag-del-mode" data-on="0">删除标签模式：关</button>
      </div>
      ${tableHtml}
      <p style="font-size:11px;color:var(--text-dim);margin-top:6px">💡 错误原因和反思列可直接点击编辑。点击标签旁“＋标签”可修改标签。点击“重练”会在下方进入即时复习区。</p>
      <div class="mistake-repractice-panel" id="mistake-repractice-panel">
        <div class="mistake-repractice-empty">选择上方某道错题后，在这里重练并立即判定正误。</div>
      </div>
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
  const rerender = () => {
    renderedPages.delete("mistakes");
    renderInnerPage("mistakes", document.getElementById("page-mistakes"));
  };

  /* 手动录入表单展开/折叠 */
  el.querySelector("#mf-toggle")?.addEventListener("click", () => {
    const card = el.querySelector("#mf-card");
    const btn  = el.querySelector("#mf-toggle");
    const open = card.style.display !== "none";
    card.style.display = open ? "none" : "block";
    btn.textContent = open ? "＋ 手动记录错题" : "▲ 收起";
  });

  let selTags = [];
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
      tags:          selTags.length ? selTags : [],
      mastered:      false,
      reviewCount:   0,
      lastReviewedAt: ""
    };
    ml.push(newM);
    saveMistakes(ml);
    if(window.syncMistake) syncMistake(newM);
    rerender();
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
      const allOpts  = [...new Set([...getMistakeTagLibrary(), ...m.tags])];
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
      rerender();
    })
  );

  /* 错题池页内重练 */
  const panel = el.querySelector("#mistake-repractice-panel");
  const renderRepractice = (m) => {
    if(!panel || !m) return;
    panel.innerHTML = `
      <div class="mistake-repractice-head">
        <span class="section-kicker">RePractice</span>
        <span class="mistake-repractice-status">${m.mastered ? "状态：已掌握" : "状态：未掌握"}</span>
      </div>
      <div class="mistake-repractice-q">题目：${esc(m.question)}</div>
      <div class="mistake-repractice-a">你的旧答案：${esc(m.myAnswer || "（空）")}</div>
      <div class="mistake-repractice-row">
        <input class="grade-input" id="mr-answer" type="text" placeholder="输入你的重练答案…"/>
        <button class="grade-btn" id="mr-submit">提交</button>
        <span class="grade-result" id="mr-result"></span>
      </div>
      <div class="mistake-repractice-meta">已复习 ${m.reviewCount || 0} 次</div>
    `;
    panel.querySelector("#mr-submit")?.addEventListener("click", () => {
      const inp = panel.querySelector("#mr-answer");
      const res = panel.querySelector("#mr-result");
      const user = inp?.value?.trim() || "";
      if(!user){
        res.textContent = "请先填写答案";
        res.className = "grade-result wrong";
        return;
      }
      const list = getMistakes();
      const target = list.find(x => x.id === m.id);
      if(!target) return;
      const ok = checkAnswerCorrect(user, target.correctAnswer || "");
      target.reviewCount = Number(target.reviewCount || 0) + 1;
      target.lastReviewedAt = new Date().toISOString();
      target.mastered = !!ok;
      if(!ok) target.myAnswer = user;
      saveMistakes(list);
      if(window.syncMistake) syncMistake(target);
      res.textContent = ok ? "✓ 正确，已标记为已掌握" : "✗ 错误，请再试一次";
      res.className = "grade-result " + (ok ? "correct" : "wrong");
      setTimeout(() => rerender(), 600);
    });
  };

  el.querySelectorAll("[data-rv]").forEach(btn =>
    btn.addEventListener("click", () => {
      const m = getMistakes().find(x=>x.id===btn.dataset.rv);
      if(!m) return;
      renderRepractice(m);
    })
  );

  el.querySelector("#clr-all")?.addEventListener("click", () => {
    if(confirm("确定清空全部错题？")){
      saveMistakes([]);
      if(window.clearAllMistakes) clearAllMistakes();
      rerender();
    }
  });

  const applyMistakeFilters = () => {
    const s = el.querySelector("#mis-status-filter .tag-pill.selected")?.dataset.status || "未掌握";
    const f = el.querySelector("#mis-filter .tag-pill.selected")?.dataset.filter || "全部";
    el.querySelectorAll("#mistake-table tbody tr").forEach(r => {
      const matchStatus = s === "全部" || (s === "未掌握" ? r.dataset.mastered === "0" : r.dataset.mastered === "1");
      const matchTag = f === "全部" || r.dataset.tags.includes(f);
      r.style.display = (matchStatus && matchTag) ? "" : "none";
    });
  };

  el.querySelectorAll("#mis-status-filter .tag-pill").forEach(p =>
    p.addEventListener("click", () => {
      el.querySelectorAll("#mis-status-filter .tag-pill").forEach(x=>x.classList.remove("selected"));
      p.classList.add("selected");
      applyMistakeFilters();
    })
  );

  el.querySelectorAll("#mis-filter .tag-pill").forEach(p =>
    p.addEventListener("click", () => {
      const delMode = el.querySelector("#mis-tag-del-mode")?.dataset.on === "1";
      if(delMode && p.dataset.filter !== "全部"){
        const tag = p.dataset.filter;
        const nextLib = getMistakeTagLibrary().filter(x => x !== tag);
        saveMistakeTagLibrary(nextLib);
        const ml = getMistakes();
        ml.forEach(m => {
          m.tags = (m.tags || []).filter(x => x !== tag);
          if(window.syncMistake) syncMistake(m);
        });
        saveMistakes(ml);
        rerender();
        return;
      }
      el.querySelectorAll("#mis-filter .tag-pill").forEach(x=>x.classList.remove("selected"));
      p.classList.add("selected");
      applyMistakeFilters();
    })
  );

  el.querySelector("#mis-tag-add")?.addEventListener("click", () => {
    const input = el.querySelector("#mis-tag-input");
    const tag = input?.value?.trim();
    if(!tag) return;
    const next = [...new Set([...getMistakeTagLibrary(), tag])];
    saveMistakeTagLibrary(next);
    input.value = "";
    rerender();
  });

  el.querySelector("#mis-tag-del-mode")?.addEventListener("click", () => {
    const btn = el.querySelector("#mis-tag-del-mode");
    const on = btn.dataset.on === "1";
    btn.dataset.on = on ? "0" : "1";
    btn.textContent = on ? "删除标签模式：关" : "删除标签模式：开";
  });
  applyMistakeFilters();

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
    <div class="wip-banner">
      <span class="wip-banner-icon">🚧</span>
      <div>
        <strong>功能建设中</strong>
        <p>视频补充模块正在开发，计划支持粘贴 YouTube 链接后自动生成学习笔记、讲义要点和配套练习题。</p>
      </div>
    </div>
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
  return unit.exercises.map((ex, exIndex) => {
    if(ex.passage) return `<div class="ex-block">
      <span class="ex-type">${esc(ex.type)}</span>
      <p class="ex-instruction">${esc(ex.instruction)}</p>
      <div class="ex-passage">${esc(ex.passage)}</div>
      <div>${(ex.items||[]).map((item, itemIndex)=>`
        <div style="margin-bottom:8px">
          <span class="ex-blank-num">第 ${esc(item.blank)} 空</span>
          <div class="ex-grade-row" data-correct="${esc(item.answer)}">
            <input class="grade-input" type="text" placeholder="填写答案…"/>
            <button class="grade-btn" data-eid="${esc(buildExerciseKey(unit.id, exIndex, itemIndex))}" data-prompt="${esc(ex.instruction||"填空")}" data-correct="${esc(item.answer)}">提交</button>
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
        ${items.map((item, itemIndex)=>`
          <li class="ex-item">
            <p class="ex-prompt">${esc(item.prompt)}</p>
            <div class="ex-grade-row" data-correct="${esc(item.answer||item.modelAnswer||"")}">
              <input class="grade-input" type="text" placeholder="填写答案…"/>
              <button class="grade-btn" data-eid="${esc(buildExerciseKey(unit.id, exIndex, itemIndex))}" data-prompt="${esc(item.prompt)}" data-correct="${esc(item.answer||item.modelAnswer||"")}">提交</button>
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
  applyAutoRolloverIfNeeded();
  renderTopbar();
  renderProfileCard();
  renderFeatureNav();
  renderTodayTasks();
  renderCourseProgress();
  renderCountdown();
  renderHeatmap();
  renderAiTip();
  setInterval(() => {
    renderTodayTasks();
    renderHeatmap();
    renderProfileCard();
    refreshDashboardHeatmapIfActive();
  }, 30000);
});
