import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import './App.css'
import Register from './pages/register/register';
import SignIn from './pages/signin/signIn';
import NavBar from './components/navbar/navbar';
import Post from './pages/dashboard/post/post';

import PostDetailsCard from './pages/dashboard/post/ProstDetailsCard';
import Footer from './components/footer/footer';
import UserConfirmation from './pages/verifyEmail/verifyEmail';
import ResetPassword from './pages/resetPassword/resetPassword';
import NewPassword from './pages/resetPassword/newPassword';
import Profile from './pages/profile/profile';
import WithdrawFund from './pages/withdraw/withdraw';

function App() {


  return (
    <>
  <NavBar/>
     <Routes>
               <Route path="/" element={<SignIn/>}/> 

              <Route path="/register" element={<Register/>}/> 
              <Route path='posts/:id' element={<PostDetailsCard/>}/>  
              <Route path="/dashboard" element={<Post/>}/> 
              <Route path="/account" element={<Profile/>}/> 
              <Route path="/withdraw-funds" element={<WithdrawFund/>}/> 
              <Route path="/users/confirm/:userId/:token" element={<UserConfirmation />} /> 
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/input-new-password/:token" element={<NewPassword/>} />
       </Routes>
  <Footer/>
    </>
  )
}

export default App
