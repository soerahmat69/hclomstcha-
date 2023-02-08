import React, { useEffect, useState } from "react";
import axios from "axios";

const BioTable = ({ call, edit, datas, id, name }) => {
  const [getInclude, setInclude] = useState([]);
  let [data, setdata] = useState({
    acessories_id: null,
  });
console.log(id["id"])
  useEffect(() => {
    axios
      .get(`http://localhost:8080/admin/personal/${id["id"]}`)
      .then((response) => {
        const overa = response.data.data;
        setInclude(overa);
      })
      .catch((error) => {alert(error)});
  },[]);

  const del = (incid) => {
    axios
      .post(`http://localhost:8080/admin/personal/delete/${incid}`)
      .then((response) => {
        alert("berhasil menghapus data jon");
        axios
          .get(`http://localhost:8080/admin/personal`)
          .then((response) => {
            const overa = response.data.data;
            setInclude(overa);
          })
          .catch((error) => {});
      })
      .catch((error) => {
        alert("ada aja jon jon error");
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
              <div className=" ">
                {" "}
                <img
                  className="mx-auto w-[120px] rounded-md h-[140px]"
                  src={`http://localhost:8080/etc/images/${res.img_ktp}`}
                ></img>
              </div>
            </th>
            <td className="py-4 px-6 text-center  font-['poppins'] ">
              <div className=" ">
                {" "}
                <img
                  className="mx-auto w-[120px] rounded-md h-[140px]"
                  src={`http://localhost:8080/etc/images/${res.img_personal}`}
                ></img>
              </div>
            </td>
            <td className="py-4 px-6 text-center  font-['poppins'] ">
              <div className=" ">
                {" "}
                <img
                  className="mx-auto w-[120px] rounded-md h-[140px]"
                  src={`http://localhost:8080/etc/images/${res.img_kk}`}
                ></img>
              </div>
            </td>
            <td className="py-4 px-6 text-center  font-['poppins'] ">
              {`${res.akun_sos}`}
            </td>
            <td className="py-4 px-6 text-center  font-['poppins'] ">
              {`${res.no_wa}`}
            </td>
            <td className="py-4 px-6 text-center  font-['poppins'] ">
              {`${res.no_sdr}`}
            </td>
            <td className="py-4 px-6 text-center  font-['poppins'] ">
              {`${res.alamat}`}
            </td>
            <td class="px-6 flex py-[23%] gap-2 ">
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

export default BioTable;
