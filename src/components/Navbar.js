import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Lock } from "lucide-react"

const Navbar = () => {
    return (
        <header className="px-4 lg:px-6 h-14 flex items-center sticky top-0 z-30 bg-white shadow-lg">
            <Link className="flex items-center justify-center" href="/">
                <Lock className="h-6 w-6 mr-2" />
                <span className="font-bold text-lg">PasswordBox</span>
            </Link>
            <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
                <Link className="text-sm font-medium hover:underline underline-offset-4 hidden sm:block" href="/#features">
                    Features
                </Link>
                <Link className="text-sm font-medium hover:underline underline-offset-4 hidden sm:block" href="/#pricing">
                    Pricing
                </Link>
                <Link className="text-sm font-medium hover:underline underline-offset-4 hidden sm:block" href="#contact">
                    Contact
                </Link>
                <Link href="/login">
                    <Button variant="secondary">Login</Button>
                </Link>
            </nav>
        </header>
    )
}

export default Navbar