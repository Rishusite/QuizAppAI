import React from 'react'
import { useNavigate } from 'react-router-dom';

const Navbar = ({dataobj}) => {
  //console.log(dataobj);
  const user=dataobj.name;
  const navigate=useNavigate();
  return (
    <div className='relative z-20 w-full bg-blue-800 drop-shadow-xl text-white text-[2vw] '>
      <div className='flex justify-between items-center'>
        <div className='px-[2vw] py-[0.8vw]'>
          Welcome {user}
        </div>
        
        <div className='flex justify-end items-center  pr-[0.5vw]'>
          <div className='cursor-pointer hover:bg-indigo-500 hover:scale-110 px-[1vw] py-[0.5vw] duration-300'>Home</div>
          <div className='cursor-pointer hover:bg-indigo-500 hover:scale-110 px-[1vw] py-[0.5vw] duration-300'>Profile</div>
          <div className='cursor-pointer hover:bg-indigo-500 hover:scale-110 px-[1vw] py-[0.5vw] duration-300'>Downloads</div>
          <div className='cursor-pointer hover:bg-indigo-500 hover:scale-110 px-[1vw] py-[0.5vw] duration-300'>Support</div>
          <div className='cursor-pointer hover:bg-indigo-500 hover:scale-110 px-[1vw] py-[0.5vw] duration-300' onClick={()=>{
            navigate('/');
          }}>Log out</div>
        </div>
      </div>
      
    </div>
  )
}

export default Navbar