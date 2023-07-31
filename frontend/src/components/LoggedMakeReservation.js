import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Formik, Form, Field } from 'formik';

const ReservationPage = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Make a GET request to fetch user data
    axios.get('http://127.0.0.1:8000/api/get_user') // Replace '/api/user/' with your backend API endpoint to fetch user data
      .then(response => {
        setUserData(response.data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, []);
  console.log(userData)

  // Render the Formik form with initial values as the fetched user data
  return (
    <div>
      {userData && (
        <Formik
          initialValues={{
            firstName: userData.first_name,
            email: userData.email,
            // Add other form fields here based on your form structure
          }}
          onSubmit={(values) => {
            // Handle form submission here
          }}
        >
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <label htmlFor="firstName">First Name:</label>
              <Field type="text" name="firstName" />

              <label htmlFor="email">Email:</label>
              <Field type="email" name="email" />

              {/* Add other form fields here based on your form structure */}

              <button type="submit">Submit</button>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default ReservationPage;
