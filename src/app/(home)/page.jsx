import Image from "next/image";
import Link from "next/link";

export default function page() {
  return (
   <div className=" h-screen w-screen flex items-end">
    <div className="h-[88vh] flex flex-col w-full bg-gradient-to-t from-cyan-950 via-black to-black px-5 gap-y-5">
      <Image className="w-full rounded-4xl" src={"/sbg.svg"} height={100} width={100} />
     <Link href={"/dochome"}>
      <div className=" flex items-center px-4 bg-white  shadow-cyan-900 shadow-lg rounded-4xl gap-x-3 h-20 w-full ">
      <div className="h-16 w-16 rounded-full border-black border-4 p-2 justify-center items-center flex">
      <Image src={"/doctor.png"} height={100} width={100}/> </div>
        <h1 className="text-3xl font-bold text-black">Medical Staff</h1>
      </div>
      </Link>
      <Link href={"/userform"}>
      <div className=" flex items-center px-4 gap-x-4 bg-white shadow-cyan-900 shadow-lg rounded-4xl h-20 w-full ">
      <div className="h-16 w-16 rounded-full border-black border-4 p-2 justify-center items-center flex">
        <Image src={"/patient.png"} height={100} width={100}/> </div>

       <h1 className="text-3xl font-bold text-black">Patient</h1>
      </div></Link>
    </div>
    

   </div>
  );
}
