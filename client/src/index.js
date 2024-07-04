import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route,Routes} from "react-router-dom";
import Registerform from "./components/Registerform";
import Questions from './components/Questions';
import Userhandle from './components/Userhandle';
import Forgot from './components/Forgot';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App/>}/>
        <Route path='/forgot' element={<Forgot/>}/>
        <Route path='/register' element={<Registerform/>}/>
        <Route path='/userhandle/:id' element={<Userhandle/>}/>
        <Route path='/userhandle/play/:id/:prompt/:name' element={<Questions/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
