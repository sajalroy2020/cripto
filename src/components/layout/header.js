"use client";
import Link from 'next/link'
import Image from 'next/image'
import { useEffect } from 'react';
import { Provider, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { authenticatedTrue, authenticatedFalse, setUser } from '../../../features/AuthSlice';
import { getProfileByToken } from '../../../servises/action/all';
import { redirect, useRouter } from 'next/navigation';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Header(){

  const dispatch = useDispatch();
  const authenticated = useSelector((state) => state.auth.authenticated);
  const user = useSelector((state) => state.auth.user);
  const router = useRouter();

  const checkAuthState = () => {
      try {
          const token = Cookies.get("token");
          if (token) {
              dispatch(authenticatedTrue());
          } else {
              dispatch(authenticatedFalse());
          }
      } catch (error) {
          console.log(error);
      }
  };

//   const getProfileByTokenAction = async (u_id) => {
//       try {
//           const { data } = await getProfileByToken(u_id);
//           console.log(data.user);
//           dispatch(setUser(data.user));
//       }
//       catch (error) {
//           console.log(error, 'error profile');
//       }
//   };

  const userLogOut = () => {
    Cookies.remove("token");
    dispatch(authenticatedFalse());
    showMessage('Log Out Successfully');
    router.push('/');
  }

  useEffect(() => {
    checkAuthState();
    // if (authenticated) {
    //     getProfileByTokenAction(user.id);
    // };
    }, []);

    function showMessage(toastMsg) {
        toast.success(toastMsg, {
          position: toast.POSITION.TOP_RIGHT,
        });
    }

    return (
        <>
            <div className='p-6 border-b border-gray-900'>
                <div className='flex justify-between'>
                    <Link href={'/'}>
                        <Image className='hidden md:block' src="/image/logo.png" width="150" height="150" alt='logo' />
                        <Image className='md:hidden' src="/image/logo.png" width="100" height="100" alt='logo' />
                    </Link>
                    {authenticated ?
                    <div>
                        <button onClick={userLogOut} className="px-6 py-2 text-xs md:text-sm font-medium text-white border border-green-600 rounded-full hover:bg-green-800 focus:outline-none focus:shadow-outline" type="button" >
                            Log Out
                        </button>
                    </div>
                    :
                    <div>
                        <Link href={'/login'} className="px-6 py-2 text-xs md:text-sm font-medium text-white border border-green-600 rounded-full hover:bg-green-800 focus:outline-none focus:shadow-outline" type="button" >
                            Login
                        </Link>
                        <Link href={'/register'} className="px-6 ml-2 py-2 text-xs md:text-sm font-medium text-white border border-green-600 rounded-full hover:bg-green-800 focus:outline-none focus:shadow-outline" type="button" >
                            Register
                        </Link>
                    </div>
                    }
                    
                </div>
            </div>
        </>
    )
}