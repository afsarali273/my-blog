"use client"
import Link from 'next/link'
import {useEffect, useState} from "react";

export default function Header() {

    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <header
            className={`fixed w-full z-10 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-md' : ''}`}>
            <nav className="container mx-auto px-6 py-4">
                <div className="flex justify-between items-center">
                    <Link href="/"
                          className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                        Opensource Automation
                    </Link>
                    <ul className="flex space-x-6">
                        {['Home', 'Resume', 'Blog','Trading', 'Contact'].map((item) => (
                            <li key={item}>
                                <Link href={`/${item.toLowerCase()}`}
                                      className="text-gray-600 hover:text-blue-600 transition-colors">
                                    {item}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>
        </header>
    )
}
