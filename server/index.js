import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import mongoose from "mongoose";
import bodyParser from "body-parser";
import {question,correctAns,options,cleanup} from './modules/formatdata.js'
import { getDate } from "./modules/dates.js";
import pdf from "html-pdf";
import path from "path";
import pdfTemplate from "./modules/index.js";
dotenv.config();

const app=express();
const port=process.env.PORT || 8000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());


//////////////////////////////Database//////////////////////////////////////
const DB='mongodb+srv://rishabhusa018:Rishabh2304@cluster0.1dylj2f.mongodb.net/LoginData?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(DB).then(
  ()=>{
    console.log("DataBase Connected successfully");
  }
).catch((err)=>{
  console.log("Error Occured",err);
});

const registrations=new mongoose.Schema({
  id: String,
  name: String,
  userName: String,
  emailId: String,
  phoneNumber: Number,
  password: String,
  joinDate: String
});

const quizdb=new mongoose.Schema({
  date: String,
  tests:[{qsn: Number,question: String}]
});

const contact=new mongoose.Schema({
  name: String,
  query: String
});

const userStats=new mongoose.Schema({
  id: String,
  sub: String,
  marks:[]
});

const newUser=mongoose.model('registrations',registrations);
const support=mongoose.model('Support',contact);
////////////////////////////Data base end//////////////////////////




//////////////////////////AI code////////////////////////////////

// 1. Configuration
const api_key = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(api_key);
const generationConfig = { temperature: 0.9, topP: 1, topK: 1, maxOutputTokens: 10000 };

// 2. Initialise Model
const model = genAI.getGenerativeModel({ model: "gemini-pro", generationConfig });


// 3. Generate Content
//let arr=[];
let aires='';
app.get('/',(req,res)=>{
  return res.send("Hello From Server");
})


app.get('/generateqs/:prompt',async (req,res)=>{
    const sub=req.params.prompt;
    const prompt=`write a question on ${sub} with options and answer`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    console.log("Request Send Successfully....");
    try{
      cleanup(response.text());
      const obj={question: question,options: options,correctAns: correctAns};
      //arr.push(obj);
      aires=response.text();
      res.send(obj);
      //console.log("array",arr);
    }
    catch(err){
      console.log('Blast----!!!!!',err);
      aires='Sorry, AI was not able to generate this question. Please wait for about 10 secs';
      res.send('false');
    }
    
})

/////////////////////// AI End //////////////////////////////



//////////////////////Login check///////////////////////////
app.post('/',async(req,res)=>{
  const usern=req.body.username;
  const pass=req.body.password;
  const result=await newUser.find({userName:usern,password:pass});
  //cconsole.log("Post request",result);
  if(Object.keys(result).length===0){
    //console.log("not found");
    res.send('false');
  }
  else{
    //console.log(result._id);
    return res.send(result);
  }
})


//////////////////////////////Registrations//////////////////////////////////

let userquizstates=mongoose.model('userhandleStats',userStats);
app.post('/register',async(req,res)=>{
  const usern=req.body.username;
  const phone=req.body.phoneNumber;
  const email=req.body.emailId;
  const result=await newUser.find({userName:usern,phoneNumber:phone,emailId:email});
  const jdate=getDate();
  if(Object.keys(result).length===0){
    const uniqid=Math.floor(Math.random()*9897542251);
    const result2=await newUser.create({
      id:uniqid,
      name:req.body.name,
      userName:req.body.userName,
      emailId:req.body.emailId,
      phoneNumber:req.body.phoneNumber,
      password:req.body.password,
      joinDate: jdate
    });
    userquizstates=mongoose.model('userhandleStats',userStats);
    let result3;

    result3=await userquizstates.create({
      id:uniqid,
      sub:"current affairs",
      score:[]
    });

    result3=await userquizstates.create({
      id:uniqid,
      sub:"english",
      score:[]
    });

    result3=await userquizstates.create({
      id:uniqid,
      sub:"biology",
      score:[]
    });

    result3=await userquizstates.create({
      id:uniqid,
      sub:"physics",
      score:[]
    });

    result3=await userquizstates.create({
      id:uniqid,
      sub:"chemistry",
      score:[]
    });

    result3=await userquizstates.create({
      id:uniqid,
      sub:"geography",
      score:[]
    });

    result3=await userquizstates.create({
      id:uniqid,
      sub:"polity",
      score:[]
    });

    result3=await userquizstates.create({
      id:uniqid,
      sub:"history",
      score:[]
    });

    result3=await userquizstates.create({
      id:uniqid,
      sub:"computers",
      score:[]
    });

    console.log("Post request",result2);
    return res.send('true');
  }
  else{
    return res.end('false');
  }
})

//////////////////////////Forgot Password//////////////////////////
app.post('/forgot',async(req,res)=>{
  const usern=req.body.username;
  const phone=req.body.phonenumber;
  const pass=req.body.password;
  const result=await newUser.find({userName:usern,phoneNumber:phone});
  //cconsole.log("Post request",result);
  if(Object.keys(result).length===0){
    //console.log("not found");
    res.send('false');
  }
  else{
    //console.log(result._id);
    await newUser.updateOne({userName:usern,phoneNumber:phone},{$set:{password:pass}});
    console.log('Changed password!')
    return res.send('true');
  }
})


///////////////////////////User Handle/////////////////////////////
app.post('/userhandle',async(req,res)=>{
  const userid=req.body.id;
  const result=await newUser.find({id:userid});
  //cconsole.log("Post request",result);
  if(Object.keys(result).length===0){
    //console.log("not found");
    res.send('false');
  }
  else{
    //console.log(result._id);
    return res.send(result);
  }
})


/////////////////////////Quiz Save Data//////////////////////////////
let quizSavedata;
app.post('/quizdata1',async(req,res)=>{
  const userid=req.body.id;
  const subs=req.body.sub;
  const date=req.body.date;

  quizSavedata=mongoose.model(`${subs}${userid}`,quizdb);
  const result3=await quizSavedata.create({
    date: date,
    tests:[]
  });
  //console.log('result3',result3);
  return res.send(200);
})

app.post('/quizdata',async(req,res)=>{
  const userid=req.body.id;
  const subs=req.body.sub;
  const date=req.body.date;
  const ques=aires;
  const quesn=req.body.qsn;
  let result;

  //console.log(quizSavedata);

  result=await quizSavedata.updateOne({date: date},{$push:{"tests":{qsn: quesn,question: ques}}});

  //console.log('Completed DB task !',result);
  return res.send(200);
})

app.post('/sendStats',async(req,res)=>{
  const uid=req.body.id;//"4964560222";//
  const score=req.body.score;//5;//
  const sub=req.body.sub;//"english";//
  const result=await userquizstates.updateOne({id:uid,sub:sub},{$push:{"marks":{score}}});
  //console.log('Update Stats....',result);
  return res.send(200);
})


let totaltests=0;
app.get('/getStats/:id/:sub',async(req,res)=>{
  const id=req.params.id;
  const sub=req.params.sub;
  const result=await userquizstates.findOne({id:id,sub:sub});
  //console.log(result.marks);
  const arr=result.marks;
  let maxi=0;
  let sum=0;
  let avg=0;
  totaltests+=arr.length;
  if(arr.length!==0){
    for(let i=0;i<arr.length;i++){
      if(arr[i].score>maxi){
        maxi=arr[i].score;
      }
      sum+=arr[i].score;
    };
    avg=sum/arr.length;
    const obj={
      total: arr.length,
      avg: avg,
      max: maxi,
      totaltest: totaltests
    };
    return res.send(obj);
  }
  else{
    return res.send('false');
  }
  
  
  
}) 




////////////////////////downloads////////////////////////////////

app.get('/downloads/:id/:sub',async(req,res)=>{
  const uid=req.params.id;
  const sub=req.params.sub
  const downloads=mongoose.model(`${sub}${uid}`,quizdb);
  try{
    const result=await downloads.find();
    //console.log(result);
    return res.send(result);
  }
  catch(err){
    //console.log('download error.....',err);
    return res.send('false');
  }
  
  //return res.send(200);
})



///////////////////////////PDFs////////////////////////////////////

app.post('/create-pdf', (req, res) => {
  pdf.create(pdfTemplate(req.body.data.date,req.body.data.tests,req.body.sub), {}).toFile('result.pdf', (err) => {
      if(err) {
          res.send(Promise.reject());
      }

      res.send(Promise.resolve());
  });
})

app.get('/fetch-pdf', (req, res) => {
  const abspath=path.resolve();
  res.sendFile(`${abspath}/result.pdf`)
})


//////////////////////////Contact Us page//////////////////////////////////

app.post('/contactus',async(req,res)=>{
  const query=req.body.query;
  const name=req.body.name;
  const result=await support.create({
    name: name,
    query: query
  });
  return res.send('true');
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
});
