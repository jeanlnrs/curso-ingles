import Intro from "./Intro.jsx";
import Lesson from "./Lesson.jsx";
import Question from "./Question.jsx";
import Summary from "./Summary.jsx";

export default function Board({
  view,
  topic,
  qIndex,
  correctCount,
  finishedOnce,
  onShowLesson,
  onBeginQuiz,
  onRestartQuiz,
  onAnswered,
  onAdvance,
  onBackToTopics,
}) {
  if (!topic || view === "intro") {
    return (
      <main className="board">
        <Intro />
      </main>
    );
  }

  if (view === "lesson") {
    return (
      <main className="board">
        <Lesson
          topic={topic}
          qIndex={qIndex}
          finishedOnce={finishedOnce}
          onBeginQuiz={onBeginQuiz}
          onRestartQuiz={onRestartQuiz}
          onBackToTopics={onBackToTopics}
        />
      </main>
    );
  }

  if (view === "quiz") {
    const question = topic.questions[qIndex];
    return (
      <main className="board">
        <Question
          key={topic.id + "-" + qIndex}
          topic={topic}
          question={question}
          qIndex={qIndex}
          onShowLesson={onShowLesson}
          onAnswered={onAnswered}
          onAdvance={onAdvance}
          onBackToTopics={onBackToTopics}
        />
      </main>
    );
  }

  if (view === "summary") {
    return (
      <main className="board">
        <Summary
          topic={topic}
          correctCount={correctCount}
          onRestartQuiz={onRestartQuiz}
          onShowLesson={onShowLesson}
          onBackToTopics={onBackToTopics}
        />
      </main>
    );
  }

  return <main className="board" />;
}
