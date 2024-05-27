import { Condition, Query } from 'mongoose'
import AromaticProduct from '../models/aromaticProduct'
import { ParsedQs } from 'qs'

export const getProductRepository = async (id: string | string[] | ParsedQs | ParsedQs[] | undefined) => {
  const product = await AromaticProduct.findById(id)
  return product
}

export const getProductsRepository = async () => {
  const products = await AromaticProduct.find()
  return products
}

export const getProductsByCategoryRepository = async (filterData: { pricemin: any; pricemax: any; scent: string; color: string; category: string }) => {
  // insertProduct();
  const pricemin = filterData.pricemin ? filterData.pricemin : '';
  const pricemax = filterData.pricemax ? filterData.pricemax : '';
  const scentList = filterData.scent ? filterData.scent.split(',') : [];
  const colorList = filterData.color ? filterData.color.split(',') : [];
  const categoryList = filterData.category ? filterData.category.split(',') : [];

  const conditions = [];

  conditions.push({ price: { $gte: pricemin, $lte: pricemax } });

  if (scentList.length > 0) {
    conditions.push({ scent: { $in: scentList } });
  }

  if (colorList.length > 0) {
    conditions.push({ color: { $in: colorList } });
  }

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
  const products = await AromaticProduct.find(query);

  return products
}

export const insertProduct = async () => {
  try {
    const newProduct = new AromaticProduct({
      title: 'Lemon Lavender',
      description: 'Discover the beautiful scents of colorful blooms in the warm desert: notes of rose petals, saguaro cactus, and sage.',
      type: 'aromatic',
      price: 100,
      new: true,
      sale: true,
      discount: 10,
      stock: 10,
      images: [
        { image_id: 1, id: 1, alt: 'Image 1', src: 'https://s7d9.scene7.com/is/image/YankeeCandle/233568386_1749339?wid=180&hei=180' },
        { image_id: 2, id: 2, alt: 'Image 2', src: 'https://s7d9.scene7.com/is/image/YankeeCandle/HMFC0112_YC_NA_SS23_Fragrance2D_DesertBlooms?wid=1000&hei=1000' },
        { image_id: 3, id: 3, alt: 'Image 3', src: 'https://s7d9.scene7.com/is/image/YankeeCandle/233568386_1749339?wid=1000&hei=1000' },
        { image_id: 4, id: 4, alt: 'Image 4', src: 'https://s7d9.scene7.com/is/image/YankeeCandle/233568386_1749324?wid=180&hei=180' },
      ],
      total: 2512,
      rate: 3.5,
      candleType: 'jars',
      scent: ['Bergamot','Amber','Oriental Musk','Cardamom','Cedar','Lilac'],
      color: ['red', 'green', 'blue', 'pink', 'yellow', 'white'],
      categorylist: [
        'signature candles',
        'Bubble Yum',
        'NU-NU’s',
        'Peachy VUE',
        'TLé Shells',
        'Fall',
        'Spring',
        'Summer',
        'Winter',
        'You’re Extraordinary',
        'Not You Feeling Cautee',
        '4 the Love of ME',
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

