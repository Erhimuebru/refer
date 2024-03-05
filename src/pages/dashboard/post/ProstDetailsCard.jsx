import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { apiGet } from "../../../utils/api";
import { FaClock } from "react-icons/fa6";
import { BsPersonCircle } from "react-icons/bs";
const PostDetailsCard = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState([]);
  // const [loading, setLoading] = useState(true); 
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


  return (
    <div className="ml-6 bg-gray-100 mr-8">
      <div className="">
      <div className=' bg-gray-100 mt-8  w-full'>
          <h1 className=' text-center font-extrabold  capitalize pt-4'>{restaurant.headLine}</h1>
<div className='flex items-center justify-center gap-8'>
<div className='flex items-center justify-center gap-2 mt-8 pb-2'>
            <BsPersonCircle className='text-sm'/>
          <p className='text-sm '>{restaurant.source}</p>
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
        <button
              type="submit"
              className='bg-[#2f80ed] text-white text-bold w-full border p-2 rounded-2xl'
              disabled={loading}
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
            </button>
        </div>
      
      </div>
    </div>
  );
}
 
export default PostDetailsCard;
