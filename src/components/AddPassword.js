'use client'
import axios from 'axios';
import { Earth, Eye, EyeOff, X } from 'lucide-react';
import React, { useState } from 'react'
import { useToast } from "@/components/ui/use-toast"

const AddPassword = (props) => {
    let { AddPasswordCardVisibility, setAddPasswordCardVisibility, token } = props;
    const [showPassword, setShowPassword] = useState(false);

    const [sideName, setSideName] = useState("");
    const [identifyar, setIdentifyar] = useState("");
    const [password, setPassword] = useState("");
    const [note, setNote] = useState("");

    const { toast } = useToast();

    const closeCard = () => {
        setShowPassword(false)
        setAddPasswordCardVisibility(false)
    }

    const ShowPW = () => {
        setShowPassword(showPassword ? false : true)
    }

    const handleFormData = (e) => {
        if (e.target.name == "sideName") {
            setSideName(e.target.value);
        } else if (e.target.name == "username") {
            setIdentifyar(e.target.value);
        } else if (e.target.name == "password") {
            setPassword(e.target.value);
        } else if (e.target.name == "note") {
            setNote(e.target.value);
        }
    }

    const SaveData = async (e) => {
        e.preventDefault();
        let data = {
            "token": token,
            "sideName": sideName,
            "identifyar": identifyar,
            "password": password,
            "note": note
        }
        try {
            let res = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/add-pwdata`, data);
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
        } finally {
            closeCard();
        }
    }

    return (
        <div className={`absolute w-screen h-[calc(100vh-72px)] ${AddPasswordCardVisibility == true ? 'flex' : 'hidden'} justify-center bg-white z-10`}>
            <div className='flex flex-col bg-white border rounded-2xl h-fit mx-3 w-full max-w-[45rem] py-6 px-5'>
                <section className='flex flex-row justify-between mb-4'>
                    <p className='text-gray-400'>passwordbox.com</p>
                    <button onClick={closeCard}>
                        <X />
                    </button>
                </section>

                <section className='flex flex-col md:flex-row md:justify-between'>
                    <section className='flex flex-row gap-2 mb-4'>
                        <Earth />
                        <p>
                            {'No Side Name Available'}
                        </p>
                    </section>

                    <form onSubmit={SaveData} className='md:w-[50%] space-y-4 flex flex-col'>

                        <div className='rounded-3xl overflow-hidden space-y-1'>
                            <div className='flex flex-col bg-gray-50 px-6 py-4 rounded-md'>
                                <label className='text-gray-600' htmlFor='sideName'>Side name / app name</label>
                                <input onChange={handleFormData} id='sideName' name='sideName' className='bg-transparent text-gray-500 outline-transparent' placeholder='http://xyz.com' required></input>
                            </div>
                        </div>

                        <div className='rounded-3xl overflow-hidden space-y-1'>
                            <div className='flex flex-col bg-gray-50 px-6 py-4 rounded-md'>
                                <label className='text-gray-600' htmlFor='username'>Username</label>
                                <input onChange={handleFormData} id='username' name='username' className='bg-transparent text-gray-500 outline-transparent' placeholder='Username / email' required></input>
                            </div>
                            <div className='bg-gray-50 px-6 py-4 rounded-md flex flex-row justify-between items-center'>
                                <div className='flex flex-col'>
                                    <label className='text-gray-600' htmlFor='password'>Password</label>
                                    <input onChange={handleFormData} id='password' name='password' type={`${showPassword ? 'text' : 'password'}`} className='bg-transparent text-gray-500 outline-transparent' placeholder='........' requiredgfdg></input>
                                </div>
                                <div className='flex flex-row gap-4 items-center'>
                                    <div onClick={ShowPW}>
                                        {showPassword === false ? <button>
                                            <Eye />
                                        </button> : <button>
                                            <EyeOff />
                                        </button>}
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className='rounded-3xl overflow-hidden space-y-1'>
                            <div className='flex flex-col bg-gray-50 px-6 py-4 rounded-md'>
                                <label className='text-gray-600' htmlFor='note'>Note</label>
                                <input onChange={handleFormData} id='note' name='note' className='bg-transparent text-gray-500 outline-transparent' placeholder='add note...'></input>
                            </div>
                        </div>

                        <div className='flex flex-row gap-3 self-end'>
                            <button type='submit' className='border border-gray-500 rounded-3xl px-10 py-2 text-sm text-blue-700'>Save</button>
                        </div>
                    </form>
                </section>
            </div>
        </div>
    )
}

export default AddPassword