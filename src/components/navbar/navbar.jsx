import React, { useState } from 'react';
import { SocialIcon } from 'react-social-icons';
import { PhoneIcon } from '@heroicons/react/24/solid';

const NavBar = () => {
  const [showModal, setShowModal] = useState(false);

  const handleContactUsClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="flex flex-1 justify-between items-center h-32 bg-[#00ccbb] pl-5 pr-10">
      <div>
        {/* <img
          src="https://res.cloudinary.com/dmfb370xe/image/upload/v1686271612/EVENTS/foodpadi/Red_Black_Simple_F_Letter_Logo_Design_1_gqklpj.png"
          className="w-10 m-1 h-10 p-1 bg-[#00ccbb] rounded-full"
          alt=""
        /> */}
        <h1 className="text-2xl font-light italic p-4 text-white" >Naija Update</h1>
      </div>
      <div>
        <p
          className="p-1 bg-white rounded-lg text-[#00ccbb] font-bold cursor-pointer"
          onClick={handleContactUsClick}
        >
          Contact us
        </p>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-10 overflow-y-auto bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="relative bg-white p-6 rounded-lg w-96">
            <button
              className="absolute top-3 font-extrabold right-3 text-gray-600 hover:text-gray-800"
              onClick={handleCloseModal}
            >
              &#x2715;
            </button>
            <h1 className="text-lg font-bold mb-4 text-center">Contact Us</h1>
            <div className='items-center justify-center'>

              <h3 className="text-xl font-semibold ml-4 mb-4 mt-12 text-center">Social Media</h3>
              <div className='flex gap-4 items-center justify-center'>
                <SocialIcon url='https://wa.me/2349018471745'  fgColor='gray' bgColor='transparent'/>
                <SocialIcon url='https://www.facebook.com/profile.php?id=100093726890134'  fgColor='gray' bgColor='transparent'/>
                <SocialIcon url='https://twitter.com/FoodPadi'  fgColor='gray' bgColor='transparent'/>
                
                <SocialIcon url='https://www.instagram.com/food_padi'  fgColor='gray' bgColor='transparent'/>
                <SocialIcon url='https://www.linkedin.com/in/erhimu-ebru-blessing-29aa4917b/' fgColor='gray' bgColor='transparent'/>    

            </div>
            </div>
            <div className='items-center justify-center'>
            <h3 className="text-xl font-semibold ml-4 mb-4 mt-12 text-center">Hot Line</h3>
            <div className='flex gap-8 items-center justify-center'>
            <p className='flex text-center'><PhoneIcon className='w-6 h-6 text-[gray] text-center'/>+123456789</p>
            <p className='flex text-center'><PhoneIcon className='w-6 h-6 text-[gray] text-center'/>+123456789</p>

            </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;




