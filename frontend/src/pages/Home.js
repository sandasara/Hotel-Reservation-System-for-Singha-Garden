import React from 'react'

import HomeNavbar from '../components/HomeNavbar';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import Rooms from '../components/Rooms';
import Search from '../components/Search';

function Home() {
  return (
    <div>
      <HomeNavbar />
      <Hero />
      <Rooms />
      <Search />
      <Footer />
    </div>
  )
}

export default Home