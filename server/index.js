import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import mongoose from "mongoose";
import bodyParser from "body-parser";
import {question,correctAns,options,cleanup} from './modules/formatdata.js'
dotenv.config();

const app=express();
const port=process.env.PORT || 8000;


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
  id:{
    type: String,
  },
  name:{
    type: String,
  },
  userName:{
    type: String,
  },
  emailId:{
    type: String,
  },
  phoneNumber:{
    type:  String,
  },
  password: {
    type: String,
  }
});

const gamedata=new mongoose.Schema({
  id:{
    type: String,
  },
  name: {
    type: String,
  },
  join: {
    type: String,
  },
  wins: {
    type: String,
  }
});

const newUser=mongoose.model('registrations',registrations);
////////////////////////////Data base end//////////////////////////




//////////////////////////AI code////////////////////////////////

// 1. Configuration
const api_key = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(api_key);
const generationConfig = { temperature: 0.9, topP: 1, topK: 1, maxOutputTokens: 10000 };

// 2. Initialise Model
const model = genAI.getGenerativeModel({ model: "gemini-pro", generationConfig });

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
// 3. Generate Content
//let arr=[];
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
      res.send(obj);
      //console.log("array",arr);
    }
    catch(err){
      console.log('Blast----!!!!!',err);
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
app.post('/register',async(req,res)=>{
  const usern=req.body.username;
  const phone=req.body.phoneNumber;
  const email=req.body.emailId;
  const result=await newUser.find({userName:usern,phoneNumber:phone,emailId:email});
  if(Object.keys(result).length===0){
    const uniqid=Math.floor(Math.random()*98975422511);
    const result2=await newUser.create({
      id:uniqid,
      name:req.body.name,
      userName:req.body.userName,
      emailId:req.body.emailId,
      phoneNumber:req.body.phoneNumber,
      password:req.body.password,
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


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
});
