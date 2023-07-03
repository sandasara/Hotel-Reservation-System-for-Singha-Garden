import React from 'react';
import { useParams } from 'react-router-dom';

const GetSingleReservation = () => {
const { id } = useParams();

return (
<div>GetSingleReservation {id}</div>
);
};

export default GetSingleReservation;