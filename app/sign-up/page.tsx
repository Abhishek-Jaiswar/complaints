import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

import React from 'react'

const page = () => {
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
                    <form>
                        <div className="flex flex-col gap-2">
                            <div className="grid gap-3">
                                <label htmlFor="email">Name</label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="john"
                                    required
                                />
                            </div>
                            <div className="grid gap-3">
                                <label htmlFor="email">Email</label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                />
                            </div>
                            <div className="grid">
                                <div className="flex items-center">
                                    <label htmlFor="password">Password</label>
                                </div>
                                <Input id="password" type="password" required />
                            </div>
                            <div className="flex flex-col pt-6">
                                <Button type="submit" className="w-full cursor-pointer">
                                    Login
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

export default page
