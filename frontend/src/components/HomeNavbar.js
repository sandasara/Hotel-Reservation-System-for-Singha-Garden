import React, { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext'
import { Link } from 'react-router-dom';
import { BsPerson } from 'react-icons/bs';
import { BiSearch } from 'react-icons/bi';
import { AiOutlineClose } from 'react-icons/ai';
import { HiOutlineMenuAlt4 } from 'react-icons/hi';
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaPinterest,
  FaYoutube,
} from 'react-icons/fa';

const HomeNavbar = () => {

    const [nav, setNav] = useState(false);
    const [logo, setLogo] = useState(false)
    const handleNav = () => {
        setNav(!nav);
        setLogo(!logo)
    };

    let {user, logoutUser} = useContext(AuthContext)

  return (
    <div className='flex w-full justify-between items-center h-20 px-4 absolute z-10 text-white'>
        <div>
            <h1 onClick={handleNav} className={logo ? 'hidden' : 'block'}>GARDEN</h1>
        </div>
        <ul className='hidden md:flex'>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/Rooms'>Rooms</Link></li>
            <li><Link to='/About'>About Us</Link></li>
            <li><Link to='/Contact'>Contact</Link></li>
            <li><Link to='/rooms'>Book Now</Link></li>

      </ul>
      <div className='hidden md:flex'>
        {user ? (
          <>
          <p>Hi {user.username}  </p>
          <button onClick={logoutUser}>Logout</button>
          </>
        ): (
          <Link to="/login" >Login</Link>
        )}
        <Link to='/adminpanel'><BsPerson size={20} /></Link>
      </div>

      {/* Hamburger */}
      <div onClick={handleNav} className='md:hidden z-10'>
        {nav ? <AiOutlineClose className='text-black' size={20} /> : <HiOutlineMenuAlt4 size={20} />}
      </div>

      {/* Mobile menu dropdown */}
      <div onClick={handleNav} className={nav ? 'absolute text-black left-0 top-0 w-full bg-gray-100/90 px-4 py-7 flex flex-col' : 'absolute left-[-100%]'}>
        <ul>
          <h1>GARDEN</h1>
          <li className='border-b'>Home</li>
          <li className='border-b'>Rooms</li>
          <li className='border-b'>About Us</li>
          <li className='border-b'>Contact</li>
          <li className='border-b'>Book Now</li>
          <div className='flex flex-col'>
            <button className='my-6'>Search</button>
            <button>Account</button>
          </div>
          <div className='flex justify-between my-6'>
            <FaFacebook className='icon' />
            <FaTwitter className='icon' />
            <FaYoutube className='icon' />
            <FaPinterest className='icon' />
            <FaInstagram className='icon' />
          </div>
        </ul>
      </div>
    </div>
  )
}

export default HomeNavbar