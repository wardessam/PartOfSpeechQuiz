import logo from './logo.svg';
import './App.css';
import  Quiz from './components/Quiz/Quiz';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import Result from './components/Result/Result';
function App() {
  return (
   <Router>
    <Routes>
    <Route exact path="/" element={<Quiz/>}/>
      <Route path="/score/:score" element={<Result/>}/>
      
      </Routes>
      </Router>
  );
}

export default App;
