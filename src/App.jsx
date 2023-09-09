import { useEffect, useReducer } from "react"
import Header from "./Components/Header"
import Main from "./Components/Main"
import Loader from "./Components/Loader"
import Error from "./Components/Error"
import StartScreen from "./Components/StartScreen"
import Question from "./Components/Question"
import NextButton from "./Components/NextButton"
import Progress from "./Components/Progress"


const initialState = {
  questions: [],
  status: 'loading',          //loading,error,ready,active,finished
  index: 0,
  answer: null,
  points: 0
}


const reducer = (state, action) => {

  switch (action.type) {


    case 'dataReceived':
      return { ...state, questions: action.payload, status: 'ready' }


    case 'dataFailed':
      return { ...state, status: 'error' }


    case 'start':
      return { ...state, status: 'active' }




    case 'newAnswer':

      const question = state.questions.at(state.index)


      console.log(question)

      return {
        ...state,
        answer: action.payload,
        points: action.payload === question.correctOption ?
          state.points + question.points : state.points
      }


    case 'nextQuestion':
      return { ...state, index: state.index + 1, answer: null }


    default:
      throw new Error("action unknown")

  }
}



const App = () => {



  const [state, dispatch] = useReducer(reducer, initialState)



  const { questions, status, index, answer, points } = state;

  //console.log(questions)
  //console.log(status)
  //console.log(points)




  //derived state
  const numQuestions = questions.length;
  const maxPoints = questions.reduce((prev, curr) => prev + curr.points, 0)




  useEffect(() => {

    fetch('http://localhost:9000/questions').then(res => res.json())
      .then(data => dispatch({ type: 'dataReceived', payload: data }))
      .catch(err => dispatch({ type: 'dataFailed' }))

  }, [])










  return (
    <div className="app">

      <Header />

      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}


        {status === 'ready' && <StartScreen numQuestions={numQuestions} dispatch={dispatch} />}

        {status === 'active' &&
          <>

            <Progress index={index}
              numQuestions={numQuestions}
              points={points}
              maxPoints={maxPoints} />


            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer} />


            <NextButton dispatch={dispatch} answer={answer} />
          </>
        }


      </Main>


    </div>
  )
}

export default App