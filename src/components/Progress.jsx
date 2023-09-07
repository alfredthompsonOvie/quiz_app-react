/* eslint-disable react/prop-types */
function Progress({numQuestions, index, points, numOfPossiblePoints, answer}) {
  return (
    <header className="progress">
      <progress value={index + Number(answer !== null)} max={numQuestions} />
      <p>Question <strong>{index}</strong> / { numQuestions}</p>
      <p><strong>{points}</strong> / {numOfPossiblePoints}</p>
    </header>
  )
}

export default Progress;
