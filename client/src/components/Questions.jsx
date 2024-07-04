import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import bgmVideo from 'F:/Quiz App/client/src/Intro assests/bgvideo.mov';
import Battle from "./Battle";
import { useParams} from "react-router-dom";
import Goback from "./Goback";
const Questions = () => {
  const params=useParams();
  const [isover,setisover]=useState(0);
  const [score,setScore]=useState(0);
  console.log(params);
  return (
    <>
      {isover===0?<Battle isover={isover} setisover={setisover} uid={params.id} score={score} setScore={setScore} prompt={params.prompt} name={params.name}/>:<Goback uid={params.id} score={score}/>}
    </>
  )
}

export default Questions