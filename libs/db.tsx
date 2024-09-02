// libs/db.ts
import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI || 'your-mongodb-connection-string';

const connectMongo = async () => {
  if (mongoose.connection.readyState === 1) {
    return; // Connection is already established
  }

  try {
    await mongoose.connect(MONGO_URI, {
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw new Error('Failed to connect to MongoDB');
  }
};

export default connectMongo;
