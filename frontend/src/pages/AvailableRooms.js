import React from 'react'
import Navbar from '../components/Navbar';

const AvailableRooms = ({ availableRooms }) => {
  if (!availableRooms || availableRooms.length === 0) {
    return (
      <div>
        <Navbar />
        <div>
          No available rooms
        </div>
      </div>
      )
  }
  else {
  return (
    <div>
      <Navbar />
      {availableRooms.map((room) => (
        <div key={room.room_id}>
          <span>{room.room_name}</span>
          <span>{room.room_price}</span>
        </div>
      ))}
    </div>
  )}
}

export default AvailableRooms