const express = require("express");
const router = express.Router();
const Product = require("../models/product");

const { body, validationResult } = require("express-validator");

router.get("/fetch", async (req, res) => {
	try {
		const allProducts = await Product.find();
		res.status(200).json({
			message: "All products fetched successfully",
			data: allProducts,
		});
		console.log("All products fetched successfully");
	} catch (error) {
		console.error("Error fetching all products:", error.message);
		res.status(500).send("Internal Server Error");
	}
});

router.get("/fetch/:productId", async (req, res) => {
	try {
		const productId = req.params.productId;

		if (!/^[0-9a-fA-F]{24}$/.test(productId)) {
			return res.status(400).json({ message: "Invalid product ID format" });
		}

		const product = await Product.findById(productId);

		if (!product) {
			return res.status(404).json({ message: "Product not found" });
		}

		res.status(200).json({
			message: "Product fetched successfully",
			data: product,
		});
		console.log("Product fetched successfully");
	} catch (error) {
		console.error("Error fetching product by ID:", error.message);
		res.status(500).json({ message: "Internal Server Error" });
	}
});

router.post("/add", async (req, res) => {
	try {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const products = req.body.data;

		if (!products || !Array.isArray(products) || products.length === 0) {
			return res.status(400).json({ message: "Invalid data format" });
		}

		// Check for existing products with the given IDs
		const existingProductIds = await Product.find({
			id: { $in: products.map((p) => p.id) },
		}).distinct("id");

		const newProducts = products.filter(
			(product) => !existingProductIds.includes(product.id)
		);

		if (newProducts.length === 0) {
			return res.status(400).json({ message: "No new products to add" });
		}

		let productDocuments = newProducts.map((productData) => {
			const productDocument = {
				id: productData.id,
				Medicine_Link: productData.Medicine_Link || "",
				Manufacturer: productData.Manufacturer || "",
				Real_Price: productData.Real_Price || 0,
				Salts: productData.Salts || "",
				Discounted_Price: productData.Discounted_Price || "",
				Quantity_text: productData.Quantity_text || "",
				Prescription_Required: productData.Prescription_Required || 0,
				Medicine_Name: productData.Medicine_Name || "",
				Packaging: productData.Packaging || "",
				Quantity: productData.Quantity || "",
				Form: productData.Form || "",
				Salt_Len: productData.Salt_Len || 0,
				Source: productData.Source || "",
				Availability: productData.Availability || 0,
				Salt1: productData.Salt1 || "",
				Dosage1: productData.Dosage1 || "",
				Salt2: productData.Salt2 || "",
				Dosage2: productData.Dosage2 || "",
				Salt3: productData.Salt3 || "",
				Dosage3: productData.Dosage3 || "",
				Salt4: productData.Salt4 || "",
				Dosage4: productData.Dosage4 || "",
				Cluster_Name: productData.Cluster_Name || "",
				Dosage: productData.Dosage || 0,
			};
			return Object.fromEntries(
				Object.entries(productDocument).filter(([_, v]) => v !== null)
			);
		});
		try {
			// Use insertMany to insert multiple documents at once
			const savedProducts = await Product.insertMany(productDocuments);
			console.log("Products added successfully");
			res.json({
				message: "Products added successfully",
				data: savedProducts,
			});
		} catch (error) {
			console.error("Error saving products:", error.message);
			// Handle the error as needed
			res.status(500).send("Internal Server Error");
		}
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Internal Server Error");
	}
});

router.put("/update/:productId", async (req, res) => {
	try {
		const productId = req.params.productId;

		if (!/^[0-9a-fA-F]{24}$/.test(productId)) {
			return res.status(400).json({ message: "Invalid product ID format" });
		}

		const productToUpdate = await Product.findById(productId);

		if (!productToUpdate) {
			return res.status(404).json({ message: "Product not found" });
		}

		const updatedData = req.body.data;
		// Update fields based on the request body
		Object.keys(updatedData).forEach((key) => {
			if (Object.keys(productToUpdate.toObject()).includes(key)) {
				productToUpdate[key] = updatedData[key];
			}
		});

		try {
			const updatedProduct = await productToUpdate.save();
			res.status(200).json({
				message: "Product updated successfully",
				data: updatedProduct,
			});
		} catch (error) {
			console.error("Error updating product:", error.message);
			res.status(500).send("Internal Server Error");
		}
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Internal Server Error");
	}
});

router.delete("/delete/:productId", async (req, res) => {
	try {
		const productId = req.params.productId;

		if (!/^[0-9a-fA-F]{24}$/.test(productId)) {
			return res.status(400).json({ message: "Invalid product ID format" });
		}

		const deletedProduct = await Product.findByIdAndDelete(productId);

		if (!deletedProduct) {
			return res.status(404).json({ message: "Product not found" });
		}

		console.log("Product deleted successfully");
		res.json({
			message: "Product deleted successfully",
			data: deletedProduct,
		});
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Internal Server Error");
	}
});

module.exports = router;
