/* eslint-disable react/prop-types */
function Options({ question, answer, dispatch }) {
  const hasAnswered = answer !== null;
  return (
    <div className="options">
        
        {question.options.map((option, idx) => <button
          key={option}
          onClick={() => dispatch({ type: "newAnswer", payload: idx })}
          className={`btn btn-option ${hasAnswered ?
            idx === question.correctOption ?
              "correct" : "wrong"
            : ""} ${idx === answer ? "answer": ""}`}
          disabled={hasAnswered}
        >
        {option}
      </button>)}
    </div>
  )
}

export default Options
