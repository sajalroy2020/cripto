"use client";
import React, { useEffect,useState } from 'react';
import { getProfileByToken, profileUpdate } from '../../../servises/action/all';
import { useSelector } from 'react-redux';
import Cookies from "js-cookie";
import { useRouter } from 'next/navigation';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Profile() {

    const [errorEmail, setErrorEmail] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const [errorUserName, setErrorUserName] = useState("");
    const [errorCurrentPassword, setErrorCurrentPassword] = useState("");
    const [user, setUser] = useState({});


	const authenticated = useSelector((state) => state.auth.authenticated);
    const router = useRouter();
    const tokensiduser = Cookies.get("tokensiduser");

    const handleSubmit = async (event) => {
        event.preventDefault();
        const fromData = {
            uu_id: event.target.uu_id.value,
            email: event.target.email.value,
            username: event.target.username.value,
            password: event.target.password.value,
            current_password: event.target.current_password.value,
            password_confirmation: event.target.password_confirmation.value,
            // image: event.target.image.value,
        };
        setRegisterData(fromData);
    }

    const setRegisterData = async (fromData) => {
        setErrorEmail('');
        setErrorPassword('');
        setErrorUserName('');
        setErrorCurrentPassword('');

		try {
			const { data } = await profileUpdate(fromData);
            // console.log(data, 'datadatadatadata');
            Cookies.set("token", data.token);
            Cookies.set("tokensiduser", data.user.uu_id);
            // dispatch(authenticatedTrue(), setUser(data.user));
            showMessage('Profile updated Successfully');
		} catch (error) {
            console.log(error, 'errorerrorerror');

            // error message set 
            let email = error.response.data.message['email'];
            if (email) {
              setErrorEmail(email[0]);
            }

            let username = error.response.data.message['username'];
            if (username) {
                setErrorUserName(username[0]);
            }

            let correntPass = error.response.data.message;
            if (correntPass) {
                setErrorCurrentPassword(correntPass);
            }
		}
	};

    const getUser = async (tokensiduser) => {
		try {
			const { data } = await getProfileByToken(tokensiduser);
			setUser(data.user);
		} catch (error) {
			console.error(error, 'errorerrorerrorerror');
		}
	};

    function showMessage(toastMsg) {
        toast.success(toastMsg, {
          position: toast.POSITION.TOP_RIGHT,
        });
    }

    useEffect(() => {                          
			getUser(tokensiduser);
	}, []);

    console.log(user);

	return (
		<>
        {authenticated ?
            <div className='bg-gray-800'>
                <div className='container px-4 md:px-40'>
                    <form onSubmit={handleSubmit}>
                        <input type='hidden' name='uu_id' value={tokensiduser} />
                        <div className="md:p-5 p-2 mt-10 mb-16">
                            <div className="flex flex-wrap pb-12">
                                <div className="w-full pl-8 py-2"><h2 className="font-semibold text-gray-400">{user.name}</h2></div>
                                <div className="w-full flex flex-wrap items-center">
                                    <div className="border-2 border-green-600 rounded-full">
                                        {
                                            user.image ? <img className="bg-gray-400 p-1 rounded-full h-24 w-24 m-2" src={user.image} alt="profile" /> : <img className="bg-gray-400 p-1 rounded-full h-24 w-24 m-2" src="/image/no-image.png" alt="profile" />
                                        }
                                    </div>
                                    <div className="md:pl-5 pl-0 pt-2 md:pt-0">
                                        <p className="text-sm text-gray-400">ypur avatar is one of the defining parts of your profile. it'll help <br /> designers or clients establish an impression of you.</p>
                                    </div>
                                </div>
                            </div>

                            <h3 className="font-semibold text-gray-400">Personal Informations</h3>
                            <div className="md:flex md:items-center mt-6 mb-2">
                                <div className="md:w-3/12">
                                    <label className="block text-gray-500 font-semibold text-sm md:text-left mb-1 md:mb-0 pr-4">
                                        User Name : 
                                    </label>
                                </div>
                                <div className="md:w-7/12">
                                    <p>{user.username}</p>
                                </div>
                            </div>
                            <div className="md:flex md:items-center mt-6 mb-2 border-b border-gray-700 pb-6">
                                <div className="md:w-3/12">
                                    <label className="block text-gray-500 font-semibold text-sm md:text-left mb-1 md:mb-0 pr-4">
                                        Email :
                                    </label>
                                </div>
                                <div className="md:w-7/12">
                                    <p>{user.email}</p>
                                </div>
                            </div>

                            <h3 className="font-semibold text-gray-400 pt-6">Edit Your Informations</h3>
                            <div className="md:flex md:items-center mt-6 mb-2">
                                <div className="md:w-3/12">
                                    <label className="block text-gray-500 font-semibold text-sm md:text-left mb-1 md:mb-0 pr-4">
                                        User Name : <span className='text-red-500'>*</span>
                                    </label>
                                </div>
                                <div className="md:w-7/12">
                                    <input required placeholder={user.username} name='username' className="bg-gray-700 appearance-none border border-gray-500 rounded w-full py-2 px-4 text-gray-200 leading-tight focus:outline-none focus:bg-gray-600" type="text" />
                                    {errorUserName && <p className="text-xs italic text-red-500">{errorUserName}</p>}
                                </div>
                                <div className="md:w-2/12"></div>
                            </div>
                            <div className="md:flex md:items-center mt-4 mb-2">
                                <div className="md:w-3/12">
                                <label className="block text-gray-500 font-semibold text-sm md:text-left mb-1 md:mb-0 pr-4">
                                    Email : <span className='text-red-500'>*</span>
                                </label>
                                </div>
                                <div className="md:w-7/12">
                                    <input required placeholder={user.email} name='email' className="bg-gray-700 appearance-none border border-gray-500 rounded w-full py-2 px-4 text-gray-200 leading-tight focus:outline-none focus:bg-gray-600" type="email" />
                                    {errorEmail && <p className="text-xs italic text-red-500">{errorEmail}</p>}
                                </div>
                                <div className="md:w-2/12"></div>
                            </div>
                            {/* <div className="md:flex md:items-center mt-4 mb-2">
                                <div className="md:w-3/12">
                                <label className="block text-gray-500 font-semibold text-sm md:text-left mb-1 md:mb-0 pr-4">
                                    Image : <span className='text-red-500'>*</span>
                                </label>
                                </div>
                                <div className="md:w-7/12">
                                    <input name='image' className="bg-gray-700 appearance-none border border-gray-500 rounded w-full py-2 px-4 text-gray-200 leading-tight focus:outline-none focus:bg-gray-600" id="image" type="file" />
                                </div>
                                <div className="md:w-2/12"></div>
                            </div> */}
                            
                            <h3 className="mt-16 font-semibold text-gray-400">Change My Password</h3>
                            {errorCurrentPassword && <p className="text-xs italic text-red-500">{errorCurrentPassword}</p>}

                            <div className="md:flex md:items-center mt-6 mb-2">
                                <div className="md:w-3/12">
                                    <label className="block text-gray-500 font-semibold text-sm md:text-left mb-1 md:mb-0 pr-4">
                                        Current password :
                                    </label>
                                </div>
                                <div className="md:w-7/12">
                                    <input name='current_password' className="bg-gray-700 appearance-none border border-gray-500 rounded w-full py-2 px-4 text-gray-200 leading-tight focus:outline-none focus:bg-gray-600" placeholder="" type="password" />
                                </div>
                                <div className="md:w-2/12"></div>
                            </div>
                            <div className="md:flex md:items-center mt-4">
                                <div className="md:w-3/12">
                                <label className="block text-gray-500 font-semibold text-sm md:text-left mb-1 md:mb-0 pr-4">
                                New password :
                                </label>
                                </div>
                                <div className="md:w-7/12">
                                    <input name='password' className="bg-gray-700 appearance-none border border-gray-500 rounded w-full py-2 px-4 text-gray-200 leading-tight focus:outline-none focus:bg-gray-600" placeholder="" type="password" />
                                    {errorPassword && <p className="text-xs italic text-red-500">{errorPassword}</p>}
                                </div>
                                <div className="md:w-2/12"></div>
                            </div>
                            <div className="md:flex md:items-center mt-4">
                                <div className="md:w-3/12">
                                    <label className="block text-gray-500 font-semibold text-sm md:text-left mb-1 md:mb-0 pr-4">
                                    Confirm New password : 
                                    </label>
                                </div>
                                <div className="md:w-7/12">
                                    <input name='password_confirmation' className="bg-gray-700 appearance-none border border-gray-500 rounded w-full py-2 px-4 text-gray-200 leading-tight focus:outline-none focus:bg-gray-600" placeholder="" type="password" />
                                </div>
                                <div className="md:w-2/12"></div>
                            </div>
                            <div className="md:flex md:items-center mt-4">
                                <div className="md:w-3/12 flex gap-3">
                                    <div className="pt-6"><button type='submit' className="px-6 text-sm py-3 bg-gray-400 text-white rounded" href="">Update</button> </div>
                                    <div className="pt-6"><button className="px-6 text-sm py-3 bg-gray-500 text-white rounded" href="">Cancel</button> </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
		:router.push('/login')}
		</>
	);
}




