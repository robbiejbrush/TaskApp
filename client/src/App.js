import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from './pages/Login';
import Projects from './pages/Projects';

function App() {
  
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={<Login />} />
          <Route path="/projects" exact element={<Projects />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
