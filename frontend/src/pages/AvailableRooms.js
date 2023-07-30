import React from 'react'
import Navbar from '../components/Navbar';
import ReserveBtn from '../components/ReserveBtn';
import { Link } from 'react-router-dom';

const AvailableRooms = ({ availableRooms }) => {
  if (!availableRooms || availableRooms.length === 0) {
    return (
      <div>
        <Navbar />
        Sorry, All our rooms are booked.
      </div>
    ) 
  }
  else {

    return ( 
      <div>
        <Navbar />
        <section className="my-8 md:px-16 xl:px-24">
          <h3>We have these rooms ready for you</h3>
          <div className="my-8 mx-auto max-w-screen-xl">
            {availableRooms.map(room => (
              <div key={room.room_id} className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8"> {/* Add mb-8 to create space between each room */}
                {/* Room Image */}
                <div>
                  <img src={room.room_image} alt={room.room_name} className="h-40 w-full object-cover md:h-auto" />
                </div>
                {/* Room Details */}
                <div>
                  <div className="flex items-center mb-4">
                    <h2 className="mr-4">{room.room_name}</h2>
                    <Link to={`/room/${room.room_id}`}><ReserveBtn/></Link>
                  </div>
                  <h3>Total price: ${room.total_price}</h3>
                  <p>Nights: {room.number_of_days}</p>
                  <p>Price per day: ${room.room_price}</p>
                  <div>
                    <div className='my-2'>
                      <h3>Amenities</h3>
                      <ul className="my-0 list-disc grid grid-cols-2 gap-4">
                        {Array.isArray(room.amenities)
                          ? room.amenities.map((amenity, index) => (
                              <li key={index} className="my-0">{amenity}</li>
                            ))
                          : room.amenities && (
                              <li className="my-0">{room.amenities} </li>
                            )}
                      </ul>
                    </div>
                    <div className='my-2'>
                      <h3>Overview</h3>
                      <p>{room.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    );

    // return ( 
    //   <div>
    //     <Navbar />
    //     <section className="my-8 md:px-16 xl:px-24">
    //       <h3>We have these rooms ready for you</h3>
    //       <div className="my-8 md:px-16 xl:px-24">
    //         {availableRooms.map(room => (
    //           <div key={room.room_id}>
    //             <div>
    //               <img src={room.room_image} alt={room.room_name} />
    //             </div>
    //             <h2>{room.room_name}</h2>
    //             <h3>Total price: ${room.total_price}</h3>
    //             <p>Nights: {room.number_of_days}</p>
    //             <p>Price per day: ${room.room_price}</p>
    //             <div>
    //               <div className='my-2'>
    //                 <h3>Amenities</h3>
    //                 <ul className="my-0 list-disc grid grid-cols-2 gap-4">
    //                 {Array.isArray(room.amenities)
    //                   ? room.amenities.map((amenity, index) => (
    //                       <li key={index} className="my-0">{amenity}</li>
    //                     ))
    //                   : room.amenities && (
    //                       <li className="my-0">{room.amenities} </li>
    //                     )}
    //               </ul>
    //               </div>
    //               <div className='my-2'>
    //                 <h3>Overview</h3>
    //                 <p>{room.description}</p>
    //               </div>
    //             </div>
    //             <div className='mb-8'>
    //               <Link to={`/room/${room.room_id}`}><ReserveBtn/></Link>
    //             </div>
    //           </div>
    //         ))}
    //       </div>
    //     </section>
    //   </div>
    // )
    }
  }

export default AvailableRooms