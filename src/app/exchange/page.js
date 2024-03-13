"use client";
import React, { useEffect, useState } from 'react';
import { getProfileByToken } from '../../../servises/action/all';
import { useSelector } from 'react-redux';
import Cookies from "js-cookie";
import { useRouter } from 'next/navigation';

export default function Exchange() {

	const authenticated = useSelector((state) => state.auth.authenticated);
    const tokensiduser = Cookies.get("tokensiduser");
    const router = useRouter();


    const getOtp = async (tokensiduser) => {
		try {
			const { data } = await getProfileByToken(tokensiduser);
			if (data.email_verified == false) {
				router.push('/mail-verify');
			}
		} catch (error) {
			console.error(error, 'errorerrorerrorerror');
		}
	};

    useEffect(() => {                          
		if (tokensiduser) {
			getOtp(tokensiduser);
		}else{
			router.push('/login')
		}
	}, []);
	
	return (
		<>
        {authenticated ?
            <div className='w-full px-10'>
                <div className="flex gap-4">
                    <button className="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 w-full border border-green-500 hover:border-transparent rounded">
                    Buy
                    </button>

                    <button className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 w-full border border-red-500 hover:border-transparent rounded">
                    Sell
                    </button>
                </div>

                <div className="mt-10">
                    <label for="success" className="block mb-2 text-sm font-medium text-green-700 dark:text-green-500">Price</label>
                    <input type="number" id="success" className="bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-900 dark:border-green-500" placeholder="00.0" />
                </div>
                <button className="bg-transparent bg-green-500 mt-12 font-semibold hover:text-white text-green-500 py-3 w-full border border-green-500 hover:bg-green-700 rounded">
                    Buy-BTC
            	</button>
            </div>
		:router.push('/login')}
		</>
	);
}




