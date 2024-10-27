import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    cartItems: [
        {
            id: { type: String, required: true },
            title: { type: String, required: true },
            imageUrl: { type: String, required: true },
            date: { type: Date, default: Date.now }, // Changed to Date type
            selectedLicense: {
                name: { type: String, required: true },
                price: { type: Number, required: true },
                licenseUrl: { type: String },
            },
        },
    ],
    addressInfo: {
        name: { type: String, required: true },
        artistName: { type: String, required: true }, // Added artistName
        streetAddress: { type: String, required: true }, // Changed from address to streetAddress
        pincode: { type: String, required: true },
        phoneNumber: { type: String, required: true },
        state: { type: String, required: true }, // Added state
        country: { type: String, required: true }, // Added country
        date: { type: Date, default: Date.now }, // Changed to Date type
    },
    email: { type: String, required: true },
    userid: { type: String, required: true },
    totalAmount: { type: Number, required: true },
    paymentId: { type: String, required: true },
    date: { type: Date, default: Date.now },
});

export const Order = mongoose.model('Order', orderSchema);
