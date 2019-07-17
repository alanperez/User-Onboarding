import React from 'react'
import { withFormik, Form, Field } from "formik";
import axios from "axios";
import * as Yup from "yup";

function BoardForm({ values, errors, touched}) {
  return (
    <Form>
     <div style={{margin: '50px auto'}}>

      <div>
        {touched.name && errors.name && <p>{errors.name}</p>}
        <Field type="text" name="name" placeholder="Name" />
      </div>

      <div>
        {touched.email && errors.email && <p>{errors.email}</p>}
        <Field type="email" name="email" placeholder="Email" />
      </div>

      <div>
        {touched.password && errors.password && <p>{errors.password}</p>}
        <Field type="password" name="password" placeholder="Password" />
      </div>

      <label>
      {touched.tos && errors.tos && <p>{errors.tos}</p>}
      <Field type="checkbox" name="tos" checked={values.tos} />
        Accept the Terms of Service
      </label>
      <button type='submit'>Submit!</button>

     </div>
    </Form>
  );
}

const FormikBoardForm = withFormik({
  mapPropsToValues({ name,email, password,tos }) {
    // console.log(FormikBoardForm)
    return {
      name: name || "",
      email: email || "",
      password: password || "",
      tos: tos || false,
    };
  },

  // ===== VALIDATION SCHEMA =======

  validationSchema: Yup.object().shape({
    name: Yup.string()
      .required('Name is required.'),

    email:Yup.string()
      .email('Email is NOT VALID')
      .required('Email is required'),

    password: Yup.string()
       .min(8, 'Password must be 8 characters or longer')
       .required('Password is required'),
    checkbox: Yup.bool()
      .required(' Must Agree to TOS')
  }),
  //======END VALIDATION SCHEMA==========
  handleSubmit(values) {
    console.log(values);
    //THIS IS WHERE YOU DO YOUR FORM SUBMISSION CODE... HTTP REQUESTS, ETC.
  }
})(BoardForm);

export default FormikBoardForm;