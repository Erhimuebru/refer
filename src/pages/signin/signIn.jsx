import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FaGoogle } from "react-icons/fa";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useUser } from '../../utils/useContext'
import Swal from 'sweetalert2';
import { CircleLoader } from 'react-spinners';
import axios from 'axios';
const SignIn = () =>
{
  const { handleLogin } = useUser();
    const Navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);


    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    
      setErrorMessage('');
    };
    
    const handlePasswordChange = (e) => {
      setFormData({ ...formData, password: e.target.value });
      setErrorMessage('');
    };
    
    
    const handleSubmit = async (e) => {
      e.preventDefault();
    
      try {
        setLoading(true);
    
        const response = await fetch('http://localhost:3002/users/login', {
          // const response = await fetch('https://foodpadi-backend.onrender.com/users/login', {
         
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
    
        const responseData = await response.json();

        if (response.ok) {
          const id = responseData.user.id;
          localStorage.setItem('id', id);
          const token = responseData.user.token
          localStorage.setItem('token',token)
          handleLogin(responseData.user);
          console.log(responseData.user)
    
         
          Swal.fire({
            icon: 'success',
            title: 'Login Successful!',
            text: 'You have successfully logged in.',
            showConfirmButton: false,
        
          });
    
          // Navigate to the desired page after 2 seconds
          setTimeout(() => {
            Swal.close();
            Navigate('/dashboard');
          }, 2000);
        } else {
          const errorData = responseData;
          setErrorMessage(errorData.message);
    
          // Show SweetAlert error message
          Swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: errorData.message || 'Please check your internet connection and try again.',
          });
        }
      } catch (error) {
        console.error('Error during login:', error);
    
        // Show SweetAlert error message for unexpected errors
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: 'Please check your internet connection and try again.',
        });
      } finally {
        // Ensure that setLoading(false) is called even in case of errors
        setLoading(false);
      }
    };
    

    const navigate = useNavigate();
 

    return (
        <>
        
        <div className="flex mt-16 mb-44 items-center justify-center">
        <div className="bg-gray-100 p-8 rounded-xl shadow-md w-80">
          <h1 className="font-light whitespace-nowrap  text-center mb-12 italic">Login To Naija-Update</h1>
          <form onSubmit={handleSubmit} className="login-form">
            {errorMessage && (
              <p className="text-red-500 text-center text-sm mb-4">{errorMessage}</p>
            )}
            <label className="block mb-4 text-gray-800">
              Email Address:
              <input
                type="email"
                placeholder="Enter your Email Address"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="border rounded w-full py-2 px-3 mt-1 focus:outline-none focus:border-blue-500" />
            </label>

            <label htmlFor="password" className="block text-gray-800">Password</label>

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                className="border rounded w-full py-2 px-3 mt-1 focus:outline-none focus:border-blue-500"
                value={formData.password}
                onChange={handlePasswordChange}
                required />

              <button
                type="button"
                className="absolute right-2 top-4 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
            <button
              type="submit"
              className="bg-[#00ccbb] text-white py-2 px-4 hover:cursor-pointer mt-3 w-64 rounded  relative"
              disabled={loading}
            >
              {loading ? (
                <>
                  <p className='gap-2 ml-10 flex items-center'>
                    <CircleLoader color="#fff" size={20} />
                    <span className="">Submitting...</span>
                  </p>
                </>
              ) : (
                'Sign In'
              )}
            </button>

          </form>
          <Link to="/reset-password"> <p className='mt-4 mb-4 text-sm text-center text-blue-500 underline cursor-pointer'>
            Forgotten Password?
          </p>   </Link>

          <Link to="/register">
            <button
              type="submit"
              className='bg-green-400 text-white font-semibold py-2 px-4 w-64 rounded hover:cursor-pointer hover:bg-blue-600'
            >
              Create new account
            </button>
          </Link>
        </div>
      </div>
    
      </>

    );
};

export default SignIn;