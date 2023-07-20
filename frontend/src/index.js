import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// const router = createBrowserRouter([
//   { path: "/", element: <Home />, },
//   { path: "/rooms", element: <RoomsPage />, },
//   { path: "/about", element: <About />, },
//   { path: "/contact", element: <Contact />, },
//   { path: "/book", element: <Book />, },
//   { path: "/reservations", element: <ReservationList />, },
//   { path: "/reservations/:id", element: <GetSingleReservation />, },
//   { path: "/rooms/available", element: <AvailableRooms />, },
// ]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <RouterProvider router={router} /> */}
    <App />
  </React.StrictMode>
);
