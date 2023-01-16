import React from "react";
import { useState } from "react";
import axios from "axios";

const AddProd = ({call, back}) => {
let [form,setform] = useState({chara_name: "",
    chara_size: "",
    price: "",
    chara_weight:"",
    chara_img: null,})

  const submitData = () =>{
    const formData = new FormData()
    formData.append("chara_name",form.chara_name)
    formData.append("chara_size",form.chara_size)
    formData.append("price",form.price)
    formData.append("chara_weight",form.chara_weight)
    formData.append("chara_img",form.chara_img)

    axios.post(`http://localhost:8080/admin/products/add`,formData).then((res)=>{
console.log(res.data)
    }).catch((err)=>{
console.log(err)
    })
  }

    return (
      <>
        <div id="cloz" className="fixed w-screen z-40">
          <div   className="absolute  bg-opacity-60 bg-black visible  w-screen h-screen   ">
            <div className="w-[410px] bg-[#FEC9D1] mx-auto  my-10 rounded-md h-[615px] ">
            <button c onClick={()=>{
                    back(false)
                   }} className="w-[34px] h-[34px] bg-[#916FA1] relative bottom-3  float-right  left-3 text-white font-['poppins'] font-semibold rounded-lg ">
                      X
                    </button>
              <div>
                <h3 className="text-center  mb-[37px] font-['poppins'] text-[26px] font-semibold">
                  Add Product
                </h3>
                
              </div>

              <div className=" h-max  flex flex-col">
                <form onSubmit={submitData}>
                  <div className=" mx-[29px] h-[470px]">
                  <div className="flex-col flex mx-2 mb-4">
                      <label className="font-['poppins'] text-[26px] font-medium">
                        upload gambar
                      </label>
                      <input
                        type="file" onChange={(e)=>{
                          let me = e.target.files[0] 
                        setform({...form,chara_img: me})
                      }}
                        className="h-[42px]  ring-1  ring-black rounded-md"
                      />
                    </div>
                    <div className="flex-col flex mx-2 mb-4">
                      <label className="font-['poppins'] text-[26px] font-medium">
                        nama karakter anime
                      </label>
                      <input
                        type="text" onChange={(e)=>{
                          let me = e.target.value 
                        setform({...form,chara_name: me})
                      }}
                        className="h-[42px]  ring-1  ring-black rounded-md"
                      />
                    </div>
                    <div className="flex-col flex mx-2 mb-4">
                      <label className="font-['poppins'] text-[26px] font-medium">
                        ukuran kostum
                      </label>
                      <input
                        type="text" onChange={(e)=>{
                          let me = e.target.value 
                        setform({...form,chara_size: me})
                      }}
                        className="h-[42px]  ring-1  ring-black rounded-md"
                      />
                    </div>
                    <div className="flex-col flex mx-2 mb-4">
                      <label className="font-['poppins'] text-[26px] font-medium">
                        berat kostum
                      </label>
                      <input
                        type="number" onChange={(e)=>{
                          let me = e.target.value 
                        setform({...form,chara_weight: me})
                      }}
                        className="h-[42px]  ring-1  ring-black rounded-md"
                      />
                    </div>
                    <div className="flex-col flex mx-2 mb-4">
                      <label className="font-['poppins'] text-[26px] font-medium">
                        harga sewa
                      </label>
                      <input
                        type="number" onChange={(e)=>{
                          let me = e.target.value 
                        setform({...form,price: me})
                      }}
                        className="h-[42px]  ring-1  ring-black rounded-md"
                      />
                    </div>
                 
                  </div>
                  <div className="flex mt-3 mx-[29px]  items-end justify-end">
                 
                    <button type="submit" className="w-[66px] h-[34px] bg-[#916FA1] text-white font-['poppins'] font-semibold rounded-lg ">
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

export default AddProd;
