import React from 'react'
import Navbar from '../components/Navbar';
import ReserveBtn from '../components/ReserveBtn';
import { Link } from 'react-router-dom';

const AvailableRooms = ({ availableRooms }) => {
  if (!availableRooms || availableRooms.length === 0) {
    return (
      <div>
        <Navbar />
        Sorry, All our rooms are booked.
      </div>
    ) 
  }
  else {
    return ( 
      <div>
        <Navbar />
        <section className="my-8 md:px-16 xl:px-24">
          <h3>We have these rooms ready for you</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-8">
            {availableRooms.map(room => (
              <div key={room.room_id}>
                <h2>{room.room_name}</h2>
                <h3>Price: ${room.room_price}</h3>
                <div>
                <p>{room.description}</p>
                </div>
                <Link to={`/room/${room.room_id}`}><ReserveBtn/></Link>
              </div>
            ))}
          </div>
        </section>
      </div>
    )}
  }

export default AvailableRooms