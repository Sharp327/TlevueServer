import { Condition, Query } from 'mongoose'
import SteadingProduct from '../models/steadingProduct'
import { ParsedQs } from 'qs'

export const getProductRepository = async (id: string | string[] | ParsedQs | ParsedQs[] | undefined) => {
  const product = await SteadingProduct.findById(id)
  return product
}

export const getProductsRepository = async () => {
  const products = await SteadingProduct.find()
  return products
}

export const getProductsByCategoryRepository = async (filterData: { pricemin: any; pricemax: any; category: string }) => {
  // insertProduct();
  const pricemin = filterData.pricemin ? filterData.pricemin : 0;
  const pricemax = filterData.pricemax ? filterData.pricemax : 0;

  const categoryList = filterData.category ? filterData.category.split(',') : [];

  const conditions = [];
  if(pricemin !== 0 && pricemax !== 0)
    conditions.push({ price: { $gte: pricemin, $lte: pricemax } });

  if(pricemin !== 0 && pricemax == 0)
    conditions.push({ price: { $gte: pricemin } });

  if(pricemin == 0 && pricemax !== 0)
    conditions.push({ price: { $lte: pricemax } });

  type QueryType = {
    categorylist: {
      $in: any[];
    };
    $or?: any[]; // Make the `$or` property optional
  };

  const query: QueryType = {
    categorylist: {
      $in: categoryList, // Primary condition
    },
  };

  if (conditions.length > 0) {
    query.$or = conditions; // Add the $or condition only if there are conditions to apply
  }

  // Query the products with the appropriate conditions
  const products = await SteadingProduct.find(query);

  return products
}

export const insertProduct = async () => {
  try {
    const newProduct = new SteadingProduct({
      title: 'Goat1',
      description: 'Goat description',
      type: 'steading',
      price: 100,
      new: true,
      sale: true,
      discount: 10,
      stock: 10,
      images: [
        { image_id: 1, id: 1, alt: 'Image 1', src: '/images/layout-4/product/goat.jpg' },
        { image_id: 2, id: 2, alt: 'Image 2', src: '/images/layout-4/product/goat.jpg' },
        { image_id: 3, id: 3, alt: 'Image 3', src: '/images/layout-4/product/goat.jpg' },
        { image_id: 4, id: 4, alt: 'Image 4', src: '/images/layout-4/product/goat.jpg' },
      ],
      total: 2512,
      rate: 3.5,
      categorylist: [
        'Female Goat',
      ],
      createdAt: new Date(),
    });

    // Save the product to the database
    await newProduct.save();

    console.log('Product inserted successfully');
  } catch (error) {
    console.error('Error inserting product:', error);
  }
};

