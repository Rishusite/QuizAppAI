import axios from 'axios';
import React, { useState,useEffect } from 'react'

const Stats = ({id,sub,total,settotaltest}) => {
  const [tt,settt]=useState(0);
  const [avg,setavg]=useState(0);
  const [maxi,setmaxi]=useState(0);
  
  useEffect(() => {
    getStats();
  }, []);
  async function getStats(){
    await axios.get(`http://localhost:8000/getStats/${id}/${sub}`).then((res)=>{
      if(res.data===false){
        settt(0);
        setavg(0);
        setmaxi(0);
      }
      else{
        settt(res.data.total);
        setavg(res.data.avg);
        setmaxi(res.data.max);
      }
      
      //console.log('Working........',res);
    }).catch((err)=>console.log(err));
  };
  return (
    <div className='flex flex-row space-x-[0.9vw] justify-between items-center text-[1.5vw] mx-[0.5vw] font-thin text-amber-950'>
            <div>Total Tests: {tt}</div>
            <div>Avg Score: {avg}</div>
            <div>Max Score: {maxi}</div>
    </div>
  )
}

export default Stats