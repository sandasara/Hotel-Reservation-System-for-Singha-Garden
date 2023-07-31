import React from 'react'
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar'
import LoggedMakeReservation from '../components/LoggedMakeReservation'

function Book({ availableRooms, searchedParams }) {
  const { roomId } = useParams();

  const selectedRoom = availableRooms.find(room => room.room_id === parseInt(roomId));

  if (!selectedRoom) {
    return (
      <div>
        <Navbar />
        <div>
          Room not found
        </div>
      </div>
    )
  }

  return (
    <div>
      <div>
        <Navbar />
      </div>
        <div className='flex ml-4 mr-8'> 
        <div className="w-3/4 pr-4">
          <LoggedMakeReservation selectedRoom={selectedRoom} searchedParams={searchedParams} />
        </div>
        <div className="w-1/4">
          <div className='my-8'>
            <div>
              <img src={selectedRoom.room_image} alt={selectedRoom.room_name}/>
            </div>
            <h2>{selectedRoom.room_name}</h2>
            <h3>Price: ${selectedRoom.room_price}</h3>
          </div>
          <div className='my-4'>
            <p>Check-in Date: {searchedParams.checkIn}</p>
            <p>Check-out Date: {searchedParams.checkOut}</p>
            <p>Adults: {searchedParams.adults}</p>
            <p>Children: {searchedParams.children}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Book