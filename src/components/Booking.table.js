import React, { useEffect,useState } from "react";
import axios from "axios";


const TableBooking = ({call,back}) => {

  const [getBooking,setBooking] = useState("")
  
  let values = () => Array
  .from(document.querySelectorAll('input[type="checkbox"]'))
  .filter((checkbox) => checkbox.checked)
  .map((checkbox) => parseInt(checkbox.value));

  useEffect(() => {
    axios
      .get("http://localhost:8080/booking")
      .then((response) => {
        const overa = response.data.data; 
        setBooking(overa);
      })
      .catch((error) => {
       
      });
  },[]);
  
  if(getBooking.length > 0){
    return getBooking.map((res)=>{
  return (
    <>
            <tr className="bg-white border-b  " key={res.order_id}>
                <th scope="row" className="py-4 px-6 font-medium text-center  whitespace-nowrap ">
                    <div className="mx-auto w-[120px] rounded-md h-[140px] bg-black"></div>
                </th>
                <td className="py-4 px-6 text-center  font-['poppins'] ">
                    {res.chara_name}
                </td>
                <td className="py-4 px-6 text-center  font-['poppins'] ">
                {res.chara_size}
                </td>
                <td className="py-4 px-6 text-center  font-['poppins'] ">
                Rp {res.price}
                </td>
                <td className="py-4 px-6 flex  gap-2 justify-center   items-center">
                <div className="flex flex-row  items-center   ">
                    <input
                onChange={()=>{back(values)}}
                      value={res.order_id}
                      name="booking"
                      className="mr-2"
                      type="checkbox"
                    />
                    <p className="font-['poppins'] font-semibold ">
                      agreement
                    </p>
                  </div></td>
            </tr>
          

      </>
  );})}else{
    return(
      <h1 className="text-center">no data</h1>
    )
  }
};

export default TableBooking;
