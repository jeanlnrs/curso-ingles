const COLORS = {
  "Sustantivos y artículos": "#2563eb",
  "Descripciones y posesión": "#7c3aed",
  "Verbos base": "#0d9488",
  "Presente simple": "#ea580c",
  "Demostrativos y hay": "#db2777",
  "WH questions": "#dc2626",
  "Cantidad y sustantivos incontables": "#16a34a",
  "Contracciones y would": "#4338ca",
  "Presente progresivo": "#0891b2",
  "Preposiciones": "#ca8a04",
  "Comida y cantidad": "#be123c",
  "Tiempo y días": "#0369a1",
  "Repaso general": "#475569",
  "Futuro": "#9333ea",
  "Pasado simple": "#b45309",
  "Pronunciación": "#059669",
};

const DEFAULT_COLOR = "#8b5cf6";

export function categoryColor(category) {
  return COLORS[category] || DEFAULT_COLOR;
}
