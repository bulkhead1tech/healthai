"use client"
import React from 'react'

import { useEffect, useState } from 'react';
const page = () => {
  const [data, setdata] = useState([]);
     useEffect(() => {
         const fetcher = async () => {
           const response = await fetch("/api/fitbit");
           const data = await response.json();
           setdata(data.data);
           console.log(data.data)
         };
         fetcher();
       }, []);
  return (
    <div className=' h-screen w-full flex flex-col justify-center items-start gap-y-5 px-5'>
      <h1 className='text-2xl text-yellow-400 font-semibold font-sans'>Fitbit data:</h1>
      <div className='h-4/6 w-full'>
<div className=' h-5/6 w-full bg-cover text-white overflow-hidden bg-gray-900 flex items-center justify-start px-5 gap-x-5 rounded-3xl'>
            <div className='h-full w-full items-center flex flex-col text-xl'>
            {data.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 overflow-y-scroll w-full">
          {data.map((entry, index) => (
            <div key={index} className="p-4 bg-gray-900 text-white rounded-lg">
              <h2 className="text-lg font-semibold mb-2">
                {Object.keys(entry)[0].replace("activities-", "").toUpperCase()}
              </h2>
              {Object.values(entry)[0].map((subEntry, subIndex) => (
                <div key={subIndex}>
                  {subEntry.dateTime}: {subEntry.value}
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">Loading data...</p>
      )}



            </div>
       </div>
      </div>
      
    </div>
  )
}

export default page