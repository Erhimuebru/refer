import React from "react";
import { CircleLoader } from 'react-spinners';

const  Loading = () => {
 
  return (
    <div className=" flex flex-col justify-center items-center sm:mt-10">
     
        <div className="flex items-center justify-center w-screen h-screen">
          <CircleLoader height={10} width={200} color="#f5b033" />
        </div>
        </div>
     
  );
};

export default Loading;



