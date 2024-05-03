"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import { User } from "./store/atoms/User";
import { useRecoilState } from "recoil";


const Homepage = () => {
  const navigate = useRouter();
  const [user , setuser] = useRecoilState(User);

  useEffect(()=>{
    const token = getCookie("token");
    if(!token) return navigate.push("/Signin");
  },[getCookie("token")])

  return (
    <div className="p-[5vh] mt-[2vh]">
        {!user.is_verified && (
            <div className="bg-red-500 text-white p-2 rounded-md">
                Please verify your email
            </div>
        )}
        <h1 className="text-2xl font-semibold">Devices</h1>
    </div>
  );
};
export default Homepage;
