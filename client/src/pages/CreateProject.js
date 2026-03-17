import React from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateProject() {
  
  let navigate = useNavigate();

  let userId = null;
      
  const token = sessionStorage.getItem('accessToken');
  
  if (token) {
    const decoded = jwtDecode(token);
    userId = decoded.userId;
  }

  const onSubmit = (data) => {
    const dataWithUserId = { ...data, userId: userId };

    axios.post('http://localhost:3001/projects/create', dataWithUserId).then((response) => {
      console.log("Project creation successful.");
    });

    navigate("/projects")
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
            <Field className = "FieldInput" id= "FieldInput" name= "name" placeholder= "Project Name"/>
            <ErrorMessage name= "name" component= "span"/>
            <button className= "SubmitButton" type= "submit">Create</button>
          </div>
        </Form>
      </Formik>
    </div>
  )
}

export default CreateProject;