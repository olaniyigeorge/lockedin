import mongoose from 'mongoose';

let isConnected = false; 

const MONGODB_URI = process.env.MONGODB_URI as string;


export const connectToDB = async () => {
    console.log("... connecting to db")
    mongoose.set('strictQuery', true);

    if(isConnected) {
        console.log('MongoDB is already connected');
        return;
    }
    try {
        await mongoose.connect(MONGODB_URI, {
            dbName: "lockedIn_v1" // "lockedIn",
        })

        isConnected = true;
        console.log('MongoDB connected')
    } catch (error) {
        console.log(error);
    }
}