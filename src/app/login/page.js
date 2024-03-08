"use client";
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react';
import Cookies from "js-cookie";
import { redirect } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { authenticatedFalse, authenticatedTrue, setUser } from '../../../features/AuthSlice';
import { getLogin } from '../../../servises/action/all';
import { useRouter } from 'next/navigation';

export default function Login() {

    const [errorEmail, setErrorEmail] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const dispatch = useDispatch();
    const token = Cookies.get("token");
    const router = useRouter();


    const handleSubmit = async (event) => {
        event.preventDefault();
        const fromData = {
            email: event.target.email.value,
            password: event.target.password.value,
        };
        setLoginData(fromData);
    }

    const setLoginData = async (fromData) => {
		try {
			const { data } = await getLogin(fromData);
            console.log(data, 'data');
            Cookies.set("token", data.token);
            dispatch(authenticatedTrue(), setUser(data.user));
            router.push('/mail-verify');
		} catch (error) {
            // error message set 
            console.log(error);
            dispatch(authenticatedFalse());
            let email = error.response.data.message['email'];
            if (email) {
              setErrorEmail(email[0]);
            }

            let password = error.response.data.message['password'];
            if (password) {
                setErrorPassword(password[0]);
            }
		}
	};

	return (
		<>
        { token ?  router.push('/') : 
			<div className="container mx-auto my-4">
                <div className="flex justify-center items-center lg:h-screen px-6">
                    <div className="w-full xl:w-3/4 lg:w-11/12 flex">
                        <div className="bg-gray-900 hidden lg:block lg:w-5/12 rounded-l-lg">
                            <Image className='mt-12 mx-10' src="/image/img-4.png" width="300" height="300" alt='img' />
                        </div>
                        <div className="w-full lg:w-7/12 bg-gray-900 p-5 rounded-lg lg:rounded-l-none">
                            <h3 className="pt-4 text-2xl text-center text-gray-300">Login Your Account!</h3>
                            <form onSubmit={handleSubmit} className="px-8 pt-6 pb-8 mb-4 bg-gray-900 rounded">
                                
                                <div className="mb-4">
                                    <label className="block mb-2 text-sm font-bold text-gray-300" for="email">
                                        Email
                                    </label>
                                    <input
                                        className="w-full px-3 py-2 mb-3 text-sm bg-gray-800 leading-tight text-gray-400 border border-gray-600 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                        id="email"
                                        type="email"
                                        placeholder="Email"
                                    />
                                    {errorEmail && <p className="text-xs italic text-red-500">{errorEmail}</p>}
                                </div>
                                <div className="mb-4">
                                    <div className="mb-4 md:mr-2 md:mb-0">
                                        <label className="block mb-2 text-sm font-bold text-gray-300"  for="password">
                                            Password
                                        </label>
                                        <input
                                            className="w-full px-3 py-2 mb-3 text-sm bg-gray-800 leading-tight text-gray-300 border border-gray-600 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                            id="password"
                                            type="password"
                                            placeholder="******************"
                                        />
                                        {errorPassword && <p className="text-xs italic text-red-500">{errorPassword}</p>}
                                    </div>
                                </div>
                                <div className="mb-6 text-center">
                                    <button
                                        className="w-full px-4 py-2 font-bold text-white bg-green-700 rounded-full hover:bg-green-800 focus:outline-none focus:shadow-outline"
                                        type="submit"
                                    >
                                        Login Account
                                    </button>
                                </div>
                                <hr className="mb-6 border-t" />
                                <div className="text-center">
                                    <Link
                                        className="inline-block text-sm text-green-600 align-baseline hover:text-green-800"
                                        href="#"
                                    >
                                        Forgot Password?
                                    </Link>
                                </div>
                                <div className="text-center">
                                    <Link
                                        className="inline-block text-sm text-green-600 align-baseline hover:text-green-800"
                                        href={'/register'}
                                    >
                                        Don’t have an account ? Sign Up Now
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            }
		</>
	);
}
