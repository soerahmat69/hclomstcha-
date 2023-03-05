import React, { useEffect,useState } from "react";
import axios from "axios";


const RiwayatTbl = ({call,back,order_id}) => {

  const [getBooking,setBooking] = useState([])
  
  useEffect(() => {
    axios
      .get("http://localhost:8080/order/acc")
      .then((response) => {
        const overa = response.data.data; 
        setBooking(overa);
      })
      .catch((error) => {
       
      });
  },[]);
  let today = new Date() 
  let targetDate;
  function dates(date){
  let targetDate = new Date(date)
  targetDate = targetDate
return targetDate;  
}
function selisih(date){
  let targetDate = new Date(date)
  var difference = today.getTime() - targetDate.getTime();
  var differenceInDays = Math.floor(difference / (1000 * 3600 * 24));
  return differenceInDays
}

  if(getBooking.length > 0){
    return getBooking.map((res)=>{
      
  return (
    <>
            <tr className="bg-white border-b  " key={res.order_id}>
            <td className="py-4 px-6 text-center  font-['poppins'] ">
                {res.tgl_rental}
                </td>
                <td className="py-4 px-6 text-center  font-['poppins'] ">
                    {res.chara_name}
                </td>
                <td className="py-4 px-6 text-center  font-['poppins'] ">
                {(today.getTime() >= dates(res.pengembalian).getTime() )? <button onClick={()=>{
                  back(true) 
                  order_id(res.order_id)
                  }} className=" bg-[#916FA1] text-white py-2 rounded-md px-2">kembalikan</button>: <button disabled className=" bg-[#916FA1] text-white py-2 rounded-md px-2">kembalikan</button>}
               
                </td>
                <td className="py-4 px-6 text-center  font-['poppins'] ">
                {`${res.pengembalian}`}
                {}
                </td>
                <td className="py-4 px-6 flex  gap-2 justify-center   w-full">
                
                  <div className="flex flex-row items-center  my-[5%]">  
                  {(res.status_order === "sedang di kirim" ?<div className="py-2 px-2 bg-red-600 rounded-full mr-2"/>:"")}
                    {(res.status_order === "sedang di pinjam" ?<div className="py-2 px-2 bg-yellow-300 rounded-full mr-2"/>:"")}
                    {(res.status_order === "telah di kembalikan" ?<div className="py-2 px-2 bg-green-600 rounded-full mr-2"/>:"")}

                    <p className="font-['poppins'] text-[12px] font-semibold ">
                      {res.status_order} JNE: {res.no_resi}
                    </p>
                    
                
                  </div>
                
                  </td>
            </tr>
            {(dates(res.pengembalian).getTime()  < today.getTime())?
             <th scope="col" colSpan="5"  className="py-3  text-red-600   font-semibold px-6 text-center  font-['poppins']  border-collapse border">
             kamu di denda, karena lambat mengembalikan kostum.Denda biaya pengembalian sesuai peraturan sebelum order
             <br/>
             <span className="font-semibold">total denda dalam {selisih(res.pengembalian)} hari yaitu Rp {selisih(res.pengembalian) * 50000}</span>
         </th>:""}
           

      </>
  );})}else{
    return(
      <h1 className="text-center">no data</h1>
    )
  }
};

export default RiwayatTbl;
