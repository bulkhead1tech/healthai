"use client"
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Navbar from "@/components/navbar";
import Ailogo from "@/components/chatbotlogo"
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function RootLayout({ children }) {
  const pathname = usePathname();
      
    const isActive = (path) => pathname === path;
  
  return (
    <html lang="en">
      <body 
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar/>
        <div className='h-screen w-screen bg-black'>
        {isActive('/profile') || isActive('/profile')  ?<><div className='h-22'>

</div>
<div className={`h-14 w-full flex justify-center gap-x-5 items-center px-5 `}>
<Link href={'/profile'}  className={`${isActive('/profile') ? 'bg-gradient-to-l rounded-full from-orange-400 to-yellow-500 text-black' : 'text-white rounded-full bg-gray-900 '}`}>
    <div className={`flex justify-center font-sans font-semibold items-center  rounded-full  w-28 h-10`}>Profile</div>
    </Link>
    <Link  href={'/charts'} className={`${isActive('/charts') ? 'bg-gradient-to-l rounded-full from-orange-400 to-yellow-500 text-black' : 'text-white rounded-full bg-gray-900 '}`}>
    <div className={`flex items-center font-sans font-semibold justify-center rounded-full  w-28 h-10`}>Dashboard</div>
    </Link></div></>:<></>}
            {children}
        </div> 
        
       {!isActive('/')?<Ailogo/>:<></>} 


      </body>
    </html>
  );
}
