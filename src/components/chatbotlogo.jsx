import React from 'react'
import Link from 'next/link'
const chatbotlogo = ({}) => {
  return (
  <Link href={"/ai"}>  <div className='absolute bottom-10 right-5 rounded-full h-18 w-18 bg-gradient-to-tr from-pink-950 to-purple-950 shadow-blue-950 shadow-sm flex  flex-row justify-center items-center'>
    <div className='relative h-16 w-16 bg-black rounded-full flex justify-center items-center'>
        <h1 className=' font-bold text-3xl'>Ai</h1>
    </div>
</div></Link>

  )
}

export default chatbotlogo