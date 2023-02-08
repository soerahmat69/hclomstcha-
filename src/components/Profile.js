import React, { useEffect,useState } from "react";
import Aside from "./Aside";
import Navbar from "./Navbar";
import EditProfil from "./Edit.profle";
import EditPassword from "./Edit.password";
import EditPersonal from "./Edit.personal";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = ({user}) => {
  let [profileC,setProfileC] = useState(false)
  let [PersonC,setPersonC] = useState(false)
  let [PasswordC,setPasswordC] = useState(false)
  let [getprofile,setProfile] = useState(false)
  let [getpersonal,setpersonal]= useState("")
let navigate = useNavigate()

  let Tit = () => {
    useEffect(() => {
      document.title = "Profile";
      if(user !== "user"){
        navigate("/")
      }
    
    }, []);
  };
  useEffect(() => {
    axios
      .get("http://localhost:8080/profile")
      .then((response) => {
        const overa = response.data.data;
        setProfile(overa);
   
      })
      .catch((error) => {
        // if (error.response.status === 401) {
        //   navigate("/");
        // }
      });

      axios
      .get("http://localhost:8080/datapersonal")
      .then((response) => {
        const overa = response.data.data;
        setpersonal(overa);
    
      })
      .catch((error) => {
        // if (error.response.status === 401) {
console.log(error)
        // }
      });
  },[]);

  function EditPw(){
    if(PasswordC === false ){
      setPasswordC(true)
 
    }

  } 
  function EditPr(){
    
    if(profileC === false ){
      setProfileC(true)
 
    }

  }
  function EditPs(){
    
    if(PersonC === false ){
      setPersonC(true)
 
    }

  } 
 
  if(getprofile.length > 0){
  return getprofile.map((res)=>{
    let email = res.email;
   
  return (
    <>
   {(profileC === true)? <EditProfil call={profileC} back={(profileC)=>{setProfileC(profileC)}}  />:""}
   {(PasswordC === true)? <EditPassword call={PasswordC} back={(PasswordC)=>{setPasswordC(PasswordC)}}  />:""}
   {(PersonC === true)? <EditPersonal call={PersonC} back={(PersonC)=>{setPersonC(PersonC)}}  />:""}
   
      <Navbar />

      <Aside />

      <main className="grid mt-[70px] grid-cols-6">
        <div className="col-start-2 px-3  col-span-4">
          <div className="flex items-center   flex-row">
            <h1 className="mr-[26px] font-['poppins']  whitespace-nowrap text-[39px]">
              Profile
            </h1>
            <div className=" h-[3px] w-full bg-black " />
          </div>
          <div className="  px-3   justify-items-center	  grid grid-cols-2   py-[24px]">

          <div className="flex flex-col justify-end  w-full">
            <div className="  rounded-full w-[275px] h-[275px]  bg-gray-500"></div>

            <div className=" mt-7 flex flex-col gap-3 ">
            <div onClick={()=>{
   EditPw()
            }} className="font-['poppins'] font-medium text-[20px] cursor-pointer">🤐 Change Password</div>
            <div onClick={()=>{
   EditPr()
            }} className="font-['poppins'] font-medium text-[20px] cursor-pointer">😎 Change Profile</div>
            <div onClick={()=>{
   EditPs()
            }} className="font-['poppins'] font-medium text-[20px] cursor-pointer">🤡 Change Personal Data</div>
            </div>
          </div>

        <div className="flex flex-row w-full  mt-10 justify-between ">
          <div className="text-start">
            <div >
              <h1 className="font-['poppins'] mb-[31px] text-[35px]">Username</h1>
            </div>
            <div>
              <h1 className="font-['poppins'] mb-[31px] text-[35px]">Email</h1>
            </div>
            <div>
              <h1 className="font-['poppins'] text-[35px]">Personal Data</h1>
              {(getpersonal.length <= 0)? 
              <div>
              <div className="flex items-center">
                 <div className="w-[15px] h-[15px] bg-red-600 rounded-full mx-2"></div>
                  <h1 className="font-['poppins'] text-[20px]">Uknown Adrress</h1>
             </div>
             <div className="flex items-center">
                 <div className="w-[15px] h-[15px] bg-red-600 rounded-full mx-2"></div>
                  <h1 className="font-['poppins'] text-[20px]">Uknown Name</h1>
 </div>
            <div className="flex items-center">
               <div className="w-[15px] h-[15px] bg-red-600 rounded-full mx-2"></div>
                 <h1 className="font-['poppins'] text-[20px]">Uknown Number Phone</h1>
            </div>
            </div> :""} 
             
            </div>
           
          </div>
          
          <div className=" text-end">
          <div>
              <h1 className="font-['poppins'] mb-[31px]  font-medium text-[30px]">{res.username}</h1>
            </div>
            <div>
              <h1 className="font-['poppins'] mb-[31px] font-medium  text-[30px]">{(email.length > 8)? email.substring(0,8)+"...": email}</h1>
            </div>
            <div>
              <h1 className="font-['poppins'] font-medium mb-[31px]  text-[30px]">{(getpersonal.length > 0 )?Math.floor(Object.keys(getpersonal[0]).length * 14.28571428571429): "0"}%</h1>
            </div>
          </div>
          </div>
          </div>
        </div>
      </main>
      <Tit />
      </>
  );})
          }
};

export default Profile;
