import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

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

function App() {

  const [availableRooms, setAvailableRooms] = useState([]);
  const [searchedParams, setSearchedParams] = useState([]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<NoRoute />} />
        <Route path='/' element={<Home setAvailableRoomsHome={setAvailableRooms} setSearchedParams={setSearchedParams}/>} />
        <Route path='/rooms' element={<RoomsPage setAvailableRoomsRoom={setAvailableRooms} setSearchedParams={setSearchedParams} />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/room/:roomId' element={<Book availableRooms={availableRooms} searchedParams={searchedParams}/>} />
        <Route path='/reservations' element={<ReservationList />} />
        <Route path='/reservations/:id' element={<GetSingleReservation />} />
        <Route path='/rooms/available' element={<AvailableRooms availableRooms={availableRooms}/>} />
        <Route path='/payment' element={<Payment />} />
        <Route path='/adminpanel' element={<AdminPanel />} />
        <Route path='/register' element={<CustomerRegistration />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
