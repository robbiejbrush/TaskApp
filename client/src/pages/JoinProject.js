import React from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function JoinProject() {
  
  let navigate = useNavigate();

  let userId = null;
      
  const token = sessionStorage.getItem('accessToken');
  
  if (token) {
    const decoded = jwtDecode(token);
    userId = decoded.userId;
  }

  const onSubmit = (data) => {
    const dataWithUserId = { ...data, userId: userId };

    axios.post('http://localhost:3001/projects/join', dataWithUserId).then((response) => {
      console.log("Project joining successful.");
    });

    navigate("/projects")
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
            <Field className = "FieldInput" id= "FieldInput" name= "code" placeholder= "Project Code"/>
            <ErrorMessage name= "code" component= "span"/>
            <button className= "SubmitButton" type= "submit">Join</button>
          </div>
        </Form>
      </Formik>
    </div>
  )
}

export default JoinProject;