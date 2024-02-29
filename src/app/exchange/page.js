"use client";

export default function Exchange() {
	return (
		<>
            <div className='w-full px-10'>
                <div className="flex gap-4">
                    <button class="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 w-full border border-green-500 hover:border-transparent rounded">
                    Buy
                    </button>

                    <button class="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 w-full border border-red-500 hover:border-transparent rounded">
                    Sell
                    </button>
                </div>

                <div class="mt-10">
                    <label for="success" class="block mb-2 text-sm font-medium text-green-700 dark:text-green-500">Price</label>
                    <input type="number" id="success" class="bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-900 dark:border-green-500" placeholder="00.0" />
                </div>
                <button class="bg-transparent bg-green-500 mt-12 font-semibold hover:text-white text-green-500 py-3 w-full border border-green-500 hover:bg-green-700 rounded">
                    Buy-BTC
            	</button>
            </div>
		</>
	);
}




