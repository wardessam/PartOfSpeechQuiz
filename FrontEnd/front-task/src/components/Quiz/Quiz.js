import {useEffect,useState} from 'react';
import axios from 'axios';
import { Navigate } from 'react-router';
import Box from '@mui/material/Box';
import {CircularProgress} from '@mui/material';
import LinearProgressWithLabel from '../Progress';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
function Quiz() {
    const [questions,setQuestions] = useState([]);
    const [score,setScore] = useState(0);
    const [correct,isCorrect] = useState(false);
    const [wrong,iswrong] = useState(false);
    const [progress,setProgress] = useState('');
    let endpoint = 'http://localhost:3001/getWordList';
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const handleAnswerOptionClick = (e) => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 0 : Number(prevProgress) + 6.6));
      console.log(questions[currentQuestion].pos,e.target.innerHTML)
      if(questions[currentQuestion].pos === e.target.innerHTML.toLowerCase()){
       debugger
        setScore(score + 1);
        isCorrect(true)
        alert("Right Answer!");
        console.log(score)
      }
      else{
        iswrong(true)
        alert("Wrong Answer!");
      }
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion);
        renderAlert();
      
      } else {
        setShowScore(true);
      }
    };
    const renderAlert = () => {
      if (correct) {
        isCorrect(false);
        return <Alert severity="success">This is a success alert</Alert>;
      } else {
        return <Alert severity="error">This is an error alert</Alert>;
      }
    }
    useEffect(()=>{
        axios.get(endpoint,
            {'Access-Control-Allow-Origin': "*"})
      .then((res) => {
        if (res.status === 200) {
          setQuestions(res.data);
          console.log(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    },[endpoint])
  return (
    <> 
    <Box sx={{ width: '100%' }}>
    <LinearProgressWithLabel value={progress} />
    </Box>
    <div className='app'>
    { !questions.length ? <CircularProgress /> :
    showScore ? (
      <Navigate to={`/score/${score}`} />
      
    ) : (
      <>
      
        <div className='question-section'>
          <div className='question-count'>
            <span>Question {currentQuestion + 1}</span>/{questions.length}
          </div>
          <div className='question-text'>The word "{questions[currentQuestion].word}" is a </div>
        </div>
        <div className='answer-section'>
        <button onClick={(e) => handleAnswerOptionClick(e)}>Adverb</button>
        <button onClick={(e) => handleAnswerOptionClick(e)}>Verb</button>
        <button onClick={(e) => handleAnswerOptionClick(e)}>Noun</button>
        <button onClick={(e) => handleAnswerOptionClick(e)}>Adjective</button>
        </div> 
       
      </>
    )}
  </div>
  
  </>
 );
}

export default Quiz;