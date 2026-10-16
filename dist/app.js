const STORAGE_KEY = "ielts-elite-state-v1";
const SERVER_STATE_ENDPOINT = "/api/state";

const skillMeta = {
  listening: { label: "Listening", icon: "◖", color: "lime" },
  reading: { label: "Reading", icon: "▤", color: "teal" },
  writing: { label: "Writing", icon: "✎", color: "coral" },
  speaking: { label: "Speaking", icon: "◌", color: "amber" },
};

const navItems = [
  ["overview", "⌂", "Overview"],
  ["today", "◷", "Today’s plan"],
  ["diagnostic", "◎", "Diagnostic"],
  ["listening", "◖", "Listening studio"],
  ["reading", "▤", "Reading practice"],
  ["writing", "✎", "Writing lab"],
  ["speaking", "◌", "Speaking studio"],
  ["language", "Aa", "Language lab"],
  ["mock", "▣", "Mock exam"],
  ["errors", "↗", "Error notebook"],
  ["revision", "↻", "Revision queue"],
  ["analytics", "▥", "Progress analytics"],
  ["tutor", "✦", "Tutor & explanations"],
  ["settings", "⚙", "Settings"],
];

const diagnosticQuestions = {
  listening: [
    {
      id: "l1", type: "Form completion", difficulty: "Foundational",
      prompt: "What time does the evening photography class begin?",
      support: "Text fallback (audio unavailable): “The Tuesday class is full, but the evening session starts at 6:45 pm.”",
      options: ["6:15 pm", "6:45 pm", "7:15 pm", "7:45 pm"], correct: "6:45 pm",
      explanation: "The exact time is stated as 6:45 pm. In a real listening exam, this would be an audio item; this text fallback is not equivalent to a full Listening test.",
    },
    {
      id: "l2", type: "Multiple choice", difficulty: "Foundational",
      prompt: "Why was the community event moved indoors?",
      support: "Text fallback: “The forecast showed heavy rain from midday, so the organisers moved the event to the library hall.”",
      options: ["The library was available", "The organisers changed the theme", "Heavy rain was forecast", "The outdoor space was too small"], correct: "Heavy rain was forecast",
      explanation: "The reason is the forecast of heavy rain. Watch for a reason that is explicitly supported rather than a detail that is merely mentioned.",
    },
    {
      id: "l3", type: "Note completion", difficulty: "Intermediate",
      prompt: "The speaker recommends bringing a reusable ______ to the workshop.",
      support: "Text fallback: “Please bring a reusable water bottle; the venue has refill stations on both floors.”",
      options: ["water bottle", "notebook", "umbrella", "name badge"], correct: "water bottle",
      explanation: "The missing noun phrase appears directly after the recommendation to bring something reusable.",
    },
    {
      id: "l4", type: "Distractor recognition", difficulty: "Intermediate",
      prompt: "Which facility is closed for maintenance this week?",
      support: "Text fallback: “The gym remains open, although the pool is closed for maintenance until Friday.”",
      options: ["The gym", "The pool", "The café", "The changing rooms"], correct: "The pool",
      explanation: "The contrast marker ‘although’ introduces the distractor before the supported answer: the pool is closed.",
    },
    {
      id: "l5", type: "Spelling and plural", difficulty: "Intermediate",
      prompt: "The programme offers free ______ for new volunteers.",
      support: "Text fallback: “New volunteers receive free training sessions before their first shift.”",
      options: ["trainings", "training sessions", "training session", "trainning sessions"], correct: "training sessions",
      explanation: "The source uses the plural countable phrase ‘training sessions’. Spelling and number matter in completion tasks.",
    },
  ],
  reading: [
    {
      id: "r1", type: "True / False / Not Given", difficulty: "Foundational",
      prompt: "The first urban gardens were created by local governments.",
      support: "Passage excerpt: “Early community gardens were often organised by neighbourhood groups on unused plots. Municipal support became more common later.”",
      options: ["True", "False", "Not Given"], correct: "False",
      explanation: "The excerpt attributes early gardens to neighbourhood groups, not local governments. The statement contradicts the text.",
    },
    {
      id: "r2", type: "Matching information", difficulty: "Foundational",
      prompt: "Which paragraph explains how rooftop gardens reduce indoor heat?",
      support: "Paragraph B: “A layer of plants and soil absorbs sunlight and can lower the temperature of the roof surface.”",
      options: ["Paragraph A", "Paragraph B", "Paragraph C", "Paragraph D"], correct: "Paragraph B",
      explanation: "Paragraph B directly explains the heat-reduction mechanism. Locate evidence before matching by topic similarity.",
    },
    {
      id: "r3", type: "Multiple choice", difficulty: "Intermediate",
      prompt: "What is the author’s main concern about rapid expansion?",
      support: "Passage excerpt: “Expansion can be positive, but without long-term maintenance plans, new gardens may decline once initial funding ends.”",
      options: ["Lack of public interest", "High water consumption", "Short-term funding without maintenance", "Limited roof space"], correct: "Short-term funding without maintenance",
      explanation: "The concern is not expansion itself; it is the absence of a maintenance plan after initial funding.",
    },
    {
      id: "r4", type: "Sentence completion", difficulty: "Intermediate",
      prompt: "Researchers say that reliable harvests depend on regular ______.",
      support: "Passage excerpt: “Reliable yields require regular monitoring of soil moisture, pests, and nutrient levels.”",
      options: ["monitoring", "harvesting", "construction", "transport"], correct: "monitoring",
      explanation: "The verb-noun combination in the passage is ‘require regular monitoring’. Notice how the sentence frame narrows the answer.",
    },
    {
      id: "r5", type: "Yes / No / Not Given", difficulty: "Advanced",
      prompt: "The author believes technology will eliminate the need for human gardeners.",
      support: "Passage excerpt: “Sensors can assist decisions, but practical knowledge and human care remain central to successful gardens.”",
      options: ["Yes", "No", "Not Given"], correct: "No",
      explanation: "The author explicitly says human care remains central, so the statement is contradicted.",
    },
  ],
};

const readingPractice = [
  ...diagnosticQuestions.reading,
  {
    id: "rp1", type: "Matching headings", difficulty: "Advanced",
    prompt: "Which heading best matches the paragraph? “Rather than replacing teachers, adaptive systems can reveal which learners need a different explanation or a slower sequence.”",
    support: "Academic passage excerpt: the paragraph contrasts automation with responsive teaching and describes how data can guide human support.",
    options: ["The cost of digital tools", "Technology as a teacher substitute", "Data supporting responsive teaching", "Why learners dislike feedback"], correct: "Data supporting responsive teaching",
    explanation: "The paragraph’s main idea is the way data helps teachers respond. A heading should capture the whole paragraph, not one word.",
  },
  {
    id: "rp2", type: "Inference", difficulty: "Advanced",
    prompt: "What can be inferred about a learner who repeats a mistake after reading its explanation?",
    support: "Study note: repeated mistakes are stronger evidence of a learning priority than one isolated incorrect answer, especially when the learner is confident.",
    options: ["The explanation was certainly wrong", "The skill may need a different practice route", "The learner should stop studying the skill", "The learner has already mastered it"], correct: "The skill may need a different practice route",
    explanation: "Repeated evidence suggests the next intervention should change: use a focused drill, another explanation, or guided practice.",
  },
];

const languageItems = [
  { id: "v1", word: "substantial", definition: "large in size, value, or importance", example: "The city made a substantial investment in public transport.", options: ["temporary", "large or important", "uncertain", "unusual"], correct: "large or important", topic: "Academic" },
  { id: "v2", word: "mitigate", definition: "to make something less harmful or severe", example: "Tree cover can mitigate the effects of extreme heat.", options: ["measure precisely", "make less severe", "replace completely", "predict accurately"], correct: "make less severe", topic: "Environment" },
  { id: "v3", word: "whereas", definition: "used to compare or contrast two facts", example: "Online courses are flexible, whereas seminars offer live discussion.", options: ["because", "although", "in contrast", "therefore"], correct: "in contrast", topic: "Cohesion" },
];

const grammarItems = [
  { id: "g1", skill: "Subject–verb agreement", prompt: "Choose the accurate sentence.", options: ["The number of applicants are increasing.", "The number of applicants is increasing.", "The numbers of applicant is increasing."], correct: "The number of applicants is increasing.", explanation: "‘The number’ is singular, so it takes ‘is’. The plural noun ‘applicants’ does not control the verb.", category: "Grammar" },
  { id: "g2", skill: "Complex sentences", prompt: "Choose the best connector: “Public transport is affordable, ______ many commuters still prefer cars.”", options: ["because", "although", "so that"], correct: "although", explanation: "‘Although’ introduces a contrast between affordability and preference for cars.", category: "Cohesion" },
];

const extraMockQuestions = [
  { id: "l6", skill: "listening", type: "Multiple choice", difficulty: "Intermediate", prompt: "Which document must visitors show at reception?", support: "Text fallback: “Please bring your booking confirmation; staff will check it against the visitor list.”", options: ["A passport", "A booking confirmation", "A student card", "A map"], correct: "A booking confirmation", explanation: "The booking confirmation is the document explicitly requested." },
  { id: "l7", skill: "listening", type: "Map labelling", difficulty: "Intermediate", prompt: "The new study area is located beside which room?", support: "Text fallback: “The quiet study area is beside the main library, opposite the café.”", options: ["The gym", "The main library", "The café", "The reception desk"], correct: "The main library", explanation: "The café is a nearby distractor; the area is beside the main library." },
  { id: "l8", skill: "listening", type: "Note completion", difficulty: "Advanced", prompt: "The research team will meet on ______ afternoon.", support: "Text fallback: “Wednesday morning is unavailable, so the team will meet on Thursday afternoon.”", options: ["Tuesday", "Wednesday", "Thursday", "Friday"], correct: "Thursday", explanation: "The correction from Wednesday morning to Thursday afternoon is the key change." },
  { id: "l9", skill: "listening", type: "Number completion", difficulty: "Advanced", prompt: "The membership fee is ______ dollars per year.", support: "Text fallback: “The fee was reduced from 80 dollars to 65 dollars for new members.”", options: ["55", "60", "65", "80"], correct: "65", explanation: "80 is the old fee; the current fee is 65 dollars." },
  { id: "l10", skill: "listening", type: "Multiple choice", difficulty: "Advanced", prompt: "What will the organisers send after registration?", support: "Text fallback: “A confirmation email will arrive within two working days; the printed guide is available later.”", options: ["A confirmation email", "A printed guide", "A refund", "A timetable poster"], correct: "A confirmation email", explanation: "The email is sent within two working days; the printed guide is only available later." },
  { id: "l11", skill: "listening", type: "Form completion", difficulty: "Foundational", prompt: "The visitor centre closes at ______.", support: "Text fallback: “The centre opens at nine and closes at five thirty on weekdays.”", options: ["4:30", "5:00", "5:30", "6:30"], correct: "5:30", explanation: "The closing time is five thirty." },
  { id: "l12", skill: "listening", type: "Multiple choice", difficulty: "Foundational", prompt: "What is included in the course fee?", support: "Text fallback: “The fee includes the workbook, although equipment hire is charged separately.”", options: ["Equipment hire", "The workbook", "Transport", "Lunch"], correct: "The workbook", explanation: "The workbook is included; equipment hire is a separate charge." },
  { id: "l13", skill: "listening", type: "Note completion", difficulty: "Intermediate", prompt: "Participants should email their ______ before Friday.", support: "Text fallback: “Please email your draft outline before Friday so the tutor can prepare comments.”", options: ["draft outline", "final grade", "passport", "reading list"], correct: "draft outline", explanation: "The requested item is the draft outline." },
  { id: "l14", skill: "listening", type: "Distractor recognition", difficulty: "Intermediate", prompt: "Which bus reaches the museum directly?", support: "Text fallback: “The number 12 stops nearby, but the number 18 goes directly to the museum entrance.”", options: ["Number 8", "Number 12", "Number 18", "Number 80"], correct: "Number 18", explanation: "Number 12 is the nearby distractor; number 18 goes directly to the entrance." },
  { id: "l15", skill: "listening", type: "Spelling and plural", difficulty: "Intermediate", prompt: "The project needs two research ______.", support: "Text fallback: “The team needs two research assistants for the summer period.”", options: ["assistant", "assistants", "assistent", "assistance"], correct: "assistants", explanation: "The number two requires the plural noun assistants." },
  { id: "l16", skill: "listening", type: "Map labelling", difficulty: "Advanced", prompt: "The first-aid room is opposite the ______.", support: "Text fallback: “The first-aid room is opposite the reception desk, next to the main stairs.”", options: ["main stairs", "reception desk", "cafeteria", "car park"], correct: "reception desk", explanation: "The main stairs are next to the room; the reception desk is opposite it." },
  { id: "l17", skill: "listening", type: "Multiple choice", difficulty: "Advanced", prompt: "Why did the speaker choose the smaller venue?", support: "Text fallback: “The larger hall was attractive, but the smaller venue had better public transport connections.”", options: ["It was cheaper", "It had better transport", "It had more seats", "It had newer equipment"], correct: "It had better transport", explanation: "The explicit reason is transport access, not size or cost." },
  { id: "l18", skill: "listening", type: "Number completion", difficulty: "Advanced", prompt: "The total journey takes approximately ______ minutes.", support: "Text fallback: “The train takes 35 minutes, followed by a ten-minute walk, so the total is about 45 minutes.”", options: ["35", "40", "45", "55"], correct: "45", explanation: "Combine the train journey and walk: 35 plus 10 equals 45 minutes." },
  { id: "l19", skill: "listening", type: "Note completion", difficulty: "Advanced", prompt: "The survey focuses on public ______.", support: "Text fallback: “This year’s survey focuses on public transport and how residents use it.”", options: ["housing", "transport", "health", "education"], correct: "transport", explanation: "The topic is public transport." },
  { id: "l20", skill: "listening", type: "Multiple choice", difficulty: "Advanced", prompt: "What will happen next month?", support: "Text fallback: “The exhibition is currently online, but a physical display will open next month.”", options: ["The online page will close", "A physical display will open", "The collection will be sold", "The venue will move"], correct: "A physical display will open", explanation: "The future change is the opening of a physical display." },
  { id: "r6", skill: "reading", type: "Multiple choice", difficulty: "Intermediate", prompt: "What is the main benefit of a short feedback cycle?", support: "Passage excerpt: “When feedback arrives soon after an attempt, learners can connect the explanation to the decision they made.”", options: ["It removes the need for practice", "It links evidence to the learner’s decision", "It guarantees a higher band", "It makes every task easier"], correct: "It links evidence to the learner’s decision", explanation: "The passage links timely feedback with understanding the decision that produced the answer." },
  { id: "r7", skill: "reading", type: "Matching headings", difficulty: "Advanced", prompt: "Which heading best matches the paragraph about maintaining stronger skills?", support: "Paragraph C: “A learner should continue occasional practice in strong areas so that gains are retained while weaker areas receive more time.”", options: ["Maintenance prevents backsliding", "The fastest route to a perfect score", "Why weak areas should be ignored", "The cost of revision"], correct: "Maintenance prevents backsliding", explanation: "The paragraph is about retention of stronger skills, not about chasing a perfect score." },
  { id: "r8", skill: "reading", type: "Sentence completion", difficulty: "Intermediate", prompt: "The planner should protect adequate ______ and breaks.", support: "Planning note: “Sustainable preparation protects adequate sleep and scheduled breaks rather than extending study hours indefinitely.”", options: ["sleep", "restless activity", "revision", "feedback"], correct: "sleep", explanation: "Sleep is the only option supported by the planning note." },
  { id: "r9", skill: "reading", type: "Yes / No / Not Given", difficulty: "Advanced", prompt: "The author considers every missed day evidence of poor motivation.", support: "Planning note: “Missed sessions should trigger a recalculation of the plan, not punishment or an assumption about motivation.”", options: ["Yes", "No", "Not Given"], correct: "No", explanation: "The note explicitly rejects treating a missed session as proof of poor motivation." },
  { id: "r10", skill: "reading", type: "Multiple choice", difficulty: "Advanced", prompt: "Which principle does the planning note prioritise?", support: "Planning note: “A strong plan balances weak-area correction, exam-format familiarity, and maintenance of stronger skills.”", options: ["Only weak-area correction", "A balance of three learning needs", "Daily full mock exams", "Memorising templates"], correct: "A balance of three learning needs", explanation: "The note names three needs that must be balanced rather than selecting only one." },
  { id: "r11", skill: "reading", type: "True / False / Not Given", difficulty: "Foundational", prompt: "The first version of the scheme was funded by a national government.", support: "Passage excerpt: “The pilot was supported by a small local grant and volunteer labour.”", options: ["True", "False", "Not Given"], correct: "False", explanation: "The excerpt identifies a local grant, contradicting national government funding." },
  { id: "r12", skill: "reading", type: "Matching information", difficulty: "Foundational", prompt: "Which paragraph gives a reason for collecting baseline data?", support: "Paragraph A: “Without a baseline, later changes cannot be interpreted clearly.”", options: ["Paragraph A", "Paragraph B", "Paragraph C", "Paragraph D"], correct: "Paragraph A", explanation: "Paragraph A directly explains why baseline data is needed." },
  { id: "r13", skill: "reading", type: "Multiple choice", difficulty: "Intermediate", prompt: "What problem can a decorative dashboard create?", support: "Passage excerpt: “A polished chart can distract from the absence of completed tasks or reliable records.”", options: ["It makes text more readable", "It can hide weak evidence", "It always slows the learner", "It improves scoring accuracy"], correct: "It can hide weak evidence", explanation: "The risk is that visual polish masks a lack of reliable data." },
  { id: "r14", skill: "reading", type: "Sentence completion", difficulty: "Intermediate", prompt: "A useful recommendation should explain why a weakness ______.", support: "Study note: “A recommendation is stronger when it explains why the weakness matters and how improvement will be measured.”", options: ["matters", "disappears", "is expensive", "is official"], correct: "matters", explanation: "The sentence states that a recommendation should explain why the weakness matters." },
  { id: "r15", skill: "reading", type: "Yes / No / Not Given", difficulty: "Intermediate", prompt: "The passage says one wrong answer proves a persistent weakness.", support: "Study note: “One incorrect answer is not conclusive; repeated suitable evidence should guide priorities.”", options: ["Yes", "No", "Not Given"], correct: "No", explanation: "The passage explicitly says one error is not conclusive." },
  { id: "r16", skill: "reading", type: "Matching headings", difficulty: "Advanced", prompt: "Which heading best matches the paragraph about changing difficulty?", support: "Paragraph D: “When accuracy improves across repeated attempts, challenge should rise; when it falls, prerequisites should be revisited.”", options: ["Difficulty should never change", "Challenge should respond to performance", "The value of rare vocabulary", "Why practice must be silent"], correct: "Challenge should respond to performance", explanation: "The paragraph describes adaptive difficulty in both directions." },
  { id: "r17", skill: "reading", type: "Multiple choice", difficulty: "Advanced", prompt: "What should happen after an AI provider fails?", support: "Architecture note: “Timers, objective scoring, revision schedules, and basic analytics should remain operational when an AI provider is unavailable.”", options: ["All learner work should be deleted", "Deterministic features should continue", "The learner should receive a fabricated score", "The app should stop loading"], correct: "Deterministic features should continue", explanation: "The fallback requirement is continuity of deterministic features." },
  { id: "r18", skill: "reading", type: "Sentence completion", difficulty: "Advanced", prompt: "A practice score must remain separate from an official ______.", support: "Assessment note: “Practice estimates and AI-generated feedback must never be presented as an official IELTS score or certificate.”", options: ["question", "certificate", "paragraph", "calendar"], correct: "certificate", explanation: "The note distinguishes practice evidence from an official certificate." },
  { id: "r19", skill: "reading", type: "Yes / No / Not Given", difficulty: "Advanced", prompt: "The author recommends studying without breaks to recover missed time.", support: "Planning note: “Do not extend study hours indefinitely to compensate for missed days; protect sleep and breaks.”", options: ["Yes", "No", "Not Given"], correct: "No", explanation: "The planning note directly rejects removing breaks or extending study indefinitely." },
  { id: "r20", skill: "reading", type: "Matching information", difficulty: "Advanced", prompt: "Which paragraph mentions comparing only suitable historical tests?", support: "Paragraph B: “Comparisons are meaningful only when task format and difficulty are sufficiently comparable.”", options: ["Paragraph A", "Paragraph B", "Paragraph C", "Paragraph D"], correct: "Paragraph B", explanation: "Paragraph B contains the rule about comparable historical tests." },
];

function getMockQuestions() {
  return [...diagnosticQuestions.listening.map((question) => ({ ...question, skill: "listening" })), ...diagnosticQuestions.reading.map((question) => ({ ...question, skill: "reading" })), ...extraMockQuestions];
}

function mockSkillOf(question) {
  return question.skill === "listening" || question.skill === "reading" ? question.skill : (String(question.id).startsWith("l") ? "listening" : "reading");
}

const writingTasks = {
  task1: {
    label: "Task 1 · data report",
    title: "The chart shows the proportion of household spending on five categories in three countries in 2025.",
    visual: ["Housing  ·  Country A 38% · Country B 31% · Country C 42%", "Food     ·  Country A 24% · Country B 28% · Country C 21%", "Transport·  Country A 16% · Country B 19% · Country C 14%", "Other    ·  Country A 22% · Country B 22% · Country C 23%"],
    prompt: "Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
  },
  task2: {
    label: "Task 2 · opinion essay",
    title: "Some people believe that schools should teach practical skills such as managing money and cooking, rather than traditional academic subjects.",
    visual: [],
    prompt: "To what extent do you agree or disagree?",
  },
};

const speakingPrompts = {
  part1: { label: "Part 1 · familiar topics", title: "Daily routines", prompt: "What part of your daily routine do you enjoy most? Why? What would you like to change about it?", target: "Short, natural answers with one reason or example." },
  part2: { label: "Part 2 · cue card", title: "A useful skill", prompt: "Describe a useful skill you learned outside school. You should say what the skill is, how you learned it, and explain why it is useful to you now.", target: "Prepare for 1 minute, then develop a 1–2 minute response." },
  part3: { label: "Part 3 · abstract discussion", title: "Skills and education", prompt: "Should schools prioritise practical skills over academic knowledge? Why? What skills will become more important in the future?", target: "Develop an opinion, compare ideas, and answer follow-up questions." },
};

function blankState() {
  return {
    route: "overview",
    profile: null,
    diagnostic: { status: "not-started", activeSkill: "listening", answers: {}, text: { writing: "", speaking: "" }, results: null, startedAt: null, completedAt: null },
    plan: null,
    tasks: {},
    practice: { readingAnswers: {}, readingSubmitted: false, listeningAnswers: {}, listeningSubmitted: false },
    writingSubmissions: [],
    writingMode: "task2",
    writingDrafts: { task1: "", task2: "" },
    speakingSubmissions: [],
    speakingPart: "part2",
    speakingDrafts: { part1: "", part2: "", part3: "" },
    speakingRecording: null,
    errors: [],
    revisions: [],
    language: { vocabMastered: [], grammarMastered: [], answers: {} },
    mock: { status: "not-started", answers: {}, text: { writing: "", speaking: "" }, startedAt: null, result: null },
    mockHistory: [],
    tutor: { messages: [] },
    sessions: [],
    settings: { reminders: true, reduceMotion: false, language: "English" },
  };
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return saved ? mergeState(blankState(), saved) : blankState();
  } catch (error) {
    console.warn("Unable to load saved learner state", error);
    return blankState();
  }
}

function mergeState(base, source) {
  Object.entries(source || {}).forEach(([key, value]) => {
    if (value && typeof value === "object" && !Array.isArray(value) && base[key] && typeof base[key] === "object") base[key] = mergeState(base[key], value);
    else if (value !== undefined) base[key] = value;
  });
  return base;
}

let state = loadState();
const app = document.querySelector("#app");
const toastRegion = document.querySelector("#toast-region");
let activeRecorder = null;
let activeRecordingChunks = [];
let activeRecordingUrl = null;
let activeRecordingStartedAt = null;
let mockClockTimer = null;
let serverSyncReady = false;
let serverSaveTimer = null;
let serverUpdatedAt = null;

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  if (!serverSyncReady) return;
  clearTimeout(serverSaveTimer);
  serverSaveTimer = setTimeout(async () => {
    try {
      const response = await fetch(SERVER_STATE_ENDPOINT, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(state) });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const payload = await response.json();
      serverUpdatedAt = payload.updatedAt || serverUpdatedAt;
    } catch (error) {
      serverSyncReady = false;
      console.warn("Server sync paused; local persistence remains active.", error);
      render();
    }
  }, 180);
}

function syncStatus() {
  return serverSyncReady ? `SQLite synced${serverUpdatedAt ? ` · ${formatDate(serverUpdatedAt)}` : ""}` : "Browser recovery mode";
}

function esc(value = "") {
  return String(value).replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[char]));
}

function showToast(message) {
  const node = document.createElement("div");
  node.className = "toast";
  node.textContent = message;
  toastRegion.appendChild(node);
  setTimeout(() => node.remove(), 3600);
}

function formatDate(value = new Date()) {
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" }).format(new Date(value));
}

function formatElapsed(startedAt) {
  if (!startedAt) return "00:00:00";
  const seconds = Math.max(0, Math.floor((Date.now() - new Date(startedAt).getTime()) / 1000));
  const hh = String(Math.floor(seconds / 3600)).padStart(2, "0");
  const mm = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");
  return `${hh}:${mm}:${ss}`;
}

function initials(name = "Learner") {
  return name.split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase() || "L";
}

function wordCount(text = "") {
  return text.trim() ? text.trim().split(/\s+/).length : 0;
}

function scoreBand(correct, total) {
  if (!total) return null;
  const ratio = correct / total;
  if (ratio >= .9) return 7.5;
  if (ratio >= .8) return 7.0;
  if (ratio >= .7) return 6.5;
  if (ratio >= .6) return 6.0;
  if (ratio >= .5) return 5.5;
  if (ratio >= .4) return 5.0;
  if (ratio >= .3) return 4.5;
  return 4.0;
}

function estimateWriting(text) {
  const words = wordCount(text);
  const paragraphs = text.split(/\n+/).filter(Boolean).length;
  const hasPosition = /\b(agree|disagree|believe|argue|opinion|should|because)\b/i.test(text);
  const hasExamples = /\b(for example|for instance|such as|e\.g\.)\b/i.test(text);
  const sentenceCount = (text.match(/[.!?]+/g) || []).length;
  const base = words < 80 ? 4.5 : words < 160 ? 5.5 : words < 240 ? 6.0 : 6.5;
  const coherence = Math.min(7.5, base + (paragraphs >= 3 ? .5 : 0) + (hasPosition ? .25 : 0));
  const lexical = Math.min(7.5, base + (words > 170 ? .5 : 0) + (hasExamples ? .25 : 0));
  const grammar = Math.min(7.5, base + (sentenceCount >= 6 ? .25 : 0));
  const task = Math.min(7.5, base + (hasPosition ? .5 : 0) + (words >= 250 ? .25 : 0));
  return { band: Number(((task + coherence + lexical + grammar) / 4).toFixed(1)), task, coherence, lexical, grammar, words, paragraphs, heuristic: true };
}

function estimateSpeaking(text) {
  const words = wordCount(text);
  const hasExample = /\b(for example|for instance|such as|because|however)\b/i.test(text);
  const sentences = (text.match(/[.!?]+/g) || []).length;
  const base = words < 35 ? 4.5 : words < 75 ? 5.5 : words < 130 ? 6.0 : 6.5;
  const fluency = Math.min(7.5, base + (sentences >= 4 ? .25 : 0));
  const vocab = Math.min(7.5, base + (hasExample ? .35 : 0));
  const grammar = Math.min(7.5, base + (sentences >= 5 ? .25 : 0));
  return { band: Number(((fluency + vocab + grammar) / 3).toFixed(1)), fluency, vocab, grammar, pronunciation: null, words, heuristic: true };
}

function getScores() {
  return state.diagnostic.results?.scores || {};
}

function scoreLabel(skill) {
  const score = getScores()[skill];
  if (!score || score.band === null || score.band === undefined) return "Not assessed";
  return `${score.band.toFixed(1)} band`;
}

function overallBand() {
  const scores = getScores();
  const bands = ["listening", "reading", "writing", "speaking"].map((key) => scores[key]?.band).filter((value) => typeof value === "number");
  if (bands.length < 4) return null;
  const raw = bands.reduce((sum, value) => sum + value, 0) / 4;
  return roundOfficialOverallBand(raw);
}

// Official IELTS overall-band rounding is applied only to the app's provisional
// component estimates. It does not turn local practice evidence into an official score.
function roundOfficialOverallBand(raw) {
  return Math.floor((raw * 2) + 0.5) / 2;
}

function priorityData() {
  const errors = state.errors || [];
  const grouped = {};
  errors.forEach((error) => {
    const key = `${error.skill}:${error.category}`;
    if (!grouped[key]) grouped[key] = { ...error, count: 0, latest: error.date };
    grouped[key].count += 1;
    grouped[key].latest = error.date;
  });
  return Object.values(grouped).map((item) => ({ ...item, priority: Math.round((item.count * 18 + (item.severity || 2) * 7 + (item.corrected ? -8 : 12)) * 10) / 10 })).sort((a, b) => b.priority - a.priority);
}

function dueRevisions() {
  const now = Date.now();
  return (state.revisions || []).filter((item) => !item.completed && new Date(item.dueAt).getTime() <= now).sort((a, b) => new Date(a.dueAt) - new Date(b.dueAt));
}

function planForToday() {
  if (!state.plan) return null;
  const day = Math.max(1, Math.min(30, state.plan.currentDay || 1));
  return state.plan.days[day - 1];
}

function createPlan() {
  const priorities = priorityData();
  const scores = getScores();
  const weakest = ["listening", "reading", "writing", "speaking"].sort((a, b) => (scores[a]?.band ?? 0) - (scores[b]?.band ?? 0))[0] || "reading";
  const focus = priorities[0]?.skill || weakest;
  const days = Array.from({ length: 30 }, (_, index) => {
    const day = index + 1;
    let phase = day <= 3 ? "Diagnose & orient" : day <= 10 ? "Targeted correction" : day <= 17 ? "Timed application" : day <= 24 ? "Advanced integration" : day <= 28 ? "Exam simulation" : "Final review";
    const prioritySkill = day % 4 === 0 ? "writing" : day % 5 === 0 ? "speaking" : focus;
    const skill = skillMeta[prioritySkill].label;
    const tasks = [
      { id: `d${day}-1`, title: `${skill} priority drill`, detail: priorities[0] ? `Use evidence from ${priorities[0].count} recorded ${priorities[0].category.toLowerCase()} error${priorities[0].count > 1 ? "s" : ""}.` : `Build accuracy with a ${prioritySkill} question-type set.`, minutes: 55 },
      { id: `d${day}-2`, title: "Error correction & review", detail: "Rework mistakes, explain the evidence, then log what changed.", minutes: 40 },
      { id: `d${day}-3`, title: "Language maintenance", detail: "Recall 8 academic words and complete a grammar mastery check.", minutes: 35 },
      { id: `d${day}-4`, title: day % 7 === 0 ? "Timed mixed section" : "Focused timed practice", detail: day % 7 === 0 ? "Combine two skills under realistic timing." : "Use a short timer and record time pressure separately.", minutes: 45 },
    ];
    return { day, phase, objective: day === 1 ? `Establish a measured baseline and set your ${skill.toLowerCase()} priority.` : `Raise control in ${skill.toLowerCase()} while preserving your stronger skills.`, skill: prioritySkill, tasks };
  });
  state.plan = { createdAt: new Date().toISOString(), currentDay: 1, source: "diagnostic + subsequent learner activity", days };
  saveState();
}

function recordError({ skill, category, questionId, question, answer, correct, explanation, difficulty = "Intermediate", severity = 2 }) {
  const error = { id: `${questionId}-${Date.now()}`, skill, category, questionId, question, answer, correct, explanation, difficulty, severity, date: new Date().toISOString(), corrected: false };
  state.errors.unshift(error);
  state.revisions.unshift({ id: `rev-${error.id}`, errorId: error.id, dueAt: new Date(Date.now() + 86400000).toISOString(), intervalDays: 1, attempts: 0, completed: false });
  if (state.errors.length > 80) state.errors = state.errors.slice(0, 80);
  if (state.revisions.length > 120) state.revisions = state.revisions.slice(0, 120);
}

function renderOnboarding() {
  app.innerHTML = `
    <main class="onboarding-shell">
      <section class="onboarding-visual">
        <div class="brand-lockup"><span class="brand-mark">E</span><span>IELTS Elite</span></div>
        <div class="onboarding-copy">
          <div class="eyebrow" style="color:var(--lime)">30-day academic preparation</div>
          <h1>Study from evidence, not guesswork.</h1>
          <p>A focused workspace that turns diagnostic results into a living plan, targeted practice, and an honest view of your progress.</p>
          <div class="signal-list">
            <div class="signal-item"><span class="signal-dot"></span>Measured before personalised</div>
            <div class="signal-item"><span class="signal-dot"></span>Repeated errors drive priorities</div>
            <div class="signal-item"><span class="signal-dot"></span>Every score shows its limits</div>
          </div>
        </div>
        <div class="mono" style="position:relative;z-index:1;color:#8ea39a;font-size:10px">LOCAL LEARNER SPACE · v0.1</div>
      </section>
      <section class="onboarding-form-wrap">
        <form class="onboarding-form" id="onboarding-form">
          <div class="form-head">
            <div class="eyebrow">Let’s set your baseline</div>
            <h2>Build your learner profile</h2>
            <p>Only the essentials. These are planning inputs, not measured skill scores. You can change them later.</p>
          </div>
          <div class="form-grid">
            <div class="field full"><label for="learner-name">Your name</label><input id="learner-name" name="name" required placeholder="e.g. Ayesha Rahman" /></div>
            <div class="field"><label for="exam-date">Target exam date</label><input id="exam-date" name="examDate" type="date" /></div>
            <div class="field"><label for="target-band">Target overall band</label><select id="target-band" name="targetBand"><option>7.0</option><option>7.5</option><option>8.0</option><option>8.5</option><option>9.0</option></select></div>
            <div class="field"><label for="hours">Focused study hours / day</label><select id="hours" name="hours"><option value="8">8 hours</option><option value="9" selected>9 hours</option><option value="10">10 hours</option></select></div>
            <div class="field"><label for="language">Explanation language</label><select id="language" name="language"><option>English</option><option>Bangla</option><option>English + Bangla</option></select></div>
            <div class="field full"><label for="strengths">What feels easiest and hardest right now?</label><textarea id="strengths" name="strengths" rows="3" placeholder="e.g. Reading is comfortable; Writing Task 2 development is difficult."></textarea><small>Self-reported only. We will test this in the diagnostic.</small></div>
          </div>
          <label class="checkbox-row"><input name="consent" type="checkbox" required /> <span>I understand that this local version stores my study data in this browser and that its estimates are not official IELTS scores.</span></label>
          <button class="button primary" type="submit" style="width:100%;margin-top:10px">Create learner space <span>→</span></button>
        </form>
      </section>
    </main>`;
}

function renderShell(content) {
  const profile = state.profile || { name: "Learner", targetBand: "7.0" };
  const routeTitle = navItems.find(([route]) => route === state.route)?.[2] || "Overview";
  app.innerHTML = `
    <div class="app-layout">
      <aside class="sidebar" id="sidebar">
        <div class="brand-lockup"><span class="brand-mark">E</span><span>IELTS Elite</span></div>
        <div class="side-label">Workspace</div>
        <nav class="nav-list" aria-label="Main navigation">
          ${navItems.map(([route, icon, label]) => `<button class="nav-button ${state.route === route ? "active" : ""}" data-action="nav" data-route="${route}"><span class="nav-icon">${icon}</span><span>${label}</span></button>`).join("")}
        </nav>
        <div class="sidebar-spacer"></div>
        <div class="sidebar-note"><strong>Evidence first.</strong><br />Scores stay “Not assessed” until there is enough learner activity to support them.</div>
        <div class="profile-chip"><span class="avatar">${esc(initials(profile.name))}</span><div><strong>${esc(profile.name)}</strong><span>Target band ${esc(profile.targetBand || "7.0")}</span></div></div>
      </aside>
      <div class="main-column">
        <header class="topbar"><div class="breadcrumb"><button class="icon-btn mobile-menu" data-action="toggle-sidebar" aria-label="Open menu">☰</button><span>IELTS Elite</span><span>/</span><strong>${esc(routeTitle)}</strong></div><div class="topbar-actions"><span class="pill lime profile-mini">Day ${state.plan?.currentDay || 0} / 30</span><span class="pill profile-mini">${esc(syncStatus())}</span><button class="icon-btn" data-action="nav" data-route="settings" aria-label="Open settings">⚙</button></div></header>
        <main class="content">${content}</main>
      </div>
    </div>`;
}

function render() {
  if (!state.profile) return renderOnboarding();
  if (mockClockTimer) {
    clearInterval(mockClockTimer);
    mockClockTimer = null;
  }
  const renderer = ({ overview: renderOverview, today: renderToday, diagnostic: renderDiagnostic, listening: renderListening, reading: renderReading, writing: renderWriting, speaking: renderSpeaking, language: renderLanguage, mock: renderMockEnhanced, errors: renderErrors, revision: renderRevision, analytics: renderAnalytics, tutor: renderTutor, settings: renderSettings }[state.route] || renderOverview);
  renderShell(renderer());
  if (state.route === "mock" && state.mock.status === "in-progress") {
    mockClockTimer = setInterval(() => {
      const node = document.querySelector("#mock-clock");
      if (node) node.textContent = formatElapsed(state.mock.startedAt);
    }, 1000);
  }
}

function renderOverview() {
  const scores = ["listening", "reading", "writing", "speaking"];
  const overall = overallBand();
  const today = planForToday();
  const completedToday = today ? today.tasks.filter((task) => state.tasks[task.id]).length : 0;
  const priorities = priorityData().slice(0, 3);
  return `
    <div class="hero"><div><div class="eyebrow">${formatDate()}</div><h1>Good morning, ${esc(state.profile.name.split(" ")[0])}.</h1><p class="section-subtitle">One measured step at a time. Your workspace updates when you do.</p></div><div class="hero-actions"><button class="button secondary" data-action="nav" data-route="diagnostic">${state.diagnostic.status === "complete" ? "Review diagnostic" : "Start diagnostic"} →</button><button class="button ghost" data-action="nav" data-route="today">Open today’s plan</button></div></div>
    <div class="card focus-card"><div class="eyebrow">Your next best action</div><h2>${state.diagnostic.status !== "complete" ? "Complete the four-skill diagnostic" : today ? esc(today.objective) : "Review your highest-priority errors"}</h2><p>${state.diagnostic.status !== "complete" ? "Personalised band estimates and your 30-day roadmap unlock only after enough evidence exists." : today ? `${skillMeta[today.skill].label} is today’s priority. ${completedToday}/${today.tasks.length} tasks complete.` : "Use the Error notebook to choose the next correction drill."}</p><button class="button" data-action="nav" data-route="${state.diagnostic.status !== "complete" ? "diagnostic" : "today"}">${state.diagnostic.status !== "complete" ? "Begin baseline" : "Continue today"} <span>↗</span></button></div>
    <div class="grid-4 stat-row">
      <div class="card metric"><div class="metric-label">Overall estimate</div><div class="metric-value">${overall ? overall.toFixed(1) : "—"}</div><div class="metric-sub">${overall ? "Provisional; official rounding rule" : "Complete all four skills"}</div></div>
      <div class="card metric"><div class="metric-label">Focused time</div><div class="metric-value">${Math.round((state.sessions || []).reduce((sum, s) => sum + (s.minutes || 0), 0) / 60 * 10) / 10}h</div><div class="metric-sub">Recorded in this browser</div></div>
      <div class="card metric"><div class="metric-label">Open priorities</div><div class="metric-value">${priorityData().filter((item) => !item.corrected).length}</div><div class="metric-sub">Repeated errors first</div></div>
      <div class="card metric"><div class="metric-label">Study streak</div><div class="metric-value">${state.sessions.length ? "1" : "0"}</div><div class="metric-sub">Consecutive recorded days</div></div>
    </div>
    <div class="grid-2" style="margin-top:18px">
      <section class="card card-pad"><div class="card-head"><div><h3 class="card-title">Skill evidence</h3><p class="card-description">Actual records only. No fabricated starting score.</p></div><span class="pill">${state.diagnostic.status === "complete" ? "Diagnostic complete" : "Baseline needed"}</span></div><div class="grid-2">${scores.map((skill) => `<div class="score-card"><div class="score-ring" style="--score:${getScores()[skill]?.band ? (getScores()[skill].band / 9) * 100 : 0}"><span>${getScores()[skill]?.band?.toFixed(1) || "—"}</span></div><div><div class="skill-name">${skillMeta[skill].label}</div><div class="skill-detail">${getScores()[skill]?.evidence || "Not assessed yet"}</div></div></div>`).join("")}</div></section>
      <section class="card card-pad"><div class="card-head"><div><h3 class="card-title">Today’s checklist</h3><p class="card-description">${today ? `${completedToday}/${today.tasks.length} complete · ${today.phase}` : "Your first plan appears after the diagnostic."}</p></div><button class="button small ghost" data-action="nav" data-route="today">View</button></div>${today ? `<div class="task-list">${today.tasks.slice(0, 4).map((task) => `<label class="task-item"><input class="task-check" type="checkbox" data-action="toggle-task" data-task-id="${task.id}" ${state.tasks[task.id] ? "checked" : ""} /><span class="task-copy"><strong>${esc(task.title)}</strong><span>${esc(task.detail)}</span></span><span class="task-time">${task.minutes}m</span></label>`).join("")}</div>` : `<div class="empty-state"><strong>No personalised tasks yet</strong><p>We need diagnostic evidence before this can be responsibly generated.</p><button class="button primary small" data-action="nav" data-route="diagnostic">Open diagnostic</button></div>`}</section>
    </div>
    <div class="grid-2" style="margin-top:18px">
      <section class="card card-pad"><div class="card-head"><div><h3 class="card-title">Highest-priority corrections</h3><p class="card-description">Priority is a transparent heuristic based on recurrence, severity, and correction status.</p></div><button class="button small ghost" data-action="nav" data-route="errors">All errors</button></div>${priorities.length ? priorities.map((item, index) => `<div class="priority-item"><span class="priority-number">0${index + 1}</span><div class="priority-copy"><strong>${skillMeta[item.skill]?.label || item.skill} · ${esc(item.category)}</strong><p>${item.count} recorded attempt${item.count === 1 ? "" : "s"}. ${item.explanation ? esc(item.explanation) : "Complete a corrective drill and reassess."}</p></div><span class="pill ${item.corrected ? "lime" : "coral"}">${item.corrected ? "Improving" : "Open"}</span></div>`).join("") : `<div class="empty-state"><strong>Your notebook is clear</strong><p>Practice answers and diagnostic mistakes will appear here with the evidence behind each priority.</p></div>`}</section>
      <section class="card card-pad"><div class="card-head"><div><h3 class="card-title">30-day roadmap</h3><p class="card-description">${state.plan ? "Generated from your diagnostic and updated as evidence changes." : "A roadmap is generated after the diagnostic."}</p></div><button class="button small ghost" data-action="nav" data-route="today">Roadmap</button></div>${state.plan ? state.plan.days.slice(Math.max(0, (state.plan.currentDay || 1) - 1), Math.min(4, state.plan.currentDay + 2)).map((day) => `<div class="roadmap"><div class="roadmap-day"><strong>${day.day}</strong><span>Day</span></div><div class="roadmap-content"><h4>${esc(day.objective)}</h4><p>${esc(day.phase)}</p><div class="roadmap-tags"><span class="pill">${skillMeta[day.skill].label}</span><span class="pill lime">4 study blocks</span></div></div></div>`).join("") : `<div class="empty-state"><strong>Personalisation unlocks here</strong><p>The plan will include objectives, durations, fallback tasks, and correction work.</p></div>`}</section>
    </div>`;
}

function renderToday() {
  const today = planForToday();
  if (!today) return `<div class="hero"><div><div class="eyebrow">Today’s plan</div><h1>Start with evidence.</h1><p class="section-subtitle">Your daily schedule is intentionally empty until the diagnostic tells us what deserves your time.</p></div></div><div class="card card-pad empty-state"><strong>Diagnostic required before planning</strong><p>The planner uses your target, available study hours, objective results, and recorded mistakes. It will not pretend a fixed timetable is personalised.</p><button class="button primary" data-action="nav" data-route="diagnostic">Open four-skill diagnostic →</button></div>`;
  const completed = today.tasks.filter((task) => state.tasks[task.id]).length;
  return `<div class="hero"><div><div class="eyebrow">Day ${today.day} / 30 · ${esc(today.phase)}</div><h1>Today’s plan</h1><p class="section-subtitle">${esc(today.objective)} This schedule protects breaks and uses ${state.profile.hours || 9} focused hours as a ceiling, not a punishment.</p></div><div class="hero-actions"><button class="button primary" data-action="start-session">Start 25-minute focus session</button><button class="button ghost" data-action="end-study-day">Close day & regenerate</button><button class="button ghost" data-action="nav" data-route="analytics">View analytics</button></div></div>
    <div class="grid-4"><div class="card metric"><div class="metric-label">Completion</div><div class="metric-value">${completed}/${today.tasks.length}</div><div class="metric-sub">Tasks checked off</div></div><div class="card metric"><div class="metric-label">Priority</div><div class="metric-value">${skillMeta[today.skill].icon}</div><div class="metric-sub">${skillMeta[today.skill].label}</div></div><div class="card metric"><div class="metric-label">Focused target</div><div class="metric-value">${state.profile.hours || 9}h</div><div class="metric-sub">Breaks excluded</div></div><div class="card metric"><div class="metric-label">Open errors</div><div class="metric-value">${priorityData().filter((item) => !item.corrected).length}</div><div class="metric-sub">Correction queue</div></div></div>
    <div class="grid-2" style="margin-top:18px"><section class="card card-pad"><div class="card-head"><div><h3 class="card-title">Study blocks</h3><p class="card-description">Mark a task only after you have actually completed it.</p></div><span class="pill lime">${completed === today.tasks.length ? "Complete" : "In progress"}</span></div><div class="task-list">${today.tasks.map((task) => `<label class="task-item"><input class="task-check" type="checkbox" data-action="toggle-task" data-task-id="${task.id}" ${state.tasks[task.id] ? "checked" : ""} /><span class="task-copy"><strong>${esc(task.title)}</strong><span>${esc(task.detail)}</span></span><span class="task-time">${task.minutes}m</span></label>`).join("")}</div><div class="notice" style="margin-top:18px"><span>↗</span><div><strong>Fallback task:</strong> if audio, recording, or AI services are unavailable, use a text-based evidence review and keep the limitation visible in your notes.</div></div></section><section class="card card-pad"><div class="card-head"><div><h3 class="card-title">Next-day handoff</h3><p class="card-description">At the end of the day, the plan should change only when your evidence changes.</p></div></div>${priorityData().length ? `<div class="stack">${priorityData().slice(0, 3).map((item) => `<div class="notice ${item.corrected ? "" : "warn"}"><span>${item.corrected ? "✓" : "!"}</span><div><strong>${skillMeta[item.skill]?.label || item.skill} · ${esc(item.category)}</strong><br />${item.count} attempt${item.count === 1 ? "" : "s"} recorded. ${item.corrected ? "Keep this in maintenance." : "It will receive correction time tomorrow if it remains unresolved."}</div></div>`).join("")}</div>` : `<div class="empty-state"><strong>No errors recorded yet</strong><p>Submit practice answers to let the next-day handoff become evidence-driven.</p></div>`}</section></div>`;
}

function renderListening() {
  const questions = diagnosticQuestions.listening;
  const answered = questions.filter((q) => state.practice.listeningAnswers[q.id]).length;
  const submitted = state.practice.listeningSubmitted;
  return `<div class="hero"><div><div class="eyebrow">Academic Listening studio</div><h1>Listen for the turn.</h1><p class="section-subtitle">Use the browser’s local text-to-speech fallback when available, answer the original question set, then review distractors, spelling, and evidence.</p></div><div class="hero-actions"><span class="pill">${answered}/${questions.length} answered</span><button class="button secondary" data-action="speak-listening">Play text fallback</button>${submitted ? `<button class="button ghost" data-action="reset-listening">Try again</button>` : ""}</div></div><div class="grid-2"><section class="card card-pad"><div class="card-head"><div><h3 class="card-title">Section 1 · everyday conversation</h3><p class="card-description">This is original practice content. The text fallback is not equivalent to an official audio section.</p></div><span class="pill lime">Original content</span></div><div class="audio-fallback"><span class="icon">◉</span><div><strong>Audio capability</strong><br />${typeof window !== "undefined" && "speechSynthesis" in window ? "Browser text-to-speech is available as a clearly labelled fallback." : "Audio playback is unavailable in this browser; use the transcript evidence below."}</div></div><div class="question-support" style="margin-top:16px;line-height:1.8">The local fallback reads the short evidence sentence attached to each question. In exam mode, transcripts would remain hidden until submission.</div><div class="notice warn" style="margin-top:16px"><span>!</span><div><strong>Integrity note:</strong> These items measure question handling and evidence location. They do not claim to measure real-world listening comprehension without audio.</div></div></section><section class="card card-pad"><div class="card-head"><div><h3 class="card-title">Question set</h3><p class="card-description">Spelling, number, distractor, and note-completion patterns are tracked.</p></div></div><div class="stack">${questions.map((question, index) => `<div style="padding-bottom:16px;border-bottom:1px solid #edf0ec"><div class="question-meta"><span class="question-number">Q${index + 1} · ${question.type}</span><span class="pill">${question.difficulty}</span></div><div style="font-weight:700;font-size:13px;line-height:1.5">${esc(question.prompt)}</div><div class="option-list">${question.options.map((option) => `<label class="option ${state.practice.listeningAnswers[question.id] === option ? "selected" : ""}"><input type="radio" name="listening-${question.id}" data-action="listening-answer" data-question-id="${question.id}" value="${esc(option)}" ${state.practice.listeningAnswers[question.id] === option ? "checked" : ""} /> <span>${esc(option)}</span></label>`).join("")}</div>${submitted ? `<div class="answer-feedback ${state.practice.listeningAnswers[question.id] === question.correct ? "correct" : "incorrect"}"><strong>${state.practice.listeningAnswers[question.id] === question.correct ? "Correct" : `Correct answer: ${esc(question.correct)}`}</strong>${esc(question.explanation)}</div>` : ""}</div>`).join("")}</div><button class="button primary" style="width:100%;margin-top:18px" data-action="submit-listening">${submitted ? "Results recorded" : "Submit listening set"}</button></section></div>`;
}

function renderTutor() {
  const messages = state.tutor.messages || [];
  return `<div class="hero"><div><div class="eyebrow">Tutor & explanation engine</div><h1>Ask for the next explanation.</h1><p class="section-subtitle">The server attempts the configured AI provider first and keeps a deterministic, evidence-linked fallback when the provider is unavailable.</p></div><span class="pill lime">AI + local fallback</span></div><div class="grid-2"><section class="card card-pad"><div class="card-head"><div><h3 class="card-title">Tutor chat</h3><p class="card-description">Ask about a question type, an error category, or your current priority.</p></div></div><div class="stack" style="max-height:410px;overflow:auto">${messages.length ? messages.map((message) => `<div class="notice ${message.role === "user" ? "" : "warn"}"><span>${message.role === "user" ? "You" : "✦"}</span><div>${esc(message.text)}${message.source ? `<br /><span class="muted tiny">${esc(message.source)}</span>` : ""}</div></div>`).join("") : `<div class="empty-state"><strong>No tutor messages yet</strong><p>Try “Why do I keep getting True / False / Not Given wrong?”</p></div>`}</div><div class="field" style="margin-top:17px"><label for="tutor-input">Your question</label><textarea id="tutor-input" rows="3" placeholder="Ask about your recorded errors or a strategy..."></textarea></div><button class="button primary" style="width:100%;margin-top:12px" data-action="ask-tutor">Ask tutor</button></section><section class="card card-pad"><div class="card-head"><div><h3 class="card-title">Evidence available to tutor</h3><p class="card-description">Only locally saved learning signals are used here.</p></div></div><div class="stack">${priorityData().slice(0, 5).map((item) => `<div class="notice ${item.corrected ? "" : "warn"}"><span>${item.corrected ? "✓" : "!"}</span><div><strong>${skillMeta[item.skill]?.label || item.skill} · ${esc(item.category)}</strong><br />${item.count} recorded attempt${item.count === 1 ? "" : "s"}; ${item.corrected ? "maintain with spaced review." : "needs a corrective exercise."}</div></div>`).join("") || `<div class="empty-state"><strong>No error evidence yet</strong><p>The tutor will not invent a weakness. Submit a practice answer first.</p></div>`}</div><div class="notice" style="margin-top:18px"><span>!</span><div><strong>Provider status:</strong> the server can use OpenAI, local Ollama, or the deterministic fallback. API keys are never stored in browser state; Ollama requests stay on your computer.</div></div></section></div>`;
}

function renderDiagnostic() {
  const skills = ["listening", "reading", "writing", "speaking"];
  const active = state.diagnostic.activeSkill;
  const isObjective = active === "listening" || active === "reading";
  const questions = isObjective ? diagnosticQuestions[active] : [];
  const answered = isObjective ? questions.filter((question) => state.diagnostic.answers[question.id]).length : wordCount(state.diagnostic.text[active]);
  const skillIndex = skills.indexOf(active);
  const allObjectiveDone = ["listening", "reading"].every((skill) => diagnosticQuestions[skill].every((question) => state.diagnostic.answers[question.id]));
  const allTextDone = wordCount(state.diagnostic.text.writing) >= 30 && wordCount(state.diagnostic.text.speaking) >= 20;
  const ready = allObjectiveDone && allTextDone;
  const currentQuestion = questions.find((question) => !state.diagnostic.answers[question.id]) || questions[questions.length - 1];
  const answer = currentQuestion ? state.diagnostic.answers[currentQuestion.id] : null;
  const completedSkills = skills.filter((skill) => {
    if (skill === "listening" || skill === "reading") return diagnosticQuestions[skill].every((q) => state.diagnostic.answers[q.id]);
    return wordCount(state.diagnostic.text[skill]) >= (skill === "writing" ? 30 : 20);
  }).length;
  const completionPercent = Math.round((completedSkills / 4) * 100);
  const completionLabel = state.diagnostic.status === "complete" ? "Completed" : `${completionPercent}% complete`;
  return `<div class="hero"><div><div class="eyebrow">Gateway to personalisation</div><h1>Four-skill diagnostic</h1><p class="section-subtitle">This baseline is a practice assessment, not an official IELTS test. Complete each section to unlock provisional evidence and your first 30-day plan.</p></div><span class="pill ${state.diagnostic.status === "complete" ? "lime" : "amber"}">${completionLabel}</span></div>
    <div class="stepper" style="margin-bottom:18px">${skills.map((skill, index) => { const done = skill === "listening" || skill === "reading" ? diagnosticQuestions[skill].every((q) => state.diagnostic.answers[q.id]) : wordCount(state.diagnostic.text[skill]) >= (skill === "writing" ? 30 : 20); return `<button class="step ${active === skill ? "active" : ""} ${done ? "done" : ""}" data-action="diagnostic-skill" data-skill="${skill}"><span class="step-index">${done ? "✓" : index + 1}</span><span>${skillMeta[skill].label}</span></button>`; }).join("")}</div>
    <div class="notice ${isObjective ? "warn" : ""}" style="margin-bottom:18px"><span>${isObjective ? "◉" : "✎"}</span><div><strong>${isObjective ? `${skillMeta[active].label} objective check` : `${skillMeta[active].label} evidence sample`}</strong><br />${isObjective ? "Use the question evidence, choose one answer, and review the explanation after you submit." : active === "writing" ? "Write a short Task 2 response. The rubric below is heuristic and will not claim official scoring." : "Write a spoken-style answer as a text fallback. Pronunciation will remain unassessed without audio evidence."}</div></div>
    ${isObjective ? `<div class="card card-pad question-shell"><div class="question-meta"><span class="question-number">${answered}/${questions.length} answered · ${currentQuestion.type}</span><span class="pill">${currentQuestion.difficulty}</span></div><div class="practice-progress"><span style="width:${(answered / questions.length) * 100}%"></span></div><h3 class="question-prompt">${esc(currentQuestion.prompt)}</h3><div class="question-support">${esc(currentQuestion.support)}</div><div class="option-list">${currentQuestion.options.map((option) => `<label class="option ${answer === option ? "selected" : ""}"><input type="radio" name="diagnostic-${currentQuestion.id}" data-action="diagnostic-answer" data-question-id="${currentQuestion.id}" value="${esc(option)}" ${answer === option ? "checked" : ""} /> <span>${esc(option)}</span></label>`).join("")}</div>${answer ? `<div class="answer-feedback ${answer === currentQuestion.correct ? "correct" : "incorrect"}"><strong>${answer === currentQuestion.correct ? "Correct — evidence found." : `Not quite. Correct answer: ${esc(currentQuestion.correct)}`}</strong>${esc(currentQuestion.explanation)}</div>` : ""}<div class="practice-footer"><span class="muted tiny">${skillIndex < 2 ? "Objective scoring is recorded after each response." : ""}</span><button class="button primary" data-action="diagnostic-next">${answered === questions.length ? (skillIndex < 3 ? "Continue →" : "Review readiness") : "Next question →"}</button></div></div>` : `<div class="card card-pad" style="max-width:860px"><div class="field"><label for="diagnostic-text">${active === "writing" ? "Task 2 response · aim for 180–250 words" : "Speaking Part 2 response · aim for a developed answer"}</label><textarea id="diagnostic-text" class="editor" data-diagnostic-text="${active}" placeholder="${active === "writing" ? "Some people think universities should focus on practical skills rather than theoretical knowledge. To what extent do you agree or disagree?\n\nWrite your response here..." : "Describe a skill you would like to learn. Include what it is, why you want to learn it, and how you would practise."}">${esc(state.diagnostic.text[active])}</textarea><div class="word-meter"><span>${wordCount(state.diagnostic.text[active])} words</span><span>Minimum evidence: ${active === "writing" ? "30" : "20"} words</span></div></div>${active === "speaking" ? `<div class="audio-fallback" style="margin-top:17px"><span class="icon">◉</span><div><strong>Microphone unavailable in this local build.</strong><br />This typed fallback can assess structure and language only; pronunciation is not inferred.</div></div>` : ""}<div class="practice-footer"><span class="muted tiny">Your draft saves automatically in this browser.</span><button class="button primary" data-action="diagnostic-next">${skillIndex < 3 ? "Continue →" : "Finish diagnostic"}</button></div></div>`}
    ${ready ? `<div class="notice" style="margin-top:18px"><span>✓</span><div><strong>Ready to calculate your baseline.</strong><br />All four skills have evidence. You can now finish and generate your adaptive roadmap.</div></div>` : ""}
    ${state.diagnostic.results ? renderDiagnosticResults() : ""}`;
}

function renderDiagnosticResults() {
  const results = state.diagnostic.results;
  return `<section class="card card-pad" style="margin-top:18px"><div class="card-head"><div><h3 class="card-title">Your evidence summary</h3><p class="card-description">Calculated ${formatDate(results.date)} · ${esc(results.note)}</p></div><span class="pill lime">Provisional</span></div><div class="score-grid">${["listening", "reading", "writing", "speaking"].map((skill) => { const score = results.scores[skill]; return `<div class="criterion"><span>${skillMeta[skill].label}</span><strong>${score?.band?.toFixed(1) || "—"}</strong><p>${esc(score?.evidence || "Insufficient evidence")}</p></div>`; }).join("")}</div><div class="notice warn" style="margin-top:17px"><span>!</span><div><strong>Limits:</strong> Listening uses text fallbacks here; Writing and Speaking are heuristic estimates based on typed responses; pronunciation is not scored. These are not official IELTS results.</div></div>${state.plan ? `<div style="margin-top:17px"><button class="button primary" data-action="nav" data-route="today">Open your generated roadmap →</button></div>` : ""}</section>`;
}

function renderReading() {
  const questions = readingPractice;
  const answered = questions.filter((q) => state.practice.readingAnswers[q.id]).length;
  const submitted = state.practice.readingSubmitted;
  return `<div class="hero"><div><div class="eyebrow">Academic Reading · targeted set</div><h1>Find the evidence.</h1><p class="section-subtitle">A compact original passage set. Your answers and time pressure feed the error notebook; no random progress is shown.</p></div><div class="hero-actions"><span class="pill">${answered}/${questions.length} answered</span>${submitted ? `<button class="button secondary" data-action="reset-reading">Try again</button>` : ""}</div></div><div class="grid-2"><section class="card card-pad"><div class="card-head"><div><h3 class="card-title">The adaptive classroom</h3><p class="card-description">Read the excerpts shown with each question. In a full section, this would be a longer original passage.</p></div><span class="pill lime">Original practice</span></div><div class="question-support" style="line-height:1.85">Adaptive learning is most useful when it changes the next action. A learner who repeatedly selects unsupported inferences does not simply need more questions; they may need a brief lesson on locating evidence, followed by a smaller set of guided comparisons. The goal is not to make every task easier. It is to make practice more diagnostic.</div><div class="notice" style="margin-top:17px"><span>⌁</span><div><strong>Strategy:</strong> underline the exact phrase that supports your answer. If you cannot point to it, treat the answer as a hypothesis.</div></div></section><section class="card card-pad"><div class="card-head"><div><h3 class="card-title">Question set</h3><p class="card-description">Submit once to see explanations and log mistakes.</p></div></div><div class="stack">${questions.map((question, index) => `<div style="padding-bottom:16px;border-bottom:1px solid #edf0ec"><div class="question-meta"><span class="question-number">Q${index + 1} · ${question.type}</span><span class="pill">${question.difficulty}</span></div><div style="font-weight:700;font-size:13px;line-height:1.5">${esc(question.prompt)}</div><div class="option-list">${question.options.map((option) => `<label class="option ${state.practice.readingAnswers[question.id] === option ? "selected" : ""}"><input type="radio" name="reading-${question.id}" data-action="reading-answer" data-question-id="${question.id}" value="${esc(option)}" ${state.practice.readingAnswers[question.id] === option ? "checked" : ""} /> <span>${esc(option)}</span></label>`).join("")}</div>${submitted ? `<div class="answer-feedback ${state.practice.readingAnswers[question.id] === question.correct ? "correct" : "incorrect"}"><strong>${state.practice.readingAnswers[question.id] === question.correct ? "Correct" : `Correct answer: ${esc(question.correct)}`}</strong>${esc(question.explanation)}</div>` : ""}</div>`).join("")}</div><button class="button primary" style="margin-top:18px;width:100%" data-action="submit-reading">${submitted ? "Results recorded" : "Submit reading set"}</button></section></div>`;
}

function renderWriting() {
  const latest = state.writingSubmissions[0];
  return `<div class="hero"><div><div class="eyebrow">Academic Writing laboratory</div><h1>Make the argument visible.</h1><p class="section-subtitle">Draft, submit, revise, and compare. Feedback is prioritised and clearly labelled as heuristic in this local build.</p></div><span class="pill coral">Task 2 · opinion essay</span></div><div class="grid-2"><section class="card card-pad"><div class="card-head"><div><h3 class="card-title">Today’s prompt</h3><p class="card-description">Plan before you draft. Do not memorise a template that ignores the question.</p></div><span class="pill">40 minutes</span></div><div class="writing-prompt">Some people believe that schools should teach practical skills such as managing money and cooking, rather than traditional academic subjects. To what extent do you agree or disagree?</div><div class="notice" style="margin-top:17px"><span>✦</span><div><strong>Planning cue:</strong> state your position, give two developed reasons, and use a specific example. Your response should be relevant to this prompt.</div></div></section><section class="card card-pad"><div class="card-head"><div><h3 class="card-title">Draft editor</h3><p class="card-description">Word count and revision history are stored locally.</p></div></div><div class="field"><label for="writing-editor">Your response</label><textarea id="writing-editor" class="editor" data-writing-editor placeholder="Write your response here...">${esc(latest?.text || "")}</textarea><div class="word-meter"><span id="writing-count">${wordCount(latest?.text || "")} words</span><span>Recommended: 250+ words</span></div></div><button class="button primary" style="margin-top:17px;width:100%" data-action="submit-writing">Submit for evidence-based feedback</button></section></div>${latest ? `<section class="card card-pad" style="margin-top:18px"><div class="card-head"><div><h3 class="card-title">Latest feedback</h3><p class="card-description">Version ${state.writingSubmissions.length} · ${formatDate(latest.date)} · heuristic estimate</p></div><span class="pill coral">Not official IELTS scoring</span></div><div class="score-grid">${[["Task response", latest.analysis.task], ["Coherence", latest.analysis.coherence], ["Lexical resource", latest.analysis.lexical], ["Grammar", latest.analysis.grammar]].map(([label, score]) => `<div class="criterion"><span>${label}</span><strong>${score.toFixed(1)}</strong><p>${score >= 6.5 ? "Evidence is developing." : "Needs targeted correction."}</p></div>`).join("")}</div><div class="grid-2" style="margin-top:17px"><div class="notice ${latest.analysis.words < 250 ? "warn" : ""}"><span>${latest.analysis.words < 250 ? "!" : "✓"}</span><div><strong>Word count: ${latest.analysis.words}</strong><br />${latest.analysis.words < 250 ? "The response is below the recommended 250 words. Develop one reason with explanation and an example." : "Length is within the recommended range; keep relevance and precision under control."}</div></div><div class="notice"><span>→</span><div><strong>Next exercise</strong><br />Rewrite your thesis and one body paragraph. Compare the revision with this version before starting another topic.</div></div></div></section>` : `<section class="card card-pad empty-state" style="margin-top:18px"><strong>No writing evidence yet</strong><p>Submit a response to create criterion-level feedback and a revision record. The app will never invent a writing score from onboarding alone.</p></section>`}`;
}

function renderSpeaking() {
  const latest = state.speakingSubmissions[0];
  return `<div class="hero"><div><div class="eyebrow">Speaking practice studio</div><h1>Develop the answer.</h1><p class="section-subtitle">Use the text fallback to practise structure, fluency, and language. Pronunciation remains unavailable without audio evidence.</p></div><span class="pill amber">Part 2 · cue card</span></div><div class="grid-2"><section class="card card-pad"><div class="card-head"><div><h3 class="card-title">Cue card</h3><p class="card-description">Prepare for 1 minute, then speak for up to 2 minutes.</p></div><span class="pill amber">1 + 2 minutes</span></div><div class="writing-prompt">Describe a useful skill you learned outside school. You should say what the skill is, how you learned it, and explain why it is useful to you now.</div><div class="notice warn" style="margin-top:17px"><span>◉</span><div><strong>Audio limitation:</strong> microphone capture, transcription, pause analysis, and pronunciation analysis are unavailable in this local-only build. Do not infer pronunciation from typed text.</div></div></section><section class="card card-pad"><div class="card-head"><div><h3 class="card-title">Text fallback</h3><p class="card-description">Write the answer as if you were speaking naturally.</p></div></div><div class="field"><label for="speaking-editor">Your spoken-style response</label><textarea id="speaking-editor" class="editor" data-speaking-editor placeholder="I’d like to talk about...">${esc(latest?.text || "")}</textarea><div class="word-meter"><span id="speaking-count">${wordCount(latest?.text || "")} words</span><span>Recommended: 90+ words</span></div></div><button class="button primary" style="margin-top:17px;width:100%" data-action="submit-speaking">Save speaking evidence</button></section></div>${latest ? `<section class="card card-pad" style="margin-top:18px"><div class="card-head"><div><h3 class="card-title">Structure feedback</h3><p class="card-description">Version ${state.speakingSubmissions.length} · ${formatDate(latest.date)} · typed-response heuristic</p></div><span class="pill amber">Pronunciation not assessed</span></div><div class="score-grid">${[["Fluency & coherence", latest.analysis.fluency], ["Lexical resource", latest.analysis.vocab], ["Grammar", latest.analysis.grammar], ["Pronunciation", null]].map(([label, score]) => `<div class="criterion"><span>${label}</span><strong>${score ? score.toFixed(1) : "—"}</strong><p>${score ? "Based on written structure only." : "Audio evidence required."}</p></div>`).join("")}</div><div class="notice" style="margin-top:17px"><span>→</span><div><strong>Next exercise:</strong> extend each main point with a reason, a concrete example, and a short reflection. This improves development without rewarding memorised phrases.</div></div></section>` : `<section class="card card-pad empty-state" style="margin-top:18px"><strong>No speaking evidence yet</strong><p>Save a typed fallback to assess structure and language honestly. Pronunciation stays “Not assessed”.</p></section>`}`;
}

function finishWriting() {
  const mode = state.writingMode || "task2";
  const text = document.querySelector("#writing-editor")?.value.trim() || "";
  const minimum = mode === "task1" ? 20 : 20;
  if (wordCount(text) < minimum) return showToast(`Write at least ${minimum} words so the feedback has real evidence.`);
  const analysis = estimateWriting(text);
  const task = writingTasks[mode];
  state.writingDrafts[mode] = text;
  state.writingSubmissions.unshift({ date: new Date().toISOString(), mode, task: task.label, text, analysis });
  const recommended = mode === "task1" ? 150 : 250;
  if (analysis.words < recommended) recordError({ skill: "writing", category: mode === "task1" ? "Task-achievement issue" : "Task-response issue", questionId: `writing-${mode}-word-count`, question: task.title, answer: `${analysis.words} words`, correct: `${recommended}+ words recommended`, explanation: "A short response limits development; add relevant explanation, comparison, or an example.", severity: 2 });
  saveState();
  showToast(`${task.label} evidence saved with a prioritised feedback snapshot.`);
  render();
}

function finishSpeaking() {
  const part = state.speakingPart || "part2";
  const text = document.querySelector("#speaking-editor")?.value.trim() || "";
  const minimum = part === "part1" ? 15 : 20;
  if (wordCount(text) < minimum) return showToast(`Write at least ${minimum} words so the structure feedback has evidence.`);
  const analysis = estimateSpeaking(text);
  state.speakingDrafts[part] = text;
  state.speakingSubmissions.unshift({ date: new Date().toISOString(), part, text, analysis, recordingSeconds: state.speakingRecording?.seconds || null });
  const recommended = part === "part1" ? 30 : 90;
  if (analysis.words < recommended) recordError({ skill: "speaking", category: "Insufficient development", questionId: `speaking-${part}-development`, question: speakingPrompts[part].prompt, answer: `${analysis.words} words`, correct: `${recommended}+ words recommended`, explanation: "Add a reason, concrete example, and reflection to make the response more developed.", severity: 2 });
  saveState();
  showToast(`${speakingPrompts[part].label} evidence saved. Pronunciation remains unassessed unless audio is available.`);
  render();
}

async function startRecording() {
  if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === "undefined") return showToast("Microphone recording is unavailable in this browser; use the typed fallback.");
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    activeRecordingChunks = [];
    activeRecordingStartedAt = Date.now();
    activeRecorder = new MediaRecorder(stream);
    activeRecorder.ondataavailable = (event) => { if (event.data.size) activeRecordingChunks.push(event.data); };
    activeRecorder.onstop = () => {
      const blob = new Blob(activeRecordingChunks, { type: activeRecorder.mimeType || "audio/webm" });
      activeRecordingUrl = URL.createObjectURL(blob);
      const seconds = Math.max(1, Math.round((Date.now() - activeRecordingStartedAt) / 1000));
      state.speakingRecording = { status: "recorded", seconds, recordedAt: new Date().toISOString() };
      stream.getTracks().forEach((track) => track.stop());
      saveState(); render(); showToast("Microphone attempt captured locally. It was not uploaded.");
    };
    activeRecorder.start();
    state.speakingRecording = { status: "recording", startedAt: new Date().toISOString() };
    saveState(); render();
  } catch (error) {
    state.speakingRecording = { status: "unavailable", reason: "permission-or-device" };
    saveState(); render(); showToast("Microphone permission or device was unavailable; typed fallback remains ready.");
  }
}

function stopRecording() {
  if (!activeRecorder || activeRecorder.state === "inactive") return;
  activeRecorder.stop();
  activeRecorder = null;
}

function renderMockEnhancedCore() {
  const mock = state.mock;
  const questions = getMockQuestions();
  const answered = questions.filter((question) => mock.answers[question.id]).length;
  if (mock.status === "submitted" && mock.result) {
    const result = mock.result;
    return `<div class="hero"><div><div class="eyebrow">Mock review · ${formatDate(result.date)}</div><h1>Review the evidence.</h1><p class="section-subtitle">This local simulation now stores a full objective question set plus optional Writing and Speaking responses. It still documents deviations from the official exam.</p></div><button class="button secondary" data-action="reset-mock">Start another mock</button></div><div class="grid-4"><div class="card metric"><div class="metric-label">Listening</div><div class="metric-value">${result.listening.correct}/${result.listening.total}</div><div class="metric-sub">Local calibration ${result.listening.band.toFixed(1)}</div></div><div class="card metric"><div class="metric-label">Reading</div><div class="metric-value">${result.reading.correct}/${result.reading.total}</div><div class="metric-sub">Local calibration ${result.reading.band.toFixed(1)}</div></div><div class="card metric"><div class="metric-label">Writing</div><div class="metric-value">${result.writing?.band ? result.writing.band.toFixed(1) : "—"}</div><div class="metric-sub">${result.writing ? "Heuristic estimate" : "Not attempted"}</div></div><div class="card metric"><div class="metric-label">Speaking</div><div class="metric-value">${result.speaking?.band ? result.speaking.band.toFixed(1) : "—"}</div><div class="metric-sub">${result.speaking ? "Pronunciation not assessed" : "Not attempted"}</div></div></div><div class="grid-2" style="margin-top:18px"><section class="card card-pad"><div class="card-head"><div><h3 class="card-title">Top priorities</h3><p class="card-description">Based on this mock’s actual responses and your saved history.</p></div></div>${priorityData().slice(0, 3).map((item, i) => `<div class="priority-item"><span class="priority-number">0${i + 1}</span><div class="priority-copy"><strong>${skillMeta[item.skill]?.label || item.skill} · ${esc(item.category)}</strong><p>${item.count} recorded attempt${item.count === 1 ? "" : "s"}; reattempt a new item after reviewing the evidence.</p></div></div>`).join("") || `<div class="empty-state"><strong>No repeated priorities yet</strong><p>One mock is a starting point, not a diagnosis of a persistent weakness.</p></div>`}</section><section class="card card-pad"><div class="card-head"><div><h3 class="card-title">Deep-review boundaries</h3><p class="card-description">What this result can and cannot tell you.</p></div></div><div class="stack"><div class="notice warn"><span>!</span><div><strong>Original local content</strong><br />The question bank is original practice material and its conversion is a documented local calibration, not an official IELTS conversion table.</div></div><div class="notice warn"><span>!</span><div><strong>Audio / pronunciation</strong><br />Listening uses text fallback items and Speaking pronunciation remains unassessed unless audio evidence is available.</div></div><div class="notice"><span>✓</span><div><strong>Historical record stored</strong><br />Answers, timestamps, optional written responses, and error priorities remain in this browser.</div></div></div></section></div>`;
  }
  if (mock.status !== "in-progress") return `<div class="hero"><div><div class="eyebrow">Exam readiness</div><h1>Full local mock simulation</h1><p class="section-subtitle">A 40-item objective simulation with all four skill surfaces, autosaved responses, and detailed review. Use the official test for official scoring.</p></div><span class="pill coral">Ready to start</span></div><div class="card card-pad"><div class="grid-2"><div><h3 class="card-title">Before you begin</h3><p class="card-description" style="max-width:560px">This version contains 20 Listening and 20 Reading items, plus optional Writing and Speaking responses. It is original local practice, not a licensed or official full-length exam.</p><div class="notice warn" style="margin-top:17px"><span>!</span><div><strong>Simulated deviations:</strong> browser text-to-speech replaces audio, the question bank is original local content rather than licensed material, and subjective scoring is heuristic.</div></div></div><div style="display:flex;align-items:center;justify-content:flex-end"><button class="button primary" data-action="start-mock">Start mock →</button></div></div></div>`;
  return `<div class="hero"><div><div class="eyebrow">Exam mode · local simulation</div><h1>Stay with the evidence.</h1><p class="section-subtitle">${answered}/${questions.length} objective items answered. Responses autosave. Leave an item blank only when you intend to review it before submission.</p></div><div class="hero-actions"><span id="mock-clock" class="pill coral">${formatElapsed(mock.startedAt)}</span><span class="pill">${answered}/${questions.length}</span></div></div><div class="grid-2"><section class="card card-pad"><div class="card-head"><div><h3 class="card-title">Listening + Reading</h3><p class="card-description">Question navigation is on this page; progress survives refresh.</p></div><span class="pill">${answered}/${questions.length}</span></div><div class="practice-progress"><span style="width:${(answered / questions.length) * 100}%"></span></div><div class="stack" style="margin-top:18px">${questions.map((question, index) => `<div style="padding-bottom:17px;border-bottom:1px solid #edf0ec"><div class="question-number">Q${index + 1} · ${skillMeta[mockSkillOf(question)].label} · ${question.type}</div><h4 style="margin:8px 0;font-size:14px;line-height:1.5">${esc(question.prompt)}</h4><div class="option-list">${question.options.map((option) => `<label class="option ${mock.answers[question.id] === option ? "selected" : ""}"><input type="radio" name="mock-${question.id}" data-action="mock-answer" data-question-id="${question.id}" value="${esc(option)}" ${mock.answers[question.id] === option ? "checked" : ""} /> <span>${esc(option)}</span></label>`).join("")}</div></div>`).join("")}</div></section><section class="card card-pad"><div class="card-head"><div><h3 class="card-title">Writing + Speaking evidence</h3><p class="card-description">Optional response surfaces; their scores remain estimates.</p></div></div><div class="field"><label for="mock-writing">Task 2 response</label><textarea id="mock-writing" rows="8" data-mock-text="writing" placeholder="Write an essay response if you want Writing included in review...">${esc(mock.text?.writing || "")}</textarea><div class="word-meter"><span>${wordCount(mock.text?.writing || "")} words</span><span>250+ recommended</span></div></div><div class="field" style="margin-top:17px"><label for="mock-speaking">Speaking Part 2 text fallback</label><textarea id="mock-speaking" rows="6" data-mock-text="speaking" placeholder="Write a spoken-style answer if you want Speaking included in review...">${esc(mock.text?.speaking || "")}</textarea><div class="word-meter"><span>${wordCount(mock.text?.speaking || "")} words</span><span>90+ recommended</span></div></div><div class="notice warn" style="margin-top:17px"><span>!</span><div>Pronunciation is not inferred from typed Speaking text. Audio remains a separate capability.</div></div><button class="button primary" style="width:100%;margin-top:18px" data-action="submit-mock">Submit for deep review</button></section></div>`;
}

function submitMockEnhanced() {
  const questions = getMockQuestions();
  const unanswered = questions.filter((question) => !state.mock.answers[question.id]);
  if (unanswered.length) return showToast(`Answer ${unanswered.length} more objective item${unanswered.length > 1 ? "s" : ""} before submitting.`);
  const sections = {};
  const typeAccuracy = {};
  ["listening", "reading"].forEach((skill) => {
    const qs = questions.filter((question) => mockSkillOf(question) === skill);
    const correct = qs.filter((question) => state.mock.answers[question.id] === question.correct).length;
    sections[skill] = { correct, total: qs.length, band: scoreBand(correct, qs.length) };
    qs.forEach((question) => {
      const key = `${skill} · ${question.type}`;
      if (!typeAccuracy[key]) typeAccuracy[key] = { correct: 0, total: 0 };
      typeAccuracy[key].total += 1;
      if (state.mock.answers[question.id] === question.correct) typeAccuracy[key].correct += 1;
    });
    qs.forEach((question) => { if (state.mock.answers[question.id] !== question.correct) recordError({ skill, category: question.type === "True / False / Not Given" ? "Incorrect inference" : question.type === "Distractor recognition" ? "Distractor selection" : "Failure to locate textual evidence", questionId: question.id, question: question.prompt, answer: state.mock.answers[question.id], correct: question.correct, explanation: question.explanation, severity: question.difficulty === "Advanced" ? 3 : 2 }); });
  });
  const writingText = state.mock.text?.writing?.trim() || "";
  const speakingText = state.mock.text?.speaking?.trim() || "";
  if (wordCount(writingText) >= 20) sections.writing = estimateWriting(writingText);
  if (wordCount(speakingText) >= 20) sections.speaking = estimateSpeaking(speakingText);
  const result = { date: new Date().toISOString(), elapsedSeconds: Math.max(0, Math.floor((Date.now() - new Date(state.mock.startedAt).getTime()) / 1000)), questionTypeAccuracy: typeAccuracy, ...sections };
  state.mock.status = "submitted";
  state.mock.result = result;
  state.mockHistory = [result, ...(state.mockHistory || [])].slice(0, 10);
  saveState(); showToast("Mock submitted. Deep review is ready."); render();
}

function renderMockDeepReviewInsights(result) {
  const typeRows = Object.entries(result.questionTypeAccuracy || {}).map(([label, item]) => `<div class="bar-row"><span>${esc(label)}</span><div class="bar-track"><div class="bar-fill teal" style="width:${Math.round((item.correct / item.total) * 100)}%"></div></div><strong>${item.correct}/${item.total}</strong></div>`).join("");
  const previous = (state.mockHistory || [])[1];
  const comparison = previous ? `<div class="notice"><span>↗</span><div><strong>Previous comparable mock:</strong> Listening ${previous.listening.correct}/${previous.listening.total}, Reading ${previous.reading.correct}/${previous.reading.total}. Compare cautiously because local question difficulty is not calibrated against official material.</div></div>` : `<div class="notice"><span>→</span><div><strong>Baseline history:</strong> this is the first stored mock. A later comparable attempt will appear here.</div></div>`;
  return `<section class="card card-pad" style="margin-top:18px"><div class="card-head"><div><h3 class="card-title">Deep review signals</h3><p class="card-description">Question-type accuracy, elapsed time, and historical comparison from saved evidence.</p></div></div><div class="grid-2"><div><div class="metric-label">Objective elapsed time</div><div class="metric-value" style="font-size:24px">${formatElapsed(new Date(Date.now() - (result.elapsedSeconds || 0) * 1000).toISOString())}</div><div class="metric-sub">Local target: focused, uninterrupted attempt</div></div><div><div class="metric-label">Question-type accuracy</div><div class="bar-chart" style="margin-top:10px">${typeRows || `<div class="empty-state"><strong>No type data</strong></div>`}</div></div></div>${comparison}</section>`;
}

function renderMockEnhanced() {
  const html = renderMockEnhancedCore();
  if (state.route === "mock" && state.mock.status === "submitted" && state.mock.result) return html.replace(/<\/section><\/div>$/, `${renderMockDeepReviewInsights(state.mock.result)}</section></div>`);
  return html;
}

function renderLanguage() {
  const mastered = state.language.vocabMastered.length;
  return `<div class="hero"><div><div class="eyebrow">Vocabulary · collocations · grammar</div><h1>Precision beats rarity.</h1><p class="section-subtitle">Recall useful language, apply it in context, and revisit it after a delay. Rare words are not automatically better words.</p></div><span class="pill lime">${mastered}/${languageItems.length} vocabulary reviewed</span></div><div class="grid-2"><section class="card card-pad"><div class="card-head"><div><h3 class="card-title">Active recall deck</h3><p class="card-description">Choose the meaning, then see the example.</p></div><span class="pill">Spaced review</span></div><div class="stack">${languageItems.map((item) => { const answer = state.language.answers[item.id]; const done = state.language.vocabMastered.includes(item.id); return `<div style="padding-bottom:15px;border-bottom:1px solid #edf0ec"><div style="display:flex;align-items:center;justify-content:space-between;gap:10px"><strong style="font:800 18px Manrope">${item.word}</strong><span class="pill ${done ? "lime" : ""}">${done ? "Reviewed" : item.topic}</span></div><p class="muted tiny" style="margin:6px 0 12px">${done || answer ? esc(item.definition) : "Select the closest meaning."}</p><div class="option-list" style="margin-top:0">${item.options.map((option) => `<label class="option ${answer === option ? "selected" : ""}"><input type="radio" name="vocab-${item.id}" data-action="vocab-answer" data-item-id="${item.id}" value="${esc(option)}" ${answer === option ? "checked" : ""} /> <span>${esc(option)}</span></label>`).join("")}</div>${answer ? `<div class="answer-feedback ${answer === item.correct ? "correct" : "incorrect"}"><strong>${answer === item.correct ? "Correct recall" : `Correct meaning: ${esc(item.correct)}`}</strong>${esc(item.example)}</div>` : ""}</div>`; }).join("")}</div></section><section class="card card-pad"><div class="card-head"><div><h3 class="card-title">Grammar mastery</h3><p class="card-description">Short checks tied to common IELTS accuracy patterns.</p></div><span class="pill">${state.language.grammarMastered.length}/${grammarItems.length} mastered</span></div><div class="stack">${grammarItems.map((item) => { const answer = state.language.answers[item.id]; return `<div style="padding-bottom:15px;border-bottom:1px solid #edf0ec"><span class="eyebrow">${item.skill}</span><h4 style="margin:8px 0;font-size:14px">${item.prompt}</h4><div class="option-list" style="margin-top:0">${item.options.map((option) => `<label class="option ${answer === option ? "selected" : ""}"><input type="radio" name="grammar-${item.id}" data-action="grammar-answer" data-item-id="${item.id}" value="${esc(option)}" ${answer === option ? "checked" : ""} /> <span>${esc(option)}</span></label>`).join("")}</div>${answer ? `<div class="answer-feedback ${answer === item.correct ? "correct" : "incorrect"}"><strong>${answer === item.correct ? "Accurate" : `Correct: ${esc(item.correct)}`}</strong>${esc(item.explanation)}</div>` : ""}</div>`; }).join("")}</div></section></div>`;
}

function renderMock() {
  const mock = state.mock;
  const questions = [...diagnosticQuestions.listening.slice(0, 2), ...diagnosticQuestions.reading.slice(0, 2)];
  if (mock.status === "submitted" && mock.result) return `<div class="hero"><div><div class="eyebrow">Mock review · ${formatDate(mock.result.date)}</div><h1>Review the evidence.</h1><p class="section-subtitle">This compact mock demonstrates the workflow. It is not a full official-format exam because audio and live speaking capture are unavailable.</p></div><button class="button secondary" data-action="reset-mock">Start another mock</button></div><div class="grid-4"><div class="card metric"><div class="metric-label">Listening</div><div class="metric-value">${mock.result.listening.correct}/${mock.result.listening.total}</div><div class="metric-sub">Practice calibration ${mock.result.listening.band.toFixed(1)}</div></div><div class="card metric"><div class="metric-label">Reading</div><div class="metric-value">${mock.result.reading.correct}/${mock.result.reading.total}</div><div class="metric-sub">Practice calibration ${mock.result.reading.band.toFixed(1)}</div></div><div class="card metric"><div class="metric-label">Writing</div><div class="metric-value">—</div><div class="metric-sub">Not attempted</div></div><div class="card metric"><div class="metric-label">Speaking</div><div class="metric-value">—</div><div class="metric-sub">Audio unavailable</div></div></div><div class="grid-2" style="margin-top:18px"><section class="card card-pad"><div class="card-head"><div><h3 class="card-title">Top three priorities</h3><p class="card-description">Based on this mock’s actual responses and your history.</p></div></div>${priorityData().slice(0, 3).map((item, i) => `<div class="priority-item"><span class="priority-number">0${i + 1}</span><div class="priority-copy"><strong>${skillMeta[item.skill]?.label || item.skill} · ${esc(item.category)}</strong><p>${item.count} recorded attempt${item.count === 1 ? "" : "s"}; review the explanation and reattempt with evidence.</p></div></div>`).join("") || `<div class="empty-state"><strong>No repeated priorities yet</strong><p>One mock is a starting point, not a diagnosis of a persistent weakness.</p></div>`}</section><section class="card card-pad"><div class="card-head"><div><h3 class="card-title">Limitations</h3><p class="card-description">What this result can and cannot tell you.</p></div></div><div class="stack"><div class="notice warn"><span>!</span><div><strong>Compact format</strong><br />Only 4 objective questions are included here, so this is not comparable to a full 40-question IELTS section.</div></div><div class="notice warn"><span>!</span><div><strong>Listening fallback</strong><br />Text prompts replace audio. Do not interpret this as a measured listening band.</div></div><div class="notice"><span>✓</span><div><strong>Stored historical record</strong><br />The answers, score calculation, and timestamp remain in this browser for comparison.</div></div></div></section></div>`;
  return `<div class="hero"><div><div class="eyebrow">Exam readiness</div><h1>Compact mock exam</h1><p class="section-subtitle">A timed, autosaved practice run through objective questions. The review explains the limits instead of inflating a score.</p></div><span class="pill coral">${mock.status === "in-progress" ? "In progress" : "Ready to start"}</span></div>${mock.status !== "in-progress" ? `<div class="card card-pad"><div class="grid-2"><div><h3 class="card-title">Before you begin</h3><p class="card-description" style="max-width:520px">This local mock contains two listening text-fallback items and two reading items. Writing and Speaking are separate modules because full recording and long-form evaluation are not configured.</p><div class="notice warn" style="margin-top:17px"><span>!</span><div><strong>Simulated deviation:</strong> no audio, no live recording, and fewer questions than a full IELTS Academic exam.</div></div></div><div style="display:flex;align-items:center;justify-content:flex-end"><button class="button primary" data-action="start-mock">Start timed mock →</button></div></div></div>` : `<div class="grid-2"><section class="card card-pad"><div class="card-head"><div><h3 class="card-title">Objective section</h3><p class="card-description">Autosaves as you answer. Submit only when you are ready.</p></div><span class="pill">${questions.filter((q) => mock.answers[q.id]).length}/${questions.length}</span></div><div class="stack">${questions.map((question, index) => `<div style="padding-bottom:17px;border-bottom:1px solid #edf0ec"><div class="question-number">Q${index + 1} · ${question.type}</div><h4 style="margin:8px 0;font-size:14px;line-height:1.5">${esc(question.prompt)}</h4><div class="option-list">${question.options.map((option) => `<label class="option ${mock.answers[question.id] === option ? "selected" : ""}"><input type="radio" name="mock-${question.id}" data-action="mock-answer" data-question-id="${question.id}" value="${esc(option)}" ${mock.answers[question.id] === option ? "checked" : ""} /> <span>${esc(option)}</span></label>`).join("")}</div></div>`).join("")}</div><button class="button primary" style="width:100%;margin-top:18px" data-action="submit-mock">Submit mock for deep review</button></section><section class="card card-pad"><div class="card-head"><div><h3 class="card-title">Exam mode</h3><p class="card-description">A minimal control surface for a focused attempt.</p></div></div><div class="metric" style="padding:17px 0"><div class="metric-label">Started</div><div class="metric-value" style="font-size:22px">${formatDate(mock.startedAt)}</div><div class="metric-sub">Answers autosave to local storage</div></div><div class="notice" style="margin-top:12px"><span>⌁</span><div><strong>Mark-for-review:</strong> leave an item unanswered, then return before submission. Unanswered items are not silently counted as incorrect in this demo.</div></div></section></div>`}`;
}

function renderErrors() {
  const priorities = priorityData();
  return `<div class="hero"><div><div class="eyebrow">Error-driven learning engine</div><h1>Make mistakes useful.</h1><p class="section-subtitle">Every item below came from a recorded response. Priority weights are configurable heuristics, not scientifically validated probabilities.</p></div><span class="pill coral">${state.errors.length} records</span></div><div class="grid-2"><section class="card card-pad"><div class="card-head"><div><h3 class="card-title">Priority queue</h3><p class="card-description">Recurrence + severity + correction status.</p></div><button class="button small ghost" data-action="mark-top-corrected">Mark top corrected</button></div>${priorities.length ? `<div class="table-wrap"><table class="data-table"><thead><tr><th>Priority</th><th>Pattern</th><th>Evidence</th><th>Status</th></tr></thead><tbody>${priorities.map((item) => `<tr><td><strong>${item.priority}</strong><small>${skillMeta[item.skill]?.label || item.skill}</small></td><td><strong>${esc(item.category)}</strong><small>${esc(item.difficulty)}</small></td><td>${item.count} attempt${item.count === 1 ? "" : "s"}<small>${esc(item.explanation || "Use a corrective exercise.")}</small></td><td><span class="pill ${item.corrected ? "lime" : "coral"}">${item.corrected ? "Corrected" : "Open"}</span></td></tr>`).join("")}</tbody></table></div>` : `<div class="empty-state"><strong>No errors yet</strong><p>Complete diagnostic or a practice set. The engine will classify only what you actually submit.</p><button class="button primary small" data-action="nav" data-route="reading">Try reading practice</button></div>`}</section><section class="card card-pad"><div class="card-head"><div><h3 class="card-title">What changes next?</h3><p class="card-description">Recommendations are tied to observable patterns.</p></div></div>${priorities.slice(0, 4).map((item) => `<div class="notice ${item.corrected ? "" : "warn"}" style="margin-bottom:9px"><span>${item.corrected ? "✓" : "→"}</span><div><strong>${skillMeta[item.skill]?.label || item.skill}: ${esc(item.category)}</strong><br />${item.corrected ? "Keep it in spaced maintenance and test transfer." : `Repeat the pattern in a focused drill, then reattempt a new item. ${item.count > 1 ? "Recurrence makes this a higher priority." : "One error alone is not conclusive."}`}</div></div>`).join("") || `<div class="empty-state"><strong>Your next recommendation is waiting</strong><p>Practice first. The system will not pretend a weakness exists without learner evidence.</p></div>`}</section></div><section class="card card-pad" style="margin-top:18px"><div class="card-head"><div><h3 class="card-title">Recent records</h3><p class="card-description">Question-level history with the correct answer kept visible for review.</p></div></div>${state.errors.length ? `<div class="table-wrap"><table class="data-table"><thead><tr><th>When</th><th>Skill / type</th><th>Your answer</th><th>Correct answer</th><th>Explanation</th></tr></thead><tbody>${state.errors.slice(0, 15).map((error) => `<tr><td>${formatDate(error.date)}</td><td><strong>${skillMeta[error.skill]?.label || error.skill}</strong><small>${esc(error.category)}</small></td><td>${esc(error.answer || "No answer")}</td><td>${esc(error.correct)}</td><td>${esc(error.explanation)}</td></tr>`).join("")}</tbody></table></div>` : `<div class="empty-state"><strong>Nothing to review</strong><p>Real activity will create a useful notebook.</p></div>`}</section>`;
}

function renderRevision() {
  const due = dueRevisions();
  const upcoming = (state.revisions || []).filter((item) => !item.completed && new Date(item.dueAt).getTime() > Date.now()).sort((a, b) => new Date(a.dueAt) - new Date(b.dueAt)).slice(0, 8);
  const itemById = Object.fromEntries((state.errors || []).map((error) => [error.id, error]));
  const revisionCard = (revision, isDue) => {
    const error = itemById[revision.errorId];
    if (!error) return "";
    return `<div class="priority-item"><span class="priority-number">${isDue ? "!" : "→"}</span><div class="priority-copy"><strong>${skillMeta[error.skill]?.label || error.skill} · ${esc(error.category)}</strong><p>${esc(error.question)}<br /><span class="muted">Your answer: ${esc(error.answer || "No answer")} · Correct: ${esc(error.correct)}</span></p><small>${isDue ? "Due now" : `Due ${formatDate(revision.dueAt)}`} · interval ${revision.intervalDays} day${revision.intervalDays === 1 ? "" : "s"}</small></div>${isDue ? `<div style="display:flex;gap:7px;flex-wrap:wrap"><button class="button small secondary" data-action="complete-revision" data-revision-id="${revision.id}">Reviewed</button><button class="button small ghost" data-action="delay-revision" data-revision-id="${revision.id}">Still difficult</button></div>` : `<span class="pill">Upcoming</span>`}</div>`;
  };
  return `<div class="hero"><div><div class="eyebrow">Spaced repetition</div><h1>Return before you forget.</h1><p class="section-subtitle">Every scheduled item comes from a recorded mistake. Reviewing it changes the interval; the system never invents a weakness.</p></div><span class="pill ${due.length ? "coral" : "lime"}">${due.length} due now</span></div><div class="grid-2"><section class="card card-pad"><div class="card-head"><div><h3 class="card-title">Due today</h3><p class="card-description">Explain the evidence, then choose the review outcome.</p></div><span class="pill">${due.length}</span></div>${due.length ? `<div class="stack">${due.map((revision) => revisionCard(revision, true)).join("")}</div>` : `<div class="empty-state"><strong>Nothing due right now</strong><p>New corrections appear here after the next review interval. Keep practising or return tomorrow.</p></div>`}</section><section class="card card-pad"><div class="card-head"><div><h3 class="card-title">Upcoming schedule</h3><p class="card-description">Intervals expand only after a review is recorded.</p></div><span class="pill lime">${upcoming.length} planned</span></div>${upcoming.length ? `<div class="stack">${upcoming.map((revision) => revisionCard(revision, false)).join("")}</div>` : `<div class="empty-state"><strong>No upcoming reviews</strong><p>Submit practice answers to build a revision queue.</p></div>`}</section></div><section class="card card-pad" style="margin-top:18px"><div class="card-head"><div><h3 class="card-title">Revision rule</h3><p class="card-description">A transparent local schedule, not a claim of scientifically optimal spaced repetition.</p></div></div><div class="notice"><span>✓</span><div><strong>Reviewed successfully:</strong> the next interval doubles up to 30 days.</div></div><div class="notice warn" style="margin-top:9px"><span>!</span><div><strong>Still difficult:</strong> the interval returns to one day so the same evidence can be revisited sooner.</div></div></section>`;
}

function reviewRevision(revisionId, difficult = false) {
  const revision = (state.revisions || []).find((item) => item.id === revisionId);
  if (!revision) return;
  revision.attempts = (revision.attempts || 0) + 1;
  revision.intervalDays = difficult ? 1 : Math.min(30, Math.max(1, (revision.intervalDays || 1) * 2));
  revision.dueAt = new Date(Date.now() + revision.intervalDays * 86400000).toISOString();
  revision.completed = false;
  const error = state.errors.find((item) => item.id === revision.errorId);
  if (error && !difficult) error.corrected = true;
  saveState();
  showToast(difficult ? "Kept in the short review loop." : `Reviewed. Next interval: ${revision.intervalDays} day${revision.intervalDays === 1 ? "" : "s"}.`);
  render();
}

function renderAnalytics() {
  const scores = getScores();
  const practiceReading = state.practice.readingSubmitted ? readingPractice.filter((q) => state.practice.readingAnswers[q.id] === q.correct).length / readingPractice.length : null;
  const errorGroups = priorityData().slice(0, 6);
  return `<div class="hero"><div><div class="eyebrow">Progress analytics</div><h1>See what deserves time.</h1><p class="section-subtitle">This page separates recorded results, calculated metrics, user inputs, and heuristic estimates.</p></div><span class="pill">Live from local records</span></div><div class="grid-4"><div class="card metric"><div class="metric-label">Target band</div><div class="metric-value">${esc(state.profile.targetBand || "7.0")}</div><div class="metric-sub">User-entered goal</div></div><div class="card metric"><div class="metric-label">Evidence-backed skills</div><div class="metric-value">${Object.values(scores).filter((score) => typeof score.band === "number").length}/4</div><div class="metric-sub">Diagnostic result records</div></div><div class="card metric"><div class="metric-label">Reading accuracy</div><div class="metric-value">${practiceReading === null ? "—" : `${Math.round(practiceReading * 100)}%`}</div><div class="metric-sub">One submitted practice set</div></div><div class="card metric"><div class="metric-label">Revision records</div><div class="metric-value">${state.writingSubmissions.length + state.speakingSubmissions.length}</div><div class="metric-sub">Saved drafts with feedback</div></div></div><div class="grid-2" style="margin-top:18px"><section class="card card-pad"><div class="card-head"><div><h3 class="card-title">Skill-level evidence</h3><p class="card-description">Bands use actual diagnostic responses and transparent limitations.</p></div></div><div class="bar-chart">${["listening", "reading", "writing", "speaking"].map((skill) => { const score = scores[skill]?.band; return `<div class="bar-row"><span>${skillMeta[skill].label}</span><div class="bar-track"><div class="bar-fill ${skillMeta[skill].color}" style="width:${score ? (score / 9) * 100 : 0}%"></div></div><strong>${score ? score.toFixed(1) : "—"}</strong></div>`; }).join("")}</div><div class="notice warn" style="margin-top:18px"><span>!</span><div>These are practice estimates, not official scores. Reading and Listening use a compact local calibration; Writing and Speaking use typed-response heuristics.</div></div></section><section class="card card-pad"><div class="card-head"><div><h3 class="card-title">Error recurrence</h3><p class="card-description">Higher bars mean more repeated or severe open records.</p></div></div>${errorGroups.length ? `<div class="bar-chart">${errorGroups.map((item) => `<div class="bar-row"><span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(item.category)}</span><div class="bar-track"><div class="bar-fill coral" style="width:${Math.min(100, item.priority)}%"></div></div><strong>${item.count}</strong></div>`).join("")}</div>` : `<div class="empty-state"><strong>Not enough activity yet</strong><p>Repeated mistakes will become visible after you practise.</p></div>`}</section></div><section class="card card-pad" style="margin-top:18px"><div class="card-head"><div><h3 class="card-title">30-day consistency map</h3><p class="card-description">A day turns green only when a session or task is actually recorded.</p></div></div><div class="calendar">${["M", "T", "W", "T", "F", "S", "S"].map((day) => `<div class="calendar-head">${day}</div>`).join("")}${Array.from({ length: 35 }, (_, i) => { const day = i - 1; const active = day >= 0 && day < 30; const completed = active && state.plan && state.plan.days[day]?.tasks.some((task) => state.tasks[task.id]); return `<div class="calendar-day ${!active ? "empty" : ""} ${completed ? "complete" : ""} ${state.plan?.currentDay === day + 1 ? "current" : ""}">${active ? day + 1 : ""}</div>`; }).join("")}</div></section>`;
}

function renderSettings() {
  return `<div class="hero"><div><div class="eyebrow">Single-user learner space</div><h1>Settings & data</h1><p class="section-subtitle">Your records are persisted by the local SQLite server and mirrored to browser recovery storage.</p></div><span class="pill">${esc(syncStatus())}</span></div><div class="settings-grid"><div class="settings-nav"><button class="active">Profile & preferences</button><button data-action="export-data">Export learner data</button><button data-action="show-qa">Manual QA checklist</button></div><section class="card card-pad"><div class="card-head"><div><h3 class="card-title">Profile</h3><p class="card-description">User-entered planning context is kept separate from measured results.</p></div></div><div class="setting-line"><div><strong>Name</strong><span>${esc(state.profile.name)}</span></div><button class="button small ghost" data-action="edit-profile">Edit</button></div><div class="setting-line"><div><strong>Target exam</strong><span>${state.profile.examDate ? formatDate(state.profile.examDate) : "No date set"} · target band ${esc(state.profile.targetBand)}</span></div></div><div class="setting-line"><div><strong>Explanation language</strong><span>Used for future tutor and content preferences.</span></div><select class="field-input" data-action="change-language" style="padding:8px 10px;border:1px solid var(--line);border-radius:8px"><option ${state.settings.language === "English" ? "selected" : ""}>English</option><option ${state.settings.language === "Bangla" ? "selected" : ""}>Bangla</option><option ${state.settings.language === "English + Bangla" ? "selected" : ""}>English + Bangla</option></select></div><div class="setting-line"><div><strong>Optional reminders</strong><span>No reminders are sent by this local version.</span></div><button class="switch ${state.settings.reminders ? "on" : ""}" data-action="toggle-reminders" aria-label="Toggle reminders"></button></div><div class="setting-line"><div><strong>Data portability</strong><span>Download a JSON snapshot of your profile, plans, and error records.</span></div><button class="button small secondary" data-action="export-data">Download JSON</button></div><div class="setting-line"><div><strong>Reset learner space</strong><span>Deletes all local records from this browser and SQLite.</span></div><button class="button small danger" data-action="reset-state">Reset data</button></div><div class="notice warn" style="margin-top:18px"><span>!</span><div><strong>Single-user boundary:</strong> this server is intentionally loopback-only. It is reliable for your own computer, but it is not a public multi-user deployment.</div></div></section></div>`;
}

/* Enhanced labs: later declarations intentionally override the first compact renderers. */
function renderWriting() {
  const mode = state.writingMode || "task2";
  const task = writingTasks[mode];
  const latest = state.writingSubmissions.find((submission) => submission.mode === mode);
  const draft = state.writingDrafts?.[mode] || latest?.text || "";
  return `<div class="hero"><div><div class="eyebrow">Academic Writing laboratory</div><h1>Make the argument visible.</h1><p class="section-subtitle">Draft, submit, revise, and compare. The rubric is transparent and clearly labelled as heuristic in this local build.</p></div><span class="pill coral">${task.label}</span></div><div class="stepper" style="margin-bottom:18px"><button class="step ${mode === "task1" ? "active" : ""}" data-action="writing-mode" data-mode="task1"><span class="step-index">1</span><span>Task 1 report</span></button><button class="step ${mode === "task2" ? "active" : ""}" data-action="writing-mode" data-mode="task2"><span class="step-index">2</span><span>Task 2 essay</span></button></div><div class="grid-2"><section class="card card-pad"><div class="card-head"><div><h3 class="card-title">${task.label}</h3><p class="card-description">${mode === "task1" ? "Identify the overview before selecting details." : "Plan your position before you draft. Do not use a memorised template that ignores the question."}</p></div><span class="pill">${mode === "task1" ? "20 minutes" : "40 minutes"}</span></div><div class="writing-prompt"><strong>${esc(task.title)}</strong><br />${esc(task.prompt)}</div>${mode === "task1" ? `<div class="question-support" style="margin-top:16px;white-space:pre-line;line-height:1.8">${task.visual.map((line) => esc(line)).join("\n")}</div>` : ""}<div class="notice" style="margin-top:17px"><span>✦</span><div><strong>Evidence cue:</strong> ${mode === "task1" ? "write a clear overview, then compare the highest and lowest categories with accurate figures." : "state your position, give two developed reasons, and use a specific example."}</div></div></section><section class="card card-pad"><div class="card-head"><div><h3 class="card-title">Draft editor</h3><p class="card-description">Drafts, submissions, and revision history stay separate.</p></div></div><div class="field"><label for="writing-editor">Your response</label><textarea id="writing-editor" class="editor" data-writing-editor placeholder="Write your response here...">${esc(draft)}</textarea><div class="word-meter"><span id="writing-count">${wordCount(draft)} words</span><span>Recommended: ${mode === "task1" ? "150+" : "250+"} words</span></div></div><button class="button primary" style="margin-top:17px;width:100%" data-action="submit-writing">Submit for criterion feedback</button></section></div>${latest ? `<section class="card card-pad" style="margin-top:18px"><div class="card-head"><div><h3 class="card-title">Latest feedback</h3><p class="card-description">Version ${state.writingSubmissions.filter((submission) => submission.mode === mode).length} · ${formatDate(latest.date)} · heuristic estimate</p></div><span class="pill coral">Not official IELTS scoring</span></div><div class="score-grid">${[[mode === "task1" ? "Task achievement" : "Task response", latest.analysis.task], ["Coherence", latest.analysis.coherence], ["Lexical resource", latest.analysis.lexical], ["Grammar", latest.analysis.grammar]].map(([label, score]) => `<div class="criterion"><span>${label}</span><strong>${score.toFixed(1)}</strong><p>${score >= 6.5 ? "Evidence is developing." : "Needs targeted correction."}</p></div>`).join("")}</div><div class="grid-2" style="margin-top:17px"><div class="notice ${latest.analysis.words < (mode === "task1" ? 150 : 250) ? "warn" : ""}"><span>${latest.analysis.words < (mode === "task1" ? 150 : 250) ? "!" : "✓"}</span><div><strong>Word count: ${latest.analysis.words}</strong><br />${latest.analysis.words < (mode === "task1" ? 150 : 250) ? `The response is below the recommended ${mode === "task1" ? "150" : "250"} words; develop the evidence without adding irrelevant detail.` : "Length is within the recommended range; keep relevance and precision under control."}</div></div><div class="notice"><span>→</span><div><strong>Next exercise</strong><br />Rewrite one paragraph, then submit again. Revisions are stored as separate versions so repeated errors can be compared.</div></div></div></section>` : `<section class="card card-pad empty-state" style="margin-top:18px"><strong>No ${mode === "task1" ? "Task 1" : "Task 2"} evidence yet</strong><p>Submit a response to create criterion-level feedback. The app will never invent a writing score from onboarding alone.</p></section>`}`;
}

function renderSpeaking() {
  const part = state.speakingPart || "part2";
  const prompt = speakingPrompts[part];
  const latest = state.speakingSubmissions.find((submission) => submission.part === part);
  const draft = state.speakingDrafts?.[part] || latest?.text || "";
  const recording = state.speakingRecording || {};
  const isRecording = recording.status === "recording";
  return `<div class="hero"><div><div class="eyebrow">Speaking practice studio</div><h1>Develop the answer.</h1><p class="section-subtitle">Move from natural short answers to extended discussion. Recording is attempted only when the browser grants microphone access; typed fallback remains available.</p></div><span class="pill amber">${prompt.label}</span></div><div class="stepper" style="margin-bottom:18px">${["part1", "part2", "part3"].map((key, index) => `<button class="step ${part === key ? "active" : ""}" data-action="speaking-part" data-part="${key}"><span class="step-index">${index + 1}</span><span>${speakingPrompts[key].label}</span></button>`).join("")}</div><div class="grid-2"><section class="card card-pad"><div class="card-head"><div><h3 class="card-title">${prompt.title}</h3><p class="card-description">${prompt.target}</p></div><span class="pill amber">${part === "part1" ? "4–5 minutes" : part === "part2" ? "1 + 2 minutes" : "5–6 minutes"}</span></div><div class="writing-prompt">${esc(prompt.prompt)}</div><div class="notice warn" style="margin-top:17px"><span>◉</span><div><strong>Pronunciation boundary:</strong> typed text can support structure, vocabulary, and grammar observations only. Pronunciation is scored only when audio evidence exists.</div></div><div style="display:flex;gap:9px;flex-wrap:wrap;margin-top:17px"><button class="button ${isRecording ? "danger" : "secondary"}" data-action="${isRecording ? "stop-recording" : "start-recording"}">${isRecording ? "Stop recording" : "Record microphone attempt"}</button>${activeRecordingUrl && recording.status === "recorded" ? `<audio controls src="${activeRecordingUrl}" style="max-width:100%"></audio>` : ""}</div>${recording.status === "recorded" ? `<div class="notice" style="margin-top:12px"><span>✓</span><div><strong>Session recording saved in memory:</strong> ${recording.seconds || 0}s. It is not uploaded and may be lost on refresh.</div></div>` : ""}</section><section class="card card-pad"><div class="card-head"><div><h3 class="card-title">Text fallback</h3><p class="card-description">Write the answer as if you were speaking naturally. Drafts save by part.</p></div></div><div class="field"><label for="speaking-editor">Your spoken-style response</label><textarea id="speaking-editor" class="editor" data-speaking-editor placeholder="Start naturally, then add a reason, example, and reflection...">${esc(draft)}</textarea><div class="word-meter"><span id="speaking-count">${wordCount(draft)} words</span><span>Recommended: ${part === "part1" ? "30+" : "90+"} words</span></div></div><button class="button primary" style="margin-top:17px;width:100%" data-action="submit-speaking">Save speaking evidence</button></section></div>${latest ? `<section class="card card-pad" style="margin-top:18px"><div class="card-head"><div><h3 class="card-title">Structure feedback</h3><p class="card-description">${formatDate(latest.date)} · typed-response heuristic</p></div><span class="pill amber">Pronunciation ${latest.analysis.pronunciation ? "observed" : "not assessed"}</span></div><div class="score-grid">${[["Fluency & coherence", latest.analysis.fluency], ["Lexical resource", latest.analysis.vocab], ["Grammar", latest.analysis.grammar], ["Pronunciation", latest.analysis.pronunciation]].map(([label, score]) => `<div class="criterion"><span>${label}</span><strong>${score ? score.toFixed(1) : "—"}</strong><p>${score ? "Based on available evidence." : "Audio evidence required."}</p></div>`).join("")}</div><div class="notice" style="margin-top:17px"><span>→</span><div><strong>Next exercise:</strong> ${part === "part1" ? "add one natural follow-up detail without sounding memorised." : "extend each main point with a reason, concrete example, and short reflection."}</div></div></section>` : `<section class="card card-pad empty-state" style="margin-top:18px"><strong>No ${prompt.label} evidence yet</strong><p>Save a typed fallback or record an audio attempt. Pronunciation stays “Not assessed” without usable audio evidence.</p></section>`}`;
}

function toggleTask(taskId) {
  state.tasks[taskId] = !state.tasks[taskId];
  state.sessions.push({ date: new Date().toISOString(), minutes: state.tasks[taskId] ? 25 : 0, type: "task" });
  saveState();
  showToast(state.tasks[taskId] ? "Task recorded. Your next plan will keep this evidence." : "Task unchecked; it remains unfinished.");
  render();
}

function finishDiagnostic() {
  const ready = ["listening", "reading"].every((skill) => diagnosticQuestions[skill].every((question) => state.diagnostic.answers[question.id])) && wordCount(state.diagnostic.text.writing) >= 30 && wordCount(state.diagnostic.text.speaking) >= 20;
  if (!ready) return showToast("Complete every diagnostic section before calculating your baseline.");
  const scores = {};
  ["listening", "reading"].forEach((skill) => {
    const questions = diagnosticQuestions[skill];
    const correct = questions.filter((q) => state.diagnostic.answers[q.id] === q.correct).length;
    scores[skill] = { band: scoreBand(correct, questions.length), correct, total: questions.length, evidence: `${correct}/${questions.length} objective items · compact calibration` };
  });
  const writing = estimateWriting(state.diagnostic.text.writing);
  scores.writing = { band: writing.band, evidence: `${writing.words} typed words · heuristic rubric sample` };
  const speaking = estimateSpeaking(state.diagnostic.text.speaking);
  scores.speaking = { band: speaking.band, evidence: `${speaking.words} typed words · pronunciation not assessed` };
  state.diagnostic.status = "complete";
  state.diagnostic.completedAt = new Date().toISOString();
  state.diagnostic.results = { date: new Date().toISOString(), scores, note: "Calculated from this learner’s submitted diagnostic responses." };
  createPlan();
  saveState();
  state.route = "diagnostic";
  showToast("Baseline recorded. Your 30-day roadmap is ready.");
  render();
}

function finishWriting() {
  const text = document.querySelector("#writing-editor")?.value.trim() || "";
  if (wordCount(text) < 20) return showToast("Write at least 20 words so the feedback has real evidence.");
  const analysis = estimateWriting(text);
  state.writingSubmissions.unshift({ date: new Date().toISOString(), text, analysis });
  if (analysis.words < 250) recordError({ skill: "writing", category: "Task-response issue", questionId: "writing-word-count", question: "Develop a 250-word Task 2 response", answer: `${analysis.words} words`, correct: "250+ words recommended", explanation: "A short response limits development; add explanation and a specific example.", severity: 2 });
  saveState();
  showToast("Writing evidence saved with a prioritised feedback snapshot.");
  render();
}

function finishSpeaking() {
  const text = document.querySelector("#speaking-editor")?.value.trim() || "";
  if (wordCount(text) < 20) return showToast("Write at least 20 words so the structure feedback has evidence.");
  const analysis = estimateSpeaking(text);
  state.speakingSubmissions.unshift({ date: new Date().toISOString(), text, analysis });
  if (analysis.words < 90) recordError({ skill: "speaking", category: "Insufficient development", questionId: "speaking-development", question: "Develop a Part 2 answer", answer: `${analysis.words} words`, correct: "90+ words recommended", explanation: "Add a reason, concrete example, and reflection to make the response more developed.", severity: 2 });
  saveState();
  showToast("Speaking structure evidence saved. Pronunciation remains unassessed.");
  render();
}

function submitReading() {
  const unanswered = readingPractice.filter((q) => !state.practice.readingAnswers[q.id]);
  if (unanswered.length) return showToast(`Answer ${unanswered.length} more reading question${unanswered.length > 1 ? "s" : ""} before submitting.`);
  readingPractice.forEach((q) => {
    if (state.practice.readingAnswers[q.id] !== q.correct) recordError({ skill: "reading", category: q.type === "True / False / Not Given" ? "Incorrect inference" : "Failure to locate textual evidence", questionId: q.id, question: q.prompt, answer: state.practice.readingAnswers[q.id], correct: q.correct, explanation: q.explanation, difficulty: q.difficulty, severity: q.difficulty === "Advanced" ? 3 : 2 });
  });
  state.practice.readingSubmitted = true;
  saveState();
  showToast("Reading results recorded. Open Error notebook to see what changes next.");
  render();
}

function submitListening() {
  const unanswered = diagnosticQuestions.listening.filter((q) => !state.practice.listeningAnswers[q.id]);
  if (unanswered.length) return showToast(`Answer ${unanswered.length} more listening question${unanswered.length > 1 ? "s" : ""} before submitting.`);
  diagnosticQuestions.listening.forEach((q) => {
    if (state.practice.listeningAnswers[q.id] !== q.correct) recordError({ skill: "listening", category: q.type === "Distractor recognition" ? "Distractor selection" : q.type === "Spelling and plural" ? "Spelling or word-limit error" : "Failure to locate evidence", questionId: q.id, question: q.prompt, answer: state.practice.listeningAnswers[q.id], correct: q.correct, explanation: q.explanation, difficulty: q.difficulty, severity: q.difficulty === "Advanced" ? 3 : 2 });
  });
  state.practice.listeningSubmitted = true;
  saveState();
  showToast("Listening results recorded with the audio limitation preserved.");
  render();
}

async function askTutor() {
  const input = document.querySelector("#tutor-input");
  const question = input?.value.trim();
  if (!question) return showToast("Write a question for the tutor first.");
  const lower = question.toLowerCase();
  let answer = "Start with one recorded weakness. Complete a focused drill, explain the evidence in your own words, and then reattempt a new item so improvement is measurable.";
  let source = "Local evidence fallback";
  const top = priorityData()[0];
  if (lower.includes("true") || lower.includes("false") || lower.includes("not given")) answer = "For True / False / Not Given, separate contradiction, support, and absence. Underline the exact sentence that supports your decision; if the passage neither confirms nor contradicts the statement, choose Not Given.";
  else if (lower.includes("writing") || lower.includes("essay")) answer = "For Writing, prioritise task completion first: state a clear position, group ideas logically, explain each reason, and add a relevant example. Then revise one repeated grammar or word-choice pattern instead of correcting everything at once.";
  else if (lower.includes("speaking") || lower.includes("pronunciation")) answer = "Develop speaking answers with a reason, a concrete example, and a short reflection. Pronunciation can only be discussed when audio evidence exists; typed text cannot prove it.";
  else if (top) answer = `Your highest recorded priority is ${skillMeta[top.skill]?.label || top.skill} · ${top.category}. It has ${top.count} recorded attempt${top.count === 1 ? "" : "s"}. Use the explanation attached to the error, then practise a nearby but new item.`;
  try {
    const response = await fetch("/api/tutor", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        question,
        context: {
          topPriority: top ? { skill: top.skill, category: top.category, count: top.count } : null,
          openErrors: (state.errors || []).filter((error) => !error.corrected).slice(0, 8).map((error) => ({ skill: error.skill, category: error.category, question: error.question, correct: error.correct })),
          scores: getScores(),
        },
      }),
    });
    if (response.ok) {
      const payload = await response.json();
      if (payload.answer) {
        answer = payload.answer;
        source = "OpenAI Responses API";
      }
    }
  } catch (error) {
    console.warn("AI tutor unavailable; using local evidence fallback.", error);
  }
  state.tutor.messages = [...(state.tutor.messages || []), { role: "user", text: question, date: new Date().toISOString() }, { role: "tutor", text: answer, source, date: new Date().toISOString() }].slice(-12);
  saveState(); render();
}

function endStudyDay() {
  if (!state.plan) return showToast("Complete the diagnostic before ending a study day.");
  const today = planForToday();
  const completed = today?.tasks.filter((task) => state.tasks[task.id]).length || 0;
  if (completed === 0) return showToast("Record at least one completed task before moving to the next day.");
  state.plan.currentDay = Math.min(30, (state.plan.currentDay || 1) + 1);
  const oldCurrent = state.plan.currentDay;
  createPlan();
  state.plan.currentDay = oldCurrent;
  saveState();
  showToast(`Day ${Math.min(30, oldCurrent - 1)} closed. Day ${oldCurrent} was regenerated from your current evidence.`);
  render();
}

function submitMock() {
  const questions = [...diagnosticQuestions.listening.slice(0, 2), ...diagnosticQuestions.reading.slice(0, 2)];
  const unanswered = questions.filter((q) => !state.mock.answers[q.id]);
  if (unanswered.length) return showToast("Answer every mock item or intentionally leave it for review before submitting.");
  const sections = {};
  ["listening", "reading"].forEach((skill) => { const qs = questions.filter((q) => q.id.startsWith(skill[0])); const correct = qs.filter((q) => state.mock.answers[q.id] === q.correct).length; sections[skill] = { correct, total: qs.length, band: scoreBand(correct, qs.length) }; qs.forEach((q) => { if (state.mock.answers[q.id] !== q.correct) recordError({ skill, category: q.type === "True / False / Not Given" ? "Incorrect inference" : "Distractor selection", questionId: q.id, question: q.prompt, answer: state.mock.answers[q.id], correct: q.correct, explanation: q.explanation, severity: 2 }); }); });
  state.mock.status = "submitted";
  state.mock.result = { date: new Date().toISOString(), ...sections };
  saveState();
  showToast("Mock submitted. Deep review is ready.");
  render();
}

function exportData() {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a"); link.href = url; link.download = `ielts-elite-export-${new Date().toISOString().slice(0, 10)}.json`; link.click(); URL.revokeObjectURL(url);
  showToast("Learner data exported as JSON.");
}

function editProfile() {
  const name = window.prompt("Name", state.profile.name);
  if (name && name.trim()) { state.profile.name = name.trim(); saveState(); render(); showToast("Profile updated."); }
}

function showQA() {
  const modal = document.createElement("div");
  modal.className = "modal-backdrop";
  modal.innerHTML = `<div class="modal"><div class="modal-head"><h3>Manual QA checklist</h3><button class="close-btn" data-action="close-modal">×</button></div><p class="muted tiny" style="line-height:1.6">Use this checklist to verify the continuous journey in a fresh browser profile. Items are not marked as passed by the app automatically.</p><div class="stack" style="margin-top:17px">${["Create a profile and confirm the honest empty state.", "Leave the diagnostic unfinished, refresh, and resume.", "Complete all four sections and confirm the roadmap is generated.", "Submit repeated wrong answers and confirm Error notebook priority rises.", "Submit a Writing response and save a revision.", "Use Speaking text fallback and confirm pronunciation stays unassessed.", "Start a mock, answer items, refresh, then submit for deep review.", "Export JSON, reopen the app, and confirm local progress remains."].map((item, i) => `<label class="checkbox-row" style="border-bottom:1px solid #edf0ec"><input type="checkbox" /> <span>${i + 1}. ${item}</span></label>`).join("")}</div></div>`;
  document.body.appendChild(modal);
}

document.addEventListener("submit", (event) => {
  if (event.target.id !== "onboarding-form") return;
  event.preventDefault();
  const form = new FormData(event.target);
  state.profile = { name: String(form.get("name") || "Learner").trim(), examDate: String(form.get("examDate") || ""), targetBand: String(form.get("targetBand") || "7.0"), hours: Number(form.get("hours") || 9), language: String(form.get("language") || "English"), strengths: String(form.get("strengths") || "") };
  state.settings.language = state.profile.language;
  state.route = "diagnostic";
  state.diagnostic.startedAt = new Date().toISOString();
  state.diagnostic.status = "in-progress";
  saveState();
  showToast("Profile created. Your measured baseline starts now.");
  render();
});

document.addEventListener("input", (event) => {
  if (event.target.matches("[data-diagnostic-text]")) { state.diagnostic.text[event.target.dataset.diagnosticText] = event.target.value; saveState(); }
  if (event.target.matches("[data-writing-editor]")) { state.writingDrafts[state.writingMode || "task2"] = event.target.value; saveState(); const count = document.querySelector("#writing-count"); if (count) count.textContent = `${wordCount(event.target.value)} words`; }
  if (event.target.matches("[data-speaking-editor]")) { state.speakingDrafts[state.speakingPart || "part2"] = event.target.value; saveState(); const count = document.querySelector("#speaking-count"); if (count) count.textContent = `${wordCount(event.target.value)} words`; }
  if (event.target.matches("[data-mock-text]")) { state.mock.text[event.target.dataset.mockText] = event.target.value; saveState(); }
});

document.addEventListener("change", (event) => {
  const action = event.target.dataset.action;
  if (action === "toggle-task") toggleTask(event.target.dataset.taskId);
  if (action === "diagnostic-answer") { state.diagnostic.answers[event.target.dataset.questionId] = event.target.value; state.diagnostic.status = "in-progress"; saveState(); render(); }
  if (action === "listening-answer") { state.practice.listeningAnswers[event.target.dataset.questionId] = event.target.value; saveState(); render(); }
  if (action === "reading-answer") { state.practice.readingAnswers[event.target.dataset.questionId] = event.target.value; saveState(); render(); }
  if (action === "mock-answer") { state.mock.answers[event.target.dataset.questionId] = event.target.value; saveState(); render(); }
  if (action === "vocab-answer" || action === "grammar-answer") { state.language.answers[event.target.dataset.itemId] = event.target.value; const item = action === "vocab-answer" ? languageItems.find((i) => i.id === event.target.dataset.itemId) : grammarItems.find((i) => i.id === event.target.dataset.itemId); if (item && event.target.value === item.correct) { const list = action === "vocab-answer" ? state.language.vocabMastered : state.language.grammarMastered; if (!list.includes(item.id)) list.push(item.id); } saveState(); render(); }
  if (action === "change-language") { state.settings.language = event.target.value; saveState(); showToast("Explanation preference saved."); }
});

document.addEventListener("click", (event) => {
  const target = event.target instanceof Element ? event.target.closest("[data-action]") : null;
  if (!target) return;
  const action = target.dataset.action;
  if (action === "nav") { state.route = target.dataset.route; document.querySelector("#sidebar")?.classList.remove("open"); render(); }
  if (action === "toggle-sidebar") document.querySelector("#sidebar")?.classList.toggle("open");
  if (action === "diagnostic-skill") { state.diagnostic.activeSkill = target.dataset.skill; saveState(); render(); }
  if (action === "diagnostic-next") {
    const active = state.diagnostic.activeSkill; const questions = diagnosticQuestions[active];
    if (active === "listening" || active === "reading") { const unanswered = questions.filter((q) => !state.diagnostic.answers[q.id]); if (unanswered.length) return showToast("Choose an answer before moving on."); }
    else if (wordCount(state.diagnostic.text[active]) < (active === "writing" ? 30 : 20)) return showToast(`Add at least ${active === "writing" ? 30 : 20} words of evidence first.`);
    const skills = ["listening", "reading", "writing", "speaking"]; const index = skills.indexOf(active); if (index < skills.length - 1) { state.diagnostic.activeSkill = skills[index + 1]; saveState(); render(); } else finishDiagnostic();
  }
  if (action === "submit-reading") submitReading();
  if (action === "reset-reading") { state.practice.readingAnswers = {}; state.practice.readingSubmitted = false; saveState(); render(); }
  if (action === "speak-listening") { if ("speechSynthesis" in window) { window.speechSynthesis.cancel(); const text = diagnosticQuestions.listening.map((question) => question.support.replace(/^Text fallback[^:]*:\s*/, "")).join(" "); const utterance = new SpeechSynthesisUtterance(text); utterance.rate = 0.92; window.speechSynthesis.speak(utterance); showToast("Playing the clearly labelled text-to-speech fallback."); } else showToast("Text-to-speech is unavailable; use the evidence text."); }
  if (action === "submit-listening") submitListening();
  if (action === "reset-listening") { state.practice.listeningAnswers = {}; state.practice.listeningSubmitted = false; saveState(); render(); }
  if (action === "submit-writing") finishWriting();
  if (action === "submit-speaking") finishSpeaking();
  if (action === "writing-mode") { state.writingMode = target.dataset.mode; saveState(); render(); }
  if (action === "speaking-part") { state.speakingPart = target.dataset.part; saveState(); render(); }
  if (action === "start-recording") startRecording();
  if (action === "stop-recording") stopRecording();
  if (action === "ask-tutor") askTutor();
  if (action === "end-study-day") endStudyDay();
  if (action === "complete-revision") reviewRevision(target.dataset.revisionId, false);
  if (action === "delay-revision") reviewRevision(target.dataset.revisionId, true);
  if (action === "start-session") { state.sessions.push({ date: new Date().toISOString(), minutes: 25, type: "focus" }); saveState(); showToast("Focus session started. Timer fallback recorded as 25 minutes."); render(); }
  if (action === "start-mock") { state.mock = { status: "in-progress", answers: {}, text: { writing: "", speaking: "" }, startedAt: new Date().toISOString(), result: null }; state.route = "mock"; saveState(); render(); }
  if (action === "submit-mock") submitMockEnhanced();
  if (action === "reset-mock") { state.mock = { status: "not-started", answers: {}, text: { writing: "", speaking: "" }, startedAt: null, result: null }; saveState(); render(); }
  if (action === "mark-top-corrected") { const open = state.errors.find((error) => !error.corrected); if (open) { open.corrected = true; saveState(); showToast("Correction recorded. Priority will fall on the next refresh."); render(); } else showToast("No open error to mark."); }
  if (action === "export-data") exportData();
  if (action === "edit-profile") editProfile();
  if (action === "toggle-reminders") { state.settings.reminders = !state.settings.reminders; saveState(); render(); }
  if (action === "reset-state") { if (window.confirm("Reset all local learner data? This cannot be undone.")) { localStorage.removeItem(STORAGE_KEY); state = blankState(); saveState(); render(); showToast("Local learner space reset."); } }
  if (action === "show-qa") showQA();
  if (action === "close-modal") target.closest(".modal-backdrop")?.remove();
});

async function bootstrap() {
  try {
    const response = await fetch(SERVER_STATE_ENDPOINT, { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const payload = await response.json();
    if (payload.exists && payload.state) {
      state = mergeState(blankState(), payload.state);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } else {
      const writeResponse = await fetch(SERVER_STATE_ENDPOINT, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(state) });
      if (!writeResponse.ok) throw new Error(`HTTP ${writeResponse.status}`);
      const writePayload = await writeResponse.json();
      serverUpdatedAt = writePayload.updatedAt || null;
    }
    serverSyncReady = true;
  } catch (error) {
    serverSyncReady = false;
    console.warn("SQLite server unavailable; using browser recovery mode.", error);
  }
  render();
}

bootstrap();
