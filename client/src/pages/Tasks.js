import React, {useState, useEffect} from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

function Tasks() {
  let navigate = useNavigate();
  const location = useLocation();

  //Obtaining props from Projects page
  const { projectId, projectCode } = location.state || {}; 

  //For users dropdown
  const [isOpen, setIsOpen] = useState(false);

  const [projectUsers, setProjectUsers] = useState([]); 

  //Getting signed in user
  let userId = null;
      
  const token = sessionStorage.getItem('accessToken');
  
  if (token) {
    const decoded = jwtDecode(token);
    userId = decoded.userId;
  }

  //Finds current user's info from projectUsers list
  const currentUserInfo = projectUsers.find(u => u.userId === userId);
  const userRole = currentUserInfo?.ProjectMembers?.role;

  //Getting users for projectId
  useEffect(() => {
    if (projectId) {
      axios.get(`http://localhost:3001/projects/${projectId}/users`)
        .then((response) => {
          setProjectUsers(response.data);
        })
        .catch(err => console.log("Error fetching users:", err));
    }
  }, [projectId]);

  //Deleting a project
  const deleteProject = async () => {
    if (window.confirm("Are you sure you want to delete this project? This cannot be undone.")) {
        try {
            await axios.delete(`http://localhost:3001/projects/${projectId}`);
            navigate("/projects");
        } catch (err) {
            console.error("Error deleting project:", err);
            alert("Could not delete this project. Check console for details.");
        }
    }
};

//Leaving a project
const leaveProject = async () => {
    if (window.confirm("Are you sure you want to leave this project?")) {
        try {
            await axios.delete(`http://localhost:3001/projects/${projectId}/leave/${userId}`);
            navigate("/projects"); 
        } catch (err) {
            console.error("Error leaving project:", err);
            alert("Could not leave project.");
        }
    }
};

//Get all tasks for current projectId
const [tasks, setTasks] = useState([]);

useEffect(() => {
    if (projectId) {
        axios.get(`http://localhost:3001/projects/${projectId}/tasks`)
            .then((response) => {
                setTasks(response.data);
            })
            .catch(err => console.log("Error fetching tasks:", err));
    }
}, [projectId]);

const incompleteTasks = tasks.filter(task => task.completionStatus === false);
const completedTasks = tasks.filter(task => task.completionStatus === true);

  return (
    <div>
      <div className= "TasksTopDiv">
        <h1 className= "SmallHeader">Project Code: {projectCode}</h1>
        <div className= "TasksActionsDiv">
          <div className="UserDropdownWrapper">
            {isOpen && (
              <ul className="UserListPopup">
                <li className="ListHeader">Project Users</li>
                {projectUsers.map(user => (
                  <li key={user.userId} className="UserItem">{user.name}</li>
                ))}
              </ul>
            )}
            <button 
              className="Link" 
              style={{ border: 'none', background: 'none', cursor: 'pointer' }}
              onClick={() => setIsOpen(!isOpen)}
            >
              View Users ↓
            </button>
          </div>
          <a className= "Link" href="http://localhost:3000/projects"> ←Projects</a>
          <button className= "Button"
            onClick = {() => {
            navigate("/createTask");
          }}>
            Create Task
          </button>
          {userRole === "owner" ? (
            <button className="DeleteOrLeaveButton" onClick={deleteProject}>
              Delete Project
            </button>
          ) : (
            <button className="DeleteOrLeaveButton" onClick={leaveProject}>
              Leave Project
            </button>
          )}
        </div>
      </div>
      <div className= "StatusHeadingsDiv">
          <div>
            <h1 className= "SmallHeader">Completed</h1>
          </div>
          <div>
            <h1 className= "SmallHeader">To Do</h1>
          </div>
      </div>
    </div>
  )
}

export default Tasks;