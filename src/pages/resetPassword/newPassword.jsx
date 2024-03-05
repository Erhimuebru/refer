import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
;
import Swal from 'sweetalert2';
import { CircleLoader } from 'react-spinners';
import {   apiPost  } from "../../utils/api";
import {ArrowLeftIcon,} from '@heroicons/react/24/solid';
const NewPassword = () => {
    const { token } = useParams();
    console.log('Reset Token:', token);
    
    

  const Navigate = useNavigate();
  const [password, setPassword] = useState(''); 
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    setLoading(true);
    try {
      // Make a POST request to your backend to reset the password
      await apiPost(`/users/reset-password/${token}`, { password });
   
     
      // Show SweetAlert on success
      Swal.fire({
        title: 'Password Reset Successfully!',
        icon: 'success',
        showConfirmButton: false,
      })
          // Close SweetAlert after 2 seconds
          setTimeout(() => {
            Swal.close();
            // Navigate to the desired page
            Navigate('/');
          }, 3000);
    } catch (error) {
        setLoading(false);
      console.error('Password reset failed:', error.message);
      console.log(error)
      // Handle error and display to the user
      Swal.fire({
        title: 'Error',
        text: 'There was an error resetting password.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/');
  }
  return (
    // <div>
    //   <h2>Password Reset</h2>
    //   <label htmlFor="password">password:</label>
    //   <input
    //     name="password"
    //     type="password"
    //     id="password"
    //     value={password}
    //     onChange={(e) => setpassword(e.target.value)}
    //   />
    //   <button onClick={handleResetPassword}>Reset Password</button>
    // </div>
    <>
 
          <div className="flex mt-20 mb-52 items-center justify-center">
        <div className="bg-gray-100 p-8 rounded-xl shadow-md w-80">
        <div className="max-w-md mx-auto my-8">
            <h2 className="text-2xl font-bold mb-4 text-center">Enter A New Password</h2>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-2">
               New Password:
            </label>
            <input
                name="password"
                placeholder='Enter a new password'
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300" />
            <button
                onClick={handleResetPassword}
                type="submit"
                className={`bg-[#00ccbb] text-white py-2 px-4 mt-3 w-64 rounded relative ${!password && 'opacity-50 cursor-not-allowed'}`}
                disabled={loading || !password}
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

export default NewPassword;