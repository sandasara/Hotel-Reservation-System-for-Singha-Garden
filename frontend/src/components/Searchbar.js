import React from 'react';
import { useNavigate } from "react-router-dom";
import { useFormik} from 'formik';
import axios from 'axios';

const validate = values => {
    const errors = {};
    if (!values.checkIn) {
      errors.checkIn = 'Required';
    }
  
    if (!values.checkOut) {
      errors.checkOut = 'Required';
    }
  
    if (!values.adults) {
      errors.adults = 'Required';
    } else if (values.adults < 0) {
        errors.adults = 'Cannot be a negative value';
    }

    if (!values.children) {
        errors.children = 'Required';
    } else if (values.children < 0) {
        errors.children = 'Cannot be a negative value';
    }

    if (values.checkIn && values.checkOut) {
        const checkInDate = new Date(values.checkIn);
        const checkOutDate = new Date(values.checkOut);
    
        if (checkOutDate < checkInDate) {
          errors.checkOut = 'Check-out date cannot be earlier than check-in date';
        }
    
        const currentDate = new Date();
    
        if (checkInDate < currentDate) {
          errors.checkIn = 'Cannot select a past date';
        }
    }
  
    return errors;
  };

const Searchbar = (props) => {

    const navigate = useNavigate();

    const onSubmit = async (values) => {

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/rooms/available_rooms/', values);
            { props.setAvailableRooms(response.data.rooms) };
            { props.setSearchedParams(values) };
            navigate('/rooms/available');

    
        } catch (error) {
            console.log(error);
        }     
      };

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

    return (
        <div>
            <form className='flex justify-between items-center max-w-[640px] mx-auto w-100% border p-2
            rounded-md text-black bg-gray-100/90' method='POST' onSubmit={formik.handleSubmit}>
                <div className='flex flex-row my-4'>
                    <div className='flex flex-col mr-2'>
                        <label htmlFor='checkIn'>Check-In</label>
                        <input 
                            className='border rounded-md p-2 ' 
                            type="date" 
                            id='checkIn' 
                            name='checkIn' 
                            onChange={formik.handleChange}
                            value={formik.values.checkIn}
                        />
                        {formik.errors.checkIn ? <div className='input-error'>{formik.errors.checkIn}</div> : null}
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
                        {formik.errors.checkOut ? <div className='input-error'>{formik.errors.checkOut}</div> : null}
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
                        {formik.errors.adults ? <div className='input-error'>{formik.errors.adults}</div> : null}
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
                        {formik.errors.children ? <div className='input-error'>{formik.errors.children}</div> : null}
                    </div>
                    <div>            
                        <button className='mr-4 my-4 b-4 text-zinc-950' type='submit'>Search</button>
                    </div>
                </div>
            </form>
        </div> 
      )   
}

export default Searchbar