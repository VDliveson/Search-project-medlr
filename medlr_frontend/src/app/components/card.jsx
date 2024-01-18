import React from "react";

export default function Card(props) {
	const { ...data } = props.data;

	const renderTableData = () => {
		const itemDictionary = {
			ID: data.id,
			Dosage: data.dosage,
			"Real Price": data.realPrice,
			"Salt Length": data.saltLen,
			"Medicine Link": data.medicineLink,
			Manufacturer: data.manufacturer,
			Salts: data.salts,
			"Discounted Price": data.discountedPrice,
			"Quantity Text": data.quantityText,
			"Prescription Required": data.prescriptionRequired,
			"Medicine Name": data.medicineName,
			Packaging: data.packaging,
			Quantity: data.quantity,
			Form: data.form,
			Source: data.source,
			Availability: data.availability,
			"Salt 1": data.salt1,
			"Dosage 1": data.dosage1,
			"Salt 2": data.salt2,
			"Dosage 2": data.dosage2,
			"Salt 3": data.salt3,
			"Dosage 3": data.dosage3,
			"Salt 4": data.salt4,
			"Dosage 4": data.dosage4,
			"Cluster Name": data.clusterName,
		};

		return Object.keys(itemDictionary).map((itemName) => (
			<tr key={itemName} className="card-item">
				<td className="px-6 py-4 font-medium text-blue-50 whitespace-nowrap dark:text-blue-100">
					{itemName}
				</td>
				<td className="px-6 py-4">
					{itemDictionary[itemName] !== null ? itemDictionary[itemName] : "-"}
				</td>
			</tr>
		));
	};

	return (
		<div>
			<div className="flow-root bg-blue-600 h-full">
				<table className="w-full text-sm text-left rtl:text-right text-blue-100 dark:text-blue-100">
					<tbody>{renderTableData()}</tbody>
				</table>
			</div>
		</div>
	);
}
