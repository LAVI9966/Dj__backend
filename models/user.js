import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
    uid: {
        type: String,
        required: true
    },
    legalName: {
        type: String,
        required: true,
    },
    verified: {
        type: Boolean,
        required: true,
    },
    artistName: {
        type: String,
        required: true,
    },
    pincode: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensures email is unique across users
        lowercase: true, // Stores email in lowercase for consistency
        trim: true, // Removes any leading or trailing whitespace
    },
    streetAddress: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true, // Ensures mobile number is unique
        validate: {
            validator: function (v) {
                // Regular expression to validate mobile number format
                return /^(?:\+?(\d{1,3}))?[-.●]?(\d{3})[-.●]?(\d{3})[-.●]?(\d{4})$/.test(v);
            },
            message: props => `${props.value} is not a valid mobile number!`
        }
    },
}, {
    timestamps: true, // Automatically creates createdAt and updatedAt fields
});

export const User = mongoose.model('User', UserSchema);

