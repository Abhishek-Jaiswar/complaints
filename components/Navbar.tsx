"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { useAuth } from "@/context/authContext";
import axios from "axios";
import { Loader2 } from "lucide-react";

export default function Navbar() {
    const { user, loading } = useAuth();

    async function handleLogout() {
        await axios.post("/api/auth/logout");
        window.location.reload();
    }

    const links = [
        {
            name: "Raise Complaints",
            path: "/raise-complaint",
        },
    ];

    return (
        <nav className="container px-4 md:max-w-7xl mx-auto flex items-center justify-between py-5 border-b border-muted sticky top-0 left-0 bg-white">
            <div className="flex items-center justify-center gap-16">
                <h1 className="text-2xl font-bold text-rose-600 uppercase">Complaint</h1>

                <ul className="flex items-center justify-center gap-6">
                    {links.map((link) => (
                        <li key={link.name}>
                            <Link
                                href={link.path}
                                className="text-neutral-700 font-semibold hover:text-primary hover:underline transition-colors text-md"
                            >
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="flex items-center gap-8">
                {loading ? (
                    <span className="text-neutral-500 text-sm">Checking auth...</span>
                ) : user ? (
                    <>
                        <span className="text-neutral-700 text-sm">Welcome, {user.email}</span>
                        <Button onClick={handleLogout} className="hover:bg-rose-600 transition-colors duration-200 cursor-pointer">
                            {loading ? <span className="flex items-center justify-center gap-2">
                                <Loader2 className='w-4 h-4 animate-spin' />
                                Please wait...
                            </span> : " Logout"}</Button>
                        {user.role === 'admin' && (
                            <Link href={'/admin/dashbaord'}>
                                <Button className="hover:bg-rose-600 transition-colors duration-200 cursor-pointer">
                                    Dashboard
                                </Button>
                            </Link>
                        )}
                    </>
                ) : (
                    <>
                        <Link
                            href="/sign-in"
                            className="text-md font-medium text-neutral-700 hover:text-primary transition-colors"
                        >
                            Sign in
                        </Link>

                        <Button asChild>
                            <Link href="/sign-up">Sign up</Link>
                        </Button>
                    </>
                )}
            </div>
        </nav>
    );
}
