import React from 'react'
import { withFormik, Form, Field } from "formik";
import axios from "axios";
import * as Yup from "yup";
import Swal from 'sweetalert2'

function BoardForm({ values, errors, touched, isSubmitting}) {
  // console.log('values:', values)
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
  mapPropsToValues({ name,email, password, tos}) {
    return {
      name: name || "",
      email: email || "",
      password: password || "",
      tos: tos || false,
    };
  },
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
  tos: Yup.boolean()
     .oneOf([true], "Accept TOS to Continue")
     .required()
  }),
  handleSubmit(values, { resetForm, setErrors, setSubmitting }) {
    console.log(values)
    if (values.email === "alreadytaken@atb.dev") {
      setErrors({ email: "That email is already taken" });
    } else {
      axios
        .post("https://reqres.in/api/users", values)
        .then(res => {
          console.log(res); // Data was created successfully and logs to console
          // Swal.fire({
          //   title: 'Good job!',
          //   text: 'Do you want to continue',
          //   type: 'success',
          //   content: 'Submitted' + res.data,
          //   confirmButtonText: 'Cool'
          // })
          window.alert(
            "Form submitted " + "\n" +
            'name:  ' + res.data.name + "\n" +
            'email:  ' + res.data.email

          )
          resetForm();
          setSubmitting(false);
        })
        .catch(err => {
          console.log(err); // There was an error creating the data and logs to console
          setSubmitting(false);
        });
    }
  }
})(BoardForm);

export default FormikBoardForm;