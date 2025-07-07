"use client"

import Link from 'next/link'
import { Button } from './ui/button'

export default function Navbar() {
    const links = [
        {
            name: "Raise Complaints",
            path: "/raise-complaint"
        },
        {
            name: "Track Porgress",
            path: "/track-progress"
        },
    ];
    return (
        <nav className="container px-4 md:max-w-7xl mx-auto flex items-center justify-between py-8 ">
            <div className='flex items-center justify-center gap-16'>
                <h1 className="text-2xl font-bold text-rose-600 uppercase">Complaint</h1>

                <ul className='flex items-center justify-center gap-6'>
                    {links.map((link) => (
                        <li key={link.name}>
                            <Link
                                href={link.path}
                                className='text-neutral-700 font-semibold hover:text-primary transition-colors text-md'
                            >
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>



            <div className="flex items-center gap-8">
                <Link
                    href="/sign-in"
                    className="text-md font-medium  text-neutral-700 hover:text-primary transition-colors"
                >
                    Sign in
                </Link>

                <Button asChild>
                    <Link href="/sign-up">Sign up</Link>
                </Button>
            </div>
        </nav>
    )
}
