import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Card = () => {
  const [products, getProduct] = useState("");
  const url = "http://localhost:8080/products";

  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`${url}`)
      .then((response) => {
        const overa = response.data.data;
        getProduct(overa);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          navigate("/");
        }
      });
  }, []);

  if (products.length > 0) {
    return products.map((chara) => {
      return (
        <card className="rounded-md  overflow-hidden drop-shadow-md bg-white w-[180px] h-[270px]" key={chara}>
          <div className={`w-full rounded-md h-[185px] bg-green-500`}></div>
          <div className="px-3 py-2">
            <h1 className="font-reguler font-['poppins']">
              {chara.chara_name}
            </h1>
            <h2 className="font-semibold font-['poppins']">Rp {chara.price}</h2>
            <h4 className="font-reguler text-[13px] font-['poppins']">
              Diorder 10+
            </h4>
          </div>
        </card>
      );
    });
  } else {
    return <div className="text-center">NO DATA</div>;
  }
};

export default Card;
