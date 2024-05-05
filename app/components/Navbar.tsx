"use client"

import React ,{useState} from "react";
import { User } from "../store/atoms/User";
import { useRecoilState } from "recoil";
import Twofactor from "./Twofactor";

const Navbar = () => {
  const [user, setuser] = useRecoilState(User);
  const [isClicked, setisClicked] = useState(false);
  return (
    <div className="w-full  flex justify-between items-center">
      {isClicked && (<Twofactor setisClicked = {setisClicked} email = {user.email}/>)}
      <div className="flex items-center gap-[2vw]">
        <div className="flex cursor-pointer text-[#EA4B8B]  text-[3vh] w-fit h-fit font-bold ">
          <h1>MONITOR</h1>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex cursor-pointer overflow-hidden text-[2vh]  font-bold ">
          <div className="flex items-center gap-1">Welcome back ,  <h1 className="text-[#EA4B8B]">{user.username}</h1></div>
        </div>
        {!user.is_verified && (
          <button onClick={()=>setisClicked(true)} className="bg-[#EA4B8B] font-medium w-fit py-2 px-[2vw] text-sm text-white rounded-lg">
          Enable 2fa
        </button>
        )}
        
      </div>
    </div>
  );
};

export default Navbar;
