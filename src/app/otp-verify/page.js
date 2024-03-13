"use client";
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { deleteOtp, sentOtp } from '../../../servises/action/all';
import Cookies from "js-cookie";
import { useDispatch } from 'react-redux';
import { redirect } from 'next/navigation';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from 'next/navigation';

export default function MailVerify() {

    const [message, setMessage] = useState('');
	const [count, setCount] = useState(0);
    const token = Cookies.get("token");
    const tokensiduser = Cookies.get("tokensiduser");
    const router = useRouter();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const fromData = {
            otp: event.target.otp.value,
            uu_id: event.target.uu_id.value,
        };
        setOtpData(fromData);
    }

    const setOtpData = async (fromData) => {
		try {
			const { data } = await sentOtp(fromData);
            if (data.otp_verified == true) {
                router.push('/lever');
                showMessage('Mail verifyed successfully...!');
            }
		} catch (error) {
            showErrorMessage('Something went wrong..!')         
		}
	};

    const deleteOtpData = async (tokensiduser) => {
		try {
			const { data } = await deleteOtp(tokensiduser);
            if (data.otp_verified == true) {
                showErrorMessage('Your OTP Code is expiry..!')         
                router.push('/mail-verify');
            }
		} catch (error) {
            router.push('/mail-verify');
		}
	};

    function showMessage(toastMsg) {
        toast.success(toastMsg, {
          position: toast.POSITION.TOP_RIGHT,
        });
    }

    function showErrorMessage(toastMsg) {
        toast.error(toastMsg, {
          position: toast.POSITION.TOP_RIGHT,
        });
    }
    
    const handleClick = () => {
		setMessage('Your OTP expiry time limit is 3 minute.');
		let timer = setInterval(() => {
		  setCount(prevCount => prevCount + 1);
		}, 1000);
	
		setTimeout(() => {
		    clearInterval(timer);
            deleteOtpData(tokensiduser);
		}, 300000);
	};

    useEffect(() => {                          
		handleClick();
	}, []);

	return (
		<>
            { !token ? redirect('/login') :
			<div className="container mx-auto my-4">
                <div className="flex justify-center items-center lg:h-screen px-6">
                    <div className="w-full xl:w-3/4 lg:w-11/12 flex">
                        <div className="bg-gray-900 hidden lg:block lg:w-5/12 rounded-l-lg">
                            <Image className='mt-12 mx-10' src="/image/img-4.png" width="300" height="300" alt='img' />
                        </div>
                        <div className="w-full lg:w-7/12 bg-gray-900 p-5 rounded-lg lg:rounded-l-none">
                            <h3 className="pt-4 text-2xl text-center text-gray-300">Send Your OTP</h3>
                            <form onSubmit={handleSubmit} className="px-8 pt-6 pb-8 mb-4 bg-gray-900 rounded">
                                <input name='uu_id' value={tokensiduser} id="uu_id" type='hidden' />
                                <div className="mb-4">
                                    <div className='text-center'>
                                        <p className='py-2'>{message}</p>
                                        {count > 0 && <p>Countdown: <span className='text-green-600'>{count}</span> seconds</p>}
                                    </div>

                                    <label className="block mb-2 text-sm font-bold text-gray-300" for="email">
                                        OTP Number
                                    </label>
                                    <input
                                        className="w-full px-3 py-2 mb-3 text-sm bg-gray-800 leading-tight text-gray-400 border border-gray-600 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                        name='otp'
                                        id="otp"
                                        type="text"
                                        placeholder="123456"
                                        required
                                    />
                                </div>
                                
                                <div className="mb-6 text-center">
                                    <button
                                        className="w-full px-4 py-2 font-bold text-white bg-green-700 rounded-full hover:bg-green-800 focus:outline-none focus:shadow-outline"
                                        type="submit"
                                    >
                                        Submit
                                    </button>
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
