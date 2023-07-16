import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const GetSingleReservation = () => {
    const { id } = useParams();

    let [reservation, setReservation] = useState(null)

    useEffect(() => {
        getReservation()
    }, [id])


    let getReservation = async () => {
        // if (id === 'new') return

        let response = await fetch(`/api/reservations/${id}`)
        if (!response.ok) {
            throw new Error('Failed to fetch reservation');
        }

        const data = await response.json();
        setReservation(data);
    }

    return (
        <div>
            <p>{reservation?.check_in}</p>
        </div>
    );
};

export default GetSingleReservation;