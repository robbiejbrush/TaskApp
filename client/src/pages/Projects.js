import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../App.css';

function Projects() {
    let userId  = 2;
    const [projects, setProjects] = useState([]);
    
    let navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3001/projects/${userId}`).then((response) => {
            setProjects(response.data);
        });
    });

    return (
        <div className= "AllProjects">
            {projects.map((value, key) => {
                return (
                    <div 
                        className= "Project" 
                        key= {key}
                        onClick= {() => {
                            navigate("/tasks");
                        }}
                        style={{ backgroundColor: "#" + value.colour, flex: 1}}>
                        <div className= "ProjectName"> {value.name} </div>
                    </div>
                );
            })}
        </div>
    );
}

export default Projects;