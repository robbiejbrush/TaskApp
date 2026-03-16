import React from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';

function CreateProject() {
  
  const initialValues = {
    name: ""
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().max(20, "Project name must be under 20 characters.").required("Input a name for your Project.")
  });
  
  const onSubmit = (data) => {
    console.log(data);
  };

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
            <Field className = "ProjectNameInput" id= "ProjectNameInput" name= "name" placeholder= "Project Name"/>
            <ErrorMessage name= "name" component= "span"/>
            <button className= "SubmitButton" type= "submit">Create</button>
          </div>
        </Form>
      </Formik>
    </div>
  )
}

export default CreateProject;