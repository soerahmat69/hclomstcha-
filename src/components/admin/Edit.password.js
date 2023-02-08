import React from "react";
import { useState } from "react";
const EditPassword = ({call, back}) => {

  let [form,setform] = useState({password: null,retype : null})

  function submitData(){
    console.log("la")
  }

    return (
      <>
        <div id="cloz" className="fixed w-screen z-40">
          <div   className="absolute  bg-opacity-60 bg-black visible  w-screen h-screen   ">
            <div className="w-[410px] bg-[#FEC9D1] mx-auto  my-10 rounded-md h-[615px] ">
            <button onClick={()=>{
                    back(false)
                   }} className="w-[34px] h-[34px] bg-[#916FA1] relative bottom-3  float-right  left-3 text-white font-['poppins'] font-semibold rounded-lg ">
                      X
                    </button>
              <div>
                <h3 className="text-center  mb-[37px] font-['poppins'] text-[26px] font-semibold">
                  Change Password
                </h3>
                
              </div>

              <div className=" h-max  flex flex-col">
                <form onSubmit={(form.password === form.retype)?submitData:""}>
                  <div className=" mx-[29px] h-[470px]">
                  
                    <div className="flex-col flex mx-2 mb-4">
                      <label className="font-['poppins'] text-[26px] font-medium">
                        New Password
                      </label>
                      <input onChange={(e)=>{
                        let me = e.target.value;
                        setform({password:me})
                      }}
                        type="password"
                        className="h-[42px]  ring-1  ring-black rounded-md"
                      />
                    </div>
                    <div className="flex-col flex mx-2 mb-4">
                      <label className="font-['poppins'] text-[26px] font-medium">
                        Re-type New Password
                      </label>
                      <input onChange={(e)=>{
                        let me = e.target.value;
                        setform({retype:me})
                      }}
                        type="password"
                        className="h-[42px]  ring-1  ring-black rounded-md"
                      />
                    </div>
                  </div>
                  <div className="flex mt-3 mx-[29px]  items-end justify-end">
                 
                    <button className="w-[66px] h-[34px] bg-[#916FA1] text-white font-['poppins'] font-semibold rounded-lg ">
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

export default EditPassword;
