import React from 'react'

const UpdateReservation = () => {

  let update = () => {
    fetch(`/api/reservations/${id}/update/`, {
      method: "PUT",
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(note)
  })
  }

  return (
    <div>UpdateReservation</div>
  )
}

export default UpdateReservation