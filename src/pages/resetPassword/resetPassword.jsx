import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { CircleLoader } from 'react-spinners';

import {ArrowLeftIcon,} from '@heroicons/react/24/solid';
const ResetPassword = () => {
  const { resetToken } = useParams();
  const Navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    setLoading(true);
    try {
      // Make a POST request to your backend to reset the password
      // await axios.post(`http://localhost:7000/users/forgot-password`, {
        await axios.post(`https://foodpadi-backend.onrender.com/users/forgot-password`, {
      
        resetToken,
        email,
      });

      // Show SweetAlert on success
      Swal.fire({
        title: 'Password Reset Email Sent!',
        text: 'Please check your email for instructions on resetting your password.',
        icon: 'success',
        confirmButtonText: 'OK',
      }).then((result) => {
        if (result.isConfirmed || result.isDismissed) {
          // Redirect to the login page or any other desired page
          Navigate('/');
        }
      });
    } catch (error) {
      console.error('Password reset failed:', error.message);
      console.log(error)
      // Handle error and display to the user
      Swal.fire({
        title: 'Error',
        text: error.response.data.message || 'Please check your internet connection and try again.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    } finally {
      setLoading(false);
    }
  };

  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/');
  }
  return (
    <>
     <div 
              onClick={handleClick}
         
            className="absolute top-20 left-5 p-2 mb bg-gray-100 rounded-full"
          >
            <ArrowLeftIcon className="h-6 w-6 text-red-900" />
          </div>
    <div className="flex mt-40 items-center justify-center">
          <div className="bg-white p-8 rounded-xl shadow-md w-80">
              <div className="max-w-md mx-auto my-8">
                  <h2 className="text-2xl font-bold mb-4 text-center">Password Reset</h2>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-2">
                      Email:
                  </label>
                  <input
                      name="email"
                      type="email"
                      id="email"
                      placeholder='Enter your email address'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300" />
                  <button
                    className={`bg-[#00ccbb] text-white py-2 px-4 mt-3 w-64 rounded relative ${!email && 'opacity-50 cursor-not-allowed'}`}
                      onClick={handleResetPassword}
                      type="submit"
                    
                      disabled={loading || !email}
                  >
                      {loading ? (
                          <p className="gap-2 ml-10 flex items-center">
                              <CircleLoader color="#fff" size={20} />
                              <span className="">Submitting...</span>
                          </p>
                      ) : (
                          'Reset Password'
                      )}
                  </button>
              </div>
          </div>

      </div>
      
   
        </>
  );
};

export default ResetPassword;
