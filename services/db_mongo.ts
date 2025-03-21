import mongoose from 'mongoose';

let isConnected = false; 

let MONGODB_URI = process.env.MONGODB_URI as string;
let DB_NAME = process.env.DB_NAME as string;


export const connectToDB = async () => {
    console.log("... connecting to db")
    mongoose.set('strictQuery', true);

    if(isConnected) {
        console.log('MongoDB is already connected');
        return;
    }
    try {
        await mongoose.connect(MONGODB_URI, {
            dbName: DB_NAME
        })

        isConnected = true;
        console.log('MongoDB connected')
    } catch (error) {
        console.log(error);
    }
}