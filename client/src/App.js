import './App.css';
import {BrowserRouter as Router, Route, Routes, useLocation} from 'react-router-dom';

import Login from './pages/Login';
import Projects from './pages/Projects';
import Tasks from './pages/Tasks';

import logoutIcon from './imgs/icons8-logout-50.png';

function Navigation () {
  const location = useLocation();
  let pageName = "Unspecified";

  if (location.pathname === "/") {
    return null;
  } else if (location.pathname === "/projects") {
    pageName = "Projects"
  }

  return (
    <div className="NavBar">
      <div style={{ flex: 1, textAlign: 'left' }}>
        <h1 className= "AppBarUser">User Name</h1>
      </div>
      <div>
        <h1 className = "AppBarHeading"> {pageName} </h1>
      </div>
      <div style={{ flex: 1, textAlign: 'right' }}>
        <img src= {logoutIcon} className= "LogoutImg" alt="Logout" style={{ width: '30px', height: 'auto' }}/>
      </div>
    </div>
  );
}

function App() {
  
  return (
    <div className="App">
      <Router>
        <Navigation/>
        <Routes>
          <Route path="/" exact element={<Login />} />
          <Route path="/projects" exact element={<Projects />}/>
          <Route path="/tasks" exact element={<Tasks />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
