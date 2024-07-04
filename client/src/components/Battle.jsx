import React from 'react'
import axios from 'axios'
import { useState,useEffect,useRef } from 'react'
import {NavLink,useNavigate} from "react-router-dom";
import bgmVideo from 'F:/Quiz App/client/src/Intro assests/bgvideo.mov';



const Battle = ({isover,setisover,uid,score,setScore,prompt,name}) => {
  const videoEl = useRef(null);

  const [qcss,setqcss]=useState('relative -z-10 w-screen h-screen flex justify-center items-center');

  const [bcss,setbcss]=useState('fixed bottom-0 w-screen mb-[2vw] flex justify-center items-center z-20');

  const [instcss,setinstcss]=useState('fixed top-0  z-10 w-screen h-screen flex justify-center items-center');


  const qn=useRef(0);
  useEffect(() => {
    videoEl.current.play().catch(error => {
      console.error("Error attempting to play", error);
    });
  }, []);

  const [data,setData]=useState({question: "",options: {a: "",b:"",c:"",d:""},correctAns: {x:"",y:""}});
  
  function getting(){
    axios.get(`http://localhost:8000/generateqs/${prompt}`).then((response)=>{
      if(response.data==='false'){
        console.log('Blasted by AI')
      }
      else{
        let obj={question: response.data.question,options: response.data.options,correctAns: response.data.correctAns};
        setData(obj);
        setOver(1);
        qn.current=qn.current+1;
      }
    }).catch((err)=>console.log('Some Error',err));
  };
  const [corr,setCorr]=useState(0);

  function checkans(opt){
    //console.log(data.correctAns.option);
    if(opt===data.correctAns.option){
      let z=score;
      z++;
      setScore(z);
      setCorr(0);
    }
    else{
      setCorr(-1);
      if(opt==='a'){
        button1.current.style.backgroundColor="red";
      }
      else if(opt==='b'){
        button2.current.style.backgroundColor="red";
      }
      else if(opt==='c'){
        button3.current.style.backgroundColor="red";
      }
      else if(opt==='d'){
        button4.current.style.backgroundColor="red";
      }
    }
    setOver(0);
  };

  function waiting(){
    return new Promise((resolve,reject)=>{
      setTimeout(()=>{
        getting();
        resolve(200);
      },10000);
    }) 
  };


  async function play(){
      getting();

      setinstcss('fixed -z-10 w-screen h-screen flex justify-center items-center');

      setqcss('relative z-10 w-screen h-screen flex justify-center items-center');

      setbcss('fixed bottom-0 w-screen mb-[2vw] flex justify-center items-center -z-20');

      while(qn.current<3){
        console.log(qn.current);
        await waiting();
      }
      /*
      await waiting(); //5
      await waiting(); //6
      await waiting(); //7
      await waiting(); //8
      await waiting(); //9
      await waiting(); //10
      await waiting(); //11
      await waiting(); //12
      await waiting(); //13
      await waiting(); //14
      await waiting(); //15
      await waiting(); //16
      await waiting(); //17
      await waiting(); //18
      await waiting(); //19
      */
  }

  const [over,setOver]=useState(-1);

  const button1=useRef(null);
  const button2=useRef(null);
  const button3=useRef(null);
  const button4=useRef(null);

  let overcss='';
  if(over===0){
    overcss='absolute z-20 w-screen h-screen bg-transparent';
  }
  else{
    overcss='absolute z-0 w-screen h-screen bg-transparent';
  }
  
  if(over===0){
    let opt=data.correctAns.option;
    if(opt==='a'){
      button1.current.style.backgroundColor="green";
    }
    else if(opt==='b'){
      button2.current.style.backgroundColor="green";
    }
    else if(opt==='c'){
      button3.current.style.backgroundColor="green";
    }
    else if(opt==='d'){
      button4.current.style.backgroundColor="green";
    }
  }
  else if(over===1){
    button1.current.style.backgroundColor="";
    button2.current.style.backgroundColor="";
    button3.current.style.backgroundColor="";
    button4.current.style.backgroundColor="";
  }
  if(qn.current===4){
    setisover(1);
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
      <div className={overcss}></div>

      <div className='fixed right-[2vw] top-[1vw] z-20 text-white text-[2vw]'>Welcome, {name} || Your Score: {score} </div>


      <div className={qcss}>


        <div className='bg-transparent rounded-xl backdrop-blur-3xl border border-white max-w-[85%] px-[1vw] py-[1vw] '>

          <div className="flex justify-center items-center ">
            <div className="text-white px-[1vw] text-[1.5vw] font-semibold">Question Number: {qn.current}</div>
            <div className="text-white text-[2vw]">{data.question}</div>
          </div>

          <div className="text-white text-[1vw] mt-[2vw] max-w-[60%] ">
            
            <button className="block border border-white px-[1vw] py-[1vw] rounded-xl mb-[1vw] cursor-pointer hover:bg-red-400 duration-300 active:bg-blue-700 " onClick={()=>checkans('a')} ref={button1}>Option A : {data.options.a}</button>

            <button className="block border border-white px-[1vw] py-[1vw] rounded-xl mb-[1vw] cursor-pointer hover:bg-red-400 duration-300 active:bg-blue-700 " onClick={()=>checkans('b')} ref={button2}>Option B : {data.options.b}</button>

            <button className="block border border-white px-[1vw] py-[1vw] rounded-xl mb-[1vw] cursor-pointer hover:bg-red-400 duration-300 active:bg-blue-700 " onClick={()=>checkans('c')} ref={button3}>Option C : {data.options.c}</button>

            <button className="block border border-white px-[1vw] py-[1vw] rounded-xl cursor-pointer hover:bg-red-400 duration-300 active:bg-blue-700 " onClick={()=>checkans('d')} ref={button4}>Option D : {data.options.d}</button>

          </div>
        </div>
      </div>


      <div className={instcss}>
        <div className='bg-transparent rounded-xl backdrop-blur-3xl border border-white max-w-[70%] px-[1vw] py-[1vw] '>
        <div className="flex justify-center items-center ">
            <div className="text-black px-[1vw] text-[2vw] font-semibold">
              Test Instructions
            </div>
          </div>
          <div className='text-[1.5vw] text-yellow-100'>
            You will be given 10 mcq questions made by ai in time limit of 60secs
          </div>
        </div>
      </div>



      <div className={bcss}>

        <div>
          <button className='text-4xl text-white z-10  mr-[5vw] bg-green-500 px-[1vw] py-[0.5vw] rounded-lg hover:bg-green-600 hover:scale-110 hover: duration-300' onClick={play}>Start </button>
        </div>
        
        <div >
          <NavLink to={`/userhandle/${uid}`}>
            <button className='text-4xl text-white z-10 bg-blue-400 px-[1vw] py-[0.5vw] rounded-lg hover:bg-blue-500 hover:scale-110 hover: duration-300'>Back</button>
          </NavLink>
        </div>

      </div>
      
      
    </div>
  )
}

export default Battle