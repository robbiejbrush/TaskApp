import React from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function JoinProject() {
  //Get userId for joining project post request
  let userId = null;
  const token = document.cookie.split('; ').find(row => row.startsWith('accessToken='))?.split('=')[1];
    
  if (token) {
    const decoded = jwtDecode(token);
    userId = decoded.userId;
  }

  let navigate = useNavigate();
  //Join new project with userId
  const onSubmit = async (data) => {
    const dataWithUserId = { ...data, userId: userId };

    try {
      await axios.post('https://task-app-9add24d8d958.herokuapp.com/projects/join', dataWithUserId).then((response) => {
      console.log("Project joining successful.");
      navigate("/projects");
    });
    } catch (error) {
      console.error("Error joining project:", error.response?.data || error.message);
      alert("Could not join project. Please try again.");
    }
  };

  const initialValues = {
    code: ""
  };

  const validationSchema = Yup.object().shape({
    code: Yup.string().min(8, "Project code must be 8 characters.").max(8, "Project code must be 8 characters.").required("Input a Project code to join.")
  });

  return (
    <div>
      <div className="HeadingDiv">
        <div className= "LinkDiv">
          <a className= "Link" href="http://localhost:3000/projects"> ←Back</a>
        </div>
          <h1 className= "IntroHeading">Join a Project</h1>
      </div>
      <Formik initialValues= {initialValues} onSubmit= {onSubmit} validationSchema= {validationSchema}>
        <Form>
          <div className= "FieldDiv">
            <label className= "Label" htmlFor="CodeInput">Project Code:</label>
            <Field className = "FieldInput" id= "CodeInput" name= "code" placeholder= "Project Code"/>
            <ErrorMessage name= "code" component= "span"/>
            <button className= "SubmitButton" type= "submit">Join</button>
          </div>
        </Form>
      </Formik>
    </div>
  )
}

export default JoinProject;