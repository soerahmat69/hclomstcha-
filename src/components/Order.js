import React from "react";
import Aside from "./Aside";
import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import OrderYes from "./Order.yes";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Order = ({ user }) => {
  let url = "http://localhost:8080/products";
  let id = useParams();
  let [chara, getChara] = useState([]);
  let [acessories, setacessories] = useState([]);
  let [getorderz, setorderyes] = useState(false);
  let navigate = useNavigate();

  useEffect(()=>{
    if (user !== "user") {
      navigate("/login");
    }
  })
  let Tit = () => {

    useEffect(() => {
      document.title = "Order";
      
    }, []);
  };

  function ngorder() {
    if (getorderz === false) {
      setorderyes(true);
    }
  }
  useEffect(() => {
    axios
      .get(`${url}/${id.id}`)
      .then((response) => {
        const overa = response.data.data;
        getChara(overa);
      })
      .catch((response) => {});
      axios
      .get(`http://localhost:8080/acessories/${id.id}`)
      .then((response) => {
        const overa = response.data.data;
        console.log(overa)
        setacessories(overa);
      
      })
      .catch((response) => {});
  
  }
  , []);

  return chara.map((charas) => {
    console.log(charas)
    return (
      <>
        <div className=" overflow-x-hidden">
          {getorderz === true ? (
            <OrderYes
              call={getorderz}
              back={(getorderz) => {
            
                setorderyes(getorderz);
              }}
              chara_id={id}
            />
          ) : (
            ""
          )}

          <Navbar />

          <Aside />

          <main className="grid mt-[70px] grid-cols-6">
            <div className="col-start-2 px-3  col-span-4">
              <div className="flex items-center   flex-row">
                <h1 className="mr-[26px] font-['poppins']  whitespace-nowrap text-[39px]">
                  {charas.chara_name}
                </h1>
                <div className=" h-[3px] w-full bg-black " />
              </div>
              <div className="   justify-items-start  flex gap-20   py-[24px]">
                {/* <div className=" " /> */}
                <div
                  style={{
                    backgroundImage: `url(http://localhost:8080/etc/images/${charas.chara_img})`,
                  }}
                  className="rounded-xl bg-cover bg-center w-[325px]  h-[415px]"
                ></div>
                <div className=" h-full  w-[280px]  justify-around flex flex-auto">
                  <div className=" justify-start ">
                    <h3 className=" py-2 text-[30px] font-['poppins']">
                      custome size
                    </h3>
                    
                    {acessories.map((res)=>{
                      if(res.chara_id === charas.chara_id){
                        return(
                        <h3 className=" py-2 text-[30px] font-['poppins']">
                        {res.acessories_name}
                      </h3>
                        )
                      }
                    })}                   
                  </div>
                  <div className="text-center ">
                    <h3 className=" py-2 text-[30px] font-['poppins'] font-semibold">
                      {charas.chara_size}
                    </h3>
                    {acessories.map((res)=>{
                      if(res.chara_id === charas.chara_id){
                        return(
                       <h3 className=" py-2 text-[30px] font-['poppins'] font-semibold">
                       {res.acessories_id ?(res.acessories_size)?res.acessories_size :"✔": "❌"}
                     </h3>
                        )
                      }
                    })}                   
                  </div>
                  <div className="items-center flex border-l-4 border-black">
                    <h3 className=" px-3 py-2 text-[30px] font-['poppins'] font-semibold">
                      Rp {charas.price}/3DAY
                    </h3>
                  </div>
                </div>
              </div>
              <div className=" left-[930px] bottom-20 relative">
                <button
                  onClick={() => {
                    ngorder();
                    console.log("bengakk");
                  }}
                  className=" absolute w-[130px]  rounded-md text-[31px] bg-[#916FA1] h-[50px]"
                >
                  <p className="text-[26px] font-[poppins] font-semibold text-white">
                    booking
                  </p>
                </button>
              </div>
            </div>
          </main>
          <Tit />
        </div>
      </>
    );
  });
};

export default Order;
