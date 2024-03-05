import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import './App.css'
import Register from './pages/register/register';
import SignIn from './pages/signin/signIn';
import NavBar from './components/navbar/navbar';
import Post from './pages/dashboard/post/post';

import PostDetailsCard from './pages/dashboard/post/ProstDetailsCard';
import Footer from './components/footer/footer';

function App() {


  return (
    <>
  <NavBar/>
     <Routes>
               <Route path="/" element={<SignIn/>}/> 

              <Route path="/register" element={<Register/>}/> 
              <Route path='posts/:id' element={<PostDetailsCard/>}/>  
              <Route path="/dashboard" element={<Post/>}/> 
              
       </Routes>
  <Footer/>
    </>
  )
}

export default App
