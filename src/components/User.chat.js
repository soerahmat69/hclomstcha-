import React, { useEffect,useState } from "react";
import Aside from "./Aside";
import Navbar from "./Navbar";
import DataChat from "./User.chat.data";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UsrChat = ({user}) => {
  let [sendChat,setChat] = useState({chat: null})
  let navigate  = useNavigate()
  let Tit = () => {
    useEffect(() => {
      document.title = "Dasboard Admin";
      if(user !== "user"){
        navigate("/")
      }
    }, []);
  };

  let valueSubmit = (e) =>{
    let value = e.target.value
    setChat({...sendChat,chat: value})

  } 
let submitChat = ()=>{
  axios.post("http://localhost:8080/chat/add",sendChat).then().catch()
}
  return (
    <>
      <Navbar />

      <Aside />

      <main className="grid mt-[70px] grid-cols-6">
        <div className="col-start-2 px-3  col-span-4">
          <div className="flex items-center   flex-row">
            <h1 className="mr-[26px] font-['poppins']  whitespace-nowrap text-[39px]">
              Chat Admin
            </h1>
            <div className=" h-[3px] w-full bg-black " />
          </div>

          <div className="px-3 justify-items-center   gap-28   py-[24px]">
            <h2 className="font-['poppins'] text-center">
              Hayu chat admin jika ada keluhan mu dengan website ini, buat admin
              dengar kalimat kamu di sini 😍
            </h2>
            <div className="w-full  mx-auto px-10 py-5">
              <div className=" h-[300px]  overflow-hidden  overflow-y-auto rounded-md py-1 px-3">
                <DataChat />
              </div>

              <form onSubmit={submitChat}>
                <input type="text" onChange={valueSubmit} className="w-full  rounded-md" />
                <div className="relative">
                  {" "}
                  <button className="px-3 absolute right-3 bottom-1 py-1 rounded-md text-center font-['poppins']  text-white bg-[#916FA1]">
                    send
                  </button>
                </div>{" "}
              </form>
            </div>
          </div>
        </div>
      </main>
      <Tit />
    </>
  );
};

export default UsrChat;
