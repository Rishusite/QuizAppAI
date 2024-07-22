import React, { useEffect, useState, useRef } from 'react'
import bgmVideo from './Intro assests/bgvideo.mov';
import { useParams} from "react-router-dom";
import {saveAs} from "file-saver";
import axios from 'axios';
const Downloads = () => {
  const params=useParams();
  const uid=params.id;
  const [show,setshow]=useState(0);
  const [elem,setelem]=useState(<></>);
  const [arr,setarr]=useState([]);
  const [list,setlist]=useState([]);
  const videoEl = useRef(null);
  useEffect(() => {
    videoEl.current.play().catch(error => {
      console.error("Error attempting to play", error);
    });
  }, []);
  async function getAll(sub){
    axios.defaults.withCredentials = true;
    await axios.get(`https://quizapp-server-one.vercel.app/downloads/${uid}/${sub}`).then((res)=>{
      if(res.data==='false'){
        setshow(0);
      }
      else{
        setarr([]);
        //setdata(JSON.stringify(res.data));
        let x=res.data.length;
        console.log(x);
        if(x===0){
          setshow(0);
        }
        else{
          setshow(1);
        }
        for(let i=0;i<x;i++){
          let date=res.data[i].date;
          arr.push(date);
        }
        let list1=arr.map((x,ind)=>
          <div className='flex flex-row justify-center items-center border border-yellow-400 px-[1vw] py-[0.5vw] gap-[50%] mt-[1vw]'>
            <div>Test Given Date: {x}</div>
            <div><button onClick={()=>{
              createAndDownloadPdf(res.data[ind],sub);
            }}>Download</button></div>
          </div>
        )
        setlist(list1);
        console.log(list1);
      }
        
    }).catch((err)=>console.log(err));
  };


async function gettingpdf(){
  axios.defaults.withCredentials = true;
  await axios.get('https://quizapp-server-one.vercel.app/fetch-pdf')
    .then((res) => {
      const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
        saveAs(pdfBlob, 'smartquizai.pdf');
      });
};
async function createAndDownloadPdf(data,sub){
  axios.defaults.withCredentials = true;
  await axios.post('https://quizapp-server-one.vercel.app/create-pdf', {data: data, sub: sub});
  console.log("Pdf Created......");
  await gettingpdf();
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
        <div className=' text-white text-[1.5vw] border border-white rounded-lg px-[1.5vw] py-[1vw] font-semibold max-w-[80%] mt-[3vw] mb-[3vw]'>
          <div className='text-center text-[2vw] mb-[1vw]'>Select Subject</div>
          <div className='flex flex-row justify-between items-center gap-[2vw]'>
            <div className='cursor-pointer bg-amber-400 px-[0.5vw] text-black rounded-lg' onClick={()=>{
              getAll('current affairs');
            }}>CA</div>
            <div className='cursor-pointer bg-amber-400 px-[0.5vw] text-black rounded-lg' onClick={()=>{
              getAll('english');
            }}>English</div>
            <div className='cursor-pointer bg-amber-400 px-[0.5vw] text-black rounded-lg' onClick={()=>{
              getAll('biology');
            }}>Biology</div>
            <div className='cursor-pointer bg-amber-400 px-[0.5vw] text-black rounded-lg' onClick={()=>{
              getAll('physics');
            }}>Physics</div>
            <div className='cursor-pointer bg-amber-400 px-[0.5vw] text-black rounded-lg' onClick={()=>{
              getAll('chemistry');
            }}>Chemistry</div>
            <div className='cursor-pointer bg-amber-400 px-[0.5vw] text-black rounded-lg' onClick={()=>{
              getAll('geography');
            }}>Geography</div>
            <div className='cursor-pointer bg-amber-400 px-[0.5vw] text-black rounded-lg' onClick={()=>{
              getAll('polity');
            }}>Polity</div>
            <div className='cursor-pointer bg-amber-400 px-[0.5vw] text-black rounded-lg' onClick={()=>{
              getAll('history');
            }}>History</div>
            <div className='cursor-pointer bg-amber-400 px-[0.5vw] text-black rounded-lg' onClick={()=>{
              getAll('computers');
            }}>Computers</div>
          </div>
          {show===0?<div className='text-center mt-[2vw]'>Nothing to show!! Take a test first....</div>:<></>}
          <div>
            {list}
          </div>
          
        </div>
        
      </div>
      
    </div>
  )
};

export default Downloads
