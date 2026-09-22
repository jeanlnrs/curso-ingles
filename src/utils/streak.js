const STORAGE_KEY = "tablero-ingles-streak-v1";

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

function daysBetween(a, b) {
  const msPerDay = 24 * 60 * 60 * 1000;
  return Math.round((new Date(b + "T00:00:00") - new Date(a + "T00:00:00")) / msPerDay);
}

export function loadStreak() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : { count: 0, lastActiveDate: null };
  } catch (e) {
    return { count: 0, lastActiveDate: null };
  }
}

export function saveStreak(streak) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(streak));
  } catch (e) {}
}

export function registerActivity(streak) {
  const today = todayStr();
  if (streak.lastActiveDate === today) return streak;

  const gap = streak.lastActiveDate ? daysBetween(streak.lastActiveDate, today) : null;
  const count = gap === 1 ? streak.count + 1 : 1;
  return { count, lastActiveDate: today };
}
