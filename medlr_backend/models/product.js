const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    Medicine_Link: String,
    Manufacturer: String,
    Real_Price: {
        type: Number
    },
    Salts: String,
    Discounted_Price: String,
    Quantity_text: String,
    Prescription_Required: {
        type: Number
    },
    Medicine_Name: String,
    Packaging: String,
    Quantity: String,
    Form: String,
    Salt_Len: {
        type: Number
    },
    Source: String,
    Availability: {
        type: Number
    },
    Salt1: String,
    Dosage1: String,
    Salt2: String,
    Dosage2: String,
    Salt3: String,
    Dosage3: String,
    Salt4: String,
    Dosage4: String,
    Cluster_Name: String,
    Dosage: {
        type: Number
    }
});

productSchema.index({ '$**': 'text' });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
