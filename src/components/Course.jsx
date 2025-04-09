

import Cards from './Cards'
import {Link}from "react-router-dom"
import axios from 'axios';
import { useEffect, useState } from 'react';
function Course() {
     const [data,setdata]=useState([]);

     useEffect(()=>{
      
      const getBooks=async()=>{
       try {
        const res = await axios.get("https://bookstore-backend-tcp8.onrender.com/books");

        
       setdata(res.data)
       }catch(err){
        console.log(err)
       }
      

      }
      getBooks()
     },[]);


  
  return (
    <>
      <div className="max-w-screen-2xl mx-auto md:px-20 px-4">
        <div className="mt-28 items-center justify-center text-center">
        <h1 className="text-xl font-semibold md:text-4xl ">Well-Come to have you <span className="text-pink-500 font-semibold">hear..</span> </h1>
        <p className="mt-12">here is lots of book for reading so you can xplore your knowladge here and aslo can create your notes hear i will provide you soon..</p>
        <Link to="/">
        <button className="mt-6 bg-pink-500 rounded-md px-4 py-2 text-white hover:gb-pink-700 duration-300">Back</button></Link>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4">
          {data.map((Item)=>(<Cards key={ Item.id} Item={Item}/>))}
          </div>
      </div>
     
    </> 
  )
}

export default Course
