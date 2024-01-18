"use client";
require("dotenv").config();

import { useState, useEffect } from "react";
import Card from "./card";

export default function Items(props) {
	const { cardItems } = props;

	return (
		<div className="grid gap-y-10 grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-2 lg:grid-cols-3 lg:gap-2">
			{Array.isArray(cardItems) &&
				cardItems.map((element, index) => <Card key={index} data={element} />)}
		</div>
	);
}
