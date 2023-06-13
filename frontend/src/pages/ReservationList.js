import React, { useState, useEffect } from 'react';

const ReservationList = () => {

    let [reservations, setReservations] = useState([])

    useEffect(() => {
        getReservations()
    }, [])

    let getReservations = async () => {

        let response = await fetch('http://127.0.0.1:8000/api/reservations/')
        let data = await response.json()
        console.log('Data: ', data)
        setReservations(data)
    }

    return (
        <div>
            ReservationList
        </div>
    )
}

export default ReservationList;