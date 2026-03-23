import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import '../../App.css';

function Projects() {
    //Get userId to fetch all projects for that user
    let userId = null;
    const token = document.cookie.split('; ').find(row => row.startsWith('accessToken='))?.split('=')[1];
    if (token) {
        const decoded = jwtDecode(token);
        userId = decoded.userId;
    }

    //Get all projects for signed in userId
    const [projects, setProjects] = useState([]);

    useEffect(() => {
    const fetchProjects = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/projects/${userId}`);
            setProjects(response.data);
        } catch (error) {
            console.error("Error fetching projects:", error.response?.data || error.message);
            alert("Could not get projects. Please try again.");
        }
    };

        if (userId) {
            fetchProjects();
        }
    }, [userId]);

    let navigate = useNavigate();

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