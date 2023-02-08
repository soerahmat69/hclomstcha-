import React, { useEffect,useState } from "react";
import Aside from "./Aside";
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";
import RejectTable from "./Rejected.table";
import { useNavigate } from "react-router-dom";

const OrderRejc = ({admin}) => {
let navigate = useNavigate()
  let Tit = () => {
    useEffect(() => {
      document.title = "Order Reject";
      if(admin !== "admin"){
        navigate("/")
      }
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
              List Order Reject
            </h1>
            <div className=" h-[3px] w-full bg-black " />
          </div>
          <div className="  px-3   justify-items-center   py-[24px]">

         
<div className="overflow-x-auto relative">

                    <table className="w-full text-sm text-left  rounded-md   border-collapse border">
        <thead className="text-xs ">
            <tr>
                <th scope="col" className="py-3 text-center   font-semibold  text-[20px] px-6  font-['poppins']  border-collapse border">
                  username
                </th>
                <th scope="col" className="py-3   font-semibold  px-6 text-center text-[20px]  font-['poppins']  border-collapse border">
                    chara name
                </th>
                <th scope="col" className="py-3   font-semibold  px-6 text-center text-[20px]  font-['poppins']  border-collapse border">
                    last reject
                </th>
           
               
                <th scope="col" className="py-3   font-semibold px-6 text-center text-[20px]  font-['poppins']  border-collapse border">
                    action
                </th>
            </tr>
        </thead>
        <tbody>
   <RejectTable  />
 
        </tbody>
   </table>
</div>

            
          </div>
        </div>
      </main>
      <Tit />
      </>
  );
};

export default OrderRejc;
