import React from 'react'
import { useParams } from 'react-router-dom';

const GetSingleReservation = ({ useParams }) => {
    const { id } = useParams()
    let reservationId = id

  return (
    <div>GetSingleReservation{reservationId}</div>
  )
}

export default GetSingleReservation