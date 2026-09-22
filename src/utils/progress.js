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

export function normalize(s) {
  return s.trim().toLowerCase().replace(/[.!?]+$/, "").replace(/\s+/g, " ");
}

export function checkFillAnswer(q, value) {
  const candidates = [q.answer].concat(q.alt || []);
  const v = normalize(value);
  return candidates.some((c) => normalize(c) === v);
}
