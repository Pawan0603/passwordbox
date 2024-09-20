'use client'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useToast } from "@/components/ui/use-toast"
import { ChevronRight, CirclePlus, Earth } from 'lucide-react';
import PasswordDataCard from '@/components/PasswordDataCard';
import AddPassword from '@/components/AddPassword';


const Page = () => {
  const router = useRouter();
  const [token, setToken] = useState();
  const [pwData, setPwData] = useState("");
  const [pwd, setPwd] = useState(null); // pwd = password data
  const [PasswordDataCardVisibility, setPasswordDataCardVisibility] = useState(false);
  const [AddPasswordCardVisibility, setAddPasswordCardVisibility] = useState(false);

  const { toast } = useToast()

  const getPwData = async (Token) => {
    try {
      let res = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/get-pwdata`, {
        headers: {
          'Authorization': `${Token}`,
        },
      })
      console.log("this is res : ", res.data.data[0].pwData);
      setPwData(res.data.data[0].pwData)
      toast({
        description: res.data.message,
      })
    } catch (error) {
      const axiosError = error
      let errorMessage = axiosError.response?.data.message
      toast({
        variant: "destructive",
        description: errorMessage ? errorMessage : "error",
      })
    }
  }

  const OpenPasswordData = (id) => {
    const found = pwData.find(item => item._id === id)
    setPwd(found);
    setPasswordDataCardVisibility(true)
  }

  const deletePWData = async (pwd_id) => {
    console.log(pwd_id)
    try {
      let res = await axios.delete(`${process.env.NEXT_PUBLIC_HOST}/api/delete-pwdata/${pwd_id}`, {
        headers: {
          'Authorization': `${token}`,
        },
      })
      const updatedPwData = pwData.filter(item => item._id !== pwd_id); // updating array
      setPwData(updatedPwData);
      toast({
        description: res.data.message,
      })

    } catch (error) {
      const axiosError = error
      let errorMessage = axiosError.response?.data.message
      toast({
        variant: "destructive",
        description: errorMessage ? errorMessage : "error",
      })
    }
  }

  useEffect(() => {
    console.log("this is window type : ", typeof window);
    
    if (typeof window != 'undefined') {
      // Access localStorage here
      let TOKEN = localStorage.getItem("token");
      if (!localStorage.getItem("token")) {
        router.push("/login");
      } else {
        setToken(TOKEN);
        getPwData(TOKEN);
      }
    }
    
    
  }, []);

  const updatePwDataArray = (pwd_id, newData) => {
    // Ensure pwData is an array before performing operations
    if (!Array.isArray(pwData)) return;

    // Create a new array with the updated data
    const updatedPwData = pwData.map(item =>
      item._id === pwd_id ? { ...item, ...newData } : item
    );

    // Update the state with the new array
    setPwData(updatedPwData);
  }

  return (
    <div className='w-screen h-auto flex justify-center py-4 relative'>

      <PasswordDataCard pwd={pwd} setPwd={setPwd} PasswordDataCardVisibility={PasswordDataCardVisibility} setPasswordDataCardVisibility={setPasswordDataCardVisibility} deletePWData={deletePWData} token={token} updatePwDataArray={updatePwDataArray} getPwData={getPwData}/>

      <AddPassword AddPasswordCardVisibility={AddPasswordCardVisibility} setAddPasswordCardVisibility={setAddPasswordCardVisibility} token={token}/>

      <div className='flex flex-col sm:border border-gray-200 rounded-xl mx-3 w-full max-w-[45rem] px-5 py-6'>
        <section className='flex justify-between items-center border-b pb-4'>
          <h1 className='hidden sm:block'>{pwData != "" ? pwData.length : "-"} sites</h1>
          <form className="form relative flex items-center">
            <button className="absolute left-2 -translate-y-1/2 top-1/2 p-1">
              <svg
                width="17"
                height="16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-labelledby="search"
                className="w-5 h-5 text-gray-700"
              >
                <path
                  d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9"
                  stroke="currentColor"
                  strokeWidth="1.333"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </button>
            <input
              className="input rounded-full px-8 py-3 border-2 border-transparent focus:outline-none focus:border-blue-500 placeholder-gray-400 transition-all duration-300 shadow-md"
              placeholder="Search password"
              required=""
              type="text"
            />
            <button type="reset" className="absolute right-3 -translate-y-1/2 top-1/2 p-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </form>
        </section>
        <section className='flex flex-col w-full'>
          <div onClick={() => setAddPasswordCardVisibility(true)} className='flex justify-between px-3 py-4 border-b hover:bg-slate-100 hover:cursor-pointer transform transition-transform duration-300 md:hover:translate-x-2'>
            <div className='flex items-center gap-3 text-blue-600'>
              <CirclePlus />
              <p className='font-bold'>Add Password</p>
            </div>
            {/* <ChevronRight /> */}
          </div>
          {pwData != "" ? pwData.map((e) => {
            return <div key={e._id} onClick={() => OpenPasswordData(e._id)} className='flex justify-between px-3 py-4 border-b hover:bg-slate-100 hover:cursor-pointer transform transition-transform duration-300 md:hover:translate-x-2'>
              <div className='flex items-center gap-3'>
                <Earth />
                <p>{e.sideName}</p>
              </div>
              <ChevronRight />
            </div>
          }) : <p className='py-3 px-4'>empty</p>}


        </section>
      </div>
    </div>
  )
}

export default Page