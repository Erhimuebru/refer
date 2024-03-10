import React, { useEffect, useState } from 'react';
import { ChartBarIcon, WifiIcon, TvIcon, BoltIcon, WalletIcon, ArrowRightIcon, AcademicCapIcon, } from '@heroicons/react/24/solid';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useUser } from '../../utils/useContext';
import { apiGet, apiPost } from "../../utils/api";
import { Link, useNavigate } from 'react-router-dom';
import { CircleLoader } from 'react-spinners';

const Wallet = () => {
  const Navigate = useNavigate();
  const { user, handleLogout } = useUser();
  const userId = user ? user.id : localStorage.getItem('id');
  const [walletBalance, setWalletBalance] = useState(null);
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);
  const [paymentReference, setPaymentReference] = useState(null);

  useEffect(() => {
    // Only run once when the component mounts
    const urlSearchParams = new URLSearchParams(window.location.search);
    const refFromUrl = urlSearchParams.get('reference');
  
    if (refFromUrl) {
      setPaymentReference(refFromUrl);
      confirmDeposit(userId, refFromUrl);
    }
  }, []); 
  

  // useEffect(() => {
    const fetchWalletBalance = async () => {
      try {
        const response = await apiGet(`/wallet/${userId}/balance`);
        const balance = response.data && response.data.balance;

        setWalletBalance(balance);
      } catch (error) {
        console.error('Error fetching wallet balance:', error);
      }
    };

    fetchWalletBalance();
  // }, [userId]);

  const toggleBalanceVisibility = () => {
    setIsBalanceVisible(!isBalanceVisible);
  };


  const handleFundWalletClick = () => {
    try {
      if (user) {
        const { firstname, surname, email } = user;

        // Redirect to Paystack payment page with user information
        window.location.href = `https://paystack.com/pay/o5be1mgez-?first_name=${firstname}&last_name=${surname}&email=${email}`;
      }
    } catch (error) {
      console.error('Error handling Paystack payment:', error);
    }
  };
  const handleLogoutClick = () => {
    handleLogout();
    localStorage.removeItem('token');
    localStorage.removeItem('id');

    Navigate('/');
  };

  const confirmDeposit = async (userId, reference) => {
    try {

        const response = await apiPost(`/wallet/${userId}/deposit`,{
     
     
        reference,
      });

      // Handle the response from your backend, e.g., update the UI or show a success message
      console.log('Deposit confirmed successfully:', response.data);
    } catch (error) {
      console.error('Failed to confirm deposit:', error);
      // Handle the error, e.g., display an error message to the user
    }
  };
  const [isRotated, setIsRotated] = useState(false);

  const handleIconClick = () => {
    setIsRotated(!isRotated);
    console.log('isRotated:', isRotated);
    console.log('Calling fetchWalletBalance...');
    fetchWalletBalance();
  };
 

  return (
    <>
       <div className="flex items-center justify-between mt-6">
          {/* <p className="font-extrabold text-md text-gray-500 capitalize p-2 bg-white rounded-lg whitespace-nowrap">
            Hi, {user.fullName}
          </p> */}
        
        </div>
    
      <div className="overflow-hidden">
     
        <div className="flex flex-row justify-between gap-10 bg-gray-100 h-28 mb-4 mt-4 rounded-lg w-80 ml-6">
          <div className='ml-2 mt-4'>
            <p className="text-gray-300 gap-2 whitespace-nowrap mb-8 text-sm flex">
              Available Balance{" "}
              {isBalanceVisible ? (
                <FaEye className="mt-1" onClick={toggleBalanceVisibility} />
              ) : (
                <FaEyeSlash
                  className="mt-1"
                  onClick={toggleBalanceVisibility}
                />
              )}
            </p>
            <p className="font-bold text-gray-500">
  {isBalanceVisible ? (
    walletBalance !== null ? (
      `₦${walletBalance}`
    ) : (
      <CircleLoader color="black" size={20} />
    )
  ) : (
    "*********"
  )}
</p>
       
          </div>
         
          <div>
            {/* <p className="text-gray-300 whitespace-nowrap text-sm mb-8 gap-2 flex">
              Transactions <ArrowRightIcon className="w-3 h-3 mt-1" />
            </p> */}
            <button
              className="text-white text-sm font-bold bg-yellow-500 mt-4 mr-4 rounded-2xl p-2"
              onClick={handleFundWalletClick}
            >
              + Fund Wallet
            </button>
          </div>
        </div>

    

      </div>

      
    </>
  );
};

export default Wallet;
