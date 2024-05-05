import { useEffect } from "react";
import { User } from "../store/atoms/User";
import { useRecoilState, useRecoilValue } from "recoil";
import { getCookie } from "cookies-next";
import { SessionsState } from "../store/atoms/User";

export const useSocket = (url: string) => {
  const user = useRecoilValue(User);
  const [Ses , setSes] = useRecoilState(SessionsState);
  let socket: WebSocket | null = new WebSocket(url);
  const id = getCookie("DeviceId");
  const fetchsession = async () => {
    const res = await fetch(`http://montior-backend.onrender.com/api/auth/sessions/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await res.json();
    console.log(data);
    return data.session;
  };

  useEffect(() => {
    if(!user.email) return ;
    socket.onopen = async () => {
      console.log("Connected to WebSocket");
      const session = await fetchsession();
      socket?.send(JSON.stringify({ type: "Add", session: session }));
    };
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Got message:", data);
      if (data.type === "Add") {
        const check = Ses.map((ses: any) => {
          if (ses?.id === data.session.id) {
            return true;
          }
          return false;
        });
        if (check.includes(true)) {
          console.log("Session Already Exists");
          return;
        }
        console.log("Adding Session");
        setSes((prev)=>[...prev , data.session as never]);
      }
      else if(data.type === "Remove")
      {
        console.log("Removing Session");
        setSes((prev)=>prev.filter((ses : any)=> ses.id !== data.session.id));
      }
    };

    return () => {
      console.log("Cleaning up WebSocket");
      socket?.close();
    };
  }, [user]);

  return { socket };
};
