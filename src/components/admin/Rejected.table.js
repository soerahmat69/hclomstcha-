import React, { useEffect,useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RejectTable = ({call,back,order_id,id}) => {

  const [getBooking,setBooking] = useState([])

  let navigate =  useNavigate()
  useEffect(() => {
   
      axios
      .get(`http://localhost:8080/admin/order/reject`)
      .then((response) => {
        const overa = response.data.data; 
        setBooking(overa);
      })
      .catch((error) => {
       
      });
  },[]);
  const del = (id) => {
    alert(id)
    axios
      .post(`http://localhost:8080/admin/order/reject/delete/${id}`)
      .then((res) => {
        alert("selamat jon anda berhasil menghapus");
        axios
      .get("http://localhost:8080/admin/order/rejected")
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
      // let chat = res.chat
      // console.log(Chat)
  return (
    <>
            <tr className="bg-white border-b " key={res.order_id}>
            <td className="py-4 px-6 text-center  font-['poppins'] ">
              {res.username}
                </td>
            <td className="py-4 px-6 text-center font-semibold  font-['poppins'] ">
                {`${res.chara_name}`}
                </td>
                <td className="py-4 px-6 text-center font-semibold  font-['poppins'] ">
                {res.last_reject}
                </td>
                     <td className=" flex flex-row">
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

export default RejectTable;
