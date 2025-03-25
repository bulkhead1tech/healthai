"use client"
import React from 'react'
import { useState } from 'react';
import dynamic from 'next/dynamic';
const chatbot = () => {
    const[input, setinput]= useState("");
    const [data, setdata] = useState("")
    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
          const response = await fetch("/api/gemini", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ input }),
          });
          const data = await response.json();
          setdata(data.result.response.candidates[0].content.parts[0].text)
        } catch (error) {
          console.log(error);
        }
        setinput('')
      };
  return (
    <div className='h-5/6 w-full px-2'>
        <div className={`bg-gray-900 rounded-4xl text-xl h-3/4 flex flex-row items-start justify-start px-5 py-5 overflow-auto ${data==""?"animate-pulse":""}`}>
        {data}
        </div>
        <div className=' w-full h-1/4 flex items-center justify-center py-2  '>
        <div className=' h-20 w-full flex items-center gap-x-2 py-2'>
    <input type="text" onInput={(e)=>setinput(e.target.value) } value={input}  className='h-15 outline-none text-white placeholder:text-gray-500 px-5 text-xl w-4/5 rounded-full bg-gray-900 border-black border-2' placeholder='Search Here!'/>
        <button onClick={handleSubmit} className='border-black border-2 w-15 h-15 rounded-full focus:animate-[ping_0.5s_ease-in-out] bg-gray-900'>s</button>
        </div>
        </div>
    </div>
  )
}

export default dynamic (() => Promise.resolve(chatbot), {ssr: false})