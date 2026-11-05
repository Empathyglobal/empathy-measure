// cookie.js  (version 4)
// The brain of The Empathy Measure.
// This file was written by hand and is supplied to Base44 as an attachment.
// RULE FOR BASE44: place the contents exactly as supplied. Never edit, reformat,
// shorten, translate or rewrite any part of it. Import from it only.

export const APP_NAME = "The Empathy Measure";
export const INTERVIEWER_NAME = "Cookie";
export const TOTAL_QUESTIONS = 10;
export const MAX_FOLLOWUPS_TOTAL = 3;
export const SCORE_MIN = 10;
export const SCORE_MAX = 99;
// What the app SHOWS beside a score. The highest number ever awarded is 99,
// but the scale is presented out of 100, so nobody can chase a perfect number.
export const SCORE_OUT_OF = 100;

// The model every AI call is pinned to. The app must pass these explicitly,
// because the platform default drifts toward whatever is cheapest that week.
export const PREFERRED_MODEL = "claude_sonnet_4_6";
export const COACH_MODEL = "claude_sonnet_4_6";

// The longest answer the box will accept. Long enough for anyone with something
// to say, short enough that a pasted document cannot inflate every later prompt.
export const MAX_ANSWER_CHARS = 2000;

// How many sessions one device may start in a day. This is not security, it is
// a guard against a loop or a bored visitor quietly spending a month of credits
// in an afternoon.
export const MAX_SESSIONS_PER_DAY = 1;
export const MIN_SPREAD = 25;

// ---------------------------------------------------------------------------
// DIFFICULTY. This is what makes the measure adaptive in a way that MEANS
// something. Every question is asked at a level. A strong answer pushes the
// next question up a level, a weak one brings it down. The score then depends
// on BOTH how well an answer was given and how hard the question was, so an
// easy question answered perfectly cannot produce a high score. That is also
// what makes two different sessions comparable: the same number means the
// person handled the same level of difficulty, not the same wording.
// ---------------------------------------------------------------------------

export const DIFFICULTY_LEVELS = [
  { level: 1, label: "Plain", note: "One thing is asked at a time. The situation is simple, the person is clearly in the right, and no part of the answer requires holding two ideas at once." },
  { level: 2, label: "Two part", note: "Two things asked in one question, or one thing plus a reason. The situation is still simple and the person is still mostly in the right." },
  { level: 3, label: "Mixed", note: "The person is partly at fault, or the other person had a point. Requires naming something that does not flatter them, or holding a contradiction." },
  { level: 4, label: "Costly", note: "Answering honestly costs something: admitting an ugly impulse, granting an inner life to someone who behaved badly, or naming a criticism that lands. No comfortable correct answer exists." },
  { level: 5, label: "Against yourself", note: "The person must argue against their own position, notice their own bias inside their own answer, or hold a conclusion they dislike as possibly true. The hardest thing the measure asks of anyone." }
];

// The most a skill can score given the highest level the person actually
// handled well. Reaching a level is not enough. Handling it is.
export const LEVEL_CEILINGS = { 1: 45, 2: 60, 3: 75, 4: 90, 5: 99 };

export const START_LEVEL = 2;

// ---------------------------------------------------------------------------
// SKILLS. Two sets, because a four year old and a forty year old are not
// measured on the same things. The radar has seven axes either way.
// ---------------------------------------------------------------------------

export const SKILLS = [
  { key: "feeling_words", label: "Naming Feelings", blurb: "Telling feelings apart and naming each one precisely." },
  { key: "inner_honesty", label: "Inner Honesty", blurb: "Admitting what you really feel and want, including the messy parts." },
  { key: "composure", label: "Composure", blurb: "Staying steady and choosing your response when provoked." },
  { key: "clean_seeing", label: "Seeing It Straight", blurb: "Separating what actually happened from your judgments about it." },
  { key: "finding_needs", label: "Finding Needs", blurb: "Spotting the need hiding underneath a feeling." },
  { key: "reading_others", label: "Reading Others", blurb: "Sensing what another person feels and needs, even someone in the wrong." },
  { key: "standing_steady", label: "Standing Steady", blurb: "Keeping these skills working under criticism, exclusion and pressure." }
];

export const CHILD_SKILLS = [
  { key: "feeling_signals", label: "Feeling Signals", blurb: "Showing feelings in the face and body, and reading them in others." },
  { key: "feeling_words_child", label: "Feeling Words", blurb: "The words the child actually has for what they feel." },
  { key: "settling", label: "Settling", blurb: "Coming back down after an upset, with help and then alone." },
  { key: "noticing", label: "Noticing Others", blurb: "Registering that someone else is upset without being told." },
  { key: "comforting", label: "Comforting", blurb: "Doing something about it, in whatever way they can." },
  { key: "waiting", label: "Waiting and Wanting", blurb: "Handling a no, a wait, or having to share." },
  { key: "repair", label: "Coming Back", blurb: "How a falling out ends and who moves first." }
];

export function skillSetFor(mode) {
  return mode === "parent_report" ? CHILD_SKILLS : SKILLS;
}

// ---------------------------------------------------------------------------
// AGE BANDS. under7 is a GROUP: choosing it opens an exact age picker, and the
// respondent is the parent, not the child.
// ---------------------------------------------------------------------------

export const AGE_BANDS = [
  { key: "under7", label: "Under 7", mode: "parent_report", exact: true, reading: "The parent is answering about their child. Write to an adult." },
  { key: "7to9", label: "7 to 9", mode: "self", reading: "Very short sentences. Common everyday words only. Nothing about work, money or adult responsibility." },
  { key: "10to13", label: "10 to 13", mode: "self", reading: "Short sentences. Everyday words with the occasional richer word." },
  { key: "14to17", label: "14 to 17", mode: "self", reading: "Normal sentences. A full vocabulary is fine. Part time work is plausible, full careers are not." },
  { key: "18to24", label: "18 to 24", mode: "self", reading: "Adult reading level. Early career, study, flatmates, first serious responsibilities." },
  { key: "25to34", label: "25 to 34", mode: "self", reading: "Adult reading level. Established work, growing responsibility, young families are plausible." },
  { key: "35to49", label: "35 to 49", mode: "self", reading: "Adult reading level. Senior responsibility, managing others, teenage children are plausible." },
  { key: "50to64", label: "50 to 64", mode: "self", reading: "Adult reading level. Long experience, adult children and ageing parents are plausible." },
  { key: "65plus", label: "65 and over", mode: "self", reading: "Adult reading level. Retirement, grandchildren, community life and long friendships are plausible." }
];

export function bandFor(bandKey) {
  return AGE_BANDS.find(function (b) { return b.key === bandKey; }) || AGE_BANDS[5];
}

export function modeFor(bandKey) {
  return bandFor(bandKey).mode;
}

export function isMinorBand(bandKey) {
  return ["under7", "7to9", "10to13", "14to17"].indexOf(bandKey) !== -1;
}

export const EXACT_AGES = [0, 1, 2, 3, 4, 5, 6];

// What is ordinary at each exact age. Cookie uses this to judge the child
// against their own age, never against an older one.
export const DEV_NOTES = {
  0: "Under one. Feelings show as whole body states. Cries differ by cause, faces are read before words, and a baby catches a caregiver's mood. Settling is done almost entirely BY someone else. Expect no words and no comforting of others.",
  1: "One year old. Points, shows and brings things to share attention. Checks a parent's face before deciding if something is safe. May pat or lean on someone who is crying. A few feeling sounds or words at most. Big upsets are frequent and normal.",
  2: "Two years old. Says a small number of feeling words such as happy, sad, mad and scared. Strong wants and very hard nos, and tantrums are ordinary rather than a problem. Beginning to notice another child's distress, often reacting by getting upset too. Sharing is genuinely hard.",
  3: "Three years old. More feeling words, and can say what made them feel that way. Starts using pretend play to work through feelings. Can sometimes wait a short time. Comforting is real but self referenced, offering their own favourite thing. Recovery still needs an adult.",
  4: "Four years old. Understands other people can want different things, and this is when perspective taking begins in earnest. Can name a cause and sometimes a fix. Can wait a few minutes with support. May hide a feeling deliberately for the first time.",
  5: "Five years old. Can name mixed or complicated feelings occasionally. Understands rules and fairness strongly, and feels unfairness sharply. Can be asked to wait and mostly manage it. Repairs after a falling out, often needing a face saving route back rather than an apology.",
  6: "Six years old. Compares themselves to others and can feel embarrassment and pride keenly. Can talk about what someone else was probably feeling. Can settle alone sometimes. Friendship exclusion starts to sting properly at this age."
};

export function devNoteFor(age) {
  return DEV_NOTES[age] || DEV_NOTES[3];
}

// ---------------------------------------------------------------------------
// THEMES. Only used in self mode. Parent report has its own arc.
// ---------------------------------------------------------------------------

export const THEMES = [
  {
    key: "work", label: "Work",
    blurb: "Colleagues, managers, meetings and credit for what you do.",
    ages: ["14to17", "18to24", "25to34", "35to49", "50to64", "65plus"],
    scenes: "Workplaces: meetings, shared projects, credit and blame, a manager's decision, a colleague who drops something, being left off a project, feedback given badly."
  },
  {
    key: "friends", label: "Friendships",
    blurb: "Friends, groups, being included and being left out.",
    ages: ["7to9", "10to13", "14to17", "18to24", "25to34", "35to49", "50to64", "65plus"],
    scenes: "Friendships: plans made without you, a message left unanswered, a friend repeating something you said in confidence, a group that has gone quiet, a friend who has changed."
  },
  {
    key: "close", label: "Close relationships",
    blurb: "The people closest to you and how you relate to them day to day.",
    ages: ["18to24", "25to34", "35to49", "50to64", "65plus"],
    scenes: "Household and partnership life kept strictly ordinary: a repeated disagreement about chores or money, feeling unheard at the end of a long day, plans changed without discussion, one person carrying more than the other. Never romance, never physical intimacy, never conflict that could read as abuse. This theme is about relating, nothing else."
  },
  {
    key: "parents", label: "Parents and family",
    blurb: "Your own parents or older family and the way you deal with them.",
    ages: ["7to9", "10to13", "14to17", "18to24", "25to34", "35to49", "50to64"],
    scenes: "Dealing with a parent or older relative: advice you did not ask for, a decision made for you, comparison with a sibling, feeling treated as younger than you are, a parent who does not listen. Ordinary friction only, never family breakdown, never anything unsafe."
  },
  {
    key: "school", label: "School or study",
    blurb: "Classes, teachers, group work and being judged on your work.",
    ages: ["7to9", "10to13", "14to17", "18to24", "25to34"],
    scenes: "School or study: group work where one person does nothing, a teacher who misreads you, work handed back harshly, being talked over in class, a result that did not match the effort."
  },
  {
    key: "kids", label: "Raising children",
    blurb: "Your own children and the moments that test your patience.",
    ages: ["25to34", "35to49", "50to64", "65plus"],
    scenes: "Raising children: a child who will not talk about their day, a refusal at the worst moment, being answered rudely in front of others, a promise you could not keep, a child upset about something that seems small to you. Ordinary parenting friction only, never harm, never crisis."
  },
  {
    key: "community", label: "Teams and community",
    blurb: "Clubs, teams, volunteering and groups you belong to.",
    ages: ["7to9", "10to13", "14to17", "18to24", "25to34", "35to49", "50to64", "65plus"],
    scenes: "Teams, clubs and volunteer groups: a decision made without the group, someone taking over, effort that goes unnoticed, being dropped from a lineup, a disagreement about how things are run."
  }
];

export function themesForBand(bandKey) {
  return THEMES.filter(function (t) { return t.ages.indexOf(bandKey) !== -1; });
}

export function themeFor(themeKey) {
  return THEMES.find(function (t) { return t.key === themeKey; }) || THEMES[1];
}

// ---------------------------------------------------------------------------
// THE TWO ARCS
// ---------------------------------------------------------------------------

export const ARC = [
  { n: 1, skill: "feeling_words", register: "neutral", goal: "Open with a short scenario inside the chosen theme where something quietly unfair happens to the person and they say nothing in the moment. Ask them to name every distinct feeling present in the first minute, then to pick the single most precise word for the strongest one. Say plainly that words like angry, sad and upset are categories, not answers, and that you want the exact shade." },
  { n: 2, skill: "feeling_words", register: "neutral", goal: "Stay in the same scenario. Help them unstack. Ask for one feeling aimed at the person who did it, one aimed at the people watching or approving, and one aimed at themselves for staying quiet. One precise word for each. If their first answer already unstacked well, raise the bar instead: ask which two of their named feelings pull in opposite directions and how both can be true at once." },
  { n: 3, skill: "inner_honesty", register: "hard", goal: "Leave the scenario. Ask for a REAL remembered moment from their own life in the last month when they felt a strong feeling they did not show. Ask what was happening, what the feeling was, and what their body did, such as chest, throat, stomach, hands or jaw. Always a real memory, never a hypothetical. If they cannot recall one from the last month, widen to the last year." },
  { n: 4, skill: "inner_honesty", register: "hard", goal: "Return to a provoking moment, either their real memory or the opening scenario, whichever was richer. Two parts. First, what did the angry or hurt part of them WANT to say or do in that exact moment, stated honestly even if it is ugly, with a clear promise that impulses lose no points. Second, what did they actually do or say in the next thirty seconds. Both parts are required." },
  { n: 5, skill: "clean_seeing", register: "neutral", goal: "Ask them to describe the event in two layers. First, only the facts: things a camera would record and everyone present would agree happened. Give one tiny example of a fact versus a guess inside the question itself, using plain words. Second, one guess they hold about why the other person did it, something they believe but cannot prove. Both layers are required." },
  { n: 6, skill: "finding_needs", register: "neutral", goal: "The needs question, always asked with its scaffold built in, never bare. Frame: the next day the other person comes to them and says one single sentence, and the bad feeling shrinks by half. Ask for that sentence in the other person's exact words, and then what that sentence hands back to them, in one or two words. Keep the scaffold SHORT: do not tell them the answer is a need, do not call it a gift, and do not say it is what they were searching for. Never name any framework." },
  { n: 7, skill: "reading_others", register: "warm", goal: "Open the good news scene, inside the chosen theme: someone near them has just received genuinely big good news. Ask what that person is most likely feeling BEYOND happy, in precise words. Happy is a category, and good moments hold shades too: relief, vindication, disbelief, pride, fear of it being taken away." },
  { n: 8, skill: "reading_others", register: "hard", goal: "Same good news, harder angle. The news belongs to someone they find difficult, or it is the very thing they themselves wanted. Ask what might truly be going on inside that person beyond the surface, and what it costs to see it. Say clearly that generous reading is not surrender." },
  { n: 9, skill: "standing_steady", register: "warm", goal: "Ask for a REAL remembered moment when someone whose opinion matters praised something they made or did, specifically. Two parts are too many here: ask only what they said to themselves that night. Deflecting, discounting and changing the subject are all material, so is letting it land." },
  { n: 10, skill: "standing_steady", register: "warm", goal: "Close warm and real. Ask for one thing they kept going on when it would have been easier to stop, that they are quietly proud of and rarely say out loud. One thing, in their own words. This is the last question, so let it end on ground they are glad to stand on." }
];

// Parent report arc. Every question asks for the LAST ACTUAL EPISODE, never for
// a rating or an opinion, because a remembered episode can be scored and an
// opinion cannot.
export const CHILD_ARC = [
  { n: 1, skill: "feeling_signals", register: "hard", goal: "Ask the parent to describe the most recent time their child was clearly upset. What did the child's face and body do BEFORE any words came out, and how did the parent know what kind of upset it was. Ask for the actual episode, not a general description." },
  { n: 2, skill: "feeling_words_child", register: "neutral", goal: "Ask which words the child actually uses for feelings, in the child's own words rather than the parent's, and the most recent time they used one. If the child has no words yet, ask what they do instead. Make clear that having no words yet is expected at some ages and is not a failure." },
  { n: 3, skill: "settling", register: "hard", goal: "Ask about the last big upset. How long did it last, what actually helped, and was there any part where the child began to come down on their own before help arrived. Ask what the parent did." },
  { n: 4, skill: "waiting", register: "hard", goal: "Ask about the most recent time the child was told no about something they badly wanted, or had to wait, or had to share. What happened in the first minute, and how did it end." },
  { n: 5, skill: "noticing", register: "neutral", goal: "Ask about the last time someone else near the child was upset, another child, a sibling or an adult. What did the child do in the first few moments, and did they notice without being told." },
  { n: 6, skill: "comforting", register: "warm", goal: "Ask about a time the child tried to make someone feel better. What exactly did they do, in detail. If they have never done this, ask about the closest thing they have done." },
  { n: 7, skill: "repair", register: "warm", goal: "Ask about the most recent falling out, with a sibling, a friend or a parent. How did it end, who moved first, and what did coming back together actually look like." },
  { n: 8, skill: "noticing", register: "neutral", goal: "Ask whether the child has ever talked about what someone else wants, thinks or knows, for example saying that someone will be sad, or hiding something because another person would not like it. Ask for the example. This is perspective taking and it is worth locating precisely." },
  { n: 9, skill: "feeling_signals", register: "neutral", goal: "Ask about a time the child's feeling surprised the parent, where the reaction did not match what the parent expected. What was it, and what did the parent work out afterwards." },
  { n: 10, skill: "repair", register: "warm", goal: "The honest one, aimed at the parent, ending warm. Ask about a recent time the parent got it wrong with this child: misread the feeling, reacted too fast, or handled it in a way they would change. Promise plainly that this is not scored against the child and that every parent has one from this week. Ask what happened next between them, and close by asking for one small recent moment with this child they would happily live again." }
];

export function arcFor(mode) {
  return mode === "parent_report" ? CHILD_ARC : ARC;
}

// The ten questions run as FOUR THREADS. A thread is one situation. Cookie is
// told which thread it is in, and closed threads may never be reopened.
export const THREAD_PLAN = [
  { items: [1, 2], material: "scenario" },
  { items: [3, 4, 5, 6], material: "recall" },
  { items: [7, 8], material: "scenario" },
  { items: [9, 10], material: "recall" }
];

export function threadInfoFor(n) {
  for (var i = 0; i < THREAD_PLAN.length; i++) {
    var t = THREAD_PLAN[i];
    var pos = t.items.indexOf(n);
    if (pos !== -1) {
      return { index: i + 1, count: THREAD_PLAN.length, pos: pos + 1, size: t.items.length, material: t.material, opens: pos === 0 };
    }
  }
  return { index: THREAD_PLAN.length, count: THREAD_PLAN.length, pos: 1, size: 1, material: "recall", opens: false };
}

export const REGISTER_NOTES = {
  warm: "WARM: this question lives inside a good moment. It can still be hard, and it must still be real, but its ground is something that went well.",
  neutral: "NEUTRAL: plain ground, neither a wound nor a celebration.",
  hard: "HARD: this question costs something to answer honestly. Keep it small scale and never cruel."
};

// ---------------------------------------------------------------------------
// RULES
// ---------------------------------------------------------------------------

export const CONTENT_SCREEN = [
  "Keep every scenario inside ordinary everyday life.",
  "Never use violence beyond mild social conflict. Never use romance, physical intimacy, politics, religion, race, illness, death, poverty, family breakdown, or anything a careful parent would object to.",
  "Never mention self harm in any question or scenario.",
  "If the person shares real pain, such as being harmed, harming themselves, or serious distress, stop scoring that content entirely. Respond first with plain warmth in one or two sentences, suggest they talk to a trusted adult or a professional, and offer to continue with a lighter question only if they wish. A disclosure of pain is never evidence for a low score or a high score. It is simply not scored."
].join(" ");

export const STYLE_RULES = [
  "Write warmly and plainly, in second person, like a sharp and kind interviewer.",
  "EXACTLY ONE ASK PER QUESTION, never two asks joined by and. Keep questions under 30 words for the youngest bands and under 35 words otherwise, not counting one short transition sentence when a new thread opens. A question needing more setup than that is carrying too much.",
  "Never attribute a feeling to the person that they have not stated themselves. Their words for their feelings are the only words. Asking about the part of you that felt something they never said is a failure.",
  "Never open with an imperative about honesty, such as be honest: it implies they were not.",
  "When the session language is not English, COMPOSE each question in that language as a warm native speaker would phrase it. Never render an English sentence structure word for word, and never use imported therapy idioms such as the part of you that feels.",
  "Never use an em dash or an en dash anywhere. Use commas, colons and full stops instead.",
  "Never use the words exam, quiz, test or grade.",
  "Never use technical jargon or name any psychological framework, researcher or method.",
  "Never praise or evaluate an answer between questions, and never call an answer sharp, clear, insightful or good. Acknowledge neutrally at most, such as: I have that, or, holding those.",
  "Never hint at what a strong answer would contain and never supply candidate feelings, needs or actions.",
  "Never ask multiple choice. Never offer answer options."
].join(" ");

export const SUFFICIENCY_RULES = [
  "An answer is SUFFICIENT if it engages the question enough to be scored, even if it is weak, short, vague or poorly expressed. A bad answer is still sufficient. Score it later and move on.",
  "SHORT IS NOT INSUFFICIENT. A one word answer that names a feeling or a fact engages the question. Accept it. Never follow up because an answer is brief: brief people give their evidence in facts, so when you want more from them, ask concrete, such as: what did you actually say, give me the words.",
  "An answer is INSUFFICIENT only if it is one of these: blank or nearly blank, entirely off topic, only a question back to you, a request to rephrase, or it answers a clearly different question than the one asked while the asked one remains untouched.",
  "A PREMISE CORRECTION is none of the above and never a follow up. If the answer says the situation is not true of their life, such as: I do not work, or, we do not do that in our house, use the reask action. A premise correction is never scored and never counted.",
  "If the person asks what you mean or seems confused, that is a wording failure, not a skill failure. Rephrase the same question in simpler, plainer words. A rephrase never affects any score.",
  "ONE FOLLOW UP PER QUESTION AT MOST. If the answer to a follow up is still brief, accept it exactly as given and move on. What a person declines to give is simply not there, and dragging for more would inflate the score of talkative people over quiet ones.",
  "Follow ups go one level deeper or one level simpler, and never hint at the answer."
].join(" ");

function transcriptText(history) {
  if (!history || history.length === 0) { return "No questions have been asked yet."; }
  return history.map(function (h) {
    var lvl = h.level != null ? h.level : START_LEVEL;
    var head = h.n === 0
      ? "Opening turn (unscored, context only)"
      : h.was_followup
        ? "Follow up to question " + h.n + " (skill: " + h.skill + ", difficulty level " + lvl + ")"
        : "Question " + h.n + " (skill: " + h.skill + ", difficulty level " + lvl + ")";
    if (h.unscored && h.n !== 0) { head += " (UNSCORED: premise correction, context only, never score this answer)"; }
    var answer = h.answer == null ? "(not yet answered)" : h.answer;
    return head + "\nCookie asked: " + h.question + "\nThey answered: " + answer;
  }).join("\n\n");
}

function counts(history) {
  var h = history || [];
  return {
    mainAnswered: h.filter(function (x) { return !x.was_followup && !x.unscored && x.n >= 1 && x.answer != null; }).length,
    hasOpening: h.some(function (x) { return x.n === 0; }),
    followupsUsed: h.filter(function (x) { return x.was_followup; }).length,
    last: h.length > 0 ? h[h.length - 1] : null
  };
}

// ---------------------------------------------------------------------------
// PROMPT BUILDERS
// state is { band, exact_age, theme, mode, child_name, name, history }
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// LANGUAGE AND CONTEXT
// ---------------------------------------------------------------------------

export const DEFAULT_LANGUAGE = "English";

// label is shown in the selector and passed to Cookie. tag is the speech tag
// used by the browser for voice input and for reading questions aloud.
export const LANGUAGES = [
  { label: "English", tag: "en-US" },
  { label: "Bahasa Indonesia", tag: "id-ID" },
  { label: "Mandarin Chinese", tag: "zh-CN" },
  { label: "Malay", tag: "ms-MY" },
  { label: "Thai", tag: "th-TH" },
  { label: "Vietnamese", tag: "vi-VN" },
  { label: "Tagalog", tag: "fil-PH" },
  { label: "Japanese", tag: "ja-JP" },
  { label: "Korean", tag: "ko-KR" },
  { label: "Hindi", tag: "hi-IN" },
  { label: "Bengali", tag: "bn-BD" },
  { label: "Tamil", tag: "ta-IN" },
  { label: "Urdu", tag: "ur-PK" },
  { label: "Arabic", tag: "ar-SA" },
  { label: "Russian", tag: "ru-RU" },
  { label: "Ukrainian", tag: "uk-UA" },
  { label: "Spanish", tag: "es-ES" },
  { label: "Portuguese", tag: "pt-BR" },
  { label: "French", tag: "fr-FR" },
  { label: "German", tag: "de-DE" },
  { label: "Italian", tag: "it-IT" },
  { label: "Dutch", tag: "nl-NL" },
  { label: "Polish", tag: "pl-PL" },
  { label: "Turkish", tag: "tr-TR" },
  { label: "Greek", tag: "el-GR" },
  { label: "Swahili", tag: "sw-KE" },
  { label: "Burmese", tag: "my-MM" },
  { label: "Khmer", tag: "km-KH" },
  { label: "Lao", tag: "lo-LA" },
  { label: "Nepali", tag: "ne-NP" },
  { label: "Sinhala", tag: "si-LK" }
];

export function languageFor(label) {
  for (var i = 0; i < LANGUAGES.length; i++) {
    if (LANGUAGES[i].label === label) return LANGUAGES[i];
  }
  return LANGUAGES[0];
}

function languageBlock(state) {
  var lang = state.language || DEFAULT_LANGUAGE;
  return "LANGUAGE: the language of this session is " + lang + ". Every question, every follow up, every closing line and every written field you produce is in " + lang + ". The person may answer in any language; keep asking in " + lang + ". JSON keys, skill keys and the action words stay in English exactly as specified.";
}

// Small extra questions shown under a chosen theme. The keys here are the
// THEMES keys, plus under7 for the parent flow, which has no themes. type buttons renders a row of choices, type text renders one
// short input. required true gates the Begin button.
export const CONTEXT_QUESTIONS = {
  under7: [
    { key: "days", label: "Where does your child spend most days?", type: "buttons", required: false,
      options: ["At home", "Daycare or preschool", "A mix"] },
    { key: "siblings", label: "Brothers or sisters at home?", type: "buttons", required: false, options: ["Yes", "No"] },
    { key: "focus", label: "What kind of picture do you want?", type: "buttons", required: false,
      options: ["A general picture", "Big feelings and settling", "Playing and sharing", "Words for feelings"] }
  ],
  close: [
    { key: "who", label: "Who is this mostly about?", type: "buttons", required: true,
      options: ["My partner", "A parent", "A sibling", "A close friend", "Someone I live with"] },
    { key: "person_name", label: "Optional fictional nickname; do not use their real name", type: "text", required: false }
  ],
  work: [
    { key: "role", label: "Your work, in a few words", type: "text", required: false },
    { key: "leads", label: "Do you lead or manage anyone?", type: "buttons", required: false, options: ["Yes", "No"] }
  ],
  friends: [
    { key: "who", label: "Mostly about one friend, or a group?", type: "buttons", required: false, options: ["One friend", "A group"] },
    { key: "person_name", label: "Optional fictional nickname; do not use their real name", type: "text", required: false }
  ],
  parents: [
    { key: "who", label: "Who is this mostly about?", type: "buttons", required: true,
      options: ["My mother", "My father", "A sibling", "A grandparent", "Wider family"] },
    { key: "person_name", label: "Optional fictional nickname; do not use their real name", type: "text", required: false }
  ],
  school: [
    { key: "stage", label: "What you study, or your year", type: "text", required: false }
  ],
  kids: [
    { key: "children", label: "Your children's ages, like 4 and 7", type: "text", required: false }
  ],
  community: [
    { key: "group", label: "The team or community, in a few words", type: "text", required: false }
  ]
};

export function contextQuestionsFor(themeKey) {
  return CONTEXT_QUESTIONS[themeKey] || [];
}

export function contextText(state) {
  var ctx = state.context || {};
  var keys = Object.keys(ctx).filter(function (k) {
    return ctx[k] != null && String(ctx[k]).trim() !== "";
  });
  if (keys.length === 0) {
    return "No extra context was given. Invent ordinary, believable scenarios inside the theme.";
  }
  var parts = keys.map(function (k) { return k.replace(/_/g, " ") + ": " + String(ctx[k]).trim(); });
  return "CONTEXT THE PERSON GAVE, anchor every scenario in it and use any first name naturally: " + parts.join("; ") + ". If they said this is about their partner, the questions live inside that partnership, not a flatmate or a friend. Never invent facts that contradict this context and never ask for more personal detail than they offered.";
}

export function buildInterviewPrompt(state) {
  var band = bandFor(state.band);
  var mode = band.mode;
  var isParent = mode === "parent_report";
  var arc = arcFor(mode);
  var c = counts(state.history);
  var nextN = c.mainAnswered + 1;
  var arcItem = arc[Math.min(c.mainAnswered, arc.length - 1)];
  var lastWasFollowup = c.last ? !!c.last.was_followup : false;
  var child = state.child_name || "their child";
  var thread = threadInfoFor(nextN);
  var closed = [];
  for (var ci = 1; ci < thread.index; ci++) { closed.push("thread " + ci); }
  var denied = Array.isArray(state.denied) ? state.denied.filter(function (d) { return d && String(d).trim() !== ""; }) : [];

  var context = isParent
    ? [
        "MODE: parent report. You are interviewing a PARENT about their child, " + child + ", who is " + (state.exact_age != null ? state.exact_age : "under 7") + " years old.",
        "WHAT IS ORDINARY AT THIS AGE: " + devNoteFor(state.exact_age),
        "Write to an adult. Refer to the child by name. Ask only for real remembered episodes, never for ratings, scores or general impressions.",
        "Never suggest anything is wrong with the child, never hint at any condition or diagnosis, and never compare the child to other children.",
        contextText(state),
        "If a focus was chosen in the context, lean the episode questions toward that part of ordinary life while still covering all seven skills across the ten questions. A focus is curiosity, never a worry: the standard for what is ordinary at this age does not move, and nothing about the chosen focus may ever be framed as a concern."
      ].join("\n")
    : [
        "MODE: self report. READER: age band " + band.label + ". Reading guidance: " + band.reading,
        "SETTING: every scenario you invent must sit inside the theme " + themeFor(state.theme).label + ". " + themeFor(state.theme).scenes,
        contextText(state)
      ].join("\n");

  return [
    "You are " + INTERVIEWER_NAME + ", the interviewer inside a small app called " + APP_NAME + ".",
    "You measure seven skills through ten open questions, one at a time, each written fresh after reading the previous answers.",
    "",
    context,
    "",
    languageBlock(state),
    "",
    "STYLE RULES: " + STYLE_RULES,
    "",
    "CONTENT RULES: " + CONTENT_SCREEN,
    "",
    "SUFFICIENCY RULES: " + SUFFICIENCY_RULES,
    "",
    "THE BAR FOR A QUESTION, two examples. BAD: Let us return to the situation from earlier. When you felt hurt, be honest about what the angry part of you wanted to say, and afterwards, what did you actually do in the next thirty seconds? That fails four ways: it reopens a closed thread, it asks two things, it hands them a feeling they never stated, and it commands honesty. GOOD: What did you actually say to her, in the exact words? One ask, their material, nothing assumed.",
    "",
    "PREMISES THIS PERSON HAS DENIED, never assume or rebuild on any of these, in this question or any later one: " + (denied.length ? denied.join("; ") : "none yet") + ".",
    "",
    "DIFFICULTY, THE HEART OF THIS MEASURE. Every question is asked at a level from 1 to 5:",
    DIFFICULTY_LEVELS.map(function (d) { return "Level " + d.level + " (" + d.label + "): " + d.note; }).join("\n"),
    "The last question was asked at level " + (c.last && c.last.level != null ? c.last.level : START_LEVEL) + ".",
    "SET THE LEVEL OF YOUR NEXT QUESTION LIKE THIS: if the last answer was strong for its level, go UP one. If it was adequate, stay. If it was thin, evasive, or gave only a flattering answer, go DOWN one. NEVER move down because an answer was short: short and precise holds the level or goes up, and only vague, evasive or flattering moves it down. Never move more than one level at a time and never go below 1 or above 5. The first question of a session is level " + START_LEVEL + ".",
    "Write the question so it genuinely IS that level. A level 4 question must have no comfortable correct answer. A level 1 question must ask one simple thing. Never announce the level and never mention difficulty to the person.",
    "",
    "STATE, already counted for you, do not recount:",
    "Main questions fully answered: " + c.mainAnswered + " of " + TOTAL_QUESTIONS + ".",
    "THREAD MAP: the ten questions run as " + thread.count + " threads, each ONE situation. The next main question, number " + nextN + ", sits in thread " + thread.index + ", position " + thread.pos + " of " + thread.size + ", material: " + (thread.material === "recall" ? "a REAL remembered moment from their own life, never an invented scenario" : "an invented scenario, kept ordinary and small") + ". " + (thread.opens ? "It OPENS this thread: begin with one short sentence that sets the previous thread down for good, then the new question." : "It continues the current thread and its situation.") + (closed.length ? " CLOSED THREADS, never return to these situations for any reason: " + closed.join(", ") + "." : ""),
    "REGISTER of this question: " + (REGISTER_NOTES[arcItem.register] || REGISTER_NOTES.neutral),
    "If an invented scenario has been rejected or corrected once in this thread, do not invent another: switch to asking for a real moment from their own life. A person cannot reject their own material.",
    "Follow ups used so far: " + c.followupsUsed + " of " + MAX_FOLLOWUPS_TOTAL + ".",
    "The most recent answered item " + (lastWasFollowup ? "WAS already a follow up." : "was a main question."),
    "",
    "TRANSCRIPT SO FAR:",
    transcriptText(state.history),
    "",
    "DECIDE YOUR ACTION, in this exact order:",
    "1. If the transcript is empty: action is opening. One short message, under 45 words, warm, that does exactly two things: asks how they are feeling right now, in this exact moment, and asks the one or two concrete facts about their " + (isParent ? "child's ordinary week" : "life") + " that the first thread's situation needs and the context above does not already give. question_number is 0, skill is opening, level is " + START_LEVEL + ". The opening is never scored and is not one of the ten.",
    "2. If the transcript holds ONLY the answered opening: action is question, number 1. Read the opening answer first. If it shows real distress, begin with one plain sentence that this can wait for another day if they prefer, then ask a small gentle question. Otherwise use their stated mood to choose ground: a person arriving low starts on neutral concrete ground, never on the hardest material.",
    "3. If main questions answered equals " + TOTAL_QUESTIONS + ": action is done. Write one warm closing line saying you are now reading everything as a whole to build the picture.",
    "4. If the most recent answer CORRECTS A PREMISE, says the situation is not true of their life, or removes the ground the question stood on: action is reask. Keep the SAME question number and skill, drop the dead situation entirely, and ask again on ground that exists, preferring a real moment from their own life. Fill denied_premise with a short plain note of what is not true for them, such as: does not have a job. The corrected answer is never scored and never counted.",
    "5. Else, if the most recent answer is INSUFFICIENT by the rules above, and the most recent item was NOT already a follow up, and follow ups used is below " + MAX_FOLLOWUPS_TOTAL + ": action is followup. Re ask or deepen that same question, keeping its number and skill.",
    "6. Otherwise: action is question. Write main question number " + nextN + ". Its skill is " + arcItem.skill + ". Its goal: " + arcItem.goal + " Adapt it to what has already been said, honour the thread map and the register above, and never repeat a detail already exhausted.",
    "",
    "Return ONLY a JSON object with keys action, question_number, skill, level, text, plus denied_premise when the action is reask. When the action is opening, ALSO include iui, an object of short strings in the session language with these exact keys: opening_word (a heading meaning Before we begin), question_word (the word for Question), of_word (the word joining 3 of 10), deeper (a label meaning A little deeper), placeholder (a hint meaning Write your answer in your own words), answer_btn (the word for Answer on a button), thinking (a short line meaning Cookie is thinking), correction_line (one warm sentence meaning: if a question assumes something untrue about your life, just say so and it will change, and it will never count against you). For an English session fill iui with the natural English versions. No other text."
  ].join("\n");
}

export function buildReportPrompt(state) {
  var band = bandFor(state.band);
  var mode = band.mode;
  var isParent = mode === "parent_report";
  var set = skillSetFor(mode);
  var child = state.child_name || "the child";
  var skillList = set.map(function (s) { return s.key + " (" + s.label + "): " + s.blurb; }).join("\n");

  var head = isParent
    ? [
        "You are " + INTERVIEWER_NAME + ", scoring a parent's account of their child " + child + ", aged " + (state.exact_age != null ? state.exact_age : "under 7") + ".",
        "YOU ARE SCORING THE CHILD'S SKILLS AS DESCRIBED, judged against what is ordinary AT THIS EXACT AGE and never against an older child.",
        "WHAT IS ORDINARY AT THIS AGE: " + devNoteFor(state.exact_age),
        "A child who is exactly where their age expects should score in the 60s. Above that means ahead of the usual pattern. Below means not yet, which at these ages is ordinary and often changes within months.",
        "ABSOLUTE RULE: never suggest, name, hint at or rule out any condition, disorder or diagnosis. Never use words such as delay, disorder, spectrum, concern, red flag or normal. Never advise seeking assessment. If the account describes something a parent might want help with, the only permitted response is one warm sentence suggesting they talk it through with someone who knows the child well.",
        "Write the whole report to the PARENT, warmly, and refer to the child by name."
      ].join("\n")
    : [
        "You are " + INTERVIEWER_NAME + ", scoring a finished interview.",
        "The person answered open questions in their own words. You score the ANSWERS, never the person. One short interview is a sample, not a diagnosis.",
        "READER: age band " + band.label + ", theme " + themeFor(state.theme).label + ". Judge vocabulary relative to that age and write the report at that reading level. " + band.reading
      ].join("\n");

  var weighting = isParent
    ? "WHICH QUESTIONS FEED WHICH SKILL: 1 and 9 feed feeling_signals. 2 feeds feeling_words_child. 3 feeds settling. 4 feeds waiting. 5 and 8 feed noticing, with 8 weighted double because perspective taking is the harder signal. 6 feeds comforting. 7 and 10 feed repair, and question 10 is about the PARENT and must never lower the child's score, though what happened next between them is evidence for repair."
    : "WHICH QUESTIONS FEED WHICH SKILL: 1 and 2 feed feeling_words. 3 and 4 feed inner_honesty. Question 4's second half and their handling of provocation anywhere feed composure. 5 feeds clean_seeing. 6 feeds finding_needs. 7 and 8 feed reading_others, with 8 weighted double. 9 and 10 feed standing_steady, with 10 weighted double. Draw evidence from EVERY question in a skill's set. If you cannot cite question 10 for standing_steady or question 8 for reading_others, you have not read them.";

  var raises = isParent
    ? [
        "WHAT RAISES A SCORE: a specific remembered episode rather than a general impression. The child acting without being prompted. Any sign of the child noticing a state in someone else that they were not told about. Coming back after a falling out without an adult brokering it. A feeling word the child produced themselves.",
        "WHAT LOWERS A SCORE: the parent describing the child in adjectives rather than episodes. Episodes where the adult did all the work. Nothing to cite."
      ].join("\n")
    : [
        "WHAT RAISES A SCORE, because these are hard to produce and easy to miss:",
        "Naming two feelings that pull against each other and holding both without resolving them.",
        "Admitting an impulse that reflects badly on them, especially a patient or cold one rather than a hot one.",
        "Holding two incompatible explanations for someone's behaviour without choosing between them.",
        "Catching their own bias inside their own answer.",
        "Naming a concession that costs them something real, especially at question 10.",
        "Granting a genuine inner life to the person in the wrong at question 8, without excusing them.",
        "A physical detail at question 3 that is specific and sequenced rather than generic.",
        "",
        "WHAT LOWERS A SCORE:",
        "FLUENCY IS NOT SKILL. Confident, well organised writing about one's own emotional processes is common in articulate people and proves little. Where an answer mainly ANALYSES the person's inner workings rather than REVEALING something, cap that skill at 70 no matter how well written it is. Ask of each answer: what did this cost them to say. If the answer is nothing, it is not exceptional.",
        "Recited wisdom with no personal texture sits in the middle band at best.",
        "A single polished feeling where several were plainly present.",
        "An impulse at question 4 that is actually flattering, such as wanting to stay professional. That is a non answer.",
        "A concession at question 10 that is a strength in disguise, such as working too hard.",
        "Feelings arriving as thoughts or questions instead of feeling words: score lower and name the pattern kindly.",
        "A judgment wearing a feeling's clothes, such as betrayed or disrespected: credit the signal, note the pattern."
      ].join("\n");

  return [
    head,
    "",
    "THE SEVEN SKILLS, score every one, in this order, using these exact keys:",
    skillList,
    "For every skill, fill the label field with that skill's name rendered NATURALLY in the session language, carrying the meaning shown beside its key above, never a word for word translation. For an English session use the labels exactly as given.",
    "",
    weighting,
    "",
    "FULL TRANSCRIPT:",
    transcriptText(state.history),
    "",
    languageBlock(state),
    "If the language above is not English, judge Feeling Words and all vocabulary richness by the range and precision shown in the language the person actually used, never against English. Write every written field of the report, including all of kid_view, in that language.",
    "",
    "FAIRNESS RULES, before any number:",
    "LENGTH IS NOT EVIDENCE. Judge the precision and honesty of what is there, never the amount of it. A short exact answer outranks a long vague one, and a person of few words must be able to reach the same score as an essayist saying the same things at length.",
    "VOLUNTEERED OUTRANKS EXTRACTED. The transcript marks which answers came from follow ups. Material that only appeared after being asked again counts for less than the same material offered first time.",
    "THIN IS NOT LOW. Where little was given, score what was seen and say plainly in that skill's meaning field that this interview saw only a little of it. Never treat absence of evidence as evidence of absence, never guess at reasons for brevity or silence, and never treat privacy as a lack of empathy.",
    "Entries marked unscored, the opening turn and any premise corrections, are context only. They never move any score in either direction.",
    "NEVER SCORE A LIFE. How a household divides its work, who does which chores, whether someone has a job, how a family is arranged: none of it is evidence of any skill, in any direction. Score only how the person reads, names and handles what happens inside the life they actually have.",
    "",
    "SCORING METHOD, in order:",
    "STEP ONE, RANK BEFORE YOU NUMBER. Put the seven skills in order from strongest to weakest as shown in THIS transcript. Everyone has a shape. Refusing to rank produces a flat and useless picture.",
    "STEP TWO, SPREAD. Assign numbers so the highest and lowest differ by at least " + MIN_SPREAD + " points. If your instinct says everything is similar, look harder: the skill with the thinnest evidence is weaker than the skill with the richest evidence.",
    "STEP THREE, ANCHORS. Whole numbers from " + SCORE_MIN + " to " + SCORE_MAX + ". 10 to 25 did not show up. 26 to 45 first signs. 46 to 65 building. 66 to 85 strong. 86 to 99 exceptional, and no more than two of the seven may sit above 85.",
    "STEP THREE B, DIFFICULTY CEILING, AND THIS OVERRIDES YOUR INSTINCT. Every question in the transcript was asked at a difficulty level from 1 to 5, shown beside it. For each skill, find the HIGHEST level at which that person actually answered WELL, not merely the highest level they were asked. The score for that skill may not exceed the ceiling for that level: " + JSON.stringify(LEVEL_CEILINGS) + ". A flawless answer to a level 1 question is a flawless answer to an easy question and cannot go above 45. Someone who never got past level 2 has not shown you a strong skill, however well they wrote. Equally, a partly successful answer at level 4 or 5 is worth more than a perfect one at level 2, because being asked a level 5 question at all means earlier answers pushed the measure up there.",
    "The difficulty ladder is the reason this is not a questionnaire. Say so in plain words inside the meaning field of the highest scoring skill, without using the word level or the word difficulty as jargon.",
    "STEP FOUR, EVIDENCE. Every evidence field must name the question numbers it draws from and quote or closely paraphrase the ACTUAL words given. Never write evidence describing something the transcript does not contain. If you find yourself summarising what a good answer usually contains, the score is wrong and must come down.",
    "",
    raises,
    "",
    "WRITING RULES: never use clinical or diagnostic language. Never use the words exam, quiz, test or grade. Never use an em dash or an en dash anywhere. The growth field must quote or reference their own words. Generic advice that could be pasted into any report is a failure.",
    "NEVER STATE A MAXIMUM. Write every score as a bare number. Never write out of anything, never name the top of the scale, and never mention difficulty levels, depth, or how hard the questions became. Those are the measure's own workings and the person never sees them.",
    "The closing_note stands on the warm ground of the late questions: end the whole report on something that went well or something they are quietly proud of, in their own material.",
    "",
    "REPORT FIELDS:",
    "skills: exactly seven entries, one per skill above, in the same order, each with key, label, score, evidence, meaning, growth.",
    "composite: the rounded average of the seven scores.",
    "needs_detected: up to three single words for what is most wanted underneath, such as recognition, trust, voice, belonging, fairness, rest.",
    "strengths: the two strongest skills, each with one warm sentence.",
    "growth_edge: the single clearest growth area, one kind sentence, framed as the next skill to build.",
    "closing_note: two warm sentences, forward looking, no advice list, no flattery.",
    "kid_view: a second, much simpler version of the whole picture, written to be read straight through in about a minute. " + (isParent ? "In this mode it is written FOR THE PARENT TO READ ALOUD TO " + child + ", so speak to the child directly, warmly, in very short sentences, and never mention scores or numbers." : "Write it TO THE PERSON THEMSELVES in short plain sentences with no jargon and no analysis, as if explaining it to a friend who is in a hurry.") + " It has four parts: headline, a single short sentence naming the shape of this picture. lines, exactly seven short entries, one per skill in the same order, each with label, score and plain, where plain is ONE sentence of at most twenty words saying what that number means in ordinary words. best_thing, one sentence naming what they are already good at. one_thing, one sentence naming the single thing to try next, small enough to do tomorrow.",
    "ui: an object of short interface strings, every one in the session language, with these exact keys. score_label: a label meaning Your empathy assessment score. not_happiness: one sentence meaning: this does not measure how happy or how kind you are, it measures how precisely you read and name what happens in you and in other people. simple_btn: a short button label for the simple version. full_btn: a short button label for the full version. divider: one short line meaning: the full version is below. your_answers: a heading for their own answers, in parent report meaning What you told Cookie. coach_btn: a short button label meaning How do I build this. print_btn: the word for Print. certificate_btn: a label meaning Print the certificate. start_again_btn: a label meaning Start again. share_btn: a label meaning Download a share image. another_child_btn: a label meaning Measure another child. theme_label: the chosen theme named naturally in the session language, or for a parent report the child's age written out. For an English session fill every key with the natural English version.",
    "",
    "Return ONLY a JSON object with keys skills, composite, needs_detected, strengths, growth_edge, closing_note, kid_view, ui. No other text."
  ].join("\n");
}

// The coaching prompt. Called from the results page for one skill at a time.
export function buildCoachPrompt(state, report, skillKey) {
  var band = bandFor(state.band);
  var mode = band.mode;
  var isParent = mode === "parent_report";
  var set = skillSetFor(mode);
  var skill = set.find(function (s) { return s.key === skillKey; }) || set[0];
  var row = (report && Array.isArray(report.skills))
    ? report.skills.find(function (s) { return s.key === skillKey; })
    : null;
  var child = state.child_name || "the child";

  var who = isParent
    ? "You are advising a PARENT on how to build this skill in their child " + child + ", aged " + (state.exact_age != null ? state.exact_age : "under 7") + ". WHAT IS ORDINARY AT THIS AGE: " + devNoteFor(state.exact_age) + " Every suggestion must be something that fits into an ordinary day with a child this age, not a lesson or a sit down talk. Never mention any condition or diagnosis."
    : "You are advising this person on how to build this skill in themselves. Age band " + band.label + ". Write at that reading level. " + band.reading;

  return [
    "You are " + INTERVIEWER_NAME + ", inside " + APP_NAME + ".",
    who,
    languageBlock(state),
    "",
    "THE SKILL: " + skill.label + ". " + skill.blurb,
    "THEIR SCORE: " + (row ? row.score : "not available") + ".",
    "WHAT THE MEASURE SAW: " + (row ? row.evidence : "not available"),
    "",
    "THEIR OWN WORDS, use these, quote them back where it helps:",
    transcriptText(state.history),
    "",
    "WRITE:",
    "why_it_matters: two sentences on what this skill actually changes in daily life. Concrete, no theory.",
    "what_is_happening: two or three sentences on the specific pattern visible in THEIR answers, quoting or referencing their own words. Kind and direct. Never generic.",
    "practices: three to five practices, each with a title of a few words and two or three sentences of instruction. Each must be small, doable this week, and tied to something they actually described. No journals unless they mentioned writing, no meditation unless they mentioned it.",
    "one_thing: a single sentence naming the ONE thing to do first if they do nothing else.",
    "",
    "RULES: warm, plain and specific. Never use an em dash or an en dash. Never use the words exam, quiz, test or grade. Never use clinical language. Never promise a score will rise. Never state a maximum score and never mention difficulty levels or depth. Never use imported therapy idioms such as the part of you. Do not pad.",
    "",
    "Return ONLY a JSON object with keys why_it_matters, what_is_happening, practices (array of objects with title and body), one_thing. No other text."
  ].join("\n");
}

// ---------------------------------------------------------------------------
// SCHEMAS
// ---------------------------------------------------------------------------

export const INTERVIEW_SCHEMA = {
  type: "object",
  properties: {
    action: { type: "string", enum: ["opening", "question", "followup", "reask", "done"] },
    question_number: { type: "integer" },
    skill: { type: "string" },
    level: { type: "integer" },
    text: { type: "string" },
    denied_premise: { type: "string" },
    iui: {
      type: "object",
      properties: {
        opening_word: { type: "string" },
        question_word: { type: "string" },
        of_word: { type: "string" },
        deeper: { type: "string" },
        placeholder: { type: "string" },
        answer_btn: { type: "string" },
        thinking: { type: "string" },
        correction_line: { type: "string" }
      }
    }
  },
  required: ["action", "question_number", "skill", "level", "text"]
};

export const REPORT_SCHEMA = {
  type: "object",
  properties: {
    skills: {
      type: "array",
      items: {
        type: "object",
        properties: {
          key: { type: "string" },
          label: { type: "string" },
          score: { type: "integer" },
          evidence: { type: "string" },
          meaning: { type: "string" },
          growth: { type: "string" }
        },
        required: ["key", "label", "score", "evidence", "meaning", "growth"]
      }
    },
    composite: { type: "integer" },
    needs_detected: { type: "array", items: { type: "string" } },
    strengths: { type: "array", items: { type: "string" } },
    growth_edge: { type: "string" },
    closing_note: { type: "string" },
    ui: {
      type: "object",
      properties: {
        score_label: { type: "string" },
        not_happiness: { type: "string" },
        simple_btn: { type: "string" },
        full_btn: { type: "string" },
        divider: { type: "string" },
        your_answers: { type: "string" },
        coach_btn: { type: "string" },
        print_btn: { type: "string" },
        certificate_btn: { type: "string" },
        start_again_btn: { type: "string" },
        share_btn: { type: "string" },
        another_child_btn: { type: "string" },
        theme_label: { type: "string" }
      }
    },
    kid_view: {
      type: "object",
      properties: {
        headline: { type: "string" },
        lines: {
          type: "array",
          items: {
            type: "object",
            properties: {
              label: { type: "string" },
              score: { type: "integer" },
              plain: { type: "string" }
            },
            required: ["label", "score", "plain"]
          }
        },
        best_thing: { type: "string" },
        one_thing: { type: "string" }
      },
      required: ["headline", "lines", "best_thing", "one_thing"]
    }
  },
  required: ["skills", "composite", "needs_detected", "strengths", "growth_edge", "closing_note", "kid_view", "ui"]
};

export const COACH_SCHEMA = {
  type: "object",
  properties: {
    why_it_matters: { type: "string" },
    what_is_happening: { type: "string" },
    practices: {
      type: "array",
      items: {
        type: "object",
        properties: { title: { type: "string" }, body: { type: "string" } },
        required: ["title", "body"]
      }
    },
    one_thing: { type: "string" }
  },
  required: ["why_it_matters", "what_is_happening", "practices", "one_thing"]
};

// ---------------------------------------------------------------------------
// LANDING AND RESEARCH CONTENT
// ---------------------------------------------------------------------------

export const SAMPLE_RADAR = [
  { skill: "Feeling Words", score: 38 },
  { skill: "Inner Honesty", score: 55 },
  { skill: "Composure", score: 81 },
  { skill: "Clean Seeing", score: 88 },
  { skill: "Finding Needs", score: 27 },
  { skill: "Reading Others", score: 62 },
  { skill: "Standing Steady", score: 49 }
];

// Categories for the little buttons at the top of the samples page, in order.
export const SAMPLE_CATEGORIES = ["Little kids", "Children", "Teenagers", "Adults"];

// Sample results carry NO name and NO label. Only the shape and the numbers.
export const SAMPLE_REPORTS = [
  {
    id: "sample-1",
    who: "Age 14 to 17, school and study",
    category: "Teenagers",
    shape: "Sees a situation clearly, has not yet found the words for what it does to them.",
    composite: 57,
    skills: [
      { key: "feeling_words", label: "Naming Feelings", score: 31, evidence: "Questions 1 and 2: the feelings arrived as thoughts, such as why would she do that, rather than as named feelings.", meaning: "The experience is there in full, the vocabulary has not caught up with it yet.", growth: "Each night, name one feeling from the day in a word more exact than annoyed or fine." },
      { key: "inner_honesty", label: "Inner Honesty", score: 62, evidence: "Question 4: admitted wanting to say something that would land badly, then chose not to.", meaning: "Willing to look at the impulse rather than tidy it away.", growth: "Notice the second impulse, the quieter one that arrives after the loud one." },
      { key: "composure", label: "Composure", score: 74, evidence: "Question 4: waited a day before replying to the group message.", meaning: "A real strength, and it is doing a lot of work here.", growth: "Try naming what you are holding back, to yourself, before you hold it back." },
      { key: "clean_seeing", label: "Seeing It Straight", score: 78, evidence: "Question 5: listed what was said and who was present, with no word about motive.", meaning: "Facts and guesses are already separate, which is unusual at this age.", growth: "Say, that is my guess, whenever you catch yourself explaining someone." },
      { key: "finding_needs", label: "Finding Needs", score: 40, evidence: "Question 6: the sentence wanted was an apology, and what it handed back was named as feeling better.", meaning: "The need is close but has not been named yet.", growth: "After an apology, ask what it actually gave back." },
      { key: "reading_others", label: "Reading Others", score: 66, evidence: "Question 7 was strong on the excluded classmate. Question 8 gave the one who caused it a single motive.", meaning: "Reads the hurt person well and the difficult person less so.", growth: "Give the person you like least in a story two possible reasons, not one." },
      { key: "standing_steady", label: "Standing Steady", score: 48, evidence: "Question 10: the concession offered was that they could work harder, which is a strength in disguise.", meaning: "Steadiness still rests on being right rather than on being able to hear the critic.", growth: "Name one thing a critic got right this week, even a small one." }
    ],
    needs_detected: ["belonging", "fairness", "voice"],
    growth_edge: "Feeling words, since everything else is held back by the vocabulary rather than the understanding."
  },
  {
    id: "sample-2",
    who: "Age 35 to 49, work",
    category: "Adults",
    shape: "Extremely articulate under pressure, and guarded underneath it.",
    composite: 66,
    skills: [
      { key: "feeling_words", label: "Naming Feelings", score: 79, evidence: "Questions 1 and 2: four distinct shades named, including one that contradicted the others.", meaning: "Precise, layered, and comfortable with contradiction.", growth: "Name the quietest of the four first next time, rather than the loudest." },
      { key: "inner_honesty", label: "Inner Honesty", score: 45, evidence: "Question 4: the impulse offered was to stay professional, which is a decision and not an impulse.", meaning: "The messy first reaction was edited out before it reached the page.", growth: "Write the sentence you would never send, then delete it. The writing is the practice." },
      { key: "composure", label: "Composure", score: 84, evidence: "Question 4 described a full breath before speaking. Question 9 described asking once and stopping.", meaning: "Genuinely strong, and the ask once rule is a good one.", growth: "Notice what composure costs you afterwards, since it is rarely free." },
      { key: "clean_seeing", label: "Seeing It Straight", score: 81, evidence: "Question 5 separated the timeline from the motive and flagged the guess as unproven.", meaning: "The discipline is real and it keeps conflicts smaller than they would be.", growth: "Extend it to yourself, and list the facts of your own behaviour in the same scene." },
      { key: "finding_needs", label: "Finding Needs", score: 72, evidence: "Question 6: named being believed rather than the apology itself.", meaning: "Went past the surface to what the sentence would actually return.", growth: "Ask what you needed before the moment went wrong, not only after." },
      { key: "reading_others", label: "Reading Others", score: 58, evidence: "Question 7 was warm. Question 8 gave the difficult colleague a single tidy explanation.", meaning: "Generous towards the hurt, thinner towards the one who caused it.", growth: "Hold two explanations for the same person and refuse to pick." },
      { key: "standing_steady", label: "Standing Steady", score: 45, evidence: "Question 9 was strong on action. Question 10 named no concession that cost anything.", meaning: "Steady in what they do, less steady in what they will let themselves hear.", growth: "Name the criticism you would least like to be true, and check it once." }
    ],
    needs_detected: ["recognition", "trust", "credibility"],
    growth_edge: "Inner honesty, since the reading of situations is already sharper than the reading of self."
  },
  {
    id: "sample-3",
    who: "Age 25 to 34, raising children",
    category: "Adults",
    shape: "Warm and unusually honest, and thrown off balance by criticism.",
    composite: 61,
    skills: [
      { key: "feeling_words", label: "Naming Feelings", score: 58, evidence: "Questions 1 and 2 produced three feelings, two of them categories rather than shades.", meaning: "Good range, still reaching for the general word first.", growth: "When you land on frustrated, ask what kind, and answer in one word." },
      { key: "inner_honesty", label: "Inner Honesty", score: 83, evidence: "Question 4: admitted wanting the other parent to be seen as the difficult one.", meaning: "Willing to name something genuinely unflattering, which is rare.", growth: "Notice how quickly you move to justify after you admit something." },
      { key: "composure", label: "Composure", score: 52, evidence: "Question 4: the thirty seconds contained a sharper reply than intended.", meaning: "The gap between impulse and response is short, and it can be lengthened.", growth: "Use the sentence you already used at question 9, let me come back to this." },
      { key: "clean_seeing", label: "Seeing It Straight", score: 49, evidence: "Question 5 mixed motive into the facts, describing the other person as deliberately ignoring them.", meaning: "The story and the event are still arriving together.", growth: "Rewrite one recent argument as only what was said, with no reasons attached." },
      { key: "finding_needs", label: "Finding Needs", score: 71, evidence: "Question 6: named being trusted with their own child, which is a need rather than an action.", meaning: "Went straight past the surface request to what sat under it.", growth: "Try the same move on your child's next refusal." },
      { key: "reading_others", label: "Reading Others", score: 76, evidence: "Question 8 gave the critical relative both a fear and a habit, and refused to choose.", meaning: "Strong, and the refusal to choose is the hardest part of it.", growth: "Do this out loud with someone once, since it is easier written than spoken." },
      { key: "standing_steady", label: "Standing Steady", score: 34, evidence: "Question 9: the night thought was that they had probably deserved it. Question 10 agreed with the doubters entirely.", meaning: "Criticism currently goes straight through, and it is the skill most worth building next.", growth: "For one criticism this week, write what is true in it and what is not, in two columns." }
    ],
    needs_detected: ["trust", "support", "rest"],
    growth_edge: "Standing steady, since the warmth and honesty are already strong and only need somewhere firm to stand."
  },
  {
    id: "sample-4",
    who: "Age 4, told by a parent",
    category: "Little kids",
    shape: "A warm noticer who comforts in his own currency, while settling still needs a lap and the words are on their way.",
    composite: 60,
    skills: [
      { key: "feeling_signals", label: "Feeling Signals", score: 72, evidence: "Questions 1 and 9: the whole body tells the story, a chin that goes down before the tears arrive, and he reads his baby sister's face fast enough to fetch her cup before she cries.", meaning: "Feelings move through him visibly and he reads them in others, which at four is the foundation everything else grows from.", growth: "Name what his face is doing while it happens, so the signal and the word start arriving together." },
      { key: "feeling_words_child", label: "Feeling Words", score: 54, evidence: "Question 2: sad and angry are in daily use, and everything bigger currently lands as a roar or a slammed door.", meaning: "Two solid words at four is ordinary, and the roar is a feeling that has not found its word yet.", growth: "Offer one new word in the calm moments, such as disappointed when the park plan changes." },
      { key: "settling", label: "Settling", score: 46, evidence: "Question 3: after the tower fell there were twenty minutes of tears, and calm came back on a lap with a book, not alone.", meaning: "Settling with help is exactly where four year olds live, and the lap is doing the teaching.", growth: "Keep the lap, and afterwards say what worked: we breathed, we had a book, and it passed." },
      { key: "noticing", label: "Noticing Others", score: 68, evidence: "Questions 5 and 8: he stopped mid game when another boy sat alone at the fence, and asked why that boy's mummy was late.", meaning: "Noticing a quiet child across a busy playground without being told is a genuinely strong signal at this age.", growth: "Wonder aloud together: what do you think he was feeling, and see what he says." },
      { key: "comforting", label: "Comforting", score: 74, evidence: "Question 6: he brought his own dinosaur to the crying boy and stood beside him without a word.", meaning: "Comfort in a four year old's own currency, a dinosaur and company, is the real thing.", growth: "Tell him what his kindness did: you stayed with him and his face changed." },
      { key: "waiting", label: "Waiting and Wanting", score: 49, evidence: "Question 4: a no to sweets at the shop still ends on the floor about half the time, and waiting for a turn works when an adult counts with him.", meaning: "A four year old who manages a no half the time with support is on the ordinary path.", growth: "Make waits visible and small: when the big hand gets to the top, it is your turn." },
      { key: "repair", label: "Coming Back", score: 58, evidence: "Questions 7 and 10: after the fight over the digger he came back with it held out, once his sister had stopped being cross, and after a hard morning he found his mother for a hug before anything else.", meaning: "Coming back first, even without words, is repair in its earliest and truest form.", growth: "Give the coming back a phrase to ride on: are we friends again works at four." }
    ],
    needs_detected: ["closeness", "company", "rhythm"],
    growth_edge: "Settling, and only in the way four year olds learn it: many calm returns with a warm adult until the calm starts living inside him."
  },
  {
    id: "sample-5",
    who: "Age 7 to 9, friendships",
    category: "Children",
    shape: "Kind in action and quick to come back, still reading people in black and white.",
    composite: 55,
    skills: [
      { key: "feeling_words", label: "Naming Feelings", score: 58, evidence: "Questions 1 and 2: sad, mad and a very good left out, though most feelings still arrive as fair and not fair.", meaning: "Left out is a precise word at this age, and the fairness words show feelings turning into verdicts.", growth: "When something is not fair, add what it felt like underneath: left out, small, or invisible." },
      { key: "inner_honesty", label: "Inner Honesty", score: 63, evidence: "Question 4: admitted wanting to tell the teacher on her friend so the friend would get in trouble, and being a little glad when it rained on the party she missed.", meaning: "Saying the mean wish out loud instead of hiding it is honest work at seven to nine.", growth: "Keep naming the sneaky wishes. They lose their power when they get said." },
      { key: "composure", label: "Composure", score: 51, evidence: "Question 4: the wanting to shout mostly wins at home and mostly loses at school.", meaning: "Holding it together in one place before the other is the usual order of learning.", growth: "Notice what school you does that home you has not tried yet, like walking away first." },
      { key: "clean_seeing", label: "Seeing It Straight", score: 47, evidence: "Question 5: the story of the lunch table came with the reason already inside it, they did not save me a seat because Mia is mean now.", meaning: "What happened and why it happened are still one piece at this age.", growth: "Play the two lists game: what a camera saw, then what you guessed." },
      { key: "finding_needs", label: "Finding Needs", score: 55, evidence: "Question 6: knew she wanted the friend to say sorry, and when asked what the sorry would give her, landed on then I would know she still likes me.", meaning: "Underneath the apology a need got named: to still belong. That is the skill starting.", growth: "Ask the underneath question about someone else next time: what did they need." },
      { key: "reading_others", label: "Reading Others", score: 44, evidence: "Questions 7 and 8: the left out classmate got real feelings, the girl who did the leaving out got only she is just mean.", meaning: "One motive per person is how this age reads, and the hard person got the shortest story.", growth: "Give the mean one two possible reasons, even silly ones, to stretch the reading." },
      { key: "standing_steady", label: "Standing Steady", score: 66, evidence: "Questions 9 and 10: when the group laughed at her drawing she kept drawing, and she granted that her friend was right that she does always want to go first.", meaning: "Taking a true criticism on board at this age without crumbling is quietly impressive.", growth: "Say the true bit back in your own words: you are right, I do like going first." }
    ],
    needs_detected: ["belonging", "fairness", "reassurance"],
    growth_edge: "Reading others, starting with the people who behave worst, since everyone else already gets a full story."
  }
];

export const WHY_IT_MATTERS = [
  { title: "It shows up in every room you walk into", body: "These are not a subject. They decide how a disagreement ends, whether the person in front of you feels heard, and how fast you recover from being treated badly. The same seven show up at work, at home, in a classroom and in a group of friends." },
  { title: "The words come first", body: "People who tell their feelings apart in fine detail regulate themselves better and react less severely to difficult moments. The reverse is also true: when everything is either fine or bad, everything difficult feels the same size." },
  { title: "Most conflict is a missed need", body: "Under almost every argument sits something someone needed and did not get. Naming the need takes the heat out, because a need can be met, while a verdict about a person can only be defended." },
  { title: "Reading the difficult person is the real skill", body: "Anyone can feel for the person who was hurt. Granting a real inner life to the one who caused the hurt, without excusing them, is harder and far more useful. It is the difference between a conflict that ends and one that repeats." },
  { title: "None of it counts unless it survives pressure", body: "Skills that vanish the moment you are criticised, excluded or laughed at are not skills yet. That is why the last questions here are the hard ones." }
];

// The research page. Every claim here is checkable, and the last item exists
// on purpose: naming what the evidence does NOT support is what makes the rest
// of it worth trusting.
export const RESEARCH = [
  {
    title: "The labour market pays for social skill, and pays more than it used to",
    body: "Between 1980 and 2012, jobs in the United States requiring high levels of social interaction grew by nearly twelve percentage points as a share of the workforce, while maths heavy but less social jobs, including many technical ones, shrank. The wage return to social skills held up even after accounting for cognitive skill, and the two behaved as complements rather than substitutes: being good with people made being good at the work worth more.",
    source: "Deming, The Growing Importance of Social Skills in the Labor Market, Quarterly Journal of Economics, 2017"
  },
  {
    title: "It is visible in a five year old and still visible twenty years later",
    body: "Teachers rated a group of kindergarten children on ordinary social behaviour: sharing, listening, cooperating, resolving problems with other children. Those ratings predicted education, employment, criminal activity, substance use and mental health outcomes in early adulthood, with family and background characteristics controlled for.",
    source: "Jones, Greenberg and Crowley, American Journal of Public Health, 2015"
  },
  {
    title: "Self control in childhood tracks money and health in middle age",
    body: "A thousand children followed from birth to their thirties in New Zealand showed that childhood self control predicted adult physical health, personal finances and criminal convictions. It held independently of intelligence and of the family's social class, and siblings with lower self control did worse than their own brothers and sisters.",
    source: "Moffitt and colleagues, Proceedings of the National Academy of Sciences, 2011"
  },
  {
    title: "These skills can be taught, and the academic gain is a side effect",
    body: "A review of more than two hundred school programmes teaching social and emotional skills found improvements in behaviour and attitudes, and an average gain of about eleven percentile points in academic achievement. The children were not taught more maths. They were taught to handle themselves, and the maths improved anyway.",
    source: "Durlak and colleagues, Child Development, 2011"
  },
  {
    title: "Having more words for a feeling changes what you do with it",
    body: "People who describe their unpleasant feelings in fine grained terms, distinguishing irritated from resentful from humiliated, regulate themselves better under stress and show less aggression and less heavy drinking than people whose bad feelings all arrive as one undifferentiated bad. This is the reason the first questions here are about vocabulary.",
    source: "Research on emotion differentiation, including Kashdan, Barrett and colleagues"
  },
  {
    title: "What this measure does not claim",
    body: "You will often read that emotional intelligence matters twice as much as intelligence, or accounts for most of what separates top performers. Those specific figures come from popular writing rather than from a clean finding, and they do not hold up when examined. The defensible claim is narrower and still strong: social and emotional skills predict real outcomes independently of intelligence, they are teachable, and the labour market has been paying more for them over time. This measure is a picture of skills at one moment. It is not a diagnosis, not a personality type, and not a prediction about anyone's life."
  }
];

// ---------------------------------------------------------------------------
// HELPERS
// ---------------------------------------------------------------------------

export function clampScore(n) {
  var x = Math.round(Number(n) || SCORE_MIN);
  if (x < SCORE_MIN) { return SCORE_MIN; }
  if (x > SCORE_MAX) { return SCORE_MAX; }
  return x;
}

export function radarData(report) {
  if (!report || !Array.isArray(report.skills)) { return []; }
  return report.skills.map(function (s) {
    return { skill: s.label, score: clampScore(s.score) };
  });
}

// The two strongest skills by score, for the certificate. Labels only.
export function topTwoSkills(report) {
  var sk = report && Array.isArray(report.skills) ? report.skills.slice() : [];
  sk.sort(function (a, b) { return clampScore(b.score) - clampScore(a.score); });
  return sk.slice(0, 2).map(function (s) { return s.label; });
}

// ---------------------------------------------------------------------------
// LOCAL RESULTS. The full picture, the written report and the answers live in
// the browser on the person's own device. Answers also go to the configured AI
// provider while generating a result. Clearing
// browser data clears them, which is the point. Every function here fails
// quietly, because private browsing and locked down browsers block storage and
// none of that may ever break a result on screen.
// ---------------------------------------------------------------------------

export const LOCAL_RESULTS_KEY = "empathy_measure_community_results";
export const LOCAL_SESSION_KEY = "empathy_measure_community_session";
export const LOCAL_MAX_RESULTS = 12;

function storageAvailable() {
  try {
    var t = "__em_test__";
    window.localStorage.setItem(t, "1");
    window.localStorage.removeItem(t);
    return true;
  } catch (e) {
    return false;
  }
}

function readJSON(key, fallback) {
  try {
    var raw = window.localStorage.getItem(key);
    if (!raw) { return fallback; }
    var parsed = JSON.parse(raw);
    return parsed == null ? fallback : parsed;
  } catch (e) {
    return fallback;
  }
}

function writeJSON(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (e) {
    return false;
  }
}

export function localAvailable() {
  return storageAvailable();
}

// The label a saved result is listed under. First names only, as everywhere.
export function localResultLabel(entry) {
  var who = entry.child_name || entry.name || "Your result";
  var band = bandFor(entry.band);
  var bits = [band ? band.label : ""];
  if (entry.exact_age != null) { bits.push("age " + entry.exact_age); }
  if (entry.theme) { bits.push(themeFor(entry.theme).label); }
  return { who: who, detail: bits.filter(function (b) { return !!b; }).join(", ") };
}

export function listLocalResults() {
  var all = readJSON(LOCAL_RESULTS_KEY, []);
  return Array.isArray(all) ? all : [];
}

export function getLocalResult(id) {
  var all = listLocalResults();
  for (var i = 0; i < all.length; i++) {
    if (all[i].id === id) { return all[i]; }
  }
  return null;
}

// Saves the whole finished picture locally and returns its id, or null if the
// browser will not store anything.
export function saveLocalResult(state, report) {
  var entry = {
    id: "r" + Date.now() + Math.floor(Math.random() * 1000),
    saved_at: new Date().toISOString(),
    mode: modeFor(state.band),
    band: state.band || "",
    exact_age: state.exact_age != null ? state.exact_age : null,
    theme: state.theme || "",
    language: state.language || DEFAULT_LANGUAGE,
    context: state.context || null,
    name: state.name || "",
    child_name: state.child_name || "",
    history: (state.history || []).map(function (h) {
      return { n: h.n, skill: h.skill, was_followup: !!h.was_followup, unscored: !!h.unscored, question: h.question, answer: h.answer };
    }),
    report: report || null
  };
  var all = listLocalResults();
  all.unshift(entry);
  if (all.length > LOCAL_MAX_RESULTS) { all = all.slice(0, LOCAL_MAX_RESULTS); }
  return writeJSON(LOCAL_RESULTS_KEY, all) ? entry.id : null;
}

export function deleteLocalResult(id) {
  var all = listLocalResults().filter(function (e) { return e.id !== id; });
  return writeJSON(LOCAL_RESULTS_KEY, all);
}

export function clearLocalResults() {
  try {
    window.localStorage.removeItem(LOCAL_RESULTS_KEY);
    window.localStorage.removeItem(LOCAL_SESSION_KEY);
    return true;
  } catch (e) {
    return false;
  }
}

// An interview in progress, so a dropped call or a stray back button does not
// throw away eight answers. Saved after every answer, cleared when the report
// is built or the person starts again.
export function saveSession(state, current, currentMainN) {
  return writeJSON(LOCAL_SESSION_KEY, {
    saved_at: new Date().toISOString(),
    band: state.band || "",
    exact_age: state.exact_age != null ? state.exact_age : null,
    theme: state.theme || "",
    language: state.language || DEFAULT_LANGUAGE,
    context: state.context || null,
    consent: !!state.consent,
    name: state.name || "",
    child_name: state.child_name || "",
    denied: state.denied || [],
    history: state.history || [],
    current: current || null,
    current_main_n: currentMainN || 0
  });
}

// Returns a session only if it is unfinished and less than a day old.
export function loadSession() {
  var s = readJSON(LOCAL_SESSION_KEY, null);
  if (!s || !s.band || !Array.isArray(s.history)) { return null; }
  var mainAnswered = s.history.filter(function (h) { return !h.was_followup && !h.unscored && h.n >= 1 && h.answer != null; }).length;
  if (mainAnswered < 1 || mainAnswered >= TOTAL_QUESTIONS) { return null; }
  var age = Date.now() - new Date(s.saved_at).getTime();
  if (!(age >= 0) || age > 86400000) { return null; }
  return s;
}

export function clearSession() {
  try {
    window.localStorage.removeItem(LOCAL_SESSION_KEY);
    return true;
  } catch (e) {
    return false;
  }
}

// ---------------------------------------------------------------------------
// DAILY SESSION GUARD. Local only, so it is a speed bump rather than a lock,
// and that is all it is meant to be.
// ---------------------------------------------------------------------------

export const LOCAL_STARTS_KEY = "empathy_measure_community_starts";

function todayKey() {
  var d = new Date();
  return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
}

export function sessionsStartedToday() {
  var rec = readJSON(LOCAL_STARTS_KEY, null);
  if (!rec || rec.day !== todayKey()) { return 0; }
  return Number(rec.count) || 0;
}

export function noteSessionStart() {
  var day = todayKey();
  var rec = readJSON(LOCAL_STARTS_KEY, null);
  var count = (rec && rec.day === day) ? (Number(rec.count) || 0) + 1 : 1;
  writeJSON(LOCAL_STARTS_KEY, { day: day, count: count });
  return count;
}

export function dailyLimitReached() {
  if (!storageAvailable()) { return false; }
  return sessionsStartedToday() >= MAX_SESSIONS_PER_DAY;
}

