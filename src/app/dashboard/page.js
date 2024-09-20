'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Switch } from "@/components/ui/switch"
import { ChevronDown, Key, Lock, LogOut, Menu, Pencil, Plus, Search, Settings, Shield } from "lucide-react"
import Link from "next/link"
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'
import axios from 'axios';
import ViewPasswordCard from '@/components/ViewPasswordCard'

export default function Dashboard() {
  const [selectedPassword, setSelectedPassword] = useState(null)
  const [showPassword, setShowPassword] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [passwords, setPasswords] = useState("")
  const [filteredPasswords, setFilteredPasswords] = useState(passwords)
  const [isAddPasswordOpen, setIsAddPasswordOpen] = useState(false)
  const [newPassword, setNewPassword] = useState({ website: '', username: '', password: '', note: '' })
  const [isAccountSettingsOpen, setIsAccountSettingsOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [token, setToken] = useState();
  const [userName, setUserName] = useState(null);
  const [accountSettings, setAccountSettings] = useState({
    email: '',
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorAuth: false,
  })
  const router = useRouter()
  const { toast } = useToast()

  const getPwData = async (Token) => {
    console.log("getPwData running")
    try {
      let res = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/get-pwdata`, {
        headers: {
          'Authorization': `${Token}`,
        },
      })
      console.log("this is res : ", res.data.data[0].pwData);
      setPasswords(res.data.data[0].pwData)
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

  const getTokenData = async (token) => {
    let data = { "token": token };
    let res = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/get-tokenData`, data)
    setUserName(res.data.data.name)

    setAccountSettings(prev => ({
      ...prev,
      email: res.data.data.email
    }))
  }

  useEffect(() => {
    if (typeof window != 'undefined') {
      // Access localStorage here
      let TOKEN = localStorage.getItem("token");
      let darkMode = localStorage.getItem("darkMode")
      if (!localStorage.getItem("token")) {
        router.push("/login");
      } else {
        setToken(TOKEN);
        getPwData(TOKEN);
        getTokenData(TOKEN);
      }

      if (darkMode !== null) {
        setIsDarkMode(darkMode)
      }
    }
  }, []);

  useEffect(() => {
    if (passwords.length > 0) {
      const results = passwords.filter(password =>
        password.sideName.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredPasswords(results)
    }

  }, [searchTerm, passwords])

  useEffect(() => {
    // Apply dark mode to the entire application
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  const handleViewPassword = (password) => {
    setSelectedPassword(password);
    setShowPassword(false)
  }

  const handleAddPassword = async (e) => {
    e.preventDefault();
    let data = {
      "token": token,
      "sideName": newPassword.website,
      "identifyar": newPassword.username,
      "password": newPassword.password,
      "note": newPassword.note
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
      setNewPassword({ website: '', username: '', password: '', note: '' })
      setIsAddPasswordOpen(false)
      getPwData(token)
    }
  }

  const handleAccountSettingsChange = (e) => {
    const { name, value, type, checked } = e.target
    setAccountSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))

    if (name === 'darkMode') {
      setIsDarkMode(checked)
    }
  }

  const handleAccountSettingsSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send the updated settings to your backend
    console.log('Updated account settings:', accountSettings)
    setIsAccountSettingsOpen(false)
  }

  const deletePWData = async (pwd_id) => {
    console.log(pwd_id)
    try {
      let res = await axios.delete(`${process.env.NEXT_PUBLIC_HOST}/api/delete-pwdata/${pwd_id}`, {
        headers: {
          'Authorization': `${token}`,
        },
      })
      const updatedPwData = passwords.filter(item => item._id !== pwd_id); // updating array
      setPasswords(updatedPwData);
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

  const Logout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token")
      router.push('/')
    }
  }

  return (
    <div className={`flex h-screen ${isDarkMode ? 'dark' : ''}`}>
      {/* Sidebar for larger screens */}
      <aside className="hidden md:flex flex-col w-64 bg-white dark:bg-gray-800 border-r dark:border-gray-700">
        <div className="flex items-center justify-center h-14 border-b dark:border-gray-700">
          <Lock className="h-6 w-6 mr-2 text-primary dark:text-white" />
          <span className="font-bold text-lg dark:text-white">PasswordBox</span>
        </div>
        <nav className="flex-1 overflow-y-auto">
          <ul className="p-2 space-y-1">
            <li>
              <Link href="#" className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
                <Shield className="h-5 w-5 mr-3" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="#passwordCard" className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
                <Key className="h-5 w-5 mr-3" />
                Passwords
              </Link>
            </li>
            <li>
              <Link href="#" className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
                <Settings className="h-5 w-5 mr-3" />
                Settings
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden bg-gray-100 dark:bg-gray-900">
        {/* Header */}
        <header className="flex items-center justify-between px-2 sm:px-6 py-4 bg-white dark:bg-gray-800 border-b dark:border-gray-700">
          <div className="flex items-center">
            {/* Mobile menu button */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64">
                <SheetHeader>
                  <SheetTitle>PasswordBox</SheetTitle>
                  <SheetDescription>Navigate your secure vault</SheetDescription>
                </SheetHeader>
                <nav className="flex flex-col mt-4">
                  <Link href="#" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
                    <Shield className="h-5 w-5 mr-3" />
                    Dashboard
                  </Link>
                  <Link href="#passwordCard" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
                    <Key className="h-5 w-5 mr-3" />
                    Passwords
                  </Link>
                  <Link href="#" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
                    <Settings className="h-5 w-5 mr-3" />
                    Settings
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
            <h1 className="text-xl font-semibold ml-2 dark:text-white">Dashboard</h1>
          </div>
          <div className="flex items-center">
            <Button className="hidden sm:block" variant="ghost" size="icon">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" className="ml-2">
                  <span className="mr-2 dark:text-white">{userName === null ? "---" : userName}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Account</SheetTitle>
                  <SheetDescription>Manage your account settings</SheetDescription>
                </SheetHeader>
                <div className="mt-4 space-y-2">
                  <Button variant="outline" className="w-full justify-start" onClick={() => setIsAccountSettingsOpen(true)}>
                    <Settings className="mr-2 h-4 w-4" />
                    Account Settings
                  </Button>
                  <Button onClick={Logout} variant="outline" className="w-full justify-start">
                    <LogOut className="mr-2 h-4 w-4" />
                    Log Out
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Password Strength Overview */}
            <Card className="dark:bg-gray-800 dark:text-white">
              <CardHeader>
                <CardTitle>Password Strength</CardTitle>
                <CardDescription className="dark:text-gray-300">Overall security score</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Score: 85%</span>
                    <span className="text-green-600 font-semibold">Good</span>
                  </div>
                  <Progress value={85} className="w-full" />
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="dark:bg-gray-800 dark:text-white">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription className="dark:text-gray-300">Last 3 actions</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="text-sm">Password changed for: Netflix</li>
                  <li className="text-sm">New password added: GitHub</li>
                  <li className="text-sm">Logged in from new device</li>
                </ul>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="dark:bg-gray-800 dark:text-white">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription className="dark:text-gray-300">Manage your passwords</CardDescription>
              </CardHeader>
              <CardContent className="flex">
                <Dialog open={isAddPasswordOpen} onOpenChange={setIsAddPasswordOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Password
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="dark:bg-gray-800">
                    <DialogHeader>
                      <DialogTitle className="dark:text-white">Add New Password</DialogTitle>
                      <DialogDescription className="dark:text-gray-300">Enter the details for the new password entry.</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleAddPassword} className="space-y-4">
                      <div>
                        <Label htmlFor="website" className="dark:text-white">Website</Label>
                        <Input
                          id="website"
                          value={newPassword.website}
                          onChange={(e) => setNewPassword({ ...newPassword, website: e.target.value })}
                          className="outline-transparent dark:bg-gray-700 dark:text-white"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="username" className="dark:text-white">Username</Label>
                        <Input
                          id="username"
                          type="email"
                          value={newPassword.username}
                          onChange={(e) => setNewPassword({ ...newPassword, username: e.target.value })}
                          className="outline-transparent dark:bg-gray-700 dark:text-white"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="password" className="dark:text-white">Password</Label>
                        <Input
                          id="password"
                          type="password"
                          value={newPassword.password}
                          onChange={(e) => setNewPassword({ ...newPassword, password: e.target.value })}
                          className="outline-transparent dark:bg-gray-700 dark:text-white"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="note" className="dark:text-white">Note</Label>
                        <Input
                          id="note"
                          value={newPassword.note}
                          onChange={(e) => setNewPassword({ ...newPassword, note: e.target.value })}
                          className="outline-transparent dark:bg-gray-700 dark:text-white"
                        />
                      </div>
                      <Button type="submit" className="dark:bg-primary dark:text-primary-foreground">Add Password</Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </div>

          {/* Password List */}
          <Card id="passwordCard" className="mt-6 dark:bg-gray-800 dark:text-white">
            <CardHeader>
              <CardTitle>Your Passwords</CardTitle>
              <CardDescription className="dark:text-gray-300">Securely stored passwords</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Input
                  type="search"
                  placeholder="Search passwords..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="dark:bg-gray-700 dark:text-white"
                />
              </div>
              {filteredPasswords.length === 0 ? (
                <p className="text-center text-gray-500 dark:text-gray-400">No passwords found</p>
              ) : (
                <ul className="space-y-2">
                  {filteredPasswords.map((password) => (
                    <li key={password._id} className="flex items-center justify-between p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                      <div className="flex items-center">
                        <Lock className="h-5 w-5 mr-2 text-primary dark:text-white" />
                        <span>{password.sideName}</span>
                      </div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm" onClick={() => handleViewPassword(password)}>View</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px] dark:bg-gray-800">
                          <DialogHeader>
                            <DialogTitle className="dark:text-white">{selectedPassword?.sideName}</DialogTitle>
                            <DialogDescription className="dark:text-gray-300">Password details</DialogDescription>
                          </DialogHeader>
                          <ViewPasswordCard selectedPassword={selectedPassword} setSelectedPassword={setSelectedPassword} deletePWData={deletePWData} setShowPassword={setShowPassword} showPassword={showPassword} token={token} getPwData={getPwData}/>
                        </DialogContent>
                      </Dialog>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </main>
      </div>

      {/* Account Settings Dialog */}
      <Dialog open={isAccountSettingsOpen} onOpenChange={setIsAccountSettingsOpen}>
        <DialogContent className="sm:max-w-[425px] bg-white dark:bg-gray-800">
          <DialogHeader>
            <DialogTitle className="dark:text-white">Account Settings</DialogTitle>
            <DialogDescription className="dark:text-gray-300">Update your account preferences here.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAccountSettingsSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="dark:text-white">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={accountSettings.email}
                onChange={handleAccountSettingsChange}
                required
                className="dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="oldPassword" className="dark:text-white">Old Password</Label>
              <Input
                id="oldPassword"
                name="oldPassword"
                type="password"
                value={accountSettings.oldPassword}
                onChange={handleAccountSettingsChange}
                className="dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword" className="dark:text-white">New Password</Label>
              <Input
                id="newPassword"
                name="newPassword"
                type="password"
                value={accountSettings.newPassword}
                onChange={handleAccountSettingsChange}
                className="dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="dark:text-white">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={accountSettings.confirmPassword}
                onChange={handleAccountSettingsChange}
                className="dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="twoFactorAuth"
                name="twoFactorAuth"
                checked={accountSettings.twoFactorAuth}
                onCheckedChange={(checked) => setAccountSettings(prev => ({ ...prev, twoFactorAuth: checked }))}
              />
              <Label htmlFor="twoFactorAuth" className="dark:text-white">Enable Two-Factor Authentication</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="darkMode"
                name="darkMode"
                checked={isDarkMode}
                onCheckedChange={(checked) => {
                  setAccountSettings(prev => ({ ...prev, darkMode: checked }))
                  setIsDarkMode(checked)
                  localStorage.setItem("darkMode", checked)
                }}
              />
              <Label htmlFor="darkMode" className="dark:text-white">Dark Mode</Label>
            </div>
            <Button type="submit" className="dark:bg-primary dark:text-primary-foreground">Save Changes</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function Label({ children, className, ...props }) {
  return (
    <label className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`} {...props}>
      {children}
    </label>
  )
}