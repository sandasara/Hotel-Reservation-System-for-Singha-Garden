import React from 'react';
import CustomerProfile from '../components/CustomerProfile';
import Navbar from '../components/Navbar';
import CustomerReservations from '../components/CustomerReservations';

const CustomerDashboard = () => {
  return (
    <div>
        <div>
            <Navbar />
        </div>
        <div>
        <CustomerProfile /> 
        </div>
        <div>
            <CustomerReservations />
        </div>
    </div>
  )
}

export default CustomerDashboard