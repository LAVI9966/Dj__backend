import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    cartItems: [
        {
            id: { type: String, required: true },
            title: { type: String, required: true },
            imageUrl: { type: String, required: true },
            selectedLicense: {
                name: { type: String, required: true },
                price: { type: Number, required: true },
                licenseUrl: { type: String },
            },
        },
    ],
    addressInfo: {
        name: { type: String, required: true },
        address: { type: String, required: true },
        pincode: { type: String, required: true },
        phoneNumber: { type: String, required: true },
        date: { type: String, required: Date.now },
    },
    email: { type: String, required: true },
    userid: { type: String, required: true },
    totalAmount: { type: Number, required: true },
    paymentId: { type: String, required: true },
    date: { type: Date, default: Date.now },
});

export const Order = mongoose.model('Order', orderSchema);

