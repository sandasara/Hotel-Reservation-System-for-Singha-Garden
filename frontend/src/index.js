import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css';
import App from './App';
import RoomsPage from './pages/RoomsPage';
import About from './pages/About';
import Contact from './pages/Contact';
import Book from './pages/Book';
import ReservationList from './pages/ReservationList';
import GetSingleReservation from './components/GetSingleReservation';

const router = createBrowserRouter([
  { path: "/", element: <App />, },

  { path: "/rooms", element: <RoomsPage />, },

  { path: "/about", element: <About />, },

  { path: "/contact", element: <Contact />, },

  { path: "/book", element: <Book />, },

  { path: "/reservations", element: <ReservationList />, },

  { path: "/reservation/:id", element: <GetSingleReservation />, },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
