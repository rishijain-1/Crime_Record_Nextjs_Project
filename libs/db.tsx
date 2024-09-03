import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI || 'your-mongodb-connection-string';

const connectMongo = async () => {
  if (mongoose.connection.readyState === 1) {
    return; 
  }

  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw new Error('Failed to connect to MongoDB');
  }
};

export default connectMongo;
