import { useState } from "react";
import { topicPercent, topicStatus } from "../utils/progress.js";
import { categoryIcon } from "../data/categoryIcons.js";
import { categoryColor } from "../data/categoryColors.js";

const STATUS_LABEL = { mastered: "Dominado", practiced: "En progreso", new: "Nuevo" };

export default function StudyList({ topics, categoryOrder, progress, onSelectTopic }) {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();
  const isSearching = q.length > 0;

  return (
    <div className="page-stack">
      <div className="page-head">
        <h2>Temario completo</h2>
        <p>Elige un tema para repasar su explicación y practicar con preguntas cortas.</p>
      </div>

      <div className="topic-search">
        <input
          type="search"
          placeholder="Buscar tema..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Buscar tema"
        />
      </div>

      <div className="study-groups">
        {categoryOrder.map((cat) => {
          const catTopics = topics.filter((t) => t.category === cat);
          const visible = isSearching
            ? catTopics.filter((t) => t.title.toLowerCase().includes(q) || t.num.toLowerCase().includes(q))
            : catTopics;
          if (visible.length === 0) return null;
          const color = categoryColor(cat);

          return (
            <div className="study-group" key={cat}>
              <div className="category-label">
                <span className="category-icon" aria-hidden="true">
                  {categoryIcon(cat)}
                </span>
                {cat}
              </div>
              <div className="topic-grid">
                {visible.map((t) => {
                  const percent = topicPercent(progress, t.id);
                  const status = topicStatus(progress, t.id);
                  return (
                    <button key={t.id} type="button" className="card topic-card" onClick={() => onSelectTopic(t)}>
                      <div className="topic-card-head">
                        <span className="badge-letter" style={{ background: color }} aria-hidden="true">
                          {categoryIcon(cat)}
                        </span>
                        <span className="num mono">Tema {t.num}</span>
                      </div>
                      <h3>{t.title}</h3>
                      <div className="topic-card-foot">
                        <span className="bar">
                          <span style={{ width: `${percent * 100}%`, background: color }} />
                        </span>
                        <span className="status">{STATUS_LABEL[status]}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
