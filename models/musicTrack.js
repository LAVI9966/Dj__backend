import mongoose from "mongoose";
// Define the Music Track schema
const musicTrackSchema = new mongoose.Schema({
    title: { type: String, required: true },
    key: { type: String, required: true },
    genre: { type: String, required: true },
    releaseDate: { type: Date, required: true },
    time: { type: String, required: true }, // Format: MM:SS
    bpm: { type: Number, required: true },
    image: {
        url: { type: String, required: true },
        publicId: { type: String, required: true },
    }, // Cover image URL

    // File URLs
    mp3File: {
        url: { type: String, required: true },
        publicId: { type: String, required: true }
    },
    wavFile: {
        type: String, required: true
    },
    zipFile: {
        type: String, required: true
    },

    // Array of licenses
    licenses: [
        {
            name: { type: String, required: true },
            price: { type: Number, required: true, min: 0 },
        },
    ],

    // Automatically store the creation date and the day of the week
    createdAt: { type: Date, default: Date.now },
    dayOfWeek: { type: String },
});

// Middleware to set the 'dayOfWeek' before saving the document
musicTrackSchema.pre('save', function (next) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    this.dayOfWeek = days[this.createdAt.getDay()];
    next();
});

// Create the MusicTrack model
export const MusicTrack = mongoose.model('MusicTrack', musicTrackSchema);

