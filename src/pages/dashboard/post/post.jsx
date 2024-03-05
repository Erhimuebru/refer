import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useNavigate } from 'react-router-dom';
import { apiGet } from "../../../utils/api";
import PostDetailsCard from "./ProstDetailsCard";
import './post.css'
import Wallet from "../../../components/wallet/wallet";

const Post = () => {
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
    
    return (
        <div className="items-center justify-center">
          <Wallet/>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 ml-10 mt-8 justify-center">
                {currentPosts.map((category, index) => (
                    <div    onClick={() => handleClick(category.id, category.imageUrl, category.headLine, category.details)}
                    className=" overflow-hidden bg-gray-100 border border-gray-400 rounded-md shadow-md h-32 w-80 flex items-center justify-center sm:justify-start" key={index}>
                        <div className="flex">
                            <img className="w-24 h- object-cover" src={category.imageUrl} alt={category.headLine} />
                            <div className="flex flex-col justify-center p-4">
                                <h3 className="text-sm font-semibold capitalize">{category.headLine}</h3>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
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
    );
};

export default Post;