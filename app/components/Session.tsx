import React from 'react'

const Session = ({session} : any) => {
  return (
    <div>
        <div className="flex items-center gap-3 bg-[#222222] w-fit p-4">
            <div className="flex cursor-pointer overflow-hidden text-[2vh]  font-bold ">
            <div className="flex items-center gap-1">Device Name :  <h1 className="text-[#EA4B8B]">{session.deviceName}</h1></div>
            </div>
        </div>
    </div>
  )
}

export default Session