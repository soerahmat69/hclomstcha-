import React, { useEffect } from "react";
import Aside from "./Aside";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

const Dashboard = ({admin}) => {

  let navigate = useNavigate()

  useEffect(()=>{
    if(admin !== "admin"){
      navigate("/")
    }
  },[])
let Tit = () => {
    useEffect(() => {
      document.title = "Dasboard Admin";
      
    }, []);
  };

  return (
    <>
      <Navbar />

      <Aside />

      <main className="grid mt-[70px] grid-cols-6">
        <div className="col-start-2 px-3  col-span-4">
          <div className="flex items-center   flex-row">
            <h1 className="mr-[26px] font-['poppins']  whitespace-nowrap text-[39px]">
              Halo Admin 🙌
            </h1>
            <div className=" h-[3px] w-full bg-black " />
          </div>
          <div className="  px-3   justify-items-center	  grid grid-cols-4   gap-28   py-[24px]">
          </div>
        </div>
      </main>
      <Tit />
      </>
  );
};

export default Dashboard;
