"use client"
import React, { useEffect, useState } from 'react'
import { Check, Copy, Eye, EyeOff, Pencil, Trash2 } from "lucide-react"
import { useToast } from '@/components/ui/use-toast'
import axios from 'axios';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';

const ViewPasswordCard = (props) => {
    const { setSelectedPassword, selectedPassword, deletePWData, showPassword, setShowPassword, token, getPwData } = props;
    const [editPassword, setEditPassword] = useState(false);
    const [modifiedPasswordData, setModifiedPasswordData] = useState({ sideName: '', identifyar: '', password: '', note: '' });
    const [Saving, setSaving] = useState(false);

    const {toast} = useToast();

    useEffect(() => {
        if (selectedPassword !== null) {
            document.getElementById("identifyar").value = selectedPassword?.identifyar;
            document.getElementById("password").value = selectedPassword?.password;
            document.getElementById("note").value = selectedPassword?.note || "note not found";

            setModifiedPasswordData({ sideName: selectedPassword?.sideName, identifyar: selectedPassword?.identifyar, password: selectedPassword?.password, note: selectedPassword?.note })
        }
    }, [selectedPassword]);

    const copyToClipboard = (text, description) => {
        navigator.clipboard.writeText(text)
        // You might want to add a toast notification here
        toast({
            description: description,
        })
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    const handleChangePwData = (e) => {
        setModifiedPasswordData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const Save = async () => {
        let data = modifiedPasswordData;
        setSaving(true);
        try {
            let res = await axios.put(`${process.env.NEXT_PUBLIC_HOST}/api/modify-pwdata/${selectedPassword._id}`, data, {
                headers: {
                    'Authorization': `${token}`,
                },
            })
            console.log(res);
            setEditPassword(false);
            getPwData(token)
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
            setSaving(false)
        }
    }

    return (
        <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right dark:text-white">Username</Label>
                <div className="col-span-3 flex items-center">
                    <Input onChange={handleChangePwData} id="identifyar" name="identifyar" readOnly={editPassword === true ? false : true} className="dark:bg-gray-700 dark:text-white" />
                    <Button variant="ghost" size="icon" onClick={() => copyToClipboard(selectedPassword?.identifyar, "username copied to clipboard")}>
                        <Copy className="h-4 w-4" />
                    </Button>
                </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right dark:text-white">Password</Label>
                <div className="col-span-3 flex items-center">
                    <Input
                        onChange={handleChangePwData}
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        name="password"
                        readOnly={editPassword === true ? false : true}
                        className="dark:bg-gray-700 dark:text-white"
                    />
                    <Button variant="ghost" size="icon" onClick={togglePasswordVisibility}>
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => copyToClipboard(selectedPassword?.password, "password copied to clipboard")}>
                        <Copy className="h-4 w-4" />
                    </Button>
                </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right dark:text-white">Note</Label>
                <Input onChange={handleChangePwData} id="note" name="note" className="col-span-3 dark:bg-gray-700 dark:text-white" readOnly={editPassword === true ? false : true} />
            </div>
            <div className="flex justify-end gap-4">
                {editPassword === false ? <>
                    <button onClick={() => { setEditPassword(true) }}><Pencil size={20} /></button>

                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <button><Trash2 size={20} /></button>
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
                                <AlertDialogAction onClick={() => { deletePWData(selectedPassword._id); }}>Delete</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </> :
                    <button disabled={Saving} onClick={()=>{Save()}} className='flex items-center gap-1 disabled:text-gray-600 dark:disabled:text-gray-300'>{Saving === false ? "Save" : "Saving..."}</button>}
            </div>
        </div>
    )
}

export default ViewPasswordCard