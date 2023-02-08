import axios from "axios";
import React from "react";
import { useState } from "react";
const RiwayatPengem = ({ call, back }) => {
  let [form, setform] = useState({pengiriman: "", no_resi:""});

  let submitData = () => {
    console.log(call)
      axios
        .post(`http://localhost:8080/pengembalian/${call}`, form)
        .then((res) => {
          alert("makasih ya jon udah balikin,jangan lupa order balik");
        })
        .catch((err)=>{
          alert("ada kesalahan nih jon");
        });
  };

  return (
    <>
      <div id="cloz" className="fixed w-screen z-40">
        <div className="absolute  bg-opacity-60 bg-black visible  w-screen h-screen   ">
          <div className="w-[410px] bg-[#FEC9D1] mx-auto  my-10 rounded-md h-[615px] ">
            <button
              onClick={() => {
                back(false);
              }}
              className="w-[34px] h-[34px] bg-[#916FA1] relative bottom-3  float-right  left-3 text-white font-['poppins'] font-semibold rounded-lg "
            >
              X
            </button>
            <div>
              <h3 className="text-center  mb-[37px] font-['poppins'] text-[26px] font-semibold">
                Pengembalian
              </h3>
            </div>

            <div className=" h-max  flex flex-col">
              <form onSubmit={submitData}>
                <div className=" mx-[29px] h-[470px]">
                  <div className="flex-col flex mx-2 mb-4">
                    <label className="font-['poppins'] text-[26px] font-medium">
                      Pengiriman
                    </label>
                    <input
                      onChange={(e) => {
                        let me = e.target.value;
                        setform({...form, pengiriman: me });
                      }}
                      type="text"
                      className="h-[42px]  ring-1  ring-black rounded-md"
                    />
                  </div>
                  <div className="flex-col flex mx-2 mb-4">
                    <label className="font-['poppins'] text-[26px] font-medium">
                      No Resi
                    </label>
                    <input
                      onChange={(e) => {
                        let me = e.target.value;
                        setform({ ...form, no_resi: me });
                      }}
                      type="text"
                      className="h-[42px]  ring-1  ring-black rounded-md"
                    />
                  </div>
                  
                </div>
                <div className="flex mt-3 mx-[29px]  items-end justify-end">
                  <button
                    onClick={() => {}}
                    type="submit"
                    className="w-[66px] h-[34px] bg-[#916FA1] text-white font-['poppins'] font-semibold rounded-lg "
                  >
                    Next
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RiwayatPengem;
