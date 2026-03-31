import React from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import '../../CSS/TasksCSS/CreateTask.css'

function CreateTask() {
  let navigate = useNavigate();
  const location = useLocation();

  //Obtaining projects info from tasks page for back button
  const { projectId, projectCode, projectName } = location.state || {};

  //Back to tasks page button's function
  const goBack = () => {
    navigate("/tasks", {state: { projectId, projectCode, projectName } });
  };

  //Creates a task
  const onSubmit = async (data) => {
    const taskToCreate = { ...data, projectId: projectId };

    try {
      await axios.post('https://task-app-9add24d8d958.herokuapp.com/tasks/create', taskToCreate).then((response) => {
      console.log("Task created successfully.");
      navigate("/tasks", { state: { projectId, projectCode, projectName } });
    });
    }catch (error) {
      console.error("Error creating task:", error.response?.data || error.message);
      alert("Could not create task. Please try again.");
    }
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