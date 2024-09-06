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
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { LoaderCircle } from "lucide-react"
import axios from "axios"

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    const { toast } = useToast()

    const router = useRouter();

    useEffect(() => {
        let token = localStorage.getItem("token");
        if(token) {
            router.push("/")
        }
    }, []);

    const handlechange = (e) => {
        if (e.target.name == "email") {
            setEmail(e.target.value);
        } else if (e.target.name == "password") {
            setPassword(e.target.value);
        }
    }

    let handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        let data = {
            "email": email,
            "password": password
        }
        try {
            let res = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/login`, data);
            console.log(res.data.token)
            localStorage.setItem("token", res.data.token)
            toast({
                description: res.data.message,
            })
            router.push("/dashboard")
        } catch (error) {
            const axiosError = error
            let errorMessage = axiosError.response?.data.message
            toast({
                variant: "destructive",
                description: errorMessage ? errorMessage : "error",
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex items-center justify-center h-[calc(100vh-72px)]">
            <Card className="mx-auto max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                onChange={handlechange}
                                id="email"
                                name="email"
                                type="email"
                                placeholder="m@example.com"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Password</Label>
                                <Link href="#" className="ml-auto inline-block text-sm underline">
                                    Forgot your password?
                                </Link>
                            </div>
                            <Input onChange={handlechange} id="password" name="password" type="password" required />
                        </div>
                        <Button type="submit" className="w-full disabled:opacity-60" disabled={isLoading}>
                        {isLoading == false ? 'Login' : <><LoaderCircle className="animate-spin mr-2"/> Please wait</>}
                        </Button>
                    </form>
                    <div className="mt-4 text-center text-sm">
                        Don&apos;t have an account?{" "}
                        <Link href="/signup" className="underline">
                            Sign up
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
