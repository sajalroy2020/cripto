"use client";
import Image from 'next/image'
import Link from 'next/link'

export default function Login() {
	return (
		<>
			<div class="container mx-auto my-4">
                <div class="flex justify-center items-center lg:h-screen px-6">
                    <div class="w-full xl:w-3/4 lg:w-11/12 flex">
                        <div class="bg-gray-900 hidden lg:block lg:w-5/12 rounded-l-lg">
                            <Image className='mt-12 mx-10' src="/image/img-4.png" width="300" height="300" alt='img' />
                        </div>
                        <div class="w-full lg:w-7/12 bg-gray-900 p-5 rounded-lg lg:rounded-l-none">
                            <h3 class="pt-4 text-2xl text-center text-gray-300">Login Your Account!</h3>
                            <form class="px-8 pt-6 pb-8 mb-4 bg-gray-900 rounded">
                                
                                <div class="mb-4">
                                    <label class="block mb-2 text-sm font-bold text-gray-300" for="email">
                                        Email
                                    </label>
                                    <input
                                        class="w-full px-3 py-2 mb-3 text-sm bg-gray-800 leading-tight text-gray-400 border border-gray-600 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                        id="email"
                                        type="email"
                                        placeholder="Email"
                                    />
                                </div>
                                <div class="mb-4">
                                    <div class="mb-4 md:mr-2 md:mb-0">
                                        <label class="block mb-2 text-sm font-bold text-gray-300"  for="password">
                                            Password
                                        </label>
                                        <input
                                            class="w-full px-3 py-2 mb-3 text-sm bg-gray-800 leading-tight text-gray-300 border border-gray-600 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                            id="password"
                                            type="password"
                                            placeholder="******************"
                                        />
                                        <p class="text-xs italic text-red-500">Please choose a password.</p>
                                    </div>
                                </div>
                                <div class="mb-6 text-center">
                                    <button
                                        class="w-full px-4 py-2 font-bold text-white bg-green-700 rounded-full hover:bg-green-800 focus:outline-none focus:shadow-outline"
                                        type="button"
                                    >
                                        Login Account
                                    </button>
                                </div>
                                <hr class="mb-6 border-t" />
                                <div class="text-center">
                                    <Link
                                        class="inline-block text-sm text-green-600 align-baseline hover:text-green-800"
                                        href="#"
                                    >
                                        Forgot Password?
                                    </Link>
                                </div>
                                <div class="text-center">
                                    <Link
                                        class="inline-block text-sm text-green-600 align-baseline hover:text-green-800"
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
		</>
	);
}
