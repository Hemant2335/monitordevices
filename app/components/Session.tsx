import React from "react";

const Session = ({ session }: any) => {


  const handlesignout = async() =>{
    try {
      const res = await fetch(`http://localhost:8080/api/auth//sessions/${session?.id}/revoke`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await res.json();
    console.log(data);
    if(data.Status === false){
      alert("Something Went Wrong");
    }
    else
    {
      alert(data.message)
    }
    } catch (error) {
      alert("Internal Server Error")
    }
    
  }

  return (
    <div>
      <div className="flex items-center gap-3 bg-[#222222] w-fit p-4">
        <div className=" cursor-pointer overflow-hidden text-[2vh]  font-bold ">
          <div className="flex items-center gap-1">
            Device Name :{" "}
            <h1 className="text-[#EA4B8B]">{session.deviceName}</h1>
          </div>
          <h1>Date : {(session.timestamp as string).slice(0, 10)}</h1>
          <button
            onClick={() => handlesignout()}
            className="bg-[#EA4B8B] font-medium w-fit py-2 px-[2vw] text-sm text-white rounded-lg"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Session;
