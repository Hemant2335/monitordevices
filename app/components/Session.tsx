"use client";

import React from "react";
import { LuLaptop2 } from "react-icons/lu";
import { LuClock4 } from "react-icons/lu";

const Session = ({ session, socket }: any) => {
  const handlesignout = async () => {
    if (typeof window === "undefined") return;
    try {
      const res = await fetch(
        `https://montior-backend.onrender.com/api/auth/sessions/${session?.id}/revoke`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: window.localStorage.getItem("token") || "",
          },
          credentials: "include",
        }
      );
      const data = await res.json();
      console.log(data);
      if (data.Status === false) {
        alert("Something Went Wrong");
      } else {
        socket.send(JSON.stringify({ type: "Remove", session: session }));
        alert(data.message);
      }
    } catch (error) {
      alert("Internal Server Error");
    }
  };

  return (
    <div>
      <div className="bg-[#222222] w-fit p-4 rounded-lg mt-[5vh]">
        <div className="flex items-center gap-[2vw]">
          {session?.deviceName === "Desktop" && (
            <div className="flex items-center">
              <LuLaptop2 className="text-[#EA4B8B] text-lg" />
              <h1 className="text-white text-sm font-semibold ml-2">
                {session?.Browser}
              </h1>
            </div>
          )}
          {session?.deviceName === "Mobile" && (
            <div className="flex items-center">
              <LuLaptop2 className="text-[#EA4B8B] text-lg" />
              <h1 className="text-white text-sm font-semibold ml-2">
                {session?.deviceName}
              </h1>
            </div>
          )}
          {typeof window !== 'undefined' && window.localStorage.getItem("DeviceId") === session?.id && (
            <h1 className="text-[#EA4B8B] text-sm font-semibold ml-2">Current Session</h1>
          )}
          {typeof window !== 'undefined' && window.localStorage.getItem("DeviceId") !== session?.id && (
            <button
            onClick={() => handlesignout()}
            className="bg-[#EA4B8B] font-medium w-fit py-2 px-[2vw] text-sm text-white rounded-lg"
          >
            Sign Out
          </button>
          )}
          
        </div>
        <div className="mt-[2vh] flex items-center">
          <LuClock4 />
            <h1 className="text-white text-sm font-semibold ml-2">
              {session?.timestamp.toString().split("T")[0] + " " + session?.timestamp.toString().split("T")[1].split(".")[0]}
            </h1>
        </div>
      </div>
    </div>
  );
};

export default Session;
