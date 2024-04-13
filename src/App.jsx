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
import Footer from "./components/Footer";

const SEC_PER_QUESTION = 30;

const initialState = {
	questions: [],
	status: "loading",
	index: 0,
	answer: null,
	points: 0,
	highscore: 0,
	secondsRemaining: null,
};

function reducer(state, action) {
	switch (action.type) {
		case "dataReceived":
			return { ...state, questions: action.payload, status: "ready" };
		case "dataFailed":
			return { ...state, status: "error" };
		case "start":
			return { ...state, status: "active", secondsRemaining: state.questions.length * SEC_PER_QUESTION };
		case "newAnswer":
			// eslint-disable-next-line no-case-declarations
			const question = state.questions[state.index];
			console.log(state.answer, question);
			return {
				...state,
				answer: action.payload,

				points:
					action.payload === question.correctOption
						? state.points + question.points
						: state.points,
			};
		case "nextQestion":
			return { ...state, index: state.index + 1, answer: null };
		case "finish":
			return {
				...state,
				status: "finished",
				highscore:
					state.points > state.highscore ? state.points : state.highscore,
			};
    case "restart":
      // eslint-disable-next-line no-case-declarations
      // const questions = localStorage.getItem("questions")

      return { ...initialState, questions: state.questions, status: "ready" };
      // return { ...initialState, questions: JSON.parse(questions), status: "ready" };
    case "tick": 
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished": state.status
      }

		default:
			throw new Error("action unknown");
	}
}

function App() {
	const [
		{ questions, status, index, answer, points, highscore, secondsRemaining },
		dispatch,
	] = useReducer(reducer, initialState);

	const numQuestions = questions?.length;
	const numOfPossiblePoints = questions?.reduce(
		(acc, cur) => acc + cur.points,
		0
	);

	useEffect(function () {
		async function getData() {
			try {
				// const res = await fetch("http://localhost:8000/questions");
				const res = await fetch(
					"https://webpulse-react-quiz.vercel.app/questions.json"
				);
				const data = await res.json();

				console.log("data", data.questions);

				// localStorage.setItem("questions", JSON.stringify(data.questions));

				dispatch({ type: "dataReceived", payload: data.questions });
			} catch (err) {
				console.log(err);
				dispatch({ type: "dataFailed" });
			}
		}
		getData();
	}, []);

	return (
		<div className="app">
			<Header />

			<Main>
				{status === "loading" && <Loader />}
				{status === "error" && <Error />}
				{status === "ready" && (
					<StartScreen numQuestions={numQuestions} dispatch={dispatch} />
				)}

				{status === "active" && (
					<>
						<Progress
							answer={answer}
							numQuestions={numQuestions}
							index={index}
							points={points}
							numOfPossiblePoints={numOfPossiblePoints}
						/>
						<Question
							question={questions[index]}
							answer={answer}
							dispatch={dispatch}
						/>

						<Footer>
							<Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />

							<NextButton
								index={index}
								numQuestions={numQuestions}
								dispatch={dispatch}
								answer={answer}
							/>
						</Footer>
					</>
				)}
				{status === "finished" && (
					<FinishScreen
						points={points}
						numOfPossiblePoints={numOfPossiblePoints}
						dispatch={dispatch}
						highscore={highscore}
					/>
				)}
			</Main>
		</div>
	);
}

export default App;
