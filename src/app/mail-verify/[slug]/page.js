"use client";
import { usePathname } from 'next/navigation';
import Image from 'next/image'
import { useEffect, useState } from 'react';

function mailConfirm() {
	const pathname = usePathname();

	useEffect(() => {                          
	}, []);
  
	return (
		<>
			<div className=''>
				<h1>This is slug page {pathname}</h1>
			</div>
		</>
	);
}

export default mailConfirm;



