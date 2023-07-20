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

function App() {

  const [availableRooms, setAvailableRooms] = useState([]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home setAvailableRoomsHome={setAvailableRooms} />} />
        <Route path='/rooms' element={<RoomsPage setAvailableRoomsRoom={setAvailableRooms} />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/book' element={<Book />} />
        <Route path='/reservations' element={<ReservationList />} />
        <Route path='/reservations/:id' element={<GetSingleReservation />} />
        <Route path='/rooms/available' element={<AvailableRooms availableRooms={availableRooms}/>} />
        <Route path='*' element={<NoRoute />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
