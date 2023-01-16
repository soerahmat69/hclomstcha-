import React, { useEffect, useState } from "react";
import axios from "axios";

const AdmProduct = ({ call, edit, datas }) => {
  const [getBooking, setBooking] = useState("");
  let [data, setdata] = useState({
    chara_name: "",
    chara_size: "",
    price: "",
    chara_weight: "",
    chara_img: null,
  });

  

  useEffect(() => {
    axios
      .get("http://localhost:8080/admin/products")
      .then((response) => {
        const overa = response.data.data;
        setBooking(overa);
      })
      .catch((error) => {});
  }, []);

  const del = (id) => {
    axios
      .post(`http://localhost:8080/admin/products/delete/${id}`)
      .then((response) => {
        axios
          .get("http://localhost:8080/admin/products")
          .then((response) => {
            const overa = response.data.data;
            setBooking(overa);
          })
          .catch((error) => {});
      })
      .catch((error) => {});
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
              <div className="mx-auto w-[120px] rounded-md h-[140px] bg-black"></div>
            </th>
            <td  className="py-4 px-6 text-center  font-['poppins'] ">
              {res.chara_name}
            </td>
            <td className="py-4 px-6 text-center  font-['poppins'] ">
              {res.chara_size}
            </td>
            <td className="py-4 px-6 text-center  font-['poppins'] ">
              Rp {res.price}
              
            </td>
            <td class="px-6 flex py-[23%] gap-2 ">
              <button
                onClick={() => {
                  {setdata({ ...data, price: res.price,chara_name:res.chara_name,chara_img:res.chara_img,chara_size:res.chara_size,chara_weight:res.chara_weight })}
                  if (call === false && data.chara_img !== null ) {
                    edit(true);
                    datas(data);
                  }
                }}
                className=" px-4 mx-auto  bg-[#916FA1] font-['poppins']  text-white rounded-md py-2"
              >
                edit
              </button>
              <button
                onClick={() => {
                  if (call === false) {
                    // include(true)
                  }
                }}
                className=" px-4 mx-auto bg-[#916FA1]  font-['poppins']  rounded-md text-white py-2"
              >
                include
              </button>
              <button
                onClick={() => del(res.chara_id)}
                className=" px-4 mx-auto bg-[#916FA1]  font-['poppins']  rounded-md text-white py-2"
              >
                delete
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

export default AdmProduct;
