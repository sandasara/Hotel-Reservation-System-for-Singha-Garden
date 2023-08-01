import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthContext'
import axios from 'axios';

const CustomerReservations = () => {
    let { user } = useContext(AuthContext)
    const { authTokens } = useContext(AuthContext);
    const [reservations, setReservations] = useState([]);
    const [editingReservation, setEditingReservation] = useState(null);

    useEffect(() => {
      const fetchReservations = async () => {
        try {
          const response = await axios.get('http://127.0.0.1:8000/api/get_customer_reservations/', {
            headers: {
              'Authorization': `Bearer ${authTokens.access}`,
            },
          });
  
          if (response.status === 200) {
            setReservations(response.data);
          } else {
            console.error('Failed to fetch reservations');
          }
        } catch (error) {
          console.error('Error while fetching reservations', error);
        }
      };
  
      if (authTokens) {
        fetchReservations();
      }
    }, [authTokens]);
  
    const handleEdit = (reservation) => {
      setEditingReservation(reservation);
    };
  
    const handleSave = async () => {
      try {
        const response = await axios.put(`http://127.0.0.1:8000/api/reservations/${editingReservation.reservation_id}/`, editingReservation, {
          headers: {
            'Authorization': `Bearer ${authTokens.access}`,
          },
        });
  
        if (response.status === 200) {
          // Provide feedback to the user about the success of the update.
          console.log('Reservation updated successfully!');
          // Clear the editingReservation state to exit edit mode
          setEditingReservation(null);
        } else {
          // Provide feedback to the user about the failure of the update.
          console.error('Failed to update reservation');
        }
      } catch (error) {
        console.error('Error while updating reservation', error);
      }
    };
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setEditingReservation((prevReservation) => ({
        ...prevReservation,
        [name]: value,
      }));
    };
    return (
      <div>
        <h2>Customer Reservations</h2>
        <table>
          <thead>
            <tr>
              <th>Reservation ID</th>
              <th>Room</th>
              <th>Check-in</th>
              <th>Check-out</th>
              <th>Adults</th>
              <th>Children</th>
              <th>Payment Method</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation) => (
              <tr key={reservation.reservation_id}>
                <td>{reservation.reservation_id}</td>
                <td>{reservation.room}</td>
                <td>{reservation.check_in}</td>
                <td>{reservation.check_out}</td>
                <td>{reservation.adults}</td>
                <td>{reservation.children}</td>
                <td>{reservation.payment_method}</td>
                <td>{reservation.standing ? 'Active' : 'Inactive'}</td>
                <td>
                  {editingReservation && editingReservation.reservation_id === reservation.reservation_id ? (
                    <div>
                      <button onClick={() => handleSave()}>Save</button>
                    </div>
                  ) : (
                    <button onClick={() => handleEdit(reservation)}>Edit</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
}

export default CustomerReservations