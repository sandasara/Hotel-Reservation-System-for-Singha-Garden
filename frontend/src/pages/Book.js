import React from 'react'
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar'
import MakeReservationForm from '../components/MakeReservationForm'
import SelectedRoom from '../components/SelectedRoom'

function Book({ availableRooms }) {
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
        <MakeReservationForm />
        <SelectedRoom />
      </div>
      <div>
        <h2>{selectedRoom.room_name}</h2>
        <h3>Price: ${selectedRoom.room_price}</h3>
      </div>
    </div>
  )
}

export default Book