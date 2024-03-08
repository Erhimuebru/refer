import React from "react";
import { useTypewriter, Cursor } from "react-simple-typewriter";





const Header = () => {



    const [text] = useTypewriter ({
        words:[
            'Welcome To',
            '9ja Update...!',
            
        ],loop:true,
        delaySpeed:2000,
    })
    return ( 
    
    <>

   
             
            <div className="mt-4 mb-2">
            <h3 className="text-3xl text-center font-semibold font-serif">
                 <span className=" lg:text-xl"> {text}</span>
                 <Cursor cursorColor="#F7AB0A" />

             </h3>

    

            </div>
        </> );
}
 
export default Header;