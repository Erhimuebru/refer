import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Link, useNavigate } from 'react-router-dom';
import { apiGet } from "../../../utils/api";
import { BsPersonCircle } from "react-icons/bs";
import './post.css'
import Wallet from "../../../components/wallet/wallet";
import { useUser } from '../../../utils/useContext'
import Loading from "../../../components/loading/loading";
const Post = () => {
  const { user, handleLogout } = useUser();
  const userId = user ? user.id : localStorage.getItem('id');
    const [postData, setPostData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [postsPerPage] = useState(20);
    const navigate = useNavigate();

    useEffect(() => {
      const fetchData = async () => {
        try {
          const { data } = await apiGet("/posts/all");
          setPostData(data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching posts:", error);
          setLoading(false);
        }
      };
      fetchData();
    }, []);

    const handlePageClick = ({ selected }) => {
      setCurrentPage(selected);
    };

    const indexOfLastPost = (currentPage + 1) * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = postData.slice(indexOfFirstPost, indexOfLastPost);


    const handleClick = (id, imageUrl, headLine, details) => {
      navigate(`/posts/${id}`, {
        state: {
          id,
          imageUrl,
          headLine,
          details
        }
      });
    };
    
    if (loading) {
      return <Loading />;
    }

  
    return (
        <div className="items-center justify-center">
            <div>

            <div className="flex gap-2 ml-10 mt-4 font-extrabold text-md text-gray-500 capitalize p-2 bg-white rounded-lg whitespace-nowrap">
<BsPersonCircle className='text-md mt-1'/>
      <p className="text-md">
      Hi, {user.firstname}
        </p>
    </div>
</div>
          <Wallet/>

       
          <div>
          <Link to='/withdraw-funds'>
            <p className=' mt-4 text-sm text-center text-blue-500 underline cursor-pointer'>Click here to withdraw funds</p>
            </Link>
          </div>
        
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 ml-6 mt-8 justify-center">
                {currentPosts.map((category, index) => (
                    <div    onClick={() => handleClick(category.id, category.imageUrl, category.headLine, category.details)}
                    className=" overflow-hidden bg-gray-100 border border-gray-400 rounded-md shadow-md h-32 w-80 flex items-center justify-center sm:justify-start" key={index}>
                        <div className="flex">
                            <img className="w-24 h- object-cover" src={category.imageUrl} alt={category.headLine} />
                            <div className="flex flex-col justify-center p-4">
                                <h3 className="text-sm font-semibold capitalize">{category.headLine}</h3>
                                <p className='text-sm text-gray-500 mt-3 '>{new Date(category.createdAt).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-8 mb-2"> 

           
            <ReactPaginate
    pageCount={Math.ceil(postData.length / postsPerPage)}
    pageRangeDisplayed={2}
    marginPagesDisplayed={1} 
    onPageChange={handlePageClick}
    previousLabel={"Prev"}
    nextLabel={"Next"}
    breakLabel={"..."}
    previousClassName={"pagination-button"}
    nextClassName={"pagination-button"}
    breakClassName={"pagination-break"}
    pageClassName={"pagination-page"}
    containerClassName={"paginationBttns"}
    previousLinkClassName={"previousBttn"}
    nextLinkClassName={"nextBttn"}
    disabledClassName={"paginationDisabled"}
    activeClassName={"paginationActive"}
/>
</div>
        </div>
    );
};

export default Post;
