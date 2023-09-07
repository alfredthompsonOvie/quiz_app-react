/* eslint-disable react/prop-types */
function NextButton({ index, numQuestions, dispatch, answer }) {
  if (answer === null) return null;

  if(index < numQuestions-1) return (
    <button
      className="btn btn-ui"
      onClick={()=>dispatch({type: "nextQestion"})}
    >next</button>
  )

  if (index === numQuestions - 1) return <button
    className="btn btn-ui"
    onClick={()=>dispatch({type: "finish"})}
  >finish</button>
}

export default NextButton;
