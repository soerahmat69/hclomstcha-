import React, { useEffect, useState } from "react";

import RiwayatPengem from "./Riwayat.pengembalian";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar.home";
import Card from "./Card.home";


const Home = ({ user }) => {
  let [riwayat, setriwayat] = useState(false);
  let [id, setid] = useState("");
  let navigate = useNavigate();
  let Tit = () => {
    useEffect(() => {
      document.title = "Home";
      
    }, []);
  };

  return (
    <>
      {riwayat === true ? (
        <RiwayatPengem
          call={id}
          back={(riwayat) => {
            setriwayat(riwayat);
          }}
        />
      ) : (
        ""
      )}
      <Navbar />

      <main className="grid mt-[15px] grid-cols-6">
        <div className="col-start-2 px-3  col-span-4">
          <div className="  max-w-max ">
            <h1 className=" font-['poppins']  text-center text-[#916FA1]  font-extrabold text-[111px]">
              <span className="flex h-[130px] justify-center ">
                Get{" "}
                <div className="mx-7 relative flex flex-col h-max w-max  ">
                  <span className="text-[#FEC9D1] stroke">Character</span>
                  <div className=" absolute bottom-5  h-[6px] w-full ring-1 ring-black bg-[#FEC9D1] " />
                </div>
              </span>
              {/* <br/> */}
              You Want!
            </h1>

            <h3 className="font-['poppins'] text-center  mx-3  text-[17px]">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy
            </h3>
          </div>
          <div className="  px-3   justify-items-center	  grid grid-cols-4   gap-28   py-[24px]">

<Card />

</div>
        </div>
      </main>
      <Tit />
    </>
  );
};

export default Home;
