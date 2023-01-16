import React from "react";
import axios from "axios";


const OrderYes = ({ call, back,chara_id }) => {

  // const navigate  = useNavigate()
  // let [booking,setbooking] = useState("");

   const submitData = async  () => {
  
    await axios
      .post( `http://localhost:8080/booking/add/${chara_id.id}`)
      .then((response) => {
        const overa = response.status;
      
   
      })
      .catch((error) => {
        const overa = error.status;
       console.log(overa)
      });
  };


  return (
    <>
      <div id="cloz" className="fixed w-screen z-40">
        <div className="absolute  bg-opacity-60 bg-black visible  w-screen h-screen   ">
          <div className="w-[410px] bg-[#FEC9D1] mx-auto  my-10 rounded-md h-[245px] ">
            <button
              onClick={() => {
                back(false);
              }}
              className="w-[34px] h-[34px] bg-[#916FA1] relative bottom-3  float-right  left-3 text-white font-['poppins'] font-semibold rounded-lg "
            >
              X
            </button>
           
            <div className=" h-max  flex flex-col">
              <form className=" ml-5" onSubmit={()=>{submitData()}}>
                <div className="  h-[170px]">
                  <div className="flex-col flex mx-2 mb-4">
                    <p className="font-['poppins'] text-[26px] font-medium mt-8">
                      Pilihan kamu akan masuk di booking
                    </p>
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

export default OrderYes;
