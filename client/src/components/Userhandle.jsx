import React, { useEffect, useRef ,useState} from "react";
import bgmVideo from './Intro assests/bgvideo.mov';
import Navbar from "./Navbar";
import Stats from "./Stats";
import Playchoice from "./Playchoice";
import { useParams,useNavigate} from "react-router-dom";
import axios from "axios";
const Userhandle = () => {
  const params=useParams();
  const navigate=useNavigate();
  const userid=params.id;
  const data={id: userid};
  const [userData,setUserdata]=useState({});
  axios.post("https://quizappv2-one.vercel.app/userhandle",data).then((res)=>{
    if(res.data===false){
      navigate('/');
    }
    else{
      setUserdata(res.data[0]);
      //console.log(userData);
    }
  }).catch((err)=>console.log(err));
  const videoEl = useRef(null);
  useEffect(() => {
    videoEl.current.play().catch(error => {
      console.error("Error attempting to play", error);
    });
  }, []);
  return (
    <div >
      <video
        loop
        muted
        alt="All the devices"
        src={bgmVideo}
        ref={videoEl}
        className="fixed z-0 w-full h-full object-cover"
      />
      <div className="absolute z-10 w-full h-full backdrop-blur-lg">
        <Navbar dataobj={userData} />
        <Playchoice uid={params.id} name={userData.name}/>
      </div>
    </div>
  )
}

export default Userhandle
