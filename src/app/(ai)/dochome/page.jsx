"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link';
import { useEffect, useState } from 'react';
const page = () => {
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
    <div className=' h-screen w-full flex flex-col justify-center items-start gap-y-5 px-5'>
      <h1 className='text-2xl text-yellow-400 font-semibold font-sans'>Choose Patient:</h1>
      <div className='h-4/6 w-full '>
      <Link href={"/profile"}><div className=' h-1/6 w-full bg-cover overflow-hidden bg-gray-900 flex items-center justify-start px-5 gap-x-5 rounded-3xl'>
            <Image className=" h-16  rounded-2xl" src={data.image} height={200} width={100} />
            <div className='h-full w-full items-center flex text-4xl'>{data.name}</div>
       </div>
       </Link>
      </div>
      
    </div>
  )
}

export default page