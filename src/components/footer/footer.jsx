import { HomeIcon } from '@heroicons/react/24/solid';
import { BsFillPersonFill } from "react-icons/bs";
import { Link } from 'react-router-dom';
const Footer = () => {
    return (
      <footer className=" absolute h-16 w-screen bg-gray-100 border-t border-gray-400 mt-10 text-white bottom-0">

        <div className='flex item-center justify-between ml-20 mr-20 mt-2'>   


                         <Link to='/dashboard'> <div className='text-gray cursor-pointer'>
                         <HomeIcon className="h-8 w-8 text-gray-500" /> 
                         </div></Link>

                        <Link to='/profile'><div className='text-gray cursor-pointer'>
                        < BsFillPersonFill className="h-8 w-8 text-gray-500" /> 
                        </div></Link>

      </div>

      </footer>
    );
  };
  
  export default Footer;
  