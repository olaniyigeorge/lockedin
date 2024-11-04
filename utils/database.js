import mongoose from 'mongoose';

let isConnected = false; // track the connection

export const connectToDB = async () => {
  console.log("Mongoose connecting to \n")
  mongoose.set('strictQuery', true);

  if(isConnected) {
    console.log('MongoDB is already connected');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "lockedIn",
    })

    isConnected = true;

    console.log('MongoDB connected')
  } catch (error) {
    console.log(error);
  }
}