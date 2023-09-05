import { useEffect, useReducer } from "react";
import "./App.css";
import Header from "./Header.js";
import Main from "./Main.js";
import Error from "./Error";
import Loader from "./Loader";
import StartScreen from "./StartScreen";
import Questions from "./Questions";
import NextButton from "./NextButton";
import Progess from "./Progess";
import Finished from "./Finished";
import Timer from "./Timer";

const initialState = {
  questions: [],
  status: "Loading",
  index: 0,
  answer: null,
  points: 0,
  secondsRemaining:null
  // Loading, error,ready
};

const TIME_PER_QUESTION=60;

function reduce(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, questions: [], status: "error" };
    case "start":
      return { ...state, status: "active" ,secondsRemaining:state.questions.length*TIME_PER_QUESTION};
    case "newAnswer":
      const question = state.questions[state.index];
      return {
        ...state,
        answer: action.payload,
        points:
          question.correctOption === action.payload
            ? state.points + question.points
            : state.points,
      };
    case 'nextQuestion':
        return {...state,index:state.index+1,answer:null};
    case 'finished':
        return {...state,status:'finished'}; 
    case 'restart':
        return {...initialState,status:'ready',questions:state.questions};
    case 'tick':
        return {...state,secondsRemaining:state.secondsRemaining-1,status:state.secondRemaining===0?'finished':'active'}; 
    default:
      throw new Error("Action not found!!");
  }
}

function App() {
  const [{ questions, status, index, answer ,points,secondsRemaining}, dispatch] = useReducer(
    reduce,
    initialState
  );

  const numQuestions = questions.length;
  const maxPoints=questions.reduce((acc,ele)=>acc+ele.points,0);

  useEffect(function () {
    async function getData() {
      try {
        const res = await fetch("http://localhost:5000/questions");
        if (!res.ok) throw new Error("Data fetching failed!!");
        const data = await res.json();
        dispatch({ type: "dataReceived", payload: data });
      } catch (err) {
        dispatch({ type: "dataFailed", payload: err.message });
      }
    }
    getData();
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "Loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progess index={index} numQuestions={numQuestions} points={points} maxPoints={maxPoints} answer={answer}/>
            <Questions
              questions={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />{" "}
            <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
            <NextButton dispatch={dispatch} answer={answer} index={index} numQuestions={numQuestions}/>
          </>
        )}
        {status==='finished' && <Finished points={points} maxPoints={maxPoints} dispatch={dispatch}/>}
      </Main>
    </div>
  );
}

export default App;
