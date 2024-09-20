import Navbar from "@/components/Navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Shield, Zap } from "lucide-react"
import Link from "next/link"
import Redirect from "./redirect"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Redirect />
      <Navbar />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-black text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Secure Your Digital Life with PasswordBox
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl">
                  Store, generate, and manage your passwords with ease. Keep your online accounts safe and accessible.
                </p>
              </div>
              <div className="space-x-4">
                <Link href={"/signup"}>
                  <Button variant="secondary">Get Started</Button>
                </Link>
                <Button variant="secondary">Learn More</Button>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <Shield className="w-8 h-8 mb-2 text-primary" />
                  <CardTitle>Bank-Level Encryption</CardTitle>
                </CardHeader>
                <CardContent>
                  Your passwords are protected with AES-256 encryption, the same standard used by banks and military.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Zap className="w-8 h-8 mb-2 text-primary" />
                  <CardTitle>Quick Access</CardTitle>
                </CardHeader>
                <CardContent>
                  Access your passwords quickly and securely across all your devices with our cloud sync feature.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CheckCircle className="w-8 h-8 mb-2 text-primary" />
                  <CardTitle>Password Health Check</CardTitle>
                </CardHeader>
                <CardContent>
                  Our system regularly checks your passwords for strength and potential vulnerabilities.
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Simple Pricing</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-center">
              <Card>
                <CardHeader>
                  <CardTitle>Free</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold">$0</p>
                  <p className="text-muted-foreground">per month</p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2 text-primary" />
                      Store up to 50 passwords
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2 text-primary" />
                      Basic password generator
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2 text-primary" />
                      Access on one device
                    </li>
                  </ul>
                  <Link href={"/signup"}><Button className="w-full mt-6">Sign Up</Button></Link>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Premium</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold">$4.99</p>
                  <p className="text-muted-foreground">per month</p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2 text-primary" />
                      Unlimited password storage
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2 text-primary" />
                      Advanced password generator
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2 text-primary" />
                      Sync across all devices
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2 text-primary" />
                      Priority customer support
                    </li>
                  </ul>
                  <Button className="w-full mt-6">Get Premium</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section id="cta" className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Secure Your Passwords?
                </h2>
                <p className="mx-auto max-w-[600px] text-primary-foreground/90 md:text-xl">
                  Join thousands of users who trust PasswordBox to keep their digital lives safe and organized.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <Link href={"signup"}><Button variant="secondary" className="w-full">Get Started Now</Button></Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500">© 2023 PasswordBox. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}