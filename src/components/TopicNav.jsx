import { topicStatus } from "../utils/progress.js";

export default function TopicNav({ categoryOrder, topics, progress, activeTopicId, onSelect }) {
  return (
    <nav className="topics" aria-label="Temas">
      {categoryOrder.map((cat) => (
        <div className="category" key={cat}>
          <div className="category-label">{cat}</div>
          {topics
            .filter((t) => t.category === cat)
            .map((t) => {
              const status = topicStatus(progress, t.id);
              return (
                <button
                  key={t.id}
                  type="button"
                  className={"topic-btn" + (activeTopicId === t.id ? " active" : "")}
                  onClick={() => onSelect(t)}
                >
                  <span className="num mono">{t.num}</span>
                  <span className="label">{t.title}</span>
                  <span
                    className={
                      "status-dot" +
                      (status === "mastered" ? " mastered" : status === "practiced" ? " practiced" : "")
                    }
                  />
                </button>
              );
            })}
        </div>
      ))}
    </nav>
  );
}
