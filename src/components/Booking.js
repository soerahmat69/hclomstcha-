import React, { useEffect,useState } from "react";
import Aside from "./Aside";
import Navbar from "./Navbar";
import Peraturan from "./Peraturan";
import TableBooking from "./Booking.table";
import { useNavigate } from "react-router-dom";

const Booking = ({user}) => {
  let [orders,setOrders] = useState(false);
  let [bookingz,setbooking] = useState([]);
  let [total,setotal] = useState(null);
  let navigate = useNavigate()
  let Tit = () => {
    useEffect(() => {
      document.title = "Booking";
      if(user !== "user"){
        navigate("/")
      }
    }, []);
  };
  
  console.log(bookingz)
  
  function order(){
    if(orders === false ){
    setOrders(true)
    console.log(bookingz)
  }else
    {
  setOrders(false)
    }
  }
  
  return (
    <>
     {(orders === true)? <Peraturan call={bookingz} totalz={total}  />:""}

      <Navbar />

      <Aside />

      <main className="grid mt-[70px] grid-cols-6">
        <div className="col-start-2 px-3  col-span-4">
          <div className="flex items-center   flex-row">
            <h1 className="mr-[26px] font-['poppins']  whitespace-nowrap text-[39px]">
              Booking
            </h1>
            <div className=" h-[3px] w-full bg-black " />
          </div>
          <div className="  px-3   justify-items-center   py-[24px]">

         
<div className="overflow-x-auto relative">
  <div onClick={()=>{
    order()
  }} className=" float-right mb-3 "><button className=" px-4 mx-auto  bg-[#916FA1] font-['poppins']  text-white rounded-md py-2">Booking</button>
                    </div>
                    <table className="w-full text-sm text-left  rounded-md   border-collapse border">
        <thead className="text-xs ">
            <tr>
                <th scope="col" className="py-3 text-center   font-semibold  text-[20px] px-6  font-['poppins']  border-collapse border">
                    Images
                </th>
                <th scope="col" className="py-3   font-semibold  px-6 text-center text-[20px]  font-['poppins']  border-collapse border">
                    Chara Name
                </th>
                <th scope="col" className="py-3    font-semibold px-6 text-center text-[20px]  font-['poppins']  border-collapse border">
                    Chara Size
                </th>
                <th scope="col" className="py-3   font-semibold px-6 text-center text-[20px]  font-['poppins']  border-collapse border">
                    Price
                </th>
                <th scope="col" className="py-3   font-semibold px-6 text-center text-[20px]  font-['poppins']  border-collapse border">
                    Order
                </th>
            </tr>
        </thead>
        <tbody>
   <TableBooking call={bookingz} back={(bookingz)=>{setbooking(bookingz)}} ttl={(total)=>{setotal(total)}} />
   <tr  className="bg-white border-b  ">
            <td colSpan="5" className="py-4 px-6 text-[17px] font-medium   font-['poppins'] text-end">
                     <p className="text-[17px] font-semibold   font-['poppins'] "><span className="text-[17px] font-medium  font-['poppins']">Total </span>Rp {(total === null)? "0":total}</p>
                </td>
            </tr>
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

export default Booking;
