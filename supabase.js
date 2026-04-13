/* ══════════════════════════════════════════════════════
   supabase.js — Français Quest 云端同步模块
   ① 把下面两行换成你自己的 Supabase 项目信息
   ② 这个文件在 index.html 里 <script src="./supabase.js"> 引入
      必须放在 site-data.js 和 app.js 之前
══════════════════════════════════════════════════════ */

const SUPA_URL  = "https://kpzkcxuvqxcvlkcffoxm.supabase.co";   // ← 替换
const SUPA_ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtwemtjeHV2cXhjdmxrY2Zmb3htIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYwNTI1MDYsImV4cCI6MjA5MTYyODUwNn0.HLIaSWllnM6ovltP5kuNligOObLlGxgAc2F_NfCECLM";              // ← 替换

/* ── Supabase JS SDK（从 CDN 加载，无需 npm） ── */
/* 注意：index.html 里要先引入 supabase CDN script，见下方说明 */
const { createClient } = supabase;
const db = createClient(SUPA_URL, SUPA_ANON);

/* ══════════════════════════════════════════════════════
   AUTH STATE
══════════════════════════════════════════════════════ */
let currentUser = null;

/* 暴露给 app.js 使用 */
window.getUser    = () => currentUser;
window.isLoggedIn = () => !!currentUser;
window.getCurrentUsername = () => {
  const metaName = currentUser?.user_metadata?.username || currentUser?.user_metadata?.name;
  if (metaName && String(metaName).trim()) return String(metaName).trim();
  const cached = localStorage.getItem("fq-username");
  if (cached && cached.trim()) return cached.trim();
  const email = currentUser?.email || "";
  return email ? email.split("@")[0] : "";
};

/* 监听登录状态变化 */
db.auth.onAuthStateChange(async (event, session) => {
  currentUser = session?.user ?? null;
  updateProfileUI();
  if (currentUser) {
    await pullAllFromCloud();   // 登录后拉取云端数据
  }
});

/* 刷新页面时恢复会话 */
(async function initAuthSession() {
  const { data } = await db.auth.getSession();
  currentUser = data?.session?.user ?? null;
  updateProfileUI();
  if (currentUser) await pullAllFromCloud();
})();

/* ══════════════════════════════════════════════════════
   AUTH UI — 登录弹窗
══════════════════════════════════════════════════════ */

/* 在页面里注入登录弹窗 DOM */
function injectAuthModal() {
  if (document.getElementById("auth-modal")) return;
  const modal = document.createElement("div");
  modal.id = "auth-modal";
  modal.innerHTML = `
    <div class="auth-overlay" id="auth-overlay">
      <div class="auth-box">
        <div class="auth-brand">Français Quest</div>
        <div class="auth-tabs">
          <button class="auth-tab active" id="tab-login" onclick="switchAuthTab('login')">登录</button>
          <button class="auth-tab" id="tab-signup" onclick="switchAuthTab('signup')">注册</button>
        </div>
        <div id="auth-login-form">
          <input class="auth-input" id="auth-email" type="email" placeholder="邮箱地址" autocomplete="email"/>
          <input class="auth-input" id="auth-password" type="password" placeholder="密码（至少6位）" autocomplete="current-password"/>
          <button class="auth-btn-primary" onclick="doLogin()">登录</button>
          <button class="auth-btn-ghost" onclick="doResetPassword()">忘记密码？</button>
        </div>
        <div id="auth-signup-form" style="display:none">
          <input class="auth-input" id="auth-username-s" type="text" placeholder="用户名（将显示在首页角色卡）" autocomplete="nickname"/>
          <input class="auth-input" id="auth-email-s" type="email" placeholder="邮箱地址" autocomplete="email"/>
          <input class="auth-input" id="auth-password-s" type="password" placeholder="设置密码（至少6位）" autocomplete="new-password"/>
          <button class="auth-btn-primary" onclick="doSignup()">创建账号</button>
        </div>
        <p class="auth-msg" id="auth-msg"></p>
        <button class="auth-btn-ghost" onclick="closeAuthModal()" style="margin-top:4px">暂时跳过，使用本地模式</button>
      </div>
    </div>`;
  document.body.appendChild(modal);
}

window.openAuthModal = function() {
  injectAuthModal();
  document.getElementById("auth-overlay").style.display = "flex";
};

window.closeAuthModal = function() {
  const o = document.getElementById("auth-overlay");
  if (o) o.style.display = "none";
};

function injectProfileSettingsModal() {
  if (document.getElementById("profile-settings-modal")) return;
  const modal = document.createElement("div");
  modal.id = "profile-settings-modal";
  modal.innerHTML = `
    <div class="settings-overlay" id="settings-overlay">
      <div class="settings-box">
        <div class="settings-title">账号设置</div>
        <label class="settings-label" for="settings-username-input">用户名（首页角色卡显示）</label>
        <input class="settings-input" id="settings-username-input" type="text" maxlength="24" placeholder="输入用户名"/>
        <p class="settings-msg" id="settings-msg"></p>
        <div class="settings-actions">
          <button class="settings-btn-primary" id="settings-save-btn">保存</button>
          <button class="settings-btn-ghost" id="settings-cancel-btn">取消</button>
        </div>
      </div>
    </div>`;
  document.body.appendChild(modal);

  modal.querySelector("#settings-cancel-btn")?.addEventListener("click", () => {
    window.closeProfileSettings();
  });
  modal.querySelector("#settings-save-btn")?.addEventListener("click", () => {
    window.saveProfileSettings();
  });
}

function setSettingsMsg(msg, color = "var(--accent-rose)") {
  const el = document.getElementById("settings-msg");
  if (el) {
    el.textContent = msg;
    el.style.color = color;
  }
}

window.openProfileSettings = function() {
  if (!currentUser) {
    openAuthModal();
    return;
  }
  injectProfileSettingsModal();
  const overlay = document.getElementById("settings-overlay");
  if (overlay) overlay.style.display = "flex";

  const inp = document.getElementById("settings-username-input");
  if (inp) {
    inp.value = window.getCurrentUsername() || "";
    setTimeout(() => inp.focus(), 10);
  }
  setSettingsMsg("");
};

window.closeProfileSettings = function() {
  const overlay = document.getElementById("settings-overlay");
  if (overlay) overlay.style.display = "none";
};

window.saveProfileSettings = async function() {
  if (!currentUser) return;
  const btn = document.getElementById("settings-save-btn");
  const inp = document.getElementById("settings-username-input");
  const nextName = (inp?.value || "").trim();
  if (!nextName) {
    setSettingsMsg("用户名不能为空");
    return;
  }
  if (nextName.length > 24) {
    setSettingsMsg("用户名不能超过 24 个字符");
    return;
  }

  if (btn) {
    btn.disabled = true;
    btn.textContent = "保存中";
  }
  setSettingsMsg("保存中…", "var(--text-dim)");

  try {
    const { data: updated, error: authErr } = await db.auth.updateUser({
      data: { username: nextName }
    });
    if (authErr) {
      setSettingsMsg("保存失败：" + authErr.message);
      return;
    }
    if (updated?.user) currentUser = updated.user;

    const { error: settingsErr } = await db.from("user_settings").upsert({
      user_id: currentUser.id,
      username: nextName,
      updated_at: new Date().toISOString()
    }, { onConflict: "user_id" });

    if (settingsErr) {
      console.warn("⚠ user_settings 保存失败:", settingsErr.message);
    }

    localStorage.setItem("fq-username", nextName);
    updateProfileUI();
    if (typeof renderTodayTasks === "function") renderTodayTasks();
    if (typeof renderHeatmap === "function") renderHeatmap();
    if (typeof renderCourseProgress === "function") renderCourseProgress();
    if (typeof renderCountdown === "function") renderCountdown();
    setSettingsMsg("已保存", "var(--accent-teal)");
    setTimeout(() => window.closeProfileSettings(), 500);
  } catch (err) {
    console.error("❌ 保存用户名失败:", err);
    setSettingsMsg("保存失败，请稍后重试");
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.textContent = "保存";
    }
  }
};

window.switchAuthTab = function(tab) {
  document.getElementById("auth-login-form").style.display  = tab === "login"  ? "" : "none";
  document.getElementById("auth-signup-form").style.display = tab === "signup" ? "" : "none";
  document.getElementById("tab-login").classList.toggle("active", tab === "login");
  document.getElementById("tab-signup").classList.toggle("active", tab === "signup");
};

function setAuthMsg(msg, color = "var(--accent-rose)") {
  const el = document.getElementById("auth-msg");
  if (el) { el.textContent = msg; el.style.color = color; }
}

window.doLogin = async function() {
  const email    = document.getElementById("auth-email").value.trim();
  const password = document.getElementById("auth-password").value;
  if (!email || !password) { setAuthMsg("请填写邮箱和密码"); return; }
  setAuthMsg("登录中…", "var(--text-dim)");
  const { error } = await db.auth.signInWithPassword({ email, password });
  if (error) { setAuthMsg("登录失败：" + error.message); return; }
  setAuthMsg("登录成功！", "var(--accent-teal)");
  setTimeout(closeAuthModal, 800);
};

/* ✅ 修改：注册时指定重定向到法语网站 */
window.doSignup = async function() {
  const username = document.getElementById("auth-username-s").value.trim();
  const email    = document.getElementById("auth-email-s").value.trim();
  const password = document.getElementById("auth-password-s").value;
  const finalName = username || email.split("@")[0];
  if (!email || !password || !finalName) { setAuthMsg("请填写用户名、邮箱和密码"); return; }
  if (finalName.length > 24) { setAuthMsg("用户名建议不超过 24 个字符"); return; }
  if (password.length < 6)  { setAuthMsg("密码至少需要6位"); return; }
  setAuthMsg("注册中…", "var(--text-dim)");
  
  // 指定验证邮件点击后跳转的地址
  const redirectTo = "https://rebecha1227-a11y.github.io/french-learning-website/";
  
  const { error } = await db.auth.signUp({ 
    email, 
    password,
    options: {
      emailRedirectTo: redirectTo,
      data: { username: finalName }
    }
  });
  
  if (error) { setAuthMsg("注册失败：" + error.message); return; }
  setAuthMsg("注册成功！请检查邮箱确认链接，然后登录。", "var(--accent-teal)");
};

/* ✅ 修改：忘记密码时也指定重定向到法语网站 */
window.doResetPassword = async function() {
  const email = document.getElementById("auth-email").value.trim();
  if (!email) { setAuthMsg("请先填写邮箱地址"); return; }
  
  const redirectTo = "https://rebecha1227-a11y.github.io/french-learning-website/";
  
  const { error } = await db.auth.resetPasswordForEmail(email, {
    redirectTo: redirectTo
  });
  
  if (error) { setAuthMsg("发送失败：" + error.message); return; }
  setAuthMsg("重置邮件已发送，请检查邮箱", "var(--accent-teal)");
};

window.doLogout = async function() {
  try {
    const { error } = await db.auth.signOut();
    if (error) {
      console.error("❌ 退出失败:", error.message);
      alert("退出失败：" + error.message);
      return;
    }
    currentUser = null;
    updateProfileUI();
    if (typeof renderTodayTasks === "function") renderTodayTasks();
    if (typeof renderHeatmap === "function") renderHeatmap();
    if (typeof renderCourseProgress === "function") renderCourseProgress();
    if (typeof renderCountdown === "function") renderCountdown();
  } catch (err) {
    console.error("❌ 退出异常:", err);
    alert("退出失败，请重试。");
  }
};

/* ══════════════════════════════════════════════════════
   PROFILE UI 更新
══════════════════════════════════════════════════════ */
function updateProfileUI() {
  if (typeof renderProfileCard === "function") renderProfileCard();
}

/* ══════════════════════════════════════════════════════
   CLOUD SYNC — 拉取（云端 → 本地）
══════════════════════════════════════════════════════ */
async function pullAllFromCloud() {
  if (!currentUser) return;
  const uid = currentUser.id;

  /* tasks */
  const { data: tasks } = await db.from("tasks").select("*").eq("user_id", uid);
  if (tasks) {
    const local = tasks.map(r => ({
      id: r.id, title: r.title, detail: r.detail, type: r.type,
      done: r.done, date: r.date, unitId: r.unit_id
    }));
    localStorage.setItem("fq-tasks-v3", JSON.stringify(local));
  }

  /* mistakes */
  const { data: mistakes } = await db.from("mistakes").select("*").eq("user_id", uid);
  if (mistakes) {
    const local = mistakes.map(r => ({
      id: r.id, date: r.date, source: r.source, question: r.question,
      myAnswer: r.my_answer, correctAnswer: r.correct_answer,
      reason: r.reason, reflection: r.reflection, tags: r.tags || []
    }));
    localStorage.setItem("fq-mistakes-v3", JSON.stringify(local));
  }

  /* study_log */
  const { data: logs } = await db.from("study_log").select("*").eq("user_id", uid);
  if (logs) {
    const obj = {};
    logs.forEach(r => { obj[r.date] = { done: r.done, total: r.total }; });
    localStorage.setItem("fq-study-log", JSON.stringify(obj));
  }

  /* user_settings */
  const { data: settings } = await db.from("user_settings").select("*").eq("user_id", uid).single();
  if (settings?.exam_date) {
    localStorage.setItem("fq-exam-date", settings.exam_date);
  }
  if (settings?.username) {
    localStorage.setItem("fq-username", settings.username);
  }

  /* 拉取完毕后刷新首页 UI */
  if (typeof renderTodayTasks   === "function") renderTodayTasks();
  if (typeof renderHeatmap      === "function") renderHeatmap();
  if (typeof renderProfileCard  === "function") renderProfileCard();
  if (typeof renderCourseProgress === "function") renderCourseProgress();
  if (typeof renderCountdown    === "function") renderCountdown();
  console.log("✅ 云端数据拉取完成");
}

/* ══════════════════════════════════════════════════════
   CLOUD SYNC — 推送（本地 → 云端）
   app.js 在每次写 localStorage 后调用这些函数
══════════════════════════════════════════════════════ */

/* 同步单条 task（upsert） */
window.syncTask = async function(task) {
  if (!currentUser) return;
  await db.from("tasks").upsert({
    id:       task.id,
    user_id:  currentUser.id,
    title:    task.title,
    detail:   task.detail || "",
    type:     task.type   || "讲义",
    done:     task.done,
    date:     task.date,
    unit_id:  task.unitId || ""
  }, { onConflict: "id" });
};

/* 删除单条 task */
window.deleteTask = async function(taskId) {
  if (!currentUser) return;
  await db.from("tasks").delete().eq("id", taskId).eq("user_id", currentUser.id);
};

/* 同步全量 tasks（批量，用于批量操作后） */
window.syncAllTasks = async function(tasks) {
  if (!currentUser) return;
  /* 先删该用户所有 tasks，再批量插入 */
  await db.from("tasks").delete().eq("user_id", currentUser.id);
  if (!tasks.length) return;
  await db.from("tasks").insert(tasks.map(t => ({
    id: t.id, user_id: currentUser.id,
    title: t.title, detail: t.detail || "", type: t.type || "讲义",
    done: t.done, date: t.date, unit_id: t.unitId || ""
  })));
};

/* 同步单条 mistake */
window.syncMistake = async function(m) {
  if (!currentUser) return;
  await db.from("mistakes").upsert({
    id:             m.id,
    user_id:        currentUser.id,
    date:           m.date,
    source:         m.source || "",
    question:       m.question,
    my_answer:      m.myAnswer || "",
    correct_answer: m.correctAnswer || "",
    reason:         m.reason || "",
    reflection:     m.reflection || "",
    tags:           m.tags || []
  }, { onConflict: "id" });
};

/* 删除单条 mistake */
window.deleteMistake = async function(mistakeId) {
  if (!currentUser) return;
  await db.from("mistakes").delete().eq("id", mistakeId).eq("user_id", currentUser.id);
};

/* 清空所有 mistakes */
window.clearAllMistakes = async function() {
  if (!currentUser) return;
  await db.from("mistakes").delete().eq("user_id", currentUser.id);
};

/* 同步 study_log 某一天 */
window.syncStudyLogDay = async function(dateStr, entry) {
  if (!currentUser) return;
  await db.from("study_log").upsert({
    user_id: currentUser.id,
    date:    dateStr,
    done:    entry.done,
    total:   entry.total
  }, { onConflict: "user_id,date" });
};

/* 删除 study_log 某一天（任务全部删除时） */
window.deleteStudyLogDay = async function(dateStr) {
  if (!currentUser) return;
  await db.from("study_log").delete()
    .eq("user_id", currentUser.id).eq("date", dateStr);
};

/* 同步考试日期 */
window.syncExamDate = async function(dateStr) {
  if (!currentUser) return;
  await db.from("user_settings").upsert({
    user_id:   currentUser.id,
    exam_date: dateStr,
    updated_at: new Date().toISOString()
  }, { onConflict: "user_id" });
};

/* ══════════════════════════════════════════════════════
   AUTH MODAL STYLES（内联，不依赖外部 CSS）
══════════════════════════════════════════════════════ */
const authStyles = document.createElement("style");
authStyles.textContent = `
  .auth-overlay {
    display: none;
    position: fixed; inset: 0; z-index: 9999;
    background: rgba(38,32,26,0.72);
    align-items: center; justify-content: center;
    backdrop-filter: blur(4px);
  }
  .auth-box {
    background: var(--bg-card);
    border: 2px solid var(--border);
    border-radius: 4px;
    box-shadow: 6px 6px 0 var(--border-dark);
    padding: 28px 28px 22px;
    width: min(380px, 92vw);
    display: flex; flex-direction: column; gap: 10px;
  }
  .auth-brand {
    font-family: 'VT323', monospace;
    font-size: 24px; color: var(--accent-blue);
    text-align: center; margin-bottom: 4px;
  }
  .auth-tabs {
    display: flex; gap: 0;
    border: 2px solid var(--border);
    border-radius: var(--card-r);
    overflow: hidden;
  }
  .auth-tab {
    flex: 1; padding: 7px;
    background: var(--bg-card2);
    border: none; color: var(--text-sub);
    font-size: 13px; cursor: pointer;
  }
  .auth-tab.active {
    background: var(--accent-blue);
    color: #fffdf7;
  }
  .auth-input {
    width: 100%; padding: 9px 11px;
    background: var(--bg-inset);
    border: 2px solid var(--border);
    border-radius: var(--card-r);
    font-size: 13px; color: var(--text-main);
    font-family: 'Noto Sans SC', sans-serif;
  }
  .auth-input:focus { outline: none; border-color: var(--accent-teal); }
  .auth-btn-primary {
    width: 100%; padding: 9px;
    background: var(--accent-blue);
    border: 2px solid #2a4070;
    border-radius: var(--card-r);
    color: #fffdf7; font-size: 13px;
    cursor: pointer;
    box-shadow: 3px 3px 0 #2a4070;
    font-family: 'Noto Sans SC', sans-serif;
  }
  .auth-btn-primary:hover { transform: translate(-1px,-1px); box-shadow: 4px 4px 0 #2a4070; }
  .auth-btn-ghost {
    width: 100%; padding: 7px;
    background: transparent;
    border: 1px solid var(--border);
    border-radius: var(--card-r);
    color: var(--text-sub); font-size: 12px;
    cursor: pointer;
    font-family: 'Noto Sans SC', sans-serif;
  }
  .auth-btn-ghost:hover { border-color: var(--accent-blue); color: var(--accent-blue); }
  .auth-msg {
    font-size: 12px; text-align: center;
    min-height: 18px; margin: 0;
  }

  .settings-overlay {
    display: none;
    position: fixed; inset: 0; z-index: 10000;
    background: rgba(38,32,26,0.72);
    align-items: center; justify-content: center;
    backdrop-filter: blur(4px);
  }
  .settings-box {
    background: var(--bg-card);
    border: 2px solid var(--border);
    border-radius: var(--card-r);
    box-shadow: 6px 6px 0 var(--border-dark);
    padding: 20px 20px 16px;
    width: min(360px, 92vw);
    display: flex; flex-direction: column; gap: 8px;
  }
  .settings-title {
    font-family: 'VT323', monospace;
    font-size: 24px;
    color: var(--accent-purple);
    text-align: center;
    margin-bottom: 2px;
  }
  .settings-label {
    font-size: 12px;
    color: var(--text-sub);
  }
  .settings-input {
    width: 100%; padding: 9px 11px;
    background: var(--bg-inset);
    border: 2px solid var(--border);
    border-radius: var(--card-r);
    font-size: 13px; color: var(--text-main);
    font-family: 'Noto Sans SC', sans-serif;
  }
  .settings-input:focus { outline: none; border-color: var(--accent-teal); }
  .settings-msg {
    margin: 0;
    min-height: 18px;
    text-align: center;
    font-size: 12px;
  }
  .settings-actions {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }
  .settings-btn-primary {
    padding: 9px;
    background: var(--accent-purple);
    border: 2px solid #4a3c78;
    border-radius: var(--card-r);
    color: #fffdf7;
    box-shadow: 3px 3px 0 #4a3c78;
    font-size: 13px;
    font-family: 'Noto Sans SC', sans-serif;
    cursor: pointer;
  }
  .settings-btn-primary:hover { transform: translate(-1px,-1px); }
  .settings-btn-primary:disabled { opacity: .7; cursor: default; transform: none; }
  .settings-btn-ghost {
    padding: 9px;
    background: transparent;
    border: 2px solid var(--border);
    border-radius: var(--card-r);
    color: var(--text-sub);
    font-size: 13px;
    font-family: 'Noto Sans SC', sans-serif;
    cursor: pointer;
  }
`;
document.head.appendChild(authStyles);

console.log("✅ Supabase 模块加载完成");
