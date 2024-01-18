"use client";
import { useState } from "react";


const active = "flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white";
const nonActive = "flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"

export default function Footer(props) {
	const pageNumber = props.pageNumber;
	const pageLimit = props.pageLimit;

	const pages = [];
	const start = Math.floor(pageNumber/4)*4;
	for (let i = start; i < start + 5; i++) {
		if (i <= pageLimit) {
			pages.push(
				<button key={i}>
					<div
						onClick={() => props.changePage(i)}
						aria-current="page" 
						className={i===pageNumber?active:nonActive}>
						{i}
					</div>
				</button>
			);
		}
	}

	return (
		<div className="fixed right-0 bottom-2">
			<nav aria-label="Page navigation example">
				<div className="inline-flex -space-x-px text-sm">
					<button onClick={props.decrement}>
						<div className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
							Previous
						</div>
					</button>
					{pages}
					<button onClick={props.increment}>
						<div className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
							Next
						</div>
					</button>
				</div>
			</nav>
		</div>
	);
}
