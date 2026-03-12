import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from './pages/Login';

function App() {
  
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
