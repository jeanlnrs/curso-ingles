const STORAGE_KEY = "tablero-ingles-last-topic-v1";

export function loadLastTopicId() {
  try {
    return localStorage.getItem(STORAGE_KEY) || null;
  } catch (e) {
    return null;
  }
}

export function saveLastTopicId(id) {
  try {
    localStorage.setItem(STORAGE_KEY, id);
  } catch (e) {}
}
