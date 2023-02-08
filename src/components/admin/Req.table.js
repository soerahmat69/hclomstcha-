import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RequestTable = ({ call, back, datas }) => {
  const [getBooking, setBooking] = useState([]);
  let klik = 0;
  let navigate = useNavigate()
  let [data, setdata] = useState({
    chara_name: "",
    chara_size: "",
    price: "",
    chara_weight: "",
    chara_img: null,
  });

  

  useEffect(() => {
    axios
      .get("http://localhost:8080/admin/order/req")
      .then((response) => {
        const overa = response.data.data;
        setBooking(overa);
      })
      .catch((error) => {});
  }, []);

  const del = (id) => {
    axios
      .post(`http://localhost:8080/admin/order/req/delete/${id}`)
      .then((response) => {
        alert("kamu telah menghapus request, harap chat user")
        axios
          .get("http://localhost:8080/admin/order/req")
          .then((response) => {
            const overa = response.data.data;
            setBooking(overa);
          })
          .catch((error) => {});
      })
      .catch((error) => {
        alert("kamu gagal nolak jon")
      });
  };

 

  if (getBooking.length > 0) {
    return getBooking.map((res) => {

     
      return (
        
        <>
        
          <tr className="bg-white border-b  ">
            <th
              scope="row"
              className="py-4 px-6 font-medium text-center  whitespace-nowrap "
            >
              <a href={`http://localhost:8080/etc/images/${res.bukti_payment}`}>
                <img className="mx-auto w-[120px] rounded-md h-[140px] " src={`http://localhost:8080/etc/images/${res.bukti_payment}`}></img>
                </a>
            </th>
            <td  className="py-4 px-6 text-center  font-['poppins'] ">
              {res.username}
            </td>
            <td className="py-4 px-6 text-center  font-['poppins'] ">
              {res.chara_name}
            </td>
            <td className="py-4 px-6 text-center  font-['poppins'] ">
            {res.tgl_rental}
              
            </td>
            <td class="px-3 flex py-[23%] gap-2 ">
              <button
                onClick={() => {
                  klik +=1;
                  if(klik >= 1){
                 back(true)
                 datas(res.order_id)
                  }
                }}
                className=" px-4 mx-auto  bg-[#916FA1] font-['poppins']  text-white rounded-md py-2"
              >
                accept
              </button>
              <button
                onClick={() => {
                  navigate(`/admin/biodata/${res.user_id}`)
                }}
                className=" px-4 mx-auto bg-[#916FA1]  font-['poppins']  rounded-md text-white py-2"
              >
                biodata
              </button>
              <button
                onClick={() =>{
                  
                  del(res.order_id)}}
                className=" px-4 mx-auto bg-[#916FA1]  font-['poppins']  rounded-md text-white py-2"
              >
                reject
              </button>
            </td>

          </tr>
          
        </>
      );
    });
  } else {
    return <h1 className="text-center">no data</h1>;
  }
};

export default RequestTable;
