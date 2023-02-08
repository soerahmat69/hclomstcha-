import React, { useEffect, useState } from "react";
import axios from "axios";

const IncTable = ({ call, edit, datas,id,name }) => {
  const [getInclude, setInclude] = useState([]);
  let [data, setdata] = useState({
    acessories_id:null
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8080/admin/products/accessories/${id["id"]}`)
      .then((response) => {
        const overa = response.data.data;
        setInclude(overa);
       
      })
      .catch((error) => {});
  }, []);

  const del = (incid) => {
    axios
      .post(`http://localhost:8080/admin/products/accessories/delete/${incid}`)
      .then((response) => {
        alert("berhasil menghapus data jon")
        axios
        .get(`http://localhost:8080/admin/products/accessories/${id["id"]}`)
          .then((response) => {
            const overa = response.data.data;
            setInclude(overa);
          })
          .catch((error) => {
           
          });
      })
      .catch((error) => {
        alert("ada aja jon jon error")
      });
  };

  if (getInclude.length > 0) {
    return getInclude.map((res) => {

     
      return (
        <>
          <tr className="bg-white border-b  ">
            <th
              scope="row"
              className="py-4 px-6 font-medium text-center  whitespace-nowrap "
            >
              <td  className="py-4 px-6 text-center  font-['poppins'] ">
              {res.acessories_name}
            </td>
            </th>
            <td  className="py-4 px-6 text-center  font-['poppins'] ">
              {res.acessories_size}
            </td>
          
            <td class="px-6 flex py-[23%] gap-2 ">
              <button
                onClick={() => {
                  
                    setdata({ ...data,acessories_id:res.acessories_id })
                  
                  if (call === false && data.acessories_id !== null ) {
                    edit(true);
                    datas(data);
                  }
                }}
                className=" px-4 mx-auto  bg-[#916FA1] font-['poppins']  text-white rounded-md py-2"
              >
                edit
              </button>
             
              <button
                onClick={() => del(res.acessories_id)}
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

export default IncTable;
