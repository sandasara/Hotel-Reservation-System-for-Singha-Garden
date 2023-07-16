import React from 'react'
import { useNavigate } from "react-router-dom";

const ReserveBtn = () => {

    let navigate = useNavigate(); 
    const gotoBook = () =>{ 
        let path = `/book`; 
        navigate(path);
    }

  return (
    <div>
        <button onClick={gotoBook}>Reserve</button>
    </div>
  )
}

export default ReserveBtn