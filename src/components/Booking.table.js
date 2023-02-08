import React, { useEffect,useState } from "react";
import axios from "axios";


const TableBooking = ({call,back,ttl}) => {

  const [getBooking,setBooking] = useState([])
  let [a,seta] = useState("")
  
  let values = () => Array
  .from(document.querySelectorAll('input[type="checkbox"]'))
  .filter((checkbox) => checkbox.checked)
  .map((checkbox) => parseInt(checkbox.value));

  const checkboxes = [...document.querySelectorAll("input[type=checkbox]")];
  // let val = () => Array
  // .from(document.querySelectorAll('input[type="checkbox"]'))
  // .filter((checkbox) => checkbox.checked)
  // .map((dark) => parseInt(dark));

  // console.log(val)

  useEffect(() => {
    axios
      .get("http://localhost:8080/booking")
      .then((response) => {
        const overa = response.data.data; 
        setBooking(overa);
      })
      .catch((error) => {
       
      });
  },[]);
  
  if(getBooking.length > 0){
    return getBooking.map((res)=>{
  return (
    <>
            <tr className="bg-white border-b  " key={res.order_id}>
                <th scope="row" className="py-4 px-6 font-medium text-center  whitespace-nowrap ">
                    {/* <div className=""></div> */}
                    <img className="mx-auto w-[120px] rounded-md h-[140px] bg-black " src={`http://localhost:8080/etc/images/${res.chara_img}`}></img>
         
                </th>
                <td className="py-4 px-6 text-center  font-['poppins'] ">
                    {res.chara_name}
                </td>
                <td className="py-4 px-6 text-center  font-['poppins'] ">
                {res.chara_size}
                </td>
                <td className="py-4 px-6 text-center  font-['poppins'] ">
                Rp {res.price}
                <input type="hidden" name="numekoz" value={res.price}/>
                </td>
                <td className="py-4 px-6 flex  gap-2 justify-center my-[30%] items-center">
                <div className="flex flex-row  items-center   ">
                    <input
                 
                onChange={()=>{
                  back(values)
                  ttl( checkboxes.reduce((total, el) =>
                  total + (el.checked ? Number(el.dataset.amount) : 0),
                  0
              ))
                }}    data-amount={res.price}
                      value={res.order_id}
                      name="booking"
                      className="mr-2"
                      
                      type="checkbox"
                    />
                     
                    
                    
                    <p className="font-['poppins'] font-semibold ">
                      agreement
                    </p>
                  </div></td>
            </tr>
          

      </>
  );})}else{
    return(
      <h1 className="text-center">no data</h1>
    )
  }
};

export default TableBooking;
