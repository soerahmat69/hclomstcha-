import React, { useEffect,useState } from "react";
import AddUser from "./Add.user";
import EditUser from "./Edit.user";
import Aside from "./Aside";
import Navbar from "./Navbar";
import UserTable from "./User.table";
import { useNavigate,useParams } from "react-router-dom";


const User = ({admin}) => {
  let [klik,setklik] = useState(false)
  let [klika,setklika] = useState(false)
  let [data,setdata] = useState([])
  let navigate = useNavigate()
  let Tit = () => {
    useEffect(() => {
      document.title = "List User";
      if(admin !== "admin"){
        navigate("/")
      }
    }, []);
  };

  return (
    <>
        {(klik === true)? <AddUser call={klik} back={(klik)=>{setklik(klik)}}  />:""}
        {(klika === true)? <EditUser call={klika} back={(klika)=>{setklika(klika)}} id={data} />:""}
      <Navbar />

      <Aside />

      <main className="grid mt-[70px] grid-cols-6">
        <div className="col-start-2 px-3  col-span-4">
          <div className="flex items-center   flex-row">
            <h1 className="mr-[26px] font-['poppins']  whitespace-nowrap text-[39px]">
              User List
            </h1>
            <div className=" h-[3px] w-full bg-black " />
          </div>
        
          <div className="  px-3   justify-items-center   py-[24px]">
         
            <div className="overflow-x-auto relative">
         
            <div className=" float-right mb-3 ">
                <button onClick={()=>{
                  if(klik === false){
                  setklik(true)
                  }
                }} className=" px-4 mx-auto  bg-[#916FA1] font-['poppins']  text-white rounded-md py-2">
                  Add User
                </button>
                
              </div>
              <table className="w-full text-sm text-left  rounded-md   border-collapse border">
                <thead class="text-xs ">
                  <tr>
                    <th
                      scope="col"
                      class="py-3 text-center   font-semibold  text-[20px] px-6  font-['poppins']  border-collapse border"
                    >
                     username
                    </th>
                    <th
                      scope="col"
                      class="py-3   font-semibold  px-6 text-center text-[20px]  font-['poppins']  border-collapse border"
                    >
                      password
                    </th>
                    <th
                      scope="col"
                      class="py-3   font-semibold px-6 text-center text-[20px]  font-['poppins']  border-collapse border"
                    >
                      email
                    </th>
                    
                    <th
                      scope="col"
                      class="py-3   font-semibold px-6 text-center text-[20px]  font-['poppins']  border-collapse border"
                    >
                      action
                    </th>
                  </tr>
                </thead>
                <tbody>
                <UserTable call={klik} edit={(nt)=>setklika(nt)} datas={(id)=>setdata(id)}/>
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

export default User;
