"use client";
import { CiCoins1 } from "react-icons/ci";
import { RiExchangeLine } from "react-icons/ri";
import { RiExchangeFundsFill } from "react-icons/ri";
import { LuFileVolume2 } from "react-icons/lu";
import { PiWalletBold } from "react-icons/pi";
import { usePathname} from 'next/navigation';
import Link from 'next/link'
import Cookies from "js-cookie";

export default function Footer() {
    const pathname = usePathname();
    const token = Cookies.get("token");

    console.log(pathname, 'pathname');

    return (
        <div className="sticky bottom-0 z-30 bg-black border-t border-gray-900">
            <div className='container mx-auto p-3'>
                <div className="flex items-center justify-between">
                    <div>
                        <Link href={'/'}>
                            <CiCoins1 className={pathname == "/" ? "active text-4xl" : "text-gray-400 text-4xl"} />
                        </Link>
                    </div>
                    <div>
                        <Link href={'/market'}>
                            <RiExchangeFundsFill className={pathname == "/market/" ? "active text-3xl" : "text-gray-400 text-3xl"} />
                        </Link>
                    </div>
                    <div>
                        <Link href={token ? '/exchange' : '/login'}>
                            <RiExchangeLine className={pathname == "/exchange/" ? "active text-3xl" : "text-gray-400 text-3xl"} />
                        </Link>
                    </div>
                    <div>
                        <Link href={token ? '/lever' : '/login'}>
                            <LuFileVolume2 className={pathname == "/lever/" ? "active text-2xl" : "text-gray-400 text-2xl"} />
                        </Link>
                    </div>
                    <div>
                        <Link href={token ? '/assets' : '/login'}>
                            <PiWalletBold className={pathname == "/assets/" ? "active text-3xl" : "text-gray-400 text-3xl"} />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
