import './App.css';
import {BrowserRouter as Router, Route, Routes, useLocation, useNavigate} from 'react-router-dom';
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

function Navigation () {
  const location = useLocation();
  let navigate = useNavigate();

  const logOut = () => {
  sessionStorage.removeItem("accessToken");
  navigate("/", { replace: true });
}

  const token = sessionStorage.getItem('accessToken');
  let userName = "Unspecified";
  
  const selectedProjectName = location.state?.projectName;
  
  if (token) {
    const decoded = jwtDecode(token);
    userName = decoded.name;
  }

  let pageName = "Unspecified";

  if (location.pathname === "/" || location.pathname === "/createProject" || location.pathname === "/joinProject" || location.pathname === "/createTask" || location.pathname === "/editTask") {
    return null;
  } else if (location.pathname === "/projects") {
    pageName = "Projects"
  } else if (location.pathname === "/tasks" && selectedProjectName) {
    pageName = selectedProjectName;
  }

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

  return (
    <div className="App">
      <Router>
        <Navigation projectName={projectName}/>
        <Routes>
          <Route path="/" exact element={<Login />} />
          <Route path="/projects" exact element={<Projects />}/>
          <Route path="/tasks" exact element={<Tasks setProjectName={setProjectName} />}/>
          <Route path="/createProject" exact element={<CreateProject />}/>
          <Route path="/joinProject" exact element={<JoinProject />}/>
          <Route path="/createTask" exact element={<CreateTask />}/>
          <Route path="/editTask" exact element={<EditTask />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
