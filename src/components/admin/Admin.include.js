import React, { useEffect,useState } from "react";
import Aside from "./Aside";
import Navbar from "./Navbar";
import EditInc from "./Edit.Include";
import AddInc from "./Add.Include";
import { useNavigate,useParams } from "react-router-dom";
import IncTable from "./Include.table";

const IncAcessories = ({admin}) => {
  let [klik,setklik] = useState(false)
  let [klika,setklika] = useState(false)
  let [edit,setedit] = useState([])

  let navigate = useNavigate()
  let id = useParams()
  let Tit = () => {
    useEffect(() => {
      document.title = "Include Character";
      if(admin !== "admin"){
        navigate("/")
      }
    }, []);
  };

  return (
    <>
    {(klik === true)? <EditInc call={id} back={(klik)=>{setklik(klik)}} edit={edit}   />:""}
    {(klika === true)? <AddInc call={id} back={(klik)=>{setklika(klik)}} />:""}
     
      <Navbar />

      <Aside />

      <main className="grid mt-[70px] grid-cols-6">
        <div className="col-start-2 px-3  col-span-4">
          <div className="flex items-center   flex-row">
            <h1 className="mr-[26px] font-['poppins']  whitespace-nowrap text-[39px]">
              Acessories Product
            </h1>
            <div className=" h-[3px] w-full bg-black " />
          </div>
          <div className="  px-3   justify-items-center   py-[24px]">
            <div className="overflow-x-auto relative">
              <div className=" float-right mb-3 ">
                <button onClick={()=>{
                  if(klika === false){
                  setklika(true)
                  }
                }} className=" px-4 mx-auto  bg-[#916FA1] font-['poppins']  text-white rounded-md py-2">
                  Add Acessories
                </button>
                
              </div>
              
              <table className="w-full text-sm text-left  rounded-md   border-collapse border">
                <thead class="text-xs ">
                  <tr>
                    <th
                      scope="col"
                      class="py-3 text-center   font-semibold  text-[20px] px-6  font-['poppins']  border-collapse border"
                    >
                      acessories name
                    </th>
                    <th
                      scope="col"
                      class="py-3   font-semibold  px-6 text-center text-[20px]  font-['poppins']  border-collapse border"
                    >
                      acessories size
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
                  <IncTable call={klik} edit={(nt)=>setklik(nt)} datas={(nt)=>setedit(nt)} id={id}/>
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

export default IncAcessories;
