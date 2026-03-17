import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import '../App.css';

function Projects() {

    let userId = null;
    
    const token = sessionStorage.getItem('accessToken');

    if (token) {
        const decoded = jwtDecode(token);
        userId = decoded.userId;
    }

    const [projects, setProjects] = useState([]);
    
    let navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3001/projects/${userId}`).then((response) => {
            setProjects(response.data);
        });
    }, [userId]);

    return (
        <div>
            <div className= "ButtonContainer">
                <button className= "Button"
                onClick = {() => {
                    navigate("/createProject");
                }}>
                    Create Project
                </button>
                <button className = "Button"
                onClick = {() => {
                    navigate("/joinProject");
                }}>
                    Join Project
                </button>
            </div>
            <div className= "AllProjects">
                {projects.map((value, key) => {
                    return (
                        <div 
                            className= "Project" 
                            key= {key}
                            onClick= {() => {
                                navigate("/tasks", {
                                    state: { 
                                        projectId: value.projectId,
                                        projectName: value.name,
                                        projectCode: value.code 
                                    }
                                });
                            }}>
                            <div className= "ProjectName"> {value.name} </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Projects;