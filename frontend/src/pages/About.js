import React, { useContext } from 'react'
import Navbar from '../components/Navbar'
import AuthContext from '../context/AuthContext'

function About() {
  let {user} = useContext(AuthContext)
  return (
    <div>
        <Navbar />
        <p>about {user.username}</p>
    </div>
  )
}

export default About