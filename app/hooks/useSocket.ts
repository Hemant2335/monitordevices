"use client";

import { useEffect } from "react";
import { User } from "../store/atoms/User";
import { useRecoilState, useRecoilValue } from "recoil";
import { getCookie } from "cookies-next";
import { SessionsState } from "../store/atoms/User";

export const useSocket = (url: string) => {
  const user = useRecoilValue(User);
  const [Ses , setSes] = useRecoilState(SessionsState);
  let socket: WebSocket | null = new WebSocket(url);
  const id = (typeof window !== 'undefined') ? window.localStorage.getItem("DeviceId") : null;
  const fetchsession = async () => {
    if(typeof window === 'undefined') return ;
    if(id === null) return ;
    const res = await fetch(`https://montior-backend.onrender.com/api/auth/sessions/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authorization" : window.localStorage.getItem("token") || "",
      },
      credentials: "include",
    });
    const data = await res.json();
    console.log(data);
    return data.session;
  };

  useEffect(() => {
    socket.onopen = async () => {
      console.log("Connected to WebSocket");
      const session = await fetchsession();
      socket?.send(JSON.stringify({ type: "Add", session: session }));
    };
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      let prevsesid = null;
      console.log("Got message:", data);
      console.log(Ses);
      if (data.type === "Add") {
        // Check if session with the same ID already exists
        const sessionExists = Ses.some((ses: any) => ses?.id === data.session.id);
        if (sessionExists) {
          console.log("Session Already Exists");
          return;
        }
        if(prevsesid === data.session.id){return ;}
        if(Ses.length <= 0){return ;}
        console.log("Adding Session");
        setSes((prev) => [...prev, data.session as never]);  
        prevsesid = data.session.id;      
      }
      else if (data.type === "Remove") {
        console.log("Removing Session");
        setSes((prev) => prev.filter((ses: any) => ses.id !== data.session.id));
      }
    };    

    return () => {
      console.log("Cleaning up WebSocket");
      socket?.close();
    };
  }, [url,Ses]);

  return { socket };
};
