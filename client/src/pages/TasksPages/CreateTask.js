import React from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

function CreateTask() {
  let navigate = useNavigate();
  const location = useLocation();

  const { projectId, projectCode, projectName } = location.state || {};

  const goBack = () => {
    navigate("/tasks", {state: { projectId, projectCode, projectName } });
  };

  const onSubmit = (data) => {
    const taskToCreate = { ...data, projectId: projectId };

    axios.post('http://localhost:3001/tasks/create', taskToCreate).then((response) => {
      console.log("Task created successfully.");
      navigate("/tasks", { state: { projectId, projectCode, projectName } });
    });
  };

  const initialValues = {
    title: "",
    description: "",
    dueDate: ""
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().max(25, "Task title must be under 20 characters.").required("Input a Task title."),
    description: Yup.string().max(100, "Task description must be under 100 characters.").required("Input a Task description."),
    dueDate: Yup.date().required("Input the Task due date.")
  });

  return (
    <div>
      <div className="CreateTaskHeadingDiv">
        <div className= "LinkDiv">
          <button onClick={goBack} className="Link" style={{border:'none', background:'none'}}>
             ←Back
          </button>
        </div>
          <h1 className= "IntroHeading">Create a Task</h1>
      </div>
      <Formik initialValues= {initialValues} onSubmit= {onSubmit} validationSchema= {validationSchema}>
        <Form>
          <div className= "FieldDiv">
            <label className= "Label" htmlFor="TitleInput">Task Title:</label>
            <Field className = "FieldInput" id= "TitleInput" name= "title" placeholder= "Task Title"/>
            <ErrorMessage name= "title" component= "span"/>
            <label className= "Label" htmlFor="DescriptionInput">Task Description:</label>
            <Field className = "FieldInput" id= "DescriptionInput" name= "description" as="textarea" rows="5" placeholder= "Task Description"/>
            <ErrorMessage name= "description" component= "span"/>
            <label className= "Label" htmlFor="DateInput">Due Date:</label>
            <Field className = "FieldInput" id= "DateInput" name= "dueDate" type= "date" placeholder= "Due Date"/>
            <ErrorMessage name= "date" component= "span"/>
            <button className= "SubmitButton" type= "submit">Create</button>
          </div>
        </Form>
      </Formik>
    </div>
  )
}

export default CreateTask;