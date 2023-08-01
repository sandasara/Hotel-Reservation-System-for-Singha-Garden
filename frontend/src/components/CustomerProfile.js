import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthContext';
import CustomerReservations from './CustomerReservations';

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
    return <div>Something went wrong</div>;
  }

  return (
    <>
    <div class="container mx-auto my-5 p-5">
        <div class="md:flex no-wrap md:-mx-2 ">
            {/* <!-- Right Side --> */}
            <div class="w-full mx-2 h-64">
                {/* <!-- Profile tab -->
                <!-- About Section --> */}
                <div class="bg-white p-3 shadow-sm rounded-sm">
                    <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                        <span clas="text-green-500">
                            <svg class="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </span>
                        <span class="tracking-wide">{customerDetails.username}</span>
                    </div>
                    <div class="text-gray-700">
                        <div class="grid md:grid-cols-2 text-sm">
                            <div class="grid grid-cols-2">
                                <div class="px-4 py-2 font-semibold">First Name</div>
                                <div class="px-4 py-2">{customerDetails.first_name}</div>
                            </div>
                            <div class="grid grid-cols-2">
                                <div class="px-4 py-2 font-semibold">Last Name</div>
                                <div class="px-4 py-2">{customerDetails.last_name}</div>
                            </div>
                            <div class="grid grid-cols-2">
                                <div class="px-4 py-2 font-semibold">Email</div>
                                <a class="text-blue-800" href="mailto:jane@example.com">{customerDetails.email}</a>
                            </div>
                            <div class="grid grid-cols-2">
                                <div class="px-4 py-2 font-semibold">Contact No.</div>
                                <div class="px-4 py-2">{customerDetails.phone}</div>
                            </div>
                            <div class="grid grid-cols-2">
                                <div class="px-4 py-2 font-semibold">Street Address</div>
                                <div class="px-4 py-2">{customerDetails.address}</div>
                            </div>
                            <div class="grid grid-cols-2">
                                <div class="px-4 py-2 font-semibold">City</div>
                                <div class="px-4 py-2">{customerDetails.city}</div>
                            </div>
                            <div class="grid grid-cols-2">
                                <div class="px-4 py-2 font-semibold">State</div>
                                <div class="px-4 py-2">{customerDetails.state}</div>
                            </div>
                            <div class="grid grid-cols-2">
                                <div class="px-4 py-2 font-semibold">Country</div>
                                <div class="px-4 py-2">{customerDetails.country}</div>
                            </div>
                            <div class="grid grid-cols-2">
                                <div class="px-4 py-2 font-semibold">Zip Code</div>
                                <div class="px-4 py-2">{customerDetails.zip_code}</div>
                            </div>
                        </div>
                    </div>
                </div>
                    <button
                        class="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4">Show
                        Full Information</button>
                </div>
                {/* <!-- End of about section --> */}

                <div class="my-4"></div>
                </div>
                {/* <!-- End of profile tab --> */}
        </div>
        <div class="container mx-auto my-5 p-5">
            <div>
                <CustomerReservations />
            </div>
        </div>
        </>      
  );
};

export default CustomerProfilePanel;
