import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import PrivateRoute from './utils/PrivateRoute'
import { AuthProvider } from './context/AuthContext'

import Home from './pages/Home';
import RoomsPage from './pages/RoomsPage';
import About from './pages/About';
import Contact from './pages/Contact';
import Book from './pages/Book';
import ReservationList from './pages/ReservationList';
import GetSingleReservation from './components/GetSingleReservation';
import AvailableRooms from './pages/AvailableRooms';
import NoRoute from './components/NoRoute';
import CustomerRegistration from './pages/CustomerRegistration';
import AdminPanel from './components/AdminPanel';
import Payment from './pages/Payment';
import Registration from './components/Registration';
import LoginForm from './components/LoginForm';
import LoggedBook from './pages/LoggedBook';


function App() {

  const [availableRooms, setAvailableRooms] = useState([]);
  const [searchedParams, setSearchedParams] = useState([]);

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='*' element={<NoRoute />} />
          <Route path='/' element={<Home setAvailableRooms={setAvailableRooms} setSearchedParams={setSearchedParams}/>} />
          <Route path='/rooms' element={<RoomsPage setAvailableRooms={setAvailableRooms} setSearchedParams={setSearchedParams} />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/room/:roomId' element={<Book availableRooms={availableRooms} searchedParams={searchedParams}/>} />
          <Route path='/reservations' element={<ReservationList />} />
          <Route path='/reservations/:id' element={<GetSingleReservation />} />
          <Route path='/rooms/available' element={<AvailableRooms availableRooms={availableRooms}/>} />
          <Route path='/payment' element={<Payment />} />
          <Route path='/adminpanel' element={<AdminPanel />} />
          <Route path='/register' element={<CustomerRegistration />} />
          <Route path='/registerform' element={<Registration />} />
          <Route path='/login' element={<LoginForm />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

          {/* <PrivateRoute path='/loggedbook' element={LoggedBook} /> */}