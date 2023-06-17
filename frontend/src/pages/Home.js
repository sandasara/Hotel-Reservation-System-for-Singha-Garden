import React from 'react'

import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import Rooms from '../components/Rooms';
import Search from '../components/Search';

function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Rooms />
      <Search />
      <Footer />
    </div>
  )
}

export default Home