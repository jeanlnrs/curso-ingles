import { useRef, useState } from "react";
import { checkFillAnswer } from "../utils/progress.js";

export default function Question({ topic, question, qIndex, onShowLesson, onAnswered, onAdvance, onBackToTopics }) {
  const [answered, setAnswered] = useState(false);
  const [chosenIndex, setChosenIndex] = useState(null);
  const [fillValue, setFillValue] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const nextBtnRef = useRef(null);

  function answerMC(i) {
    if (answered) return;
    const correct = i === question.answer;
    setAnswered(true);
    setChosenIndex(i);
    setIsCorrect(correct);
    onAnswered(correct);
    requestAnimationFrame(() => nextBtnRef.current && nextBtnRef.current.focus());
  }

  function answerFill() {
    if (answered) return;
    if (!fillValue.trim()) return;
    const correct = checkFillAnswer(question, fillValue);
    setAnswered(true);
    setIsCorrect(correct);
    onAnswered(correct);
    requestAnimationFrame(() => nextBtnRef.current && nextBtnRef.current.focus());
  }

  function handleFillKeyDown(e) {
    if (e.key === "Enter" && !answered) answerFill();
  }

  const isLast = qIndex + 1 >= topic.questions.length;
  const correctText = question.type === "mc" ? question.options[question.answer] : question.answer;

  return (
    <>
      <div className="eyebrow-row">
        <div className="eyebrow">
          Tema {topic.num} · {topic.title}
        </div>
        <button type="button" className="lesson-link" onClick={onShowLesson}>
          📖 Explicación
        </button>
      </div>

      <div className="truco-box">
        <span className="tag">Truco</span>
        <span dangerouslySetInnerHTML={{ __html: topic.truco }} />
      </div>

      <div className="q-progress mono">
        Pregunta {qIndex + 1} de {topic.questions.length}
      </div>

      <div className="q-card">
        <div className="q-prompt" dangerouslySetInnerHTML={{ __html: question.prompt }} />

        {question.type === "mc" ? (
          <div className="options">
            {question.options.map((opt, i) => {
              let cls = "option-btn";
              if (answered && i === question.answer) cls += " correct";
              else if (answered && i === chosenIndex) cls += " incorrect";
              return (
                <button key={i} type="button" className={cls} disabled={answered} onClick={() => answerMC(i)}>
                  {opt}
                </button>
              );
            })}
          </div>
        ) : (
          <div className="fill-row">
            <label htmlFor="fillInput">Escribe tu respuesta:</label>
            <input
              id="fillInput"
              type="text"
              autoComplete="off"
              spellCheck={false}
              disabled={answered}
              className={answered ? (isCorrect ? "correct" : "incorrect") : ""}
              value={fillValue}
              onChange={(e) => setFillValue(e.target.value)}
              onKeyDown={handleFillKeyDown}
            />
            <button type="button" className="primary-btn" disabled={answered} onClick={answerFill}>
              Verificar
            </button>
          </div>
        )}

        {answered && (
          <div className={"feedback " + (isCorrect ? "correct" : "incorrect")}>
            <div className="answer-line">
              {isCorrect ? "¡Correcto!" : `No es así. Respuesta correcta: ${correctText}`}
            </div>
            <div className="explain" dangerouslySetInnerHTML={{ __html: question.explain }} />
            <button
              type="button"
              className="primary-btn"
              style={{ marginTop: "10px" }}
              onClick={onAdvance}
              ref={nextBtnRef}
            >
              {isLast ? "Ver resultado" : "Siguiente pregunta"}
            </button>
          </div>
        )}
      </div>

      <div className="actions-row">
        <button type="button" className="secondary-btn" onClick={onBackToTopics}>
          Volver a temas
        </button>
      </div>
    </>
  );
}
