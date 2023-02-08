import React from "react";
import { useState } from "react";
import axios from "axios";

const EditInc = ({call, back,edit}) => {
  let [form, setform] = useState({
    acessories_size: null,
    acessories_name: null,
    chara_id:call["id"]
  });

 
  const submitData = () => {
    axios
      .put(`http://localhost:8080/admin/products/accessories/edit/${edit["acessories_id"]}`, form)
      .then((res) => {
        alert("selamat jon anda buat aksesories");
      })
      .catch((err) => {
        alert("jon kamu gagal buat aksesories");
      });
  };

  return (
    <>
      <div id="cloz" className="fixed w-screen z-40">
        <div className="absolute  bg-opacity-60 bg-black visible  w-screen h-screen   ">
          <div className="w-[410px] bg-[#FEC9D1] mx-auto  my-10 rounded-md h-[615px] ">
            <button
              c
              onClick={() => {
                back(false);
              }}
              className="w-[34px] h-[34px] bg-[#916FA1] relative bottom-3  float-right  left-3 text-white font-['poppins'] font-semibold rounded-lg "
            >
              X
            </button>
            <div>
              <h3 className="text-center  mb-[37px] font-['poppins'] text-[26px] font-semibold">
                Edit Acessories
              </h3>
            </div>

            <div className=" h-max  flex flex-col">
              <form onSubmit={submitData}>
                <div className=" mx-[29px] h-[470px]">
                  <div className="flex-col flex mx-2 mb-4">
                    <label className="font-['poppins'] text-[26px] font-medium">
                      Acessories Name
                    </label>
                    <input
                      type="text"
                      onChange={(e) => {
                        let me = e.target.value;
                        setform({ ...form, acessories_name: me });
                      }}
                      className="h-[42px]  ring-1  ring-black rounded-md"
                    />
                  </div>
                  <div className="flex-col flex mx-2 mb-4">
                    <label className="font-['poppins'] text-[26px] font-medium">
                      Acessories Size
                    </label>
                    <input
                      type="text"
                      onChange={(e) => {
                        let me = e.target.value;
                        setform({ ...form, acessories_size: me });
                      }}
                      className="h-[42px]  ring-1  ring-black rounded-md"
                    />
                  </div>
                </div>
                <div className="flex mt-3 mx-[29px]  items-end justify-end">
                  <button
                    type="submit"
                    className="w-[66px] h-[34px] bg-[#916FA1] text-white font-['poppins'] font-semibold rounded-lg "
                  >
                    Save
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

export default EditInc;
