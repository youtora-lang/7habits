import { useState, useEffect } from "react";

const COLORS = {
  navy: "#1E3A5F",
  navyDark: "#162C48",
  navyLight: "#2B5080",
  brown: "#B5763A",
  brownLight: "#C8894E",
  brownPale: "#F5EDE0",
  white: "#FFFFFF",
  offWhite: "#F7F5F2",
  gray: "#E8E4DF",
  grayMid: "#A89F94",
  grayDark: "#6B6159",
  text: "#2A2118",
};

const HABITS = [
  {
    id: 1, title: "主体的である", en: "Be Proactive", phase: "私的成功",
    checks: [
      "「〜できない」を「〜しない」と言い換えた",
      "影響の輪の中にエネルギーを注いだ",
      "刺激と反応の間に空白を置けた",
      "他者や環境のせいにせず行動した",
      "自分への約束を守った",
    ],
  },
  {
    id: 2, title: "終わりを思い描くことから始める", en: "Begin with the End in Mind", phase: "私的成功",
    checks: [
      "ミッションステートメントを読み返した",
      "今日の行動がゴールに沿っているか確認した",
      "各役割を意識して行動した",
      "長期的な視点で意思決定した",
    ],
  },
  {
    id: 3, title: "最優先事項を優先する", en: "Put First Things First", phase: "私的成功",
    checks: [
      "第2領域（重要だが緊急でない）の時間を確保した",
      "週次スケジュールを実施した",
      "重要でない緊急事項に引きずられなかった",
      "大切なことに「ノー」と言えた",
    ],
  },
  {
    id: 4, title: "Win-Winを考える", en: "Think Win-Win", phase: "公的成功",
    checks: [
      "相手のメリットを意識して話し合った",
      "競争ではなく協力の姿勢を取った",
      "ノー・ディールの選択肢を頭に置いた",
      "アグリーメントを守った",
    ],
  },
  {
    id: 5, title: "まず理解に徹し、そして理解される", en: "Seek First to Understand", phase: "公的成功",
    checks: [
      "共感的傾聴を実践した",
      "自分の意見を述べる前に相手の話を十分聞いた",
      "相手の言葉を言い換えて確認した",
      "アドバイスや評価を控えた場面があった",
    ],
  },
  {
    id: 6, title: "シナジーを創り出す", en: "Synergize", phase: "公的成功",
    checks: [
      "自分と違う視点・意見を強みとして受け入れた",
      "第3の案を探そうとした",
      "1＋1が2以上になる場面があった",
      "違いをリソースとして捉えた",
    ],
  },
  {
    id: 7, title: "刃を研ぐ", en: "Sharpen the Saw", phase: "刃を研ぐ",
    checks: [
      "【肉体】運動・十分な睡眠・栄養を意識した",
      "【精神】瞑想・祈り・自然・芸術に触れた",
      "【知性】読書・学習・書くことで心を鍛えた",
      "【社会情緒】奉仕・共感・シナジーを実践した",
    ],
  },
];

const PHASE_COLOR = { "私的成功": COLORS.navy, "公的成功": COLORS.brown, "刃を研ぐ": COLORS.navyLight };
const USERS = [
  { id: "me", name: "わたし", initial: "私" },
  { id: "partner", name: "パートナー", initial: "夫" },
];

function getTodayKey() { return new Date().toISOString().split("T")[0]; }
function getWeekKey() {
  const d = new Date(), day = d.getDay();
  const monday = new Date(d); monday.setDate(d.getDate() - day + (day === 0 ? -6 : 1));
  return monday.toISOString().split("T")[0];
}
function fmtDate(ts) { return new Date(ts).toLocaleDateString("ja-JP", { month: "short", day: "numeric" }); }

export default function App() {
  const [tab, setTab] = useState("today");
  const [currentUser, setCurrentUser] = useState("me");
  const [activeHabit, setActiveHabit] = useState(1);
  const [checks, setChecks] = useState({});
  const [insights, setInsights] = useState({});
  const [draft, setDraft] = useState("");
  const [toast, setToast] = useState(null);

  const todayKey = getTodayKey();
  const weekKey = getWeekKey();

  useEffect(() => {
    try {
      const c = localStorage.getItem("fp7_checks");
      const i = localStorage.getItem("fp7_insights");
      if (c) setChecks(JSON.parse(c));
      if (i) setInsights(JSON.parse(i));
    } catch {}
  }, []);

  const saveChecks = n => { setChecks(n); try { localStorage.setItem("fp7_checks", JSON.stringify(n)); } catch {} };
  const saveInsights = n => { setInsights(n); try { localStorage.setItem("fp7_insights", JSON.stringify(n)); } catch {} };

  const toggle = (hid, idx) => {
    const k = `${currentUser}_${todayKey}_${hid}_${idx}`;
    saveChecks({ ...checks, [k]: !checks[k] });
    if (!checks[k]) showToast("チェック完了");
  };

  const isChecked = (hid, idx) => !!checks[`${currentUser}_${todayKey}_${hid}_${idx}`];

  const dayProg = (uid, hid) => {
    const h = HABITS.find(x => x.id === hid);
    const done = h.checks.filter((_, i) => !!checks[`${uid}_${todayKey}_${hid}_${i}`]).length;
    return { done, total: h.checks.length, pct: Math.round((done / h.checks.length) * 100) };
  };

  const weekRate = (uid, hid) => {
    const h = HABITS.find(x => x.id === hid);
    let tot = 0, don = 0;
    for (let d = 0; d < 7; d++) {
      const dt = new Date(); dt.setDate(dt.getDate() - d);
      const dk = dt.toISOString().split("T")[0];
      h.checks.forEach((_, i) => { tot++; if (checks[`${uid}_${dk}_${hid}_${i}`]) don++; });
    }
    return tot > 0 ? Math.round((don / tot) * 100) : 0;
  };

  const showToast = msg => { setToast(msg); setTimeout(() => setToast(null), 1800); };

  const postInsight = () => {
    if (!draft.trim()) return;
    const k = `${currentUser}_${weekKey}`;
    saveInsights({ ...insights, [k]: [...(insights[k] || []), { text: draft.trim(), ts: Date.now() }] });
    setDraft("");
    showToast("気づきを投稿しました");
  };

  const habit = HABITS.find(h => h.id === activeHabit);
  const prog = dayProg(currentUser, activeHabit);
  const pc = PHASE_COLOR[habit.phase];
  const partner = USERS.find(u => u.id !== currentUser);
  const meUser = USERS.find(u => u.id === currentUser);

  return (
    <div style={S.root}>

      {/* HEADER */}
      <div style={S.header}>
        <div style={S.headerTop}>
          <div style={S.logo}>
            <div style={S.logoMark}>✓</div>
            <div>
              <div style={S.logoTitle}>7 Habits</div>
              <div style={S.logoSub}>TOGETHER PLANNER</div>
            </div>
          </div>
          <div style={S.userSwitch}>
            {USERS.map(u => (
              <button key={u.id} onClick={() => setCurrentUser(u.id)}
                style={{ ...S.userChip, ...(currentUser === u.id ? S.userChipOn : {}) }}>
                <span style={{ ...S.userBadge, background: currentUser === u.id ? "#fff" : COLORS.navyLight, color: currentUser === u.id ? COLORS.navy : "#fff" }}>
                  {u.initial}
                </span>
                {u.name}
              </button>
            ))}
          </div>
        </div>
        <div style={S.tabBar}>
          {[["today","今日"], ["weekly","週次レビュー"], ["share","ふたりで"]].map(([id, lbl]) => (
            <button key={id} onClick={() => setTab(id)}
              style={{ ...S.tabBtn, ...(tab === id ? S.tabOn : {}) }}>
              {lbl}
            </button>
          ))}
        </div>
      </div>

      <div style={S.body}>

        {/* ── TODAY ── */}
        {tab === "today" && <>
          <div style={S.pillRow}>
            {HABITS.map(h => {
              const p = dayProg(currentUser, h.id);
              const hpc = PHASE_COLOR[h.phase];
              const on = activeHabit === h.id;
              return (
                <button key={h.id} onClick={() => setActiveHabit(h.id)}
                  style={{ ...S.pill, background: on ? hpc : COLORS.white, borderColor: on ? hpc : COLORS.gray, color: on ? "#fff" : COLORS.grayDark }}>
                  <span style={{ fontWeight: 700, fontSize: 14 }}>{h.id}</span>
                  {p.done > 0 && <div style={{ width: 5, height: 5, borderRadius: "50%", background: on ? "rgba(255,255,255,0.7)" : hpc, marginTop: 2 }} />}
                </button>
              );
            })}
          </div>

          <div style={{ ...S.card, borderTop: `3px solid ${pc}` }}>
            <span style={{ ...S.phaseTag, background: pc }}>{habit.phase.toUpperCase()} — HABIT {habit.id}</span>
            <div style={S.habitTitle}>{habit.title}</div>
            <div style={S.habitEn}>{habit.en}</div>
            <div style={S.progRow}>
              <div style={S.progTrack}><div style={{ ...S.progFill, width: prog.pct + "%", background: pc }} /></div>
              <span style={S.progNum}>{prog.done}/{prog.total}</span>
            </div>
            <div style={S.hr} />
            {habit.checks.map((item, i) => (
              <button key={i} onClick={() => toggle(habit.id, i)}
                style={{ ...S.checkRow, background: isChecked(habit.id, i) ? pc + "0D" : "transparent" }}>
                <div style={{ ...S.chkBox, borderColor: isChecked(habit.id, i) ? pc : COLORS.gray, background: isChecked(habit.id, i) ? pc : "transparent" }}>
                  {isChecked(habit.id, i) && <svg width="10" height="8" viewBox="0 0 10 8"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                </div>
                <span style={{ fontSize: 13, color: isChecked(habit.id, i) ? COLORS.text : COLORS.grayDark, flex: 1, textAlign: "left", lineHeight: 1.55 }}>{item}</span>
              </button>
            ))}
          </div>

          <div style={S.dividerRow}><div style={S.divLine} /><span style={S.divLabel}>{partner.initial} {partner.name}の今日</span><div style={S.divLine} /></div>
          <div style={S.miniGrid}>
            {HABITS.map(h => {
              const p = dayProg(partner.id, h.id);
              const hpc = PHASE_COLOR[h.phase];
              return (
                <div key={h.id} style={S.miniCard}>
                  <div style={{ fontSize: 11, color: hpc, fontWeight: 700, marginBottom: 4 }}>習慣{h.id}</div>
                  <div style={{ height: 4, background: COLORS.gray, borderRadius: 2, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: p.pct + "%", background: hpc, borderRadius: 2, transition: "width .3s" }} />
                  </div>
                  <div style={{ fontSize: 10, color: COLORS.grayMid, marginTop: 3 }}>{p.pct}%</div>
                </div>
              );
            })}
          </div>
        </>}

        {/* ── WEEKLY ── */}
        {tab === "weekly" && <>
          <div style={S.pageHead}><div style={S.pageTitle}>週次レビュー</div><div style={S.pageSub}>過去7日間のチェック率</div></div>
          {HABITS.map(h => {
            const hpc = PHASE_COLOR[h.phase];
            const myR = weekRate(currentUser, h.id);
            const ptR = weekRate(partner.id, h.id);
            return (
              <div key={h.id} style={{ ...S.card, borderLeft: `3px solid ${hpc}`, padding: "14px 16px", marginBottom: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                  <span style={{ fontSize: 11, color: hpc, fontWeight: 700, letterSpacing: 1 }}>習慣{h.id}</span>
                  <span style={{ fontSize: 13, color: COLORS.text, flex: 1 }}>{h.title}</span>
                  {myR >= 80 && <span style={S.readyBadge}>次へ進める</span>}
                </div>
                {[{ lbl: meUser.initial, rate: myR, solid: true }, { lbl: partner.initial, rate: ptR, solid: false }].map(({ lbl, rate, solid }) => (
                  <div key={lbl} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                    <span style={{ ...S.avatar, background: solid ? hpc : hpc + "44", color: solid ? "#fff" : hpc }}>{lbl}</span>
                    <div style={{ flex: 1, height: 8, background: COLORS.gray, borderRadius: 3, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: rate + "%", background: solid ? hpc : hpc + "88", borderRadius: 3, transition: "width .4s" }} />
                    </div>
                    <span style={{ fontSize: 12, color: COLORS.grayDark, width: 34, textAlign: "right" }}>{rate}%</span>
                  </div>
                ))}
              </div>
            );
          })}
          <div style={S.hintBox}>
            <span style={{ fontSize: 16 }}>📋</span>
            <span style={{ fontSize: 13, color: COLORS.navy, lineHeight: 1.6 }}>チェック率80%以上が<strong>2週間続いたら</strong>次の習慣へ進みましょう。</span>
          </div>
        </>}

        {/* ── SHARE ── */}
        {tab === "share" && <>
          <div style={S.pageHead}><div style={S.pageTitle}>ふたりの記録</div><div style={S.pageSub}>今週の気づきをシェア</div></div>
          <div style={S.card}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <span style={{ ...S.avatar, background: COLORS.navy, color: "#fff" }}>{meUser.initial}</span>
              <span style={{ fontSize: 13, color: COLORS.grayDark }}>{meUser.name}として投稿</span>
            </div>
            <textarea value={draft} onChange={e => setDraft(e.target.value)}
              placeholder="今週の気づき・うまくいったこと・難しかったこと..."
              style={S.textarea} />
            <button onClick={postInsight} style={S.postBtn}>SHARE →</button>
          </div>

          {USERS.map(u => {
            const posts = [...(insights[`${u.id}_${weekKey}`] || [])].reverse();
            return (
              <div key={u.id}>
                <div style={S.dividerRow}><div style={S.divLine} /><span style={S.divLabel}>{u.initial} {u.name}の気づき</span><div style={S.divLine} /></div>
                {posts.length === 0
                  ? <div style={{ fontSize: 13, color: COLORS.grayMid, textAlign: "center", padding: "14px 0" }}>まだ投稿がありません</div>
                  : posts.map((p, i) => (
                    <div key={i} style={{ ...S.card, borderLeft: `3px solid ${COLORS.brown}`, padding: "12px 14px", marginBottom: 8 }}>
                      <div style={{ fontSize: 13, color: COLORS.text, lineHeight: 1.7 }}>{p.text}</div>
                      <div style={{ fontSize: 11, color: COLORS.grayMid, marginTop: 6 }}>{fmtDate(p.ts)}</div>
                    </div>
                  ))
                }
              </div>
            );
          })}

          <div style={S.dividerRow}><div style={S.divLine} /><span style={S.divLabel}>今週の習慣比較</span><div style={S.divLine} /></div>
          <div style={S.card}>
            {HABITS.map(h => {
              const hpc = PHASE_COLOR[h.phase];
              const r1 = weekRate("me", h.id), r2 = weekRate("partner", h.id);
              return (
                <div key={h.id} style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: 12, color: COLORS.grayDark, marginBottom: 4 }}>
                    <span style={{ color: hpc, fontWeight: 700 }}>習慣{h.id}</span>　{h.title}
                  </div>
                  <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                    <span style={{ fontSize: 11, color: COLORS.grayMid, width: 14 }}>私</span>
                    <div style={{ flex: 1, height: 6, background: COLORS.gray, borderRadius: 3, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: r1 + "%", background: hpc, borderRadius: 3 }} />
                    </div>
                    <span style={{ fontSize: 11, color: COLORS.grayMid, width: 14 }}>夫</span>
                    <div style={{ flex: 1, height: 6, background: COLORS.gray, borderRadius: 3, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: r2 + "%", background: hpc + "88", borderRadius: 3 }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>}
      </div>

      {toast && <div style={S.toast}>{toast}</div>}
    </div>
  );
}

const S = {
  root: { fontFamily: "'Hiragino Sans', 'Yu Gothic', sans-serif", background: COLORS.offWhite, minHeight: "100vh", maxWidth: 480, margin: "0 auto" },
  header: { background: COLORS.navy, position: "sticky", top: 0, zIndex: 10 },
  headerTop: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 18px 12px" },
  logo: { display: "flex", alignItems: "center", gap: 10 },
  logoMark: { width: 32, height: 32, background: COLORS.brown, borderRadius: 3, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 16, fontWeight: 900 },
  logoTitle: { fontSize: 18, fontWeight: 700, color: "#fff", letterSpacing: 0.5 },
  logoSub: { fontSize: 9, color: COLORS.brown, letterSpacing: 2, marginTop: 1 },
  userSwitch: { display: "flex", gap: 6 },
  userChip: { display: "flex", alignItems: "center", gap: 5, padding: "5px 10px 5px 5px", borderRadius: 20, border: "1px solid rgba(255,255,255,0.2)", background: "transparent", color: "rgba(255,255,255,0.55)", fontSize: 12, cursor: "pointer" },
  userChipOn: { background: COLORS.brown, borderColor: COLORS.brown, color: "#fff" },
  userBadge: { width: 20, height: 20, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700 },
  tabBar: { display: "flex", borderTop: "1px solid rgba(255,255,255,0.1)" },
  tabBtn: { flex: 1, padding: "10px 0", background: "transparent", border: "none", color: "rgba(255,255,255,0.45)", fontSize: 13, cursor: "pointer", borderBottom: "2px solid transparent" },
  tabOn: { color: COLORS.brown, borderBottom: `2px solid ${COLORS.brown}` },
  body: { padding: "16px 16px 80px" },
  pillRow: { display: "flex", gap: 6, marginBottom: 14, flexWrap: "wrap" },
  pill: { width: 42, height: 42, borderRadius: 7, border: "1.5px solid", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", transition: "all .15s" },
  card: { background: COLORS.white, borderRadius: 3, padding: 18, marginBottom: 14, boxShadow: "0 2px 10px rgba(30,58,95,0.07)" },
  phaseTag: { display: "inline-block", color: "#fff", fontSize: 9, fontWeight: 700, padding: "3px 9px", borderRadius: 2, letterSpacing: 1.2, marginBottom: 10 },
  habitTitle: { fontSize: 17, fontWeight: 700, color: COLORS.text, lineHeight: 1.4 },
  habitEn: { fontSize: 11, color: COLORS.grayMid, marginTop: 3, letterSpacing: 1, marginBottom: 12 },
  progRow: { display: "flex", alignItems: "center", gap: 10, marginBottom: 2 },
  progTrack: { flex: 1, height: 4, background: COLORS.gray, borderRadius: 2, overflow: "hidden" },
  progFill: { height: "100%", borderRadius: 2, transition: "width .3s" },
  progNum: { fontSize: 12, color: COLORS.grayMid },
  hr: { height: 1, background: COLORS.gray, margin: "12px 0" },
  checkRow: { width: "100%", display: "flex", alignItems: "flex-start", gap: 10, padding: "10px 4px", borderBottom: `1px solid ${COLORS.gray}`, cursor: "pointer", transition: "background .15s", border: "none", borderBottom: `1px solid ${COLORS.gray}` },
  chkBox: { width: 18, height: 18, borderRadius: 3, border: "1.5px solid", flexShrink: 0, marginTop: 2, display: "flex", alignItems: "center", justifyContent: "center", transition: "all .15s" },
  dividerRow: { display: "flex", alignItems: "center", gap: 8, margin: "16px 0 12px" },
  divLine: { flex: 1, height: 1, background: COLORS.gray },
  divLabel: { fontSize: 11, color: COLORS.grayMid, whiteSpace: "nowrap", fontWeight: 600, letterSpacing: 0.5 },
  miniGrid: { display: "flex", gap: 7, flexWrap: "wrap" },
  miniCard: { background: COLORS.white, borderRadius: 3, padding: "9px 7px", flex: "0 0 calc(14.28% - 7px)", minWidth: 50, textAlign: "center", boxShadow: "0 1px 5px rgba(30,58,95,0.06)" },
  pageHead: { marginBottom: 16 },
  pageTitle: { fontSize: 20, fontWeight: 700, color: COLORS.navy },
  pageSub: { fontSize: 12, color: COLORS.grayMid, marginTop: 2 },
  readyBadge: { fontSize: 10, color: "#fff", background: COLORS.brown, padding: "3px 8px", borderRadius: 2, fontWeight: 700, letterSpacing: 0.5 },
  avatar: { width: 22, height: 22, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, flexShrink: 0 },
  hintBox: { display: "flex", alignItems: "flex-start", gap: 10, background: COLORS.brownPale, borderRadius: 3, padding: "13px 15px", marginTop: 4, borderLeft: `3px solid ${COLORS.brown}` },
  textarea: { width: "100%", minHeight: 80, border: `1px solid ${COLORS.gray}`, borderRadius: 3, padding: "10px 12px", fontSize: 13, fontFamily: "inherit", color: COLORS.text, outline: "none", resize: "vertical", boxSizing: "border-box" },
  postBtn: { marginTop: 10, padding: "10px 20px", background: COLORS.navy, color: "#fff", border: "none", borderRadius: 2, fontSize: 12, fontWeight: 700, letterSpacing: 2, cursor: "pointer" },
  toast: { position: "fixed", bottom: 28, left: "50%", transform: "translateX(-50%)", background: COLORS.navy, color: "#fff", padding: "9px 20px", borderRadius: 2, fontSize: 12, fontWeight: 700, letterSpacing: 1, zIndex: 100, boxShadow: "0 4px 16px rgba(30,58,95,0.25)", pointerEvents: "none" },
};
