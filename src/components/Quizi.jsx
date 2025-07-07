import { useState } from "react";

function QuizApp() {
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
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [selected, setSelected] = useState("");
  const [answered, setAnswered] = useState(false);
  const [marks, setMarks] = useState(0);

  const handleQuestion = () => {
    const equal = count + 1 === questions.length;
    if (equal) {
      setCount(0);
    } else {
      setCount((privCount) => privCount + 1);
    }
    setCorrectAnswer("");
    setAnswered(false);
  };
  const handleAnswer = (answers) => {
    if (!answered) {
      setSelected(answers);
      const isCorrect = answers === questions[count].answer;
      if (isCorrect) {
        setCorrectAnswer(answers);
        setMarks((prevM) => prevM + 1);
      }
      setAnswered(true);
    }
  };
  return (
    <div>
      <h2>
        {count + 1}:{questions[count].question}:{correctAnswer}
      </h2>
      {count === questions.length ? (
        <>
          <p>
            you have {marks}/{questions.length}
          </p>
          <button onClick={() => handleQuestion()}>
            {count + 1 === questions.length ? "restart" : "next"}
          </button>
        </>
      ) : (
        <>
          <ol>
            {questions[count].options.map((opt, id) => (
              <li
                key={id}
                style={{
                  color:
                    correctAnswer === opt
                      ? "green"
                      : selected === opt
                      ? "red"
                      : "",
                }}
                onClick={() => handleAnswer(opt)}
              >
                <button disabled={answered}>{opt}</button>
                <span style={{ color: correctAnswer ? "yellowgreen" : "red" }}>
                  {" "}
                  {correctAnswer === opt
                    ? "well done"
                    : selected === opt
                    ? "'wrong!!'"
                    : ""}
                </span>
              </li>
            ))}
          </ol>
          <button onClick={() => handleQuestion()}>
            {count + 1 === questions.length ? "restart" : "next"}
          </button>
        </>
      )}
    </div>
  );
}

export default QuizApp;
