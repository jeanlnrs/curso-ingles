import Intro from "./Intro.jsx";
import Lesson from "./Lesson.jsx";
import Question from "./Question.jsx";
import Summary from "./Summary.jsx";

export default function Board({
  view,
  topic,
  topics,
  progress,
  lastTopicId,
  reviewTopic,
  qIndex,
  correctCount,
  finishedOnce,
  justMastered,
  onSelectTopic,
  onShowLesson,
  onBeginQuiz,
  onRestartQuiz,
  onAnswered,
  onAdvance,
  onBackToTopics,
}) {
  if (!topic || view === "intro") {
    return (
      <div className="board">
        <Intro
          topics={topics}
          progress={progress}
          lastTopicId={lastTopicId}
          reviewTopic={reviewTopic}
          onSelectTopic={onSelectTopic}
        />
      </div>
    );
  }

  if (view === "lesson") {
    return (
      <div className="board">
        <Lesson
          topic={topic}
          qIndex={qIndex}
          finishedOnce={finishedOnce}
          onBeginQuiz={onBeginQuiz}
          onRestartQuiz={onRestartQuiz}
          onBackToTopics={onBackToTopics}
        />
      </div>
    );
  }

  if (view === "quiz") {
    const question = topic.questions[qIndex];
    return (
      <div className="board">
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
      </div>
    );
  }

  if (view === "summary") {
    return (
      <div className="board">
        <Summary
          topic={topic}
          correctCount={correctCount}
          justMastered={justMastered}
          onRestartQuiz={onRestartQuiz}
          onShowLesson={onShowLesson}
          onBackToTopics={onBackToTopics}
        />
      </div>
    );
  }

  return <div className="board" />;
}
