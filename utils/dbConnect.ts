import mongoose from 'mongoose'
import Product from '../models/product';
import DeluxeProduct from '../models/deluxeProduct';

const dbConnect = async () => {
  const mongodbUri = process.env.MONGODB_URI;

  if (!mongodbUri) {
    throw new Error('MONGODB_URI environment variable is not defined');
  }

  try {
    await mongoose.connect(mongodbUri);
    console.log('Connected to MongoDB');

    // const products = await Product.find({});

    // for (const product of products) {
    //   const deluxeProduct = new DeluxeProduct({
    //     ...product,
    //     length: product['length']?product['length'].map(value => ({ value, price: '0' })):[],
    //     closureLength: product['closureLength']?product['closureLength'].map(value => ({ value, price: '0' })):[],
    //     frontalLength: product['frontalLength']?product['frontalLength'].map(value => ({ value, price: '0' })):[],
    //     capSize: product['capSize']?product['capSize'].map(value => ({ value, price: '0' })):[],
    //   })
    //   await deluxeProduct.save();
    // }

    console.log('Data migration completed successfully.');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

export default dbConnect
