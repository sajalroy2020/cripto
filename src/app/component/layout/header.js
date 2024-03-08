"use client";
import Link from 'next/link'
import Image from 'next/image'

export default function Header(){
    return (
        <>
            <div className='p-6 border-b border-gray-900'>
                <div className='flex justify-between'>
                    <Link href={'/'}>
                        <Image className='hidden md:block' src="/image/logo.png" width="150" height="150" alt='logo' />
                        <Image className='md:hidden' src="/image/logo.png" width="100" height="100" alt='logo' />
                    </Link>
                    <div>
                        <Link href={'/login'} class="px-6 py-2 text-xs md:text-sm font-medium text-white border border-green-600 rounded-full hover:bg-green-800 focus:outline-none focus:shadow-outline" type="button" >
                            Login
                        </Link>
                        <Link href={'/register'} class="px-6 ml-2 py-2 text-xs md:text-sm font-medium text-white border border-green-600 rounded-full hover:bg-green-800 focus:outline-none focus:shadow-outline" type="button" >
                            Register
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}