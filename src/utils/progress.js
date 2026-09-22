const STORAGE_KEY = "tablero-ingles-progress-v1";

export function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

export function saveProgress(progress) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {}
}

export function topicStatus(progress, id) {
  const p = progress[id];
  if (!p || p.attempts === 0) return "new";
  if (p.bestCorrect >= p.total) return "mastered";
  return "practiced";
}

export function topicPercent(progress, id) {
  const p = progress[id];
  if (!p || !p.total) return 0;
  return Math.max(0, Math.min(1, p.bestCorrect / p.total));
}

const REVIEW_AFTER_DAYS = 7;

export function getReviewTopic(topics, progress) {
  const now = Date.now();
  let stalest = null;
  let stalestAge = -1;

  topics.forEach((t) => {
    const p = progress[t.id];
    if (!p || topicStatus(progress, t.id) !== "mastered" || !p.lastPracticedAt) return;
    const ageDays = (now - new Date(p.lastPracticedAt).getTime()) / (1000 * 60 * 60 * 24);
    if (ageDays >= REVIEW_AFTER_DAYS && ageDays > stalestAge) {
      stalestAge = ageDays;
      stalest = t;
    }
  });

  return stalest;
}

export function normalize(s) {
  return s.trim().toLowerCase().replace(/[.!?]+$/, "").replace(/\s+/g, " ");
}

export function checkFillAnswer(q, value) {
  const candidates = [q.answer].concat(q.alt || []);
  const v = normalize(value);
  return candidates.some((c) => normalize(c) === v);
}
