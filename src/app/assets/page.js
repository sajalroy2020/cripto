"use client";
import React, { useEffect } from 'react';
import { getProfileByToken } from '../../../servises/action/all';
import { useSelector } from 'react-redux';
import Cookies from "js-cookie";
import { useRouter } from 'next/navigation';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

export default function Assets() {

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
        <div className='w-full px-10 pb-40 asset-tab pt-6'>
			<Tabs>
				<TabList>
					<Tab>Deposit</Tab>
					<Tab>Withdrawal</Tab>
					<Tab>Wallet</Tab>
				</TabList>

				<div className='pt-10'>
					<TabPanel>
						<div className='p-4 bg-gray-800 rounded-sm'>
							<h2 className='text-xl font-semibold pb-2 font-serif'>USDT</h2>
							<p className='text-sm'>0.0000</p>
						</div>
						<div className='p-4 bg-gray-800 rounded-sm mt-4'>
							<h2 className='text-xl font-semibold pb-2 font-serif'>BTC</h2>
							<p className='text-sm'>0.0000</p>
						</div>
					</TabPanel>
					<TabPanel>
						<div className='p-4 bg-gray-800 rounded-sm'>
								<h2 className='text-xl font-semibold pb-2 font-serif'>USDT</h2>
								<p className='text-sm'>0.0000</p>
							</div>
							<div className='p-4 bg-gray-800 rounded-sm mt-4'>
								<h2 className='text-xl font-semibold pb-2 font-serif'>ETH</h2>
								<p className='text-sm'>0.0000</p>
							</div>
							<div className='p-4 bg-gray-800 rounded-sm mt-4'>
								<h2 className='text-xl font-semibold pb-2 font-serif'>BTC</h2>
								<p className='text-sm'>0.0000</p>
						</div>
					</TabPanel>
					<TabPanel>
						<div className='p-4 bg-gray-800 rounded-sm'>
							<h2 className='text-xl font-semibold pb-2 font-serif'>USDT</h2>
							<p className='text-sm'>0.0000</p>
						</div>
					</TabPanel>
				</div>
			</Tabs>
        </div>
		:router.push('/login')}
		</>
	);
}




