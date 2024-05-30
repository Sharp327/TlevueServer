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
    query.categorylist = {
      $in: categoryList, // Primary condition
    };
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
  //   const insertProductlist = [];

    // await saveProductData(insertProductlist);

    // const newProduct = new Product({
    //   title: 'Straight Hair',
    //   description: 'Refinery29 Beauty Innovator Awards 2023 Winner&& 7x5 Upgrade Larger Lace Closure&& Pre-Cut Lace, No More Effort To Cut Lace&& Glueless Install, Bands + Combs = Protective Style&& Total Natural Look, Pre-Bleached Invisible Knots & Pre-Plucked Mimic Hairline&& Friendly To Small Head：8 adjustable hooks at back, fit 19-23in size.&& Pre-shaped ear tab：Friendly To Eyeglass-Wearing Group',
    //   type: 'deluxe',
    //   category: 'Gadgets',
    //   price: '199.99', // Consider changing to number
    //   new: true,
    //   sale: false,
    //   discount: 10,
    //   stock: 10,
    //   images: [
    //     { image_id: 1, id: 1, alt: 'Image 1', src: '1.jpg' },
    //     { image_id: 2, id: 2, alt: 'Image 2', src: '2.jpg' },
    //     { image_id: 3, id: 3, alt: 'Image 3', src: '3.jpg' },
    //     { image_id: 4, id: 4, alt: 'Image 4', src: '4.jpg' },
    //   ],
    //   total: 19999,
    //   rate: 4.5,
    //   laceType: 'HD Lace',
    //   laceSize: ['13 x 4', '13 x 6'],
    //   destiny: ['150%', '180%'],
    //   length: [16, 18, 20, 22, 24, 26],
    //   color: 'Natural Color',
    //   texture: 'Body Wave',
    //   hairType: '100% Virgin Human Hair',
    //   categorylist: [
    //     'Bye-Bye knots Wigs',
    //     '13x4 Pre-Everything Wigs'
    //   ],
    //   createdAt: new Date(), // Default: Date.now(),
    // });

    // // Save the product to the database
    // await newProduct.save();

    console.log('Product inserted successfully');
  } catch (error) {
    console.error('Error inserting product:', error);
  }
};

