import React, { useState } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import { FaHome, FaPowerOff } from "react-icons/fa";
import { BsPersonCircle } from "react-icons/bs";
import { useUser } from '../../utils/useContext';
import { Link, useNavigate } from 'react-router-dom';
const NavBar = () => {
  const Navigate = useNavigate();
  const { user, handleLogout } = useUser();
  const userId = user ? user.id : localStorage.getItem('id');

  const handleLogoutClick = () => {
    handleLogout();
    localStorage.removeItem('token');
    localStorage.removeItem('id');

    Navigate('/');
  };

  const [isNavBarVisible, setIsNavBarVisible] = useState(false);

  const toggleNavBar = () => {
    setIsNavBarVisible(prevState => !prevState);
  };

  return (
    <div>
      <div className="pt-8 pb-10 h-56 bg-[#00ccbb]">
        <div>
          <h1 className="text-4xl font-extrabold text-center italic text-white" >Naija Update</h1>
          <p className='text-sm font-bold text-center  text-white'>READ NEWS, GET UPDATED</p>
          <p className='text-sm font-bold  text-white text-center'>AND</p>
          <p className='text-sm font-bold  text-white text-center'>EARN MONEY FOR FREE UP ₦1,000,000</p>
          <button onClick={toggleNavBar} className="bg-gray-800 ml-40 gap-2 mt-3 text-white flex items-center justify-center rounded-md p-4">
            <GiHamburgerMenu/> <p>Menu</p>
          </button>
        </div>
      </div>

      {isNavBarVisible && (
        <div className="bg-[#00ccbb] p-4">
          <ul className="flex flex-col gap-2">
            {user ? ( // If user is logged in
              <>
                <Link to="/dashboard">
                  <li className="flex items-center gap-1 p-2 hover:text-[#00ccbb] text-gray-800">
                    <FaHome className="w-6 h-6" />
                    Home
                  </li>
                </Link>
                <Link to="/account">
                  <li className="flex items-center gap-1 p-2 hover:text-[#00ccbb] text-gray-800">
                    <BsPersonCircle className="w-6 h-6" />
                    Account
                  </li>
                </Link>

                <li onClick={handleLogoutClick} className="flex items-center gap-1 p-2 hover:text-[#00ccbb] text-gray-800 cursor-pointer">
                  <FaPowerOff className="w-6 h-6" />
                  Sign out
                </li>

              </>
            ) : ( // If user is not logged in
              <>
                <Link to="/register">
                  <li className="flex items-center gap-1 p-2 hover:text-[#00ccbb] text-gray-800">
                    <BsPersonCircle className="w-6 h-6" />
                    Register
                  </li>
                </Link>
                <Link to="/">
                  <li className="flex items-center gap-1 p-2 hover:text-[#00ccbb] text-gray-800">
                    <FaPowerOff className="w-6 h-6" />
                    Sign in
                  </li>
                </Link>
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NavBar;
