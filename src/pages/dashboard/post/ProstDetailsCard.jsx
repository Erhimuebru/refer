import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { apiGet, apiPost } from "../../../utils/api";
import { FaClock } from "react-icons/fa6";
import { BsPersonCircle } from "react-icons/bs";
import { useUser } from '../../../utils/useContext'
import Swal from 'sweetalert2';
import { CircleLoader } from 'react-spinners';
const PostDetailsCard = () => {
  const { id } = useParams();
  const { user, handleLogout } = useUser();
  const userId = user ? user.id : localStorage.getItem('id');
  const [restaurant, setRestaurant] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      try {
        const { data } = await apiGet(`/posts/${id}`);
        setRestaurant(data);
        console.log(data)
        // setLoading(false); 
      } catch (error) {
        // setLoading(false); 
        // Handle error
      }
    };

    fetchRestaurantDetails();
  }, [id]);

 
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const userId = localStorage.getItem('id');
      const token = id;
      const orderData = {
        // Construct your order data object here
        userId: userId,
        token: token,
      };
  
      await apiPost(`/wallet/${userId}/add-funds`, orderData);
      console.log('Order placed:', orderData);
  
      // Show success message with SweetAlert
      Swal.fire({
        icon: 'success',
        title: 'Reward claimed Successfully!',
        confirmButtonText: 'OK',
      });
  
    } catch (error) {
      // Handle error
      console.error('Error placing order:', error);
  
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text:  error.response.data.message || 'Please check your internet connection and try again.',
        confirmButtonText: 'OK',
      });
  
    } finally {
      setLoading(false);
      // Any cleanup or additional actions can be placed here
    }
  };
  
  
  return (
    <div className="ml-6 bg-gray-100 mr-8">
    
      <div className="">
      <div className=' bg-gray-100 mt-8  w-full'>
          <h1 className=' text-center font-extrabold  capitalize pt-4'>{restaurant.headLine}</h1>
<div className='flex items-center justify-center gap-8'>
<div className='flex items-center justify-center gap-2 mt-8 pb-2'>
            <BsPersonCircle className='text-sm'/>
          <p className='text-sm uppercase '>{restaurant.source}</p>
          </div>

          <div className='flex items-center justify-center gap-2 mt-8 pb-2'>
            <FaClock className='text-sm'/>
          <p className='text-sm '>{new Date(restaurant.createdAt).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}</p>
          </div>
</div>
        
         
        </div>
        <div className='flex items-center w-full justify-between'>
          <img src={restaurant.imageUrl} className='w-full mt-8' alt="" />
        </div>


        <div className='bg-gray-100 mt-10 w-ful'>
          <p className='text-justify'>{restaurant.details}</p>
          
           
        </div>


        <div className='mt-8 mb-12'>
        {/* <button
              type="submit"
              className='bg-[#2f80ed] text-white text-bold w-full border p-2 rounded-2xl'
              disabled={loading}
              onClick={handleSubmitOrder}
            >
              {loading ? (
                <>
                  <p className='gap-2 ml-48 flex items-center'>
                    <CircleLoader color="#fff" size={20} />
                    <span className="">Claiming...</span>
                  </p>
                </>
              ) : (
                'Claim Reward'
              )}
            </button> */}

<button
              type="submit"
              className="bg-[#00ccbb] text-white py-2 w-full px-4 hover:cursor-pointer mt-3 rounded  relative"
              disabled={loading}
              onClick={handleSubmit}
            >
              {loading ? (
                <>
                  <p className='gap-2 ml-10 flex items-center'>
                    <CircleLoader color="#fff" size={20} />
                    <span className="">Submitting...</span>
                  </p>
                </>
              ) : (
                'Claim Reward'
              )}
            </button>
        </div>
      
      </div>
    </div>
  );
}
 
export default PostDetailsCard;
