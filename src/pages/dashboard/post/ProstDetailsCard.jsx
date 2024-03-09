import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { apiGet, apiPost } from "../../../utils/api";
import { FaClock } from "react-icons/fa6";
import { BsPersonCircle } from "react-icons/bs";
import { useUser } from '../../../utils/useContext'
import Swal from 'sweetalert2';
import { CircleLoader } from 'react-spinners';
import Loading from '../../../components/loading/loading';
const PostDetailsCard = () => {
  const { id } = useParams();
  const { user, handleLogout } = useUser();
  const userId = user ? user.id : localStorage.getItem('id');
  const [restaurant, setRestaurant] = useState([]);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingTwo, setLoadingTwo] = useState(true);


  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      try {
        const { data } = await apiGet(`/posts/${id}`);
        setRestaurant(data);
        const { token } = data;
        setToken(token);
      } catch (error) {
        // Handle error
        console.error('Error fetching restaurant details:', error);
      } finally {
        // Set loading to false after fetching data (whether success or error)
        setLoadingTwo(false);
      }
    };

    fetchRestaurantDetails();
  }, [id]);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const userId = localStorage.getItem('id');
      const orderData = {
        // Construct your order data object here
        userId: userId,
         token:token,
      };
  
      await apiPost('/wallet/claim', orderData);
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
        text: error.response.data.message || 'Please check your internet connection and try again.',
        confirmButtonText: 'OK',
        showCancelButton: true,
        cancelButtonText: 'Fund Wallet',
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.cancel) {
          // Redirect to payment page with user data
          const {firstname, surname, email } = user || {}; // Destructure user object again
          window.location.href = `https://paystack.com/pay/o5be1mgez-?first_name=${firstname}&last_name=${surname}&email=${email}`;
        }
      });
  
    } finally {
      setLoading(false);
     
    }
  };

  
if (loadingTwo || !restaurant) {
  // Render loading spinner if data is still loading or restaurant data is not available yet
  return <Loading />;
}
  return (
    <div className="ml-8 bg-gray-100 mr-8">
    
      <div className="">
      <div className=' bg-gray-100 mt-8  w-full'>
          <h1 className=' text-center font-extrabold  capitalize pt-4'>{restaurant.headLine}</h1>
<div className='flex items-center justify-center gap-8'>
<div className='flex items-center justify-center gap-1 mt-8 pb-2 text-gray-500'>
            <BsPersonCircle className='text-sm'/>
          <p className='text-xs whitespace-nowrap uppercase '>{restaurant.source}</p>
          </div>

          <div className='flex items-center text-gray-500 justify-center gap-1 mt-8 pb-2'>
            <FaClock className='text-sm'/>
          <p className='text-xs whitespace-nowrap '>{new Date(restaurant.createdAt).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}</p>
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
      

<button
              type="submit"
              className="bg-yellow-500 text-white py-2 w-full px-4 hover:cursor-pointer mt-3 rounded  relative"
              disabled={loading}
              onClick={handleSubmit}
            >
              {loading ? (
                <>
                  <p className='gap-2 ml-24 flex items-center'>
                    <CircleLoader color="#fff" size={20} />
                    <span className="">Submitting...</span>
                  </p>
                </>
              ) : (
                'Claim Reward ₦50'
              )}
            </button>
        </div>
      
      </div>
    </div>
  );
}
 
export default PostDetailsCard;
