import React from 'react'
import hero_video from '../assets/hero_video.mp4';
import { AiOutlineSearch } from 'react-icons/ai';
import Searchbar from './Searchbar';

const Hero = () => {
  return (
    <div>
      <div className='w-full h-screen relative'>
        <video
          className='w-full h-full object-cover'
          src={hero_video}
          autoPlay
          loop
          muted
        />
      </div>

      <div className='absolute w-full h-full top-0 left-0 bg-gray-900/30'></div>

      <div className='absolute top-0 w-full h-full flex flex-col justify-center text-center text-white p-4'>
        <h1>First Class Travel</h1>
        <h2 className='py-4'>Top 1% Locations Worldwide</h2>

        <Searchbar />

        {/* <form
          className='flex justify-between items-center max-w-[920px] mx-auto w-100% border p-1
          rounded-md text-black bg-gray-100/90'>
          <div className='flex flex-row mx-4'>
            <div className='flex flex-col my-4'>
              <label>Check-In</label>
              <input
                className='bg-transparent w-[100px] sm:w-[200px] font-[Poppins] focus:outline-none p-1'
                type='date'
              />
            </div>
            <div className='flex flex-col my-4'>
              <label>Check-Out</label>
              <input
                className='bg-transparent w-[100px] sm:w-[200px] font-[Poppins] focus:outline-none p-1'
                type='date'
              />
            </div>
            <div className='flex flex-col my-4'>
              <label>Adults</label>
              <input
                className='bg-transparent w-[100px] sm:w-[200px] font-[Poppins] focus:outline-none p-1'
                type='number'
              />
            </div>
            <div className='flex flex-col my-4'>
              <label>Children</label>
              <input
                className='bg-transparent w-[100px] sm:w-[200px] font-[Poppins] focus:outline-none p-1'
                type='number'
              />
            </div>
          </div>
          <div>
            <button className='mx-6'>
              <AiOutlineSearch size={20} className='icon p-1' style={{color: '#ffffff'}}  />
            </button>
          </div>
        </form> */}
      </div>
    </div>
  )
}

export default Hero
