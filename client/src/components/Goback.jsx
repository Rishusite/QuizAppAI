import React from 'react'
import axios from 'axios'
import { useState,useEffect,useRef } from 'react'
import {NavLink,useNavigate} from "react-router-dom";
import bgmVideo from './Intro assests/bgvideo.mov';

const Goback = ({uid,score,promt}) => {
  const videoEl = useRef(null);
  const navigate= useNavigate();
  useEffect(() => {
    videoEl.current.play().catch(error => {
      console.error("Error attempting to play", error);
    });
  }, []);
  axios.defaults.withCredentials = true;
  async function sendStats(){
    const data={id:uid,score:score, sub:promt};
    await axios.post("https://quizapp-server-one.vercel.app/sendStats",data).then((res)=>console.log(res)).catch((err)=>console.log(err));
  };
  return (
    <div>
      <video
        loop
        muted
        alt="All the devices"
        src={bgmVideo}
        ref={videoEl}
        className='fixed z-10 w-screen h-screen object-cover'
      />
        <div className='relative z-20 flex justify-center items-center w-screen h-screen'>
        <div className='bg-transparent rounded-xl backdrop-blur-3xl border border-white max-w-[50%] px-[3vw] py-[5vw] '>
          <div className='text-black text-[2vw]'>
              Your Score Was {score}/5
          </div>

          <div className='text-yellow-100 text-[1.5vw] mt-[0.5vw]'>
              You can always download this attempted paper from the download section in the home page of this website
          </div>
            <div className='flex justify-center items-center w-full mt-[2vw]'>
              <div>
                <button onClick={()=>{
                  sendStats();
                  navigate(`/userhandle/${uid}`);
                }} className=' text-white rounded-lg text-[2vw]  bg-blue-400 px-[1vw] py-[1vw] hover:scale-110 hover:bg-blue-500 duration-300'>Move To Home</button> 
              </div>
            </div>
            
        </div>
        
        
      </div>
      
    </div>
  )
}

export default Goback
