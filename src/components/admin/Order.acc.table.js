import React, { useEffect,useState } from "react";
import axios from "axios";


const OAccTbl = ({call,back,order_id,id}) => {

  const [getBooking,setBooking] = useState([])

  useEffect(() => {
    if(id["order_id"] !== undefined){
      axios
      .get(`http://localhost:8080/admin/order/acc/detail/${id["order_id"]}`)
      .then((response) => {
        const overa = response.data.data; 
        setBooking(overa);
      })
      .catch((error) => {
       
      });
    }else{
    axios
      .get("http://localhost:8080/admin/order/acc/detail/list")
      .then((response) => {
        const overa = response.data.data; 
        setBooking(overa);
      })
      .catch((error) => {
       
      });}
  },[]);
  const del = (id) => {
    axios
      .post(`http://localhost:8080/admin/order/acc/delete/${id}`)
      .then((res) => {
        alert("selamat jon anda berhasil menghapus");
        axios
      .get("http://localhost:8080/admin/order/acc/detail/list")
      .then((response) => {
        const overa = response.data.data; 
        setBooking(overa);
      })
      .catch((error) => {
       
      });
      })
      .catch((err) => {
        alert("jon kamu gagal hapus ");
      });
  };

  if(getBooking.length > 0){
    return getBooking.map((res)=>{
  return (
    <>
            <tr className="bg-white border-b " key={res.order_id}>
            <td className="py-4 px-6 text-center  font-['poppins'] ">
                {res.username}
                </td>
            <td className="py-4 px-6 text-center  font-['poppins'] ">
                {res.tgl_rental}
                </td>
                <td className="py-4 px-6 text-center  font-['poppins'] ">
                    {res.chara_name}
                </td>
            
                <td className="py-4 px-6 text-center  font-['poppins'] ">
                {res.pengembalian}
                
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
                     <td className="">
              <button
                onClick={()=>{
                  back(true)
                  order_id(res.order_id)
                }}
                className=" px-4 mx-auto my-3 bg-[#916FA1]  font-['poppins']  rounded-md text-white py-2"
              >
                edit
              </button>
              <button
                onClick={()=>{
                  del(res.order_id)
                }}
                className=" px-4 mx-auto my-3 bg-[#916FA1]  font-['poppins']  rounded-md text-white py-2"
              >
                delete
              </button>
            </td>
            </tr>
          

      </>
  );})}else{
    return(
      <h1 className="text-center">no data</h1>
    )
  }
};

export default OAccTbl;
