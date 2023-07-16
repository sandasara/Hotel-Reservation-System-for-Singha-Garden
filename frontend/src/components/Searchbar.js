import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useFormik} from 'formik';
import axios from 'axios';
import AvailableRooms from '../pages/AvailableRooms';

const validate = values => {
    const errors = {};
    if (!values.checkIn) {
      errors.checkIn = 'Required';
    // } else if (values.checkIn.length > 15) {
    //   errors.checkIn = 'Must be 15 characters or less';
    }
  
    if (!values.checkOut) {
      errors.checkOut = 'Required';
    // } else if (values.checkOut.length > 20) {
    //   errors.checkOut = 'Must be 20 characters or less';
    }
  
    if (!values.adults) {
      errors.adults = 'Required';
    // } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.adults)) {
    //   errors.adults = 'Invalid adults address';
    }

    if (!values.children) {
        errors.children = 'Required';
    // } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.adults)) {
    //     errors.adults = 'Invalid adults address';
    }
  
    return errors;
  };

  const onSubmit = async (values) => {

    const { formData } = values;

    const response = await axios.post('http://127.0.0.1:8000/api/rooms/available_rooms/', formData)
    console.log(response.data)
        
  };

const Searchbar = () => {

    const [availableRooms, setAvailableRooms] = useState([]);
    const formik = useFormik({
        initialValues: {
            checkIn: '',
            checkOut: '',
            adults: '',
            children: '',
        },
        validate,
        onSubmit,
    })

    //     // try {
    //     // const response = await axios.post('http://127.0.0.1:8000/api/rooms/available_rooms/', formData);
    //     // console.log(response.data)
    //     // // Extract the available rooms from the response
    //     // const { rooms } = response.data;
    //     // setAvailableRooms(rooms);
    //     // navigate('/rooms/available');
    //     // } catch (error) {
    //     // // Handle error
    //     // }
    // };


    return (
        <div>
            <form className='flex justify-between items-center max-w-[640px] mx-auto w-100% border p-2
            rounded-md text-black bg-gray-100/90' method='POST' onSubmit={formik.handleSubmit}>
                <div className='flex flex-row my-4'>
                    <div className='flex flex-col mr-2'>
                        <label htmlFor='checkIn'>Check-In</label>
                        <input 
                            className='border rounded-md p-2' 
                            type="date" 
                            id='checkIn' 
                            name='checkIn' 
                            onChange={formik.handleChange}
                            value={formik.values.checkIn}
                        />
                        {formik.errors.checkIn ? <div>{formik.errors.checkIn}</div> : null}
                    </div>
                    <div className='flex flex-col mr-2'>
                        <label htmlFor='checkOut'>Check-Out</label>
                        <input className='border rounded-md p-2' 
                        type="date" 
                        id='checkOut' 
                        name='checkOut' 
                        onChange={formik.handleChange}
                        value={formik.values.checkOut}
                        />
                        {formik.errors.checkOut ? <div>{formik.errors.checkOut}</div> : null}
                    </div>
                    <div className='flex flex-col mr-2'>
                        <label htmlFor='adults'>Adults</label>
                        <input className='border rounded-md p-2 text-right w-20' 
                        type="number" 
                        id='adults' 
                        name='adults' 
                        onChange={formik.handleChange}
                        value={formik.values.adults}
                        />
                        {formik.errors.adults ? <div>{formik.errors.adults}</div> : null}
                    </div>
                    <div className='flex flex-col mr-2'>
                        <label htmlFor='children'>Children</label>
                        <input className='border rounded-md p-2 text-right w-20' 
                        type="number" 
                        id='children' 
                        name='children' 
                        onChange={formik.handleChange}
                        value={formik.values.children}
                        />
                        {formik.errors.children ? <div>{formik.errors.children}</div> : null}
                    </div>
                    <div>            
                        <button className='mr-4 my-4 b-4' type='submit'>Search</button>
                    </div>
                </div>
            </form>
        </div> 
      )   
}

export default Searchbar