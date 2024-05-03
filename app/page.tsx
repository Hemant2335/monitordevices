"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import { User } from "./store/atoms/User";
import { useRecoilState } from "recoil";
import Navbar from "./components/Navbar";
import Session from "./components/Session";

const Homepage = () => {
  const navigate = useRouter();
  const [user, setuser] = useRecoilState(User);
  const [sessions, setsessions] = useState([])

  const CheckValidSession = async() =>{
    const res = await fetch(`http://localhost:8080/api/auth/check-session`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await res.json();
    console.log(data);
    if(data.Status === false){
      return navigate.push("/Signin");
    }

  }

  const fetchUser = async() =>{
    const res = await fetch(`http://localhost:8080/api/auth/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
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
    const res = await fetch(`http://localhost:8080/api/auth/sessions`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await res.json();
    console.log(data);
    setsessions(data);
  }


  useEffect(() => {
    if (!getCookie("token")) {
      navigate.push("/Signin");
    }
    fetchUser();
    CheckValidSession();
    fetchSession();
  }, [getCookie("token")]);

  return (
    <div className="p-[5vh]">
      <Navbar/>
      <h1 className="text-2xl font-semibold mt-[5vh]">Devices</h1>
      <div className="grid grid-cols-2 mt-[5vh]">
        {sessions.map((session : any) => (
          <Session key={session.id} session={session}/>
        ))}
      </div>
    </div>
  );
};
export default Homepage;
