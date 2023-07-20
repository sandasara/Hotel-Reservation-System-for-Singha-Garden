import React, { useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom';
import Searchbar from './Searchbar';
import AvailableRooms from '../pages/AvailableRooms';

const AvailableCommon = () => {

  const [availableRooms, setAvailableRooms] = useState([]);

  return (
    <Router>
    <div>
      <Searchbar setAvailableRooms={setAvailableRooms} />
      <AvailableRooms availableRooms={availableRooms}/>
    </div>
    </Router>
  )
}

export default AvailableCommon