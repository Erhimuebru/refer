// import React, { useState } from 'react';
// import { GiHamburgerMenu } from "react-icons/gi";
// import { FaHome, FaPowerOff } from "react-icons/fa";
// import { BsPersonCircle } from "react-icons/bs";
// import { useUser } from '../../utils/useContext';
// import { Link, useNavigate } from 'react-router-dom';
// import Header from '../hero/hero';
// const NavBar = () => {
//   const Navigate = useNavigate();
//   const { user, handleLogout } = useUser();
//   const userId = user ? user.id : localStorage.getItem('id');

//   const handleLogoutClick = () => {
//     handleLogout();
//     localStorage.removeItem('token');
//     localStorage.removeItem('id');

//     Navigate('/');
//   };

//   const [isNavBarVisible, setIsNavBarVisible] = useState(false);

//   const toggleNavBar = () => {
//     setIsNavBarVisible(prevState => !prevState);
//   };

//   return (
//     // <div>

// <div style={{ backgroundImage: `url('https://res.cloudinary.com/dmfb370xe/image/upload/v1709932662/WhatsApp_Image_2024-03-08_at_22.14.54_btwwrr.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center', height: '30vh' }}>
//     <div className="pt-8 pb-10 bg-opacity-50 ">
//       {/* <div className="pt-8 pb-10 h-56 bg-[#00ccbb] "> */}
//         <div>
//           {/* <h1 className="text-4xl font-extrabold text-center italic text-white" >9ja Update</h1> */}
//           <Header/>
//           <p className='text-sm font-extrabold text-center  '>READ NEWS, GET UPDATED</p>
//           <p className='text-sm font-extrabold    text-center'>AND</p>
//           <p className='text-sm font-extrabold text-center'>EARN MONEY FOR FREE UP ₦1,000,000</p>
//           <button onClick={toggleNavBar} className="bg-gray-800 ml-40 gap-2 mt-3 text-white flex items-center justify-center rounded-md p-4">
//             <GiHamburgerMenu/> <p>Menu</p>
//           </button>
//         </div>
//       </div>

//       {isNavBarVisible && (
//         <div className="bg-[#00ccbb] p-4">
//           <ul className="flex flex-col gap-2">
//             {user ? ( // If user is logged in
//               <>
//                 <Link to="/dashboard">
//                   <li className="flex items-center gap-1 p-2 hover:text-[#00ccbb] text-white">
//                     <FaHome className="w-6 h-6" />
//                     Home
//                   </li>
//                 </Link>
//                 <Link to="/account">
//                   <li className="flex items-center gap-1 p-2 hover:text-[#00ccbb] text-white">
//                     <BsPersonCircle className="w-6 h-6" />
//                     Account
//                   </li>
//                 </Link>

//                 <li onClick={handleLogoutClick} className="flex items-center gap-1 p-2 hover:text-[#00ccbb] text-white cursor-pointer">
//                   <FaPowerOff className="w-6 h-6" />
//                   Sign out
//                 </li>

//               </>
//             ) : ( // If user is not logged in
//               <>
//                 <Link to="/register">
//                   <li className="flex items-center gap-1 p-2 hover:text-[#00ccbb] text-white">
//                     <BsPersonCircle className="w-6 h-6" />
//                     Register
//                   </li>
//                 </Link>
//                 <Link to="/">
//                   <li className="flex items-center gap-1 p-2 hover:text-[#00ccbb] text-white">
//                     <FaPowerOff className="w-6 h-6" />
//                     Sign in
//                   </li>
//                 </Link>
//               </>
//             )}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default NavBar;



import React, { useState } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import { FaHome, FaPowerOff } from "react-icons/fa";
import { BsPersonCircle } from "react-icons/bs";
import { useUser } from '../../utils/useContext';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../hero/hero';

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
    <div style={{ backgroundImage: `url('https://res.cloudinary.com/dmfb370xe/image/upload/v1709932662/WhatsApp_Image_2024-03-08_at_22.14.54_btwwrr.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center', height: '45vh' }}>
      <div className="pt-8 pb-10">
        <div>
          <Header />
          <p className='text-sm font-extrabold text-center text-black'>READ NEWS, GET UPDATED</p>
          <p className='text-sm font-extrabold text-black text-center'>AND</p>
          <p className='text-sm font-extrabold text-black text-center'>EARN MONEY FOR FREE UP ₦1,000,000</p>
          <button onClick={toggleNavBar} className="bg-gray-800 ml-40 gap-2 text-white flex items-center mt-8 justify-center rounded-md p-4">
            <GiHamburgerMenu /> <p>Menu</p>
          </button>
        </div>
      </div>

      {isNavBarVisible && (
        <div className=" p-4">
          <ul className="flex flex-col gap-2 -mt-14">
            {user ? ( // If user is logged in
              <>
                <Link to="/dashboard">
                  <li className="flex items-center gap-1 p-2 hover:text-[#00ccbb] font-black font-extrabold text-white">
                    <FaHome className="w-6 h-6" />
                    Home
                  </li>
                </Link>
                <Link to="/account">
                  <li className="flex items-center gap-1 p-2 hover:text-[#00ccbb] font-black font-extrabold text-white">
                    <BsPersonCircle className="w-6 h-6" />
                    Account
                  </li>
                </Link>

                <li onClick={handleLogoutClick} className="flex items-center gap-1 p-2 hover:text-[#00ccbb] font-black font-extrabold text-white cursor-pointer">
                  <FaPowerOff className="w-6 h-6" />
                  Sign out
                </li>

              </>
            ) : ( // If user is not logged in
              <>
                <Link to="/register">
                  <li className="flex items-center gap-1 p-2 hover:text-[#00ccbb] font-black font-extrabold text-white">
                    <BsPersonCircle className="w-6 h-6" />
                    Register
                  </li>
                </Link>
                <Link to="/">
                  <li className="flex items-center gap-1 p-2 hover:text-[#00ccbb] font-black font-extrabold text-white">
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
