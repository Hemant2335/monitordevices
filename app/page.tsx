"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import { User } from "./store/atoms/User";
import { useRecoilState } from "recoil";
import Navbar from "./components/Navbar";
import Session from "./components/Session";
import { useSocket } from "./hooks/useSocket";
import { SessionsState } from "./store/atoms/User";

const Homepage = () => {
  const navigate = useRouter();
  const [user, setuser] = useRecoilState(User);
  const [sessions, setsessions] = useRecoilState(SessionsState)
  
  const { socket}  = useSocket(
    "wss://montior-backend.onrender.com"
  );

  const CheckValidSession = async() =>{
    if(typeof window === 'undefined') return ;
    const res = await fetch(`https://montior-backend.onrender.com/api/auth/check-session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authorization" : window.localStorage.getItem("token") || "",
      },
      body: JSON.stringify({
        DeviceId: window.localStorage.getItem("DeviceId") || ""
      }),
    });
    const data = await res.json();
    if(data.Status === false){
      return navigate.push("/Signin");
    }

  }

  const fetchUser = async() =>{
    if(typeof window === 'undefined') return ;
    const res = await fetch(`https://montior-backend.onrender.com/api/auth/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "authorization" : window.localStorage.getItem("token") || ""
      },
      credentials: "include",
    });
    const data = await res.json();
    if (!data) {
      return navigate.push("/Signin");
    }
    if (data.Status === false) {
      return navigate.push("/Signin");
    }
    console.log(data.user);
    setuser(data.user);
  }

  const fetchSession = async() =>{
    if(typeof window === 'undefined') return ;
    const res = await fetch(`https://montior-backend.onrender.com/api/auth/sessions`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "authorization" : window.localStorage.getItem("token") || ""
      },
      credentials: "include",
    });
    const data = await res.json();
    console.log(data);
    setsessions(data);
  }

  useEffect(() => {
    if(typeof window === 'undefined') return ;
    if (!window.localStorage.getItem("token")) {
      console.log("No token");
      return navigate.push("/Signin");
    }
    if(!window.localStorage.getItem("DeviceId")){
      return navigate.push("/Signin");
    }
    CheckValidSession();
  }, [sessions])

  useEffect(() => {
    if(typeof window === 'undefined') return ;
    if (!window.localStorage.getItem("token")) {
      console.log("No token");
      return navigate.push("/Signin");
    }
    if(!window.localStorage.getItem("DeviceId")){
      return navigate.push("/Signin");
    }
    fetchUser();
    CheckValidSession();
    fetchSession();
  }, []);

  return (
    <div className="p-[5vh]">
      <Navbar/>
      <h1 className="text-2xl font-semibold mt-[5vh]">Devices</h1>
      <div className="md:grid md:grid-cols-4 ">
        {sessions && sessions?.map((session : any) => (
          <Session key={session.id} session={session} socket = {socket}/>
        ))}
      </div>
    </div>
  );
};
export default Homepage;
