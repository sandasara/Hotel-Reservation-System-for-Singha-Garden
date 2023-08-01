import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthContext';
import axios from 'axios';

const CustomerReservations = () => {
    const { authTokens } = useContext(AuthContext);
    const [reservations, setReservations] = useState([]);
    const [editingReservation, setEditingReservation] = useState(null);

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

    useEffect(() => {
        if (authTokens) {
            fetchReservations();
        }
    }, [authTokens]);

    const handleEdit = (reservation) => {
        setEditingReservation(reservation);
    };

    const handleSave = async () => {
        try {
            const response = await axios.put(
                `http://127.0.0.1:8000/api/reservations/${editingReservation.reservation_id}/`,
                editingReservation, {
                    headers: {
                        'Authorization': `Bearer ${authTokens.access}`,
                    },
                }
            );

            if (response.status === 200) {
                // Provide feedback to the user about the success of the update.
                console.log('Reservation updated successfully!');
                // Clear the editingReservation state to exit edit mode
                setEditingReservation(null);
                // Refetch the reservations after updating
                fetchReservations();
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

    const renderReservationRow = (reservation) => {
        if (editingReservation && editingReservation.reservation_id === reservation.reservation_id) {
            // Render input fields for editing
            return (
                <tr key={reservation.reservation_id} className="text-center">
                    <td className="border px-4 py-2">{reservation.reservation_id}</td>
                    <td className="border px-4 py-2">
                        <input
                            type="text"
                            name="room"
                            value={editingReservation.room}
                            onChange={handleChange}
                            className="w-full"
                        />
                    </td>
                    <td className="border px-4 py-2">
                        <input
                            type="date"
                            name="check_in"
                            value={editingReservation.check_in}
                            onChange={handleChange}
                        />
                    </td>
                    <td className="border px-4 py-2">
                        <input
                            type="date"
                            name="check_out"
                            value={editingReservation.check_out}
                            onChange={handleChange}
                        />
                    </td>
                    <td className="border px-4 py-2">
                        <input
                            type="number"
                            name="adults"
                            value={editingReservation.adults}
                            onChange={handleChange}
                        />
                    </td>
                    <td className="border px-4 py-2">
                        <input
                            type="number"
                            name="children"
                            value={editingReservation.children}
                            onChange={handleChange}
                        />
                    </td>
                    <td className="border px-4 py-2">
                        <input
                            type="text"
                            name="payment_method"
                            value={editingReservation.payment_method}
                            onChange={handleChange}
                            className="w-full"
                        />
                    </td>
                    <td className="border px-4 py-2">{editingReservation.standing ? 'Active' : 'Inactive'}</td>
                    <td className="border px-4 py-2">
                        <button className="px-2 py-1 bg-blue-500 text-white rounded" onClick={() => handleSave()}>
                            Save
                        </button>
                    </td>
                </tr>
            );
        } else {
            // Render regular row
            return (
                <tr key={reservation.reservation_id} className="text-center">
                    <td className="border px-4 py-2">{reservation.reservation_id}</td>
                    <td className="border px-4 py-2">{reservation.room}</td>
                    <td className="border px-4 py-2">{reservation.check_in}</td>
                    <td className="border px-4 py-2">{reservation.check_out}</td>
                    <td className="border px-4 py-2">{reservation.adults}</td>
                    <td className="border px-4 py-2">{reservation.children}</td>
                    <td className="border px-4 py-2">{reservation.payment_method}</td>
                    <td className="border px-4 py-2">{reservation.standing ? 'Active' : 'Inactive'}</td>
                    <td className="border px-4 py-2">
                        <button className="px-2 py-1 bg-green-500 text-white rounded" onClick={() => handleEdit(reservation)}>
                            Edit
                        </button>
                    </td>
                </tr>
            );
        }
    };

    return (
        <div className="container mx-auto">
            <h2 className="text-2xl font-semibold mb-4">My Reservations</h2>
            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-4 py-2">Reservation ID</th>
                            <th className="px-4 py-2">Room</th>
                            <th className="px-4 py-2">Check-in</th>
                            <th className="px-4 py-2">Check-out</th>
                            <th className="px-4 py-2">Adults</th>
                            <th className="px-4 py-2">Children</th>
                            <th className="px-4 py-2">Payment Method</th>
                            <th className="px-4 py-2">Status</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservations.map((reservation) => renderReservationRow(reservation))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CustomerReservations;
