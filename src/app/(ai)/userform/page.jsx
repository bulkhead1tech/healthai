"use client"
import React from 'react'
import { useState } from 'react';
import dynamic from 'next/dynamic';
const page = () => {
  const [manual, setmanual] =useState(false)
  const [formData, setFormData] = useState({
    userName: "",
    activity: "",
    cardio_fitness: "",
    electrocardiogram: "",
    heartrate: "",
    irregular_rhythm_notifications: "",
    nutrition: "",
    oxygen_saturation: "",
    profile: "",
    respiratory_rate: "",
    sleep: "",
    temperature: "",
    weight: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

const refresh =async()=>{
  await fetch("/api/fitrefresh")
}
const handleSubmit = async(e) => {
      e.preventDefault();
  
      try {
        const response = await fetch("/api/fitness_data", {
          method:"POST",
          headers:{
            "Content-Type": "application/json"
          },
          body: JSON.stringify({formData})
        })
        const data = await response.json();
         console.log(data.message);
        alert(data.message)
        
      } catch (error) {
        console.log(error)
      }
  
    };
  

  return (
<div className='h-screen w-screen'>
        <div className='h-22 flex flex-row justify-end items-center px-5'>
      {manual && <button onClick={()=>setmanual(!manual)} className='h-10 z-10 w-20 px-5 text-black text-xl rounded-lg font-normal font-sans py-2 bg-gradient-to-r from-yellow-500 to-orange-500'>Back</button>
    }
        </div>
      {manual? <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-md">
      <input
        type="text"
        name="userName"
        value={formData.userName}
        onChange={handleChange}
        placeholder="User Name"
        className="block w-full border-gray-300 border p-2 rounded-md"
      />

      {Object.keys(formData)
        .filter((key) => key !== "userName")
        .map((key) => (
          <div key={key}>
            <label htmlFor={key} className="block mb-2 capitalize">
              {key.replace(/_/g, " ")}
            </label>
            <input
              type="text"
              name={key}
              value={formData[key]}
              onChange={handleChange}
              placeholder={`Enter ${key.replace(/_/g, " ")}`}
              className="block w-full border-gray-300 border outline-none p-2 rounded-md"
            />
          </div>
        ))}

      <button
        type="submit"
        className="bg-yellow-500 text-black px-4 py-2 w-full rounded-md hover:bg-yellow-700"
      >
        Submit
      </button>
    </form>
:<><div className='w-full h-[80vh] justify-center flex flex-col items-center gap-y-5'>
  <button onClick={refresh} className='h-20 w-4/5 px-5 py-2 bg-gradient-to-r rounded-2xl text-black text-3xl font-semibold from-yellow-500 to-orange-500'>Send my data</button>
  <button onClick={()=>setmanual(!manual)} className='h-20 w-4/5 px-5 text-black text-3xl rounded-2xl font-semibold py-2 bg-gradient-to-r from-yellow-500 to-orange-500'>Go manual</button>

  </div></>} 
        </div>  )
}

export default dynamic (() => Promise.resolve(page), {ssr: false})