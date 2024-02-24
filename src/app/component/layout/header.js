"use client";
import Link from 'next/link'
import Image from 'next/image'

export default function Header(){
    return (
        <>
            <div className='p-6 border-b border-gray-900'>
                <div className=''>
                    <Link href={'/'}>
                        <Image className='hidden md:block' src="/image/logo.png" width="150" height="150" alt='logo' />
                        <Image className='md:hidden' src="/image/logo.png" width="100" height="100" alt='logo' />
                    </Link>
                </div>
            </div>
        </>
    )
}