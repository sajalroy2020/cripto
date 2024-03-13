"use client";
import Link from 'next/link'
import Image from 'next/image'
import { getRegister } from '../../../servises/action/all';
import { useEffect, useState } from 'react';
import Cookies from "js-cookie";
import { useDispatch, useSelector } from 'react-redux';
import { authenticatedFalse, authenticatedTrue, setUser } from '../../../features/AuthSlice';
import { useRouter } from 'next/navigation';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {

    const [errorEmail, setErrorEmail] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const dispatch = useDispatch();
    const token = Cookies.get("token");
    const authenticated = useSelector((state) => state.auth.authenticated);
    const router = useRouter();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const fromData = {
            email: event.target.email.value,
            password: event.target.password.value,
            password_confirmation: event.target.password_confirmation.value,
        };
        setRegisterData(fromData);
    }

    const setRegisterData = async (fromData) => {
		try {
			const { data } = await getRegister(fromData);
            Cookies.set("token", data.token);
            Cookies.set("tokensiduser", data.user.uu_id);
            dispatch(authenticatedTrue(), setUser(data.user));
            showMessage('Registration Successfully');
            router.push('/mail-verify');
		} catch (error) {
            // error message set 
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

    function showMessage(toastMsg) {
        toast.success(toastMsg, {
          position: toast.POSITION.TOP_RIGHT,
        });
    }

	return (
		<>
        { token ?  router.push('/') : 
            <div className="container mx-auto my-8">
                <div className="flex justify-center items-center lg:h-screen px-6">
                    <div className="w-full xl:w-3/4 lg:w-11/12 flex">
                        <div className="bg-gray-900 hidden lg:block lg:w-5/12 rounded-l-lg">
                            <Image className='mt-12 mx-10' src="/image/img-4.png" width="300" height="300" alt='img' />
                        </div>
                        <div className="w-full lg:w-7/12 bg-gray-900 p-5 rounded-lg lg:rounded-l-none">
                            <h3 className="pt-4 text-2xl text-center text-gray-300">Create an Account!</h3>
                            <form onSubmit={handleSubmit} className="px-8 pt-6 pb-8 mb-4 bg-gray-900 rounded">
                                <div className="mb-4">
                                    <label className="block mb-2 text-sm font-bold text-gray-300" for="email">
                                        Email
                                    </label>
                                    <input
                                        name='email'
                                        className="w-full px-3 py-2 mb-3 text-sm bg-gray-800 leading-tight text-gray-400 border border-gray-600 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                        id="email"
                                        type="email"
                                        placeholder="Email"
                                    />
                                    {errorEmail && <p className="text-xs italic text-red-500">{errorEmail}</p>}
                                </div>
                                <div className="mb-4 md:flex md:justify-between">
                                    <div className="mb-4 md:mr-2 md:mb-0">
                                        <label className="block mb-2 text-sm font-bold text-gray-300"  for="password">
                                            Password
                                        </label>
                                        <input
                                            name='password'
                                            className="w-full px-3 py-2 mb-3 text-sm bg-gray-800 leading-tight text-gray-300 border border-gray-600 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                            id="password"
                                            type="password"
                                            placeholder="******************"
                                        />
                                        {errorPassword && <p className="text-xs italic text-red-500">{errorPassword}</p>}
                                    </div>
                                    <div className="md:ml-2">
                                        <label className="block mb-2 text-sm font-bold text-gray-300" for="c_password">
                                            Confirm Password
                                        </label>
                                        <input
                                            name='password_confirmation'
                                            className="w-full px-3 py-2 mb-3 text-sm bg-gray-800 leading-tight text-gray-300 border border-gray-600 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                            id="password_confirmation"
                                            type="password"
                                            placeholder="******************"
                                        />
                                    </div>
                                </div>
                                <div className="mb-6 text-center">
                                    <button
                                        className="w-full px-4 py-2 font-bold text-white bg-green-700 rounded-full hover:bg-green-800 focus:outline-none focus:shadow-outline"
                                        type="submit"
                                    >
                                        Register Account
                                    </button>
                                </div>
                                <hr className="mb-6 border-t" />
                                
                                <div className="text-center">
                                    <Link
                                        className="inline-block text-sm text-green-600 align-baseline hover:text-green-800"
                                        href={"/login"}
                                    >
                                        Already have an account? Login!
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
