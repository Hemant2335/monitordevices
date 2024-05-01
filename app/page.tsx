"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { cookies } from "next/headers";
import { checktoken } from "./ServerActions/checktoken";

type PostType = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

const Homepage = () => {
  const navigate = useRouter();

  useEffect(()=>{
    let a ;
    const check = async() =>{
       a = await checktoken();
    }
    check();
    console.log(a);
    if(!a) return navigate.push("/login");
  },[])

  return (
    <div className="p-[5vh] mt-[2vh]">
        <h1 className="text-2xl font-semibold">Devices</h1>
    </div>
  );
};
export default Homepage;
