import React, { useState } from "react";

export default function Quiz() {
  const questions = [
    {
      question: "What is the capital city of France?",
      options: ["London", "Paris", "Berlin", "Madrid"],
      answer: "Paris",
    },
    {
      question: "Which language is used for web apps?",
      options: ["Python", "JavaScript", "C++", "Java"],
      answer: "JavaScript",
    },
    {
      question: "What does CSS stand for?",
      options: [
        "Cascading Style Sheets",
        "Computer Style Sheets",
        "Colorful Style Sheets",
        "Creative Style Sheets",
      ],
      answer: "Cascading Style Sheets",
    },
  ];

  const [count, setCount] = useState(0);
  const [mark, setMark] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleAnswer = (selected) => {
    if (!answered) {
      setSelectedAnswer(selected);
      const isCorrect = selected === questions[count].answer;
      if (isCorrect) {
        setMark((prev) => prev + 1);
        setCorrect(true);
      } else {
        setCorrect(false);
      }
      setAnswered(true);
    }
  };

  const handleCount = () => {
    if (count + 1 === questions.length) {
      // Reset quiz at the end
      setCount(0);
      setMark(0);
    } else {
      setCount((prev) => prev + 1);
    }
    setAnswered(false);
    setCorrect(false);
    setSelectedAnswer(null);
  };

  return (
    <div>
      <h1>Marks: {mark}</h1>
      <h3>{questions[count].question}</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {questions[count].options.map((q, id) => (
          <li key={id} style={{ margin: "8px 0" }}>
            <button
              style={{
                padding: "10px",
                backgroundColor:
                  answered && q === questions[count].answer
                    ? "green"
                    : answered && q === selectedAnswer
                    ? "red"
                    : "",
                color: answered ? "white" : "black",
                cursor: answered ? "not-allowed" : "pointer",
              }}
              onClick={() => handleAnswer(q)}
              disabled={answered}
            >
              {q}
            </button>
          </li>
        ))}
      </ul>

      {answered && (
        <p style={{ color: correct ? "green" : "red" }}>
          {correct ? "Correct!" : "Wrong!"}
        </p>
      )}

      <button
        onClick={handleCount}
        style={{ marginTop: "20px", padding: "10px" }}
      >
        {count + 1 === questions.length ? "Restart" : "Next"}
      </button>
    </div>
  );
}
