//import React from 'react'

import Course from "../components/Course"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"

function Courses() {
  
  return (
    <>
      <Navbar/>
      <div className="min-h-screen">
      <Course/>
      </div>
      
      <Footer/>
    </>
  )
}

export default Courses
