'use client'

import React, { FormEvent, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

const SignUp = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    })
    const [loading, setLoading] = useState(false)
    const navigate = useRouter()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        try {
            setLoading(true)
            const response = await axios.post("/api/auth/sign-up", formData, {
                withCredentials: true
            })

            if (response.status === 201) {
                navigate.push('/sign-in')
                toast.success("Registration successfull")
            } else if (response.status === 200 && response.data.success) {
                navigate.push('/sign-in')
                toast.success("Registration successfull")
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data.message || "Registration failed")
            } else {
                toast.error("Something went wrong")
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex items-center justify-center h-screen">
            <div>
                <div className="pb-3">
                    <h1 className="text-lg text-neutral-900 font-semibold">Create your account</h1>
                    <p className="text-sm text-neutral-700">
                        Enter your email below to login to your account
                    </p>
                </div>
                <div>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-2">
                            <div className="grid gap-3">
                                <label htmlFor="email">Name</label>
                                <Input
                                    id="name"
                                    type="text"
                                    name='name'
                                    value={formData.name.toLowerCase()}
                                    onChange={handleChange}
                                    placeholder="john"
                                    required
                                />
                            </div>
                            <div className="grid gap-3">
                                <label htmlFor="email">Email</label>
                                <Input
                                    id="email"
                                    type="email"
                                    name='email'
                                    value={formData.email}
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
                                    id="password" type="password"
                                    name='password'
                                    value={formData.password}
                                    onChange={handleChange}
                                    required />
                            </div>
                            <div className="flex flex-col pt-6">
                                <Button type="submit" className="w-full cursor-pointer">
                                    {loading ? <span className='flex items-center justify-center gap-2'>
                                        <Loader2 className='w-4 h-4 animate-spin' />
                                        Please wait...
                                    </span> : " Sign up"}
                                </Button>
                            </div>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Allready have an account?{" "}
                            <Link href={'/sign-in'} className="underline underline-offset-4">
                                Sign in
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignUp
