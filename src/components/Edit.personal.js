import React from "react";
import { useState } from "react";
import axios from "axios";
const EditPersonal = ({call, back}) => {
  let [form, setform] = useState({ akun_sos: "",
    no_wa: "",
    no_sdr: "",
    address: "",
    img_ktp: null,
    img_personal: null,
    img_kk: null,});


  const submitData = () => {
    const formData = new FormData();
    formData.append("no_wa",form.no_wa)
    formData.append("no_sdr",form.no_sdr)
    formData.append("akun_sos",form.akun_sos)
    formData.append("address",form.address)
    formData.append("img_kk",form.img_kk)
    formData.append("img_ktp",form.img_ktp)
    formData.append("img_personal",form.img_personal)

    console.log(form)
    axios
      .post(`http://localhost:8080/datapersonal/add`,formData)
      .then((res) => {
        alert("data diri mu udah ke ganti ya jon");
      })
      .catch((err) => {
        alert("sepertinya data diri  kamu ada kesalah jon, lapor ke admin");
      });
  };

    return (
      <>
        <div id="cloz" className="fixed w-screen z-40">
          <div   className="absolute  bg-opacity-60 bg-black visible  w-screen h-screen   ">
            <div className="w-[410px] bg-[#FEC9D1] mx-auto  my-10 rounded-md h-[615px]  ">
            <button c onClick={()=>{
                    back(false)
                   }} className="w-[34px] h-[34px] bg-[#916FA1] relative bottom-3  float-right  left-3 text-white font-['poppins'] font-semibold rounded-lg ">
                      X
                    </button>
              <div>
                <h3 className="text-center  mb-[37px] font-['poppins'] text-[26px] font-semibold">
                  ubah data diri 
                </h3>
                
              </div>

              <div className=" h-max  flex flex-col">
                <form onSubmit={submitData}>
                  <div className=" mx-[29px] h-[470px] overflow-y-auto">
                  <div className="flex-col flex mx-2 mb-4">
                      <label className="font-['poppins'] text-[26px] font-medium">
                        link profile akun sosmed
                      </label>
                      <input onChange={(e) => {
                        let me = e.target.value;
                        setform({...form, akun_sos: me });
                      }}
                        type="text"
                        className="h-[42px]  ring-1  ring-black rounded-md"
                      />
                    </div>
                    <div className="flex-col flex mx-2 mb-4">
                      <label className="font-['poppins'] text-[26px] font-medium">
                        No Whatsapp
                      </label>
                      <input onChange={(e) => {
                        let me = e.target.value;
                        setform({...form, no_wa: me });
                      }}
                        type="number"
                        className="h-[42px]  ring-1  ring-black rounded-md"
                      />
                    </div>
                    <div className="flex-col flex mx-2 mb-4">
                      <label className="font-['poppins'] text-[26px] font-medium">
                        No Saudara
                      </label>
                      <input onChange={(e) => {
                        let me = e.target.value;
                        setform({...form, no_sdr: me });
                      }}
                        type="number"
                        className="h-[42px]  ring-1  ring-black rounded-md"
                      />
                    </div>
                    <div className="flex-col flex mx-2 mb-4">
                      <label className="font-['poppins'] text-[26px] font-medium">
                        alamat
                      </label>
                      <textarea onChange={(e) => {
                        let me = e.target.value;
                        setform({...form, address: me });
                      }}
                        type="number"
                        className="h-[42px]  ring-1  ring-black rounded-md"
                      />
                    </div>
                   
                    <div className="flex-col flex mx-2 mb-4">
                      <label className="font-['poppins'] text-[26px] font-medium">
                        Foto ktp
                      </label>
                      <input onChange={(e) => {
                        let me = e.target.files[0];
                        setform({...form, img_ktp: me });
                      }}
                        type="file"
                        className="h-[42px]  ring-1  ring-black rounded-md"
                      />
                    </div>
                    <div className="flex-col flex mx-2 mb-4">
                      <label className="font-['poppins'] text-[26px] font-medium">
                        Foto Anda dan data diri
                      </label>
                      <input onChange={(e) => {
                        let me = e.target.files[0];
                        setform({...form, img_personal: me });
                      }}
                        type="file"
                        className="h-[42px]  ring-1  ring-black rounded-md"
                      />
                    </div>
                    <div className="flex-col flex mx-2 mb-4">
                      <label className="font-['poppins'] text-[26px] font-medium">
                        Foto kk
                      </label>
                      <input onChange={(e) => {
                        let me = e.target.files[0];
                        setform({...form, img_kk: me });
                      }}
                        type="file"
                        className="h-[42px]  ring-1  ring-black rounded-md"
                      />
                    </div>
                  </div>
                  <div className="flex mt-3 mx-[29px]  items-end justify-end">
                 
                    <button type="submit" className="w-[66px] h-[34px] bg-[#916FA1] text-white font-['poppins'] font-semibold rounded-lg ">
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

export default EditPersonal;
