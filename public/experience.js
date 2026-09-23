const basePath = document.getElementById("app")?.dataset.basePath || "";

const paths = {
  claims: {
    number: "03",
    icon: "CLM",
    title: "Claims",
    home: "Turn first notice into a confident next move.",
    color: "213, 31, 43",
    accent: "#d51f2b",
    solution: "Spark Claim",
    solutionLine: "AI-powered intake and triage that moves a claim from first notice to the right next action.",
    tags: ["FNOL + FROI", "AI triage", "Human-in-the-loop"],
    questions: [
      {
        title: "Where does claim intake slow down most?",
        prompt: "Choose the friction your team feels most often.",
        answers: ["Manual intake and rekeying", "Incomplete or inconsistent details", "Routing to the right adjuster"]
      },
      {
        title: "What would change the day for your team?",
        prompt: "Pick the improvement they would notice immediately.",
        answers: ["Clean information on first touch", "Instant triage and severity signals", "Faster routing with human oversight"]
      },
      {
        title: "What should the claimant feel?",
        prompt: "The best workflow is visible in the customer experience.",
        answers: ["I've been heard", "I know what happens next", "This carrier moves quickly"]
      }
    ],
    future: "every first notice arrived clear, prioritized and ready to move",
    slides: [
      { kicker: "Capture once", title: "A guided intake that asks the next right question.", copy: "Collect structured claim or injury details without making customers understand internal insurance workflows.", cards: [["Dynamic intake", "Questions adapt to the incident in real time.", 84], ["Cleaner submissions", "Required details are surfaced before handoff.", 72], ["One connected record", "Voice, document and form inputs converge into one case.", 91]] },
      { kicker: "See the signal", title: "Triage urgency before the queue gets crowded.", copy: "Surface severity, missing data and routing signals while keeping people in control of consequential decisions.", cards: [["Severity signal", "Potential escalation detected for review.", 78], ["Missing detail", "One follow-up item identified automatically.", 63], ["Human review", "Rules and AI recommendations remain explainable.", 88]] },
      { kicker: "Move with confidence", title: "Send every claim to the best next action.", copy: "Route complete, prioritized work to the right team and give the claimant a clear sense of progress.", cards: [["Ready for assignment", "Structured packet prepared for the adjuster.", 94], ["Faster handoff", "Less chasing and less duplicate entry.", 82], ["Customer clarity", "Next-step guidance is immediate and consistent.", 89]] }
    ]
  },
  underwriting: {
    number: "02",
    icon: "UW",
    title: "Underwriting",
    home: "Put context in front of underwriters—not paperwork.",
    color: "246, 199, 44",
    accent: "#f6c72c",
    solution: "Spark Underwriting",
    solutionLine: "An AI workbench that assembles risk context so underwriters can focus on judgment and exceptions.",
    tags: ["Submission intelligence", "Risk summaries", "Decision support"],
    questions: [
      {
        title: "Where does an opportunity get stuck?",
        prompt: "Choose the point that consumes the most underwriting attention.",
        answers: ["Scattered submission documents", "Manual appetite and rule checks", "Repetitive risk research"]
      },
      {
        title: "What should underwriters spend more time doing?",
        prompt: "Choose the work where expertise creates the most value.",
        answers: ["Making informed decisions", "Handling meaningful exceptions", "Engaging brokers and producers"]
      },
      {
        title: "What would a better day look like?",
        prompt: "Pick the outcome your team would feel first.",
        answers: ["Every risk arrives summarized", "Decisions feel consistent and explainable", "Quote cycles move noticeably faster"]
      }
    ],
    future: "underwriters opened every submission with the important context already assembled",
    slides: [
      { kicker: "Assemble", title: "Turn scattered submissions into one usable risk view.", copy: "Extract, classify and organize information from the documents and systems your team already receives.", cards: [["Submission packet", "12 files organized into one risk record.", 90], ["Data confidence", "Sources remain visible for verification.", 81], ["Missing information", "Gaps appear before review begins.", 67]] },
      { kicker: "Understand", title: "Bring appetite, rules and risk signals together.", copy: "Place the relevant guidelines and summarized facts beside the decision—without hiding the reasoning.", cards: [["Appetite alignment", "Core criteria mapped against the submission.", 86], ["Risk narrative", "Key exposures summarized in plain language.", 77], ["Explainable signals", "Every recommendation links back to evidence.", 92]] },
      { kicker: "Decide", title: "Give experts a faster path to judgment.", copy: "Automate the repetitive preparation while underwriters own the exceptions, relationships and final call.", cards: [["Decision workspace", "Facts, rules and collaboration in one place.", 91], ["Exception focus", "Human attention moves to complex risks.", 84], ["Broker response", "Clearer questions shorten the back-and-forth.", 79]] }
    ]
  },
  distribution: {
    number: "01",
    icon: "R8R",
    title: "Distribution",
    home: "Make quote-to-bind feel like one continuous journey.",
    color: "112, 85, 224",
    accent: "#7055e0",
    solution: "Spark Rater",
    solutionLine: "One proprietary sales engine powering two tailored experiences: Spark Direct and Spark Agents.",
    tags: ["Direct + Agent", "Quote-to-bind", "Flexible APIs"],
    questions: [
      {
        title: "What keeps new business from moving?",
        prompt: "Choose the friction most visible to customers or producers.",
        answers: ["Too many screens and handoffs", "The core system dictates the experience", "Every integration becomes a project"]
      },
      {
        title: "Who needs a better buying path?",
        prompt: "Spark Rater can serve more than one distribution model.",
        answers: ["Direct consumers", "Agents and brokers", "Both—without duplicating the engine"]
      },
      {
        title: "What would transform distribution?",
        prompt: "Choose the future state that matters most.",
        answers: ["A faster quote-to-bind journey", "A branded, consistent buying experience", "Flexible screens and APIs that evolve"]
      }
    ],
    future: "every customer and producer moved through a fast, branded path powered by the same core engine",
    slides: [
      { kicker: "One core engine", title: "Orchestrate rating, underwriting and bind in one flow.", copy: "A proprietary middle tier coordinates the complex steps behind a simple buying experience.", cards: [["Connected journey", "Rating, rules and bind move in sequence.", 92], ["Reusable logic", "One engine supports multiple experiences.", 88], ["Carrier control", "Business rules remain central and consistent.", 83]] },
      { kicker: "Two experiences", title: "Meet customers and agents where they work.", copy: "Spark Direct creates a consumer path. Spark Agents gives producers the context and controls they need.", cards: [["Spark Direct", "A simple self-guided consumer journey.", 86], ["Spark Agents", "A productive, informed producer experience.", 90], ["Shared foundation", "Enhance both channels without rebuilding the core.", 94]] },
      { kicker: "Flexible by design", title: "Choose the interface—or use the APIs.", copy: "Adopt the complete experience or connect your own front end to the same rating and underwriting orchestration.", cards: [["Complete experience", "Launch with a polished branded journey.", 89], ["API enablement", "Power agency or partner-owned interfaces.", 82], ["Isolated deployment", "Scale securely by client, program and channel.", 91]] }
    ]
  },
  experience: {
    number: "04",
    icon: "CX",
    title: "Customer Experience",
    home: "Help people find answers, documents and next steps faster.",
    color: "67, 199, 185",
    accent: "#43c7b9",
    solution: "Spark Navigator + Portal",
    solutionLine: "A branded self-service portal with an AI guide that helps insureds, agents and employees get where they need to go.",
    tags: ["Branded portal", "AI navigation", "Self-service"],
    questions: [
      {
        title: "What makes self-service feel hard?",
        prompt: "Choose the moment that creates the most avoidable friction.",
        answers: ["People cannot find pages or documents", "The portal feels generic and inflexible", "Simple questions become phone calls"]
      },
      {
        title: "Who needs a faster path?",
        prompt: "Choose the audience you want to empower first.",
        answers: ["Insureds and policyholders", "Agents and producers", "Employees supporting both"]
      },
      {
        title: "What would a delightful experience do?",
        prompt: "Pick the capability that would change perception fastest.",
        answers: ["Answer in natural language", "Find documents and tasks instantly", "Reflect our brand and products"]
      }
    ],
    future: "every user could simply ask, find and act without learning the shape of your systems",
    slides: [
      { kicker: "A portal that fits", title: "Present your brand and products your way.", copy: "Spark Portal gives carriers a tailored self-service layer instead of a one-size-fits-all core-system experience.", cards: [["Brand control", "Your identity stays visible throughout the journey.", 92], ["Role-based views", "Insureds and agents see what matters to them.", 85], ["Connected actions", "Payments, documents and service live together.", 89]] },
      { kicker: "An AI guide", title: "Let users ask for what they need.", copy: "Spark Navigator turns natural-language requests into the right page, document or next action.", cards: [["Ask naturally", "No menu knowledge or insurance jargon required.", 91], ["Find fast", "Pages and documents surface in context.", 94], ["Reduce calls", "Routine navigation becomes true self-service.", 80]] },
      { kicker: "One connected experience", title: "Make every interaction feel coherent.", copy: "Navigator and Portal work together so the interface, answers and actions reinforce the same trusted experience.", cards: [["Continuous context", "The guide understands where the user is.", 86], ["Fewer dead ends", "Every answer offers a meaningful next step.", 90], ["Better service", "Employees focus on the moments that need people.", 83]] }
    ]
  }
};

const app = document.getElementById("app");
const idleOverlay = document.getElementById("idleOverlay");
const idleCount = document.getElementById("idleCount");
const toast = document.getElementById("toast");
const backButton = document.querySelector(".back-button");

const state = {
  view: "home",
  path: null,
  step: 0,
  answers: [],
  draftAnswer: null,
  slide: 0,
  viewedSlides: [],
  shared: false,
  saveStatus: "idle",
  sessionId: getSessionId()
};

let idleTimer;
let idleCountdown;
let toastTimer;
let recognition;

function getSessionId() {
  const existing = sessionStorage.getItem("advancioBoothSession");
  if (existing) return existing;
  const id = (crypto.randomUUID?.() || `session-${Date.now()}-${Math.random().toString(36).slice(2)}`).replace(/[^a-zA-Z0-9_-]/g, "");
  sessionStorage.setItem("advancioBoothSession", id);
  return id;
}

function setTheme(path) {
  const root = document.documentElement;
  const data = path ? paths[path] : null;
  root.style.setProperty("--accent", data?.accent || "#d51f2b");
  root.style.setProperty("--accent-rgb", data?.color || "213, 31, 43");
}

function escapeHtml(value = "") {
  return String(value).replace(/[&<>'"]/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[char]));
}

function render() {
  setTheme(state.path);
  backButton.hidden = state.view === "home";
  if (state.view === "home") renderHome();
  if (state.view === "quiz") renderQuiz();
  if (state.view === "future") renderFuture();
  if (state.view === "solution") renderSolution();
  if (state.view === "summary") renderSummary();
  app.focus({ preventScroll: true });
  resetIdleTimer();
}

function renderHome() {
  app.innerHTML = `
    <section class="screen home-screen" aria-labelledby="homeTitle">
      <div class="home-copy">
        <span class="eyebrow">Tap into your messy middle</span>
        <h1 id="homeTitle">Choose your <span class="question-accent">bottleneck</span></h1>
        <p>Choose the area where work gets stuck. In a few taps, see what life could look like on the other side.</p>
        <div class="touch-cue"><span class="touch-cue__ring" aria-hidden="true"></span> Touch one area to begin</div>
      </div>
      <div class="path-grid" aria-label="Choose a business area">
        ${["distribution", "underwriting", "claims", "experience"].map(key => [key, paths[key]]).map(([key, item]) => `
          <button class="path-card" style="--card-accent:${item.color}" type="button" data-path="${key}">
            <span class="path-card__number">PATH ${item.number}</span>
            <span class="path-card__icon" aria-hidden="true">${item.icon}</span>
            <h2>${item.title}</h2>
            <p>${item.home}</p>
            <span class="path-card__arrow" aria-hidden="true">→</span>
          </button>
        `).join("")}
      </div>
    </section>`;
}

function renderQuiz() {
  const data = paths[state.path];
  const question = data.questions[state.step];
  const tags = state.answers.map(answer => answer.answer);
  const selectedIndex = state.draftAnswer?.optionIndex;
  const isOther = state.draftAnswer?.isOther;
  app.innerHTML = `
    <section class="screen journey-layout" aria-labelledby="questionTitle">
      <div class="journey-main">
        <div class="journey-topline">
          <div class="journey-label"><strong>${data.icon}</strong> ${data.title} bottleneck scan</div>
          <div class="progress-track" aria-label="Question ${state.step + 1} of 3"><span style="--progress:${((state.step + 1) / 3) * 100}%"></span></div>
          <div class="step-count">0${state.step + 1} / 03</div>
        </div>
        <span class="eyebrow">Follow the friction</span>
        <h1 id="questionTitle">${question.title}</h1>
        <p>${question.prompt} Select one answer.</p>
        <div class="answer-list">
          ${question.answers.map((answer, index) => `
            <button class="answer-button ${selectedIndex === index && !isOther ? "is-selected" : ""}" type="button" data-answer="${index}" aria-pressed="${selectedIndex === index && !isOther}">
              <span class="answer-button__index">0${index + 1}</span>
              <span class="answer-button__text">${answer}</span>
              <span class="answer-button__check" aria-hidden="true">✓</span>
            </button>
          `).join("")}
          <button class="answer-button answer-button--other ${isOther ? "is-selected" : ""}" type="button" data-action="choose-other" aria-pressed="${Boolean(isOther)}">
            <span class="answer-button__index">04</span>
            <span class="answer-button__text">Other — tell us in your own words</span>
            <span class="answer-button__mic" aria-hidden="true">●</span>
          </button>
        </div>
        ${isOther ? `
          <div class="voice-answer">
            <div class="voice-answer__head">
              <div><strong>Speak or type your answer</strong><span>Only the final transcript is saved—not your audio.</span></div>
              <button class="voice-button" type="button" data-action="speak" aria-label="Start voice input"><span aria-hidden="true">●</span> Speak answer</button>
            </div>
            <label for="otherAnswer">Your answer</label>
            <textarea id="otherAnswer" rows="3" placeholder="Tap “Speak answer” or type here…">${escapeHtml(state.draftAnswer?.answer || "")}</textarea>
            <div class="voice-status" id="voiceStatus" aria-live="polite">Ready when you are.</div>
          </div>` : ""}
        <div class="quiz-actions">
          <span class="save-indicator ${state.saveStatus === "error" ? "has-error" : ""}">${state.saveStatus === "saving" ? "Saving…" : state.saveStatus === "saved" ? "Answer saved" : state.saveStatus === "error" ? "Save paused—tap continue to retry" : "Your answers are saved as you go"}</span>
          <button class="primary-button" type="button" data-action="continue-answer" ${state.draftAnswer ? "" : "disabled"}>Continue <span aria-hidden="true">→</span></button>
        </div>
      </div>
      <aside class="signal-panel" aria-label="Your bottleneck signal">
        <div class="signal-panel__head"><span>Live signal map</span><span class="signal-panel__live">Listening</span></div>
        <div class="signal-radar" aria-hidden="true">
          <span class="signal-radar__ring"></span><span class="signal-radar__ring"></span><span class="signal-radar__ring"></span>
          <span class="signal-radar__core">${data.icon}</span>
        </div>
        <div class="signal-tags">
          ${tags.length ? tags.map(tag => `<span class="signal-tag">${escapeHtml(tag)}</span>`).join("") : `<span class="signal-tag">Your answers will build the signal</span>`}
        </div>
      </aside>
    </section>`;
}

function renderFuture() {
  const data = paths[state.path];
  const selected = state.answers.map(answer => answer.answer);
  app.innerHTML = `
    <section class="screen future-screen" aria-labelledby="futureTitle">
      <div class="future-copy">
        <span class="eyebrow">The future state</span>
        <h1 id="futureTitle">Imagine if <em>${data.future}</em>.</h1>
        <p>Your answers point to a connected outcome—not another isolated tool.</p>
        <div class="insight-stack">
          ${selected.map((answer, index) => `<div class="insight-row"><i>✓</i><span>${escapeHtml(answer)}</span></div>`).join("")}
        </div>
        <button class="primary-button" type="button" data-action="reveal">Show me the path <span aria-hidden="true">→</span></button>
      </div>
      <div class="future-visual" aria-hidden="true">
        <div class="flow-orbit">
          <div class="flow-core"><div><strong>FLOW</strong><span>friction, resolved</span></div></div>
          <span class="orbit-chip">Clear context</span>
          <span class="orbit-chip">Faster action</span>
          <span class="orbit-chip">Human judgment</span>
          <span class="orbit-chip">Better experience</span>
        </div>
      </div>
    </section>`;
}

function renderSolution() {
  const data = paths[state.path];
  const slide = data.slides[state.slide];
  if (!state.viewedSlides.includes(state.slide)) state.viewedSlides.push(state.slide);
  app.innerHTML = `
    <section class="screen solution-screen" aria-labelledby="solutionTitle">
      <div class="solution-copy">
        <span class="eyebrow">Your accelerator</span>
        <h1 id="solutionTitle">Meet <span>${data.solution}</span>.</h1>
        <p>${data.solutionLine}</p>
        <div class="solution-meta">${data.tags.map(tag => `<span>${tag}</span>`).join("")}</div>
        <button class="secondary-button" type="button" data-action="summary">Skip to my takeaway</button>
        <div class="slide-dots" aria-label="Solution story slides">
          ${data.slides.map((_, index) => `<button class="slide-dot ${index === state.slide ? "is-active" : ""}" type="button" data-slide="${index}" aria-label="View slide ${index + 1}"></button>`).join("")}
        </div>
      </div>
      <div class="product-stage">
        <div class="product-chrome"><span class="chrome-dots"><i></i><i></i><i></i></span><strong>${data.solution} / ${state.slide + 1} of ${data.slides.length}</strong><span>Interactive story</span></div>
        <div class="product-view" key="${state.slide}">
          <span class="product-view__eyebrow">${slide.kicker}</span>
          <h2>${slide.title}</h2>
          <p>${slide.copy}</p>
          <div class="demo-ui">
            ${slide.cards.map((card, index) => `
              <div class="demo-card ${index === 2 ? "demo-card--wide" : ""}">
                <span class="demo-card__label">${index === 0 ? "Signal" : index === 1 ? "Workflow" : "Outcome"}</span>
                <strong>${card[0]}</strong>
                <p>${card[1]}</p>
                <div class="metric-line"><span style="--value:${card[2]}%"></span></div>
                <span class="hotspot" aria-hidden="true">+</span>
              </div>
            `).join("")}
          </div>
          <div class="product-screenshot" aria-label="Product screenshot area">
            <div class="product-screenshot__toolbar"><span>Actual product view</span><span>Screenshot ${state.slide + 1}</span></div>
            <div class="product-screenshot__canvas">
              <img class="product-screenshot__image" src="${basePath}/product-screenshots/${state.path}-${state.slide + 1}.png" alt="${data.solution} product screen ${state.slide + 1}" onload="this.closest('.product-screenshot__canvas').classList.add('has-image')" onerror="this.remove()" />
              <div class="screenshot-rail"><i></i><i></i><i></i><i></i></div>
              <div class="screenshot-content">
                <span class="screenshot-badge">${data.solution}</span>
                <strong>Product walkthrough preview</strong>
                <p>This story frame is ready for an approved ${data.solution} product screen.</p>
              </div>
            </div>
          </div>
        </div>
        <button class="primary-button stage-next" type="button" data-action="next-slide">${state.slide === data.slides.length - 1 ? "Build my takeaway" : "Next idea"} <span aria-hidden="true">→</span></button>
      </div>
    </section>`;
}

function personalizedUrl() {
  const url = new URL(window.location.href);
  url.search = "";
  url.hash = "";
  url.searchParams.set("session", state.sessionId);
  return url.toString();
}

function summaryPayload() {
  const data = paths[state.path];
  const stages = [...state.viewedSlides]
    .sort((a, b) => a - b)
    .map(index => data.slides[index]?.title)
    .filter(Boolean);
  return {
    area: data.title,
    recommendation: data.solution,
    recommendationReason: data.solutionLine,
    answers: state.answers.map((answer, index) => ({
      question: data.questions[index].title,
      answer: answer.answer,
      responseType: answer.isOther ? "Other response" : "Multiple-choice selection"
    })),
    futureState: data.future,
    storyStagesViewed: stages
  };
}

function summaryText() {
  const summary = summaryPayload();
  const answers = summary.answers.map(item => `• ${item.question}\n  ${item.answer}`).join("\n");
  const stages = summary.storyStagesViewed.length ? summary.storyStagesViewed.join("; ") : "Solution overview";
  return `My Advancio bottleneck journey\n\nFocus: ${summary.area}\nRecommended accelerator: ${summary.recommendation}\nFuture state: ${summary.futureState}.\n\nMy answers:\n${answers}\n\nWhat I explored: ${stages}\n\nWhy this path: ${summary.recommendationReason}\n\nContinue my exact journey: ${personalizedUrl()}\n\nBuilt with Advancio.`;
}

function renderSummary() {
  const data = paths[state.path];
  const summary = summaryPayload();
  app.innerHTML = `
    <section class="screen summary-screen" aria-labelledby="summaryTitle">
      <div class="summary-copy">
        <span class="eyebrow">Your complete journey</span>
        <h1 id="summaryTitle">Your clearest path is <span>${data.solution}</span>.</h1>
        <p>You chose <strong>${data.title}</strong>, described where work gets stuck, pictured a better day, and explored how ${data.solution} can move you toward a future where ${data.future}.</p>
        <div class="journey-receipt">
          ${summary.answers.map((item, index) => `<div class="receipt-line"><span>Answer 0${index + 1}</span><div><small>${escapeHtml(item.question)}</small><strong>${escapeHtml(item.answer)}</strong></div></div>`).join("")}
          <div class="receipt-line receipt-line--story"><span>Experience</span><div><small>Story explored</small><strong>${escapeHtml(summary.storyStagesViewed.join(" • ") || "Solution overview")}</strong></div></div>
        </div>
        <div class="cta-row">
          <button class="primary-button" type="button" data-action="booth-demo">Request a 5-minute demo now</button>
          <button class="secondary-button" type="button" data-action="restart">Explore another bottleneck</button>
        </div>
      </div>
      <aside class="takeaway-panel">
        <span class="eyebrow">Take it with you</span>
        <h2>Keep your exact journey.</h2>
        <p>Scan the code with your phone, then save or share your personalized summary and book a deeper session when you are back at the office.</p>
        <div class="share-layout">
          <div class="qr-frame" id="qrCode"><span class="qr-fallback">Preparing your personalized link…</span></div>
          <div class="share-actions">
            <button class="primary-button" type="button" data-action="share">Text or email my journey</button>
            <button class="secondary-button" type="button" data-action="copy">Copy personalized link</button>
            <a class="secondary-button" href="https://www.advancio.com/book-a-free-demo/" target="_blank" rel="noopener">Book a deeper demo</a>
            <p class="microcopy">Your answers and explored screens are saved to this anonymous booth session. Voice audio is never stored.</p>
          </div>
        </div>
      </aside>
    </section>`;
  window.setTimeout(drawQr, 60);
  window.setTimeout(() => saveSession("summary"), 0);
}

function drawQr() {
  const target = document.getElementById("qrCode");
  if (!target) return;
  if (window.QRCode) {
    target.innerHTML = "";
    new QRCode(target, { text: personalizedUrl(), width: 164, height: 164, colorDark: "#090909", colorLight: "#ffffff", correctLevel: QRCode.CorrectLevel.M });
  } else {
    target.innerHTML = `<span class="qr-fallback">Use “Text or email my journey” to continue on your device.</span>`;
  }
}

function choosePath(path) {
  if (!paths[path]) return;
  state.path = path;
  state.view = "quiz";
  state.step = 0;
  state.answers = [];
  state.draftAnswer = null;
  state.slide = 0;
  state.viewedSlides = [];
  state.shared = false;
  render();
  saveSession("path");
}

function chooseAnswer(answer) {
  const index = Number(answer);
  const question = paths[state.path].questions[state.step];
  state.draftAnswer = {
    question: question.title,
    answer: question.answers[index],
    optionIndex: index,
    isOther: false,
    inputMethod: "tap"
  };
  render();
}

function chooseOther() {
  const existing = state.answers[state.step]?.isOther ? state.answers[state.step] : null;
  state.draftAnswer = {
    question: paths[state.path].questions[state.step].title,
    answer: existing?.answer || "",
    optionIndex: null,
    isOther: true,
    inputMethod: existing?.inputMethod || "typed"
  };
  render();
  document.getElementById("otherAnswer")?.focus();
}

function continueAnswer() {
  if (!state.draftAnswer) return showToast("Choose an answer to continue.");
  if (state.draftAnswer.isOther) {
    const input = document.getElementById("otherAnswer");
    state.draftAnswer.answer = input?.value.trim() || "";
    if (!state.draftAnswer.answer) return showToast("Speak or type your answer first.");
  }
  state.answers[state.step] = { ...state.draftAnswer };
  saveSession("answer");
  if (state.step < 2) {
    state.step += 1;
    state.draftAnswer = state.answers[state.step] ? { ...state.answers[state.step] } : null;
    render();
  } else {
    state.view = "future";
    state.draftAnswer = null;
    render();
  }
}

function startVoiceInput() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const status = document.getElementById("voiceStatus");
  if (!SpeechRecognition) {
    if (status) status.textContent = "Voice input is not available in this browser. You can type your answer.";
    return;
  }
  recognition?.abort?.();
  recognition = new SpeechRecognition();
  recognition.lang = "en-US";
  recognition.interimResults = true;
  recognition.continuous = false;
  recognition.onstart = () => {
    if (status) status.textContent = "Listening… speak naturally.";
    document.querySelector(".voice-button")?.classList.add("is-listening");
  };
  recognition.onresult = event => {
    const transcript = Array.from(event.results).map(result => result[0].transcript).join(" ");
    const input = document.getElementById("otherAnswer");
    if (input) input.value = transcript;
    state.draftAnswer.answer = transcript;
    state.draftAnswer.inputMethod = "voice transcript";
    if (status) status.textContent = event.results[event.results.length - 1].isFinal ? "Transcript ready. Review it, then continue." : "Listening…";
  };
  recognition.onerror = () => {
    if (status) status.textContent = "I could not hear that. Try again or type your answer.";
  };
  recognition.onend = () => document.querySelector(".voice-button")?.classList.remove("is-listening");
  recognition.start();
}

function sessionPayload(reason) {
  const complete = Boolean(state.path && state.answers.length === 3);
  return {
    sessionId: state.sessionId,
    reason,
    path: state.path,
    view: state.view,
    step: state.step,
    slide: state.slide,
    answers: state.answers,
    viewedSlides: state.viewedSlides,
    summary: complete ? summaryPayload() : null,
    updatedAt: new Date().toISOString()
  };
}

async function saveSession(reason) {
  if (!state.path) return;
  state.saveStatus = "saving";
  try {
    const response = await fetch(`${basePath}/api/session`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ sessionId: state.sessionId, payload: sessionPayload(reason) })
    });
    if (!response.ok) throw new Error("save failed");
    state.saveStatus = "saved";
    sessionStorage.removeItem("advancioPendingSession");
  } catch {
    state.saveStatus = "error";
    sessionStorage.setItem("advancioPendingSession", JSON.stringify(sessionPayload(reason)));
  }
}

function showBoothTicket() {
  const data = paths[state.path];
  const ticket = document.createElement("div");
  ticket.className = "booth-ticket";
  ticket.innerHTML = `
    <div class="booth-ticket__card" role="dialog" aria-modal="true" aria-label="Request a live booth demo">
      <button class="icon-button booth-ticket__close" type="button" data-action="close-ticket" aria-label="Close">×</button>
      <div>
        <div class="booth-ticket__pulse">5</div>
        <h2>Let's make it real.</h2>
        <p>Show this screen to an Advancio host for a five-minute ${data.solution} walkthrough.</p>
        <button class="primary-button" type="button" data-action="close-ticket">I'm with a host</button>
      </div>
    </div>`;
  document.body.appendChild(ticket);
}

async function shareJourney() {
  const data = paths[state.path];
  const payload = { title: `${data.solution} — my ITC bottleneck journey`, text: summaryText(), url: personalizedUrl() };
  try {
    if (navigator.share) {
      await navigator.share(payload);
      showToast("Your journey is ready to send.");
    } else {
      await navigator.clipboard.writeText(`${summaryText()}\n${personalizedUrl()}`);
      showToast("Journey copied. Paste it into a text or email.");
    }
  } catch (error) {
    if (error?.name !== "AbortError") copyLink();
  }
}

async function copyLink() {
  try {
    await navigator.clipboard.writeText(personalizedUrl());
    showToast("Personalized link copied.");
  } catch {
    window.prompt("Copy your personalized link:", personalizedUrl());
  }
}

function showToast(message) {
  window.clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add("is-visible");
  toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 3200);
}

function restart() {
  recognition?.abort?.();
  const url = new URL(window.location.href);
  url.search = "";
  history.replaceState({}, "", url);
  sessionStorage.removeItem("advancioBoothSession");
  sessionStorage.removeItem("advancioPendingSession");
  Object.assign(state, { view: "home", path: null, step: 0, answers: [], draftAnswer: null, slide: 0, viewedSlides: [], shared: false, saveStatus: "idle", sessionId: getSessionId() });
  idleOverlay.hidden = true;
  render();
}

function goBack() {
  recognition?.abort?.();
  if (state.view === "quiz") {
    if (state.step > 0) {
      state.step -= 1;
      state.draftAnswer = state.answers[state.step] ? { ...state.answers[state.step] } : null;
    } else {
      state.view = "home";
      state.path = null;
      state.draftAnswer = null;
    }
  } else if (state.view === "future") {
    state.view = "quiz";
    state.step = 2;
    state.draftAnswer = state.answers[2] ? { ...state.answers[2] } : null;
  } else if (state.view === "solution") {
    if (state.slide > 0) state.slide -= 1;
    else state.view = "future";
  } else if (state.view === "summary") {
    state.view = "solution";
    state.slide = paths[state.path].slides.length - 1;
  }
  render();
}

function resetIdleTimer() {
  window.clearTimeout(idleTimer);
  window.clearInterval(idleCountdown);
  if (state.view === "home") return;
  idleTimer = window.setTimeout(beginIdleCountdown, 165000);
}

function beginIdleCountdown() {
  let remaining = 15;
  idleCount.textContent = remaining;
  idleOverlay.hidden = false;
  idleCountdown = window.setInterval(() => {
    remaining -= 1;
    idleCount.textContent = remaining;
    if (remaining <= 0) {
      window.clearInterval(idleCountdown);
      restart();
    }
  }, 1000);
}

function keepSession() {
  idleOverlay.hidden = true;
  resetIdleTimer();
}

async function hydrateFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const sessionId = params.get("session");
  if (!sessionId) return;
  app.innerHTML = `<section class="screen loading-screen"><span class="eyebrow">Loading your journey</span><h1>Bringing back your exact answers…</h1></section>`;
  try {
    const response = await fetch(`${basePath}/api/session?id=${encodeURIComponent(sessionId)}`);
    if (!response.ok) throw new Error("not found");
    const { session } = await response.json();
    if (!paths[session.path] || !Array.isArray(session.answers) || session.answers.length !== 3) throw new Error("invalid");
    Object.assign(state, {
      sessionId,
      path: session.path,
      answers: session.answers,
      view: "summary",
      step: 2,
      slide: Number.isInteger(session.slide) ? session.slide : 2,
      viewedSlides: Array.isArray(session.viewedSlides) ? session.viewedSlides : [],
      shared: true,
      saveStatus: "saved"
    });
    sessionStorage.setItem("advancioBoothSession", sessionId);
  } catch {
    showToast("That saved journey is not available. Start a new one below.");
  }
}

document.addEventListener("click", event => {
  const pathButton = event.target.closest("[data-path]");
  const answerButton = event.target.closest("[data-answer]");
  const slideButton = event.target.closest("[data-slide]");
  const actionButton = event.target.closest("[data-action]");
  if (pathButton) choosePath(pathButton.dataset.path);
  if (answerButton) chooseAnswer(answerButton.dataset.answer);
  if (slideButton) { state.slide = Number(slideButton.dataset.slide); render(); saveSession("story"); }
  if (!actionButton) return;
  const action = actionButton.dataset.action;
  if (action === "home" || action === "restart") restart();
  if (action === "back") goBack();
  if (action === "choose-other") chooseOther();
  if (action === "continue-answer") continueAnswer();
  if (action === "speak") startVoiceInput();
  if (action === "reveal") { state.view = "solution"; render(); saveSession("future"); }
  if (action === "next-slide") {
    const last = paths[state.path].slides.length - 1;
    if (state.slide < last) { state.slide += 1; render(); saveSession("story"); }
    else { state.view = "summary"; render(); }
  }
  if (action === "summary") { state.view = "summary"; render(); }
  if (action === "booth-demo") showBoothTicket();
  if (action === "close-ticket") actionButton.closest(".booth-ticket")?.remove();
  if (action === "share") shareJourney();
  if (action === "copy") copyLink();
  if (action === "stay") keepSession();
});

document.addEventListener("input", event => {
  if (event.target.id === "otherAnswer" && state.draftAnswer) {
    state.draftAnswer.answer = event.target.value;
    if (state.draftAnswer.inputMethod !== "voice transcript") state.draftAnswer.inputMethod = "typed";
  }
});

["pointerdown", "keydown", "touchstart"].forEach(type => document.addEventListener(type, () => {
  if (!idleOverlay.hidden) return;
  resetIdleTimer();
}, { passive: true }));

hydrateFromUrl().finally(render);
