import Intro from "./Intro.jsx";
import StudyList from "./StudyList.jsx";
import Lesson from "./Lesson.jsx";
import Question from "./Question.jsx";
import Summary from "./Summary.jsx";

export default function Board({
  view,
  topic,
  topics,
  categoryOrder,
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
  if (view === "estudiar" && !topic) {
    return (
      <div className="container">
        <StudyList topics={topics} categoryOrder={categoryOrder} progress={progress} onSelectTopic={onSelectTopic} />
      </div>
    );
  }

  if (view === "lesson" && topic) {
    return (
      <div className="container">
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
      </div>
    );
  }

  if (view === "quiz" && topic) {
    const question = topic.questions[qIndex];
    return (
      <div className="container">
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
      </div>
    );
  }

  if (view === "summary" && topic) {
    return (
      <div className="container">
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
      </div>
    );
  }

  return (
    <div className="container">
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
