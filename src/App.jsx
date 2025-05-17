import { useState , useEffect, useRef} from 'react'
import './App.css'
import { data } from './assets/data'


function App() {

  const [index , setIndex] = useState(1)
  const [question , setQuestion] = useState(data[index-1])
  const [lock , setLock] = useState(false)
  const [score , setScore] = useState(0)
  const [result , setResult] = useState(false)

  let option1 = useRef(null)
  let option2 = useRef(null)
  let option3 = useRef(null)
  let option4 = useRef(null)

  let Option_Array = [option1 , option2 , option3 , option4]
  const CorrectAnswer = (e,ans) =>{
    if(lock == false){
      if(question.ans == ans){
        e.target.classList.add('correct')
        setScore((prev) => prev+1)
        setLock(true)
      }else{
        e.target.classList.add('incorrect');
        setLock(true)
        Option_Array[question.ans-1].current.classList.add('correct')
      }
    }
  }


  const NextQuestion = () => {
    if(lock == true){
      if(index === data.length){
        setResult(true)
        return 0
      }
      setIndex(index+1)
      setQuestion(data[index])
      setLock(false)
      Option_Array.map((option) => {
        option.current.classList.remove('correct')
        option.current.classList.remove('incorrect')
      })
    }
    }

    function Reset(){
      setIndex(1)
      setQuestion(data[0])
      setScore(0)
      setLock(false)
      setResult(false)
    }


  return (
    <>
      <div className="main">
        <div className="quizapp">
          <h1>Quiz App</h1>
          <div className='line'></div>

          {result == true? <></> : <><div className="question">
            <h2>{index + " "}{question.question}</h2>
          </div>
          <div className="answers">
            <button ref={option1} onClick={(e) => {CorrectAnswer(e , 1)}}>{question.option1}</button>
            <button ref={option2} onClick={(e) => {CorrectAnswer(e , 2)}}>{question.option2}</button>
            <button ref={option3} onClick={(e) => {CorrectAnswer(e , 3)}}>{question.option3}</button>
            <button ref={option4} onClick={(e) => {CorrectAnswer(e , 4)}}>{question.option4}</button>
          </div>
          <div className="submit">
            <button onClick={NextQuestion}>Next</button>
            <div className="msg">
              <p>{index} of {data.length} Question</p>
            </div>
          </div></>}
          {result?<h2>{`your Scored ${score} Out of ${data.length}`}
            <div className="reset">
              <button onClick={Reset}>Reset</button>
            </div>
          </h2>: <></>}
        </div>
      </div>
    </>
  )
}

export default App
