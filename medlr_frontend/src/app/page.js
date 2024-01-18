"use client";

import axios from "axios";
import "flowbite" ;

import Image from "next/image";
import SearchBar from "./components/search";
import Items from "./components/items";
import Footer from "./components/footer";
import { useState, useEffect } from "react";
require("dotenv").config();
const BASE_URL = "http://localhost:8888/api/store/";

export default function Home() {
	const [cardItems, setItems] = useState([]);
	const [filters, Addfilters] = useState([]);
	const [sorters, Addsorters] = useState([]);
	const [pageNumber, setPageNumber] = useState(0);
	const [pageLimit, setPageLimit] = useState(5);
	const [fields, setFields] = useState([]);
	const [search, updateSearch] = useState("");

	async function getItems() {
		let final_url = BASE_URL + "fetch/";
		final_url += "?pageNumber=" + pageNumber;

		console.log(filters, sorters, search);

		if (search != "") {
			final_url += "&search=" + search;
		}

		if (filters.length > 0) {
			final_url += "&filters=";
			final_url += filters.join("|");
		}

		if (sorters.length > 0) {
			final_url += "&sort=";
			final_url += sorters.join("|");
		}

		console.log(final_url);

		axios
			.get(`${final_url}`)
			.then((response) => {
				if (response && response.data) {
					setPageLimit(response.data.result.totalPages);
					setItems(response.data.result.data);
				}
			})
			.catch((error) => {
				console.error(error);
			});
	}

	async function getFields() {
		let url = BASE_URL + "fields";
		axios
			.get(`${url}`)
			.then((response) => {
				if (response && response.data) {
					setFields(response.data.keys);
				}
			})
			.catch((err) => {
				console.error(err);
			});
	}

	const increment = () => {
		if (pageNumber < pageLimit) {
			setPageNumber(pageNumber + 1);
			getItems();
		}
	};

	const decrement = () => {
		if (pageNumber > 0) {
			setPageNumber(pageNumber - 1);
			getItems();
		}
	};

	const changePage = (newPage) => {
		setPageNumber(newPage);
		getItems();
	};

	useEffect(() => {
		getItems();
		getFields()
		setPageNumber(0);
	}, [filters, sorters, search]);

	return (
		<main>
			<div className="p-4 mb-10">
				<SearchBar
					updateSearch={updateSearch}
					fields={fields}
					Addfilters={Addfilters}
					Addsorters={Addsorters}></SearchBar>
				<Items cardItems={cardItems}></Items>
				<Footer
					pageNumber={pageNumber}
					increment={increment}
					decrement={decrement}
					changePage={changePage}
					pageLimit={pageLimit}></Footer>
			</div>
		</main>
	);
}
