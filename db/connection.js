import mongoose from "mongoose";
const uri = 'mongodb+srv://lavishgehlod:lavishgehlod@cluster0.vp8iwsu.mongodb.net/Dursh';

mongoose.connect(uri)
    .then(() => console.log('Connected to MongoDB successfully'))
    .catch((error) => console.error('Error connecting to MongoDB:', error));
