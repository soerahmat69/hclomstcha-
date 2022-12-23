import React, { useEffect } from "react";
import Aside from "./Aside";
import Navbar from "./Navbar";

const Order = () => {
  let Tit = () => {
    useEffect(() => {
      document.title = "Order";
    }, []);
  };

  return (
    <div className=" overflow-x-hidden">
      <div className="fixed w-screen z-40">
        <div className="absolute  bg-opacity-60 bg-black  w-screen h-screen   ">
          <div className="w-[410px] bg-[#FEC9D1] mx-auto flex-row  my-10 rounded-md h-[615px]">
            <div>
              <h3 className="text-center mb-[37px] font-['poppins'] text-[26px] font-semibold">
                pritirin
              </h3>
            </div>
            <div className=" mx-[29px]">
         <ul className="list-disc">
          <li className="my-3 whitespace-normal text-justify	">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
</li>
<li className=" whitespace-normal my-3 text-justify	">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
</li>
<li className=" whitespace-normal my-3 text-justify	">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
</li>
         </ul>
            </div>
          </div>
        </div>
      </div>
      <Navbar />

      <Aside />

      <main className="grid mt-[70px] grid-cols-6">
        <div className="col-start-2 px-3  col-span-4">
          <div className="flex items-center   flex-row">
            <h1 className="mr-[26px] font-['poppins']  whitespace-nowrap text-[39px]">
              Name Chara
            </h1>
            <div className=" h-[3px] w-full bg-black " />
          </div>
          <div className="   justify-items-start  flex gap-20   py-[24px]">
            <div className="  rounded-xl bg-slate-500 w-[325px]  h-[415px] " />
            <div className=" h-full  w-[280px]  justify-around flex flex-auto">
              <div className=" justify-start ">
                <h3 className=" py-2 text-[30px] font-['poppins']">
                  custome size
                </h3>
                <h3 className=" py-2 text-[30px] font-['poppins']">
                  accessories
                </h3>
                <h3 className=" py-2 text-[30px] font-['poppins']">wig</h3>
                <h3 className=" py-2 text-[30px] font-['poppins']">
                  shooes size
                </h3>
                <h3 className=" py-2 text-[30px] font-['poppins']">weapon</h3>
              </div>
              <div className="text-center ">
                <h3 className=" py-2 text-[30px] font-['poppins'] font-semibold">
                  L
                </h3>
                <h3 className=" py-2 text-[30px] font-['poppins'] font-semibold">
                  ✔
                </h3>
                <h3 className=" py-2 text-[30px] font-['poppins'] font-semibold">
                  ✔
                </h3>
                <h3 className=" py-2 text-[30px] font-['poppins'] font-semibold">
                  38
                </h3>
                <h3 className=" py-2 text-[30px] font-['poppins'] font-semibold">
                  ✔
                </h3>
              </div>
              <div className="items-center flex border-l-4 border-black">
                <h3 className=" px-3 py-2 text-[30px] font-['poppins'] font-semibold">
                  138.000/3DAY
                </h3>
              </div>
            </div>
          </div>
          <div className=" left-[930px] bottom-20 relative">
            <button className=" absolute w-[130px]  rounded-md text-[31px] bg-[#916FA1] h-[50px]">
              <p className="text-[26px] font-[poppins] font-semibold text-white">
                booking
              </p>
            </button>
          </div>
        </div>
      </main>
      <Tit />
    </div>
  );
};

export default Order;
