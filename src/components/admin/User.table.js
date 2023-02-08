import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserTable = ({ call, edit, datas,id,name }) => {
  const [getInclude, setInclude] = useState([]);
  let [data, setdata] = useState({
    user_id:null
  });
let navigate = useNavigate()
  useEffect(() => {
    axios
      .get(`http://localhost:8080/admin/user`)
      .then((response) => {
        const overa = response.data.data;
        setInclude(overa);
       
      })
      .catch((error) => {});
  }, []);

  const del = (incid) => {
    axios
      .post(`http://localhost:8080/admin/user/delete/${incid}`)
      .then((response) => {
        alert("berhasil menghapus data jon")
        axios
        .get(`http://localhost:8080/admin/user`)
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
              {res.username}
            </td>
            </th>
            <td  className="py-4 px-6 text-center  font-['poppins'] ">
              {res.password}
            </td>
            <td  className="py-4 px-6 text-center  font-['poppins'] ">
              {res.email}
            </td>
          
            <td class="px-6 flex py-4 gap-2 ">
              <button
                onClick={() => {
                  
                  setdata({ ...data,user_id:res.user_id })
              
                  if (call === false && data.user_id !== null) {
                    
                 
               
                    edit(true);
                    datas(data);
                  
                  }
                }}
                className=" px-4 mx-auto  bg-[#916FA1] font-['poppins']  text-white rounded-md py-2"
              >
                edit
              </button>
              <button
                onClick={() => navigate(`/admin/biodata/${res.user_id}`)}
                className=" px-4 mx-auto bg-[#916FA1]  font-['poppins']  rounded-md text-white py-2"
              >
                Biodata
              </button>
              <button
                onClick={() => del(res.user_id)}
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

export default UserTable;
