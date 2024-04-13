// import { useState } from 'react'
import { useEffect, useReducer } from "react";

import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import Progress from "./components/Progress";
import NextButton from "./components/NextButton";
import FinishScreen from "./components/FinishScreen";
import Timer from "./components/Timer";

const initialState = {
	questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0
};

function reducer(state, action) {
	switch (action.type) {
		case "dataReceived":
      return { ...state, questions: action.payload, status: 'ready' };
    case "dataFailed":
      return {...state, status: "error"}
    case "start":
      return {...state, status: "active"}
    case "newAnswer":
      // eslint-disable-next-line no-case-declarations
      const question = state.questions[state.index];
      console.log(state.answer, question)
      return {
        ...state,
        answer: action.payload,

        points: action.payload === question.correctOption ? state.points + question.points : state.points,
      }
    case "nextQestion":
      return { ...state, index: state.index + 1, answer: null }
    case "finish":
      return { ...state, status: "finished", highscore: state.points > state.highscore ? state.points : state.highscore  }
    case "restart":
      return { ...initialState, questions: state.questions, status: "ready " }
    
		default:
			throw new Error("action unknown");
	}
}

function App() {

  const [{ questions, status, index, answer, points, highscore }, dispatch] = useReducer(reducer, initialState);
  
  console.log("questions", questions)
  
  const numQuestions = questions?.length;
  const numOfPossiblePoints = questions?.reduce((acc, cur)=> acc + cur.points, 0)

	useEffect(function () {
		async function getData() {
      try {
        // const res = await fetch("http://localhost:8000/questions");
        const res = await fetch("https://webpulse-react-quiz.vercel.app/questions.json");
        const data = await res.json();

        console.log("data", data.questions)
        
        dispatch({type: "dataReceived", payload: data.questions})
      } catch (err) {
        console.log(err)
        dispatch({type: "dataFailed"})
      }
		}
		getData();
	}, []);

	return (
		<div className="app">
			<Header />

      <Main>
        {status === "loading" && <Loader/> }
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen numQuestions={numQuestions} dispatch={dispatch} />}

        {status === "active" &&
          <>
          <Progress answer={answer} numQuestions={numQuestions} index={index} points={points} numOfPossiblePoints={numOfPossiblePoints} />
          <Question question={questions[index]} answer={answer} dispatch={dispatch} />


          <Timer />
          
          <NextButton index={index} numQuestions={numQuestions} dispatch={dispatch} answer={answer} />
          </>
        }
        {status === "finished" && <FinishScreen points={points} numOfPossiblePoints={numOfPossiblePoints} dispatch={dispatch} highscore={highscore} />}
      </Main>
		</div>
	);
}

export default App;
