import React from 'react'
import axios from 'axios'
import { useState,useEffect,useRef } from 'react'
import {NavLink,useNavigate} from "react-router-dom";
import bgmVideo from './Intro assests/bgvideo.mov';




const Battle = ({isover,setisover,uid,score,setScore,prompt,name}) => {
  const videoEl = useRef(null);
  const [over,setOver]=useState(-1);
  const [qcss,setqcss]=useState('relative -z-10 w-screen h-screen flex justify-center items-center');

  const [bcss,setbcss]=useState('fixed bottom-0 w-screen mb-[2vw] flex justify-center items-center z-20');

  const [instcss,setinstcss]=useState('fixed top-0  z-10 w-screen h-screen flex justify-center items-center');
  axios.defaults.withCredentials = true;

  const qn=useRef(0);
  useEffect(() => {
    videoEl.current.play().catch(error => {
      console.error("Error attempting to play", error);
    });
  }, []);

  const dataserver=useRef({question: "",options: {a: "",b:"",c:"",d:""},correctAns: {x:"",y:""}});

  const [data,setData]=useState({question: "AI is generating the questions please wait for some secs.....",options: {a: "N/A",b:"N/A",c:"N/A",d:"N/A"},correctAns: {x:"",y:""}});
  
  //const [quizdata,setquizdata]=useState({});
  async function getting(){
    if(qn.current<5){
      await axios.get(`https://quizapp-server-one.vercel.app/generateqs/${prompt}`).then((response)=>{
        if(response.data===false){
          console.log('Blasted by AI')
          let obj={question: "Sorry, AI was not able to generate this question. Please wait for about 10 secs",options: {a: "N/A",b:"N/A",c:"N/A",d:"N/A"},correctAns: {x:"",y:""}};
          setData(obj);
        }
        else{
          let obj={question: response.data.question,options: response.data.options,correctAns: response.data.correctAns};
          setData(obj);
          dataserver.current=obj;
          setOver(1);
          qn.current=qn.current+1;
        }
      }).catch((err)=>console.log('Some Error',err));
    }
    
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
      setTimeout(async()=>{
        await getting();
        resolve(200);
      },10000);
    }) 
  };

  function getDate() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    const time=today.getHours() 
    + ':' + today.getMinutes() 
    + ":" + today.getSeconds();
    //${month}/${date}/${year}:
    return `${month}/${date}/${year} ${time}`;
  };

  async function play(){
      const date=getDate();
      let quizobj1={id:uid,sub:prompt,date:date};
      await axios.post('https://quizapp-server-one.vercel.app/quizdata1',quizobj1).then((res)=>{
        console.log('Success11111...!!!!');
      }).catch((err)=>{
        console.log('QuizData11111 Blast......!',err);
      });
      //await getting();
      setinstcss('fixed -z-10 w-screen h-screen flex justify-center items-center');

      setqcss('relative z-10 w-screen h-screen flex justify-center items-center');

      setbcss('fixed bottom-0 w-screen mb-[2vw] flex justify-center items-center -z-20');
      while(qn.current<5){
        //console.log(qn.current);
        await waiting();
        //console.log(dataserver.current);
        let quizobj={id:uid,sub:prompt,date:date,qsn:qn.current};
        //console.log(quizobj);
        await axios.post('https://quizapp-server-one.vercel.app/quizdata',quizobj).then((res)=>{
          console.log('Success...!!!!');
        }).catch((err)=>{
          console.log('QuizData Blast......!',err);
        });
      };
      
       

    };

  

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
  if(qn.current===5){
    setTimeout(() => {
      setisover(1);
    }, 10000); 
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
        <div className='bg-transparent rounded-xl backdrop-blur-3xl border border-white max-w-[75%] px-[1vw] py-[1vw] '>
        <div className="flex justify-center items-center ">
            <div className="text-black px-[1vw] text-[2vw] font-semibold">
              Test Instructions
            </div>
          </div>
          <div className='text-[1.5vw] text-yellow-100'>
            <div>
              1. You will be given 5 mcq questions made by AI and you have to answer it in the time limit of 60secs each.
            </div>
            
            <div>
              2. Click the start button to commence the quiz.
            </div>

            <div>
              3. Just after clicking the start button you will be shown a blank template of mcq which will be filled by AI after generating the question.So please wait for some time.
            </div>

            <div>
              4. At top right corner your updated score will be shown.
            </div>

            <div>
              5. There is NO NEGATIVE MARKING.
            </div>

            <div>
              6. After clicking to any option you will be able to se the correct answer as well.
            </div>

            <div>
              7. If you want to go back to home page you can click to back button now only.
            </div>

            <div>
              8. Sometimes AI is not able to generate the question, So just be calm it will soon generatethe correct mcq for you and that mcq will be dropped.
            </div>

            <div>
              9. If you find any difficulty you can contact us freely any time.
            </div>

            <div>
              10. Now just gear up and get ready. ALL THE BEST!
            </div>

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
