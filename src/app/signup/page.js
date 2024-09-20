'use client'
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"
import axios from "axios"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { LoaderCircle } from "lucide-react"
import Navbar from "@/components/Navbar"



export default function SignupForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    const { toast } = useToast()

    const router = useRouter();

    useEffect(() => {
        if(localStorage.getItem("token")) router.push("/");
    }, []);

    const handlechange = (e) => {
        if (e.target.name == "name") {
            setName(e.target.value);
        } else if (e.target.name == "email") {
            setEmail(e.target.value);
        } else if (e.target.name == "password") {
            setPassword(e.target.value);
        }
    }

    let SignUp = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        let data = {
            "name": name,
            "email": email,
            "password": password
        }
        try {
            let res = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/singup`, data);
            toast({
                description: res.data.message,
            })
            router.push("/login")
        } catch (error) {
            const axiosError = error
            let errorMessage = axiosError.response?.data.message
            toast({
                variant: "destructive",
                description: errorMessage,
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
        <Navbar />
        <div className="flex items-center justify-center h-[calc(100vh-72px)]">
            <Card className="mx-auto max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">SignUp</CardTitle>
                    <CardDescription>
                        Create your account on PasswordBox.com
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={SignUp} className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Name</Label>
                            <Input
                                onChange={handlechange}
                                name="name"
                                id="name"
                                type="name"
                                placeholder="Name"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                onChange={handlechange}
                                name="email"
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Password</Label>
                            </div>
                            <Input onChange={handlechange} name="password" id="password" type="password" required />
                        </div>
                        <Button type="submit" className="w-full disabled:opacity-60" disabled={isLoading}>
                            {isLoading == false ? 'Sign up' : <><LoaderCircle className="animate-spin mr-2"/> Please wait</>}
                        </Button>
                    </form>
                    <div className="mt-4 text-center text-sm">
                        I have a account?{" "}
                        <Link href="/login" className="underline">
                            login
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
        </>
    )
}
