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
            <li onClick={()=>navigate("/")} className="mr-[48px] cursor-pointer font-['poppins'] text-[28px] font-semibold">home</li>
          </ul>
          <li className=" text-[48px] font-['poppins'] font-semibold">HCLOMSTCHA.</li>
          <li>
            <div className="">
              {(localStorage.getItem('user') === "user" || localStorage.getItem('admin') === "admin")?
              <button onClick={logout} className=" w-[130px]  rounded-md text-[31px] bg-[#916FA1] h-[50px]">
                <p className="text-[26px] font-[poppins] font-semibold text-white">
                  logout
                </p>
              </button>
:
              <button onClick={()=>navigate("/login")} className=" w-[130px]  rounded-md text-[31px] bg-[#916FA1] h-[50px]">
                <p className="text-[26px] font-[poppins] font-semibold text-white">
                  login
                </p>
              </button>
}
            </div>
          </li>
        </ul>
      </navbar>
      </>
  );
};

export default Navbar;
