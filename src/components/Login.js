import React from "react";
import { Link } from "react-router-dom";
import hero from "../img/hero.png";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom'


const url = "http://localhost:8080/login";
const Login = ({user,admin}) => {
  let Title = () => {
    document.title = "Login";
  };


  const [loging,setLoging] = useState({username:"",password:""});
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
        password: loging.password
      };
   
      axios
        .post(`${url}`,loged)
        .then((response) => {

          if(response.status === 200){
            
            if(response.data.data[0].role === "user"){
            navigate('/dashboard')
            localStorage.setItem('user','user')
            user("user")
            }else if(response.data.data[0].role === "admin"){
              navigate('/admin/dashboard')
              localStorage.setItem('admin','admin')
              admin("admin")
            }

          }
          
        })
        .catch((error)=>{
          if(error.response){
            if(error.response.status === 400){
              alert("ini ada yang kosong fieldnya jon")
            }else if(error.response.status === 500){
              alert("yahh , katasandi/passwordmu kamu salah jon")
            }
            
          }
        });
    }

  let alt = "amogus";

  return (
    <div className="grid grid-cols-5  ring-1 ring-black  ">
      <Title />
      <div className="col-span-3 max-h-screen  overflow-hidden "> 
        <div className="w-44 h-44 rounded-full  animate-[bounce_6s_ease-in-out_infinite] relative left-[-40px] top-[-65px] bg-[#FEC9D1]"></div>
        <div className="relative ">
          <div className="w-[796px] z-10 h-[756px] rounded-full   absolute  top-[20px] left-[-330px] bg-[#FEC9D1]"></div>
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
          className="w-[346px] relative bottom-[80px] left-[0] slide-in-blurred-left z-40"
        />
        <div className="w-[200px] h-[200px]  animate-[bounce_4s_ease-in-out_infinite] rounded-full absolute right-[730px] bottom-[19px] bg-[#FEC9D1]"></div>
      </div>
      <div className=" bg-[#FEC9D1] col-span-2">
        <div className="mt-[120px] flex flex-col ">
          <div className="flex-row flex justify-center mb-7 justify-items-center ">
            <hr className="mt-9 h-[3px] w-[148px] bg-black " />
            <h1 className=" mx-3 font-[poppins] font-extrabold text-[53px]">
              login
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

            <div className="mt-6 mx-auto">
              <button className=" w-[130px]  rounded-md text-[31px] bg-[#916FA1] h-[50px]">
                <p className="text-[26px] font-[poppins] font-semibold text-white">
                  login
                </p>
              </button>
            </div>
          </form>
          <div className="text-center mt-4 ">
            <p className="font-normal font-[poppins]">
              create account,{" "}
              <Link className=" font-extrabold " to="/signup">
                {" "}
                SignUp
              </Link>
            </p>
          </div>

          <div className="flex-row mt-3 flex justify-center mb-7 justify-items-center ">
            <hr className="mt-9 h-[3px] w-[148px] bg-black " />
            <h1 className=" mx-3 font-['poppins'] font-extrabold  text-[53px]">
              or
            </h1>
            <hr className="w-[148px] h-[3px] bg-black mt-9 " />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
