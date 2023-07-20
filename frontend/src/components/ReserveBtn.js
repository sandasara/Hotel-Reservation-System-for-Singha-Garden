import React from 'react'
import { useNavigate } from "react-router-dom";

const ReserveBtn = (selectedRoom) => {

    let navigate = useNavigate(); 

    const gotoBook = () =>{ 
        let path = `/book`; 
        navigate(path);
    }

    console.log(selectedRoom)
  return (
    <div>
        <button onClick={gotoBook}>Reserve</button>
    </div>
  )
}

export default ReserveBtn