import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Card = () => {
  const [products, getProduct] = useState([]);
  const [Sum, setSum] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/products")
      .then((response) => {
        const overa = response.data.data;
        getProduct(overa);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          navigate("/");
        }
      });
      axios
      .get("http://localhost:8080/product/summary")
      .then((response) => {
        const overa = response.data.data;
        setSum(overa);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          navigate("/");
        }
      });
  },[]);

  function order(id){
    navigate("/order/" + id);
  }

  if (products.length > 0) {
    return products.map((chara) => {
 
      return (
        <button onClick={()=>{
          order(chara.chara_id)
        }} className="rounded-md  overflow-hidden drop-shadow-md bg-[#D9D9D9]] bg-white w-[180px] h-[270px]" key={chara.chara_id}>
          <div className="bg-contain bg-center">
          <img className="w-full rounded-md h-[185px] " src={`http://localhost:8080/etc/images/${chara.chara_img}`}></img>
          </div><div  className="px-3 py-2">
            <h1 className="font-reguler text-start font-['poppins']">
              {chara.chara_name}
            </h1>
            <h2 className="font-semibold text-start font-['poppins']">Rp {chara.price}</h2>
            {Sum.map((res)=>{
            //  if(res.chara_id === chara.chara_id){
                return(
                  <h4 className="font-reguler text-start text-[13px] font-['poppins']">{(res.chara_id === chara.chara_id)? "Diorder "+res.jumlah:""}</h4>
                )
              // }else{
              //   return(
              //     <h4 className="font-reguler text-start text-[13px] font-['poppins']">Di order 0 </h4>
              //   )
              //   }
              })}
          
          </div>
        </button>
      );
    });
  } else {
    return <div className="absolute">NO DATA</div>;
  }
};

export default Card;
