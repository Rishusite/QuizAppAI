import React, { useEffect, useRef, useState} from "react";
import bgmVideo from './components/Intro assests/bgvideo.mov';
import Loginform from "./components/Loginform";
//import sound from "./Intro assests/mainMusic.mp3"

export default function App() {
  const videoEl = useRef(null);

  useEffect(() => {
    videoEl.current.play().catch(error => {
      console.error("Error attempting to play", error);
    });
  }, []);
  /*
  function playMusic(){
    new Audio(sound).play();
  };
  <button className="fixed bottom-[1vw] left-[2vw] text-[2vw] text-white z-20" onClick={playMusic}>Music</button>
  */
  
  return (
    <div className="App">
      <video
        loop
        muted
        alt="All the devices"
        src={bgmVideo}
        ref={videoEl}
        className="fixed z-0 w-full h-full object-cover"
      />
      <Loginform/>
    </div>
  );
}
