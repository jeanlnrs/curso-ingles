const ICONS = {
  "Sustantivos y artículos": "🔤",
  "Descripciones y posesión": "🎨",
  "Verbos base": "⚙️",
  "Presente simple": "🔁",
  "Demostrativos y hay": "👉",
  "WH questions": "❓",
  "Cantidad y sustantivos incontables": "🧮",
  "Contracciones y would": "🔗",
  "Presente progresivo": "🏃",
  "Preposiciones": "📍",
  "Comida y cantidad": "🍽️",
  "Tiempo y días": "📅",
  "Repaso general": "🧩",
  "Futuro": "🔮",
  "Pasado simple": "🕰️",
  "Pronunciación": "🔊",
};

const DEFAULT_ICON = "📘";

export function categoryIcon(category) {
  return ICONS[category] || DEFAULT_ICON;
}
