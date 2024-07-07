import mongoose from 'mongoose';
// import Product from '../models/product';
// import DeluxeProduct from '../models/deluxeProduct';

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
    //   // Check for required fields
    //   const productObj = product.toObject();

    //   // Check for required fields
    //   if (!productObj.title) {
    //     console.warn(`Skipping product with ID ${productObj._id} due to missing title.`);
    //     continue;
    //   }

    //   const deluxeProduct = new DeluxeProduct({
    //     ...productObj,
    //     length: productObj.length ? productObj.length.map(value => ({ value, price: '0' })) : [],
    //     closureLength: productObj.closureLength ? productObj.closureLength.map(value => ({ value, price: '0' })) : [],
    //     frontalLength: productObj.frontalLength ? productObj.frontalLength.map(value => ({ value, price: '0' })) : [],
    //     capSize: productObj.capSize ? productObj.capSize.map(value => ({ value, price: '0' })) : [],
    //   });

    //   await deluxeProduct.save();
    // }

    // console.log('Data migration completed successfully.');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  } finally {
    mongoose.connection.close();
  }
}

export default dbConnect;
