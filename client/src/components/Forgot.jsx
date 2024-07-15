import { useState,useEffect,useRef } from 'react'
import axios from 'axios';
import {NavLink,useNavigate} from "react-router-dom";
import bgmVideo from './Intro assests/bgvideo.mov';

const Forgot = () => {
  const videoEl = useRef(null);
  const navigate= useNavigate();
  useEffect(() => {
    videoEl.current.play().catch(error => {
      console.error("Error attempting to play", error);
    });
  }, []);

  const dataObj={
    username:"",
    phonenumber:"",
    password:""
  };
  const [Data,setData]=useState(dataObj);
  const [status,setStatus]=useState('');
  const [css,setcss]=useState('');
  function getDetails(e){
    setData({...Data,[e.target.name]:e.target.value});
  }

  function sendData(e){
    e.preventDefault();
    axios.post("http://localhost:8000/forgot",Data).then((response)=>{
      //console.log(response);
      if(response.data===false){
        //console.log('Invalid Username or Password');
        setStatus(`User Does not exists`);
        setcss('text-[1.5vw] text-red-500  font-semibold mt-[1.5vw] ml-[23%] mb-[-1vw]');
      }
      else{
        //console.log('Found User');
        setStatus('Password updated successfully');
        setcss('text-[1.5vw] text-green-500  font-semibold mt-[1.5vw] ml-[10%] mb-[-1vw]');
        setTimeout(()=>{
          navigate('/');
        },10000);
        
      }
    }).catch((err)=>{
      console.log("Some Error",err);
    })
    setData(dataObj);
  }
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
      
      <div className='relative z-10 w-screen h-screen flex justify-center items-center'>
      <div>
        <div className='absolute left-[2vw] top-[1vw] text-white  text-[2vw] font-title'>SmartQuizAI</div>
        <form className='absolute right-[8vw] top-[18vh] bg-transparent rounded-xl px-[4vw] pt-[1vw] pb-[3vw] backdrop-blur-xl border border-white'>

          <div className='flex justify-center items-center'>
            <div className='pb-[2vw]'>
              <h1 className='text-[2.5vw] text-white'>Reset Your Password</h1>
            </div>
          </div> 

          <div className='mb-[2vw] text-[2vw] text-white'> 
            <input className="placeholder:text-white bg-transparent outline-none border-2 px-[1vw] py-[0.5vw] rounded-t-full rounded-b-full
            " type='text'  placeholder='Username' name="username" value={Data.username} onChange={getDetails}/>
          </div>

          <div className='mb-[2vw] text-[2vw] text-white'> 
            <input className="placeholder:text-white bg-transparent outline-none border-2 px-[1vw] py-[0.5vw] rounded-t-full rounded-b-full
            " type='text'  placeholder='Phone Number' name="phonenumber" value={Data.phonenumber} onChange={getDetails}/>
          </div>

          <div className='mb-[2vw] text-[2vw] text-white'> 
            <input className="placeholder:text-white bg-transparent outline-none border-2 px-[1vw] py-[0.5vw] rounded-t-full rounded-b-full
            " type='password'  placeholder='New Password' name="password" value={Data.password} onChange={getDetails}/>
          </div>

          <div>
            <button className='bg-white text-black mt-[2vw] w-full px-[2vw] py-[0.5vw] rounded-t-full rounded-b-full border-none text-[1.5vw] font-semibold' onClick={sendData}>Change</button>
          </div>

          <div className={css}>
            {status}
          </div>
          
        </form>
      </div>
      
    </div>
    </div>
  )
}

export default Forgot