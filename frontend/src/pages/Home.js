import React from 'react'

import HomeNavbar from '../components/HomeNavbar';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import Rooms from '../components/Rooms';
import Search from '../components/Search';

function Home(props) {
  return (
    <div>
      <HomeNavbar />
      <Hero setAvailableRooms={props.setAvailableRooms} setSearchedParams={props.setSearchedParams} />
      <Rooms />
      <Search />
      <Footer />
    </div>
  )
}

export default Home