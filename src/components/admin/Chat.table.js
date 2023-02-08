import React, { useEffect,useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ChatTable = ({call,back,order_id,id}) => {

  const [getBooking,setBooking] = useState([])
  // const [Chat,setChat] = useState([])
  let navigate =  useNavigate()
  useEffect(() => {
   
      axios
      .get(`http://localhost:8080/admin/user/chat`)
      .then((response) => {
        const overa = response.data.data; 
        setBooking(overa);
      })
      .catch((error) => {
       
      });
  },[]);
  const del = (id) => {
    axios
      .post(`http://localhost:8080/admin/user/chat/delete/${id}`)
      .then((res) => {
        alert("selamat jon anda berhasil menghapus");
        axios
      .get("http://localhost:8080/admin/user/chat")
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
      let chat = res.chat
      // console.log(Chat)
  return (
    <>
            <tr className="bg-white border-b " key={res.id_chat}>
            <td className="py-4 px-6 text-center  font-['poppins'] ">
              {res.username}
                </td>
            <td className="py-4 px-6 text-center font-semibold  font-['poppins'] ">
                
            {(chat.length > 11)?chat.substring(0,8)+" ...":chat}
                </td>
                <td className="py-4 px-6 text-center  font-['poppins'] ">
                    {(res.tag_user_id !== null)? 
                    <div className="flex flex-row items-center  my-[5%]">
                    <div className="py-2 px-2 bg-green-600 rounded-full mr-2" />
                    <p>telah di balas</p> 
                    </div>
                    :
                    <div className="flex flex-row items-center  my-[5%]">
                    <div className="py-2 px-2 bg-red-600 rounded-full mr-2" />
                    <p>belum di balas</p> 
                    </div>}
                </td>
           
                     <td className=" flex flex-row">
              <button
                onClick={()=>{
                  // back(true)
                  // order_id(res.user_id)
                  navigate(`/admin/chat/${res.user_id}`)
                }}
                className=" px-4 mx-auto my-3 bg-[#916FA1]  font-['poppins']  rounded-md text-white py-2"
              >
                pesan
              </button>
              <button
                onClick={()=>{
                  del(res.user_id)
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

export default ChatTable;
