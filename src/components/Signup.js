import React from "react";
import { Link } from "react-router-dom";
import hero from "../img/hero.png";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom'


const url = "http://localhost:8080/signup";

const SignUp = ({user}) => {
  let Title = () => {
    document.title = "Login";
    if(user !== "user"){
      navigate("/")
    }
  };

  let  [valid, setValid] = useState(false);
  const [loging,setLoging] = useState({username:"",password:"",email:""});
  const navigate = useNavigate()
 
  const valueSubmit = (e) =>{
    const value = e.target.value;
    setLoging({
      ...loging,
      [e.target.name]: value
    });
  }


  // const history = useHistory();
  const submitlogin = (e) => {
      e.preventDefault();
      const loged = {
        username: loging.username,
        password: loging.password,
        email: loging.email
      };

      axios
        .post(`${url}`,loged)
        .then((response) => {
          alert("akun mu sudah di buat jon, jom login")
          
        })
        .catch((error)=>{
        
          if(error.response.status === 500){
            alert("jangan kosong dong fieldnya jon")
          }
          alert("wadoh emailmu ada yang sama jon")
        });
    }



    
  let alt = "amogus";

  return (
    <div className="grid grid-cols-5  ring-1 ring-black  ">
      <Title />
      <div className="col-span-3 max-h-screen  overflow-hidden ">
        <div className="w-44 h-44 rounded-full relative left-[-40px]  animate-[bounce_6s_ease-in-out_infinite] top-[-65px] bg-[#FEC9D1]"></div>
        <div className="relative ">
          <div className="w-[796px] z-10 h-[756px] rounded-full  absolute  top-[20px] left-[-330px] bg-[#FEC9D1]"></div>
          <div className="absolute mt-20 ml-[350px] z-20">
            <p className="text-black font-thin font-['poppins'] text-[79px] ">
              Making Your
              <br />
              Anime <br />
              Life
            </p>
          </div>
        </div>
        <img
          src={hero}
          alt={alt}
          className="w-[346px] relative bottom-[80px] slide-in-blurred-left left-[0]  z-40"
        />
        <div className="w-[200px] h-[200px] rounded-full  animate-[bounce_4s_ease-in-out_infinite] absolute right-[730px] bottom-[19px] bg-[#FEC9D1]"></div>
      </div>
      <div className=" bg-[#FEC9D1] col-span-2">
        <div className="mt-[120px] flex flex-col ">
          <div className="flex-row flex justify-center mb-7 justify-items-center ">
            <hr className="mt-9 h-[3px] w-[148px] bg-black " />
            <h1 className=" mx-3 font-[poppins] font-extrabold text-[53px]">
              Signup
            </h1>
            <hr className="w-[148px] h-[3px] bg-black mt-9 " />
          </div>
          <form className="mx-auto text-center" onSubmit={submitlogin}>
            <div className="my-3 mx-auto">
              <input
                onChange={valueSubmit}
                value={loging.username}
                name="username"
                placeholder="username"
                type="text"
                className="font-['poppins'] ring-1 ring-black w-[290px] py-5 px-3 rounded-md text-[31px] h-[50px]"
              />
            </div>
            <div className="my-3 mx-auto">
              <input
              onChange={valueSubmit}
                      value={loging.password}
                      name="password"
                type="password"
                placeholder="password"
                className=" font-['poppins'] ring-1 ring-black w-[290px] py-5 px-3 rounded-md text-[31px] h-[50px]"
              />
            </div>
            <div className="my-3 mx-auto">
              <input
              onChange={valueSubmit}
                      value={loging.email}
                      name="email"
                type="email"
                placeholder="email@"
                className=" font-['poppins'] ring-1 ring-black w-[290px] py-5 px-3 rounded-md text-[31px] h-[50px]"
              />
            </div>
            <div className="mt-6 mx-auto">
              <button className=" w-[130px]  rounded-md text-[31px] bg-[#916FA1] h-[50px]">
                <p className="text-[26px] font-[poppins] font-semibold text-white">
                  signup
                </p>
              </button>
            </div>
          </form>
          <div className="text-center mt-4 ">
            <p className="font-normal font-[poppins]">
              alredy account ?,{" "}
              <Link className=" font-extrabold " to="/">
                {" "}
                login
              </Link>
            </p>
          </div>

          
        </div>
      </div>
    </div>
  );
};

export default SignUp;
