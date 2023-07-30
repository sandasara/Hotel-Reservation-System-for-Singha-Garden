import React from 'react'
import Navbar from '../components/Navbar'
import Searchbar from '../components/Searchbar'
import RoomList from '../components/RoomList'

function RoomsPage(props) {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <Searchbar setAvailableRooms={props.setAvailableRooms} setSearchedParams={props.setSearchedParams} />
      </div>
      <div>
        <RoomList />
      </div>
    </div>
  )
}

export default RoomsPage