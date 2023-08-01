import React from 'react'
import { useFormik} from 'formik';
import axios from 'axios';
import { makeReservationSchema } from '../validationschemas/MakeReservationSchema';
import '../css/form.css'
import { Link, useNavigate } from 'react-router-dom';

function MakeReservationForm({ selectedRoom, searchedParams }) {
  const navigate = useNavigate()
  const onSubmit = async (values) => {
    try {
      const mappedCustomerData = {
        first_name: values.firstName,
        last_name: values.lastName,
        email: values.email,
        phone: values.tel,
        address: values.address,
        zip_code: values.zip,
        city: values.city,
        state: values.state,
        country: values.country,
      }; 

      const customerResponse = await axios.post('http://127.0.0.1:8000/api/create_customer/', mappedCustomerData);    
      const customerData = customerResponse.data;
      console.log('Customer record created:', customerData.customer_id);

      const mappedReservationData = {
        room: selectedRoom.room_id,
        customer: customerData.customer_id,
        check_in: searchedParams.checkIn,
        check_out: searchedParams.checkOut,
        adults: searchedParams.adults,
        children: searchedParams.children,
        special_info: values.specialinfo,
        payment_method: values.payMethod,
      }
      
      console.log(mappedReservationData)

      const reservationResponse = await axios.post('http://127.0.0.1:8000/api/reservations/create_customer_reservation/', mappedReservationData);
      const reservationData = reservationResponse.data;
      console.log('Reservation record created:', reservationData.reservation_id);
      alert("Reservation made");
      navigate('/')


    } catch (error) {
        console.log(error);
    }
  };     

  const formik = useFormik({
    initialValues: {
        firstName: '',
        lastName: '',
        email: '',
        tel: '',
        address: '',
        zip: '',
        city: '',
        state: '',
        country: '',
        specialinfo: '',
        payMethod: '',
    },
    validationSchema: makeReservationSchema,
    onSubmit,
})

  return (
    <div className='mx-16 my-8'>
        <div className='container mx-auto'>
            <div className='w-full p-5 rounded-md border-2 border-neutral-950'>
                <div>
                    <h3>Confirm your stay</h3>
                </div>
                <div className='mt-10'>
                  <form  method='POST' onSubmit={formik.handleSubmit}>
                      <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-2">
                        <div>
                          <label>First name</label>
                            <input 
                                type="text" 
                                name="firstName" 
                                id="firstName"  
                                autoComplete="given-name" 
                                className="flex w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                onChange={formik.handleChange}
                                value={formik.values.firstName}
                                />
                                {formik.errors.firstName && formik.touched.firstName && (<p className='input-error'>{formik.errors.firstName}</p>)}
                        </div>
                        <div>
                        <label>Last name</label>
                          <input 
                              type="text" 
                              name="lastName" 
                              id="lastName"  
                              autoComplete="given-name" 
                              className="flex w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"   
                              onChange={formik.handleChange}
                              value={formik.values.lastName}
                              />
                              {formik.errors.lastName && formik.touched.lastName && (<p className='input-error'>{formik.errors.lastName}</p>)}
                        </div>
                        <div>
                        <label>Email</label>
                          <input 
                              type="email" 
                              name="email" 
                              id="email"  
                              autoComplete="given-name" 
                              className="flex w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"    
                              onChange={formik.handleChange}
                              value={formik.values.email}
                              />
                              {formik.errors.email && formik.touched.email && (<p className='input-error'>{formik.errors.email}</p>)}
                        </div>
                        <div>
                        <label>Phone</label>
                          <input 
                              type="tel" 
                              name="tel" 
                              id="tel"  
                              autoComplete="given-name" 
                              className="flex w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"  
                              onChange={formik.handleChange}
                              value={formik.values.tel}
                              />
                              {formik.errors.tel && formik.touched.tel && (<p className='input-error'>{formik.errors.tel}</p>)}
                        </div>
                      </div>
                      <div className='mt-8 mb-8'>
                      <label>Address</label>
                          <input 
                              type="text" 
                              name="address" 
                              id="address"  
                              autoComplete="given-name" 
                              className="flex w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"    
                              onChange={formik.handleChange}
                              value={formik.values.address}
                              />
                              {formik.errors.address && formik.touched.address && (<p className='input-error'>{formik.errors.address}</p>)}
                      </div>
                      <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-2">
                        <div>
                          <label>Zip code</label>
                            <input 
                                type="text" 
                                name="zip" 
                                id="zip"  
                                autoComplete="given-name" 
                                className="flex w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                onChange={formik.handleChange}
                                value={formik.values.zip}
                                />
                                {formik.errors.zip && formik.touched.zip && (<p className='input-error'>{formik.errors.zip}</p>)}
                        </div>
                        <div>
                        <label>City</label>
                          <input 
                              type="text" 
                              name="city" 
                              id="city"  
                              autoComplete="given-name" 
                              className="flex w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"   
                              onChange={formik.handleChange}
                              value={formik.values.city}
                              />
                              {formik.errors.city && formik.touched.city && (<p className='input-error'>{formik.errors.city}</p>)}
                        </div>
                        <div>
                        <label>State</label>
                          <input 
                              type="text" 
                              name="state" 
                              id="state"  
                              autoComplete="given-name" 
                              className="flex w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"    
                              onChange={formik.handleChange}
                              value={formik.values.state}
                              />
                              {formik.errors.state && formik.touched.state && (<p className='input-error'>{formik.errors.state}</p>)}
                        </div>
                        <div>
                          <label>Country</label>
                            <select
                              name='country'
                              id='country'
                              className="flex w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              onChange={formik.handleChange}
                              value={formik.values.country}>    
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
                            </select>
                            {formik.errors.Country && formik.touched.Country && (<p className='input-error'>{formik.errors.Country}</p>)}
                        </div>
                      </div>
                  <div className='mt-10'>
                  <div>
                    <h3>Anything else we should know?</h3>
                  </div>
                    <div>
                      <div>
                        <textarea id='specialinfo' name='specialinfo' className="flex w-full mt-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        onChange={formik.handleChange}
                        value={formik.values.specialinfo}
                        />
                        {formik.errors.specialinfo && formik.touched.specialinfo && (<p className='input-error'>{formik.errors.specialinfo}</p>)}
                      </div>
                    </div>
                  </div>
                  <div className='mt-10'>
                    <div>
                      <label>
                      <input
                        type='radio'
                        name='payMethod'
                        id='payOnsite'
                        value='payOnSite'
                        //className="rounded-l-md border-gray-300 placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full min-w-0 sm:text-sm border"
                        onChange={formik.handleChange}
                        checked={formik.values.payMethod === 'payOnSite'}                   
                     />
                      Pay on-site</label>
                      <br></br>
                      <label>
                      <input
                        type='radio'
                        name='payMethod'
                        id='payOnline'
                        value='payOnline'
                        //className="rounded-none border-gray-300 bg-white text-indigo-600 focus:ring-indigo-500 h-4 w-4 flex items-center justify-center"
                        onChange={formik.handleChange}
                        checked={formik.values.payMethod === 'payOnline'}
                      />
                      Pay online</label>
                      {formik.errors.payMethod && formik.touched.payMethod && (<p className='input-error'>{formik.errors.payMethod}</p>)}     
                    </div>
                  </div>
                  <div>            
                   <button className='mr-4 my-4 b-4 text-zinc-950' 
                      type='button' 
                      name='confirm' 
                      id='confirm'
                      onClick={() => formik.handleSubmit()}
                      disabled={formik.values.payMethod !== 'payOnSite'}>
                      Confirm without paying
                    </button>
                   <Link to='/payment'>
                   <button className='mr-4 my-4 b-4 text-zinc-950' 
                      type='button' 
                      name='gotopay' 
                      id='gotopay' 
                      onClick={() => formik.handleSubmit()}
                      disabled={formik.values.payMethod !== 'payOnline'}>
                        Go to payment
                    </button>
                  </Link>
                  </div>
                  </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default MakeReservationForm