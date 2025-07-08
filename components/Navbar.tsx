"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { useAuth } from "@/context/authContext";
import axios from "axios";
import { Loader2, Menu } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
    const { user, loading } = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
        <nav className="container px-4 md:max-w-7xl mx-auto flex items-center justify-between py-5 border-b border-muted sticky top-0 left-0 bg-white z-50">
            <div className="flex items-center justify-between w-full">
                {/* Logo */}
                <h1 className="text-2xl font-bold text-rose-600 uppercase">Complaint</h1>

                {/* Desktop Links */}
                <ul className="hidden md:flex items-center justify-center gap-6">
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

                {/* Desktop Auth Buttons */}
                <div className="hidden md:flex items-center gap-6">
                    {loading ? (
                        <span className="text-neutral-500 text-sm">Checking auth...</span>
                    ) : user ? (
                        <>
                            <span className="text-neutral-700 text-sm">Welcome, {user.email}</span>
                            <Button
                                onClick={handleLogout}
                                className="hover:bg-rose-600 transition-colors duration-200 cursor-pointer"
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Please wait...
                                    </span>
                                ) : (
                                    "Logout"
                                )}
                            </Button>
                            {user.role === "admin" && (
                                <Link href={"/admin/dashboard"}>
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

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="md:hidden p-2 rounded hover:bg-neutral-100 transition"
                >
                    <Menu className="w-6 h-6 text-neutral-700" />
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden mt-4 flex flex-col gap-4 border-t border-neutral-200 pt-4">
                    {links.map((link) => (
                        <Link
                            key={link.name}
                            href={link.path}
                            className="text-neutral-700 font-semibold hover:text-primary transition-colors text-md"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}

                    {loading ? (
                        <span className="text-neutral-500 text-sm">Checking auth...</span>
                    ) : user ? (
                        <>
                            <span className="text-neutral-700 text-sm">Welcome, {user.email}</span>
                            <Button
                                onClick={handleLogout}
                                className="hover:bg-rose-600 transition-colors duration-200 cursor-pointer w-full"
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Please wait...
                                    </span>
                                ) : (
                                    "Logout"
                                )}
                            </Button>
                            {user.role === "admin" && (
                                <Link
                                    href={"/admin/dashboard"}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <Button className="hover:bg-rose-600 transition-colors duration-200 cursor-pointer w-full mt-2">
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
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Sign in
                            </Link>
                            <Button asChild className="w-full">
                                <Link href="/sign-up" onClick={() => setIsMobileMenuOpen(false)}>
                                    Sign up
                                </Link>
                            </Button>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
}
