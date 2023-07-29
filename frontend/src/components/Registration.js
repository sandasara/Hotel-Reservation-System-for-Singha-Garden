// src/components/RegistrationForm.js
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const RegistrationForm = () => {
  const initialValues = {
    username: '',
    email: '',
    password: '',
    user_type: '',
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
    user_type: Yup.string().required('User type is required'),
  });

  const handleSubmit = async (values) => {
    try {
      console.log(values);
      const response = await axios.post('http://127.0.0.1:8000/api/register/', values);
      console.log(response.data);
      // Handle successful registration, e.g., show a success message or redirect
    } catch (error) {
      console.error(error.response.data);
      // Handle registration error, e.g., display error messages to the user
    }
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      {() => (
        <Form>
          {/* Registration form fields */}
          <div>
            <label htmlFor="username">Username</label>
            <Field type="text" name="username" />
            <ErrorMessage name="username" component="div" />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <Field type="email" name="email" />
            <ErrorMessage name="email" component="div" />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <Field type="password" name="password" />
            <ErrorMessage name="password" component="div" />
          </div>
          <div>
            <label htmlFor="user_type">User Type</label>
            <Field as="select" name="user_type">
              <option value="">Select User Type</option>
              <option value="manager">Manager</option>
              <option value="receptionist">Receptionist</option>
              <option value="customer">Customer</option>
            </Field>
            <ErrorMessage name="user_type" component="div" />
          </div>
          <button type="submit">Register</button>
        </Form>
      )}
    </Formik>
  );
};

export default RegistrationForm;
