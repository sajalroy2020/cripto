"use client";
import Image from 'next/image'
import { setMail } from '../../../servises/action/all';
import Cookies from "js-cookie";
import { useDispatch, useSelector } from 'react-redux';
import { redirect } from 'next/navigation';

export default function MailVerify() {

    const token = Cookies.get("token");
    const authenticated = useSelector((state) => state.auth.authenticated);
    const authenticatedCheck = useSelector((state) => state.auth);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const fromData = {
            email: event.target.email.value,
        };
        setMailData(fromData);
    }

    const setMailData = async (fromData) => {
		try {
			const { data } = await setMail(fromData);
		} catch (error) {
            console.log(error);            
		}
	};

	return (
		<>
            { token ?  
			<div className="container mx-auto my-4">
                <div className="flex justify-center items-center lg:h-screen px-6">
                    <div className="w-full xl:w-3/4 lg:w-11/12 flex">
                        <div className="bg-gray-900 hidden lg:block lg:w-5/12 rounded-l-lg">
                            <Image className='mt-12 mx-10' src="/image/img-4.png" width="300" height="300" alt='img' />
                        </div>
                        <div className="w-full lg:w-7/12 bg-gray-900 p-5 rounded-lg lg:rounded-l-none">
                            <h3 className="pt-4 text-2xl text-center text-gray-300">Verify Your Gmail</h3>
                            <form onSubmit={handleSubmit} className="px-8 pt-6 pb-8 mb-4 bg-gray-900 rounded">
                                
                                <div className="mb-4">
                                    <label className="block mb-2 text-sm font-bold text-gray-300" for="email">
                                        Email
                                    </label>
                                    <input
                                        className="w-full px-3 py-2 mb-3 text-sm bg-gray-800 leading-tight text-gray-400 border border-gray-600 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                        name='email'
                                        id="email"
                                        type="email"
                                        placeholder="Email"
                                        required
                                    />
                                </div>
                                
                                <div className="mb-6 text-center">
                                    <button
                                        className="w-full px-4 py-2 font-bold text-white bg-green-700 rounded-full hover:bg-green-800 focus:outline-none focus:shadow-outline"
                                        type="submit"
                                    >
                                        Verify Your Mail
                                    </button>
                                </div>
                               
                            </form>
                        </div>
                    </div>
                </div>
            </div>
          :  redirect('/login')
          }
		</>
	);
}
