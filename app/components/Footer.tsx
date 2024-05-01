"use client";
import React from "react";
import Image from "next/image";
import {
  FaDribbble,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaPinterest,
} from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="px-[5vw]">
    <div className=" grid grid-cols-2 gap-5 md:gap-0 md:flex justify-between py-[5vh]">
      <div className=" flex flex-col">
        <div className="flex cursor-pointer text-[3vh]  w-fit h-fit font-bold ">
          <Image
            layout="responsive"
            src={require("../assets/dribble.png")}
            className="rounded-xl max-h-[10vh] md:max-h-[12vh]"
            alt="logo"
          />
        </div>
        <p className="md:max-w-[18vw] text-left text-[2vh] ">
          Dribble is the world&apos;s leading community for creatives to share, grow,
          and get hired
        </p>
        <div className="flex mt-[3vh] text-gray-700 gap-2 text-[3vh]">
          <FaDribbble />
          <FaTwitter />
          <FaFacebookF />
          <FaInstagram />
          <FaPinterest />
        </div>
      </div>
      <ul className="flex flex-col mt-[4vh] gap-[1.5vh] text-[2vh] text-gray-700">
        <li className="font-bold">For designers</li>
        <li>Help</li>
        <li>Contact</li>
        <li>Careers</li>
        <li>Terms</li>
        <li>Guidelines</li>
        <li>Privacy</li>
      </ul>
      <ul className="flex flex-col mt-[4vh] gap-[1.5vh] text-[2vh] text-gray-700">
        <li className="font-bold">Hire designers</li>
        <li>Testimonials</li>
        <li>API</li>
        <li>Request Features</li>
        <li>Available on iOS</li>
        <li>Available on Android</li>
        <li className="font-bold  mt-[2vh]">Brands</li>
        <li>Testimonials</li>
        <li>API</li>
        <li>Request Features</li>
        <li>Available on iOS</li>
        <li>Available on Android</li>
      </ul>
      <ul className="flex flex-col mt-[4vh] gap-[1.5vh] text-[2vh] text-gray-700">
      <li className="font-bold">Company</li>
        <li>Media Kit</li>
        <li>DMCA</li>
        <li>Design Assets</li>
        <li>Shop</li>
        <li>Stories</li>
        <li>Themes</li>
      </ul>
      <ul className="flex flex-col mt-[4vh] gap-[1.5vh] text-[2vh] text-gray-700">
      <li className="font-bold">Directories</li>
        <li>Media Kit</li>
        <li>DMCA</li>
        <li>Design Assets</li>
        <li>Shop</li>
        <li>Stories</li>
        <li>Themes</li>
        <li className="font-bold  mt-[2vh]">Design assets</li>
        <li>Testimonials</li>
        <li>API</li>
        <li>Request Features</li>
        <li>Available on iOS</li>
        <li>Available on Android</li>
      </ul>
      <ul className="flex flex-col mt-[4vh] gap-[1.5vh] text-[2vh] text-gray-700">
      <li className="font-bold">Design Resources</li>
        <li>Media Kit</li>
        <li>DMCA</li>
        <li>Design Assets</li>
        <li>Shop</li>
        <li>Stories</li>
        <li>Themes</li>
      </ul>
    </div>
    <div className=" border-t-2 md:flex justify-between  text-gray-700 text-center py-[4vh]">
      <p className="text-[1.8vh]">
        © 2023 Dribbble. All rights reserved.
      </p>
      <div className="text-[1.8vh] justify-center flex items-center gap-2">
        <span className="font-bold text-black">20,501,853</span> shots dribbled 
        <div className="flex cursor-pointer text-[3vh]  w-fit h-fit font-bold ">
          <Image
            layout="responsive"
            src={require("../assets/social.png")}
            className="rounded-xl max-h-[3vh] md:max-h-[3vh]"
            alt="logo"
          />
        </div>
      </div>
    </div>
    </div>
  );
};

export default Footer;
