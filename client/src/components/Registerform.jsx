import React, { useEffect, useRef, useState } from "react";
import bgmVideo from './Intro assests/bgvideo.mov';
import axios from "axios";
import {useNavigate} from "react-router-dom";

const Registerform = () => {

  const videoEl = useRef(null);
  useEffect(() => {
    videoEl.current.play().catch(error => {
      console.error("Error attempting to play", error);
    });
  }, []);



  ///Data getting 

  const dataObj={
    name: "",
    userName: "",
    emailId: "",
    phoneNumber: "",
    password: ""
  };

  const [success,setSuccess]=useState(0);

  const [Data,setData]=useState(dataObj);

  function getDetails(e){
    setData({...Data,[e.target.name]:e.target.value});
  };

  const navigate=useNavigate();
  function sendDetails(e){
    e.preventDefault();
    axios.post("https://quizappv2-one.vercel.app/register",Data).then((response)=>{
      //console.log(response);
      if(response.data===true){
        setSuccess(1);
        setTimeout(()=>{
          navigate('/');
        },2000);
      }
      else{
        setInc('User already exists');
      }
    }).catch((err)=>{
      console.log("Some Error",err);
    })
    setData(dataObj);
  };

  const [inc,setInc]=useState('');
  function checkDetails(e){
    e.preventDefault();
    if(Data.name!=='' && Data.emailId!=='' && Data.userName!=='' && Data.phoneNumber!=='' && Data.password!==''){
      setInc('');
      sendDetails(e);
    }
    else if(Data.name==='' && Data.emailId==='' && Data.userName==='' && Data.phoneNumber==='' && Data.password===''){
      setInc('All fields are compulsory')
    }
    else if(Data.name===''){
      setInc('Please Enter Name');
    }
    else if(Data.userName===''){
      setInc('Please Enter Username');
    }
    else if(Data.emailId===''){
      setInc('Please Enter Email ID');
    }
    else if(Data.phoneNumber===''){
      setInc('Please Enter Phone Number');
    }
    else if(Data.password===''){
      setInc('Please Enter Password');
    }
  };

  const Msg=()=>{
    return(
      <div className="text-green-500 text-[1.5vw] mb-[-2vw] mt-[1vw] ml-[2vw] font-semibold"><p>Registered Successfully</p></div>
    );
  };

  return (
    <div className="fixed z-10 w-full h-full object-cover">
      <video
        loop
        muted
        alt="All the devices"
        src={bgmVideo}
        ref={videoEl}
      />


      <div className='z-20 w-screen h-screen flex justify-center items-center'>
          <div>
            <div className='absolute left-[2vw] top-[1vw] text-white  text-[2vw] font-title'>SmartQuizAI</div>
            <form className='absolute right-[8vw] top-[7vh] bg-transparent rounded-xl px-[4vw] pt-[1vw] pb-[3vw] backdrop-blur-xl border border-white'>

              <div className='flex justify-center items-center'>
                <div className='pb-[2vw]'>
                  <h1 className='text-[2.5vw] text-white'>Registration</h1>
                </div>
              </div> 

              <div className='mb-[2vw] text-[1.5vw] text-white'> 
                <input className="placeholder:text-white bg-transparent outline-none border-2 px-[1vw] py-[0.5vw] rounded-t-full rounded-b-full
                " type='text'  placeholder='Name' name="name" value={Data.name} onChange={getDetails}/>
              </div>

              <div className='mb-[2vw] text-[1.5vw] text-white'> 
                <input className="placeholder:text-white bg-transparent outline-none border-2 px-[1vw] py-[0.5vw] rounded-t-full rounded-b-full
                " type='text'  placeholder='Username' name="userName" value={Data.userName} onChange={getDetails}/>
              </div>

              <div className='mb-[2vw] text-[1.5vw] text-white'> 
                <input className="placeholder:text-white bg-transparent outline-none border-2 px-[1vw] py-[0.5vw] rounded-t-full rounded-b-full
                " type='text'  placeholder='Email Id' name="emailId" value={Data.emailId} onChange={getDetails}/>
              </div>


              <div className='mb-[2vw] text-[1.5vw] text-white'> 
                <input className="placeholder:text-white bg-transparent outline-none border-2 px-[1vw] py-[0.5vw] rounded-t-full rounded-b-full
                " type='text'  placeholder='Phone Number' name="phoneNumber" value={Data.phoneNumber} onChange={getDetails}/>
              </div>

              <div className='text-[1.5vw] text-white'>
                <input className="placeholder:text-white bg-transparent outline-none border-2 px-[1vw] py-[0.5vw] rounded-t-full rounded-b-full
                "  type='password' placeholder='Password' name="password" value={Data.password} onChange={getDetails}/>
              </div>

                
              <div>
                <button className='bg-white text-black mt-[2vw] w-full px-[2vw] py-[0.5vw] rounded-t-full rounded-b-full border-none text-[1.5vw] font-semibold' onClick={checkDetails}>Register</button>
              </div>

              <div>{success===1?<Msg/>:""}</div>
              <div className="text-red-500 text-[1.5vw] mb-[-2vw] mt-[1vw] ml-[2vw] font-semibold">{inc}</div>
            </form>
          </div>
          
        </div>

    </div>

    
  )
}

export default Registerform
