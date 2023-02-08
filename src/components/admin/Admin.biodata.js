import React, { useEffect,useState } from "react";
import Aside from "./Aside";
import Navbar from "./Navbar";
import BioTable from "./Biodata.table";
import { useNavigate,useParams } from "react-router-dom";


const Biodata = ({admin}) => {
  let [klik,setklik] = useState(false)
  let [klika,setklika] = useState(false)
let navigate = useNavigate()
  let id = useParams()
  let Tit = () => {
    useEffect(() => {
      document.title = "Biodata";
      if(admin !== "admin"){
        navigate("/")
      }
    }, []);
  };

  return (
    <>
      <Navbar />

      <Aside />

      <main className="grid mt-[70px] grid-cols-6">
        <div className="col-start-2 px-3  col-span-4">
          <div className="flex items-center   flex-row">
            <h1 className="mr-[26px] font-['poppins']  whitespace-nowrap text-[39px]">
              Biodata
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
                     img ktp
                    </th>
                    <th
                      scope="col"
                      class="py-3   font-semibold  px-6 text-center text-[20px]  font-['poppins']  border-collapse border"
                    >
                      img personal
                    </th>
                    <th
                      scope="col"
                      class="py-3   font-semibold px-6 text-center text-[20px]  font-['poppins']  border-collapse border"
                    >
                      img kk
                    </th>
                    <th
                      scope="col"
                      class="py-3   font-semibold px-6 text-center text-[20px]  font-['poppins']  border-collapse border"
                    >
                      sosmed
                    </th>
                    <th
                      scope="col"
                      class="py-3   font-semibold px-6 text-center text-[20px]  font-['poppins']  border-collapse border"
                    >
                      no wa
                    </th>
                    <th
                      scope="col"
                      class="py-3   font-semibold px-6 text-center text-[20px]  font-['poppins']  border-collapse border"
                    >
                      no saudara
                    </th>
                    <th
                      scope="col"
                      class="py-3   font-semibold px-6 text-center text-[20px]  font-['poppins']  border-collapse border"
                    >
                      alamat
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
                  <BioTable call={klik} edit={(nt)=>setklik(nt)}  id={id}/>
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

export default Biodata;
