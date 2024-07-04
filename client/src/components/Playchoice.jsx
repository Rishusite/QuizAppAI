import React from 'react'
import { useNavigate } from 'react-router-dom';

const Playchoice = ({uid,name}) => {
  const navigate=useNavigate();
  return (
    <div className='absolute z-20 bottom-[20%] right-[5%] text-white text-[1.5vw] border border-white rounded-lg px-[1.5vw] py-[1vw]'>
      <div className='flex justify-center items-center mb-[2vw]'>
        <div>Choose Subject</div>
      </div>
      <div className='grid grid-cols-3 gap-[1vw] text-black text-[2vw]'>

        <div className='cursor-pointer bg-amber-200  hover:bg-amber-300 duration-300'><button onClick={()=>{
          let prompt='current affairs'
          navigate(`/userhandle/play/${uid}/${prompt}/${name}`)
        }}>CA</button></div>

        <div className='bg-amber-200  hover:bg-amber-300 duration-300'><button onClick={()=>{
          let prompt='english'
          navigate(`/userhandle/play/${uid}/${prompt}/${name}`)
        }}>English</button></div>

        <div className='bg-amber-200  hover:bg-amber-300 duration-300'><button  onClick={()=>{
          let prompt='biology'
          navigate(`/userhandle/play/${uid}/${prompt}/${name}`)
        }}>Biology</button></div>

        <div className='bg-amber-200  hover:bg-amber-300 duration-300'><button onClick={()=>{
          let prompt='physics'
          navigate(`/userhandle/play/${uid}/${prompt}/${name}`)
        }}>Physics</button></div>
        
        <div className='bg-amber-200  hover:bg-amber-300 duration-300'><button onClick={()=>{
          let prompt='chemistry'
          navigate(`/userhandle/play/${uid}/${prompt}/${name}`)
        }}>Chemistry</button></div>
        
        <div className='bg-amber-200 hover:bg-amber-300 duration-300'><button onClick={()=>{
          let prompt='geography'
          navigate(`/userhandle/play/${uid}/${prompt}/${name}`)
        }}>Geography</button></div>

        <div className='bg-amber-200  hover:bg-amber-300 duration-300'><button onClick={()=>{
          let prompt='polity'
          navigate(`/userhandle/play/${uid}/${prompt}/${name}`)
        }}>Polity</button></div>

        <div className='bg-amber-200 hover:bg-amber-300 duration-300'><button onClick={()=>{
          let prompt='history'
          navigate(`/userhandle/play/${uid}/${prompt}/${name}`)
        }}>History</button></div>

        <div className='bg-amber-200 hover:bg-amber-300 duration-300'><button onClick={()=>{
          let prompt='computers'
          navigate(`/userhandle/play/${uid}/${prompt}/${name}`)
        }}>computers</button></div>
      </div>
    </div>
  )
}

export default Playchoice