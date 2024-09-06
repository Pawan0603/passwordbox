'use client'
import Image from "next/image";
import Link from "next/link";
import Btn1 from "@/components/myUi/Btn1/Btn1";
import Btn2 from "@/components/myUi/Btn2/Btn2";
import { Lock } from "lucide-react";
import { useEffect, useState } from "react";
import AddPassword from "@/components/AddPassword";

export default function Home() {
  const [Token, setToken] = useState(null);
  const [AddPasswordCardVisibility, setAddPasswordCardVisibility] = useState(false);

  useEffect(() => {
    let token = localStorage.getItem("token");
    console.log(token)
    setToken(token)
  }, []);

  return (
    <main className="flex flex-col items-center px-4 md:px-24 py-12">
      <h1 className="text-3xl md:text-5xl font-bold text-center"><span className="text-red-700">PasswordBox</span> is a password maneger</h1>
      <p className="mt-3 md:mt-4 mb-7 text-base md:text-lg">"Unlock Peace of Mind with PasswordBox."</p>

      {Token !== null ? <>
        <Link className="mb-5" href={'/dashboard'}><Btn1 btnName={"Dashboard"} /></Link>
        <button onClick={()=>{setAddPasswordCardVisibility(true)}}><Btn2 /></button>
        
      </> :
        <Link href={'/signup'}><button
          className="flex gap-3 items-center bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
        >
          Sign Up <Lock size={20} />
        </button></Link>}

        <AddPassword AddPasswordCardVisibility={AddPasswordCardVisibility} setAddPasswordCardVisibility={setAddPasswordCardVisibility}/>
    </main>
  );
}
