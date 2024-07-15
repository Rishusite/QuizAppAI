import React, { useEffect, useState, useRef } from 'react'
import bgmVideo from './Intro assests/bgvideo.mov';
import axios from 'axios';

const Contactus = () => {
  const videoEl = useRef(null);
  useEffect(() => {
    videoEl.current.play().catch(error => {
      console.error("Error attempting to play", error);
    });
  }, []);

  const dataObj={
    name:"",
    query:""
  };
  const [Data,setData]=useState(dataObj);
  const [loginStatus,setLoginStatus]=useState('');

  //getting data
  function getDetails(e){
    setData({...Data,[e.target.name]:e.target.value});
  }

  function sendData(e){
    e.preventDefault();
    axios.post("https://quizappv2-one.vercel.app/contactus",Data).then((response)=>{
      //console.log(response);
      if(response.data===true){
        //console.log('Invalid Username or Password');
        setLoginStatus(`Thanks for contacting! We'll see the matter and contact you soon if needed.`);
      }
    }).catch((err)=>{
      console.log("Some Error",err);
    })
    setData(dataObj);
  };

  return (
    <div>
      <video
        loop
        muted
        alt="All the devices"
        src={bgmVideo}
        ref={videoEl}
        className="fixed z-0 w-full h-full object-cover"
      />

        <div className="z-10 backdrop-blur-3xl flex justify-center items-center h-screen">
          <div className=' text-white text-[1.5vw] border border-white      rounded-lg px-[2vw] py-[2vw] font-semibold mt-[3vw] mb-[3vw] max-w-[37%]'>
            <div className='text-center text-[2vw] mb-[2vw]'>Contact Us</div>
              <form>

                <div className='mb-[2vw] text-[2vw] text-white'> 
                  <input className="placeholder:text-white bg-transparent outline-none border-2 px-[1vw] py-[0.5vw] rounded-t-full rounded-b-full w-full
                  " type='text'  placeholder='Username' name="name" value={Data.name} onChange={getDetails}/>
                </div>

                <div className='text-[2vw] text-white'>
                  <textarea className="placeholder:text-white bg-transparent outline-none border-2 px-[1vw] py-[0.5vw]
                  " placeholder='Feedback/Grievances' rows="4" cols="30" name="query" wrap="hard" value={Data.query} onChange={getDetails}/>
                </div>

                <div>
                  <button className='bg-white text-black mt-[2vw] w-full px-[2vw] py-[0.5vw] rounded-t-full rounded-b-full border-none text-[1.5vw] font-semibold hover:bg-blue-100 hover:scale-105 duration-300' onClick={sendData}>Send</button>
                </div>
                <div className='mt-[2vw] text-green-400 text-wrap'>{loginStatus}</div>           
              </form>
            </div>
          
        </div>
    </div>
  )
}

export default Contactus
