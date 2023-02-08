import React, { useEffect,useState } from "react";
import axios from "axios";


const DataChat = ({call, back}) => {

  let [getChat,setChat] = useState([]);
  
  useEffect(()=>{

    axios.get("http://localhost:8080/chat").then(
      (res)=>{
        let filter = res.data.data
        console.log(filter)
        setChat(filter)
      }
    ).catch((err)=>{
      alert(err)
    })
  },[])


if(getChat.length > 0){
  return getChat.map((res)=>{

    return (
      <>

{(res.tag_user_id === null)?<div className="w-full rounded-md flex justify-end my-2 ">
                    <div className="bg-[#FEC9D1] pt-2 px-3 rounded-md">
                      <p className=" font-['poppins'] w-max ">{res.chat}</p>
                      <div className="font-['poppins'] font-semibold text-[12px] text-right">
                        <p>{res.last_chat.substring(0,5)}</p>
                      </div>
                    </div>
                  </div>:  
                  ((res.warn_chat === null) ?
              <div className="w-full rounded-md flex justify-start my-2 ">
                <div className="bg-[#FEC9D1] pt-2 px-3 rounded-md">
                  <p className=" font-['poppins'] w-max ">{res.chat}</p>
                  <div className="font-['poppins'] font-semibold text-[12px] text-right">
                    <p>{res.last_chat.substring(0, 5)}</p>
                  </div>
                </div>
              </div>
             : 
              <div className="w-full rounded-md flex justify-start my-2 ">
                <div className="bg-[#FEC9D1] pt-2 flex-col flex px-3 rounded-md">
                  <div className="flex flex-row justify-center w-max h-max">
                    <img
                      className=" w-[100px] h-[120px] mr-2"
                      src={`http://localhost:8080/etc/images/${res.chara_img}`}
                    />
                    <div className="flex flex-col  justify-around">
                      <p className=" font-['poppins'] font-semibold ">
                        karakter: {res.chara_name}
                      </p>
                      <p className=" font-['poppins'] font-semibold ">
                        harga: Rp {res.price}
                      </p>
                      <p className=" font-['poppins'] font-semibold ">
                        ukuran: {res.chara_size}
                      </p>
                      
                    </div>
                  </div>
                  <p className="mt-2 font-['poppins'] w-max ">{res.chat}</p>
                  <div className="font-['poppins'] font-semibold text-[12px] text-right">
                    <p>{res.last_chat.substring(0, 5)}</p>
                  </div>
                </div>
              </div>
            
          ) }
{/* 
                  {(res.tag_user_id === null)? : ""} */}

              
                  
     
      </>
    );
  })

}else{
  <div className="w-full rounded-md flex justify-center my-2 ">
                    <div className="bg-[#FEC9D1] pt-2 px-3 rounded-md">
                      <p className=" font-['poppins'] w-max ">No Chat with Admin</p>
                      <div className="font-['poppins'] font-semibold text-[12px] text-right">
                        <p>16:30</p>
                      </div>
                    </div>
                  </div>
}
};

export default DataChat;
