import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
const navbar = () => {
  return (
    <div className= 'absolute left-0 top-0 h-[12vh] w-screen px-5 items-center flex'>
   <Link href={"/"}> <h1 className='font-sans text-white text-3xl font-bold'>Health.ai</h1></Link>
    </div>
  )
}

export default navbar