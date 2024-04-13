/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
function StartScreen({numQuestions, dispatch}) {
  return (
    <section className="start">
      <h1 className="title">Welcome to the react quiz!</h1>
      <p className="info">{numQuestions} questions to test your react mastery</p>

      <button className="btn btn-ui" onClick={()=> dispatch({type: "start"})}>let's start!</button>
    </section>
  )
}

export default StartScreen
