import React from 'react'
import Navbar from '../components/Navbar'
import RoomBlock from '../components/RoomBlock'
import ReserveBtn from '../components/ReserveBtn'
import Searchbar from '../components/Searchbar'

function RoomsPage() {
  return (
    <div>
        <Navbar />
        <Searchbar />
        <ReserveBtn />
        <RoomBlock />
    </div>
  )
}

export default RoomsPage