import React, { useState, useEffect } from 'react';

const GetReservations = () => {

    let [reservations, setReservations] = useState([])

    useEffect(() => {
        getReservations()
    }, [])

    let getReservations = async () => {
        let response = await fetch('/api/reservations/')
        let data = await response.json()
        setReservations(data)
    }

    return (
        <div>
            <div>
                {reservations.map((reservation, index) => (
                    <>
                   <h3 key={index}>{reservation.check_in}</h3>
                   <h3 key={index}>{reservation.reservation_id}</h3>
                   </>
                ))}
            </div>
        </div>
    )
}

export default GetReservations;