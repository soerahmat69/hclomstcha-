import React, { useEffect,useState } from "react";
import Aside from "./Aside";
import EditProd from "./Edit.product";
import Navbar from "./Navbar";
import AdmProduct from "./Product.table";
import AddProd from "./Add.product";
import { useNavigate } from "react-router-dom";

const ProductA = () => {
  let [klik,setklik] = useState(false)
  let [klika,setklika] = useState(false)
  let [edit,setedit] = useState("")
  let navigate = useNavigate()
  let Tit = () => {
    useEffect(() => {
      document.title = "Product";
    }, []);
  };
console.log(edit)
  return (
    <>
    {(klik === true)? <EditProd call={klik} back={(klik)=>{setklik(klik)}}  />:""}
    {(klika === true)? <AddProd call={klika} back={(klik)=>{setklika(klik)}}  />:""}
      <Navbar />

      <Aside />

      <main className="grid mt-[70px] grid-cols-6">
        <div className="col-start-2 px-3  col-span-4">
          <div className="flex items-center   flex-row">
            <h1 className="mr-[26px] font-['poppins']  whitespace-nowrap text-[39px]">
              Chara Products
            </h1>
            <div className=" h-[3px] w-full bg-black " />
          </div>
          <div className="  px-3   justify-items-center   py-[24px]">
            <div className="overflow-x-auto relative">
              <div className=" float-right mb-3 ">
                <button onClick={()=>{
                  if(klik === false){
                  setklika(true)
                  }
                }} className=" px-4 mx-auto  bg-[#916FA1] font-['poppins']  text-white rounded-md py-2">
                  Add Chara
                </button>
                <button onClick={()=>{
                  navigate("/admin/request")
                }} className=" px-4 mx-5  bg-[#916FA1] font-['poppins']  text-white rounded-md py-2">
                  Req Order
                </button>
              </div>
              
              <table className="w-full text-sm text-left  rounded-md   border-collapse border">
                <thead class="text-xs ">
                  <tr>
                    <th
                      scope="col"
                      class="py-3 text-center   font-semibold  text-[20px] px-6  font-['poppins']  border-collapse border"
                    >
                      Images
                    </th>
                    <th
                      scope="col"
                      class="py-3   font-semibold  px-6 text-center text-[20px]  font-['poppins']  border-collapse border"
                    >
                      Chara Name
                    </th>
                    <th
                      scope="col"
                      class="py-3    font-semibold px-6 text-center text-[20px]  font-['poppins']  border-collapse border"
                    >
                      Chara Size
                    </th>
                    <th
                      scope="col"
                      class="py-3   font-semibold px-6 text-center text-[20px]  font-['poppins']  border-collapse border"
                    >
                      Price
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
                  <AdmProduct call={klik} edit={(nt)=>setklik(nt)} datas={(nt)=>setedit(nt)}/>
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

export default ProductA;
