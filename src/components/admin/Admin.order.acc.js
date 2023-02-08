import React, { useEffect,useState } from "react";
import Aside from "./Aside";
import Navbar from "./Navbar";
import OAccTbl from "./Order.acc.table";
import EditOrdAcc from "./Edit.order.ccept";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const OrderAcc = ({admin}) => {
  let [riwayat,setriwayat] = useState(false)
  let [id,setid] =  useState([])
  let order_id = useParams()
  let navigate = useNavigate()
  let Tit = () => {
    useEffect(() => {
      document.title = "Order";
      if(admin !== "admin"){
        navigate("/")
      }
    }, []);
  };
  
  
  return (
    <>
       {(riwayat === true)? <EditOrdAcc call={id} back={(riwayat)=>{setriwayat(riwayat)}}  />:""}
      <Navbar />

      <Aside />

      <main className="grid mt-[70px] grid-cols-6">
        <div className="col-start-2 px-3  col-span-4">
          <div className="flex items-center   flex-row">
            <h1 className="mr-[26px] font-['poppins']  whitespace-nowrap text-[39px]">
              Order Accepted
            </h1>
            <div className=" h-[3px] w-full bg-black " />
          </div>
          <div className="  px-3   justify-items-center   py-[24px]">

         
<div className="overflow-x-auto relative">

                    <table className="w-full text-sm text-left  rounded-md   border-collapse border">
        <thead className="text-xs ">
            <tr>
                <th scope="col" className="py-3 text-center   font-semibold  text-[20px] px-6  font-['poppins']  border-collapse border">
                  Username
                </th>
                <th scope="col" className="py-3   font-semibold  px-6 text-center text-[20px]  font-['poppins']  border-collapse border">
                    Rental
                </th>
                <th scope="col" className="py-3   font-semibold  px-6 text-center text-[20px]  font-['poppins']  border-collapse border">
                    Chara Name
                </th>
           
                <th scope="col" className="py-3   font-semibold px-6 text-center text-[20px]  font-['poppins']  border-collapse border">
                    Pengembalian
                </th>
                <th scope="col" className="py-3   font-semibold px-6 text-center text-[20px]  font-['poppins']  border-collapse border">
                    status order
                </th>
                <th scope="col" className="py-3   font-semibold px-6 text-center text-[20px]  font-['poppins']  border-collapse border">
                    action
                </th>
            </tr>
        </thead>
        <tbody>
   <OAccTbl call={riwayat} back={(id)=>{setriwayat(id)}} order_id={(id)=>setid(id)} id={order_id} />
 
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

export default OrderAcc;
