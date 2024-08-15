"use client"
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

function Header() {
    const path = usePathname();
    useEffect(() => {
        console.log(path)
    }, [path])

    return (
        <div className='flex p-4 items-center justify-between bg-secondary shadow-md'>
            <Image src={'/logo.svg'} width={40} height={20} alt='logo' />
            <ul className='hidden md:flex gap-6'>
                <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path === '/dashboard' && 'text-primary font-bold'}`}>
                    <Link href="/dashboard">Dashboard</Link>
                </li>
                {/* <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path === '/dashboard/question' && 'text-primary font-bold'}`}>
                    <Link href="/dashboard/question">Questions</Link>
                </li> */}
                <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path === '/dashboard/upgrade' && 'text-primary font-bold'}`}>
                    <Link href="/dashboard/upgrade">Upgrade</Link>
                </li>
                <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path === '/dashboard/how' && 'text-primary font-bold'}`}>
                    <Link href="/dashboard/how">How it Works?</Link>
                </li>
            </ul>
            <UserButton />
        </div>
    )
}

export default Header
