import React, { useEffect,useState } from "react";
import Aside from "./Aside";
import Navbar from "./Navbar";
import AcceptTable from "./Acc.table";
import ReqAcc from "./Request.accept";
import { useNavigate } from "react-router-dom";

const AdminAcc = ({admin}) => {
  let [klik,setklik] = useState(false)
  let [klika,setklika] = useState(false)
  let [edit,setedit] = useState("")
  let navigate = useNavigate()
  let Tit = () => {
    useEffect(() => {
      document.title = "Request";
      if(admin !== "admin"){
        navigate("/")
      }
    }, []);
  };
console.log(edit)
  return (
    <>
    {(klik === true)? <ReqAcc call={edit} back={(klik)=>{setklik(klik)}}  />:""}
      <Navbar />

      <Aside />

      <main className="grid mt-[70px] grid-cols-6">
        <div className="col-start-2 px-3  col-span-4">
          <div className="flex items-center   flex-row">
            <h1 className="mr-[26px] font-['poppins']  whitespace-nowrap text-[39px]">
              Request Accept
            </h1>
            <div className=" h-[3px] w-full bg-black " />
          </div>
         
          <div className="  px-3   justify-items-center   py-[24px]">
            <div className="overflow-x-auto relative">
              
              
              <table className="w-full text-sm text-left  rounded-md   border-collapse border">
                <thead class="text-xs ">
                  <tr>
                    <th
                      scope="col"
                      class="py-3 text-center   font-semibold  text-[20px] px-6  font-['poppins']  border-collapse border"
                    >
                      bukti payment
                    </th>
                    <th
                      scope="col"
                      class="py-3   font-semibold  px-6 text-center text-[20px]  font-['poppins']  border-collapse border"
                    >
                      Username
                    </th>
                    <th
                      scope="col"
                      class="py-3    font-semibold px-6 text-center text-[20px]  font-['poppins']  border-collapse border"
                    >
                      chara name
                    </th>
                    <th
                      scope="col"
                      class="py-3   font-semibold px-6 text-center text-[20px]  font-['poppins']  border-collapse border"
                    >
                      time rental
                    </th>
                    <th
                      scope="col"
                      class="py-3   font-semibold px-6 text-center text-[20px]  font-['poppins']  border-collapse border"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <AcceptTable call={klik} back={(nt)=>setklik(nt)} datas={(nt)=>setedit(nt)}/>
                  </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
      <Tit />
    </>
  );
};

export default AdminAcc;
