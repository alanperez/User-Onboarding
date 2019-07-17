import React from 'react'
import { withFormik, Form, Field } from "formik";
import axios from "axios";
import * as Yup from "yup";

function BoardForm({ values, errors, touched, isSubmitting}) {
  console.log('test 1 to see if it reaches to console log')
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
      <div>

      <button disabled={isSubmitting} type='submit'>Submit!</button>
      </div>
        
     </div>
    </Form>
  );
}

const FormikBoardForm = withFormik({
  
  mapPropsToValues({ name,email, password,tos}) {
    console.log('test 2 to see if it reaches to console log')

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
      .min(3,"First Name should be at least 5 characters long")
      .max(10)
      .required('Name is required.'),
    email:Yup.string()
      .email('Email is NOT VALID')
      .required('Email is required'),
    password: Yup.string()
       .min(8, 'Password must be 8 characters or longer')
       .required('Password is required'),
    checkbox: Yup.boolean()
       .required('Must Agree to TOS')
  }),
  //======END VALIDATION SCHEMA==========
  handleSubmit(values, {resetForm, setErrors, setSubmitting}) {
    console.log('test 3 to see if it reaches to console log')
    console.log(values)
    if (values.email === 'waffle@syrup.com') {
      setErrors({ email: 'That email is already taken' })
    } else {

      let url = 'https://reqres.in/api/users'
      console.log(url)
      //THIS IS WHERE YOU DO YOUR FORM SUBMISSION CODE... HTTP REQUESTS, ETC.
      axios.post('https://reqres.in/api/users', values)
            .then(res => {
              console.log(values)
              console.log(res)
              window.alert(
                "Form submitted " + res.data
              )
                resetForm()
                console.log(setSubmitting)
                setSubmitting(false)
            }).catch (err => {
              console.log(err)
              setSubmitting(false)
            })
    }
  }
})(BoardForm);

export default FormikBoardForm;