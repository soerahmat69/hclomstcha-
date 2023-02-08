import React, {  } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const Navbar = () => {

    const url = "http://localhost:8080/logout"
    const navigate = useNavigate()

    const logout = () =>{
      window.localStorage.clear();
      localStorage.removeItem('admin');

      axios.post(`${url}`).then((response)=>{
        if(response.status === 200){
      
          navigate('/')
        }
      }).catch((error)=>{
        console.log(error)
      })
    }


  return (
    <>
      <navbar className="">
        <ul className="px-[70px] ring-1 ring-black h-[90px] flex items-center justify-between ">
          <ul className="flex flex-row ">
            <li className="mr-[48px] font-['poppins'] text-[28px] font-reguler">rental</li>
            <li className=" text-[28px] font-['poppins'] font-reguler">pricing</li>
          </ul>
          <li className=" text-[48px] font-['poppins'] font-semibold">HCLOMSTCHA.</li>
          <li>
            <div className="">
              <button onClick={logout} className=" w-[130px]  rounded-md text-[31px] bg-[#916FA1] h-[50px]">
                <p className="text-[26px] font-[poppins] font-semibold text-white">
                  logout
                </p>
              </button>
            </div>
          </li>
        </ul>
      </navbar>
      </>
  );
};

export default Navbar;
