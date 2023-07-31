import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthContext';

const CustomerProfilePanel = () => {
  const { authTokens } = useContext(AuthContext);
  const [customerDetails, setCustomerDetails] = useState(null);

  useEffect(() => {
    // Function to fetch the customer details using authTokens
    const fetchCustomerDetails = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/get_user_profile/', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${authTokens.access}`, // Send the access token in the Authorization header
          },
        });

        if (response.ok) {
          const data = await response.json();
          setCustomerDetails(data);
        } else {
          console.error('Failed to fetch customer details');
        }
      } catch (error) {
        console.error('Error while fetching customer details', error);
      }
    };

    if (authTokens) {
      fetchCustomerDetails();
    }
  }, [authTokens]);

  if (!customerDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Customer Profile</h2>
      <p>Username: {customerDetails.username}</p>
      <p>Email: {customerDetails.email}</p>
      {/* Add other customer details here */}
    </div>
  );
};

export default CustomerProfilePanel;
