"use client"
import React from 'react'
import Image from 'next/image'
import { useEffect,useState } from 'react'
const dashboard = () => {
   const [data, setdata] = useState({});
   useEffect(() => {
       const fetcher = async () => {
         const response = await fetch("/api/user");
         const data = await response.json();
         setdata(data.data[0]);
       };
       fetcher();
     }, []);
  return (
    <div className='w-full h-[80vh] gap-y-5 flex flex-col'>
      <div className='h-10 w-full text-xl flex gap-x-2  font-bold px-5 py-2'>
<h1 className='text-white'>Patient</h1>
<h1 className='text-yellow-400'>details:</h1>

      </div>
    <div className=' h-1/3 w-full px-5 flex'>
    {data.image&&    <Image className=' bg-green-50 w-full h-full rounded-3xl' src={data.image} alt='person' height={100} width={100} />
}
    </div>
    <div className=' h-1/2 w-full px-5 flex flex-col gap-y-3 text-xl font-semibold '>
    <div className='h-10 w-full text-2xl flex gap-x-5 px-5 py-2'>
<h1 className='text-white'>Name:</h1>
<h1 className='text-yellow-400'>{data.name}</h1>

      </div>
      <div className='h-10 w-full text-2xl flex gap-x-5 px-5 py-2'>
<h1 className='text-white'>Age:</h1>
<h1 className='text-yellow-400'>{data.age}</h1>

      </div><div className='h-10 w-full text-2xl flex gap-x-5 px-5 py-2'>
<h1 className='text-white'>Gender:</h1>
<h1 className='text-yellow-400'>{data.gender}</h1>

      </div><div className='h-10 w-full text-2xl flex gap-x-5 px-5 py-2'>
<h1 className='text-white'>Contact:</h1>
<h1 className='text-yellow-400'>{data.contact}</h1>

      </div><div className='h-10 w-full text-2xl flex gap-x-5 px-5 py-2'>
<h1 className='text-white'>Disability:</h1>
<h1 className='text-yellow-400'>{data.disability}</h1>

      </div>
      <div className='h-10 w-full text-2xl flex gap-x-5 px-5 py-2'>
<h1 className='text-white'>Diabetic:</h1>
<h1 className='text-yellow-400'>{data.diabetic?"Yes":"NA"}</h1>

      </div>
    </div>

    </div>
  )
}

export default dashboard