import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/athos_collagen');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    // We won't exit if MONGODB_URI is not configured yet, so server can still serve mail notifications
    console.log('Continuing server execution without MongoDB (if connection failed)...');
  }
};

export default connectDB;
