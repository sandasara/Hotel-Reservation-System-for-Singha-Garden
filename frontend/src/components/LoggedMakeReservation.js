import React, { useEffect, useState, useContext } from 'react';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';
import AuthContext from '../context/AuthContext'

const ReservationPage = ({ selectedRoom, searchedParams }) => {
  let { user, authTokens } = useContext(AuthContext)
  const [userData, setUserData] = useState(null);
  const [customerDetails, setCustomerDetails] = useState(null);

  // useEffect((user) => {
  //   console.log(user)
  //   // Make a GET request to fetch user data
  //   if (user && authTokens) {
  //     // Make a GET request to fetch user data
  //     axios.get('http://127.0.0.1:8000/api/get_user/', user, {
  //       headers: {
  //         'Authorization': `Bearer ${authTokens.access}`,
  //       },
  //     })
  //       .then(response => {
  //         setUserData(response.data);
  //       })
  //       .catch(error => {
  //         console.error('Error fetching user data:', error);
  //       });
  //   }
  // }, [user, authTokens]);
  // console.log(userData)


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

  console.log(customerDetails)
  // Render the Formik form with initial values as the fetched user data
 

  
  return (
    <div>
      {customerDetails && (
        <Formik
          initialValues={{
            firstName: customerDetails.first_name,
            lastName: customerDetails.last_name,
            email: customerDetails.email,
            tel: customerDetails.phone,
            address: customerDetails.email,
            zip: customerDetails.zip_code,
            city: customerDetails.city,
            state: customerDetails.state,
            country: customerDetails.country,
            specialinfo: '',
            payMethod: '',
            // Add other form fields here based on your form structure
          }}
          onSubmit={async  (values) => {
            try {
              const mappedReservationData = {
                room: selectedRoom.room_id,
                user: customerDetails.user_id,
                check_in: searchedParams.checkIn,
                check_out: searchedParams.checkOut,
                adults: searchedParams.adults,
                children: searchedParams.children,
                special_info: values.specialinfo,
                payment_method: values.payMethod,
              }
              
              console.log(mappedReservationData)

              const reservationResponse = await axios.post('http://127.0.0.1:8000/api/reservations/create/', mappedReservationData);
              const reservationData = reservationResponse.data;
              console.log('Reservation record created:', reservationData.reservation_id);

            } catch (error) {
                console.log(error);
            }
            console.log(values)
            // Handle form submission here
          }}
        >
          {({ handleSubmit }) => (
             <Form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md">
             <label htmlFor="firstName" className="block font-medium text-gray-700">First Name:</label>
             <Field type="text" name="firstName" className="w-full mt-1 border rounded-md p-2" />

             <label htmlFor="lastName" className="block font-medium text-gray-700">Last Name:</label>
             <Field type="text" name="lastName" className="w-full mt-1 border rounded-md p-2" />

             <label htmlFor="email" className="block font-medium text-gray-700">Email:</label>
             <Field type="email" name="email" className="w-full mt-1 border rounded-md p-2" />
             
             <label htmlFor="tel" className="block font-medium text-gray-700">Phone:</label>
             <Field type="tel" name="tel" className="w-full mt-1 border rounded-md p-2" />

             <label htmlFor="address" className="block font-medium text-gray-700">Address:</label>
             <Field type="text" name="address" className="w-full mt-1 border rounded-md p-2" />

             <label htmlFor="zip" className="block font-medium text-gray-700">Zip code:</label>
             <Field type="text" name="zip" className="w-full mt-1 border rounded-md p-2" />

             <label htmlFor="city" className="block font-medium text-gray-700">City:</label>
             <Field type="text" name="city" className="w-full mt-1 border rounded-md p-2" />

             <label htmlFor="state" className="block font-medium text-gray-700">State:</label>
             <Field type="text" name="state" className="w-full mt-1 border rounded-md p-2" />

             <label htmlFor="country" className="block font-medium text-gray-700">Country:</label>
             <Field as="select" name="country" className="w-full mt-1 border rounded-md p-2">
             <option value="AF">Afghanistan</option>
                              <option value="AX">Åland Islands</option>
                              <option value="AL">Albania</option>
                              <option value="DZ">Algeria</option>
                              <option value="AS">American Samoa</option>
                              <option value="AD">Andorra</option>
                              <option value="AO">Angola</option>
                              <option value="AI">Anguilla</option>
                              <option value="AQ">Antarctica</option>
                              <option value="AG">Antigua and Barbuda</option>
                              <option value="AR">Argentina</option>
                              <option value="AM">Armenia</option>
                              <option value="AW">Aruba</option>
                              <option value="AU">Australia</option>
                              <option value="AT">Austria</option>
                              <option value="AZ">Azerbaijan</option>
                              <option value="BS">Bahamas</option>
                              <option value="BH">Bahrain</option>
                              <option value="BD">Bangladesh</option>
                              <option value="BB">Barbados</option>
                              <option value="BY">Belarus</option>
                              <option value="BE">Belgium</option>
                              <option value="BZ">Belize</option>
                              <option value="BJ">Benin</option>
                              <option value="BM">Bermuda</option>
                              <option value="BT">Bhutan</option>
                              <option value="BO">Bolivia, Plurinational State of</option>
                              <option value="BQ">Bonaire, Sint Eustatius and Saba</option>
                              <option value="BA">Bosnia and Herzegovina</option>
                              <option value="BW">Botswana</option>
                              <option value="BV">Bouvet Island</option>
                              <option value="BR">Brazil</option>
                              <option value="IO">British Indian Ocean Territory</option>
                              <option value="BN">Brunei Darussalam</option>
                              <option value="BG">Bulgaria</option>
                              <option value="BF">Burkina Faso</option>
                              <option value="BI">Burundi</option>
                              <option value="KH">Cambodia</option>
                              <option value="CM">Cameroon</option>
                              <option value="CA">Canada</option>
                              <option value="CV">Cape Verde</option>
                              <option value="KY">Cayman Islands</option>
                              <option value="CF">Central African Republic</option>
                              <option value="TD">Chad</option>
                              <option value="CL">Chile</option>
                              <option value="CN">China</option>
                              <option value="CX">Christmas Island</option>
                              <option value="CC">Cocos (Keeling) Islands</option>
                              <option value="CO">Colombia</option>
                              <option value="KM">Comoros</option>
                              <option value="CG">Congo</option>
                              <option value="CD">Congo, the Democratic Republic of the</option>
                              <option value="CK">Cook Islands</option>
                              <option value="CR">Costa Rica</option>
                              <option value="CI">Côte d'Ivoire</option>
                              <option value="HR">Croatia</option>
                              <option value="CU">Cuba</option>
                              <option value="CW">Curaçao</option>
                              <option value="CY">Cyprus</option>
                              <option value="CZ">Czech Republic</option>
                              <option value="DK">Denmark</option>
                              <option value="DJ">Djibouti</option>
                              <option value="DM">Dominica</option>
                              <option value="DO">Dominican Republic</option>
                              <option value="EC">Ecuador</option>
                              <option value="EG">Egypt</option>
                              <option value="SV">El Salvador</option>
                              <option value="GQ">Equatorial Guinea</option>
                              <option value="ER">Eritrea</option>
                              <option value="EE">Estonia</option>
                              <option value="ET">Ethiopia</option>
                              <option value="FK">Falkland Islands (Malvinas)</option>
                              <option value="FO">Faroe Islands</option>
                              <option value="FJ">Fiji</option>
                              <option value="FI">Finland</option>
                              <option value="FR">France</option>
                              <option value="GF">French Guiana</option>
                              <option value="PF">French Polynesia</option>
                              <option value="TF">French Southern Territories</option>
                              <option value="GA">Gabon</option>
                              <option value="GM">Gambia</option>
                              <option value="GE">Georgia</option>
                              <option value="DE">Germany</option>
                              <option value="GH">Ghana</option>
                              <option value="GI">Gibraltar</option>
                              <option value="GR">Greece</option>
                              <option value="GL">Greenland</option>
                              <option value="GD">Grenada</option>
                              <option value="GP">Guadeloupe</option>
                              <option value="GU">Guam</option>
                              <option value="GT">Guatemala</option>
                              <option value="GG">Guernsey</option>
                              <option value="GN">Guinea</option>
                              <option value="GW">Guinea-Bissau</option>
                              <option value="GY">Guyana</option>
                              <option value="HT">Haiti</option>
                              <option value="HM">Heard Island and McDonald Islands</option>
                              <option value="VA">Holy See (Vatican City State)</option>
                              <option value="HN">Honduras</option>
                              <option value="HK">Hong Kong</option>
                              <option value="HU">Hungary</option>
                              <option value="IS">Iceland</option>
                              <option value="IN">India</option>
                              <option value="ID">Indonesia</option>
                              <option value="IR">Iran, Islamic Republic of</option>
                              <option value="IQ">Iraq</option>
                              <option value="IE">Ireland</option>
                              <option value="IM">Isle of Man</option>
                              <option value="IL">Israel</option>
                              <option value="IT">Italy</option>
                              <option value="JM">Jamaica</option>
                              <option value="JP">Japan</option>
                              <option value="JE">Jersey</option>
                              <option value="JO">Jordan</option>
                              <option value="KZ">Kazakhstan</option>
                              <option value="KE">Kenya</option>
                              <option value="KI">Kiribati</option>
                              <option value="KP">Korea, Democratic People's Republic of</option>
                              <option value="KR">Korea, Republic of</option>
                              <option value="KW">Kuwait</option>
                              <option value="KG">Kyrgyzstan</option>
                              <option value="LA">Lao People's Democratic Republic</option>
                              <option value="LV">Latvia</option>
                              <option value="LB">Lebanon</option>
                              <option value="LS">Lesotho</option>
                              <option value="LR">Liberia</option>
                              <option value="LY">Libya</option>
                              <option value="LI">Liechtenstein</option>
                              <option value="LT">Lithuania</option>
                              <option value="LU">Luxembourg</option>
                              <option value="MO">Macao</option>
                              <option value="MK">Macedonia, the former Yugoslav Republic of</option>
                              <option value="MG">Madagascar</option>
                              <option value="MW">Malawi</option>
                              <option value="MY">Malaysia</option>
                              <option value="MV">Maldives</option>
                              <option value="ML">Mali</option>
                              <option value="MT">Malta</option>
                              <option value="MH">Marshall Islands</option>
                              <option value="MQ">Martinique</option>
                              <option value="MR">Mauritania</option>
                              <option value="MU">Mauritius</option>
                              <option value="YT">Mayotte</option>
                              <option value="MX">Mexico</option>
                              <option value="FM">Micronesia, Federated States of</option>
                              <option value="MD">Moldova, Republic of</option>
                              <option value="MC">Monaco</option>
                              <option value="MN">Mongolia</option>
                              <option value="ME">Montenegro</option>
                              <option value="MS">Montserrat</option>
                              <option value="MA">Morocco</option>
                              <option value="MZ">Mozambique</option>
                              <option value="MM">Myanmar</option>
                              <option value="NA">Namibia</option>
                              <option value="NR">Nauru</option>
                              <option value="NP">Nepal</option>
                              <option value="NL">Netherlands</option>
                              <option value="NC">New Caledonia</option>
                              <option value="NZ">New Zealand</option>
                              <option value="NI">Nicaragua</option>
                              <option value="NE">Niger</option>
                              <option value="NG">Nigeria</option>
                              <option value="NU">Niue</option>
                              <option value="NF">Norfolk Island</option>
                              <option value="MP">Northern Mariana Islands</option>
                              <option value="NO">Norway</option>
                              <option value="OM">Oman</option>
                              <option value="PK">Pakistan</option>
                              <option value="PW">Palau</option>
                              <option value="PS">Palestinian Territory, Occupied</option>
                              <option value="PA">Panama</option>
                              <option value="PG">Papua New Guinea</option>
                              <option value="PY">Paraguay</option>
                              <option value="PE">Peru</option>
                              <option value="PH">Philippines</option>
                              <option value="PN">Pitcairn</option>
                              <option value="PL">Poland</option>
                              <option value="PT">Portugal</option>
                              <option value="PR">Puerto Rico</option>
                              <option value="QA">Qatar</option>
                              <option value="RE">Réunion</option>
                              <option value="RO">Romania</option>
                              <option value="RU">Russian Federation</option>
                              <option value="RW">Rwanda</option>
                              <option value="BL">Saint Barthélemy</option>
                              <option value="SH">Saint Helena, Ascension and Tristan da Cunha</option>
                              <option value="KN">Saint Kitts and Nevis</option>
                              <option value="LC">Saint Lucia</option>
                              <option value="MF">Saint Martin (French part)</option>
                              <option value="PM">Saint Pierre and Miquelon</option>
                              <option value="VC">Saint Vincent and the Grenadines</option>
                              <option value="WS">Samoa</option>
                              <option value="SM">San Marino</option>
                              <option value="ST">Sao Tome and Principe</option>
                              <option value="SA">Saudi Arabia</option>
                              <option value="SN">Senegal</option>
                              <option value="RS">Serbia</option>
                              <option value="SC">Seychelles</option>
                              <option value="SL">Sierra Leone</option>
                              <option value="SG">Singapore</option>
                              <option value="SX">Sint Maarten (Dutch part)</option>
                              <option value="SK">Slovakia</option>
                              <option value="SI">Slovenia</option>
                              <option value="SB">Solomon Islands</option>
                              <option value="SO">Somalia</option>
                              <option value="ZA">South Africa</option>
                              <option value="GS">South Georgia and the South Sandwich Islands</option>
                              <option value="SS">South Sudan</option>
                              <option value="ES">Spain</option>
                              <option value="LK">Sri Lanka</option>
                              <option value="SD">Sudan</option>
                              <option value="SR">Suriname</option>
                              <option value="SJ">Svalbard and Jan Mayen</option>
                              <option value="SZ">Swaziland</option>
                              <option value="SE">Sweden</option>
                              <option value="CH">Switzerland</option>
                              <option value="SY">Syrian Arab Republic</option>
                              <option value="TW">Taiwan, Province of China</option>
                              <option value="TJ">Tajikistan</option>
                              <option value="TZ">Tanzania, United Republic of</option>
                              <option value="TH">Thailand</option>
                              <option value="TL">Timor-Leste</option>
                              <option value="TG">Togo</option>
                              <option value="TK">Tokelau</option>
                              <option value="TO">Tonga</option>
                              <option value="TT">Trinidad and Tobago</option>
                              <option value="TN">Tunisia</option>
                              <option value="TR">Turkey</option>
                              <option value="TM">Turkmenistan</option>
                              <option value="TC">Turks and Caicos Islands</option>
                              <option value="TV">Tuvalu</option>
                              <option value="UG">Uganda</option>
                              <option value="UA">Ukraine</option>
                              <option value="AE">United Arab Emirates</option>
                              <option value="GB">United Kingdom</option>
                              <option value="US">United States</option>
                              <option value="UM">United States Minor Outlying Islands</option>
                              <option value="UY">Uruguay</option>
                              <option value="UZ">Uzbekistan</option>
                              <option value="VU">Vanuatu</option>
                              <option value="VE">Venezuela, Bolivarian Republic of</option>
                              <option value="VN">Viet Nam</option>
                              <option value="VG">Virgin Islands, British</option>
                              <option value="VI">Virgin Islands, U.S.</option>
                              <option value="WF">Wallis and Futuna</option>
                              <option value="EH">Western Sahara</option>
                              <option value="YE">Yemen</option>
                              <option value="ZM">Zambia</option>
                              <option value="ZW">Zimbabwe</option>
             </Field>

             <label htmlFor="specialInfo" className="block font-medium text-gray-700">Anything else:</label>
             <Field as="textarea" name="specialInfo" className="w-full mt-1 border rounded-md p-2" />

             <label className="block font-medium text-gray-700">Payment Method:</label>
             <div role="group" aria-labelledby="paymentMethodLabel" className="mt-1">
               <label className="mr-4">
                 <Field type="radio" name="paymentMethod" value="payOnSite" />
                 <span className="ml-2">Pay on-site</span>
               </label>
               <label>
                 <Field type="radio" name="paymentMethod" value="PayOnline" />
                 <span className="ml-2">Pay Online</span>
               </label>
             </div>

             {/* Add other form fields here based on your form structure */}

             <button type="submit" className="w-full mt-4 bg-blue-500 text-white font-semibold rounded-md p-2 hover:bg-blue-600">
               Confirm
             </button>
           </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default ReservationPage;
