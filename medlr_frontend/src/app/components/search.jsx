"use client";

import { useState } from "react";

import Image from "next/image";
import Filters from "./filters";
import Sorters from "./sorters";

export default function SearchBar(props) {
	const [searchText, updateSearchText] = useState("");
	const handleInputChange = (event) => {
		const text = event.target.value;
		updateSearchText(text);
	};

	const submitSearch = () => {
		props.updateSearch(searchText);
	};

	return (
		<>
			<div className="flex flex-wrap justify-between place-items-center mb-2">
				<div className="w-full sm:w-1/2">
					<div>
						<label
							htmlFor="default-search"
							className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
							Search
						</label>
						<div className="relative my-2">
							<div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
								<Image src="./search.svg" height={20} width={20} alt=""></Image>
							</div>
							<input
								type="search"
								onChange={handleInputChange}
								id="default-search"
								className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								placeholder="Search items..."
							/>
							<button
								onClick={submitSearch}
								type="submit"
								className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
								Search
							</button>
						</div>
					</div>
				</div>
				<Filters
					getItems={props.getItems}
					fields={props.fields}
					Addfilters={props.Addfilters}></Filters>
				<Sorters
					getItems={props.getItems}
					fields={props.fields}
					Addsorters={props.Addsorters}></Sorters>
			</div>
		</>
	);
}
