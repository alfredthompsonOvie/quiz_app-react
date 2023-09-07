/* eslint-disable react/prop-types */
function FinishScreen({ points, numOfPossiblePoints,dispatch,highscore }) {
  const percentage = (points / numOfPossiblePoints) * 100;

  let emoji;
  if (percentage === 100) emoji = "🥇";
  if (percentage >= 80 && percentage < 100) emoji = "🎉";
  if (percentage >= 50 && percentage < 80) emoji = "😁";
  if (percentage >= 0 && percentage < 50) emoji = "😔";
  if (percentage === 0) emoji = "🤦‍♂️";

  return (
    <div>
      <p className="result">
        <span>{emoji}</span> You scored <strong>{points}</strong> out of {numOfPossiblePoints} ({Math.ceil(percentage)}%).
      </p>
      <p className="highscore">(Highscore: {highscore} points)</p>
      <button
        onClick={() => dispatch({ type: "restart" })}
        className="btn btn-ui"
      >Restart Quiz</button>
    </div>
  )
}

export default FinishScreen
