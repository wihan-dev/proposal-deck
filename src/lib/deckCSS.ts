export const DECK_CSS = `/* ═══════════ DESIGN TOKENS ═══════════ */
:root {
  --bg: hsl(37, 100%, 97%);
  --fg: hsl(211, 75%, 15%);
  --primary: hsl(35, 88%, 59%);
  --olive: hsl(86, 18%, 43%);
  --muted: hsl(36, 30%, 90%);
  --muted-fg: hsl(211, 30%, 40%);
  --border: hsl(36, 30%, 85%);
  --accent: hsl(14, 83%, 54%);
  --card: hsl(0, 0%, 100%);
  --radius: 16px;
  --om-green: #1A6B3C;
  --whatsapp: #075E54;
  --whatsapp-light: #25D366;
}

*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

html, body {
  overflow: hidden;
  height: 100%;
  background: var(--bg);
  color: var(--fg);
  font-family: 'DM Sans', system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
}

h1, h2, h3, h4 {
  font-family: 'Instrument Serif', Georgia, serif;
  font-weight: 400;
}

/* ═══════════ SLIDES CONTAINER ═══════════ */
.deck {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.slide {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94),
              transform 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  pointer-events: none;
  padding: 2rem;
}

.slide.active {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
  z-index: 10;
}

.slide.exit-up {
  opacity: 0;
  transform: translateY(-30px);
}

/* ═══════════ STAGGER ANIMATION ═══════════ */
.slide.active .stagger { animation: fadeUp 0.5s cubic-bezier(0.25,0.46,0.45,0.94) both; }
.slide.active .stagger:nth-child(1) { animation-delay: 0.08s; }
.slide.active .stagger:nth-child(2) { animation-delay: 0.16s; }
.slide.active .stagger:nth-child(3) { animation-delay: 0.24s; }
.slide.active .stagger:nth-child(4) { animation-delay: 0.32s; }
.slide.active .stagger:nth-child(5) { animation-delay: 0.40s; }
.slide.active .stagger:nth-child(6) { animation-delay: 0.48s; }
.slide.active .stagger:nth-child(7) { animation-delay: 0.56s; }

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(18px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ═══════════ TYPOGRAPHY ═══════════ */
.label {
  text-transform: uppercase;
  letter-spacing: 0.2em;
  font-size: clamp(0.7rem, 1vw, 0.85rem);
  font-weight: 600;
  color: var(--muted-fg);
  font-family: 'DM Sans', sans-serif;
}

.headline {
  font-size: clamp(2.5rem, 5.5vw, 5rem);
  line-height: 1.08;
  letter-spacing: -0.02em;
  color: var(--fg);
}

.subheadline {
  font-size: clamp(1.8rem, 3.8vw, 3rem);
  line-height: 1.15;
  letter-spacing: -0.01em;
  color: var(--fg);
}

.body-text {
  font-size: clamp(1rem, 1.5vw, 1.25rem);
  line-height: 1.6;
  color: var(--muted-fg);
  max-width: 560px;
}

/* ═══════════ CARDS ═══════════ */
.card {
  background: rgba(255,255,255,0.8);
  backdrop-filter: blur(8px);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1.25rem 1.35rem;
  transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s;
}
.card:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 32px -8px rgba(0,0,0,0.1);
  border-color: hsl(36, 30%, 75%);
}

.card-icon {
  width: 42px; height: 42px;
  border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  font-size: 1.15rem;
  margin-bottom: 0.75rem;
}

.card-title {
  font-family: 'DM Sans', sans-serif;
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--fg);
  margin-bottom: 0.3rem;
  line-height: 1.3;
}

.card-desc {
  font-size: 0.75rem;
  line-height: 1.55;
  color: var(--muted-fg);
  margin-bottom: 0.6rem;
}

.tag {
  display: inline-block;
  padding: 0.2rem 0.6rem;
  border-radius: 100px;
  font-size: 0.65rem;
  font-weight: 600;
}

/* ═══════════ NAVIGATION ═══════════ */
.nav-pill {
  position: fixed; top: 20px; right: 20px; z-index: 100;
  display: flex; align-items: center; gap: 8px;
  background: hsla(37,100%,97%,0.85);
  backdrop-filter: blur(12px);
  border: 1px solid var(--border);
  border-radius: 100px;
  padding: 6px 16px;
  box-shadow: 0 4px 20px -4px rgba(0,0,0,0.1);
  font-family: 'DM Sans', sans-serif;
}
.nav-pill .bar { width: 3px; height: 18px; border-radius: 3px; background: var(--olive); }
.nav-pill .counter { font-size: 0.7rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: var(--muted-fg); }
.nav-pill .slide-name { font-size: 0.85rem; font-weight: 500; color: var(--fg); }

.progress {
  position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%); z-index: 100;
  display: flex; align-items: center; gap: 10px;
  background: hsla(37,100%,97%,0.85);
  backdrop-filter: blur(12px);
  border: 1px solid var(--border);
  border-radius: 100px;
  padding: 8px 14px;
  box-shadow: 0 4px 20px -4px rgba(0,0,0,0.08);
}
.progress button { background: none; border: none; cursor: pointer; padding: 4px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--fg); transition: background 0.2s; }
.progress button:hover { background: var(--muted); }
.progress button:disabled { opacity: 0.2; pointer-events: none; }
.dot { width: 6px; height: 6px; border-radius: 100px; background: hsla(211,75%,15%,0.15); transition: all 0.3s; cursor: pointer; border: none; padding: 0; }
.dot.active { width: 20px; background: var(--fg); }

.demo-btn {
  position: fixed; top: 20px; left: 20px; z-index: 100;
  display: flex; align-items: center; gap: 6px;
  background: hsla(37,100%,97%,0.85);
  backdrop-filter: blur(12px);
  border: 1px solid var(--border);
  border-radius: 100px;
  padding: 8px 16px;
  box-shadow: 0 4px 20px -4px rgba(0,0,0,0.1);
  font-family: 'DM Sans', sans-serif;
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--fg);
  cursor: pointer;
  transition: background 0.2s;
  text-decoration: none;
}
.demo-btn:hover { background: var(--muted); }
.demo-btn svg { color: var(--primary); }

/* ═══════════ GRID LAYOUTS ═══════════ */
.grid-4 {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  width: 100%;
  max-width: 1050px;
}

.grid-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
  width: 100%;
  max-width: 950px;
}

.two-col {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  width: 100%;
  height: 100%;
}

/* ═══════════ SECTION DOT ═══════════ */
.section-dot {
  width: 6px; height: 6px; border-radius: 50%; display: inline-block; margin-right: 8px; vertical-align: middle;
}

/* ═══════════ FLOW DIAGRAM (Slide 3) ═══════════ */
.flow-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
  max-width: 700px;
  width: 100%;
}

.flow-card {
  background: var(--card);
  border: 1.5px solid var(--border);
  border-radius: 14px;
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  max-width: 620px;
  position: relative;
  transition: box-shadow 0.3s;
}
.flow-card:hover { box-shadow: 0 8px 24px -6px rgba(0,0,0,0.08); }

.flow-card.trigger { border-color: hsl(0, 50%, 82%); background: hsl(0, 60%, 98%); }
.flow-card.whatsapp { border-color: hsl(86, 30%, 75%); background: hsl(86, 40%, 97%); }
.flow-card.data { border-color: var(--border); background: hsl(37, 50%, 96%); }
.flow-card.output-dash { border-color: hsl(211, 40%, 80%); background: hsl(211, 50%, 97%); }
.flow-card.output-alert { border-color: hsl(30, 60%, 80%); background: hsl(37, 60%, 96%); }

.flow-icon {
  width: 44px; height: 44px; border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  font-size: 1.1rem; flex-shrink: 0;
}

.flow-card-text h4 { font-family: 'DM Sans', sans-serif; font-weight: 600; font-size: 0.95rem; color: var(--fg); }
.flow-card-text p { font-size: 0.78rem; color: var(--muted-fg); margin-top: 2px; }

.flow-badge {
  position: absolute; right: 16px; top: 50%; transform: translateY(-50%);
  padding: 0.2rem 0.65rem; border-radius: 100px; font-size: 0.68rem; font-weight: 600;
  font-family: 'DM Sans', sans-serif;
}

.flow-connector {
  width: 2px; height: 28px; background: var(--border); position: relative;
}
.flow-connector::after {
  content: ''; position: absolute; bottom: -3px; left: 50%; transform: translateX(-50%);
  width: 0; height: 0; border-left: 4px solid transparent; border-right: 4px solid transparent; border-top: 5px solid var(--border);
}

.flow-branch {
  display: flex; gap: 1rem; width: 100%; max-width: 620px; justify-content: center;
}

.flow-branch-card {
  flex: 1; background: var(--card); border: 1.5px solid var(--border); border-radius: 14px;
  padding: 1rem; text-align: center; transition: box-shadow 0.3s;
}
.flow-branch-card:hover { box-shadow: 0 8px 24px -6px rgba(0,0,0,0.08); }

.flow-branch-icon {
  width: 40px; height: 40px; border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 0.5rem; font-size: 1rem;
  background: hsl(240, 30%, 95%);
}

.flow-branch-card h4 { font-family: 'DM Sans', sans-serif; font-weight: 600; font-size: 0.85rem; color: var(--fg); }
.flow-branch-card p { font-size: 0.72rem; color: var(--muted-fg); margin-top: 3px; }

.flow-split {
  display: flex; align-items: flex-start; justify-content: center; gap: 0; height: 32px; position: relative; width: 100%; max-width: 620px;
}
.flow-split::before {
  content: ''; position: absolute; top: 0; left: 50%; width: 2px; height: 12px; background: var(--border); transform: translateX(-50%);
}
.flow-split::after {
  content: ''; position: absolute; top: 12px; left: calc(16.67% + 8px); right: calc(16.67% + 8px); height: 2px; background: var(--border);
}

.flow-split-leg {
  position: absolute; top: 12px; width: 2px; height: 20px; background: var(--border);
}
.flow-split-leg::after {
  content: ''; position: absolute; bottom: -3px; left: 50%; transform: translateX(-50%);
  width: 0; height: 0; border-left: 3px solid transparent; border-right: 3px solid transparent; border-top: 4px solid var(--border);
}

.flow-merge {
  display: flex; align-items: flex-start; justify-content: center; height: 28px; position: relative; width: 100%; max-width: 620px;
}
.flow-merge::before {
  content: ''; position: absolute; top: 0; left: calc(16.67% + 8px); right: calc(16.67% + 8px); height: 2px; background: var(--border);
}
.flow-merge::after {
  content: ''; position: absolute; top: 0; left: 50%; width: 2px; height: 24px; background: var(--border); transform: translateX(-50%);
}

.flow-merge-arrow {
  position: absolute; bottom: 1px; left: 50%; transform: translateX(-50%);
  width: 0; height: 0; border-left: 4px solid transparent; border-right: 4px solid transparent; border-top: 5px solid var(--border);
}

/* ═══════════ COMPETITOR CARDS ═══════════ */
.comp-card {
  background: rgba(255,255,255,0.85);
  backdrop-filter: blur(8px);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1.5rem;
  position: relative;
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
}
.comp-card:hover { transform: translateY(-3px); box-shadow: 0 12px 32px -8px rgba(0,0,0,0.1); }
.comp-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; }

.comp-card.capitec::before { background: hsl(211, 60%, 50%); }
.comp-card.tyme::before { background: hsl(280, 50%, 55%); }
.comp-card.discovery::before { background: hsl(350, 60%, 50%); }

.comp-name { font-family: 'Instrument Serif', serif; font-size: 1.3rem; color: var(--fg); margin-bottom: 0.15rem; }
.comp-stat { font-family: 'DM Sans', sans-serif; font-size: 0.78rem; font-weight: 600; margin-bottom: 0.75rem; }
.comp-desc { font-size: 0.78rem; color: var(--muted-fg); line-height: 1.6; margin-bottom: 0.75rem; }
.comp-divider { border: none; border-top: 1px solid var(--border); margin: 0.75rem 0; }
.comp-doing-label { font-size: 0.75rem; font-weight: 600; color: var(--fg); margin-bottom: 0.3rem; display: flex; align-items: center; gap: 5px; }
.comp-doing { font-size: 0.75rem; color: var(--muted-fg); line-height: 1.55; }

/* Warning banner */
.warning-banner {
  display: flex; align-items: center; gap: 12px;
  background: hsl(40, 90%, 95%);
  border: 1px solid hsl(40, 70%, 82%);
  border-radius: 12px;
  padding: 0.85rem 1.25rem;
  max-width: 720px; width: 100%;
}
.warning-banner svg { flex-shrink: 0; }
.warning-banner p { font-size: 0.82rem; color: var(--fg); line-height: 1.5; }

/* CTA bar */
.cta-bar {
  display: flex; align-items: center; gap: 12px;
  background: var(--fg);
  border-radius: 14px;
  padding: 1rem 1.5rem;
  max-width: 680px; width: 100%;
}
.cta-bar svg { flex-shrink: 0; color: var(--primary); }
.cta-bar p { font-size: 0.85rem; color: var(--bg); font-weight: 500; line-height: 1.5; }

/* ═══════════ DASHBOARD (Slide 5) ═══════════ */
.dash-container {
  width: 100%; max-width: 1000px;
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 16px 48px -12px rgba(0,0,0,0.08);
}

.dash-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 0.65rem 1.25rem;
  background: var(--om-green);
}
.dash-header-left { display: flex; align-items: center; gap: 8px; }
.dash-header-dot { width: 7px; height: 7px; border-radius: 50%; background: rgba(255,255,255,0.3); }
.dash-header span { color: #fff; font-size: 0.82rem; font-weight: 600; }
.dash-live { display: flex; align-items: center; gap: 5px; }
.dash-live-dot { width: 6px; height: 6px; border-radius: 50%; background: #66BB6A; animation: pulse 2s infinite; }
.dash-live span { color: #A5D6A7; font-size: 0.75rem; font-weight: 500; }
@keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }

.kpi-row {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.75rem; padding: 0.85rem 1rem;
}
.kpi-card {
  background: var(--bg); border-radius: 12px; padding: 0.75rem 0.85rem;
}
.kpi-label { font-size: 0.65rem; color: var(--muted-fg); font-weight: 500; display: flex; align-items: center; gap: 4px; margin-bottom: 0.25rem; }
.kpi-value { font-family: 'DM Sans', sans-serif; font-size: 1.5rem; font-weight: 700; color: var(--fg); line-height: 1.1; }
.kpi-delta { font-size: 0.68rem; font-weight: 600; color: var(--om-green); margin-top: 0.2rem; }

.dash-body {
  display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; padding: 0 1rem 1rem;
}

.dash-panel {
  background: var(--bg); border-radius: 12px; padding: 0.85rem;
}
.dash-panel-title { font-size: 0.78rem; font-weight: 600; color: var(--fg); margin-bottom: 0.6rem; display: flex; align-items: center; gap: 6px; }

.sentiment-row { display: flex; align-items: center; gap: 8px; margin-bottom: 0.45rem; }
.sentiment-label { font-size: 0.7rem; color: var(--muted-fg); width: 50px; flex-shrink: 0; }
.sentiment-track { flex: 1; height: 9px; background: hsl(36,20%,92%); border-radius: 100px; overflow: hidden; }
.sentiment-fill { height: 100%; border-radius: 100px; transition: width 0.8s ease; }
.sentiment-pct { font-size: 0.72rem; font-weight: 700; color: var(--fg); width: 32px; text-align: right; flex-shrink: 0; }

.issue-row { display: flex; align-items: center; gap: 8px; margin-bottom: 0.35rem; }
.issue-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }
.issue-name { font-size: 0.72rem; font-weight: 500; color: var(--fg); flex: 1; }
.issue-count { font-size: 0.68rem; color: var(--muted-fg); }
.issue-sev { font-size: 0.68rem; font-weight: 700; width: 50px; text-align: right; }

/* Chart placeholder */
.chart-area { position: relative; height: 130px; margin-top: 0.3rem; }
.chart-area svg { width: 100%; height: 100%; }

/* Question pills */
.q-pills { display: flex; flex-wrap: wrap; justify-content: center; gap: 0.5rem; margin-top: 0.75rem; max-width: 1000px; }
.q-pill { padding: 0.3rem 0.8rem; border-radius: 100px; font-size: 0.68rem; background: hsla(36,30%,90%,0.5); color: var(--muted-fg); border: 1px solid hsla(36,30%,85%,0.4); }

/* ═══════════ SCROLL HINT ═══════════ */
.scroll-hint {
  position: absolute; bottom: 3rem; left: 50%; transform: translateX(-50%);
  display: flex; flex-direction: column; align-items: center; gap: 6px;
}
.scroll-hint p { font-size: 0.68rem; letter-spacing: 0.15em; text-transform: uppercase; font-weight: 500; color: var(--muted-fg); animation: hintPulse 2.5s infinite ease-in-out; }
.scroll-mouse { width: 20px; height: 32px; border-radius: 100px; border: 2px solid var(--muted-fg); position: relative; opacity: 0.4; animation: hintBounce 1.8s infinite ease-in-out; }
.scroll-mouse::after { content: ''; position: absolute; top: 6px; left: 50%; transform: translateX(-50%); width: 3px; height: 6px; border-radius: 3px; background: var(--muted-fg); animation: scrollDot 1.8s infinite ease-in-out; }
@keyframes hintPulse { 0%,100% { opacity: 0.4; } 50% { opacity: 0.9; } }
@keyframes hintBounce { 0%,100% { transform: translateY(0); } 50% { transform: translateY(5px); } }
@keyframes scrollDot { 0%,100% { transform: translateX(-50%) translateY(0); opacity: 1; } 50% { transform: translateX(-50%) translateY(6px); opacity: 0.3; } }

/* ═══════════ RESPONSIVE ═══════════ */
@media (max-width: 900px) {
  .grid-4 { grid-template-columns: repeat(2, 1fr); }
  .grid-3 { grid-template-columns: 1fr; max-width: 400px; }
  .two-col { grid-template-columns: 1fr; }
  .kpi-row { grid-template-columns: repeat(2, 1fr); }
  .dash-body { grid-template-columns: 1fr; }
  .flow-branch { flex-direction: column; align-items: center; }
  .flow-branch-card { max-width: 280px; width: 100%; }
  .nav-pill .slide-name { display: none; }
}

@media print {
  .nav-pill, .progress, .demo-btn, .scroll-hint { display: none !important; }
  .deck { overflow: visible; height: auto; }
  .slide { position: relative; opacity: 1; transform: none; pointer-events: auto; page-break-after: always; min-height: 100vh; }
  .slide .stagger { animation: none !important; opacity: 1; transform: none; }
  @page { size: landscape; margin: 0; }
}`;
