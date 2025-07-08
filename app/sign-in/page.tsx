'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
import { useAuth } from '@/context/authContext'


const SignIn = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        context: "user",
    })
    const [loading, setLoading] = useState(false);
    const { fetchUser } = useAuth()
    const navigate = useRouter()


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await axios.post('/api/auth/sign-in', formData, {
                withCredentials: true
            })

            await fetchUser()

            if (response.data.success) {
                navigate.refresh();
                navigate.push('/raise-complaints')
                toast.success("Logged in successfully")

            } else if (response.status === 200) {
                navigate.push('/raise-complaints')
                toast.success("Logged in successfully")
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message || "Failed to sign up");
            } else {
                toast.error("Something went wrong");
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex items-center justify-center h-screen">
            <div>
                <div className="pb-3">
                    <h1 className="text-lg text-neutral-900 font-semibold">Login to your account</h1>
                    <p className="text-sm text-neutral-700">
                        Enter your email below to login to your account
                    </p>
                </div>
                <div>
                    <form
                        onSubmit={handleSubmit}
                    >
                        <div className="flex flex-col gap-2">
                            <div className="grid gap-3">
                                <label htmlFor="email">Email</label>
                                <Input
                                    id="email"
                                    type="email"
                                    name='email'
                                    value={formData.email.toLowerCase()}
                                    onChange={handleChange}
                                    placeholder="m@example.com"
                                    required
                                />
                            </div>
                            <div className="grid">
                                <div className="flex items-center">
                                    <label htmlFor="password">Password</label>
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    name='password'
                                    value={formData.password.toLowerCase()}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="flex flex-col pt-6">
                                <Button
                                    type="submit" className="w-full cursor-pointer"
                                    disabled={loading}
                                >
                                    {loading ? <span className='flex items-center justify-center gap-2'>
                                        <Loader2 className='w-4 h-4 animate-spin ' />
                                        Please wait...
                                    </span> : " Sign in"}
                                </Button>
                            </div>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Don&apos;t have an account?{" "}
                            <Link href={'/sign-up'} className="underline underline-offset-4">
                                Sign up
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignIn
