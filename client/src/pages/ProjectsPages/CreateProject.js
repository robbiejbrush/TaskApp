import React from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateProject() {
  //Get userId for creating project post request
  let userId = null;
  const token = document.cookie.split('; ').find(row => row.startsWith('accessToken='))?.split('=')[1];
  
  if (token) {
    const decoded = jwtDecode(token);
    userId = decoded.userId;
  }

  let navigate = useNavigate();
  //Create new project with userId
  const onSubmit = async (data) => {
    const dataWithUserId = { ...data, userId: userId };

    try {
      await axios.post('https://task-app-9add24d8d958.herokuapp.com/projects/create', dataWithUserId);
      console.log("Project creation successful.");
      navigate("/projects");
    } catch (error) {
      console.error("Error creating project:", error.response?.data || error.message);
      alert("Could not create project. Please try again.");
    }
  };

  const initialValues = {
    name: ""
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().max(20, "Project name must be under 20 characters.").required("Input a name for your Project.")
  });

  return (
    <div>
      <div className="HeadingDiv">
        <div className= "LinkDiv">
          <a className= "Link" href="http://localhost:3000/projects"> ←Back</a>
        </div>
          <h1 className= "IntroHeading">Create a Project</h1>
      </div>
      <Formik initialValues= {initialValues} onSubmit= {onSubmit} validationSchema= {validationSchema}>
        <Form>
          <div className= "FieldDiv">
            <label className= "Label" htmlFor="NameInput">Project Name:</label>
            <Field className = "FieldInput" id= "NameInput" name= "name" placeholder= "Project Name"/>
            <ErrorMessage name= "name" component= "span"/>
            <button className= "SubmitButton" type= "submit">Create</button>
          </div>
        </Form>
      </Formik>
    </div>
  )
}

export default CreateProject;