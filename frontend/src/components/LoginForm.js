// src/components/LoginForm.js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import AuthContext from '../context/AuthContext';

const LoginForm = () => {

  let {loginUser} = useContext(AuthContext)

  return (
    <div>
        <form onSubmit={loginUser}>
          <div class="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
            <div class="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
              <h1 class="font-bold text-center text-2xl mb-5">SINGHA GARDEN</h1>  
              <div class="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
                <div class="px-5 py-7">
                  <label class="font-semibold text-sm text-gray-600 pb-1 block">E-mail</label>
                  <input type="text" name="username" placeholder="Enter Username" class="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
                  <label class="font-semibold text-sm text-gray-600 pb-1 block">Password</label>
                  <input type="password" name="password" placeholder="Enter Password" class="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
                  <button type="submit" class="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block">
                      <span class="inline-block mr-2">Login</span>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-4 h-4 inline-block">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                  </button>
                </div>
                  <div class="py-2">
                  <div class="grid grid-cols-2 gap-1">
                    {/* <div class="text-center sm:text-right whitespace-nowrap">
                      <button class="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-4 h-4 inline-block align-text-bottom	">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                          <span class="inline-block ml-1">Help</span>
                      </button>
                    </div> */}
                  </div>
                </div>
              </div>
              <div class="py-2">
                  <div class="grid grid-cols-2 gap-1">
                    <div class="text-center sm:text-left whitespace-nowrap">
                      <Link to='/register'>
                      <button class="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-white hover:bg-gray-200 focus:outline-none focus:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-4 h-4 inline-block align-text-top">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                          </svg>
                          <span class="inline-block ml-1">Don't have an account? Register now</span>
                      </button>
                      </Link>
                    </div>
                  </div>
                </div>
                <div class="py-2">
                  <div class="grid grid-cols-2 gap-1">
                    <div class="text-center sm:text-left whitespace-nowrap">
                      <Link to='/'>
                      <button class="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-white hover:bg-gray-200 focus:outline-none focus:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-4 h-4 inline-block align-text-top">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                          </svg>
                          <span class="inline-block ml-1">Back to Home</span>
                      </button>
                      </Link>
                      <div>
                        <Link to='/adminpanel'>
                          <p>Login as admin?</p>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
      </div>
        </form>
    </div>
)
 
  // const initialValues = {
  //   email: '',
  //   password: '',
  // };

  // const validationSchema = Yup.object().shape({
  //   email: Yup.string().required('email is required'),
  //   password: Yup.string().required('Password is required'),
  // });

  // const handleSubmit = async (values) => {
  //   try {
  //     console.log(values)
  //     const response = await axios.post('http://127.0.0.1:8000//api/login/', values);
  //     console.log(response.data);
  //     // Handle successful login, e.g., save the token and user_type in local storage
  //   } catch (error) {
  //     console.error(error.response.data);
  //     // Handle login error, e.g., display error messages to the user
  //   }
  // };

  // return (
  //   <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={loginUser}>
  //     {() => (
  //       <Form>
  //         {/* Login form fields */}
  //         <div>
  //           <label htmlFor="email">email</label>
  //           <Field type="text" name="email" />
  //           <ErrorMessage name="email" component="div" />
  //         </div>
  //         <div>
  //           <label htmlFor="password">Password</label>
  //           <Field type="password" name="password" />
  //           <ErrorMessage name="password" component="div" />
  //         </div>
  //         <button type="submit">Login</button>
  //       </Form>
  //     )}
  //   </Formik>
  // );
};

export default LoginForm;
