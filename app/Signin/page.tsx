"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { User } from "../store/atoms/User";
import { useSetRecoilState } from "recoil";
import Twofactor from "../components/Twofactor";
import { browserName ,  isMobile } from "react-device-detect";


const Signin = () => {
  const [Email, setEmail] = useState<string | null>(null);
  const [Password, setPassword] = useState<string | null>(null);
  const [Warning, setWarning] = useState<string | null>(null);
  const [isClicked, setisClicked] = useState(false);
  const setUser = useSetRecoilState(User);
  const navigate = useRouter();
  const handlelogin = async () => {
    try {
      console.log(browserName , isMobile);
      if(browserName === undefined && isMobile === undefined){return ;}
      const res = await fetch(`https://montior-backend.onrender.com/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: Email,
          password: Password,
          browsername: browserName ? browserName : "",
          devicename : (isMobile) ? ("Mobile") : ("Desktop")
        }),
        credentials: "include",
      });

      const data = await res.json();
      console.log(data);
      if (!data) {
        return setWarning("Something Went Wrong");
      }
      if (data.Status === false) {
        setWarning(data.error);
        return;
      }
      setUser(data.user);
      console.log(data);
      if(typeof window !== 'undefined')
      window.localStorage.setItem("DeviceId", data.DeviceId);
      if(!data.user.is_verified && typeof window !== 'undefined'){
        window.localStorage.setItem("token", data.token);
        return navigate.push("/");
      }
      else {
        setisClicked(true);
      }
      
    } catch (error) {
      console.log(error);
      return setWarning("Internal Server Error");
    }
  };

  return (
    <div className="flex">
      {isClicked && (<Twofactor setisClicked = {setisClicked} email = {Email}/>)}
      <div className="md:flex hidden cursor-pointer  text-[3vh] w-[40vw] h-screen font-bold ">
        <Image
          src={require("../assets/banner.jpg")}
          className=" object-cover w-full h-full"
          alt="logo"
        />
      </div>
      <div className="md:w-[60vw]  w-full justify-center  flex-col flex h-[100vh]">
        <div>
          <span className=" gap-2 text-sm font-medium p-4 fixed top-0 right-0 text-left flex float-end">
            New to OneChat ?{" "}
            <a
              className="text-blue-400 cursor-pointer"
              onClick={() => navigate.push("/Signup")}
            >
              Sign up
            </a>
          </span>
        </div>

        <div className="md:px-[12vw]  flex flex-col   m-[5vh] ">
          <h1 className=" font-black text-[3.5vh] mb-[3vh]">
            Sign in to OneChat
          </h1>
          {Warning && (
            <h2 className="text-red-400 font-medium text-[2vh] pt-[2vh] pb-[3vh]">
              • {Warning}
            </h2>
          )}
          <div className="flex  flex-col justify-center  gap-[4vh]">
            <div>
              <h1 className="font-black text-[2.1vh] mb-[0.7vh]">Email</h1>
              <input
                type="text"
                placeholder="eg. test@gmail.com"
                className="bg-[#F3F3F3] w-full text-sm font-medium focus:outline-none p-[1.6vh] rounded-md"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div>
              <h1 className="font-black text-[2.1vh] mb-[0.7vh]">Password</h1>
              <input
                type="text"
                placeholder="6+ characters"
                className="bg-[#F3F3F3] w-full text-sm font-medium focus:outline-none p-[1.6vh] rounded-md"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <button
              className="bg-[#EA4B8B] w-fit py-2 px-[2vw] text-white rounded-lg"
              onClick={() => handlelogin()}
            >
              Login
            </button>
            <p className="text-[1.5vh] md:max-w-[20vw] text-gray-700 font-medium">
              This site is protected by reCAPTCHA and the Google{" "}
              <a className="text-blue-400 text-[1.7vh]">Privacy Policy</a> and{" "}
              <a className="text-blue-400 text-[1.7vh]">Terms of Service</a>{" "}
              apply
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
