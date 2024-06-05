import { Condition, Query } from 'mongoose'
import Product from '../models/product'
import { ParsedQs } from 'qs'

export const getProductRepository = async (id: string | ParsedQs | string[] | ParsedQs[] | undefined) => {
  const product = await Product.findById(id)
  return product
}

export const getProductsRepository = async () => {
  const products = await Product.find()
  return products
}

export const getProductsByCategoryRepository = async (filterData: { laceTexture: string; laceSize: string; hairTexture: string; density: string; hairLength: string; hairColor: string; category: string }) => {
  // insertProduct();
  // Define the split arrays for additional filtering
  const laceTextureList = filterData.laceTexture ? filterData.laceTexture.split(',') : [];
  const laceSizeList = filterData.laceSize ? filterData.laceSize.split(',') : [];
  const hairTextureList = filterData.hairTexture ? filterData.hairTexture.split(',') : [];
  const densityList = filterData.density ? filterData.density.split(',') : [];
  const hairLengthList = filterData.hairLength ? filterData.hairLength.split(',') : [];
  const hairColorList = filterData.hairColor ? filterData.hairColor.split(',') : [];
  const categoryList = filterData.category ? filterData.category.split(',') : [];

  const conditions = [];

  // Add conditions to the array only if they have elements to check against
  if (laceTextureList.length > 0) {
    conditions.push({ texture: { $in: laceTextureList } });
  }

  if (laceSizeList.length > 0) {
    conditions.push({ laceSize: { $in: laceSizeList } });
  }

  if (hairTextureList.length > 0) {
    conditions.push({ laceType: { $in: hairTextureList } });
  }

  if (densityList.length > 0) {
    conditions.push({ destiny: { $in: densityList } });
  }

  if (hairLengthList.length > 0) {
    conditions.push({ length: { $in: hairLengthList } });
  }

  if (hairColorList.length > 0) {
    conditions.push({ color: { $in: hairColorList } });
  }

  type QueryType = {
    categorylist?: {
      $in: any[];
    };
    $or?: any[]; // Make the `$or` property optional
  };

  const query: QueryType = {};

  if(categoryList.length > 0){
    conditions.push({categorylist : {
      $in: categoryList, // Primary condition
    }})
    // query.categorylist = {
    //   $in: categoryList, // Primary condition
    // };
  }

  if (conditions.length > 0) {
    query.$or = conditions; // Add the $or condition only if there are conditions to apply
  }
  console.log(query);
  // Query the products with the appropriate conditions
  const products = await Product.find(query);

  return products
}

async function saveProductData(productData: any) {
  for (const item of productData) {
    const newproduct = new Product({ ...item});
    try {
      await newproduct.save();
      console.log(`Saved: ${item.title}`);
    } catch (error) {
      console.error(`Error saving ${item.title}: `, error);
    }
  }
}

export const insertProduct = async () => {
  try {
    // Create a new product instance with the desired data
    // const insertProductlist = [];

    // await saveProductData(insertProductlist);

    console.log('Product inserted successfully');
  } catch (error) {
    console.error('Error inserting product:', error);
  }
};

