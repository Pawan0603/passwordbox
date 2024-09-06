'use client'
import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import Link from "next/link"

const Navbar = () => {
    const [token, setToken] = useState(null);

    useEffect(() => {
        let token = localStorage.getItem("token");
        setToken(token)
    }, []);

    const logout = () =>{
        localStorage.removeItem("token")
        setToken(undefined)
    }
    return (
        <nav className='flex justify-between items-center px-2 md:px-6 py-4 sticky top-0 z-50 shadow-lg '>
            <Link href={'/'}><h1 className='font-bold text-2xl font-cursive'>PasswordBox</h1></Link>
            <div>
                {token === null ? <Button asChild>
                    <Link href="/login">Login</Link>
                </Button> : <Button onClick={logout}>
                    Logout
                </Button>}
            </div>
        </nav>
    )
}

export default Navbar