import React from "react";
import Image from "next/image";
import { FaMagnifyingGlass , FaBagShopping } from "react-icons/fa6";

const Navbar = () => {
  return (
    <div className="w-full px-[2vw] flex justify-between items-center">
      <div className="flex items-center gap-[2vw]">
        <div className="flex cursor-pointer   text-[3vh] w-fit h-fit font-bold ">
          <Image
            layout="responsive"
            src={require("../assets/dribble.png")}
            className="rounded-xl max-h-[10vh] md:max-h-[12vh]"
            alt="logo"
          />
        </div>
        <ul className="md:flex hidden text-sm font-medium text-gray-700 gap-[2vw]">
          <li>Inspiration</li>
          <li>Find Work</li>
          <li>Learn Design</li>
          <li>Go Pro</li>
          <li>Hire Designers</li>
        </ul>
      </div>
      <div className="flex items-center gap-3">
        <div className="w-[10vw] pl-2 py-2 rounded-md pr-[2vw] text-gray-400 bg-gray-100 hidden md:flex gap-2 items-center">
          <FaMagnifyingGlass />
          <input type="text" placeholder="Search" className="max-w-[4vw] bg-gray-100  focus:outline-none text-gray-600" width={10} />
        </div>
        <FaBagShopping className="text-gray-400 text-lg"/>
        <div className="flex cursor-pointer overflow-hidden w-[5vw] h-[5vw]  text-[3vh] md:w-[2vw] md:h-[2vw] font-bold ">
          <Image
            layout="responsive"
            src={require("../assets/banner.jpg")}
            className="rounded-xl max-h-[10vh] md:max-h-[12vh] object-cover"
            alt="logo"
          />
        </div>
        
        <button className="bg-[#EA4B8B] font-medium w-fit py-2 px-[2vw] text-sm text-white rounded-lg">
          Upload
        </button>
      </div>
    </div>
  );
};

export default Navbar;
