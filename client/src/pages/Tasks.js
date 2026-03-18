import React, {useState, useEffect} from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

function Tasks() {
  let navigate = useNavigate();
  const location = useLocation();

  //Obtaining props from Projects page
  const { projectId, projectCode, projectName } = location.state || {}; 

  //For users dropdown
  const [isOpen, setIsOpen] = useState(false);

  //Getting signed in user
  let userId = null;
      
  const token = sessionStorage.getItem('accessToken');
  
  if (token) {
    const decoded = jwtDecode(token);
    userId = decoded.userId;
  }

  //Finds current user's info from projectUsers list
  const [projectUsers, setProjectUsers] = useState([]); 
  
  const currentUserInfo = projectUsers.find(u => u.userId === userId);
  const userRole = currentUserInfo?.ProjectMembers?.role;

  //Getting users for the projectId to populate drop down
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
        axios.get(`http://localhost:3001/tasks/${projectId}`)
            .then((response) => {
                setTasks(response.data);
            })
            .catch(err => console.log("Error fetching tasks:", err));
    }
}, [projectId]);

//Update task's completion status
const toggleTaskCompletion = async (task) => {
  const newStatus = !task.completionStatus;
  try {
    await axios.put(`http://localhost:3001/tasks/updateStatus/${task.taskId}`, {
      completionStatus: newStatus
    });

    setTasks(prevTasks => 
      prevTasks.map(t => 
        t.taskId === task.taskId ? { ...t, completionStatus: newStatus } : t
      )
    );
  } catch (err) {
    console.error("Error updating task:", err);
    alert("Could not update task status.");
  }
};

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
            navigate("/createTask", {
              state: {
                projectId, 
                projectCode,
                projectName
              }
            });
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
      <div className="StatusHeadingsDiv">
        {[
          { label: "Completed", tasks: tasks.filter(t => t.completionStatus === true) },
          { label: "To Do", tasks: tasks.filter(t => t.completionStatus === false) }
        ].map((column, idx) => {
          // Sort tasks by due date
          const sortedTasks = [...column.tasks].sort((a, b) => {
            return new Date(a.dueDate) - new Date(b.dueDate);
          });

          return (
            <div key={idx} className="StatusColumn">
              <h1 className="SmallHeader">{column.label}</h1>
            
              {sortedTasks.map((task, key) => {
                //Check if dueDate is expired to turn colour red
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                const isOverdue = new Date(task.dueDate) < today;

                return (
                  <div className="TaskCard" key={key}>
                    <button 
                      className={`CompleteBtn ${task.completionStatus ? 'is-completed' : ''}`}
                      onClick={() => toggleTaskCompletion(task)}>
                      {task.completionStatus ? '✓' : ''}
                    </button>
                    <div className="TaskContent">
                      <div className="TaskTitle">{task.title}</div>
                      <div className="TaskDescription">{task.description}</div>
                      <div className="DatesDiv">
                          <div className={`TaskDueDate ${isOverdue ? 'overdue' : ''}`}>Due Date: {task.dueDate}</div>
                          <div className="TaskCreatedDate">Created Date: {task.createdAt.split('T')[0]}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default Tasks;