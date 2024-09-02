import mongoose from 'mongoose';

async function connectMongo(): Promise<void> {
  const mongoUri = process.env.MONGO_URI ?? '';
  console.log('Connecting to MongoDB at:', mongoUri);

  try {
    await mongoose.connect(mongoUri, {
      bufferCommands: false,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

export default connectMongo;
