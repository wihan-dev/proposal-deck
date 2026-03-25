// Generates a standalone HTML deck using the EXACT OM Bank template
// CSS and JS are extracted directly from the reference implementation
import { DECK_CSS } from "./deckCSS";
import { DECK_JS } from "./deckJS";

interface UseCaseItem { icon: string; title: string; desc: string; tags: string[] }
interface CompetitorCard { name: string; stat: string; desc: string; badge: string; doing?: string }
interface KpiCard { label: string; value: string; delta: string }
interface IssueRow { issue: string; mentions: number; severity: "High" | "Medium" | "Low" }

interface DeckData {
  intro: { headline: string; subtitle: string };
  feedbackUseCases: UseCaseItem[];
  researchUseCases: UseCaseItem[];
  flowSteps: { emoji: string; label: string; desc: string }[];
  flowBranches: { label: string; color: "olive" | "gold" | "coral" }[];
  flowOutputs: { label: string; desc: string }[];
  chatMessages: { from: "bot" | "user"; text: string }[];
  competitors: CompetitorCard[];
  competitorCta: string;
  kpis: KpiCard[];
  npsData: number[];
  sentiment: { positive: number; neutral: number; negative: number };
  issues: IssueRow[];
  sampleQuestions: string[];
}

interface FormData {
  companyName: string;
  brandName: string;
  brandColor: string;
}

const UC_COLORS = [
  { bg: "hsl(152,40%,92%)", fg: "hsl(152,40%,30%)" },
  { bg: "hsl(211,60%,92%)", fg: "hsl(211,75%,35%)" },
  { bg: "hsl(30,80%,92%)", fg: "hsl(20,80%,40%)" },
  { bg: "hsl(0,60%,93%)", fg: "hsl(0,60%,40%)" },
];
const RES_COLORS = [
  { bg: "hsl(280,40%,92%)", fg: "hsl(280,40%,38%)" },
  { bg: "hsl(93,30%,90%)", fg: "hsl(93,22%,38%)" },
  { bg: "hsl(180,40%,92%)", fg: "hsl(180,40%,30%)" },
  { bg: "hsl(350,50%,93%)", fg: "hsl(350,50%,38%)" },
];
const COMP_COLORS = ["hsl(211,60%,50%)", "hsl(280,50%,55%)", "hsl(350,60%,50%)"];
const COMP_CLASSES = ["capitec", "tyme", "discovery"];

export function generateDeckHTML(deck: DeckData, form: FormData, logoDataUrl: string | null): string {
  const brand = form.brandName || form.companyName;
  const bc = form.brandColor || "#1A6B3C";

  // Inject brand color into CSS
  const css = DECK_CSS.replace(/--om-green:\s*#1A6B3C/g, `--om-green: ${bc}`);

  const logoHtml = logoDataUrl
    ? `<img src="${logoDataUrl}" alt="${brand}" style="max-height:50px;max-width:140px;object-fit:contain;border-radius:8px;">`
    : `<svg width="56" height="56" viewBox="0 0 56 56"><circle cx="28" cy="28" r="28" fill="${bc}"/><text x="28" y="34" text-anchor="middle" fill="#fff" font-family="'DM Sans',sans-serif" font-size="22" font-weight="700">${brand.charAt(0)}</text></svg>`;

  // Use case cards
  const feedbackCards = deck.feedbackUseCases.map((uc, i) => {
    const c = UC_COLORS[i % UC_COLORS.length];
    return `<div class="card"><div class="card-icon" style="background:${c.bg};">${uc.icon}</div><div class="card-title">${uc.title}</div><div class="card-desc">${uc.desc}</div><span class="tag" style="background:${c.bg};color:${c.fg};">${uc.tags.join(" · ")}</span></div>`;
  }).join("\n    ");

  const researchCards = deck.researchUseCases.map((uc, i) => {
    const c = RES_COLORS[i % RES_COLORS.length];
    return `<div class="card"><div class="card-icon" style="background:${c.bg};">${uc.icon}</div><div class="card-title">${uc.title}</div><div class="card-desc">${uc.desc}</div><span class="tag" style="background:${c.bg};color:${c.fg};">${uc.tags.join(" · ")}</span></div>`;
  }).join("\n    ");

  // Competitors
  const compCards = deck.competitors.map((c, i) => {
    const color = COMP_COLORS[i % COMP_COLORS.length];
    const cls = COMP_CLASSES[i % COMP_CLASSES.length];
    return `<div class="comp-card ${cls}">
      <div class="comp-name">${c.name}</div>
      <div class="comp-stat" style="color:${color};">${c.stat}</div>
      <div class="comp-desc">${c.desc}</div>
      <hr class="comp-divider">
      <div class="comp-doing-label"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10"/></svg> What they're doing:</div>
      <div class="comp-doing">${c.doing || c.badge}</div>
    </div>`;
  }).join("\n    ");

  // NPS chart (SVG)
  const npsMin = Math.min(...deck.npsData) - 2;
  const npsMax = Math.max(...deck.npsData) + 2;
  const npsRange = npsMax - npsMin || 1;
  const pts = deck.npsData.map((v, i) => {
    const x = 70 + i * (276 / Math.max(deck.npsData.length - 1, 1));
    const y = 10 + 100 * (1 - (v - npsMin) / npsRange);
    return { x, y };
  });
  const polyline = pts.map(p => `${p.x.toFixed(0)},${p.y.toFixed(0)}`).join(" ");
  const areaPath = `M${pts[0].x.toFixed(0)} ${pts[0].y.toFixed(0)} ${pts.map(p => `L${p.x.toFixed(0)} ${p.y.toFixed(0)}`).join(" ")} L${pts[pts.length-1].x.toFixed(0)} 110 L${pts[0].x.toFixed(0)} 110 Z`;
  const gridY = [10, 35, 60, 85, 110];
  const gridLabels = gridY.map(y => {
    const val = Math.round(npsMax - (y - 10) / 100 * npsRange);
    return `<line x1="30" y1="${y}" x2="350" y2="${y}" stroke="var(--border)" stroke-width="0.5"/><text x="24" y="${y + 4}" text-anchor="end" fill="var(--muted-fg)" font-size="8" font-family="DM Sans">${val}</text>`;
  }).join("\n");
  const xLabels = pts.map((p, i) => `<text x="${p.x.toFixed(0)}" y="126" text-anchor="middle" fill="var(--muted-fg)" font-size="8" font-family="DM Sans">W${i + 1}</text>`).join("\n");
  const dots = pts.map(p => `<circle cx="${p.x.toFixed(0)}" cy="${p.y.toFixed(0)}" r="3.5" fill="var(--bg)" stroke="${bc}" stroke-width="2"/>`).join("\n");

  // Issues
  const issueRows = deck.issues.map(iss => {
    const color = iss.severity === "High" ? "hsl(0,65%,55%)" : "hsl(40,80%,55%)";
    return `<div class="issue-row"><div class="issue-dot" style="background:${color};"></div><span class="issue-name">${iss.issue}</span><span class="issue-count">${iss.mentions} mentions</span><span class="issue-sev" style="color:${color};">${iss.severity}</span></div>`;
  }).join("\n          ");

  // KPIs
  const kpiIcons = [
    '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--muted-fg)" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>',
    '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--muted-fg)" stroke-width="2"><path d="M14 9V5a3 3 0 00-6 0v4"/><rect x="2" y="9" width="20" height="11" rx="2"/></svg>',
    '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--muted-fg)" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
    '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--muted-fg)" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>',
  ];
  const kpiCards = deck.kpis.map((k, i) => `<div class="kpi-card"><div class="kpi-label">${kpiIcons[i % kpiIcons.length]} ${k.label}</div><div class="kpi-value">${k.value}</div><div class="kpi-delta">${k.delta}</div></div>`).join("\n      ");

  const qPills = deck.sampleQuestions.map(q => `<span class="q-pill">"${q}"</span>`).join("\n    ");

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Yazi × ${brand}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet">
<style>
${css}
</style>
</head>
<body>

<a class="demo-btn" href="mailto:hello@askyazi.com?subject=${encodeURIComponent(brand)}%20x%20Yazi">
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3l1.5 4.5H18l-3.5 2.5L16 14.5 12 11.5 8 14.5l1.5-4.5L6 7.5h4.5z"/></svg>
  Let's Talk
</a>

<div class="nav-pill">
  <div class="bar"></div>
  <div>
    <div class="counter" id="slideCounter">1 / 5</div>
    <div class="slide-name" id="slideName">Introduction</div>
  </div>
</div>

<div class="progress">
  <button onclick="go(current-1)" id="prevBtn" disabled>
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
  </button>
  <div id="dots" style="display:flex;align-items:center;gap:6px;"></div>
  <button onclick="go(current+1)" id="nextBtn">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
  </button>
</div>

<div class="deck">

<!-- SLIDE 1: INTRO -->
<div class="slide active" id="s0">
  <div class="stagger" style="display:flex;align-items:center;gap:20px;margin-bottom:2rem;">
    <svg width="56" height="56" viewBox="0 0 56 56"><circle cx="28" cy="28" r="28" fill="#1a2e3a"/><text x="28" y="33" text-anchor="middle" fill="#FBF7F2" font-family="'Instrument Serif',serif" font-size="22">y</text></svg>
    <span style="font-size:2rem;color:var(--muted-fg);opacity:0.3;font-weight:300;">×</span>
    ${logoHtml}
  </div>
  <h1 class="headline stagger" style="text-align:center;">
    ${deck.intro.headline.replace(brand, `<em>${brand}</em>`)}
  </h1>
  <p class="body-text stagger" style="text-align:center;margin-top:1rem;">
    ${deck.intro.subtitle}
  </p>
  <div class="scroll-hint stagger">
    <p>Swipe to explore</p>
    <div class="scroll-mouse"></div>
  </div>
</div>

<!-- SLIDE 2: USE CASES -->
<div class="slide" id="s1">
  <p class="label stagger">Tailored for ${brand}</p>
  <h2 class="subheadline stagger" style="text-align:center;margin:0.25rem 0 0.5rem;">Where Yazi Delivers <em>Value</em></h2>

  <div class="stagger" style="display:flex;align-items:center;gap:6px;margin-bottom:0.5rem;">
    <span class="section-dot" style="background:var(--olive);"></span>
    <span style="font-size:0.82rem;font-weight:600;">Customer Feedback — CX & Brand Perception</span>
  </div>
  <div class="grid-4 stagger">
    ${feedbackCards}
  </div>

  <div class="stagger" style="display:flex;align-items:center;gap:6px;margin:0.75rem 0 0.5rem;">
    <span class="section-dot" style="background:hsl(211,75%,40%);"></span>
    <span style="font-size:0.82rem;font-weight:600;">Market Research — Trackers & Ad-Hoc Studies</span>
  </div>
  <div class="grid-4 stagger">
    ${researchCards}
  </div>
</div>

<!-- SLIDE 3: FLOW DIAGRAM -->
<div class="slide" id="s2" style="padding-top:2.5rem;padding-bottom:2rem;">
  <p class="label stagger" style="margin-bottom:0.15rem;">How It Works for ${brand}</p>
  <h2 class="stagger" style="font-family:'Instrument Serif',serif;font-size:clamp(1.1rem,2.2vw,1.6rem);text-align:center;color:var(--muted-fg);margin-bottom:1rem;">
    ${brand} · <em>Automated CX intelligence loop</em>
  </h2>
  <p class="stagger" style="font-size:0.78rem;color:var(--muted-fg);margin-bottom:1.25rem;text-align:center;">Automated CX orchestration via Yazi</p>

  <div class="flow-container stagger">
    <div class="flow-card trigger">
      <div class="flow-icon" style="background:hsl(0,45%,92%);">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="hsl(0,50%,45%)" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9l3 3-3 3"/><line x1="15" y1="9" x2="15" y2="15"/></svg>
      </div>
      <div class="flow-card-text">
        <h4>${deck.flowSteps[0]?.label || "Trigger Event"}</h4>
        <p>${deck.flowSteps[0]?.desc || ""}</p>
      </div>
      <span class="flow-badge" style="background:hsl(0,50%,93%);color:hsl(0,50%,42%);">Trigger</span>
    </div>

    <div class="flow-connector"></div>

    <div class="flow-card whatsapp">
      <div class="flow-icon" style="background:hsl(86,35%,90%);">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--whatsapp)" stroke-width="2"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 5 9-5"/></svg>
      </div>
      <div class="flow-card-text">
        <h4>WhatsApp check-in sent</h4>
        <p>Personalised message within 2 hours of trigger</p>
      </div>
      <span class="flow-badge" style="background:hsl(145,40%,92%);color:var(--whatsapp);">WhatsApp</span>
    </div>

    <div class="flow-connector"></div>

    <div class="flow-split">
      <div class="flow-split-leg" style="left:calc(16.67% + 8px);"></div>
      <div class="flow-split-leg" style="left:50%;transform:translateX(-50%);"></div>
      <div class="flow-split-leg" style="right:calc(16.67% + 8px);"></div>
    </div>

    <div class="flow-branch">
      ${deck.flowBranches.map(b => `<div class="flow-branch-card">
        <div class="flow-branch-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="hsl(240,30%,55%)" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M8 8h8M8 12h8M8 16h4"/></svg>
        </div>
        <h4>${b.label}</h4>
      </div>`).join("\n      ")}
    </div>

    <div class="flow-merge">
      <div class="flow-merge-arrow"></div>
    </div>

    <div class="flow-card data">
      <div class="flow-icon" style="background:hsl(37,40%,90%);">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--muted-fg)" stroke-width="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3"/></svg>
      </div>
      <div class="flow-card-text">
        <h4>Yazi data layer</h4>
        <p>Responses processed, tagged, and stored in real time</p>
      </div>
      <span class="flow-badge" style="background:hsl(37,40%,90%);color:var(--muted-fg);">Processing</span>
    </div>

    <div class="flow-connector"></div>

    <div class="flow-branch" style="max-width:620px;">
      <div class="flow-card output-dash" style="flex:1;">
        <div class="flow-icon" style="background:hsl(211,40%,92%);">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="hsl(211,60%,45%)" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 17v-6M12 17V9M16 17v-4"/></svg>
        </div>
        <div class="flow-card-text">
          <h4>${deck.flowOutputs[0]?.label || "Live dashboard"}</h4>
          <p>${deck.flowOutputs[0]?.desc || "Branded reporting"}</p>
        </div>
      </div>
      <div class="flow-card output-alert" style="flex:1;">
        <div class="flow-icon" style="background:hsl(30,50%,92%);">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="hsl(30,60%,40%)" stroke-width="2"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>
        </div>
        <div class="flow-card-text">
          <h4>${deck.flowOutputs[1]?.label || "Retention alert"}</h4>
          <p>${deck.flowOutputs[1]?.desc || "Team notified instantly"}</p>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- SLIDE 4: COMPETITORS -->
<div class="slide" id="s3">
  <p class="label stagger">Competitive Intelligence</p>
  <h2 class="subheadline stagger" style="text-align:center;margin:0.25rem 0 1rem;">Your Competitors Are <em>Already Listening</em></h2>

  <div class="warning-banner stagger">
    <svg width="22" height="22" viewBox="0 0 24 24" fill="hsl(30,80%,50%)" stroke="none"><path d="M12 2L1 21h22L12 2zm0 4l7.53 13H4.47L12 6zm-1 5v4h2v-4h-2zm0 6v2h2v-2h-2z"/></svg>
    <p>Without a real-time feedback loop, <strong>${brand}</strong> is flying blind on what keeps customers or drives them to competitors.</p>
  </div>

  <div class="grid-3 stagger" style="margin:1.25rem 0;">
    ${compCards}
  </div>

  <div class="cta-bar stagger">
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
    <p>${deck.competitorCta}</p>
  </div>
</div>

<!-- SLIDE 5: DASHBOARD -->
<div class="slide" id="s4" style="padding-top:1.5rem;">
  <p class="label stagger">Live Reporting</p>
  <h2 class="subheadline stagger" style="text-align:center;margin:0.25rem 0 0.75rem;">Your ${brand} <em>Insights Dashboard</em></h2>

  <div class="dash-container stagger">
    <div class="dash-header">
      <div class="dash-header-left">
        <div class="dash-header-dot"></div>
        <span>${brand} — Customer Intelligence Dashboard</span>
      </div>
      <div class="dash-live">
        <div class="dash-live-dot"></div>
        <span>Live</span>
      </div>
    </div>

    <div class="kpi-row">
      ${kpiCards}
    </div>

    <div class="dash-body">
      <div class="dash-panel">
        <div class="dash-panel-title">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--fg)" stroke-width="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/></svg>
          NPS Trend — Post-Onboarding Survey
        </div>
        <div class="chart-area">
          <svg viewBox="0 0 360 130" preserveAspectRatio="none">
            <defs><linearGradient id="g1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="${bc}" stop-opacity="0.12"/><stop offset="100%" stop-color="${bc}" stop-opacity="0.01"/></linearGradient></defs>
            ${gridLabels}
            ${xLabels}
            <path d="${areaPath}" fill="url(#g1)"/>
            <polyline points="${polyline}" fill="none" stroke="${bc}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            ${dots}
          </svg>
        </div>
      </div>

      <div style="display:flex;flex-direction:column;gap:0.75rem;">
        <div class="dash-panel">
          <div class="dash-panel-title">Sentiment Breakdown — This Week</div>
          <div class="sentiment-row"><span class="sentiment-label">Positive</span><div class="sentiment-track"><div class="sentiment-fill" style="width:${deck.sentiment.positive}%;background:${bc};"></div></div><span class="sentiment-pct">${deck.sentiment.positive}%</span></div>
          <div class="sentiment-row"><span class="sentiment-label">Neutral</span><div class="sentiment-track"><div class="sentiment-fill" style="width:${deck.sentiment.neutral}%;background:hsl(40,80%,55%);"></div></div><span class="sentiment-pct">${deck.sentiment.neutral}%</span></div>
          <div class="sentiment-row"><span class="sentiment-label">Negative</span><div class="sentiment-track"><div class="sentiment-fill" style="width:${deck.sentiment.negative}%;background:hsl(0,65%,55%);"></div></div><span class="sentiment-pct">${deck.sentiment.negative}%</span></div>
        </div>

        <div class="dash-panel">
          <div class="dash-panel-title">Top Issues — AI-Categorised</div>
          ${issueRows}
        </div>
      </div>
    </div>
  </div>

  <div class="q-pills stagger">
    ${qPills}
  </div>
</div>

</div>

<script>
${DECK_JS}
</script>
</body>
</html>`;
}
