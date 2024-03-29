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
            <div className='w-full px-10 pb-64'>
				  <Tabs>
					<TabList>
						<Tab>Deposit</Tab>
						<Tab>Withdrawal</Tab>
						<Tab>Wallet</Tab>
					</TabList>

					<div className='pt-10'>
						<TabPanel>
							<h2>Deposit</h2>
						</TabPanel>
						<TabPanel>
							<h2>Withdrawal</h2>
						</TabPanel>
						<TabPanel>
							<h2>Wallet</h2>
						</TabPanel>
					</div>
				</Tabs>
            </div>
		:router.push('/login')}
		</>
	);
}




