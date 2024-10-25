import mongoose from "mongoose";
const OTPSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String, // OTP can be stored as a string to support numbers with leading zeroes
        required: true,
    },

});

export const otpModel = mongoose.model('OTP', OTPSchema);
