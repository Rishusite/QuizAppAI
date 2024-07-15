import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Stats from './Stats';

const Playchoice = ({uid,name}) => {
  const navigate=useNavigate();
  const [totaltest,settotaltest]=useState(0);
  return (
    <div className='absolute z-20 left-[5%] bottom-[20%] text-white text-[1.5vw] border border-white rounded-lg px-[1.5vw] py-[1vw] font-semibold'>
      <div className='flex justify-center items-center mb-[2vw] text-[2vw]'>
        <div>Choose Subject</div>
      </div>
      <div className='grid grid-cols-3 gap-[2vw] text-black text-[2vw] font-normal'>

        <div className='cursor-pointer bg-amber-200  hover:bg-amber-300 hover:scale-105 duration-300'><button onClick={()=>{
          let prompt='current affairs'
          navigate(`/userhandle/play/${uid}/${prompt}/${name}`)
        }} className='w-full'>CA</button>
          <Stats id={uid} sub={'current affairs'} total={totaltest} settotaltest={settotaltest}/>
        </div>

        <div className='bg-amber-200  hover:bg-amber-300 hover:scale-105 duration-300'><button onClick={()=>{
          let prompt='english'
          navigate(`/userhandle/play/${uid}/${prompt}/${name}`)
        }} className='w-full'>English</button>
          <Stats id={uid} sub={'english'} total={totaltest} settotaltest={settotaltest}/>
        </div>

        <div className='bg-amber-200  hover:bg-amber-300 hover:scale-105 duration-300'><button  onClick={()=>{
          let prompt='biology'
          navigate(`/userhandle/play/${uid}/${prompt}/${name}`)
        }} className='w-full'>Biology</button>
          <Stats id={uid} sub={'biology'} total={totaltest} settotaltest={settotaltest}/>
        </div>

        <div className='bg-amber-200  hover:bg-amber-300 hover:scale-105 duration-300'><button onClick={()=>{
          let prompt='physics'
          navigate(`/userhandle/play/${uid}/${prompt}/${name}`)
        }} className='w-full'>Physics</button>
          <Stats id={uid} sub={'physics'} total={totaltest} settotaltest={settotaltest}/>
        </div>
        
        <div className='bg-amber-200  hover:bg-amber-300 hover:scale-105 duration-300'><button onClick={()=>{
          let prompt='chemistry'
          navigate(`/userhandle/play/${uid}/${prompt}/${name}`)
        }} className='w-full'>Chemistry</button>
          <Stats id={uid} sub={'chemistry'} total={totaltest} settotaltest={settotaltest}/>
        </div>
        
        <div className='bg-amber-200 hover:bg-amber-300 hover:scale-105 duration-300'><button onClick={()=>{
          let prompt='geography'
          navigate(`/userhandle/play/${uid}/${prompt}/${name}`)
        }} className='w-full'>Geography</button>
          <Stats id={uid} sub={'geography'} total={totaltest} settotaltest={settotaltest}/>
        </div>

        <div className='bg-amber-200  hover:bg-amber-300 hover:scale-105 duration-300'><button onClick={()=>{
          let prompt='polity'
          navigate(`/userhandle/play/${uid}/${prompt}/${name}`)
        }} className='w-full'>Polity</button>
          <Stats id={uid} sub={'polity'} total={totaltest} settotaltest={settotaltest}/>
        </div>

        <div className='bg-amber-200 hover:bg-amber-300 hover:scale-105 duration-300'><button onClick={()=>{
          let prompt='history'
          navigate(`/userhandle/play/${uid}/${prompt}/${name}`)
        }} className='w-full'>History</button>
          <Stats id={uid} sub={'history'} total={totaltest} settotaltest={settotaltest}/>
        </div>

        <div className='bg-amber-200 hover:bg-amber-300 hover:scale-105 duration-300'><button onClick={()=>{
          let prompt='computers'
          navigate(`/userhandle/play/${uid}/${prompt}/${name}`)
        }} className='w-full'>computers</button>
          <Stats id={uid} sub={'computers'} total={totaltest} settotaltest={settotaltest}/>
        </div>
      </div>
      
    </div>
  )
}

export default Playchoice