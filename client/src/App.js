import './CSS/App.css';
import {BrowserRouter as Router, Route, Routes, useLocation, useNavigate, Navigate} from 'react-router-dom';
import Login from './pages/Login';
import Projects from './pages/ProjectsPages/Projects';
import Tasks from './pages/TasksPages/Tasks';
import CreateProject from './pages/ProjectsPages/CreateProject';
import JoinProject from './pages/ProjectsPages/JoinProject';
import CreateTask from './pages/TasksPages/CreateTask';
import EditTask from './pages/TasksPages/EditTask';
import logoutIcon from './imgs/icons8-logout-50.png';
import { jwtDecode } from "jwt-decode";
import { useState } from 'react';

//Get access token from cookies method
const getAccessToken = () => document.cookie.split('; ').find(row => row.startsWith('accessToken='))?.split('=')[1];

function Navigation ({ setToken }) {
  const location = useLocation();
  const navigate = useNavigate();

  //Logout function
  const logOut = () => {
    document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; 
    setToken(null);
    navigate("/", { replace: true });
  }

  //Get signed in users details from accessToken for displaying
  const token = getAccessToken();
  let userName = "Unspecified";
  
  if (token) {
    try {
      const decoded = jwtDecode(token);
      userName = decoded.name;
    } catch (e) { 
      console.error("Invalid token");
    }
  }

  //Specify app bar header and whether to show app bar or not
  const selectedProjectName = location.state?.projectName;
  let pageName = "Unspecified";

  if (location.pathname === "/" || location.pathname === "/createProject" || location.pathname === "/joinProject" || location.pathname === "/createTask" || location.pathname === "/editTask") {
    return null;
  } else if (location.pathname === "/projects") {
    pageName = "Projects"
  } else if (location.pathname === "/tasks" && selectedProjectName) {
    pageName = selectedProjectName;
  }

  //App bar
  return (
    <div className="NavBar">
      <div style={{ flex: 1, textAlign: 'left' }}>
        <h1 className= "AppBarUser"> {userName} </h1>
      </div>
      <div>
        <h1 className = "AppBarHeading"> {pageName} </h1>
      </div>
      <div style={{ flex: 1, textAlign: 'right' }}>
        <img src= {logoutIcon} onClick = {logOut} className= "LogoutImg" alt="Logout" style={{ width: '30px', height: 'auto' }}/>
      </div>
    </div>
  );
}

function App() {
  const [projectName, setProjectName] = useState("Unspecified");
  
  const [token, setToken] = useState(getAccessToken());
  const isAuthenticated = !!token;

  return (
    <div className="App">
      <Router>
        <Navigation projectName={projectName} setToken={setToken}/>
        <Routes>
          <Route path="/" element={isAuthenticated ? <Navigate to="/projects" replace /> : <Login setToken= {setToken}/>} />
          <Route path="/projects" element={isAuthenticated ? <Projects /> : <Navigate to="/" replace />}/>
          <Route path="/tasks" element={isAuthenticated ? <Tasks setProjectName={setProjectName} /> : <Navigate to="/" replace />}/>
          <Route path="/createProject" element={isAuthenticated ? <CreateProject /> : <Navigate to="/" replace />} />
          <Route path="/joinProject" element={isAuthenticated ? <JoinProject /> : <Navigate to="/" replace />} />
          <Route path="/createTask" element={isAuthenticated ? <CreateTask /> : <Navigate to="/" replace />} />
          <Route path="/editTask" element={isAuthenticated ? <EditTask /> : <Navigate to="/" replace />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
