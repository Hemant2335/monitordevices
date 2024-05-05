"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { FiX } from "react-icons/fi";
import { User } from "../store/atoms/User";
import { useRecoilState } from "recoil";
import { useRouter } from "next/navigation";

const Twofactor = ({ setisClicked  , email}: any) => {
  const [qrurl, setqrurl] = useState("");
  const [isScanned, setisScanned] = useState(false);
  const [Code, setCode] = useState("");
  const [user, setuser] = useRecoilState(User);
  const router = useRouter();

  const fetchqrcode = async () => {
    if(user.is_verified){return ;}
    const res = await fetch("https://montior-backend.onrender.com/api/auth/enable-2fa", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await res.json();
    console.log(data.URL);
    setqrurl(data.URL);
  };

  const handleverify = async() =>{
    const res = await fetch("https://montior-backend.onrender.com/api/auth/verify-2fa", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body : JSON.stringify({
            token : Code,
            email : email
        })
    })
    const data = await res.json();
    console.log(data);
    if(data.Status === false){
        alert(data.error);
        return;
    }
    alert("Two Factor Authentication Enabled Successfully");
    setuser({...user , is_verified : true});
    setisClicked(false);
    router.push("/");
  }

  useEffect(() => {
    fetchqrcode();
  }, []);

  return (
    <div className="flex h-full fixed w-screen top-0 z-50 left-0 justify-center items-center  bg-[rgba(34,34,34,0.5)]">
      <div className="bg-black relative p-[5vh] flex flex-col justify-center items-center rounded-lg">
        <div>
          <button
            className="absolute m-[2vh] p-1 bg-[#1a1a1a] text-xl text-white rounded-md top-0 right-0 hover:text-[#ff5757]"
            onClick={() => {
              setisClicked(false);
            }}
          >
            <FiX />
          </button>
        </div>
        {!isScanned && !user.is_verified && (
          <>
            <h1 className="text-2xl font-semibold">
              Enable Two Factor Authentication
            </h1>
            <Image
              src={decodeURIComponent(qrurl)}
              alt={"Qrcode"}
              width={200}
              height={200}
              className="m-4"
            />
            <h1>Please Scan this Qr code using any authenticator app</h1>
            <button
              onClick={() => setisScanned(true)}
              className="bg-[#EA4B8B] font-medium w-[30vw] py-2 px-[2vw] text-sm text-white rounded-lg mt-[2vh]"
            >
              Next
            </button>
          </>
        )}
        {(isScanned || user.is_verified) && (
            <div>
            <h1 className="text-2xl font-semibold">
              Verify Two Factor Authentication
            </h1>
            <input
              type="text"
              placeholder="eg. 789234"
              className="bg-[#F3F3F3] w-full text-sm font-medium my-[5vh] focus:outline-none p-[1.6vh] rounded-md"
              onChange={(e) => {
                setCode(e.target.value);
              }}
            />
            <h1>Please Enter the Code to Verify</h1>
            <button
              onClick={() => handleverify()}
              className="bg-[#EA4B8B] font-medium w-[30vw] py-2 px-[2vw] text-sm text-white rounded-lg mt-[2vh]"
            >
              Next
            </button>
          </div>
        )}
        
      </div>
    </div>
  );
};

export default Twofactor;
