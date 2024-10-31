import mongoose from 'mongoose';

const FavsongSchema = new mongoose.Schema({
    userid: {
        type: String,
        required: true,
    },
    songlist: [{
        songid: {
            type: String,
            required: true,
        },
    }]
});

export const FavSong = mongoose.model("FavSong", FavsongSchema);
