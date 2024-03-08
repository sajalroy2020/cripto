"use client";
import { createChart, ColorType } from 'lightweight-charts';
import React, { useEffect, useRef, useState } from 'react';
import { getChart } from '../../../servises/action/all';


export const ChartComponent = props => {

	const {
		data,
		colors: {
			backgroundColor = 'white',
			lineColor = '#2962FF',
			textColor = 'black',
			areaTopColor = '#2962FF',
			areaBottomColor = 'rgba(41, 98, 255, 0.28)',
		} = {},
	} = props;

	const chartContainerRef = useRef();

	useEffect(
		() => {
			const handleResize = () => {
				chart.applyOptions({ width: chartContainerRef.current.clientWidth });
			};

			const chart = createChart(chartContainerRef.current, {
				layout: {
					background: { type: ColorType.Solid, color: backgroundColor },
					textColor,
				},
				width: chartContainerRef.current.clientWidth,
				height: 350,
				layout: {
					background: {
						type: 'solid',
						color: '#000000',
					},
					textColor: 'rgba(255, 255, 255, 0.9)',
				},
				grid: {
					vertLines: {
						color: 'rgba(197, 203, 206, 0.5)',
					},
					horzLines: {
						color: 'rgba(197, 203, 206, 0.5)',
					},
				},
				rightPriceScale: {
					borderColor: 'rgba(197, 203, 206, 0.8)',
				},
				timeScale: {
					borderColor: 'rgba(197, 203, 206, 0.8)',
				},
			});
			chart.timeScale().fitContent();

			const candlestickSeries = chart.addCandlestickSeries({ upColor: '#26a69a', downColor: '#ef5350', borderVisible: false, wickUpColor: '#26a69a', wickDownColor: '#ef5350' });

			candlestickSeries.setData(data);

			window.addEventListener('resize', handleResize);

			return () => {
				window.removeEventListener('resize', handleResize);

				chart.remove();
			};
		},
		[data, backgroundColor, lineColor, textColor, areaTopColor, areaBottomColor]
	);

	return (
		<div
			ref={chartContainerRef}
		/>
	);
};

export default function Lever(props) {

	const [chartData, setChartData] = useState([]);

	const getchartData = async () => {
		try {
			const { data } = await getChart();
			setChartData(data.data);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {                          
		getchartData();
	}, []);

	return (              
		<div className='mx-auto px-0 container mt-4'>
			<div className='border-4 border-gray-300'>
			<ChartComponent {...props} data={chartData}></ChartComponent>
			</div>

			<div className='w-full px-10 py-16'>
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
				<button class="bg-transparent bg-green-500 mt-20 font-semibold hover:text-white text-green-500 py-3 w-full border border-green-500 hover:bg-green-700 rounded">
                    Buy-BTC
            	</button>
            </div>
			
		</div>
	);
}




