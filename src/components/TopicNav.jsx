import { useEffect, useMemo, useState } from "react";
import { topicPercent, topicStatus } from "../utils/progress.js";
import { categoryIcon } from "../data/categoryIcons.js";
import ProgressRing from "./ProgressRing.jsx";

export default function TopicNav({ categoryOrder, topics, progress, activeTopicId, onSelect }) {
  const [query, setQuery] = useState("");
  const [collapsed, setCollapsed] = useState(() => new Set());

  const activeCategory = useMemo(() => {
    const t = topics.find((t) => t.id === activeTopicId);
    return t ? t.category : null;
  }, [topics, activeTopicId]);

  useEffect(() => {
    if (!activeCategory) return;
    setCollapsed((prev) => {
      if (!prev.has(activeCategory)) return prev;
      const next = new Set(prev);
      next.delete(activeCategory);
      return next;
    });
  }, [activeCategory]);

  function toggleCategory(cat) {
    setCollapsed((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  }

  const q = query.trim().toLowerCase();
  const isSearching = q.length > 0;

  return (
    <nav className="topics" aria-label="Temas">
      <div className="topic-search">
        <input
          type="search"
          placeholder="Buscar tema..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Buscar tema"
        />
      </div>

      <div className="categories-scroll">
        {categoryOrder.map((cat) => {
          const catTopics = topics.filter((t) => t.category === cat);
          const visibleTopics = isSearching
            ? catTopics.filter((t) => t.title.toLowerCase().includes(q) || t.num.toLowerCase().includes(q))
            : catTopics;
          if (isSearching && visibleTopics.length === 0) return null;

          const masteredCount = catTopics.filter((t) => topicStatus(progress, t.id) === "mastered").length;
          const isCollapsed = !isSearching && collapsed.has(cat);

          return (
            <div className="category" key={cat}>
              <button
                type="button"
                className="category-header"
                onClick={() => toggleCategory(cat)}
                aria-expanded={!isCollapsed}
              >
                <span className="category-label">
                  <span className="category-icon" aria-hidden="true">
                    {categoryIcon(cat)}
                  </span>
                  {cat}
                </span>
                <span className="category-meta mono">
                  {masteredCount}/{catTopics.length}
                  <span className={"chevron" + (isCollapsed ? " collapsed" : "")} aria-hidden="true">
                    ▾
                  </span>
                </span>
              </button>

              <div className={"category-body" + (isCollapsed ? " collapsed" : "")}>
                {catTopics.map((t) => {
                  if (isSearching && !visibleTopics.includes(t)) return null;
                  const percent = topicPercent(progress, t.id);
                  return (
                    <button
                      key={t.id}
                      type="button"
                      className={"topic-btn" + (activeTopicId === t.id ? " active" : "")}
                      onClick={() => onSelect(t)}
                    >
                      <span className="num mono">{t.num}</span>
                      <span className="label">{t.title}</span>
                      <ProgressRing percent={percent} size={16} strokeWidth={2.5} showCheck />
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </nav>
  );
}
