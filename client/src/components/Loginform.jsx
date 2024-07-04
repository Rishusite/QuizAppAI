import React, { useState } from 'react'
import axios from 'axios'
import {NavLink,useNavigate} from "react-router-dom";

const Loginform = () => {
  const dataObj={
    username:"",
    password:""
  };
  const [Data,setData]=useState(dataObj);
  const [loginStatus,setLoginStatus]=useState('');

  //getting data
  function getDetails(e){
    setData({...Data,[e.target.name]:e.target.value});
  }

  //sendinding and redirecting 
  const navi=useNavigate();
  let userid='';
  function redirect(){
    navi(`/userhandle/${userid}`);
  };
  function sendData(e){
    e.preventDefault();
    axios.post("http://localhost:8000",Data).then((response)=>{
      //console.log(response);
      if(response.data===false){
        //console.log('Invalid Username or Password');
        setLoginStatus('Invalid Username or Password');
      }
      else{
        //console.log('Found User');
        setLoginStatus('');
        userid=response.data[0].id;
        //console.log(userid);
        redirect();
      }
    }).catch((err)=>{
      console.log("Some Error",err);
    })
    setData(dataObj);
  }
  return (
    <div className='relative z-10 w-screen h-screen flex justify-center items-center'>
      <div>
        <form className='absolute right-[8vw] top-[18vh] bg-transparent rounded-xl px-[4vw] pt-[1vw] pb-[3vw] backdrop-blur-xl border border-white'>

          <div className='flex justify-center items-center'>
            <div className='pb-[2vw]'>
              <h1 className='text-[3vw] text-white'>Login</h1>
            </div>
          </div> 

          <div className='mb-[2vw] text-[2vw] text-white'> 
            <input className="placeholder:text-white bg-transparent outline-none border-2 px-[1vw] py-[0.5vw] rounded-t-full rounded-b-full
            " type='text'  placeholder='Username' name="username" value={Data.username} onChange={getDetails}/>
          </div>

          <div className='text-[2vw] text-white'>
            <input className="placeholder:text-white bg-transparent outline-none border-2 px-[1vw] py-[0.5vw] rounded-t-full rounded-b-full
            "  type='password' placeholder='Password' name="password" value={Data.password} onChange={getDetails}/>
          </div>

          <div className='flex justify-between mt-[1vw] text-white text-[1.2vw]'>
            <div>
              <input type="checkbox"/>
              <div className='inline-block'><p className='ml-[0.5vw]'>Remember me</p></div>
            </div>

            <div>
              <p className='cursor-pointer'><NavLink to={'/forgot'}>Forgot Password?</NavLink></p>
            </div>
          </div>

          <div>
            <button className='bg-white text-black mt-[2vw] w-full px-[2vw] py-[0.5vw] rounded-t-full rounded-b-full border-none text-[1.5vw] font-semibold' onClick={sendData}>Login</button>
          </div>
          
          <div className='text-[1.2vw] text-white mt-[1vw] ml-[1vw]'>
            <p className='inline-block pl-[3vw]'>Don't have an account? </p>
            <p className='inline-block font-bold cursor-pointer pl-[0.2vw]'><NavLink to={'/register'}>Register</NavLink></p>
          </div>

          <div className='text-[1.5vw] text-red-500  font-semibold mt-[1vw] ml-[10%] mb-[-1.5vw]'>
            {loginStatus}
          </div>
          
        </form>
      </div>
      
    </div>
  )
}

export default Loginform