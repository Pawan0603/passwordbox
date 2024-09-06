'use client'
import { Earth, Eye, EyeOff, Files, X } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import axios from 'axios';
import { useToast } from "@/components/ui/use-toast"

const PasswordDataCard = (props) => {
    let { pwd, PasswordDataCardVisibility, setPasswordDataCardVisibility, deletePWData, token, setPwd, updatePwDataArray, getPwData } = props;
    const [showPassword, setShowPassword] = useState(false);
    const [dissableEditData, setDissableEditData] = useState(true);

    const { toast } = useToast()

    const [sideName, setSideName] = useState("");
    const [identifyar, setIdentifyar] = useState("");
    const [password, setPassword] = useState("");
    const [note, setNote] = useState("");

    const closeCard = () => {
        setShowPassword(false)
        setDissableEditData(true)
        setPasswordDataCardVisibility(false)
        setPwd("")
    }


    useEffect(() => {
        if (pwd) {
            document.getElementById("username").value = pwd.identifyar;
            document.getElementById("password").value = pwd.password;
            document.getElementById("note").value = pwd.note || "No note added";

            setSideName(pwd.sideName);
            setIdentifyar(pwd.identifyar);
            setPassword(pwd.password);
            setNote(pwd.note || "")
        }

    }, [pwd]);

    // Check if pwd has the necessary properties before rendering
    if (!PasswordDataCardVisibility) {
        return null; // Return null if the card should not be visible
    }

    const ShowPW = () => {
        setShowPassword(showPassword ? false : true)
    }

    const handleChange = (e) => {
        if (e.target.name == "username") {
            setIdentifyar(e.target.value);
        } else if (e.target.name == "password") {
            setPassword(e.target.value);
        } else if (e.target.name == "note") {
            setNote(e.target.value);
        }
    }

    const Save = async () => {
        let data = {
            "sideName": sideName,
            "identifyar": identifyar,
            "password": password,
            "note": note
        }
        try {
            let res = await axios.put(`${process.env.NEXT_PUBLIC_HOST}/api/modify-pwdata/${pwd._id}`, data, {
                headers: {
                    'Authorization': `${token}`,
                },
            })
            console.log(res);
            updatePwDataArray(pwd._id, data) // update new data localy 
            // getPwData(token); // update new data from data base
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



    return (
        <div className={`absolute w-screen h-[calc(100vh-72px)] ${PasswordDataCardVisibility == true ? 'flex' : 'hidden'} justify-center bg-white z-10`}>
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
                            {pwd.sideName || 'No Side Name Available'}
                        </p>
                    </section>

                    <section className='md:w-[50%] space-y-4 flex flex-col'>
                        <div className='rounded-3xl overflow-hidden space-y-1'>
                            <div className='flex flex-col bg-gray-50 px-6 py-4 rounded-md'>
                                <label className='text-gray-600' htmlFor='username'>Username</label>
                                <input id='username' name='username' onChange={handleChange} className='bg-transparent text-gray-500 outline-transparent' readOnly={dissableEditData}></input>
                            </div>
                            <div className='bg-gray-50 px-6 py-4 rounded-md flex flex-row justify-between items-center'>
                                <div className='flex flex-col'>
                                    <label className='text-gray-600' htmlFor='password'>Password</label>
                                    <input id='password' name='password' onChange={handleChange} type={`${showPassword ? 'text' : 'password'}`} className='bg-transparent text-gray-500 outline-transparent' readOnly={dissableEditData}></input>
                                </div>
                                <div className='flex flex-row gap-4 items-center'>
                                    <div onClick={ShowPW}>
                                        {showPassword === false ? <button>
                                            <Eye />
                                        </button> : <button>
                                            <EyeOff />
                                        </button>}
                                    </div>
                                    <button className='cursor-copy'>
                                        <Files />
                                    </button>
                                </div>

                            </div>
                        </div>

                        <div className='rounded-3xl overflow-hidden space-y-1'>
                            <div className='flex flex-col bg-gray-50 px-6 py-4 rounded-md'>
                                <label className='text-gray-600' htmlFor='note'>Username</label>
                                <input id='note' name='note' onChange={handleChange} className='bg-transparent text-gray-500 outline-transparent' readOnly={dissableEditData}></input>
                            </div>
                        </div>

                        <div className='flex flex-row gap-3 self-end'>
                            {dissableEditData === true ?
                                <>
                                    <button onClick={() => { setDissableEditData(false) }} className='border border-gray-500 rounded-3xl px-11 py-2 text-sm text-blue-700'>Edit</button>

                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <button className='border border-gray-500 rounded-3xl px-10 py-2 text-sm text-blue-700'>Delete</button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    You want to delete this password data?
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction onClick={() => { deletePWData(pwd._id); closeCard() }}>Delete</AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>

                                </> : <button onClick={() => { setDissableEditData(true); Save() }} className='border border-gray-500 rounded-3xl px-10 py-2 text-sm text-blue-700'>Save</button>}
                        </div>
                    </section>
                </section>
            </div>
        </div>
    )
}

export default PasswordDataCard