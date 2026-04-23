import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import "./Quiz.css";
import fallbackQuestions from "../data/quizQuestions.json";

const normalizeQuestions = (payload) => {
  const candidates = [
    payload,
    payload?.record,
    payload?.record?.questions,
    payload?.questions,
  ];

  const questions = candidates.find((candidate) => Array.isArray(candidate));

  if (!questions) {
    return [];
  }

  return questions.filter(
    (question) =>
      question &&
      typeof question.question === "string" &&
      Array.isArray(question.answers) &&
      question.answers.length > 0 &&
      Number.isInteger(question.correctAnswer)
  );
};

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      const binId = import.meta.env.VITE_JSONBIN_BIN_ID;
      const apiKey = import.meta.env.VITE_JSONBIN_API_KEY;

      try {
        if (!binId || !apiKey) {
          throw new Error("Faltan variables de entorno de JsonBin.");
        }

        const response = await fetch(`https://api.jsonbin.io/v3/b/${binId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-Master-Key": apiKey,
          },
        });

        if (response.ok) {
          const data = await response.json();
          const preguntas = normalizeQuestions(data);

          if (preguntas.length > 0) {
            setQuestions(preguntas);
            return;
          }
        }

        setQuestions(fallbackQuestions);
      } catch (err) {
        console.error("Error fetching API:", err);
        setQuestions(fallbackQuestions);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  if (loading) {
    return <p className="loading-text">Cargando preguntas...</p>;
  }

  if (!questions.length) {
    return <p className="loading-text">No hay preguntas disponibles.</p>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  if (!currentQuestion) {
    return <p className="loading-text">Error cargando la pregunta.</p>;
  }

  const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

  const handleSelectAnswer = (index) => {
    if (!validated) {
      setSelectedAnswer(index);
    }
  };

  const handleValidate = () => {
    if (selectedAnswer !== null) {
      setValidated(true);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setValidated(false);
    }
  };

  return (
    <div className="quiz-container">
      {validated && isCorrect && <Confetti />}

      <div className="quiz-card">
        <h1 className="quiz-title">Trivia Liga de Costa Rica</h1>

        <p className="quiz-counter">
          Pregunta {currentQuestionIndex + 1} de {questions.length}
        </p>

        <h2 className="quiz-question">{currentQuestion.question}</h2>

        {currentQuestion.answers.map((answer, index) => {
          let buttonClass = "quiz-button";

          if (validated) {
            if (index === currentQuestion.correctAnswer) {
              buttonClass += " button-correct";
            } else if (index === selectedAnswer) {
              buttonClass += " button-incorrect";
            }
          } else if (selectedAnswer === index) {
            buttonClass += " button-selected";
          }

          return (
            <button
              key={index}
              onClick={() => handleSelectAnswer(index)}
              className={buttonClass}
            >
              {answer}
            </button>
          );
        })}

        <button
          className="validate-btn"
          onClick={handleValidate}
          disabled={selectedAnswer === null || validated}
        >
          Validar respuesta
        </button>

        {validated && (
          <p className={isCorrect ? "result-correct" : "result-incorrect"}>
            {isCorrect ? "¡Correcto!" : "Incorrecto"}
          </p>
        )}

        <button
          className="next-btn"
          onClick={handleNextQuestion}
          disabled={!validated || currentQuestionIndex === questions.length - 1}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}

export default Quiz;
