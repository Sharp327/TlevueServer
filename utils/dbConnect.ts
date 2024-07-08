import mongoose from 'mongoose'

const dbConnect = async () => {
  const mongodbUri = process.env.MONGODB_URI;

  if (!mongodbUri) {
    throw new Error('MONGODB_URI environment variable is not defined');
  }

  try {
    await mongoose.connect(mongodbUri);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

export default dbConnect
