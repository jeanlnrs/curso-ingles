import { useEffect, useMemo, useState } from "react";
import { TOPICS } from "./data/topics.js";
import { loadProgress, saveProgress, topicStatus, getReviewTopic } from "./utils/progress.js";
import { loadTheme, saveTheme, applyTheme } from "./utils/theme.js";
import { loadLastTopicId, saveLastTopicId } from "./utils/lastTopic.js";
import { loadStreak, saveStreak, registerActivity } from "./utils/streak.js";
import Header from "./components/Header.jsx";
import TopicNav from "./components/TopicNav.jsx";
import Board from "./components/Board.jsx";

export default function App() {
  const [progress, setProgress] = useState(loadProgress);
  const [theme, setTheme] = useState(loadTheme);
  const [lastTopicId, setLastTopicId] = useState(loadLastTopicId);
  const [streak, setStreak] = useState(loadStreak);
  const [selectedTopicId, setSelectedTopicId] = useState(null);
  const [view, setView] = useState("intro");
  const [qIndex, setQIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [finishedOnce, setFinishedOnce] = useState(false);
  const [justMastered, setJustMastered] = useState(false);

  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  useEffect(() => {
    applyTheme(theme);
    saveTheme(theme);
  }, [theme]);

  useEffect(() => {
    if (lastTopicId) saveLastTopicId(lastTopicId);
  }, [lastTopicId]);

  useEffect(() => {
    saveStreak(streak);
  }, [streak]);

  const categoryOrder = useMemo(() => {
    const order = [];
    TOPICS.forEach((t) => {
      if (!order.includes(t.category)) order.push(t.category);
    });
    return order;
  }, []);

  const currentTopic = useMemo(
    () => TOPICS.find((t) => t.id === selectedTopicId) || null,
    [selectedTopicId]
  );

  const reviewTopic = useMemo(() => getReviewTopic(TOPICS, progress), [progress]);

  function toggleTheme() {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }

  function selectTopic(topic) {
    setSelectedTopicId(topic.id);
    setLastTopicId(topic.id);
    setView("lesson");
    setQIndex(0);
    setCorrectCount(0);
    setFinishedOnce(false);
    setJustMastered(false);
  }

  function goToTopics() {
    setSelectedTopicId(null);
    setView("intro");
  }

  function showLesson() {
    setView("lesson");
  }

  function beginQuiz() {
    setView("quiz");
  }

  function restartQuiz() {
    setQIndex(0);
    setCorrectCount(0);
    setFinishedOnce(false);
    setJustMastered(false);
    setView("quiz");
  }

  function handleAnswered(isCorrect) {
    if (isCorrect) setCorrectCount((c) => c + 1);
  }

  function advance() {
    if (!currentTopic) return;
    if (qIndex + 1 < currentTopic.questions.length) {
      setQIndex((i) => i + 1);
    } else {
      finishTopic();
    }
  }

  function finishTopic() {
    if (!currentTopic) return;
    const total = currentTopic.questions.length;
    const wasMastered = topicStatus(progress, currentTopic.id) === "mastered";

    setProgress((prev) => {
      const prevEntry = prev[currentTopic.id] || { attempts: 0, bestCorrect: 0, total };
      const nextEntry = {
        attempts: prevEntry.attempts + 1,
        total,
        bestCorrect: Math.max(prevEntry.bestCorrect, correctCount),
        lastPracticedAt: new Date().toISOString(),
      };
      return { ...prev, [currentTopic.id]: nextEntry };
    });

    setStreak((prev) => registerActivity(prev));
    setJustMastered(!wasMastered && correctCount === total);
    setFinishedOnce(true);
    setView("summary");
  }

  return (
    <div className="app">
      <Header
        topics={TOPICS}
        progress={progress}
        theme={theme}
        onToggleTheme={toggleTheme}
        streakCount={streak.count}
      />
      <div className="layout">
        <TopicNav
          categoryOrder={categoryOrder}
          topics={TOPICS}
          progress={progress}
          activeTopicId={selectedTopicId}
          onSelect={selectTopic}
        />
        <Board
          view={view}
          topic={currentTopic}
          topics={TOPICS}
          progress={progress}
          lastTopicId={lastTopicId}
          reviewTopic={reviewTopic}
          qIndex={qIndex}
          correctCount={correctCount}
          finishedOnce={finishedOnce}
          justMastered={justMastered}
          onSelectTopic={selectTopic}
          onShowLesson={showLesson}
          onBeginQuiz={beginQuiz}
          onRestartQuiz={restartQuiz}
          onAnswered={handleAnswered}
          onAdvance={advance}
          onBackToTopics={goToTopics}
        />
      </div>
      <footer className="hint">Tu progreso se guarda en este navegador. Elige un tema para empezar.</footer>
    </div>
  );
}
