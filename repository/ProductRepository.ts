import { Condition, Query } from 'mongoose'
import Product from '../models/product'
import { ParsedQs } from 'qs'

export const getProductRepository = async (id: string | ParsedQs | string[] | ParsedQs[] | undefined) => {
  const product = await Product.findById(id)
  return product
}


export const getProductsRepository = async (page: string) => {
    const limit = 10; // Number of products per page
    const skip = (parseInt(page) - 1) * limit;
  
    const products = await Product.find()
      .skip(skip)
      .limit(limit);
  
    const totalProducts = await Product.countDocuments();
    const totalPages = Math.ceil(totalProducts / limit);
  
    return {
      products,
      totalPages,
    };
};

export const getProductsByCategoryRepository = async (filterData: { laceTexture: string; laceSize: string; hairTexture: string; density: string; hairLength: string; hairColor: string; category: string }) => {
//   insertProduct();
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

//   if (hairLengthList.length > 0) {
//     conditions.push({ 'length.value': { $in: hairLengthList } });
//   }

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
  const products = await Product.find(query).limit(20);

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
    const insertProductlist = [
      {
          "title": "Delux613 Bodywave",
          "description": "Refinery29 Beauty Innovator Awards 2023 Winner&& 7x5 Upgrade Larger Lace Closure&& Pre-Cut Lace, No More Effort To Cut Lace&& Glueless Install, Bands + Combs = Protective Style&& Total Natural Look, Pre-Bleached Invisible Knots & Pre-Plucked Mimic Hairline&& Friendly To Small Head：8 adjustable hooks at back, fit 19-23in size.&& Pre-shaped ear tab：Friendly To Eyeglass-Wearing Group",
          "type": "deluxe",
          "category": "Gadgets",
          "price": "199.99",
          "new": true,
          "sale": false,
          "discount": "10",
          "stock": "10",
          "images": [
              {
                  "image_id": "1",
                  "id": "1",
                  "alt": "Image 1",
                  "src": "/images/deluxe/Deluxe613/DeluxeBodyWave/1.jpg"
              },
              {
                  "image_id": "2",
                  "id": "2",
                  "alt": "Image 2",
                  "src": "/images/deluxe/Deluxe613/DeluxeBodyWave/2.jpg"
              },
              {
                  "image_id": "3",
                  "id": "3",
                  "alt": "Image 3",
                  "src": "/images/deluxe/Deluxe613/DeluxeBodyWave/3.jpg"
              },
              {
                  "image_id": "4",
                  "id": "4",
                  "alt": "Image 4",
                  "src": "/images/deluxe/Deluxe613/DeluxeBodyWave/4.jpg"
              },
              {
                  "image_id": "5",
                  "id": "5",
                  "alt": "Image 5",
                  "src": "/images/deluxe/Deluxe613/DeluxeBodyWave/5.jpg"
              }
          ],
          "qty": "0",
          "total": "19999",
          "rate": 4.5,
          "laceType": [
              "Body Wave"
          ],
          "selectedLaceType": "Body Wave",
          "laceSize": [
              ""
          ],
          "destiny": [
              "150%",
              "180%",
              "200%"
          ],
          "selectedDestiny": "150%",
          "length": [
              "8 8 8 8",
              "10 10 10 10",
              "12 12 12 12",
              "14 14 14 14",
              "16 16 16 16",
              "18 18 18 18",
              "20 20 20 20",
              "22 22 22 22",
              "24 24 24 24",
              "26 26 26 26",
              "28 28 28 28",
              "30 30 30 30",
              "8 8 10 10",
              "10 10 12 12",
              "12 12 14 14",
              "14 14 16 16",
              "16 16 18 18",
              "18 18 20 20",
              "20 20 22 22",
              "22 22 24 24",
              "24 24 26 26",
              "26 26 28 28",
              "28 28 30 30",
              "8 10 12 12",
              "10 12 14 14",
              "12 14 16 16",
              "14 16 18 18",
              "16 18 20 20",
              "18 20 22 22",
              "20 22 24 24",
              "22 24 26 26",
              "24 26 28 28",
              "26 28 30 30"
          ],
          "selectedLength": "8 8 8 8",
          "color": "",
          "availableTextures": [
              "HD Lace",
              "Transparent Lace"
          ],
          "texture": "HD Lace",
          "closureLength": [],
          "selectedClosureLength": "14",
          "hairType": "100% Virgin Human Hair",
          "categorylist": [
              "Bye-Bye-knots-Wigs",
              "13x4-Pre-Everything-Wigs",
              "Delux613",
              "Bodywave",
              "Deluxe-613"
          ]
      },
      {
          "title": "Delux613 Straight Hair",
          "description": "Refinery29 Beauty Innovator Awards 2023 Winner&& 7x5 Upgrade Larger Lace Closure&& Pre-Cut Lace, No More Effort To Cut Lace&& Glueless Install, Bands + Combs = Protective Style&& Total Natural Look, Pre-Bleached Invisible Knots & Pre-Plucked Mimic Hairline&& Friendly To Small Head：8 adjustable hooks at back, fit 19-23in size.&& Pre-shaped ear tab：Friendly To Eyeglass-Wearing Group",
          "type": "deluxe",
          "category": "Gadgets",
          "price": "199.99",
          "new": true,
          "sale": false,
          "discount": "10",
          "stock": "10",
          "images": [
              {
                  "image_id": "1",
                  "id": "1",
                  "alt": "Image 1",
                  "src": "/images/deluxe/Deluxe613/DeluxeStraight613/1.jpg"
              },
              {
                  "image_id": "2",
                  "id": "2",
                  "alt": "Image 2",
                  "src": "/images/deluxe/Deluxe613/DeluxeStraight613/2.jpg"
              },
              {
                  "image_id": "3",
                  "id": "3",
                  "alt": "Image 3",
                  "src": "/images/deluxe/Deluxe613/DeluxeStraight613/3.jpg"
              },
              {
                  "image_id": "4",
                  "id": "4",
                  "alt": "Image 4",
                  "src": "/images/deluxe/Deluxe613/DeluxeStraight613/4.jpg"
              },
              {
                  "image_id": "5",
                  "id": "5",
                  "alt": "Image 5",
                  "src": "/images/deluxe/Deluxe613/DeluxeStraight613/5.jpg"
              },
              {
                  "image_id": "6",
                  "id": "6",
                  "alt": "Image 6",
                  "src": "/images/deluxe/Deluxe613/DeluxeStraight613/6.jpg"
              },
              {
                  "image_id": "7",
                  "id": "7",
                  "alt": "Image 7",
                  "src": "/images/deluxe/Deluxe613/DeluxeStraight613/7.jpg"
              }
          ],
          "qty": "0",
          "total": "19999",
          "rate": 4.5,
          "laceType": [
              "Straight"
          ],
          "selectedLaceType": "Straight",
          "laceSize": [
              ""
          ],
          "destiny": [
              "150%",
              "180%",
              "200%"
          ],
          "selectedDestiny": "150%",
          "length": [
              "8 8 8 8",
              "10 10 10 10",
              "12 12 12 12",
              "14 14 14 14",
              "16 16 16 16",
              "18 18 18 18",
              "20 20 20 20",
              "22 22 22 22",
              "24 24 24 24",
              "26 26 26 26",
              "28 28 28 28",
              "30 30 30 30",
              "8 8 10 10",
              "10 10 12 12",
              "12 12 14 14",
              "14 14 16 16",
              "16 16 18 18",
              "18 18 20 20",
              "20 20 22 22",
              "22 22 24 24",
              "24 24 26 26",
              "26 26 28 28",
              "28 28 30 30",
              "8 10 12 12",
              "10 12 14 14",
              "12 14 16 16",
              "14 16 18 18",
              "16 18 20 20",
              "18 20 22 22",
              "20 22 24 24",
              "22 24 26 26",
              "24 26 28 28",
              "26 28 30 30"
          ],
          "selectedLength": "8 8 8 8",
          "color": "",
          "availableTextures": [
              "HD Lace",
              "Transparent Lace"
          ],
          "texture": "HD Lace",
          "closureLength": [],
          "selectedClosureLength": "14",
          "hairType": "100% Virgin Human Hair",
          "categorylist": [
              "Bye-Bye-knots-Wigs",
              "13x4-Pre-Everything-Wigs",
              "Delux613",
              "Straight",
              "Deluxe-613"
          ]
      },
      {
          "title": "Delux Bundles Body Bundle Hair",
          "description": "Refinery29 Beauty Innovator Awards 2023 Winner&& 7x5 Upgrade Larger Lace Closure&& Pre-Cut Lace, No More Effort To Cut Lace&& Glueless Install, Bands + Combs = Protective Style&& Total Natural Look, Pre-Bleached Invisible Knots & Pre-Plucked Mimic Hairline&& Friendly To Small Head：8 adjustable hooks at back, fit 19-23in size.&& Pre-shaped ear tab：Friendly To Eyeglass-Wearing Group",
          "type": "deluxe",
          "category": "Gadgets",
          "price": "199.99",
          "new": true,
          "sale": false,
          "discount": "10",
          "stock": "10",
          "images": [
              {
                  "image_id": "1",
                  "id": "1",
                  "alt": "Image 1",
                  "src": "/images/deluxe/DeluxeBundles/DeluxeBody-Bundle/1.jpg"
              },
              {
                  "image_id": "2",
                  "id": "2",
                  "alt": "Image 2",
                  "src": "/images/deluxe/DeluxeBundles/DeluxeBody-Bundle/2.jpg"
              },
              {
                  "image_id": "3",
                  "id": "3",
                  "alt": "Image 3",
                  "src": "/images/deluxe/DeluxeBundles/DeluxeBody-Bundle/3.jpg"
              },
              {
                  "image_id": "4",
                  "id": "4",
                  "alt": "Image 4",
                  "src": "/images/deluxe/DeluxeBundles/DeluxeBody-Bundle/4.jpg"
              },
              {
                  "image_id": "5",
                  "id": "5",
                  "alt": "Image 5",
                  "src": "/images/deluxe/DeluxeBundles/DeluxeBody-Bundle/5.jpg"
              }
          ],
          "qty": "0",
          "total": "19999",
          "rate": 4.5,
          "laceType": [
              "Body Wave"
          ],
          "selectedLaceType": "Body Wave",
          "laceSize": [
              ""
          ],
          "destiny": [
              "150%",
              "180%",
              "200%"
          ],
          "selectedDestiny": "150%",
          "length": [
              "8 8 8 8",
              "10 10 10",
              "12 12 12",
              "14 14 14",
              "16 16 16",
              "18 18 18",
              "20 20 20",
              "22 22 22",
              "24 24 24",
              "26 26 26",
              "28 28 28",
              "30 30 30",
              "8 10 12",
              "12 14 16",
              "14 16 18",
              "16 18 20",
              "18 20 22",
              "20 22 24",
              "22 24 26",
              "24 26 28",
              "26 28 30",
              "8 8 10",
              "10 10 12",
              "12 12 14",
              "14 14 16",
              "16 16 18",
              "18 18 20",
              "20 20 22",
              "22 22 24",
              "24 24 26",
              "26 26 28",
              "28 28 30"
          ],
          "selectedLength": "8 8 8 8",
          "color": "Bundles",
          "availableTextures": [
              "HD Lace",
              "Transparent Lace"
          ],
          "texture": "HD Lace",
          "closureLength": [],
          "selectedClosureLength": "14",
          "hairType": "100% Virgin Human Hair",
          "categorylist": [
              "Bye-Bye-knots-Wigs",
              "13x4-Pre-Everything-Wigs",
              "Body-Bundle",
              "Deluxe-Bundles",
              "3-Bundles"
          ],
          "capSize": [],
          "frontalLength": [],
          "selectedCapSize": "14",
          "selectedFrontalLength": "14"
      },
      {
          "title": "Delux Bundles Deep Bundle Hair",
          "description": "Refinery29 Beauty Innovator Awards 2023 Winner&& 7x5 Upgrade Larger Lace Closure&& Pre-Cut Lace, No More Effort To Cut Lace&& Glueless Install, Bands + Combs = Protective Style&& Total Natural Look, Pre-Bleached Invisible Knots & Pre-Plucked Mimic Hairline&& Friendly To Small Head：8 adjustable hooks at back, fit 19-23in size.&& Pre-shaped ear tab：Friendly To Eyeglass-Wearing Group",
          "type": "deluxe",
          "category": "Gadgets",
          "price": "199.99",
          "new": true,
          "sale": false,
          "discount": "10",
          "stock": "10",
          "images": [
              {
                  "image_id": "1",
                  "id": "1",
                  "alt": "Image 1",
                  "src": "/images/deluxe/DeluxeBundles/DeluxeDeepBundle/1.jpg"
              },
              {
                  "image_id": "2",
                  "id": "2",
                  "alt": "Image 2",
                  "src": "/images/deluxe/DeluxeBundles/DeluxeDeepBundle/2.jpg"
              },
              {
                  "image_id": "3",
                  "id": "3",
                  "alt": "Image 3",
                  "src": "/images/deluxe/DeluxeBundles/DeluxeDeepBundle/3.jpg"
              },
              {
                  "image_id": "4",
                  "id": "4",
                  "alt": "Image 4",
                  "src": "/images/deluxe/DeluxeBundles/DeluxeDeepBundle/4.jpg"
              },
              {
                  "image_id": "5",
                  "id": "5",
                  "alt": "Image 5",
                  "src": "/images/deluxe/DeluxeBundles/DeluxeDeepBundle/5.jpg"
              }
          ],
          "qty": "0",
          "total": "19999",
          "rate": 4.5,
          "laceType": [
              "Deep Wave"
          ],
          "selectedLaceType": "Deep Wave",
          "laceSize": [
              ""
          ],
          "destiny": [
              "150%",
              "180%",
              "200%"
          ],
          "selectedDestiny": "150%",
          "length": [
              "10 10 12 12",
              "12 12 14 14",
              "14 14 16 16",
              "16 16 18 18",
              "18 18 20 20",
              "20 20 22 22",
              "22 22 24 24",
              "24 24 26 26",
              "26 26 28 28",
              "28 28 30 30",
              "18 20 22 24",
              "20 22 24 26",
              "22 24 26 28",
              "24 26 28 30",
              "20 20 20 20",
              "22 22 22 22",
              "24 24 24 24",
              "26 26 26 26",
              "28 28 28 28",
              "30 30 30 30"
          ],
          "selectedLength": "8 8 8 8",
          "color": "Bundles",
          "availableTextures": [
              "HD Lace",
              "Transparent Lace"
          ],
          "texture": "HD Lace",
          "closureLength": [
              "12",
              "14",
              "16",
              "18",
              "20",
              "22"
          ],
          "selectedClosureLength": "14",
          "hairType": "100% Virgin Human Hair",
          "categorylist": [
              "Bye-Bye-knots-Wigs",
              "13x4-Pre-Everything-Wigs",
              "Body-Bundle",
              "Deluxe-Bundles",
              "4-Bundles-With-Closure"
          ],
          "capSize": [],
          "frontalLength": [],
          "selectedCapSize": "14",
          "selectedFrontalLength": "14"
      },
      {
          "title": "Delux Bundles Loose Wave Bundle Hair",
          "description": "Refinery29 Beauty Innovator Awards 2023 Winner&& 7x5 Upgrade Larger Lace Closure&& Pre-Cut Lace, No More Effort To Cut Lace&& Glueless Install, Bands + Combs = Protective Style&& Total Natural Look, Pre-Bleached Invisible Knots & Pre-Plucked Mimic Hairline&& Friendly To Small Head：8 adjustable hooks at back, fit 19-23in size.&& Pre-shaped ear tab：Friendly To Eyeglass-Wearing Group",
          "type": "deluxe",
          "category": "Gadgets",
          "price": "199.99",
          "new": true,
          "sale": false,
          "discount": "10",
          "stock": "10",
          "images": [
              {
                  "image_id": "1",
                  "id": "1",
                  "alt": "Image 1",
                  "src": "/images/deluxe/DeluxeBundles/DeluxeLooseWaveBundle/1.jpg"
              },
              {
                  "image_id": "2",
                  "id": "2",
                  "alt": "Image 2",
                  "src": "/images/deluxe/DeluxeBundles/DeluxeLooseWaveBundle/2.jpg"
              },
              {
                  "image_id": "3",
                  "id": "3",
                  "alt": "Image 3",
                  "src": "/images/deluxe/DeluxeBundles/DeluxeLooseWaveBundle/3.jpg"
              },
              {
                  "image_id": "4",
                  "id": "4",
                  "alt": "Image 4",
                  "src": "/images/deluxe/DeluxeBundles/DeluxeLooseWaveBundle/4.jpg"
              },
              {
                  "image_id": "5",
                  "id": "5",
                  "alt": "Image 5",
                  "src": "/images/deluxe/DeluxeBundles/DeluxeLooseWaveBundle/5.jpg"
              }
          ],
          "qty": "0",
          "total": "19999",
          "rate": 4.5,
          "laceType": [
              "Loose Wave"
          ],
          "selectedLaceType": "Loose Wave",
          "laceSize": [
              ""
          ],
          "destiny": [
              "150%",
              "180%",
              "200%"
          ],
          "selectedDestiny": "150%",
          "length": [
              "8",
              "10",
              "12",
              "14",
              "16",
              "18",
              "20",
              "22",
              "24",
              "26",
              "28",
              "30"
          ],
          "selectedLength": "8 8 8 8",
          "color": "Bundles",
          "availableTextures": [
              "HD Lace",
              "Transparent Lace"
          ],
          "texture": "HD Lace",
          "closureLength": [],
          "selectedClosureLength": "14",
          "hairType": "100% Virgin Human Hair",
          "categorylist": [
              "Bye-Bye-knots-Wigs",
              "13x4-Pre-Everything-Wigs",
              "Loose-Wave-Bundle",
              "Deluxe-Bundles",
              "1-Bundle"
          ],
          "capSize": [],
          "frontalLength": [],
          "selectedCapSize": "14",
          "selectedFrontalLength": "14"
      },
      {
          "title": "Delux Bundles Straight bundle Hair 3 Bundles With Closure",
          "description": "Refinery29 Beauty Innovator Awards 2023 Winner&& 7x5 Upgrade Larger Lace Closure&& Pre-Cut Lace, No More Effort To Cut Lace&& Glueless Install, Bands + Combs = Protective Style&& Total Natural Look, Pre-Bleached Invisible Knots & Pre-Plucked Mimic Hairline&& Friendly To Small Head：8 adjustable hooks at back, fit 19-23in size.&& Pre-shaped ear tab：Friendly To Eyeglass-Wearing Group",
          "type": "deluxe",
          "category": "Gadgets",
          "price": "199.99",
          "new": true,
          "sale": false,
          "discount": "10",
          "stock": "10",
          "images": [
              {
                  "image_id": "1",
                  "id": "1",
                  "alt": "Image 1",
                  "src": "/images/deluxe/DeluxeBundles/DeluxeStraightBundle/1.jpg"
              },
              {
                  "image_id": "2",
                  "id": "2",
                  "alt": "Image 2",
                  "src": "/images/deluxe/DeluxeBundles/DeluxeStraightBundle/2.jpg"
              },
              {
                  "image_id": "3",
                  "id": "3",
                  "alt": "Image 3",
                  "src": "/images/deluxe/DeluxeBundles/DeluxeStraightBundle/3.jpg"
              },
              {
                  "image_id": "4",
                  "id": "4",
                  "alt": "Image 4",
                  "src": "/images/deluxe/DeluxeBundles/DeluxeStraightBundle/4.jpg"
              },
              {
                  "image_id": "5",
                  "id": "5",
                  "alt": "Image 5",
                  "src": "/images/deluxe/DeluxeBundles/DeluxeStraightBundle/5.jpg"
              }
          ],
          "qty": "0",
          "total": "19999",
          "rate": 4.5,
          "laceType": [
              "Straight"
          ],
          "selectedLaceType": "Straight",
          "laceSize": [
              ""
          ],
          "destiny": [
              "150%",
              "180%",
              "200%"
          ],
          "selectedDestiny": "150%",
          "length": [
              "10 10 10",
              "12 12 12",
              "14 14 14",
              "16 16 16",
              "18 18 18",
              "20 20 20",
              "22 22 22",
              "24 24 24",
              "26 26 26",
              "28 28 28",
              "30 30 30",
              "10 12 14",
              "12 14 16",
              "14 16 18",
              "16 18 20",
              "18 20 22",
              "20 22 24",
              "22 24 26",
              "24 26 28",
              "26 28 30"
          ],
          "selectedLength": "8 8 8 8",
          "color": "Bundles",
          "availableTextures": [
              "HD Lace",
              "Transparent Lace"
          ],
          "texture": "HD Lace",
          "closureLength": [
              "12",
              "14",
              "16",
              "18",
              "20",
              "22"
          ],
          "selectedClosureLength": "14",
          "hairType": "100% Virgin Human Hair",
          "categorylist": [
              "Bye-Bye-knots-Wigs",
              "13x4-Pre-Everything-Wigs",
              "Straight-Bundle",
              "Deluxe-Bundles",
              "3-Bundles-With-Closure"
          ],
          "capSize": [],
          "frontalLength": [],
          "selectedCapSize": "14",
          "selectedFrontalLength": "14"
      },
      {
          "title": "Delux Bundles Body Bundle Hair 4 Bundles",
          "description": "Refinery29 Beauty Innovator Awards 2023 Winner&& 7x5 Upgrade Larger Lace Closure&& Pre-Cut Lace, No More Effort To Cut Lace&& Glueless Install, Bands + Combs = Protective Style&& Total Natural Look, Pre-Bleached Invisible Knots & Pre-Plucked Mimic Hairline&& Friendly To Small Head：8 adjustable hooks at back, fit 19-23in size.&& Pre-shaped ear tab：Friendly To Eyeglass-Wearing Group",
          "type": "deluxe",
          "category": "Gadgets",
          "price": "199.99",
          "new": true,
          "sale": false,
          "discount": "10",
          "stock": "10",
          "images": [
              {
                  "image_id": "1",
                  "id": "1",
                  "alt": "Image 1",
                  "src": "/images/deluxe/DeluxeBundles/DeluxeBody-Bundle/1.jpg"
              },
              {
                  "image_id": "2",
                  "id": "2",
                  "alt": "Image 2",
                  "src": "/images/deluxe/DeluxeBundles/DeluxeBody-Bundle/2.jpg"
              },
              {
                  "image_id": "3",
                  "id": "3",
                  "alt": "Image 3",
                  "src": "/images/deluxe/DeluxeBundles/DeluxeBody-Bundle/3.jpg"
              },
              {
                  "image_id": "4",
                  "id": "4",
                  "alt": "Image 4",
                  "src": "/images/deluxe/DeluxeBundles/DeluxeBody-Bundle/4.jpg"
              },
              {
                  "image_id": "5",
                  "id": "5",
                  "alt": "Image 5",
                  "src": "/images/deluxe/DeluxeBundles/DeluxeBody-Bundle/5.jpg"
              }
          ],
          "qty": "0",
          "total": "19999",
          "rate": 4.5,
          "laceType": [
              "Body Wave"
          ],
          "selectedLaceType": "Body Wave",
          "laceSize": [
              ""
          ],
          "destiny": [
              "150%",
              "180%",
              "200%"
          ],
          "selectedDestiny": "150%",
          "length": [
              "8 8 8 8",
              "10 10 10 10",
              "12 12 12 12",
              "14 14 14 14",
              "16 16 16 16",
              "18 18 18 18",
              "20 20 20 20",
              "22 22 22 22",
              "24 24 24 24",
              "26 26 26 26",
              "28 28 28 28",
              "8 8 10 10",
              "10 10 12 12",
              "12 12 14 14",
              "14 14 16 16",
              "16 16 18 18",
              "18 18 20 20",
              "20 20 22 22",
              "22 22 24 24",
              "24 24 26 26",
              "26 26 28 28",
              "8 10 12 14",
              "10 12 14 16",
              "12 14 16 18",
              "14 16 18 20",
              "16 18 20 22",
              "18 20 22 24",
              "20 22 24 26",
              "22 24 26 28"
          ],
          "selectedLength": "8 8 8 8",
          "color": "Bundles",
          "availableTextures": [
              "HD Lace",
              "Transparent Lace"
          ],
          "texture": "HD Lace",
          "closureLength": [],
          "selectedClosureLength": "14",
          "hairType": "100% Virgin Human Hair",
          "categorylist": [
              "Bye-Bye-knots-Wigs",
              "13x4-Pre-Everything-Wigs",
              "Body-Bundle",
              "Deluxe-Bundles",
              "4-Bundles"
          ],
          "capSize": [],
          "frontalLength": [],
          "selectedCapSize": "14",
          "selectedFrontalLength": "14"
      },
      {
          "title": "Delux Bundles Deep Bundle Hair 10 Bundles",
          "description": "Refinery29 Beauty Innovator Awards 2023 Winner&& 7x5 Upgrade Larger Lace Closure&& Pre-Cut Lace, No More Effort To Cut Lace&& Glueless Install, Bands + Combs = Protective Style&& Total Natural Look, Pre-Bleached Invisible Knots & Pre-Plucked Mimic Hairline&& Friendly To Small Head：8 adjustable hooks at back, fit 19-23in size.&& Pre-shaped ear tab：Friendly To Eyeglass-Wearing Group",
          "type": "deluxe",
          "category": "Gadgets",
          "price": "199.99",
          "new": true,
          "sale": false,
          "discount": "10",
          "stock": "10",
          "images": [
              {
                  "image_id": "1",
                  "id": "1",
                  "alt": "Image 1",
                  "src": "/images/deluxe/DeluxeBundles/DeluxeDeepBundle/1.jpg"
              },
              {
                  "image_id": "2",
                  "id": "2",
                  "alt": "Image 2",
                  "src": "/images/deluxe/DeluxeBundles/DeluxeDeepBundle/2.jpg"
              },
              {
                  "image_id": "3",
                  "id": "3",
                  "alt": "Image 3",
                  "src": "/images/deluxe/DeluxeBundles/DeluxeDeepBundle/3.jpg"
              },
              {
                  "image_id": "4",
                  "id": "4",
                  "alt": "Image 4",
                  "src": "/images/deluxe/DeluxeBundles/DeluxeDeepBundle/4.jpg"
              },
              {
                  "image_id": "5",
                  "id": "5",
                  "alt": "Image 5",
                  "src": "/images/deluxe/DeluxeBundles/DeluxeDeepBundle/5.jpg"
              }
          ],
          "qty": "0",
          "total": "19999",
          "rate": 4.5,
          "laceType": [
              "Deep Wave"
          ],
          "selectedLaceType": "Deep Wave",
          "laceSize": [
              ""
          ],
          "destiny": [
              "150%",
              "180%",
              "200%"
          ],
          "selectedDestiny": "150%",
          "length": [
              "10 10 12 12",
              "12 12 14 14",
              "14 14 16 16",
              "16 16 18 18",
              "18 18 20 20",
              "20 20 22 22",
              "22 22 24 24",
              "24 24 26 26",
              "26 26 28 28",
              "28 28 30 30",
              "18 20 22 24",
              "20 22 24 26",
              "22 24 26 28",
              "24 26 28 30",
              "20 20 20 20",
              "22 22 22 22",
              "24 24 24 24",
              "26 26 26 26",
              "28 28 28 28",
              "30 30 30 30"
          ],
          "selectedLength": "8 8 8 8",
          "color": "Bundles",
          "availableTextures": [
              "HD Lace",
              "Transparent Lace"
          ],
          "texture": "HD Lace",
          "closureLength": [
              "12",
              "14",
              "16",
              "18",
              "20",
              "22"
          ],
          "selectedClosureLength": "14",
          "hairType": "100% Virgin Human Hair",
          "categorylist": [
              "Bye-Bye-knots-Wigs",
              "13x4-Pre-Everything-Wigs",
              "Body-Bundle",
              "Deluxe-Bundles",
              "10-Bundles"
          ],
          "capSize": [],
          "frontalLength": [],
          "selectedCapSize": "14",
          "selectedFrontalLength": "14"
      },
      {
          "title": "Delux Bundles Loose Wave 3 Bundles With Frontal",
          "description": "Refinery29 Beauty Innovator Awards 2023 Winner&& 7x5 Upgrade Larger Lace Closure&& Pre-Cut Lace, No More Effort To Cut Lace&& Glueless Install, Bands + Combs = Protective Style&& Total Natural Look, Pre-Bleached Invisible Knots & Pre-Plucked Mimic Hairline&& Friendly To Small Head：8 adjustable hooks at back, fit 19-23in size.&& Pre-shaped ear tab：Friendly To Eyeglass-Wearing Group",
          "type": "deluxe",
          "category": "Gadgets",
          "price": "199.99",
          "new": true,
          "sale": false,
          "discount": "10",
          "stock": "10",
          "images": [
              {
                  "image_id": "1",
                  "id": "1",
                  "alt": "Image 1",
                  "src": "/images/deluxe/DeluxeBundles/DeluxeLooseWaveBundle/1.jpg"
              },
              {
                  "image_id": "2",
                  "id": "2",
                  "alt": "Image 2",
                  "src": "/images/deluxe/DeluxeBundles/DeluxeLooseWaveBundle/2.jpg"
              },
              {
                  "image_id": "3",
                  "id": "3",
                  "alt": "Image 3",
                  "src": "/images/deluxe/DeluxeBundles/DeluxeLooseWaveBundle/3.jpg"
              },
              {
                  "image_id": "4",
                  "id": "4",
                  "alt": "Image 4",
                  "src": "/images/deluxe/DeluxeBundles/DeluxeLooseWaveBundle/4.jpg"
              },
              {
                  "image_id": "5",
                  "id": "5",
                  "alt": "Image 5",
                  "src": "/images/deluxe/DeluxeBundles/DeluxeLooseWaveBundle/5.jpg"
              }
          ],
          "qty": "0",
          "total": "19999",
          "rate": 4.5,
          "laceType": [
              "Loose Wave"
          ],
          "selectedLaceType": "Loose Wave",
          "laceSize": [
              ""
          ],
          "destiny": [
              "150%",
              "180%",
              "200%"
          ],
          "selectedDestiny": "150%",
          "length": [
              "10 10 10",
              "12 12 12",
              "14 14 14",
              "16 16 16",
              "18 18 18",
              "20 20 20",
              "22 22 22",
              "24 24 24",
              "26 26 26",
              "28 28 28",
              "30 30 30",
              "10 12 14",
              "12 14 16",
              "14 16 18",
              "16 18 20",
              "18 20 22",
              "20 22 24",
              "22 24 26",
              "24 26 28",
              "26 28 30"
          ],
          "selectedLength": "8 8 8 8",
          "color": "Bundles",
          "availableTextures": [
              "HD Lace",
              "Transparent Lace"
          ],
          "texture": "HD Lace",
          "closureLength": [],
          "selectedClosureLength": "14",
          "hairType": "100% Virgin Human Hair",
          "categorylist": [
              "Bye-Bye-knots-Wigs",
              "13x4-Pre-Everything-Wigs",
              "Loose-Wave-Bundle",
              "Deluxe-Bundles",
              "3-Bundles-With-Frontal"
          ],
          "capSize": [],
          "frontalLength": [
              "12",
              "14",
              "16",
              "18",
              "20",
              "22"
          ],
          "selectedCapSize": "14",
          "selectedFrontalLength": "14"
      },
      {
          "title": "Delux Bundles Straight 4 Bundles With Frontal",
          "description": "Refinery29 Beauty Innovator Awards 2023 Winner&& 7x5 Upgrade Larger Lace Closure&& Pre-Cut Lace, No More Effort To Cut Lace&& Glueless Install, Bands + Combs = Protective Style&& Total Natural Look, Pre-Bleached Invisible Knots & Pre-Plucked Mimic Hairline&& Friendly To Small Head：8 adjustable hooks at back, fit 19-23in size.&& Pre-shaped ear tab：Friendly To Eyeglass-Wearing Group",
          "type": "deluxe",
          "category": "Gadgets",
          "price": "199.99",
          "new": true,
          "sale": false,
          "discount": "10",
          "stock": "10",
          "images": [
              {
                  "image_id": "1",
                  "id": "1",
                  "alt": "Image 1",
                  "src": "/images/deluxe/DeluxeBundles/DeluxeStraightBundle/1.jpg"
              },
              {
                  "image_id": "2",
                  "id": "2",
                  "alt": "Image 2",
                  "src": "/images/deluxe/DeluxeBundles/DeluxeStraightBundle/2.jpg"
              },
              {
                  "image_id": "3",
                  "id": "3",
                  "alt": "Image 3",
                  "src": "/images/deluxe/DeluxeBundles/DeluxeStraightBundle/3.jpg"
              },
              {
                  "image_id": "4",
                  "id": "4",
                  "alt": "Image 4",
                  "src": "/images/deluxe/DeluxeBundles/DeluxeStraightBundle/4.jpg"
              },
              {
                  "image_id": "5",
                  "id": "5",
                  "alt": "Image 5",
                  "src": "/images/deluxe/DeluxeBundles/DeluxeStraightBundle/5.jpg"
              }
          ],
          "qty": "0",
          "total": "19999",
          "rate": 4.5,
          "laceType": [
              "Straight"
          ],
          "selectedLaceType": "Straight",
          "laceSize": [
              ""
          ],
          "destiny": [
              "150%",
              "180%",
              "200%"
          ],
          "selectedDestiny": "150%",
          "length": [
              "10 10 12 12",
              "12 12 14 14",
              "14 14 16 16",
              "16 16 18 18",
              "18 18 20 20",
              "20 20 22 22",
              "22 22 24 24",
              "24 24 26 26",
              "26 26 28 28",
              "28 28 30 30",
              "18 20 22 24",
              "20 22 24 26",
              "22 24 26 28",
              "24 26 28 30",
              "26 28 30 30",
              "20 20 20 20",
              "22 22 22 22",
              "24 24 24 24",
              "26 26 26 26",
              "28 28 28 28",
              "30 30 30 30"
          ],
          "selectedLength": "8 8 8 8",
          "color": "Bundles",
          "availableTextures": [
              "HD Lace",
              "Transparent Lace"
          ],
          "texture": "HD Lace",
          "closureLength": [],
          "selectedClosureLength": "14",
          "hairType": "100% Virgin Human Hair",
          "categorylist": [
              "Bye-Bye-knots-Wigs",
              "13x4-Pre-Everything-Wigs",
              "Straight-Bundle",
              "Deluxe-Bundles",
              "4-Bundles-With-Frontal"
          ],
          "capSize": [],
          "frontalLength": [
              "12",
              "14",
              "16",
              "18",
              "20",
              "22"
          ],
          "selectedCapSize": "14",
          "selectedFrontalLength": "14"
      },
      {
          "title": "Delux Bundles Deep HD Closure With Bundles",
          "description": "Refinery29 Beauty Innovator Awards 2023 Winner&& 7x5 Upgrade Larger Lace Closure&& Pre-Cut Lace, No More Effort To Cut Lace&& Glueless Install, Bands + Combs = Protective Style&& Total Natural Look, Pre-Bleached Invisible Knots & Pre-Plucked Mimic Hairline&& Friendly To Small Head：8 adjustable hooks at back, fit 19-23in size.&& Pre-shaped ear tab：Friendly To Eyeglass-Wearing Group",
          "type": "deluxe",
          "category": "Gadgets",
          "price": "199.99",
          "new": true,
          "sale": false,
          "discount": "10",
          "stock": "10",
          "images": [
              {
                  "image_id": "1",
                  "id": "1",
                  "alt": "Image 1",
                  "src": "/images/deluxe/DeluxeBundles/DeluxeDeepBundle/1.jpg"
              },
              {
                  "image_id": "2",
                  "id": "2",
                  "alt": "Image 2",
                  "src": "/images/deluxe/DeluxeBundles/DeluxeDeepBundle/2.jpg"
              },
              {
                  "image_id": "3",
                  "id": "3",
                  "alt": "Image 3",
                  "src": "/images/deluxe/DeluxeBundles/DeluxeDeepBundle/3.jpg"
              },
              {
                  "image_id": "4",
                  "id": "4",
                  "alt": "Image 4",
                  "src": "/images/deluxe/DeluxeBundles/DeluxeDeepBundle/4.jpg"
              },
              {
                  "image_id": "5",
                  "id": "5",
                  "alt": "Image 5",
                  "src": "/images/deluxe/DeluxeBundles/DeluxeDeepBundle/5.jpg"
              }
          ],
          "qty": "0",
          "total": "19999",
          "rate": 4.5,
          "laceType": [
              "Deep Wave"
          ],
          "selectedLaceType": "Deep Wave",
          "laceSize": [
              ""
          ],
          "destiny": [
              "150%",
              "180%",
              "200%"
          ],
          "selectedDestiny": "150%",
          "length": [
              "10 10 12 12",
              "12 12 14 14",
              "14 14 16 16",
              "16 16 18 18",
              "18 18 20 20",
              "20 20 22 22",
              "22 22 24 24",
              "24 24 26 26",
              "26 26 28 28",
              "28 28 30 30",
              "18 20 22 24",
              "20 22 24 26",
              "22 24 26 28",
              "24 26 28 30",
              "20 20 20 20",
              "22 22 22 22",
              "24 24 24 24",
              "26 26 26 26",
              "28 28 28 28",
              "30 30 30 30"
          ],
          "selectedLength": "8 8 8 8",
          "color": "Bundles",
          "availableTextures": [
              "HD Lace",
              "Transparent Lace"
          ],
          "texture": "HD Lace",
          "closureLength": [
              "12",
              "14",
              "16",
              "18",
              "20",
              "22"
          ],
          "selectedClosureLength": "14",
          "hairType": "100% Virgin Human Hair",
          "categorylist": [
              "Bye-Bye-knots-Wigs",
              "13x4-Pre-Everything-Wigs",
              "Body-Bundle",
              "Deluxe-Bundles",
              "HD-Closure-With-Bundles"
          ],
          "capSize": [],
          "frontalLength": [],
          "selectedCapSize": "14",
          "selectedFrontalLength": "14"
      },
      {
          "title": "Delux Bundles Loose Wave HD Frontal With Bundles",
          "description": "Refinery29 Beauty Innovator Awards 2023 Winner&& 7x5 Upgrade Larger Lace Closure&& Pre-Cut Lace, No More Effort To Cut Lace&& Glueless Install, Bands + Combs = Protective Style&& Total Natural Look, Pre-Bleached Invisible Knots & Pre-Plucked Mimic Hairline&& Friendly To Small Head：8 adjustable hooks at back, fit 19-23in size.&& Pre-shaped ear tab：Friendly To Eyeglass-Wearing Group",
          "type": "deluxe",
          "category": "Gadgets",
          "price": "199.99",
          "new": true,
          "sale": false,
          "discount": "10",
          "stock": "10",
          "images": [
              {
                  "image_id": "1",
                  "id": "1",
                  "alt": "Image 1",
                  "src": "/images/deluxe/DeluxeBundles/DeluxeLooseWaveBundle/1.jpg"
              },
              {
                  "image_id": "2",
                  "id": "2",
                  "alt": "Image 2",
                  "src": "/images/deluxe/DeluxeBundles/DeluxeLooseWaveBundle/2.jpg"
              },
              {
                  "image_id": "3",
                  "id": "3",
                  "alt": "Image 3",
                  "src": "/images/deluxe/DeluxeBundles/DeluxeLooseWaveBundle/3.jpg"
              },
              {
                  "image_id": "4",
                  "id": "4",
                  "alt": "Image 4",
                  "src": "/images/deluxe/DeluxeBundles/DeluxeLooseWaveBundle/4.jpg"
              },
              {
                  "image_id": "5",
                  "id": "5",
                  "alt": "Image 5",
                  "src": "/images/deluxe/DeluxeBundles/DeluxeLooseWaveBundle/5.jpg"
              }
          ],
          "qty": "0",
          "total": "19999",
          "rate": 4.5,
          "laceType": [
              "Loose Wave"
          ],
          "selectedLaceType": "Loose Wave",
          "laceSize": [
              ""
          ],
          "destiny": [
              "150%",
              "180%",
              "200%"
          ],
          "selectedDestiny": "150%",
          "length": [
              "8",
              "10",
              "12",
              "14",
              "16",
              "18",
              "20",
              "22",
              "24",
              "26",
              "28",
              "30"
          ],
          "selectedLength": "8 8 8 8",
          "color": "Bundles",
          "availableTextures": [
              "HD Lace",
              "Transparent Lace"
          ],
          "texture": "HD Lace",
          "closureLength": [],
          "selectedClosureLength": "14",
          "hairType": "100% Virgin Human Hair",
          "categorylist": [
              "Bye-Bye-knots-Wigs",
              "13x4-Pre-Everything-Wigs",
              "Loose-Wave-Bundle",
              "Deluxe-Bundles",
              "HD-Frontal-With-Bundles"
          ],
          "capSize": [],
          "frontalLength": [],
          "selectedCapSize": "14",
          "selectedFrontalLength": "14"
      },
      {
          "title": "Delux Bundles Double Drawn Bundles",
          "description": "Refinery29 Beauty Innovator Awards 2023 Winner&& 7x5 Upgrade Larger Lace Closure&& Pre-Cut Lace, No More Effort To Cut Lace&& Glueless Install, Bands + Combs = Protective Style&& Total Natural Look, Pre-Bleached Invisible Knots & Pre-Plucked Mimic Hairline&& Friendly To Small Head：8 adjustable hooks at back, fit 19-23in size.&& Pre-shaped ear tab：Friendly To Eyeglass-Wearing Group",
          "type": "deluxe",
          "category": "Gadgets",
          "price": "199.99",
          "new": true,
          "sale": false,
          "discount": "10",
          "stock": "10",
          "images": [
              {
                  "image_id": "1",
                  "id": "1",
                  "alt": "Image 1",
                  "src": "/images/deluxe/DeluxeBundles/DeluxeStraightBundle/1.jpg"
              },
              {
                  "image_id": "2",
                  "id": "2",
                  "alt": "Image 2",
                  "src": "/images/deluxe/DeluxeBundles/DeluxeStraightBundle/2.jpg"
              },
              {
                  "image_id": "3",
                  "id": "3",
                  "alt": "Image 3",
                  "src": "/images/deluxe/DeluxeBundles/DeluxeStraightBundle/3.jpg"
              },
              {
                  "image_id": "4",
                  "id": "4",
                  "alt": "Image 4",
                  "src": "/images/deluxe/DeluxeBundles/DeluxeStraightBundle/4.jpg"
              },
              {
                  "image_id": "5",
                  "id": "5",
                  "alt": "Image 5",
                  "src": "/images/deluxe/DeluxeBundles/DeluxeStraightBundle/5.jpg"
              }
          ],
          "qty": "0",
          "total": "19999",
          "rate": 4.5,
          "laceType": [
              "Straight"
          ],
          "selectedLaceType": "Straight",
          "laceSize": [
              ""
          ],
          "destiny": [
              "150%",
              "180%",
              "200%"
          ],
          "selectedDestiny": "150%",
          "length": [
              "8 8 8 8",
              "10 10 10",
              "12 12 12",
              "14 14 14",
              "16 16 16",
              "18 18 18",
              "20 20 20",
              "22 22 22",
              "24 24 24",
              "26 26 26",
              "28 28 28",
              "30 30 30",
              "10 12 14",
              "12 14 16",
              "14 16 18",
              "16 18 20",
              "18 20 22",
              "20 22 24",
              "22 24 26",
              "24 26 28",
              "26 28 30"
          ],
          "selectedLength": "8 8 8 8",
          "color": "Bundles",
          "availableTextures": [
              "HD Lace",
              "Transparent Lace"
          ],
          "texture": "HD Lace",
          "closureLength": [
              "12",
              "14",
              "16",
              "18",
              "20",
              "22"
          ],
          "selectedClosureLength": "14",
          "hairType": "100% Virgin Human Hair",
          "categorylist": [
              "Bye-Bye-knots-Wigs",
              "13x4-Pre-Everything-Wigs",
              "Straight-Bundle",
              "Deluxe-Bundles",
              "Double-Drawn-Bundles"
          ],
          "capSize": [],
          "frontalLength": [],
          "selectedCapSize": "14",
          "selectedFrontalLength": "14"
      },
      {
          "title": "Delux Bundles Body Wave",
          "description": "Refinery29 Beauty Innovator Awards 2023 Winner&& 7x5 Upgrade Larger Lace Closure&& Pre-Cut Lace, No More Effort To Cut Lace&& Glueless Install, Bands + Combs = Protective Style&& Total Natural Look, Pre-Bleached Invisible Knots & Pre-Plucked Mimic Hairline&& Friendly To Small Head：8 adjustable hooks at back, fit 19-23in size.&& Pre-shaped ear tab：Friendly To Eyeglass-Wearing Group",
          "type": "deluxe",
          "category": "Gadgets",
          "price": "199.99",
          "new": true,
          "sale": false,
          "discount": "10",
          "stock": "10",
          "images": [
              {
                  "image_id": "1",
                  "id": "1",
                  "alt": "Image 1",
                  "src": "/images/deluxe/DeluxeBundles/DeluxeBody-Bundle/1.jpg"
              },
              {
                  "image_id": "2",
                  "id": "2",
                  "alt": "Image 2",
                  "src": "/images/deluxe/DeluxeBundles/DeluxeBody-Bundle/2.jpg"
              },
              {
                  "image_id": "3",
                  "id": "3",
                  "alt": "Image 3",
                  "src": "/images/deluxe/DeluxeBundles/DeluxeBody-Bundle/3.jpg"
              },
              {
                  "image_id": "4",
                  "id": "4",
                  "alt": "Image 4",
                  "src": "/images/deluxe/DeluxeBundles/DeluxeBody-Bundle/4.jpg"
              },
              {
                  "image_id": "5",
                  "id": "5",
                  "alt": "Image 5",
                  "src": "/images/deluxe/DeluxeBundles/DeluxeBody-Bundle/5.jpg"
              }
          ],
          "qty": "0",
          "total": "19999",
          "rate": 4.5,
          "laceType": [
              "Body Wave"
          ],
          "selectedLaceType": "Body Wave",
          "laceSize": [
              ""
          ],
          "destiny": [],
          "selectedDestiny": "150%",
          "length": [
              "8 8 8 8",
              "10 10 10 10",
              "12 12 12 12",
              "14 14 14 14",
              "16 16 16 16",
              "18 18 18 18",
              "20 20 20 20",
              "22 22 22 22",
              "24 24 24 24",
              "26 26 26 26",
              "28 28 28 28",
              "8 8 10 10",
              "10 10 12 12",
              "12 12 14 14",
              "14 14 16 16",
              "16 16 18 18",
              "18 18 20 20",
              "20 20 22 22",
              "22 22 24 24",
              "24 24 26 26",
              "26 26 28 28",
              "8 10 12 14",
              "10 12 14 16",
              "12 14 16 18",
              "14 16 18 20",
              "16 18 20 22",
              "18 20 22 24",
              "20 22 24 26",
              "22 24 26 28"
          ],
          "selectedLength": "8 8 8 8",
          "color": "Bundles",
          "availableTextures": [
              "HD Lace",
              "Transparent Lace"
          ],
          "texture": "HD Lace",
          "closureLength": [],
          "selectedClosureLength": "14",
          "hairType": "100% Virgin Human Hair",
          "categorylist": [
              "Bye-Bye-knots-Wigs",
              "13x4-Pre-Everything-Wigs",
              "Body-Bundle",
              "Deluxe-Bundles",
              "Body-Wave"
          ],
          "capSize": [],
          "frontalLength": [],
          "selectedCapSize": "14",
          "selectedFrontalLength": "14"
      },
      {
          "title": "Delux Bundles Straight Hair",
          "description": "Refinery29 Beauty Innovator Awards 2023 Winner&& 7x5 Upgrade Larger Lace Closure&& Pre-Cut Lace, No More Effort To Cut Lace&& Glueless Install, Bands + Combs = Protective Style&& Total Natural Look, Pre-Bleached Invisible Knots & Pre-Plucked Mimic Hairline&& Friendly To Small Head：8 adjustable hooks at back, fit 19-23in size.&& Pre-shaped ear tab：Friendly To Eyeglass-Wearing Group",
          "type": "deluxe",
          "category": "Gadgets",
          "price": "199.99",
          "new": true,
          "sale": false,
          "discount": "10",
          "stock": "10",
          "images": [
              {
                  "image_id": "1",
                  "id": "1",
                  "alt": "Image 1",
                  "src": "/images/deluxe/DeluxeBundles/DeluxeBody-Bundle/1.jpg"
              },
              {
                  "image_id": "2",
                  "id": "2",
                  "alt": "Image 2",
                  "src": "/images/deluxe/DeluxeBundles/DeluxeBody-Bundle/2.jpg"
              },
              {
                  "image_id": "3",
                  "id": "3",
                  "alt": "Image 3",
                  "src": "/images/deluxe/DeluxeBundles/DeluxeBody-Bundle/3.jpg"
              },
              {
                  "image_id": "4",
                  "id": "4",
                  "alt": "Image 4",
                  "src": "/images/deluxe/DeluxeBundles/DeluxeBody-Bundle/4.jpg"
              },
              {
                  "image_id": "5",
                  "id": "5",
                  "alt": "Image 5",
                  "src": "/images/deluxe/DeluxeBundles/DeluxeBody-Bundle/5.jpg"
              }
          ],
          "qty": "0",
          "total": "19999",
          "rate": 4.5,
          "laceType": [
              "Straight"
          ],
          "selectedLaceType": "Body Wave",
          "laceSize": [
              ""
          ],
          "destiny": [],
          "selectedDestiny": "150%",
          "length": [
              "8 8 8 8",
              "10 10 10 10",
              "12 12 12 12",
              "14 14 14 14",
              "16 16 16 16",
              "18 18 18 18",
              "20 20 20 20",
              "22 22 22 22",
              "24 24 24 24",
              "26 26 26 26",
              "28 28 28 28",
              "8 8 10 10",
              "10 10 12 12",
              "12 12 14 14",
              "14 14 16 16",
              "16 16 18 18",
              "18 18 20 20",
              "20 20 22 22",
              "22 22 24 24",
              "24 24 26 26",
              "26 26 28 28",
              "8 10 12 14",
              "10 12 14 16",
              "12 14 16 18",
              "14 16 18 20",
              "16 18 20 22",
              "18 20 22 24",
              "20 22 24 26",
              "22 24 26 28"
          ],
          "selectedLength": "8 8 8 8",
          "color": "Bundles",
          "availableTextures": [
              "HD Lace",
              "Transparent Lace"
          ],
          "texture": "HD Lace",
          "closureLength": [],
          "selectedClosureLength": "14",
          "hairType": "100% Virgin Human Hair",
          "categorylist": [
              "Bye-Bye-knots-Wigs",
              "13x4-Pre-Everything-Wigs",
              "Body-Bundle",
              "Deluxe-Bundles",
              "Straight-Hair"
          ],
          "capSize": [],
          "frontalLength": [],
          "selectedCapSize": "14",
          "selectedFrontalLength": "14"
      },
      {
          "title": "Delux Bundles Water Wave",
          "description": "Refinery29 Beauty Innovator Awards 2023 Winner&& 7x5 Upgrade Larger Lace Closure&& Pre-Cut Lace, No More Effort To Cut Lace&& Glueless Install, Bands + Combs = Protective Style&& Total Natural Look, Pre-Bleached Invisible Knots & Pre-Plucked Mimic Hairline&& Friendly To Small Head：8 adjustable hooks at back, fit 19-23in size.&& Pre-shaped ear tab：Friendly To Eyeglass-Wearing Group",
          "type": "deluxe",
          "category": "Gadgets",
          "price": "199.99",
          "new": true,
          "sale": false,
          "discount": "10",
          "stock": "10",
          "images": [
              {
                  "image_id": "1",
                  "id": "1",
                  "alt": "Image 1",
                  "src": "/images/deluxe/DeluxeBundles/DeluxeBody-Bundle/1.jpg"
              },
              {
                  "image_id": "2",
                  "id": "2",
                  "alt": "Image 2",
                  "src": "/images/deluxe/DeluxeBundles/DeluxeBody-Bundle/2.jpg"
              },
              {
                  "image_id": "3",
                  "id": "3",
                  "alt": "Image 3",
                  "src": "/images/deluxe/DeluxeBundles/DeluxeBody-Bundle/3.jpg"
              },
              {
                  "image_id": "4",
                  "id": "4",
                  "alt": "Image 4",
                  "src": "/images/deluxe/DeluxeBundles/DeluxeBody-Bundle/4.jpg"
              },
              {
                  "image_id": "5",
                  "id": "5",
                  "alt": "Image 5",
                  "src": "/images/deluxe/DeluxeBundles/DeluxeBody-Bundle/5.jpg"
              }
          ],
          "qty": "0",
          "total": "19999",
          "rate": 4.5,
          "laceType": [
              "Straight"
          ],
          "selectedLaceType": "Body Wave",
          "laceSize": [
              ""
          ],
          "destiny": [],
          "selectedDestiny": "150%",
          "length": [
              "8 8 8 8",
              "10 10 10 10",
              "12 12 12 12",
              "14 14 14 14",
              "16 16 16 16",
              "18 18 18 18",
              "20 20 20 20",
              "22 22 22 22",
              "24 24 24 24",
              "26 26 26 26",
              "28 28 28 28",
              "8 8 10 10",
              "10 10 12 12",
              "12 12 14 14",
              "14 14 16 16",
              "16 16 18 18",
              "18 18 20 20",
              "20 20 22 22",
              "22 22 24 24",
              "24 24 26 26",
              "26 26 28 28",
              "8 10 12 14",
              "10 12 14 16",
              "12 14 16 18",
              "14 16 18 20",
              "16 18 20 22",
              "18 20 22 24",
              "20 22 24 26",
              "22 24 26 28"
          ],
          "selectedLength": "8 8 8 8",
          "color": "Bundles",
          "availableTextures": [
              "HD Lace",
              "Transparent Lace"
          ],
          "texture": "HD Lace",
          "closureLength": [],
          "selectedClosureLength": "14",
          "hairType": "100% Virgin Human Hair",
          "categorylist": [
              "Bye-Bye-knots-Wigs",
              "13x4-Pre-Everything-Wigs",
              "Body-Bundle",
              "Deluxe-Bundles",
              "Water-Wave"
          ],
          "capSize": [],
          "frontalLength": [],
          "selectedCapSize": "14",
          "selectedFrontalLength": "14"
      },
      {
          "title": "Delux Bundles Deep Wave",
          "description": "Refinery29 Beauty Innovator Awards 2023 Winner&& 7x5 Upgrade Larger Lace Closure&& Pre-Cut Lace, No More Effort To Cut Lace&& Glueless Install, Bands + Combs = Protective Style&& Total Natural Look, Pre-Bleached Invisible Knots & Pre-Plucked Mimic Hairline&& Friendly To Small Head：8 adjustable hooks at back, fit 19-23in size.&& Pre-shaped ear tab：Friendly To Eyeglass-Wearing Group",
          "type": "deluxe",
          "category": "Gadgets",
          "price": "199.99",
          "new": true,
          "sale": false,
          "discount": "10",
          "stock": "10",
          "images": [
              {
                  "image_id": "1",
                  "id": "1",
                  "alt": "Image 1",
                  "src": "/images/deluxe/DeluxeBundles/DeluxeBody-Bundle/1.jpg"
              },
              {
                  "image_id": "2",
                  "id": "2",
                  "alt": "Image 2",
                  "src": "/images/deluxe/DeluxeBundles/DeluxeBody-Bundle/2.jpg"
              },
              {
                  "image_id": "3",
                  "id": "3",
                  "alt": "Image 3",
                  "src": "/images/deluxe/DeluxeBundles/DeluxeBody-Bundle/3.jpg"
              },
              {
                  "image_id": "4",
                  "id": "4",
                  "alt": "Image 4",
                  "src": "/images/deluxe/DeluxeBundles/DeluxeBody-Bundle/4.jpg"
              },
              {
                  "image_id": "5",
                  "id": "5",
                  "alt": "Image 5",
                  "src": "/images/deluxe/DeluxeBundles/DeluxeBody-Bundle/5.jpg"
              }
          ],
          "qty": "0",
          "total": "19999",
          "rate": 4.5,
          "laceType": [
              "Straight"
          ],
          "selectedLaceType": "Body Wave",
          "laceSize": [
              ""
          ],
          "destiny": [],
          "selectedDestiny": "150%",
          "length": [
              "8 8 8 8",
              "10 10 10 10",
              "12 12 12 12",
              "14 14 14 14",
              "16 16 16 16",
              "18 18 18 18",
              "20 20 20 20",
              "22 22 22 22",
              "24 24 24 24",
              "26 26 26 26",
              "28 28 28 28",
              "8 8 10 10",
              "10 10 12 12",
              "12 12 14 14",
              "14 14 16 16",
              "16 16 18 18",
              "18 18 20 20",
              "20 20 22 22",
              "22 22 24 24",
              "24 24 26 26",
              "26 26 28 28",
              "8 10 12 14",
              "10 12 14 16",
              "12 14 16 18",
              "14 16 18 20",
              "16 18 20 22",
              "18 20 22 24",
              "20 22 24 26",
              "22 24 26 28"
          ],
          "selectedLength": "8 8 8 8",
          "color": "Bundles",
          "availableTextures": [
              "HD Lace",
              "Transparent Lace"
          ],
          "texture": "HD Lace",
          "closureLength": [],
          "selectedClosureLength": "14",
          "hairType": "100% Virgin Human Hair",
          "categorylist": [
              "Bye-Bye-knots-Wigs",
              "13x4-Pre-Everything-Wigs",
              "Body-Bundle",
              "Deluxe-Bundles",
              "Deep-Wave"
          ],
          "capSize": [],
          "frontalLength": [],
          "selectedCapSize": "14",
          "selectedFrontalLength": "14"
      },
      {
          "title": "Delux Bundles Curly Hair",
          "description": "Refinery29 Beauty Innovator Awards 2023 Winner&& 7x5 Upgrade Larger Lace Closure&& Pre-Cut Lace, No More Effort To Cut Lace&& Glueless Install, Bands + Combs = Protective Style&& Total Natural Look, Pre-Bleached Invisible Knots & Pre-Plucked Mimic Hairline&& Friendly To Small Head：8 adjustable hooks at back, fit 19-23in size.&& Pre-shaped ear tab：Friendly To Eyeglass-Wearing Group",
          "type": "deluxe",
          "category": "Gadgets",
          "price": "199.99",
          "new": true,
          "sale": false,
          "discount": "10",
          "stock": "10",
          "images": [
              {
                  "image_id": "1",
                  "id": "1",
                  "alt": "Image 1",
                  "src": "/images/deluxe/DeluxeBundles/DeluxeBody-Bundle/1.jpg"
              },
              {
                  "image_id": "2",
                  "id": "2",
                  "alt": "Image 2",
                  "src": "/images/deluxe/DeluxeBundles/DeluxeBody-Bundle/2.jpg"
              },
              {
                  "image_id": "3",
                  "id": "3",
                  "alt": "Image 3",
                  "src": "/images/deluxe/DeluxeBundles/DeluxeBody-Bundle/3.jpg"
              },
              {
                  "image_id": "4",
                  "id": "4",
                  "alt": "Image 4",
                  "src": "/images/deluxe/DeluxeBundles/DeluxeBody-Bundle/4.jpg"
              },
              {
                  "image_id": "5",
                  "id": "5",
                  "alt": "Image 5",
                  "src": "/images/deluxe/DeluxeBundles/DeluxeBody-Bundle/5.jpg"
              }
          ],
          "qty": "0",
          "total": "19999",
          "rate": 4.5,
          "laceType": [
              "Straight"
          ],
          "selectedLaceType": "Body Wave",
          "laceSize": [
              ""
          ],
          "destiny": [],
          "selectedDestiny": "150%",
          "length": [
              "8 8 8 8",
              "10 10 10 10",
              "12 12 12 12",
              "14 14 14 14",
              "16 16 16 16",
              "18 18 18 18",
              "20 20 20 20",
              "22 22 22 22",
              "24 24 24 24",
              "26 26 26 26",
              "28 28 28 28",
              "8 8 10 10",
              "10 10 12 12",
              "12 12 14 14",
              "14 14 16 16",
              "16 16 18 18",
              "18 18 20 20",
              "20 20 22 22",
              "22 22 24 24",
              "24 24 26 26",
              "26 26 28 28",
              "8 10 12 14",
              "10 12 14 16",
              "12 14 16 18",
              "14 16 18 20",
              "16 18 20 22",
              "18 20 22 24",
              "20 22 24 26",
              "22 24 26 28"
          ],
          "selectedLength": "8 8 8 8",
          "color": "Bundles",
          "availableTextures": [
              "HD Lace",
              "Transparent Lace"
          ],
          "texture": "HD Lace",
          "closureLength": [],
          "selectedClosureLength": "14",
          "hairType": "100% Virgin Human Hair",
          "categorylist": [
              "Bye-Bye-knots-Wigs",
              "13x4-Pre-Everything-Wigs",
              "Body-Bundle",
              "Deluxe-Bundles",
              "Curly-Hair"
          ],
          "capSize": [],
          "frontalLength": [],
          "selectedCapSize": "14",
          "selectedFrontalLength": "14"
      },
      {
          "title": "Delux Bundles Loose Deep",
          "description": "Refinery29 Beauty Innovator Awards 2023 Winner&& 7x5 Upgrade Larger Lace Closure&& Pre-Cut Lace, No More Effort To Cut Lace&& Glueless Install, Bands + Combs = Protective Style&& Total Natural Look, Pre-Bleached Invisible Knots & Pre-Plucked Mimic Hairline&& Friendly To Small Head：8 adjustable hooks at back, fit 19-23in size.&& Pre-shaped ear tab：Friendly To Eyeglass-Wearing Group",
          "type": "deluxe",
          "category": "Gadgets",
          "price": "199.99",
          "new": true,
          "sale": false,
          "discount": "10",
          "stock": "10",
          "images": [
              {
                  "image_id": "1",
                  "id": "1",
                  "alt": "Image 1",
                  "src": "/images/deluxe/DeluxeBundles/DeluxeBody-Bundle/1.jpg"
              },
              {
                  "image_id": "2",
                  "id": "2",
                  "alt": "Image 2",
                  "src": "/images/deluxe/DeluxeBundles/DeluxeBody-Bundle/2.jpg"
              },
              {
                  "image_id": "3",
                  "id": "3",
                  "alt": "Image 3",
                  "src": "/images/deluxe/DeluxeBundles/DeluxeBody-Bundle/3.jpg"
              },
              {
                  "image_id": "4",
                  "id": "4",
                  "alt": "Image 4",
                  "src": "/images/deluxe/DeluxeBundles/DeluxeBody-Bundle/4.jpg"
              },
              {
                  "image_id": "5",
                  "id": "5",
                  "alt": "Image 5",
                  "src": "/images/deluxe/DeluxeBundles/DeluxeBody-Bundle/5.jpg"
              }
          ],
          "qty": "0",
          "total": "19999",
          "rate": 4.5,
          "laceType": [
              "Straight"
          ],
          "selectedLaceType": "Body Wave",
          "laceSize": [
              ""
          ],
          "destiny": [],
          "selectedDestiny": "150%",
          "length": [
              "8 8 8 8",
              "10 10 10 10",
              "12 12 12 12",
              "14 14 14 14",
              "16 16 16 16",
              "18 18 18 18",
              "20 20 20 20",
              "22 22 22 22",
              "24 24 24 24",
              "26 26 26 26",
              "28 28 28 28",
              "8 8 10 10",
              "10 10 12 12",
              "12 12 14 14",
              "14 14 16 16",
              "16 16 18 18",
              "18 18 20 20",
              "20 20 22 22",
              "22 22 24 24",
              "24 24 26 26",
              "26 26 28 28",
              "8 10 12 14",
              "10 12 14 16",
              "12 14 16 18",
              "14 16 18 20",
              "16 18 20 22",
              "18 20 22 24",
              "20 22 24 26",
              "22 24 26 28"
          ],
          "selectedLength": "8 8 8 8",
          "color": "Bundles",
          "availableTextures": [
              "HD Lace",
              "Transparent Lace"
          ],
          "texture": "HD Lace",
          "closureLength": [],
          "selectedClosureLength": "14",
          "hairType": "100% Virgin Human Hair",
          "categorylist": [
              "Bye-Bye-knots-Wigs",
              "13x4-Pre-Everything-Wigs",
              "Body-Bundle",
              "Deluxe-Bundles",
              "Loose-Deep"
          ],
          "capSize": [],
          "frontalLength": [],
          "selectedCapSize": "14",
          "selectedFrontalLength": "14"
      },
      {
          "title": "Delux Bundles Loose Wave",
          "description": "Refinery29 Beauty Innovator Awards 2023 Winner&& 7x5 Upgrade Larger Lace Closure&& Pre-Cut Lace, No More Effort To Cut Lace&& Glueless Install, Bands + Combs = Protective Style&& Total Natural Look, Pre-Bleached Invisible Knots & Pre-Plucked Mimic Hairline&& Friendly To Small Head：8 adjustable hooks at back, fit 19-23in size.&& Pre-shaped ear tab：Friendly To Eyeglass-Wearing Group",
          "type": "deluxe",
          "category": "Gadgets",
          "price": "199.99",
          "new": true,
          "sale": false,
          "discount": "10",
          "stock": "10",
          "images": [
              {
                  "image_id": "1",
                  "id": "1",
                  "alt": "Image 1",
                  "src": "/images/deluxe/DeluxeBundles/DeluxeBody-Bundle/1.jpg"
              },
              {
                  "image_id": "2",
                  "id": "2",
                  "alt": "Image 2",
                  "src": "/images/deluxe/DeluxeBundles/DeluxeBody-Bundle/2.jpg"
              },
              {
                  "image_id": "3",
                  "id": "3",
                  "alt": "Image 3",
                  "src": "/images/deluxe/DeluxeBundles/DeluxeBody-Bundle/3.jpg"
              },
              {
                  "image_id": "4",
                  "id": "4",
                  "alt": "Image 4",
                  "src": "/images/deluxe/DeluxeBundles/DeluxeBody-Bundle/4.jpg"
              },
              {
                  "image_id": "5",
                  "id": "5",
                  "alt": "Image 5",
                  "src": "/images/deluxe/DeluxeBundles/DeluxeBody-Bundle/5.jpg"
              }
          ],
          "qty": "0",
          "total": "19999",
          "rate": 4.5,
          "laceType": [
              "Straight"
          ],
          "selectedLaceType": "Body Wave",
          "laceSize": [
              ""
          ],
          "destiny": [],
          "selectedDestiny": "150%",
          "length": [
              "8 8 8 8",
              "10 10 10 10",
              "12 12 12 12",
              "14 14 14 14",
              "16 16 16 16",
              "18 18 18 18",
              "20 20 20 20",
              "22 22 22 22",
              "24 24 24 24",
              "26 26 26 26",
              "28 28 28 28",
              "8 8 10 10",
              "10 10 12 12",
              "12 12 14 14",
              "14 14 16 16",
              "16 16 18 18",
              "18 18 20 20",
              "20 20 22 22",
              "22 22 24 24",
              "24 24 26 26",
              "26 26 28 28",
              "8 10 12 14",
              "10 12 14 16",
              "12 14 16 18",
              "14 16 18 20",
              "16 18 20 22",
              "18 20 22 24",
              "20 22 24 26",
              "22 24 26 28"
          ],
          "selectedLength": "8 8 8 8",
          "color": "Bundles",
          "availableTextures": [
              "HD Lace",
              "Transparent Lace"
          ],
          "texture": "HD Lace",
          "closureLength": [],
          "selectedClosureLength": "14",
          "hairType": "100% Virgin Human Hair",
          "categorylist": [
              "Bye-Bye-knots-Wigs",
              "13x4-Pre-Everything-Wigs",
              "Body-Bundle",
              "Deluxe-Bundles",
              "Loose-Wave"
          ],
          "capSize": [],
          "frontalLength": [],
          "selectedCapSize": "14",
          "selectedFrontalLength": "14"
      },
      {
          "title": "Delux Bundles Kinky Curly",
          "description": "Refinery29 Beauty Innovator Awards 2023 Winner&& 7x5 Upgrade Larger Lace Closure&& Pre-Cut Lace, No More Effort To Cut Lace&& Glueless Install, Bands + Combs = Protective Style&& Total Natural Look, Pre-Bleached Invisible Knots & Pre-Plucked Mimic Hairline&& Friendly To Small Head：8 adjustable hooks at back, fit 19-23in size.&& Pre-shaped ear tab：Friendly To Eyeglass-Wearing Group",
          "type": "deluxe",
          "category": "Gadgets",
          "price": "199.99",
          "new": true,
          "sale": false,
          "discount": "10",
          "stock": "10",
          "images": [
              {
                  "image_id": "1",
                  "id": "1",
                  "alt": "Image 1",
                  "src": "/images/deluxe/DeluxeBundles/DeluxeBody-Bundle/1.jpg"
              },
              {
                  "image_id": "2",
                  "id": "2",
                  "alt": "Image 2",
                  "src": "/images/deluxe/DeluxeBundles/DeluxeBody-Bundle/2.jpg"
              },
              {
                  "image_id": "3",
                  "id": "3",
                  "alt": "Image 3",
                  "src": "/images/deluxe/DeluxeBundles/DeluxeBody-Bundle/3.jpg"
              },
              {
                  "image_id": "4",
                  "id": "4",
                  "alt": "Image 4",
                  "src": "/images/deluxe/DeluxeBundles/DeluxeBody-Bundle/4.jpg"
              },
              {
                  "image_id": "5",
                  "id": "5",
                  "alt": "Image 5",
                  "src": "/images/deluxe/DeluxeBundles/DeluxeBody-Bundle/5.jpg"
              }
          ],
          "qty": "0",
          "total": "19999",
          "rate": 4.5,
          "laceType": [
              "Straight"
          ],
          "selectedLaceType": "Body Wave",
          "laceSize": [
              ""
          ],
          "destiny": [],
          "selectedDestiny": "150%",
          "length": [
              "8 8 8 8",
              "10 10 10 10",
              "12 12 12 12",
              "14 14 14 14",
              "16 16 16 16",
              "18 18 18 18",
              "20 20 20 20",
              "22 22 22 22",
              "24 24 24 24",
              "26 26 26 26",
              "28 28 28 28",
              "8 8 10 10",
              "10 10 12 12",
              "12 12 14 14",
              "14 14 16 16",
              "16 16 18 18",
              "18 18 20 20",
              "20 20 22 22",
              "22 22 24 24",
              "24 24 26 26",
              "26 26 28 28",
              "8 10 12 14",
              "10 12 14 16",
              "12 14 16 18",
              "14 16 18 20",
              "16 18 20 22",
              "18 20 22 24",
              "20 22 24 26",
              "22 24 26 28"
          ],
          "selectedLength": "8 8 8 8",
          "color": "Bundles",
          "availableTextures": [
              "HD Lace",
              "Transparent Lace"
          ],
          "texture": "HD Lace",
          "closureLength": [],
          "selectedClosureLength": "14",
          "hairType": "100% Virgin Human Hair",
          "categorylist": [
              "Bye-Bye-knots-Wigs",
              "13x4-Pre-Everything-Wigs",
              "Body-Bundle",
              "Deluxe-Bundles",
              "Kinky-Curly"
          ],
          "capSize": [],
          "frontalLength": [],
          "selectedCapSize": "14",
          "selectedFrontalLength": "14"
      },
      {
          "title": "Delux Bundles Kinky Straight",
          "description": "Refinery29 Beauty Innovator Awards 2023 Winner&& 7x5 Upgrade Larger Lace Closure&& Pre-Cut Lace, No More Effort To Cut Lace&& Glueless Install, Bands + Combs = Protective Style&& Total Natural Look, Pre-Bleached Invisible Knots & Pre-Plucked Mimic Hairline&& Friendly To Small Head：8 adjustable hooks at back, fit 19-23in size.&& Pre-shaped ear tab：Friendly To Eyeglass-Wearing Group",
          "type": "deluxe",
          "category": "Gadgets",
          "price": "199.99",
          "new": true,
          "sale": false,
          "discount": "10",
          "stock": "10",
          "images": [
              {
                  "image_id": "1",
                  "id": "1",
                  "alt": "Image 1",
                  "src": "/images/deluxe/DeluxeBundles/DeluxeBody-Bundle/1.jpg"
              },
              {
                  "image_id": "2",
                  "id": "2",
                  "alt": "Image 2",
                  "src": "/images/deluxe/DeluxeBundles/DeluxeBody-Bundle/2.jpg"
              },
              {
                  "image_id": "3",
                  "id": "3",
                  "alt": "Image 3",
                  "src": "/images/deluxe/DeluxeBundles/DeluxeBody-Bundle/3.jpg"
              },
              {
                  "image_id": "4",
                  "id": "4",
                  "alt": "Image 4",
                  "src": "/images/deluxe/DeluxeBundles/DeluxeBody-Bundle/4.jpg"
              },
              {
                  "image_id": "5",
                  "id": "5",
                  "alt": "Image 5",
                  "src": "/images/deluxe/DeluxeBundles/DeluxeBody-Bundle/5.jpg"
              }
          ],
          "qty": "0",
          "total": "19999",
          "rate": 4.5,
          "laceType": [
              "Straight"
          ],
          "selectedLaceType": "Body Wave",
          "laceSize": [
              ""
          ],
          "destiny": [],
          "selectedDestiny": "150%",
          "length": [
              "8 8 8 8",
              "10 10 10 10",
              "12 12 12 12",
              "14 14 14 14",
              "16 16 16 16",
              "18 18 18 18",
              "20 20 20 20",
              "22 22 22 22",
              "24 24 24 24",
              "26 26 26 26",
              "28 28 28 28",
              "8 8 10 10",
              "10 10 12 12",
              "12 12 14 14",
              "14 14 16 16",
              "16 16 18 18",
              "18 18 20 20",
              "20 20 22 22",
              "22 22 24 24",
              "24 24 26 26",
              "26 26 28 28",
              "8 10 12 14",
              "10 12 14 16",
              "12 14 16 18",
              "14 16 18 20",
              "16 18 20 22",
              "18 20 22 24",
              "20 22 24 26",
              "22 24 26 28"
          ],
          "selectedLength": "8 8 8 8",
          "color": "Bundles",
          "availableTextures": [
              "HD Lace",
              "Transparent Lace"
          ],
          "texture": "HD Lace",
          "closureLength": [],
          "selectedClosureLength": "14",
          "hairType": "100% Virgin Human Hair",
          "categorylist": [
              "Bye-Bye-knots-Wigs",
              "13x4-Pre-Everything-Wigs",
              "Body-Bundle",
              "Deluxe-Bundles",
              "Kinky-Straight"
          ],
          "capSize": [],
          "frontalLength": [],
          "selectedCapSize": "14",
          "selectedFrontalLength": "14"
      },
      {
          "title": "Delux Bundles Funmi Hair",
          "description": "Refinery29 Beauty Innovator Awards 2023 Winner&& 7x5 Upgrade Larger Lace Closure&& Pre-Cut Lace, No More Effort To Cut Lace&& Glueless Install, Bands + Combs = Protective Style&& Total Natural Look, Pre-Bleached Invisible Knots & Pre-Plucked Mimic Hairline&& Friendly To Small Head：8 adjustable hooks at back, fit 19-23in size.&& Pre-shaped ear tab：Friendly To Eyeglass-Wearing Group",
          "type": "deluxe",
          "category": "Gadgets",
          "price": "199.99",
          "new": true,
          "sale": false,
          "discount": "10",
          "stock": "10",
          "images": [
              {
                  "image_id": "1",
                  "id": "1",
                  "alt": "Image 1",
                  "src": "/images/deluxe/DeluxeBundles/DeluxeBody-Bundle/1.jpg"
              },
              {
                  "image_id": "2",
                  "id": "2",
                  "alt": "Image 2",
                  "src": "/images/deluxe/DeluxeBundles/DeluxeBody-Bundle/2.jpg"
              },
              {
                  "image_id": "3",
                  "id": "3",
                  "alt": "Image 3",
                  "src": "/images/deluxe/DeluxeBundles/DeluxeBody-Bundle/3.jpg"
              },
              {
                  "image_id": "4",
                  "id": "4",
                  "alt": "Image 4",
                  "src": "/images/deluxe/DeluxeBundles/DeluxeBody-Bundle/4.jpg"
              },
              {
                  "image_id": "5",
                  "id": "5",
                  "alt": "Image 5",
                  "src": "/images/deluxe/DeluxeBundles/DeluxeBody-Bundle/5.jpg"
              }
          ],
          "qty": "0",
          "total": "19999",
          "rate": 4.5,
          "laceType": [
              "Straight"
          ],
          "selectedLaceType": "Body Wave",
          "laceSize": [
              ""
          ],
          "destiny": [],
          "selectedDestiny": "150%",
          "length": [
              "8 8 8 8",
              "10 10 10 10",
              "12 12 12 12",
              "14 14 14 14",
              "16 16 16 16",
              "18 18 18 18",
              "20 20 20 20",
              "22 22 22 22",
              "24 24 24 24",
              "26 26 26 26",
              "28 28 28 28",
              "8 8 10 10",
              "10 10 12 12",
              "12 12 14 14",
              "14 14 16 16",
              "16 16 18 18",
              "18 18 20 20",
              "20 20 22 22",
              "22 22 24 24",
              "24 24 26 26",
              "26 26 28 28",
              "8 10 12 14",
              "10 12 14 16",
              "12 14 16 18",
              "14 16 18 20",
              "16 18 20 22",
              "18 20 22 24",
              "20 22 24 26",
              "22 24 26 28"
          ],
          "selectedLength": "8 8 8 8",
          "color": "Bundles",
          "availableTextures": [
              "HD Lace",
              "Transparent Lace"
          ],
          "texture": "HD Lace",
          "closureLength": [],
          "selectedClosureLength": "14",
          "hairType": "100% Virgin Human Hair",
          "categorylist": [
              "Bye-Bye-knots-Wigs",
              "13x4-Pre-Everything-Wigs",
              "Body-Bundle",
              "Deluxe-Bundles",
              "Funmi-Hair"
          ],
          "capSize": [],
          "frontalLength": [],
          "selectedCapSize": "14",
          "selectedFrontalLength": "14"
      },
      {
          "title": "Delux Closure Body Bundle Hair",
          "description": "Refinery29 Beauty Innovator Awards 2023 Winner&& 7x5 Upgrade Larger Lace Closure&& Pre-Cut Lace, No More Effort To Cut Lace&& Glueless Install, Bands + Combs = Protective Style&& Total Natural Look, Pre-Bleached Invisible Knots & Pre-Plucked Mimic Hairline&& Friendly To Small Head：8 adjustable hooks at back, fit 19-23in size.&& Pre-shaped ear tab：Friendly To Eyeglass-Wearing Group",
          "type": "deluxe",
          "category": "Gadgets",
          "price": "199.99",
          "new": true,
          "sale": false,
          "discount": "10",
          "stock": "10",
          "images": [
              {
                  "image_id": "1",
                  "id": "1",
                  "alt": "Image 1",
                  "src": "/images/deluxe/DeluxeClosure/DeluxeBodyWave/1.jpg"
              },
              {
                  "image_id": "2",
                  "id": "2",
                  "alt": "Image 2",
                  "src": "/images/deluxe/DeluxeClosure/DeluxeBodyWave/2.jpg"
              },
              {
                  "image_id": "3",
                  "id": "3",
                  "alt": "Image 3",
                  "src": "/images/deluxe/DeluxeClosure/DeluxeBodyWave/3.jpg"
              },
              {
                  "image_id": "4",
                  "id": "4",
                  "alt": "Image 4",
                  "src": "/images/deluxe/DeluxeClosure/DeluxeBodyWave/4.jpg"
              },
              {
                  "image_id": "5",
                  "id": "5",
                  "alt": "Image 5",
                  "src": "/images/deluxe/DeluxeClosure/DeluxeBodyWave/5.jpg"
              },
              {
                  "image_id": "6",
                  "id": "6",
                  "alt": "Image 6",
                  "src": "/images/deluxe/DeluxeClosure/DeluxeBodyWave/6.jpg"
              }
          ],
          "qty": "0",
          "total": "19999",
          "rate": 4.5,
          "laceType": [
              "Body Wave"
          ],
          "selectedLaceType": "Body Wave",
          "laceSize": [
              "Deluxe Closure"
          ],
          "destiny": [
              "150%",
              "180%",
              "200%"
          ],
          "selectedDestiny": "150%",
          "length": [
              "12",
              "14",
              "16",
              "18",
              "20",
              "22"
          ],
          "selectedLength": "12",
          "color": "Frontal/Closure",
          "availableTextures": [
              "HD Lace",
              "Transparent Lace"
          ],
          "texture": "HD Lace",
          "closureLength": [
              "14",
              "16",
              "18",
              "20"
          ],
          "selectedClosureLength": "14",
          "hairType": "100% Virgin Human Hair",
          "categorylist": [
              "Bye-Bye-knots-Wigs",
              "13x4-Pre-Everything-Wigs",
              "Body-Bundle",
              "Deluxe-Closure-Frontal"
          ],
          "capSize": [],
          "frontalLength": [],
          "selectedCapSize": "14",
          "selectedFrontalLength": "14"
      },
      {
          "title": "Delux Closure Deep Bundle Hair",
          "description": "Refinery29 Beauty Innovator Awards 2023 Winner&& 7x5 Upgrade Larger Lace Closure&& Pre-Cut Lace, No More Effort To Cut Lace&& Glueless Install, Bands + Combs = Protective Style&& Total Natural Look, Pre-Bleached Invisible Knots & Pre-Plucked Mimic Hairline&& Friendly To Small Head：8 adjustable hooks at back, fit 19-23in size.&& Pre-shaped ear tab：Friendly To Eyeglass-Wearing Group",
          "type": "deluxe",
          "category": "Gadgets",
          "price": "199.99",
          "new": true,
          "sale": false,
          "discount": "10",
          "stock": "10",
          "images": [
              {
                  "image_id": "1",
                  "id": "1",
                  "alt": "Image 1",
                  "src": "/images/deluxe/DeluxeClosure/DeluxeDeepWave/1.jpg"
              },
              {
                  "image_id": "2",
                  "id": "2",
                  "alt": "Image 2",
                  "src": "/images/deluxe/DeluxeClosure/DeluxeDeepWave/2.jpg"
              },
              {
                  "image_id": "3",
                  "id": "3",
                  "alt": "Image 3",
                  "src": "/images/deluxe/DeluxeClosure/DeluxeDeepWave/3.jpg"
              },
              {
                  "image_id": "4",
                  "id": "4",
                  "alt": "Image 4",
                  "src": "/images/deluxe/DeluxeClosure/DeluxeDeepWave/4.jpg"
              },
              {
                  "image_id": "5",
                  "id": "5",
                  "alt": "Image 5",
                  "src": "/images/deluxe/DeluxeClosure/DeluxeDeepWave/5.jpg"
              },
              {
                  "image_id": "6",
                  "id": "6",
                  "alt": "Image 6",
                  "src": "/images/deluxe/DeluxeClosure/DeluxeDeepWave/6.jpg"
              }
          ],
          "qty": "0",
          "total": "19999",
          "rate": 4.5,
          "laceType": [
              "Deep Wave"
          ],
          "selectedLaceType": "Deep Wave",
          "laceSize": [
              "Deluxe Closure"
          ],
          "destiny": [
              "150%",
              "180%",
              "200%"
          ],
          "selectedDestiny": "150%",
          "length": [
              "12",
              "14",
              "16",
              "18",
              "20",
              "22"
          ],
          "selectedLength": "12",
          "color": "Frontal/Closure",
          "availableTextures": [
              "HD Lace",
              "Transparent Lace"
          ],
          "texture": "HD Lace",
          "closureLength": [
              "14",
              "16",
              "18",
              "20"
          ],
          "selectedClosureLength": "14",
          "hairType": "100% Virgin Human Hair",
          "categorylist": [
              "Bye-Bye-knots-Wigs",
              "13x4-Pre-Everything-Wigs",
              "Deep-Bundle",
              "Deluxe-Closure-Frontal"
          ]
      },
      {
          "title": "Delux Closure Loose Wave Bundle Hair",
          "description": "Refinery29 Beauty Innovator Awards 2023 Winner&& 7x5 Upgrade Larger Lace Closure&& Pre-Cut Lace, No More Effort To Cut Lace&& Glueless Install, Bands + Combs = Protective Style&& Total Natural Look, Pre-Bleached Invisible Knots & Pre-Plucked Mimic Hairline&& Friendly To Small Head：8 adjustable hooks at back, fit 19-23in size.&& Pre-shaped ear tab：Friendly To Eyeglass-Wearing Group",
          "type": "deluxe",
          "category": "Gadgets",
          "price": "199.99",
          "new": true,
          "sale": false,
          "discount": "10",
          "stock": "10",
          "images": [
              {
                  "image_id": "1",
                  "id": "1",
                  "alt": "Image 1",
                  "src": "/images/deluxe/DeluxeClosure/DeluxeLooseWave/1.jpg"
              },
              {
                  "image_id": "2",
                  "id": "2",
                  "alt": "Image 2",
                  "src": "/images/deluxe/DeluxeClosure/DeluxeLooseWave/2.jpg"
              },
              {
                  "image_id": "3",
                  "id": "3",
                  "alt": "Image 3",
                  "src": "/images/deluxe/DeluxeClosure/DeluxeLooseWave/3.jpg"
              },
              {
                  "image_id": "4",
                  "id": "4",
                  "alt": "Image 4",
                  "src": "/images/deluxe/DeluxeClosure/DeluxeLooseWave/4.jpg"
              },
              {
                  "image_id": "5",
                  "id": "5",
                  "alt": "Image 5",
                  "src": "/images/deluxe/DeluxeClosure/DeluxeLooseWave/5.jpg"
              },
              {
                  "image_id": "6",
                  "id": "6",
                  "alt": "Image 6",
                  "src": "/images/deluxe/DeluxeClosure/DeluxeLooseWave/6.jpg"
              }
          ],
          "qty": "0",
          "total": "19999",
          "rate": 4.5,
          "laceType": [
              "Loose Wave"
          ],
          "selectedLaceType": "Loose Wave",
          "laceSize": [
              "Deluxe Closure"
          ],
          "destiny": [
              "150%",
              "180%",
              "200%"
          ],
          "selectedDestiny": "150%",
          "length": [
              "12",
              "14",
              "16",
              "18",
              "20",
              "22"
          ],
          "selectedLength": "12",
          "color": "Frontal/Closure",
          "availableTextures": [
              "HD Lace",
              "Transparent Lace"
          ],
          "texture": "HD Lace",
          "closureLength": [
              "14",
              "16",
              "18",
              "20"
          ],
          "selectedClosureLength": "14",
          "hairType": "100% Virgin Human Hair",
          "categorylist": [
              "Bye-Bye-knots-Wigs",
              "13x4-Pre-Everything-Wigs",
              "Delux-Closure",
              "Loose-Wave-Bundle"
          ]
      },
      {
          "title": "Delux Closure Straight bundle Hair",
          "description": "Refinery29 Beauty Innovator Awards 2023 Winner&& 7x5 Upgrade Larger Lace Closure&& Pre-Cut Lace, No More Effort To Cut Lace&& Glueless Install, Bands + Combs = Protective Style&& Total Natural Look, Pre-Bleached Invisible Knots & Pre-Plucked Mimic Hairline&& Friendly To Small Head：8 adjustable hooks at back, fit 19-23in size.&& Pre-shaped ear tab：Friendly To Eyeglass-Wearing Group",
          "type": "deluxe",
          "category": "Gadgets",
          "price": "199.99",
          "new": true,
          "sale": false,
          "discount": "10",
          "stock": "10",
          "images": [
              {
                  "image_id": "1",
                  "id": "1",
                  "alt": "Image 1",
                  "src": "/images/deluxe/DeluxeClosure/DeluxeStraight/1.jpg"
              },
              {
                  "image_id": "2",
                  "id": "2",
                  "alt": "Image 2",
                  "src": "/images/deluxe/DeluxeClosure/DeluxeStraight/2.jpg"
              },
              {
                  "image_id": "3",
                  "id": "3",
                  "alt": "Image 3",
                  "src": "/images/deluxe/DeluxeClosure/DeluxeStraight/3.jpg"
              },
              {
                  "image_id": "4",
                  "id": "4",
                  "alt": "Image 4",
                  "src": "/images/deluxe/DeluxeClosure/DeluxeStraight/4.jpg"
              },
              {
                  "image_id": "5",
                  "id": "5",
                  "alt": "Image 5",
                  "src": "/images/deluxe/DeluxeClosure/DeluxeStraight/5.jpg"
              },
              {
                  "image_id": "6",
                  "id": "6",
                  "alt": "Image 6",
                  "src": "/images/deluxe/DeluxeClosure/DeluxeStraight/6.jpg"
              }
          ],
          "qty": "0",
          "total": "19999",
          "rate": 4.5,
          "laceType": [
              "Straight"
          ],
          "selectedLaceType": "Straight",
          "laceSize": [
              "Deluxe Closure"
          ],
          "destiny": [
              "150%",
              "180%",
              "200%"
          ],
          "selectedDestiny": "150%",
          "length": [
              "12",
              "14",
              "16",
              "18",
              "20",
              "22"
          ],
          "selectedLength": "12",
          "color": "Frontal/Closure",
          "availableTextures": [
              "HD Lace",
              "Transparent Lace"
          ],
          "texture": "HD Lace",
          "closureLength": [
              "14",
              "16",
              "18",
              "20"
          ],
          "selectedClosureLength": "14",
          "hairType": "100% Virgin Human Hair",
          "categorylist": [
              "Bye-Bye-knots-Wigs",
              "13x4-Pre-Everything-Wigs",
              "Straight-Bundle",
              "Deluxe-Closure-Frontal"
          ]
      },
      {
          "title": "Delux Frontal Body Bundle Hair",
          "description": "Refinery29 Beauty Innovator Awards 2023 Winner&& 7x5 Upgrade Larger Lace Closure&& Pre-Cut Lace, No More Effort To Cut Lace&& Glueless Install, Bands + Combs = Protective Style&& Total Natural Look, Pre-Bleached Invisible Knots & Pre-Plucked Mimic Hairline&& Friendly To Small Head：8 adjustable hooks at back, fit 19-23in size.&& Pre-shaped ear tab：Friendly To Eyeglass-Wearing Group",
          "type": "deluxe",
          "category": "Gadgets",
          "price": "199.99",
          "new": true,
          "sale": false,
          "discount": "10",
          "stock": "10",
          "images": [
              {
                  "image_id": "1",
                  "id": "1",
                  "alt": "Image 1",
                  "src": "/images/deluxe/DeluxeFrontal/DeluxeBodyWave/1.jpg"
              },
              {
                  "image_id": "2",
                  "id": "2",
                  "alt": "Image 2",
                  "src": "/images/deluxe/DeluxeFrontal/DeluxeBodyWave/2.jpg"
              }
          ],
          "qty": "0",
          "total": "19999",
          "rate": 4.5,
          "laceType": [
              "Body Wave"
          ],
          "selectedLaceType": "Body Wave",
          "laceSize": [
              "Deluxe Frontal"
          ],
          "destiny": [
              "150%",
              "180%",
              "200%"
          ],
          "selectedDestiny": "150%",
          "length": [
              "12",
              "14",
              "16",
              "18",
              "20",
              "22"
          ],
          "selectedLength": "12",
          "color": "Frontal/Closure",
          "availableTextures": [
              "HD Lace",
              "Transparent Lace"
          ],
          "texture": "HD Lace",
          "closureLength": [
              "14",
              "16",
              "18",
              "20"
          ],
          "selectedClosureLength": "14",
          "hairType": "100% Virgin Human Hair",
          "categorylist": [
              "Bye-Bye-knots-Wigs",
              "13x4-Pre-Everything-Wigs",
              "Body-Bundle",
              "Deluxe-Closure-Frontal"
          ]
      },
      {
          "title": "Delux Frontal Deep Bundle Hair",
          "description": "Refinery29 Beauty Innovator Awards 2023 Winner&& 7x5 Upgrade Larger Lace Closure&& Pre-Cut Lace, No More Effort To Cut Lace&& Glueless Install, Bands + Combs = Protective Style&& Total Natural Look, Pre-Bleached Invisible Knots & Pre-Plucked Mimic Hairline&& Friendly To Small Head：8 adjustable hooks at back, fit 19-23in size.&& Pre-shaped ear tab：Friendly To Eyeglass-Wearing Group",
          "type": "deluxe",
          "category": "Gadgets",
          "price": "199.99",
          "new": true,
          "sale": false,
          "discount": "10",
          "stock": "10",
          "images": [
              {
                  "image_id": "1",
                  "id": "1",
                  "alt": "Image 1",
                  "src": "/images/deluxe/DeluxeFrontal/DeluxeDeepWave/1.jpg"
              },
              {
                  "image_id": "2",
                  "id": "2",
                  "alt": "Image 2",
                  "src": "/images/deluxe/DeluxeFrontal/DeluxeDeepWave/2.jpg"
              }
          ],
          "qty": "0",
          "total": "19999",
          "rate": 4.5,
          "laceType": [
              "Deep Wave"
          ],
          "selectedLaceType": "Deep Wave",
          "laceSize": [
              "Deluxe Frontal"
          ],
          "destiny": [
              "150%",
              "180%",
              "200%"
          ],
          "selectedDestiny": "150%",
          "length": [
              "12",
              "14",
              "16",
              "18",
              "20",
              "22"
          ],
          "selectedLength": "12",
          "color": "Frontal/Closure",
          "availableTextures": [
              "HD Lace",
              "Transparent Lace"
          ],
          "texture": "HD Lace",
          "closureLength": [
              "14",
              "16",
              "18",
              "20"
          ],
          "selectedClosureLength": "14",
          "hairType": "100% Virgin Human Hair",
          "categorylist": [
              "Bye-Bye-knots-Wigs",
              "13x4-Pre-Everything-Wigs",
              "Deep-Bundle",
              "Deluxe-Closure-Frontal"
          ]
      },
      {
          "title": "Delux Frontal Loose Wave Bundle Hair",
          "description": "Refinery29 Beauty Innovator Awards 2023 Winner&& 7x5 Upgrade Larger Lace Closure&& Pre-Cut Lace, No More Effort To Cut Lace&& Glueless Install, Bands + Combs = Protective Style&& Total Natural Look, Pre-Bleached Invisible Knots & Pre-Plucked Mimic Hairline&& Friendly To Small Head：8 adjustable hooks at back, fit 19-23in size.&& Pre-shaped ear tab：Friendly To Eyeglass-Wearing Group",
          "type": "deluxe",
          "category": "Gadgets",
          "price": "199.99",
          "new": true,
          "sale": false,
          "discount": "10",
          "stock": "10",
          "images": [
              {
                  "image_id": "1",
                  "id": "1",
                  "alt": "Image 1",
                  "src": "/images/deluxe/DeluxeFrontal/DeluxeLooseWave/1.jpg"
              },
              {
                  "image_id": "2",
                  "id": "2",
                  "alt": "Image 2",
                  "src": "/images/deluxe/DeluxeFrontal/DeluxeLooseWave/2.jpg"
              }
          ],
          "qty": "0",
          "total": "19999",
          "rate": 4.5,
          "laceType": [
              "Loose Wave"
          ],
          "selectedLaceType": "Loose Wave",
          "laceSize": [
              "Deluxe Frontal"
          ],
          "destiny": [],
          "selectedDestiny": "150%",
          "length": [
              "12",
              "14",
              "16",
              "18",
              "20",
              "22"
          ],
          "selectedLength": "12",
          "color": "Frontal/Closure",
          "availableTextures": [
              "HD Lace",
              "Transparent Lace"
          ],
          "texture": "HD Lace",
          "closureLength": [
              "14",
              "16",
              "18",
              "20"
          ],
          "selectedClosureLength": "14",
          "hairType": "100% Virgin Human Hair",
          "categorylist": [
              "Bye-Bye-knots-Wigs",
              "13x4-Pre-Everything-Wigs",
              "Loose-Wave-Bundle",
              "Deluxe-Closure-Frontal"
          ]
      },
      {
          "title": "Delux Frontal Straight bundle Hair",
          "description": "Refinery29 Beauty Innovator Awards 2023 Winner&& 7x5 Upgrade Larger Lace Closure&& Pre-Cut Lace, No More Effort To Cut Lace&& Glueless Install, Bands + Combs = Protective Style&& Total Natural Look, Pre-Bleached Invisible Knots & Pre-Plucked Mimic Hairline&& Friendly To Small Head：8 adjustable hooks at back, fit 19-23in size.&& Pre-shaped ear tab：Friendly To Eyeglass-Wearing Group",
          "type": "deluxe",
          "category": "Gadgets",
          "price": "199.99",
          "new": true,
          "sale": false,
          "discount": "10",
          "stock": "10",
          "images": [
              {
                  "image_id": "1",
                  "id": "1",
                  "alt": "Image 1",
                  "src": "/images/deluxe/DeluxeFrontal/DeluxeStraight/1.jpg"
              },
              {
                  "image_id": "2",
                  "id": "2",
                  "alt": "Image 2",
                  "src": "/images/deluxe/DeluxeFrontal/DeluxeStraight/2.jpg"
              }
          ],
          "qty": "0",
          "total": "19999",
          "rate": 4.5,
          "laceType": [
              "Straight"
          ],
          "selectedLaceType": "Straight",
          "laceSize": [
              "Deluxe Frontal"
          ],
          "destiny": [
              "150%",
              "180%",
              "200%"
          ],
          "selectedDestiny": "150%",
          "length": [
              "12",
              "14",
              "16",
              "18",
              "20",
              "22"
          ],
          "selectedLength": "12",
          "color": "Frontal/Closure",
          "availableTextures": [
              "HD Lace",
              "Transparent Lace"
          ],
          "texture": "HD Lace",
          "closureLength": [
              "14",
              "16",
              "18",
              "20"
          ],
          "selectedClosureLength": "14",
          "hairType": "100% Virgin Human Hair",
          "categorylist": [
              "Bye-Bye-knots-Wigs",
              "13x4-Pre-Everything-Wigs",
              "Straight-Bundle",
              "Deluxe-Closure-Frontal"
          ]
      },
      {
          "title": "Delux Closure Body Bundle Hair",
          "description": "Refinery29 Beauty Innovator Awards 2023 Winner&& 7x5 Upgrade Larger Lace Closure&& Pre-Cut Lace, No More Effort To Cut Lace&& Glueless Install, Bands + Combs = Protective Style&& Total Natural Look, Pre-Bleached Invisible Knots & Pre-Plucked Mimic Hairline&& Friendly To Small Head：8 adjustable hooks at back, fit 19-23in size.&& Pre-shaped ear tab：Friendly To Eyeglass-Wearing Group",
          "type": "deluxe",
          "category": "Gadgets",
          "price": "199.99",
          "new": true,
          "sale": false,
          "discount": "10",
          "stock": "10",
          "images": [
              {
                  "image_id": "1",
                  "id": "1",
                  "alt": "Image 1",
                  "src": "/images/deluxe/DeluxeClosure/DeluxeBodyWave/1.jpg"
              },
              {
                  "image_id": "2",
                  "id": "2",
                  "alt": "Image 2",
                  "src": "/images/deluxe/DeluxeClosure/DeluxeBodyWave/2.jpg"
              },
              {
                  "image_id": "3",
                  "id": "3",
                  "alt": "Image 3",
                  "src": "/images/deluxe/DeluxeClosure/DeluxeBodyWave/3.jpg"
              },
              {
                  "image_id": "4",
                  "id": "4",
                  "alt": "Image 4",
                  "src": "/images/deluxe/DeluxeClosure/DeluxeBodyWave/4.jpg"
              },
              {
                  "image_id": "5",
                  "id": "5",
                  "alt": "Image 5",
                  "src": "/images/deluxe/DeluxeClosure/DeluxeBodyWave/5.jpg"
              },
              {
                  "image_id": "6",
                  "id": "6",
                  "alt": "Image 6",
                  "src": "/images/deluxe/DeluxeClosure/DeluxeBodyWave/6.jpg"
              }
          ],
          "qty": "0",
          "total": "19999",
          "rate": 4.5,
          "laceType": [
              "Body Wave"
          ],
          "selectedLaceType": "Body Wave",
          "laceSize": [
              "Deluxe Closure"
          ],
          "destiny": [
              "150%",
              "180%",
              "200%"
          ],
          "selectedDestiny": "150%",
          "length": [
              "12",
              "14",
              "16",
              "18",
              "20",
              "22"
          ],
          "selectedLength": "12",
          "color": "Frontal/Closure",
          "availableTextures": [
              "HD Lace",
              "Transparent Lace"
          ],
          "texture": "HD Lace",
          "closureLength": [
              "14",
              "16",
              "18",
              "20"
          ],
          "selectedClosureLength": "14",
          "hairType": "100% Virgin Human Hair",
          "categorylist": [
              "Bye-Bye-knots-Wigs",
              "13x4-Pre-Everything-Wigs",
              "Body-Bundle",
              "Deluxe-Closure-Frontal",
              "4x4-Lace-Closure"
          ],
          "capSize": [],
          "frontalLength": [],
          "selectedCapSize": "14",
          "selectedFrontalLength": "14"
      },
      {
          "title": "Delux Closure Deep Bundle Hair",
          "description": "Refinery29 Beauty Innovator Awards 2023 Winner&& 7x5 Upgrade Larger Lace Closure&& Pre-Cut Lace, No More Effort To Cut Lace&& Glueless Install, Bands + Combs = Protective Style&& Total Natural Look, Pre-Bleached Invisible Knots & Pre-Plucked Mimic Hairline&& Friendly To Small Head：8 adjustable hooks at back, fit 19-23in size.&& Pre-shaped ear tab：Friendly To Eyeglass-Wearing Group",
          "type": "deluxe",
          "category": "Gadgets",
          "price": "199.99",
          "new": true,
          "sale": false,
          "discount": "10",
          "stock": "10",
          "images": [
              {
                  "image_id": "1",
                  "id": "1",
                  "alt": "Image 1",
                  "src": "/images/deluxe/DeluxeClosure/DeluxeDeepWave/1.jpg"
              },
              {
                  "image_id": "2",
                  "id": "2",
                  "alt": "Image 2",
                  "src": "/images/deluxe/DeluxeClosure/DeluxeDeepWave/2.jpg"
              },
              {
                  "image_id": "3",
                  "id": "3",
                  "alt": "Image 3",
                  "src": "/images/deluxe/DeluxeClosure/DeluxeDeepWave/3.jpg"
              },
              {
                  "image_id": "4",
                  "id": "4",
                  "alt": "Image 4",
                  "src": "/images/deluxe/DeluxeClosure/DeluxeDeepWave/4.jpg"
              },
              {
                  "image_id": "5",
                  "id": "5",
                  "alt": "Image 5",
                  "src": "/images/deluxe/DeluxeClosure/DeluxeDeepWave/5.jpg"
              },
              {
                  "image_id": "6",
                  "id": "6",
                  "alt": "Image 6",
                  "src": "/images/deluxe/DeluxeClosure/DeluxeDeepWave/6.jpg"
              }
          ],
          "qty": "0",
          "total": "19999",
          "rate": 4.5,
          "laceType": [
              "Deep Wave"
          ],
          "selectedLaceType": "Deep Wave",
          "laceSize": [
              "Deluxe Closure"
          ],
          "destiny": [
              "150%",
              "180%",
              "200%"
          ],
          "selectedDestiny": "150%",
          "length": [
              "12",
              "14",
              "16",
              "18",
              "20",
              "22"
          ],
          "selectedLength": "12",
          "color": "Frontal/Closure",
          "availableTextures": [
              "HD Lace",
              "Transparent Lace"
          ],
          "texture": "HD Lace",
          "closureLength": [
              "14",
              "16",
              "18",
              "20"
          ],
          "selectedClosureLength": "14",
          "hairType": "100% Virgin Human Hair",
          "categorylist": [
              "Bye-Bye-knots-Wigs",
              "13x4-Pre-Everything-Wigs",
              "Deep-Bundle",
              "Deluxe-Closure-Frontal",
              "13x4-Frontal"
          ]
      },
      {
          "title": "Delux Closure Loose Wave Bundle Hair",
          "description": "Refinery29 Beauty Innovator Awards 2023 Winner&& 7x5 Upgrade Larger Lace Closure&& Pre-Cut Lace, No More Effort To Cut Lace&& Glueless Install, Bands + Combs = Protective Style&& Total Natural Look, Pre-Bleached Invisible Knots & Pre-Plucked Mimic Hairline&& Friendly To Small Head：8 adjustable hooks at back, fit 19-23in size.&& Pre-shaped ear tab：Friendly To Eyeglass-Wearing Group",
          "type": "deluxe",
          "category": "Gadgets",
          "price": "199.99",
          "new": true,
          "sale": false,
          "discount": "10",
          "stock": "10",
          "images": [
              {
                  "image_id": "1",
                  "id": "1",
                  "alt": "Image 1",
                  "src": "/images/deluxe/DeluxeClosure/DeluxeLooseWave/1.jpg"
              },
              {
                  "image_id": "2",
                  "id": "2",
                  "alt": "Image 2",
                  "src": "/images/deluxe/DeluxeClosure/DeluxeLooseWave/2.jpg"
              },
              {
                  "image_id": "3",
                  "id": "3",
                  "alt": "Image 3",
                  "src": "/images/deluxe/DeluxeClosure/DeluxeLooseWave/3.jpg"
              },
              {
                  "image_id": "4",
                  "id": "4",
                  "alt": "Image 4",
                  "src": "/images/deluxe/DeluxeClosure/DeluxeLooseWave/4.jpg"
              },
              {
                  "image_id": "5",
                  "id": "5",
                  "alt": "Image 5",
                  "src": "/images/deluxe/DeluxeClosure/DeluxeLooseWave/5.jpg"
              },
              {
                  "image_id": "6",
                  "id": "6",
                  "alt": "Image 6",
                  "src": "/images/deluxe/DeluxeClosure/DeluxeLooseWave/6.jpg"
              }
          ],
          "qty": "0",
          "total": "19999",
          "rate": 4.5,
          "laceType": [
              "Loose Wave"
          ],
          "selectedLaceType": "Loose Wave",
          "laceSize": [
              "Deluxe Closure"
          ],
          "destiny": [
              "150%",
              "180%",
              "200%"
          ],
          "selectedDestiny": "150%",
          "length": [
              "12",
              "14",
              "16",
              "18",
              "20",
              "22"
          ],
          "selectedLength": "12",
          "color": "Frontal/Closure",
          "availableTextures": [
              "HD Lace",
              "Transparent Lace"
          ],
          "texture": "HD Lace",
          "closureLength": [
              "14",
              "16",
              "18",
              "20"
          ],
          "selectedClosureLength": "14",
          "hairType": "100% Virgin Human Hair",
          "categorylist": [
              "Bye-Bye-knots-Wigs",
              "13x4-Pre-Everything-Wigs",
              "Delux-Closure",
              "Loose-Wave-Bundle",
              "5x5-Lace-Closure"
          ]
      },
      {
          "title": "Delux Closure Straight bundle Hair",
          "description": "Refinery29 Beauty Innovator Awards 2023 Winner&& 7x5 Upgrade Larger Lace Closure&& Pre-Cut Lace, No More Effort To Cut Lace&& Glueless Install, Bands + Combs = Protective Style&& Total Natural Look, Pre-Bleached Invisible Knots & Pre-Plucked Mimic Hairline&& Friendly To Small Head：8 adjustable hooks at back, fit 19-23in size.&& Pre-shaped ear tab：Friendly To Eyeglass-Wearing Group",
          "type": "deluxe",
          "category": "Gadgets",
          "price": "199.99",
          "new": true,
          "sale": false,
          "discount": "10",
          "stock": "10",
          "images": [
              {
                  "image_id": "1",
                  "id": "1",
                  "alt": "Image 1",
                  "src": "/images/deluxe/DeluxeClosure/DeluxeStraight/1.jpg"
              },
              {
                  "image_id": "2",
                  "id": "2",
                  "alt": "Image 2",
                  "src": "/images/deluxe/DeluxeClosure/DeluxeStraight/2.jpg"
              },
              {
                  "image_id": "3",
                  "id": "3",
                  "alt": "Image 3",
                  "src": "/images/deluxe/DeluxeClosure/DeluxeStraight/3.jpg"
              },
              {
                  "image_id": "4",
                  "id": "4",
                  "alt": "Image 4",
                  "src": "/images/deluxe/DeluxeClosure/DeluxeStraight/4.jpg"
              },
              {
                  "image_id": "5",
                  "id": "5",
                  "alt": "Image 5",
                  "src": "/images/deluxe/DeluxeClosure/DeluxeStraight/5.jpg"
              },
              {
                  "image_id": "6",
                  "id": "6",
                  "alt": "Image 6",
                  "src": "/images/deluxe/DeluxeClosure/DeluxeStraight/6.jpg"
              }
          ],
          "qty": "0",
          "total": "19999",
          "rate": 4.5,
          "laceType": [
              "Straight"
          ],
          "selectedLaceType": "Straight",
          "laceSize": [
              "Deluxe Closure"
          ],
          "destiny": [
              "150%",
              "180%",
              "200%"
          ],
          "selectedDestiny": "150%",
          "length": [
              "12",
              "14",
              "16",
              "18",
              "20",
              "22"
          ],
          "selectedLength": "12",
          "color": "Frontal/Closure",
          "availableTextures": [
              "HD Lace",
              "Transparent Lace"
          ],
          "texture": "HD Lace",
          "closureLength": [
              "14",
              "16",
              "18",
              "20"
          ],
          "selectedClosureLength": "14",
          "hairType": "100% Virgin Human Hair",
          "categorylist": [
              "Bye-Bye-knots-Wigs",
              "13x4-Pre-Everything-Wigs",
              "Straight-Bundle",
              "Deluxe-Closure-Frontal",
              "6x6-Lace-Closure"
          ]
      },
      {
          "title": "Delux Frontal Body Bundle Hair",
          "description": "Refinery29 Beauty Innovator Awards 2023 Winner&& 7x5 Upgrade Larger Lace Closure&& Pre-Cut Lace, No More Effort To Cut Lace&& Glueless Install, Bands + Combs = Protective Style&& Total Natural Look, Pre-Bleached Invisible Knots & Pre-Plucked Mimic Hairline&& Friendly To Small Head：8 adjustable hooks at back, fit 19-23in size.&& Pre-shaped ear tab：Friendly To Eyeglass-Wearing Group",
          "type": "deluxe",
          "category": "Gadgets",
          "price": "199.99",
          "new": true,
          "sale": false,
          "discount": "10",
          "stock": "10",
          "images": [
              {
                  "image_id": "1",
                  "id": "1",
                  "alt": "Image 1",
                  "src": "/images/deluxe/DeluxeFrontal/DeluxeBodyWave/1.jpg"
              },
              {
                  "image_id": "2",
                  "id": "2",
                  "alt": "Image 2",
                  "src": "/images/deluxe/DeluxeFrontal/DeluxeBodyWave/2.jpg"
              }
          ],
          "qty": "0",
          "total": "19999",
          "rate": 4.5,
          "laceType": [
              "Body Wave"
          ],
          "selectedLaceType": "Body Wave",
          "laceSize": [
              "Deluxe Frontal"
          ],
          "destiny": [
              "150%",
              "180%",
              "200%"
          ],
          "selectedDestiny": "150%",
          "length": [
              "12",
              "14",
              "16",
              "18",
              "20",
              "22"
          ],
          "selectedLength": "12",
          "color": "Frontal/Closure",
          "availableTextures": [
              "HD Lace",
              "Transparent Lace"
          ],
          "texture": "HD Lace",
          "closureLength": [
              "14",
              "16",
              "18",
              "20"
          ],
          "selectedClosureLength": "14",
          "hairType": "100% Virgin Human Hair",
          "categorylist": [
              "Bye-Bye-knots-Wigs",
              "13x4-Pre-Everything-Wigs",
              "Body-Bundle",
              "Deluxe-Closure-Frontal",
              "HD-Lace-Closure"
          ]
      },
      {
          "title": "Delux Wigs Body Bundle Hair",
          "description": "Refinery29 Beauty Innovator Awards 2023 Winner&& 7x5 Upgrade Larger Lace Closure&& Pre-Cut Lace, No More Effort To Cut Lace&& Glueless Install, Bands + Combs = Protective Style&& Total Natural Look, Pre-Bleached Invisible Knots & Pre-Plucked Mimic Hairline&& Friendly To Small Head：8 adjustable hooks at back, fit 19-23in size.&& Pre-shaped ear tab：Friendly To Eyeglass-Wearing Group",
          "type": "deluxe",
          "category": "Gadgets",
          "price": "199.99",
          "new": true,
          "sale": false,
          "discount": "10",
          "stock": "10",
          "images": [
              {
                  "image_id": "1",
                  "id": "1",
                  "alt": "Image 1",
                  "src": "/images/deluxe/DeluxeWigs/DeluxeBodyWave/1.jpg"
              },
              {
                  "image_id": "2",
                  "id": "2",
                  "alt": "Image 2",
                  "src": "/images/deluxe/DeluxeWigs/DeluxeBodyWave/2.jpg"
              },
              {
                  "image_id": "3",
                  "id": "3",
                  "alt": "Image 3",
                  "src": "/images/deluxe/DeluxeWigs/DeluxeBodyWave/3.jpg"
              },
              {
                  "image_id": "4",
                  "id": "4",
                  "alt": "Image 4",
                  "src": "/images/deluxe/DeluxeWigs/DeluxeBodyWave/4.jpg"
              },
              {
                  "image_id": "5",
                  "id": "5",
                  "alt": "Image 5",
                  "src": "/images/deluxe/DeluxeWigs/DeluxeBodyWave/5.jpg"
              },
              {
                  "image_id": "6",
                  "id": "6",
                  "alt": "Image 6",
                  "src": "/images/deluxe/DeluxeWigs/DeluxeBodyWave/6.jpg"
              }
          ],
          "qty": "0",
          "total": "19999",
          "rate": 4.5,
          "laceType": [
              "Body Wave"
          ],
          "selectedLaceType": "Body Wave",
          "laceSize": [
              ""
          ],
          "destiny": [
              "150%",
              "180%",
              "200%"
          ],
          "selectedDestiny": "150%",
          "length": [
              "12 Inch",
              "14 Inch",
              "16 Inch",
              "18 Inch",
              "20 Inch",
              "22 Inch",
              "24 Inch",
              "26 Inch",
              "28 Inch"
          ],
          "selectedLength": "8",
          "color": "Wigs",
          "availableTextures": [
              "HD Lace",
              "Transparent Lace"
          ],
          "texture": "HD Lace",
          "closureLength": [],
          "selectedClosureLength": "14",
          "hairType": "100% Virgin Human Hair",
          "categorylist": [
              "Bye-Bye-knots-Wigs",
              "13x4-Pre-Everything-Wigs",
              "Body-Bundle",
              "Deluxe-Wigs"
          ],
          "capSize": [
              "13x4 Lace",
              "13x6 Lace",
              "4x4 Lace"
          ],
          "frontalLength": [],
          "selectedCapSize": "14",
          "selectedFrontalLength": "14"
      },
      {
          "title": "Delux Wigs Deep Bundle Hair",
          "description": "Refinery29 Beauty Innovator Awards 2023 Winner&& 7x5 Upgrade Larger Lace Closure&& Pre-Cut Lace, No More Effort To Cut Lace&& Glueless Install, Bands + Combs = Protective Style&& Total Natural Look, Pre-Bleached Invisible Knots & Pre-Plucked Mimic Hairline&& Friendly To Small Head：8 adjustable hooks at back, fit 19-23in size.&& Pre-shaped ear tab：Friendly To Eyeglass-Wearing Group",
          "type": "deluxe",
          "category": "Gadgets",
          "price": "199.99",
          "new": true,
          "sale": false,
          "discount": "10",
          "stock": "10",
          "images": [
              {
                  "image_id": "1",
                  "id": "1",
                  "alt": "Image 1",
                  "src": "/images/deluxe/DeluxeWigs/DeluxeDeepWave/1.jpg"
              },
              {
                  "image_id": "2",
                  "id": "2",
                  "alt": "Image 2",
                  "src": "/images/deluxe/DeluxeWigs/DeluxeDeepWave/2.jpg"
              },
              {
                  "image_id": "3",
                  "id": "3",
                  "alt": "Image 3",
                  "src": "/images/deluxe/DeluxeWigs/DeluxeDeepWave/3.jpg"
              },
              {
                  "image_id": "4",
                  "id": "4",
                  "alt": "Image 4",
                  "src": "/images/deluxe/DeluxeWigs/DeluxeDeepWave/4.jpg"
              },
              {
                  "image_id": "5",
                  "id": "5",
                  "alt": "Image 5",
                  "src": "/images/deluxe/DeluxeWigs/DeluxeDeepWave/5.jpg"
              },
              {
                  "image_id": "6",
                  "id": "6",
                  "alt": "Image 6",
                  "src": "/images/deluxe/DeluxeWigs/DeluxeDeepWave/6.jpg"
              }
          ],
          "qty": "0",
          "total": "19999",
          "rate": 4.5,
          "laceType": [
              "Deep Wave"
          ],
          "selectedLaceType": "Deep Wave",
          "laceSize": [
              ""
          ],
          "destiny": [
              "150%",
              "180%",
              "200%"
          ],
          "selectedDestiny": "150%",
          "length": [
              "12 Inch",
              "14 Inch",
              "16 Inch",
              "18 Inch",
              "20 Inch",
              "22 Inch",
              "24 Inch",
              "26 Inch",
              "28 Inch"
          ],
          "selectedLength": "8",
          "color": "Wigs",
          "availableTextures": [
              "HD Lace",
              "Transparent Lace"
          ],
          "texture": "HD Lace",
          "closureLength": [
              "14",
              "16",
              "18",
              "20"
          ],
          "selectedClosureLength": "14",
          "hairType": "100% Virgin Human Hair",
          "categorylist": [
              "Bye-Bye-knots-Wigs",
              "13x4-Pre-Everything-Wigs",
              "Deep-Bundle",
              "Deluxe-Wigs"
          ],
          "capSize": [
              "13x4 Lace",
              "13x6 Lace",
              "4x4 Lace"
          ],
          "frontalLength": [],
          "selectedCapSize": "14",
          "selectedFrontalLength": "14"
      },
      {
          "title": "Delux Wigs Loose Wave Bundle Hair",
          "description": "Refinery29 Beauty Innovator Awards 2023 Winner&& 7x5 Upgrade Larger Lace Closure&& Pre-Cut Lace, No More Effort To Cut Lace&& Glueless Install, Bands + Combs = Protective Style&& Total Natural Look, Pre-Bleached Invisible Knots & Pre-Plucked Mimic Hairline&& Friendly To Small Head：8 adjustable hooks at back, fit 19-23in size.&& Pre-shaped ear tab：Friendly To Eyeglass-Wearing Group",
          "type": "deluxe",
          "category": "Gadgets",
          "price": "199.99",
          "new": true,
          "sale": false,
          "discount": "10",
          "stock": "10",
          "images": [
              {
                  "image_id": "1",
                  "id": "1",
                  "alt": "Image 1",
                  "src": "/images/deluxe/DeluxeWigs/DeluxeLooseWave/1.jpg"
              },
              {
                  "image_id": "2",
                  "id": "2",
                  "alt": "Image 2",
                  "src": "/images/deluxe/DeluxeWigs/DeluxeLooseWave/2.jpg"
              },
              {
                  "image_id": "3",
                  "id": "3",
                  "alt": "Image 3",
                  "src": "/images/deluxe/DeluxeWigs/DeluxeLooseWave/3.jpg"
              },
              {
                  "image_id": "4",
                  "id": "4",
                  "alt": "Image 4",
                  "src": "/images/deluxe/DeluxeWigs/DeluxeLooseWave/4.jpg"
              },
              {
                  "image_id": "5",
                  "id": "5",
                  "alt": "Image 5",
                  "src": "/images/deluxe/DeluxeWigs/DeluxeLooseWave/5.jpg"
              },
              {
                  "image_id": "6",
                  "id": "6",
                  "alt": "Image 6",
                  "src": "/images/deluxe/DeluxeWigs/DeluxeLooseWave/6.jpg"
              }
          ],
          "qty": "0",
          "total": "19999",
          "rate": 4.5,
          "laceType": [
              "Loose Wave"
          ],
          "selectedLaceType": "Loose Wave",
          "laceSize": [
              ""
          ],
          "destiny": [
              "150%",
              "180%",
              "200%"
          ],
          "selectedDestiny": "150%",
          "length": [
              "12 Inch",
              "14 Inch",
              "16 Inch",
              "18 Inch",
              "20 Inch",
              "22 Inch",
              "24 Inch",
              "26 Inch",
              "28 Inch"
          ],
          "selectedLength": "8",
          "color": "Wigs",
          "availableTextures": [
              "HD Lace",
              "Transparent Lace"
          ],
          "texture": "HD Lace",
          "closureLength": [
              "14",
              "16",
              "18",
              "20"
          ],
          "selectedClosureLength": "14",
          "hairType": "100% Virgin Human Hair",
          "categorylist": [
              "Bye-Bye-knots-Wigs",
              "13x4-Pre-Everything-Wigs",
              "Loose-Wave-Bundle",
              "Deluxe-Wigs"
          ],
          "capSize": [
              "13x4 Lace",
              "13x6 Lace",
              "4x4 Lace"
          ],
          "frontalLength": [],
          "selectedCapSize": "14",
          "selectedFrontalLength": "14"
      },
      {
          "title": "Delux Wigs Straight bundle Hair",
          "description": "Refinery29 Beauty Innovator Awards 2023 Winner&& 7x5 Upgrade Larger Lace Closure&& Pre-Cut Lace, No More Effort To Cut Lace&& Glueless Install, Bands + Combs = Protective Style&& Total Natural Look, Pre-Bleached Invisible Knots & Pre-Plucked Mimic Hairline&& Friendly To Small Head：8 adjustable hooks at back, fit 19-23in size.&& Pre-shaped ear tab：Friendly To Eyeglass-Wearing Group",
          "type": "deluxe",
          "category": "Gadgets",
          "price": "199.99",
          "new": true,
          "sale": false,
          "discount": "10",
          "stock": "10",
          "images": [
              {
                  "image_id": "1",
                  "id": "1",
                  "alt": "Image 1",
                  "src": "/images/deluxe/DeluxeWigs/DeluxueStraight/1.jpg"
              },
              {
                  "image_id": "2",
                  "id": "2",
                  "alt": "Image 2",
                  "src": "/images/deluxe/DeluxeWigs/DeluxueStraight/2.jpg"
              },
              {
                  "image_id": "3",
                  "id": "3",
                  "alt": "Image 3",
                  "src": "/images/deluxe/DeluxeWigs/DeluxueStraight/3.jpg"
              },
              {
                  "image_id": "4",
                  "id": "4",
                  "alt": "Image 4",
                  "src": "/images/deluxe/DeluxeWigs/DeluxueStraight/4.jpg"
              },
              {
                  "image_id": "5",
                  "id": "5",
                  "alt": "Image 5",
                  "src": "/images/deluxe/DeluxeWigs/DeluxueStraight/5.jpg"
              },
              {
                  "image_id": "6",
                  "id": "6",
                  "alt": "Image 6",
                  "src": "/images/deluxe/DeluxeWigs/DeluxueStraight/6.jpg"
              }
          ],
          "qty": "0",
          "total": "19999",
          "rate": 4.5,
          "laceType": [
              "Straight"
          ],
          "selectedLaceType": "Straight",
          "laceSize": [
              ""
          ],
          "destiny": [
              "150%",
              "180%",
              "200%"
          ],
          "selectedDestiny": "150%",
          "length": [
              "12 Inch",
              "14 Inch",
              "16 Inch",
              "18 Inch",
              "20 Inch",
              "22 Inch",
              "24 Inch",
              "26 Inch",
              "28 Inch"
          ],
          "selectedLength": "8",
          "color": "Wigs",
          "availableTextures": [
              "HD Lace",
              "Transparent Lace"
          ],
          "texture": "HD Lace",
          "closureLength": [
              "14",
              "16",
              "18",
              "20"
          ],
          "selectedClosureLength": "14",
          "hairType": "100% Virgin Human Hair",
          "categorylist": [
              "Bye-Bye-knots-Wigs",
              "13x4-Pre-Everything-Wigs",
              "Straight-Bundle",
              "Deluxe-Wigs"
          ],
          "capSize": [
              "13x4 Lace",
              "13x6 Lace",
              "4x4 Lace"
          ],
          "frontalLength": [],
          "selectedCapSize": "14",
          "selectedFrontalLength": "14"
      },
      {
          "title": "Delux Wigs Glueless Wigs",
          "description": "Refinery29 Beauty Innovator Awards 2023 Winner&& 7x5 Upgrade Larger Lace Closure&& Pre-Cut Lace, No More Effort To Cut Lace&& Glueless Install, Bands + Combs = Protective Style&& Total Natural Look, Pre-Bleached Invisible Knots & Pre-Plucked Mimic Hairline&& Friendly To Small Head：8 adjustable hooks at back, fit 19-23in size.&& Pre-shaped ear tab：Friendly To Eyeglass-Wearing Group",
          "type": "deluxe",
          "category": "Gadgets",
          "price": "199.99",
          "new": true,
          "sale": false,
          "discount": "10",
          "stock": "10",
          "images": [
              {
                  "image_id": "1",
                  "id": "1",
                  "alt": "Image 1",
                  "src": "/images/deluxe/DeluxeWigs/DeluxeBodyWave/1.jpg"
              },
              {
                  "image_id": "2",
                  "id": "2",
                  "alt": "Image 2",
                  "src": "/images/deluxe/DeluxeWigs/DeluxeBodyWave/2.jpg"
              },
              {
                  "image_id": "3",
                  "id": "3",
                  "alt": "Image 3",
                  "src": "/images/deluxe/DeluxeWigs/DeluxeBodyWave/3.jpg"
              },
              {
                  "image_id": "4",
                  "id": "4",
                  "alt": "Image 4",
                  "src": "/images/deluxe/DeluxeWigs/DeluxeBodyWave/4.jpg"
              },
              {
                  "image_id": "5",
                  "id": "5",
                  "alt": "Image 5",
                  "src": "/images/deluxe/DeluxeWigs/DeluxeBodyWave/5.jpg"
              },
              {
                  "image_id": "6",
                  "id": "6",
                  "alt": "Image 6",
                  "src": "/images/deluxe/DeluxeWigs/DeluxeBodyWave/6.jpg"
              }
          ],
          "qty": "0",
          "total": "19999",
          "rate": 4.5,
          "laceType": [
              "Body Wave"
          ],
          "selectedLaceType": "Body Wave",
          "laceSize": [
              ""
          ],
          "destiny": [
              "150%",
              "180%",
              "200%",
              "custom"
          ],
          "selectedDestiny": "150%",
          "length": [
              "12 Inch",
              "14 Inch",
              "16 Inch",
              "18 Inch",
              "20 Inch",
              "22 Inch",
              "24 Inch",
              "26 Inch",
              "28 Inch"
          ],
          "selectedLength": "8",
          "color": "Wigs",
          "availableTextures": [
              "HD Lace",
              "Transparent Lace"
          ],
          "texture": "HD Lace",
          "closureLength": [],
          "selectedClosureLength": "14",
          "hairType": "100% Virgin Human Hair",
          "categorylist": [
              "Bye-Bye-knots-Wigs",
              "13x4-Pre-Everything-Wigs",
              "Body-Bundle",
              "Deluxe-Wigs",
              "Deluxe-Custom"
          ],
          "capSize": [
              "13x4 Lace",
              "13x6 Lace",
              "4x4 Lace"
          ],
          "frontalLength": [],
          "selectedCapSize": "14",
          "selectedFrontalLength": "14"
      },
      {
          "title": "Delux Wigs Colored Wigs",
          "description": "Refinery29 Beauty Innovator Awards 2023 Winner&& 7x5 Upgrade Larger Lace Closure&& Pre-Cut Lace, No More Effort To Cut Lace&& Glueless Install, Bands + Combs = Protective Style&& Total Natural Look, Pre-Bleached Invisible Knots & Pre-Plucked Mimic Hairline&& Friendly To Small Head：8 adjustable hooks at back, fit 19-23in size.&& Pre-shaped ear tab：Friendly To Eyeglass-Wearing Group",
          "type": "deluxe",
          "category": "Gadgets",
          "price": "199.99",
          "new": true,
          "sale": false,
          "discount": "10",
          "stock": "10",
          "images": [
              {
                  "image_id": "1",
                  "id": "1",
                  "alt": "Image 1",
                  "src": "/images/deluxe/DeluxeWigs/DeluxeDeepWave/1.jpg"
              },
              {
                  "image_id": "2",
                  "id": "2",
                  "alt": "Image 2",
                  "src": "/images/deluxe/DeluxeWigs/DeluxeDeepWave/2.jpg"
              },
              {
                  "image_id": "3",
                  "id": "3",
                  "alt": "Image 3",
                  "src": "/images/deluxe/DeluxeWigs/DeluxeDeepWave/3.jpg"
              },
              {
                  "image_id": "4",
                  "id": "4",
                  "alt": "Image 4",
                  "src": "/images/deluxe/DeluxeWigs/DeluxeDeepWave/4.jpg"
              },
              {
                  "image_id": "5",
                  "id": "5",
                  "alt": "Image 5",
                  "src": "/images/deluxe/DeluxeWigs/DeluxeDeepWave/5.jpg"
              },
              {
                  "image_id": "6",
                  "id": "6",
                  "alt": "Image 6",
                  "src": "/images/deluxe/DeluxeWigs/DeluxeDeepWave/6.jpg"
              }
          ],
          "qty": "0",
          "total": "19999",
          "rate": 4.5,
          "laceType": [
              "Deep Wave"
          ],
          "selectedLaceType": "Deep Wave",
          "laceSize": [
              ""
          ],
          "destiny": [
              "150%",
              "180%",
              "200%"
          ],
          "selectedDestiny": "150%",
          "length": [
              "12 Inch",
              "14 Inch",
              "16 Inch",
              "18 Inch",
              "20 Inch",
              "22 Inch",
              "24 Inch",
              "26 Inch",
              "28 Inch"
          ],
          "selectedLength": "8",
          "color": "Wigs",
          "availableTextures": [
              "HD Lace",
              "Transparent Lace"
          ],
          "texture": "HD Lace",
          "closureLength": [
              "14",
              "16",
              "18",
              "20"
          ],
          "selectedClosureLength": "14",
          "hairType": "100% Virgin Human Hair",
          "categorylist": [
              "Bye-Bye-knots-Wigs",
              "13x4-Pre-Everything-Wigs",
              "Deep-Bundle",
              "Deluxe-Wigs",
              "Glueless-Wigs"
          ],
          "capSize": [
              "13x4 Lace",
              "13x6 Lace",
              "4x4 Lace"
          ],
          "frontalLength": [],
          "selectedCapSize": "14",
          "selectedFrontalLength": "14"
      },
      {
          "title": "Delux Wigs Loose Wave Bundle Hair",
          "description": "Refinery29 Beauty Innovator Awards 2023 Winner&& 7x5 Upgrade Larger Lace Closure&& Pre-Cut Lace, No More Effort To Cut Lace&& Glueless Install, Bands + Combs = Protective Style&& Total Natural Look, Pre-Bleached Invisible Knots & Pre-Plucked Mimic Hairline&& Friendly To Small Head：8 adjustable hooks at back, fit 19-23in size.&& Pre-shaped ear tab：Friendly To Eyeglass-Wearing Group",
          "type": "deluxe",
          "category": "Gadgets",
          "price": "199.99",
          "new": true,
          "sale": false,
          "discount": "10",
          "stock": "10",
          "images": [
              {
                  "image_id": "1",
                  "id": "1",
                  "alt": "Image 1",
                  "src": "/images/deluxe/DeluxeWigs/DeluxeLooseWave/1.jpg"
              },
              {
                  "image_id": "2",
                  "id": "2",
                  "alt": "Image 2",
                  "src": "/images/deluxe/DeluxeWigs/DeluxeLooseWave/2.jpg"
              },
              {
                  "image_id": "3",
                  "id": "3",
                  "alt": "Image 3",
                  "src": "/images/deluxe/DeluxeWigs/DeluxeLooseWave/3.jpg"
              },
              {
                  "image_id": "4",
                  "id": "4",
                  "alt": "Image 4",
                  "src": "/images/deluxe/DeluxeWigs/DeluxeLooseWave/4.jpg"
              },
              {
                  "image_id": "5",
                  "id": "5",
                  "alt": "Image 5",
                  "src": "/images/deluxe/DeluxeWigs/DeluxeLooseWave/5.jpg"
              },
              {
                  "image_id": "6",
                  "id": "6",
                  "alt": "Image 6",
                  "src": "/images/deluxe/DeluxeWigs/DeluxeLooseWave/6.jpg"
              }
          ],
          "qty": "0",
          "total": "19999",
          "rate": 4.5,
          "laceType": [
              "Loose Wave"
          ],
          "selectedLaceType": "Loose Wave",
          "laceSize": [
              ""
          ],
          "destiny": [
              "150%",
              "180%",
              "200%"
          ],
          "selectedDestiny": "150%",
          "length": [
              "12 Inch",
              "14 Inch",
              "16 Inch",
              "18 Inch",
              "20 Inch",
              "22 Inch",
              "24 Inch",
              "26 Inch",
              "28 Inch"
          ],
          "selectedLength": "8",
          "color": "Wigs",
          "availableTextures": [
              "HD Lace",
              "Transparent Lace"
          ],
          "texture": "HD Lace",
          "closureLength": [
              "14",
              "16",
              "18",
              "20"
          ],
          "selectedClosureLength": "14",
          "hairType": "100% Virgin Human Hair",
          "categorylist": [
              "Bye-Bye-knots-Wigs",
              "13x4-Pre-Everything-Wigs",
              "Loose-Wave-Bundle",
              "Deluxe-Wigs",
              "Colored-Wigs"
          ],
          "capSize": [
              "13x4 Lace",
              "13x6 Lace",
              "4x4 Lace"
          ],
          "frontalLength": [],
          "selectedCapSize": "14",
          "selectedFrontalLength": "14"
      },
      {
          "title": "Delux Wigs Straight bundle Hair",
          "description": "Refinery29 Beauty Innovator Awards 2023 Winner&& 7x5 Upgrade Larger Lace Closure&& Pre-Cut Lace, No More Effort To Cut Lace&& Glueless Install, Bands + Combs = Protective Style&& Total Natural Look, Pre-Bleached Invisible Knots & Pre-Plucked Mimic Hairline&& Friendly To Small Head：8 adjustable hooks at back, fit 19-23in size.&& Pre-shaped ear tab：Friendly To Eyeglass-Wearing Group",
          "type": "deluxe",
          "category": "Gadgets",
          "price": "199.99",
          "new": true,
          "sale": false,
          "discount": "10",
          "stock": "10",
          "images": [
              {
                  "image_id": "1",
                  "id": "1",
                  "alt": "Image 1",
                  "src": "/images/deluxe/DeluxeWigs/DeluxueStraight/1.jpg"
              },
              {
                  "image_id": "2",
                  "id": "2",
                  "alt": "Image 2",
                  "src": "/images/deluxe/DeluxeWigs/DeluxueStraight/2.jpg"
              },
              {
                  "image_id": "3",
                  "id": "3",
                  "alt": "Image 3",
                  "src": "/images/deluxe/DeluxeWigs/DeluxueStraight/3.jpg"
              },
              {
                  "image_id": "4",
                  "id": "4",
                  "alt": "Image 4",
                  "src": "/images/deluxe/DeluxeWigs/DeluxueStraight/4.jpg"
              },
              {
                  "image_id": "5",
                  "id": "5",
                  "alt": "Image 5",
                  "src": "/images/deluxe/DeluxeWigs/DeluxueStraight/5.jpg"
              },
              {
                  "image_id": "6",
                  "id": "6",
                  "alt": "Image 6",
                  "src": "/images/deluxe/DeluxeWigs/DeluxueStraight/6.jpg"
              }
          ],
          "qty": "0",
          "total": "19999",
          "rate": 4.5,
          "laceType": [
              "Straight"
          ],
          "selectedLaceType": "Straight",
          "laceSize": [
              ""
          ],
          "destiny": [
              "150%",
              "180%",
              "200%"
          ],
          "selectedDestiny": "150%",
          "length": [
              "12 Inch",
              "14 Inch",
              "16 Inch",
              "18 Inch",
              "20 Inch",
              "22 Inch",
              "24 Inch",
              "26 Inch",
              "28 Inch"
          ],
          "selectedLength": "8",
          "color": "Wigs",
          "availableTextures": [
              "HD Lace",
              "Transparent Lace"
          ],
          "texture": "HD Lace",
          "closureLength": [
              "14",
              "16",
              "18",
              "20"
          ],
          "selectedClosureLength": "14",
          "hairType": "100% Virgin Human Hair",
          "categorylist": [
              "Bye-Bye-knots-Wigs",
              "13x4-Pre-Everything-Wigs",
              "Straight-Bundle",
              "Deluxe-Wigs",
              "150%-Density"
          ],
          "capSize": [
              "13x4 Lace",
              "13x6 Lace",
              "4x4 Lace"
          ],
          "frontalLength": [],
          "selectedCapSize": "14",
          "selectedFrontalLength": "14"
      },
      {
          "title": "Delux Wigs Body Bundle Hair",
          "description": "Refinery29 Beauty Innovator Awards 2023 Winner&& 7x5 Upgrade Larger Lace Closure&& Pre-Cut Lace, No More Effort To Cut Lace&& Glueless Install, Bands + Combs = Protective Style&& Total Natural Look, Pre-Bleached Invisible Knots & Pre-Plucked Mimic Hairline&& Friendly To Small Head：8 adjustable hooks at back, fit 19-23in size.&& Pre-shaped ear tab：Friendly To Eyeglass-Wearing Group",
          "type": "deluxe",
          "category": "Gadgets",
          "price": "199.99",
          "new": true,
          "sale": false,
          "discount": "10",
          "stock": "10",
          "images": [
              {
                  "image_id": "1",
                  "id": "1",
                  "alt": "Image 1",
                  "src": "/images/deluxe/DeluxeWigs/DeluxeBodyWave/1.jpg"
              },
              {
                  "image_id": "2",
                  "id": "2",
                  "alt": "Image 2",
                  "src": "/images/deluxe/DeluxeWigs/DeluxeBodyWave/2.jpg"
              },
              {
                  "image_id": "3",
                  "id": "3",
                  "alt": "Image 3",
                  "src": "/images/deluxe/DeluxeWigs/DeluxeBodyWave/3.jpg"
              },
              {
                  "image_id": "4",
                  "id": "4",
                  "alt": "Image 4",
                  "src": "/images/deluxe/DeluxeWigs/DeluxeBodyWave/4.jpg"
              },
              {
                  "image_id": "5",
                  "id": "5",
                  "alt": "Image 5",
                  "src": "/images/deluxe/DeluxeWigs/DeluxeBodyWave/5.jpg"
              },
              {
                  "image_id": "6",
                  "id": "6",
                  "alt": "Image 6",
                  "src": "/images/deluxe/DeluxeWigs/DeluxeBodyWave/6.jpg"
              }
          ],
          "qty": "0",
          "total": "19999",
          "rate": 4.5,
          "laceType": [
              "Body Wave"
          ],
          "selectedLaceType": "Body Wave",
          "laceSize": [
              ""
          ],
          "destiny": [
              "150%",
              "180%",
              "200%"
          ],
          "selectedDestiny": "150%",
          "length": [
              "12 Inch",
              "14 Inch",
              "16 Inch",
              "18 Inch",
              "20 Inch",
              "22 Inch",
              "24 Inch",
              "26 Inch",
              "28 Inch"
          ],
          "selectedLength": "8",
          "color": "Wigs",
          "availableTextures": [
              "HD Lace",
              "Transparent Lace"
          ],
          "texture": "HD Lace",
          "closureLength": [],
          "selectedClosureLength": "14",
          "hairType": "100% Virgin Human Hair",
          "categorylist": [
              "Bye-Bye-knots-Wigs",
              "13x4-Pre-Everything-Wigs",
              "Body-Bundle",
              "Deluxe-Wigs",
              "180%-Density"
          ],
          "capSize": [
              "13x4 Lace",
              "13x6 Lace",
              "4x4 Lace"
          ],
          "frontalLength": [],
          "selectedCapSize": "14",
          "selectedFrontalLength": "14"
      },
      {
          "title": "Delux Wigs Deep Bundle Hair",
          "description": "Refinery29 Beauty Innovator Awards 2023 Winner&& 7x5 Upgrade Larger Lace Closure&& Pre-Cut Lace, No More Effort To Cut Lace&& Glueless Install, Bands + Combs = Protective Style&& Total Natural Look, Pre-Bleached Invisible Knots & Pre-Plucked Mimic Hairline&& Friendly To Small Head：8 adjustable hooks at back, fit 19-23in size.&& Pre-shaped ear tab：Friendly To Eyeglass-Wearing Group",
          "type": "deluxe",
          "category": "Gadgets",
          "price": "199.99",
          "new": true,
          "sale": false,
          "discount": "10",
          "stock": "10",
          "images": [
              {
                  "image_id": "1",
                  "id": "1",
                  "alt": "Image 1",
                  "src": "/images/deluxe/DeluxeWigs/DeluxeDeepWave/1.jpg"
              },
              {
                  "image_id": "2",
                  "id": "2",
                  "alt": "Image 2",
                  "src": "/images/deluxe/DeluxeWigs/DeluxeDeepWave/2.jpg"
              },
              {
                  "image_id": "3",
                  "id": "3",
                  "alt": "Image 3",
                  "src": "/images/deluxe/DeluxeWigs/DeluxeDeepWave/3.jpg"
              },
              {
                  "image_id": "4",
                  "id": "4",
                  "alt": "Image 4",
                  "src": "/images/deluxe/DeluxeWigs/DeluxeDeepWave/4.jpg"
              },
              {
                  "image_id": "5",
                  "id": "5",
                  "alt": "Image 5",
                  "src": "/images/deluxe/DeluxeWigs/DeluxeDeepWave/5.jpg"
              },
              {
                  "image_id": "6",
                  "id": "6",
                  "alt": "Image 6",
                  "src": "/images/deluxe/DeluxeWigs/DeluxeDeepWave/6.jpg"
              }
          ],
          "qty": "0",
          "total": "19999",
          "rate": 4.5,
          "laceType": [
              "Deep Wave"
          ],
          "selectedLaceType": "Deep Wave",
          "laceSize": [
              ""
          ],
          "destiny": [
              "150%",
              "180%",
              "200%"
          ],
          "selectedDestiny": "150%",
          "length": [
              "12 Inch",
              "14 Inch",
              "16 Inch",
              "18 Inch",
              "20 Inch",
              "22 Inch",
              "24 Inch",
              "26 Inch",
              "28 Inch"
          ],
          "selectedLength": "8",
          "color": "Wigs",
          "availableTextures": [
              "HD Lace",
              "Transparent Lace"
          ],
          "texture": "HD Lace",
          "closureLength": [
              "14",
              "16",
              "18",
              "20"
          ],
          "selectedClosureLength": "14",
          "hairType": "100% Virgin Human Hair",
          "categorylist": [
              "Bye-Bye-knots-Wigs",
              "13x4-Pre-Everything-Wigs",
              "Deep-Bundle",
              "Deluxe-Wigs",
              "200%-Density-And-High"
          ],
          "capSize": [
              "13x4 Lace",
              "13x6 Lace",
              "4x4 Lace"
          ],
          "frontalLength": [],
          "selectedCapSize": "14",
          "selectedFrontalLength": "14"
      },
      {
          "title": "Delux Wigs Body Wave Bundle Hair",
          "description": "Refinery29 Beauty Innovator Awards 2023 Winner&& 7x5 Upgrade Larger Lace Closure&& Pre-Cut Lace, No More Effort To Cut Lace&& Glueless Install, Bands + Combs = Protective Style&& Total Natural Look, Pre-Bleached Invisible Knots & Pre-Plucked Mimic Hairline&& Friendly To Small Head：8 adjustable hooks at back, fit 19-23in size.&& Pre-shaped ear tab：Friendly To Eyeglass-Wearing Group",
          "type": "deluxe",
          "category": "Gadgets",
          "price": "199.99",
          "new": true,
          "sale": false,
          "discount": "10",
          "stock": "10",
          "images": [
              {
                  "image_id": "1",
                  "id": "1",
                  "alt": "Image 1",
                  "src": "/images/deluxe/DeluxeWigs/DeluxeLooseWave/1.jpg"
              },
              {
                  "image_id": "2",
                  "id": "2",
                  "alt": "Image 2",
                  "src": "/images/deluxe/DeluxeWigs/DeluxeLooseWave/2.jpg"
              },
              {
                  "image_id": "3",
                  "id": "3",
                  "alt": "Image 3",
                  "src": "/images/deluxe/DeluxeWigs/DeluxeLooseWave/3.jpg"
              },
              {
                  "image_id": "4",
                  "id": "4",
                  "alt": "Image 4",
                  "src": "/images/deluxe/DeluxeWigs/DeluxeLooseWave/4.jpg"
              },
              {
                  "image_id": "5",
                  "id": "5",
                  "alt": "Image 5",
                  "src": "/images/deluxe/DeluxeWigs/DeluxeLooseWave/5.jpg"
              },
              {
                  "image_id": "6",
                  "id": "6",
                  "alt": "Image 6",
                  "src": "/images/deluxe/DeluxeWigs/DeluxeLooseWave/6.jpg"
              }
          ],
          "qty": "0",
          "total": "19999",
          "rate": 4.5,
          "laceType": [
              "Body Wave"
          ],
          "selectedLaceType": "Body Wave",
          "laceSize": [
              ""
          ],
          "destiny": [
              "150%",
              "180%",
              "200%"
          ],
          "selectedDestiny": "150%",
          "length": [
              "12 Inch",
              "14 Inch",
              "16 Inch",
              "18 Inch",
              "20 Inch",
              "22 Inch",
              "24 Inch",
              "26 Inch",
              "28 Inch"
          ],
          "selectedLength": "8",
          "color": "Wigs",
          "availableTextures": [
              "HD Lace",
              "Transparent Lace"
          ],
          "texture": "HD Lace",
          "closureLength": [
              "14",
              "16",
              "18",
              "20"
          ],
          "selectedClosureLength": "14",
          "hairType": "100% Virgin Human Hair",
          "categorylist": [
              "Bye-Bye-knots-Wigs",
              "13x4-Pre-Everything-Wigs",
              "Loose-Wave-Bundle",
              "Deluxe-Wigs",
              "Body-Wave"
          ],
          "capSize": [
              "13x4 Lace",
              "13x6 Lace",
              "4x4 Lace"
          ],
          "frontalLength": [],
          "selectedCapSize": "14",
          "selectedFrontalLength": "14"
      },
      {
          "title": "Delux Wigs Straight bundle Hair",
          "description": "Refinery29 Beauty Innovator Awards 2023 Winner&& 7x5 Upgrade Larger Lace Closure&& Pre-Cut Lace, No More Effort To Cut Lace&& Glueless Install, Bands + Combs = Protective Style&& Total Natural Look, Pre-Bleached Invisible Knots & Pre-Plucked Mimic Hairline&& Friendly To Small Head：8 adjustable hooks at back, fit 19-23in size.&& Pre-shaped ear tab：Friendly To Eyeglass-Wearing Group",
          "type": "deluxe",
          "category": "Gadgets",
          "price": "199.99",
          "new": true,
          "sale": false,
          "discount": "10",
          "stock": "10",
          "images": [
              {
                  "image_id": "1",
                  "id": "1",
                  "alt": "Image 1",
                  "src": "/images/deluxe/DeluxeWigs/DeluxueStraight/1.jpg"
              },
              {
                  "image_id": "2",
                  "id": "2",
                  "alt": "Image 2",
                  "src": "/images/deluxe/DeluxeWigs/DeluxueStraight/2.jpg"
              },
              {
                  "image_id": "3",
                  "id": "3",
                  "alt": "Image 3",
                  "src": "/images/deluxe/DeluxeWigs/DeluxueStraight/3.jpg"
              },
              {
                  "image_id": "4",
                  "id": "4",
                  "alt": "Image 4",
                  "src": "/images/deluxe/DeluxeWigs/DeluxueStraight/4.jpg"
              },
              {
                  "image_id": "5",
                  "id": "5",
                  "alt": "Image 5",
                  "src": "/images/deluxe/DeluxeWigs/DeluxueStraight/5.jpg"
              },
              {
                  "image_id": "6",
                  "id": "6",
                  "alt": "Image 6",
                  "src": "/images/deluxe/DeluxeWigs/DeluxueStraight/6.jpg"
              }
          ],
          "qty": "0",
          "total": "19999",
          "rate": 4.5,
          "laceType": [
              "Straight"
          ],
          "selectedLaceType": "Straight",
          "laceSize": [
              ""
          ],
          "destiny": [
              "150%",
              "180%",
              "200%"
          ],
          "selectedDestiny": "150%",
          "length": [
              "12 Inch",
              "14 Inch",
              "16 Inch",
              "18 Inch",
              "20 Inch",
              "22 Inch",
              "24 Inch",
              "26 Inch",
              "28 Inch"
          ],
          "selectedLength": "8",
          "color": "Wigs",
          "availableTextures": [
              "HD Lace",
              "Transparent Lace"
          ],
          "texture": "HD Lace",
          "closureLength": [
              "14",
              "16",
              "18",
              "20"
          ],
          "selectedClosureLength": "14",
          "hairType": "100% Virgin Human Hair",
          "categorylist": [
              "Bye-Bye-knots-Wigs",
              "13x4-Pre-Everything-Wigs",
              "Straight-Bundle",
              "Deluxe-Wigs",
              "Straight-Hair"
          ],
          "capSize": [
              "13x4 Lace",
              "13x6 Lace",
              "4x4 Lace"
          ],
          "frontalLength": [],
          "selectedCapSize": "14",
          "selectedFrontalLength": "14"
      },
      {
          "title": "Delux Wigs Body Bundle Hair",
          "description": "Refinery29 Beauty Innovator Awards 2023 Winner&& 7x5 Upgrade Larger Lace Closure&& Pre-Cut Lace, No More Effort To Cut Lace&& Glueless Install, Bands + Combs = Protective Style&& Total Natural Look, Pre-Bleached Invisible Knots & Pre-Plucked Mimic Hairline&& Friendly To Small Head：8 adjustable hooks at back, fit 19-23in size.&& Pre-shaped ear tab：Friendly To Eyeglass-Wearing Group",
          "type": "deluxe",
          "category": "Gadgets",
          "price": "199.99",
          "new": true,
          "sale": false,
          "discount": "10",
          "stock": "10",
          "images": [
              {
                  "image_id": "1",
                  "id": "1",
                  "alt": "Image 1",
                  "src": "/images/deluxe/DeluxeWigs/DeluxeBodyWave/1.jpg"
              },
              {
                  "image_id": "2",
                  "id": "2",
                  "alt": "Image 2",
                  "src": "/images/deluxe/DeluxeWigs/DeluxeBodyWave/2.jpg"
              },
              {
                  "image_id": "3",
                  "id": "3",
                  "alt": "Image 3",
                  "src": "/images/deluxe/DeluxeWigs/DeluxeBodyWave/3.jpg"
              },
              {
                  "image_id": "4",
                  "id": "4",
                  "alt": "Image 4",
                  "src": "/images/deluxe/DeluxeWigs/DeluxeBodyWave/4.jpg"
              },
              {
                  "image_id": "5",
                  "id": "5",
                  "alt": "Image 5",
                  "src": "/images/deluxe/DeluxeWigs/DeluxeBodyWave/5.jpg"
              },
              {
                  "image_id": "6",
                  "id": "6",
                  "alt": "Image 6",
                  "src": "/images/deluxe/DeluxeWigs/DeluxeBodyWave/6.jpg"
              }
          ],
          "qty": "0",
          "total": "19999",
          "rate": 4.5,
          "laceType": [
              "Body Wave"
          ],
          "selectedLaceType": "Body Wave",
          "laceSize": [
              ""
          ],
          "destiny": [
              "150%",
              "180%",
              "200%"
          ],
          "selectedDestiny": "150%",
          "length": [
              "12 Inch",
              "14 Inch",
              "16 Inch",
              "18 Inch",
              "20 Inch",
              "22 Inch",
              "24 Inch",
              "26 Inch",
              "28 Inch"
          ],
          "selectedLength": "8",
          "color": "Wigs",
          "availableTextures": [
              "HD Lace",
              "Transparent Lace"
          ],
          "texture": "HD Lace",
          "closureLength": [],
          "selectedClosureLength": "14",
          "hairType": "100% Virgin Human Hair",
          "categorylist": [
              "Bye-Bye-knots-Wigs",
              "13x4-Pre-Everything-Wigs",
              "Body-Bundle",
              "Deluxe-Wigs",
              "Water-Wave"
          ],
          "capSize": [
              "13x4 Lace",
              "13x6 Lace",
              "4x4 Lace"
          ],
          "frontalLength": [],
          "selectedCapSize": "14",
          "selectedFrontalLength": "14"
      },
      {
          "title": "Delux Wigs Deep Bundle Hair",
          "description": "Refinery29 Beauty Innovator Awards 2023 Winner&& 7x5 Upgrade Larger Lace Closure&& Pre-Cut Lace, No More Effort To Cut Lace&& Glueless Install, Bands + Combs = Protective Style&& Total Natural Look, Pre-Bleached Invisible Knots & Pre-Plucked Mimic Hairline&& Friendly To Small Head：8 adjustable hooks at back, fit 19-23in size.&& Pre-shaped ear tab：Friendly To Eyeglass-Wearing Group",
          "type": "deluxe",
          "category": "Gadgets",
          "price": "199.99",
          "new": true,
          "sale": false,
          "discount": "10",
          "stock": "10",
          "images": [
              {
                  "image_id": "1",
                  "id": "1",
                  "alt": "Image 1",
                  "src": "/images/deluxe/DeluxeWigs/DeluxeDeepWave/1.jpg"
              },
              {
                  "image_id": "2",
                  "id": "2",
                  "alt": "Image 2",
                  "src": "/images/deluxe/DeluxeWigs/DeluxeDeepWave/2.jpg"
              },
              {
                  "image_id": "3",
                  "id": "3",
                  "alt": "Image 3",
                  "src": "/images/deluxe/DeluxeWigs/DeluxeDeepWave/3.jpg"
              },
              {
                  "image_id": "4",
                  "id": "4",
                  "alt": "Image 4",
                  "src": "/images/deluxe/DeluxeWigs/DeluxeDeepWave/4.jpg"
              },
              {
                  "image_id": "5",
                  "id": "5",
                  "alt": "Image 5",
                  "src": "/images/deluxe/DeluxeWigs/DeluxeDeepWave/5.jpg"
              },
              {
                  "image_id": "6",
                  "id": "6",
                  "alt": "Image 6",
                  "src": "/images/deluxe/DeluxeWigs/DeluxeDeepWave/6.jpg"
              }
          ],
          "qty": "0",
          "total": "19999",
          "rate": 4.5,
          "laceType": [
              "Deep Wave"
          ],
          "selectedLaceType": "Deep Wave",
          "laceSize": [
              ""
          ],
          "destiny": [
              "150%",
              "180%",
              "200%"
          ],
          "selectedDestiny": "150%",
          "length": [
              "12 Inch",
              "14 Inch",
              "16 Inch",
              "18 Inch",
              "20 Inch",
              "22 Inch",
              "24 Inch",
              "26 Inch",
              "28 Inch"
          ],
          "selectedLength": "8",
          "color": "Wigs",
          "availableTextures": [
              "HD Lace",
              "Transparent Lace"
          ],
          "texture": "HD Lace",
          "closureLength": [
              "14",
              "16",
              "18",
              "20"
          ],
          "selectedClosureLength": "14",
          "hairType": "100% Virgin Human Hair",
          "categorylist": [
              "Bye-Bye-knots-Wigs",
              "13x4-Pre-Everything-Wigs",
              "Deep-Bundle",
              "Deluxe-Wigs",
              "Deep-Wave"
          ],
          "capSize": [
              "13x4 Lace",
              "13x6 Lace",
              "4x4 Lace"
          ],
          "frontalLength": [],
          "selectedCapSize": "14",
          "selectedFrontalLength": "14"
      },
      {
          "title": "Delux Wigs Curly Hair",
          "description": "Refinery29 Beauty Innovator Awards 2023 Winner&& 7x5 Upgrade Larger Lace Closure&& Pre-Cut Lace, No More Effort To Cut Lace&& Glueless Install, Bands + Combs = Protective Style&& Total Natural Look, Pre-Bleached Invisible Knots & Pre-Plucked Mimic Hairline&& Friendly To Small Head：8 adjustable hooks at back, fit 19-23in size.&& Pre-shaped ear tab：Friendly To Eyeglass-Wearing Group",
          "type": "deluxe",
          "category": "Gadgets",
          "price": "199.99",
          "new": true,
          "sale": false,
          "discount": "10",
          "stock": "10",
          "images": [
              {
                  "image_id": "1",
                  "id": "1",
                  "alt": "Image 1",
                  "src": "/images/deluxe/DeluxeWigs/DeluxeLooseWave/1.jpg"
              },
              {
                  "image_id": "2",
                  "id": "2",
                  "alt": "Image 2",
                  "src": "/images/deluxe/DeluxeWigs/DeluxeLooseWave/2.jpg"
              },
              {
                  "image_id": "3",
                  "id": "3",
                  "alt": "Image 3",
                  "src": "/images/deluxe/DeluxeWigs/DeluxeLooseWave/3.jpg"
              },
              {
                  "image_id": "4",
                  "id": "4",
                  "alt": "Image 4",
                  "src": "/images/deluxe/DeluxeWigs/DeluxeLooseWave/4.jpg"
              },
              {
                  "image_id": "5",
                  "id": "5",
                  "alt": "Image 5",
                  "src": "/images/deluxe/DeluxeWigs/DeluxeLooseWave/5.jpg"
              },
              {
                  "image_id": "6",
                  "id": "6",
                  "alt": "Image 6",
                  "src": "/images/deluxe/DeluxeWigs/DeluxeLooseWave/6.jpg"
              }
          ],
          "qty": "0",
          "total": "19999",
          "rate": 4.5,
          "laceType": [
              "Loose Wave"
          ],
          "selectedLaceType": "Loose Wave",
          "laceSize": [
              ""
          ],
          "destiny": [
              "150%",
              "180%",
              "200%"
          ],
          "selectedDestiny": "150%",
          "length": [
              "12 Inch",
              "14 Inch",
              "16 Inch",
              "18 Inch",
              "20 Inch",
              "22 Inch",
              "24 Inch",
              "26 Inch",
              "28 Inch"
          ],
          "selectedLength": "8",
          "color": "Wigs",
          "availableTextures": [
              "HD Lace",
              "Transparent Lace"
          ],
          "texture": "HD Lace",
          "closureLength": [
              "14",
              "16",
              "18",
              "20"
          ],
          "selectedClosureLength": "14",
          "hairType": "100% Virgin Human Hair",
          "categorylist": [
              "Bye-Bye-knots-Wigs",
              "13x4-Pre-Everything-Wigs",
              "Loose-Wave-Bundle",
              "Deluxe-Wigs",
              "Curly-Hair"
          ],
          "capSize": [
              "13x4 Lace",
              "13x6 Lace",
              "4x4 Lace"
          ],
          "frontalLength": [],
          "selectedCapSize": "14",
          "selectedFrontalLength": "14"
      },
      {
          "title": "Delux Wigs Straight bundle Hair",
          "description": "Refinery29 Beauty Innovator Awards 2023 Winner&& 7x5 Upgrade Larger Lace Closure&& Pre-Cut Lace, No More Effort To Cut Lace&& Glueless Install, Bands + Combs = Protective Style&& Total Natural Look, Pre-Bleached Invisible Knots & Pre-Plucked Mimic Hairline&& Friendly To Small Head：8 adjustable hooks at back, fit 19-23in size.&& Pre-shaped ear tab：Friendly To Eyeglass-Wearing Group",
          "type": "deluxe",
          "category": "Gadgets",
          "price": "199.99",
          "new": true,
          "sale": false,
          "discount": "10",
          "stock": "10",
          "images": [
              {
                  "image_id": "1",
                  "id": "1",
                  "alt": "Image 1",
                  "src": "/images/deluxe/DeluxeWigs/DeluxueStraight/1.jpg"
              },
              {
                  "image_id": "2",
                  "id": "2",
                  "alt": "Image 2",
                  "src": "/images/deluxe/DeluxeWigs/DeluxueStraight/2.jpg"
              },
              {
                  "image_id": "3",
                  "id": "3",
                  "alt": "Image 3",
                  "src": "/images/deluxe/DeluxeWigs/DeluxueStraight/3.jpg"
              },
              {
                  "image_id": "4",
                  "id": "4",
                  "alt": "Image 4",
                  "src": "/images/deluxe/DeluxeWigs/DeluxueStraight/4.jpg"
              },
              {
                  "image_id": "5",
                  "id": "5",
                  "alt": "Image 5",
                  "src": "/images/deluxe/DeluxeWigs/DeluxueStraight/5.jpg"
              },
              {
                  "image_id": "6",
                  "id": "6",
                  "alt": "Image 6",
                  "src": "/images/deluxe/DeluxeWigs/DeluxueStraight/6.jpg"
              }
          ],
          "qty": "0",
          "total": "19999",
          "rate": 4.5,
          "laceType": [
              "Straight"
          ],
          "selectedLaceType": "Straight",
          "laceSize": [
              ""
          ],
          "destiny": [
              "150%",
              "180%",
              "200%"
          ],
          "selectedDestiny": "150%",
          "length": [
              "12 Inch",
              "14 Inch",
              "16 Inch",
              "18 Inch",
              "20 Inch",
              "22 Inch",
              "24 Inch",
              "26 Inch",
              "28 Inch"
          ],
          "selectedLength": "8",
          "color": "Wigs",
          "availableTextures": [
              "HD Lace",
              "Transparent Lace"
          ],
          "texture": "HD Lace",
          "closureLength": [
              "14",
              "16",
              "18",
              "20"
          ],
          "selectedClosureLength": "14",
          "hairType": "100% Virgin Human Hair",
          "categorylist": [
              "Bye-Bye-knots-Wigs",
              "13x4-Pre-Everything-Wigs",
              "Straight-Bundle",
              "Deluxe-Wigs",
              "Loose-Deep"
          ],
          "capSize": [
              "13x4 Lace",
              "13x6 Lace",
              "4x4 Lace"
          ],
          "frontalLength": [],
          "selectedCapSize": "14",
          "selectedFrontalLength": "14"
      },
      {
          "title": "Delux Wigs Deep Bundle Hair",
          "description": "Refinery29 Beauty Innovator Awards 2023 Winner&& 7x5 Upgrade Larger Lace Closure&& Pre-Cut Lace, No More Effort To Cut Lace&& Glueless Install, Bands + Combs = Protective Style&& Total Natural Look, Pre-Bleached Invisible Knots & Pre-Plucked Mimic Hairline&& Friendly To Small Head：8 adjustable hooks at back, fit 19-23in size.&& Pre-shaped ear tab：Friendly To Eyeglass-Wearing Group",
          "type": "deluxe",
          "category": "Gadgets",
          "price": "199.99",
          "new": true,
          "sale": false,
          "discount": "10",
          "stock": "10",
          "images": [
              {
                  "image_id": "1",
                  "id": "1",
                  "alt": "Image 1",
                  "src": "/images/deluxe/DeluxeWigs/DeluxeDeepWave/1.jpg"
              },
              {
                  "image_id": "2",
                  "id": "2",
                  "alt": "Image 2",
                  "src": "/images/deluxe/DeluxeWigs/DeluxeDeepWave/2.jpg"
              },
              {
                  "image_id": "3",
                  "id": "3",
                  "alt": "Image 3",
                  "src": "/images/deluxe/DeluxeWigs/DeluxeDeepWave/3.jpg"
              },
              {
                  "image_id": "4",
                  "id": "4",
                  "alt": "Image 4",
                  "src": "/images/deluxe/DeluxeWigs/DeluxeDeepWave/4.jpg"
              },
              {
                  "image_id": "5",
                  "id": "5",
                  "alt": "Image 5",
                  "src": "/images/deluxe/DeluxeWigs/DeluxeDeepWave/5.jpg"
              },
              {
                  "image_id": "6",
                  "id": "6",
                  "alt": "Image 6",
                  "src": "/images/deluxe/DeluxeWigs/DeluxeDeepWave/6.jpg"
              }
          ],
          "qty": "0",
          "total": "19999",
          "rate": 4.5,
          "laceType": [
              "Deep Wave"
          ],
          "selectedLaceType": "Deep Wave",
          "laceSize": [
              ""
          ],
          "destiny": [
              "150%",
              "180%",
              "200%"
          ],
          "selectedDestiny": "150%",
          "length": [
              "12 Inch",
              "14 Inch",
              "16 Inch",
              "18 Inch",
              "20 Inch",
              "22 Inch",
              "24 Inch",
              "26 Inch",
              "28 Inch"
          ],
          "selectedLength": "8",
          "color": "Wigs",
          "availableTextures": [
              "HD Lace",
              "Transparent Lace"
          ],
          "texture": "HD Lace",
          "closureLength": [
              "14",
              "16",
              "18",
              "20"
          ],
          "selectedClosureLength": "14",
          "hairType": "100% Virgin Human Hair",
          "categorylist": [
              "Bye-Bye-knots-Wigs",
              "13x4-Pre-Everything-Wigs",
              "Deep-Bundle",
              "Deluxe-Wigs",
              "Loose-Wave"
          ],
          "capSize": [
              "13x4 Lace",
              "13x6 Lace",
              "4x4 Lace"
          ],
          "frontalLength": [],
          "selectedCapSize": "14",
          "selectedFrontalLength": "14"
      },
      {
          "title": "Delux Wigs Curly Hair",
          "description": "Refinery29 Beauty Innovator Awards 2023 Winner&& 7x5 Upgrade Larger Lace Closure&& Pre-Cut Lace, No More Effort To Cut Lace&& Glueless Install, Bands + Combs = Protective Style&& Total Natural Look, Pre-Bleached Invisible Knots & Pre-Plucked Mimic Hairline&& Friendly To Small Head：8 adjustable hooks at back, fit 19-23in size.&& Pre-shaped ear tab：Friendly To Eyeglass-Wearing Group",
          "type": "deluxe",
          "category": "Gadgets",
          "price": "199.99",
          "new": true,
          "sale": false,
          "discount": "10",
          "stock": "10",
          "images": [
              {
                  "image_id": "1",
                  "id": "1",
                  "alt": "Image 1",
                  "src": "/images/deluxe/DeluxeWigs/DeluxeLooseWave/1.jpg"
              },
              {
                  "image_id": "2",
                  "id": "2",
                  "alt": "Image 2",
                  "src": "/images/deluxe/DeluxeWigs/DeluxeLooseWave/2.jpg"
              },
              {
                  "image_id": "3",
                  "id": "3",
                  "alt": "Image 3",
                  "src": "/images/deluxe/DeluxeWigs/DeluxeLooseWave/3.jpg"
              },
              {
                  "image_id": "4",
                  "id": "4",
                  "alt": "Image 4",
                  "src": "/images/deluxe/DeluxeWigs/DeluxeLooseWave/4.jpg"
              },
              {
                  "image_id": "5",
                  "id": "5",
                  "alt": "Image 5",
                  "src": "/images/deluxe/DeluxeWigs/DeluxeLooseWave/5.jpg"
              },
              {
                  "image_id": "6",
                  "id": "6",
                  "alt": "Image 6",
                  "src": "/images/deluxe/DeluxeWigs/DeluxeLooseWave/6.jpg"
              }
          ],
          "qty": "0",
          "total": "19999",
          "rate": 4.5,
          "laceType": [
              "Loose Wave"
          ],
          "selectedLaceType": "Loose Wave",
          "laceSize": [
              ""
          ],
          "destiny": [
              "150%",
              "180%",
              "200%"
          ],
          "selectedDestiny": "150%",
          "length": [
              "12 Inch",
              "14 Inch",
              "16 Inch",
              "18 Inch",
              "20 Inch",
              "22 Inch",
              "24 Inch",
              "26 Inch",
              "28 Inch"
          ],
          "selectedLength": "8",
          "color": "Wigs",
          "availableTextures": [
              "HD Lace",
              "Transparent Lace"
          ],
          "texture": "HD Lace",
          "closureLength": [
              "14",
              "16",
              "18",
              "20"
          ],
          "selectedClosureLength": "14",
          "hairType": "100% Virgin Human Hair",
          "categorylist": [
              "Bye-Bye-knots-Wigs",
              "13x4-Pre-Everything-Wigs",
              "Loose-Wave-Bundle",
              "Deluxe-Wigs",
              "Kinky-Curly"
          ],
          "capSize": [
              "13x4 Lace",
              "13x6 Lace",
              "4x4 Lace"
          ],
          "frontalLength": [],
          "selectedCapSize": "14",
          "selectedFrontalLength": "14"
      },
      {
          "title": "Delux Wigs Straight bundle Hair",
          "description": "Refinery29 Beauty Innovator Awards 2023 Winner&& 7x5 Upgrade Larger Lace Closure&& Pre-Cut Lace, No More Effort To Cut Lace&& Glueless Install, Bands + Combs = Protective Style&& Total Natural Look, Pre-Bleached Invisible Knots & Pre-Plucked Mimic Hairline&& Friendly To Small Head：8 adjustable hooks at back, fit 19-23in size.&& Pre-shaped ear tab：Friendly To Eyeglass-Wearing Group",
          "type": "deluxe",
          "category": "Gadgets",
          "price": "199.99",
          "new": true,
          "sale": false,
          "discount": "10",
          "stock": "10",
          "images": [
              {
                  "image_id": "1",
                  "id": "1",
                  "alt": "Image 1",
                  "src": "/images/deluxe/DeluxeWigs/DeluxueStraight/1.jpg"
              },
              {
                  "image_id": "2",
                  "id": "2",
                  "alt": "Image 2",
                  "src": "/images/deluxe/DeluxeWigs/DeluxueStraight/2.jpg"
              },
              {
                  "image_id": "3",
                  "id": "3",
                  "alt": "Image 3",
                  "src": "/images/deluxe/DeluxeWigs/DeluxueStraight/3.jpg"
              },
              {
                  "image_id": "4",
                  "id": "4",
                  "alt": "Image 4",
                  "src": "/images/deluxe/DeluxeWigs/DeluxueStraight/4.jpg"
              },
              {
                  "image_id": "5",
                  "id": "5",
                  "alt": "Image 5",
                  "src": "/images/deluxe/DeluxeWigs/DeluxueStraight/5.jpg"
              },
              {
                  "image_id": "6",
                  "id": "6",
                  "alt": "Image 6",
                  "src": "/images/deluxe/DeluxeWigs/DeluxueStraight/6.jpg"
              }
          ],
          "qty": "0",
          "total": "19999",
          "rate": 4.5,
          "laceType": [
              "Straight"
          ],
          "selectedLaceType": "Straight",
          "laceSize": [
              ""
          ],
          "destiny": [
              "150%",
              "180%",
              "200%"
          ],
          "selectedDestiny": "150%",
          "length": [
              "12 Inch",
              "14 Inch",
              "16 Inch",
              "18 Inch",
              "20 Inch",
              "22 Inch",
              "24 Inch",
              "26 Inch",
              "28 Inch"
          ],
          "selectedLength": "8",
          "color": "Wigs",
          "availableTextures": [
              "HD Lace",
              "Transparent Lace"
          ],
          "texture": "HD Lace",
          "closureLength": [
              "14",
              "16",
              "18",
              "20"
          ],
          "selectedClosureLength": "14",
          "hairType": "100% Virgin Human Hair",
          "categorylist": [
              "Bye-Bye-knots-Wigs",
              "13x4-Pre-Everything-Wigs",
              "Straight-Bundle",
              "Deluxe-Wigs",
              "Loose-Deep",
              "Kinky-Straight"
          ],
          "capSize": [
              "13x4 Lace",
              "13x6 Lace",
              "4x4 Lace"
          ],
          "frontalLength": [],
          "selectedCapSize": "14",
          "selectedFrontalLength": "14"
      },
      {
          "title": "Delux Wigs Straight bundle Hair",
          "description": "Refinery29 Beauty Innovator Awards 2023 Winner&& 7x5 Upgrade Larger Lace Closure&& Pre-Cut Lace, No More Effort To Cut Lace&& Glueless Install, Bands + Combs = Protective Style&& Total Natural Look, Pre-Bleached Invisible Knots & Pre-Plucked Mimic Hairline&& Friendly To Small Head：8 adjustable hooks at back, fit 19-23in size.&& Pre-shaped ear tab：Friendly To Eyeglass-Wearing Group",
          "type": "deluxe",
          "category": "Gadgets",
          "price": "199.99",
          "new": true,
          "sale": false,
          "discount": "10",
          "stock": "10",
          "images": [
              {
                  "image_id": "1",
                  "id": "1",
                  "alt": "Image 1",
                  "src": "/images/deluxe/DeluxeWigs/DeluxueStraight/1.jpg"
              },
              {
                  "image_id": "2",
                  "id": "2",
                  "alt": "Image 2",
                  "src": "/images/deluxe/DeluxeWigs/DeluxueStraight/2.jpg"
              },
              {
                  "image_id": "3",
                  "id": "3",
                  "alt": "Image 3",
                  "src": "/images/deluxe/DeluxeWigs/DeluxueStraight/3.jpg"
              },
              {
                  "image_id": "4",
                  "id": "4",
                  "alt": "Image 4",
                  "src": "/images/deluxe/DeluxeWigs/DeluxueStraight/4.jpg"
              },
              {
                  "image_id": "5",
                  "id": "5",
                  "alt": "Image 5",
                  "src": "/images/deluxe/DeluxeWigs/DeluxueStraight/5.jpg"
              },
              {
                  "image_id": "6",
                  "id": "6",
                  "alt": "Image 6",
                  "src": "/images/deluxe/DeluxeWigs/DeluxueStraight/6.jpg"
              }
          ],
          "qty": "0",
          "total": "19999",
          "rate": 4.5,
          "laceType": [
              "Straight"
          ],
          "selectedLaceType": "Straight",
          "laceSize": [
              ""
          ],
          "destiny": [
              "150%",
              "180%",
              "200%"
          ],
          "selectedDestiny": "150%",
          "length": [
              "12 Inch",
              "14 Inch",
              "16 Inch",
              "18 Inch",
              "20 Inch",
              "22 Inch",
              "24 Inch",
              "26 Inch",
              "28 Inch"
          ],
          "selectedLength": "8",
          "color": "Wigs",
          "availableTextures": [
              "HD Lace",
              "Transparent Lace"
          ],
          "texture": "HD Lace",
          "closureLength": [
              "14",
              "16",
              "18",
              "20"
          ],
          "selectedClosureLength": "14",
          "hairType": "100% Virgin Human Hair",
          "categorylist": [
              "Bye-Bye-knots-Wigs",
              "13x4-Pre-Everything-Wigs",
              "Straight-Bundle",
              "Deluxe-Wigs",
              "Loose-Deep",
              "Funmi-Hair"
          ],
          "capSize": [
              "13x4 Lace",
              "13x6 Lace",
              "4x4 Lace"
          ],
          "frontalLength": [],
          "selectedCapSize": "14",
          "selectedFrontalLength": "14"
      },
      {
          "title": "Delux Tape-Ins Body Bundle Hair",
          "description": "Refinery29 Beauty Innovator Awards 2023 Winner&& 7x5 Upgrade Larger Lace Closure&& Pre-Cut Lace, No More Effort To Cut Lace&& Glueless Install, Bands + Combs = Protective Style&& Total Natural Look, Pre-Bleached Invisible Knots & Pre-Plucked Mimic Hairline&& Friendly To Small Head：8 adjustable hooks at back, fit 19-23in size.&& Pre-shaped ear tab：Friendly To Eyeglass-Wearing Group",
          "type": "deluxe",
          "category": "Gadgets",
          "price": "199.99",
          "new": true,
          "sale": false,
          "discount": "10",
          "stock": "10",
          "images": [
              {
                  "image_id": "1",
                  "id": "1",
                  "alt": "Image 1",
                  "src": "/images/deluxe/DeluxeTapeIns/DeluxeBodyWave/1.jpg"
              }
          ],
          "qty": "0",
          "total": "19999",
          "rate": 4.5,
          "laceType": [
              "Straight",
              "Body Wave",
              "Loose Wave",
              "Deep Wave"
          ],
          "selectedLaceType": "Straight",
          "laceSize": [
              ""
          ],
          "destiny": [],
          "selectedDestiny": "150%",
          "length": [
              "14",
              "16",
              "18",
              "20",
              "22",
              "24",
              "26",
              "28",
              "30"
          ],
          "selectedLength": "8",
          "color": "Tape-Ins",
          "availableTextures": [
              "HD Lace",
              "Transparent Lace"
          ],
          "texture": "HD Lace",
          "closureLength": [],
          "selectedClosureLength": "14",
          "hairType": "100% Virgin Human Hair",
          "categorylist": [
              "Bye-Bye-knots-Wigs",
              "13x4-Pre-Everything-Wigs",
              "Body-Bundle",
              "Deluxe-Tape-Ins"
          ],
          "capSize": [],
          "frontalLength": [],
          "selectedCapSize": "14",
          "selectedFrontalLength": "14"
      },
      {
          "title": "Delux Tape-Ins Deep Bundle Hair",
          "description": "Refinery29 Beauty Innovator Awards 2023 Winner&& 7x5 Upgrade Larger Lace Closure&& Pre-Cut Lace, No More Effort To Cut Lace&& Glueless Install, Bands + Combs = Protective Style&& Total Natural Look, Pre-Bleached Invisible Knots & Pre-Plucked Mimic Hairline&& Friendly To Small Head：8 adjustable hooks at back, fit 19-23in size.&& Pre-shaped ear tab：Friendly To Eyeglass-Wearing Group",
          "type": "deluxe",
          "category": "Gadgets",
          "price": "199.99",
          "new": true,
          "sale": false,
          "discount": "10",
          "stock": "10",
          "images": [
              {
                  "image_id": "1",
                  "id": "1",
                  "alt": "Image 1",
                  "src": "/images/deluxe/DeluxeTapeIns/DeluxeDeepWave/1.jpg"
              }
          ],
          "qty": "0",
          "total": "19999",
          "rate": 4.5,
          "laceType": [
              "Straight",
              "Body Wave",
              "Loose Wave",
              "Deep Wave"
          ],
          "selectedLaceType": "Straight",
          "laceSize": [
              ""
          ],
          "destiny": [],
          "selectedDestiny": "150%",
          "length": [
              "14",
              "16",
              "18",
              "20",
              "22",
              "24",
              "26",
              "28",
              "30"
          ],
          "selectedLength": "8",
          "color": "Tape-Ins",
          "availableTextures": [
              "HD Lace",
              "Transparent Lace"
          ],
          "texture": "HD Lace",
          "closureLength": [],
          "selectedClosureLength": "14",
          "hairType": "100% Virgin Human Hair",
          "categorylist": [
              "Bye-Bye-knots-Wigs",
              "13x4-Pre-Everything-Wigs",
              "Deep-Bundle",
              "Deluxe-Tape-Ins"
          ],
          "capSize": [],
          "frontalLength": [],
          "selectedCapSize": "14",
          "selectedFrontalLength": "14"
      },
      {
          "title": "Delux Tape-Ins Loose Wave Bundle Hair",
          "description": "Refinery29 Beauty Innovator Awards 2023 Winner&& 7x5 Upgrade Larger Lace Closure&& Pre-Cut Lace, No More Effort To Cut Lace&& Glueless Install, Bands + Combs = Protective Style&& Total Natural Look, Pre-Bleached Invisible Knots & Pre-Plucked Mimic Hairline&& Friendly To Small Head：8 adjustable hooks at back, fit 19-23in size.&& Pre-shaped ear tab：Friendly To Eyeglass-Wearing Group",
          "type": "deluxe",
          "category": "Gadgets",
          "price": "199.99",
          "new": true,
          "sale": false,
          "discount": "10",
          "stock": "10",
          "images": [
              {
                  "image_id": "1",
                  "id": "1",
                  "alt": "Image 1",
                  "src": "/images/deluxe/DeluxeTapeIns/DeluxeLooseWave/1.jpg"
              }
          ],
          "qty": "0",
          "total": "19999",
          "rate": 4.5,
          "laceType": [
              "Straight",
              "Body Wave",
              "Loose Wave",
              "Deep Wave"
          ],
          "selectedLaceType": "Straight",
          "laceSize": [
              ""
          ],
          "destiny": [],
          "selectedDestiny": "150%",
          "length": [
              "14",
              "16",
              "18",
              "20",
              "22",
              "24",
              "26",
              "28",
              "30"
          ],
          "selectedLength": "8",
          "color": "Tape-Ins",
          "availableTextures": [
              "HD Lace",
              "Transparent Lace"
          ],
          "texture": "HD Lace",
          "closureLength": [
              "14",
              "16",
              "18",
              "20"
          ],
          "selectedClosureLength": "14",
          "hairType": "100% Virgin Human Hair",
          "categorylist": [
              "Bye-Bye-knots-Wigs",
              "13x4-Pre-Everything-Wigs",
              "Loose-Wave-Bundle",
              "Deluxe-Tape-Ins"
          ],
          "capSize": [],
          "frontalLength": [],
          "selectedCapSize": "14",
          "selectedFrontalLength": "14"
      },
      {
          "title": "Delux Tape-Ins Straight bundle Hair",
          "description": "Refinery29 Beauty Innovator Awards 2023 Winner&& 7x5 Upgrade Larger Lace Closure&& Pre-Cut Lace, No More Effort To Cut Lace&& Glueless Install, Bands + Combs = Protective Style&& Total Natural Look, Pre-Bleached Invisible Knots & Pre-Plucked Mimic Hairline&& Friendly To Small Head：8 adjustable hooks at back, fit 19-23in size.&& Pre-shaped ear tab：Friendly To Eyeglass-Wearing Group",
          "type": "deluxe",
          "category": "Gadgets",
          "price": "199.99",
          "new": true,
          "sale": false,
          "discount": "10",
          "stock": "10",
          "images": [
              {
                  "image_id": "1",
                  "id": "1",
                  "alt": "Image 1",
                  "src": "/images/deluxe/DeluxeTapeIns/DeluxueStraight/1.jpg"
              }
          ],
          "qty": "0",
          "total": "19999",
          "rate": 4.5,
          "laceType": [
              "Straight",
              "Body Wave",
              "Loose Wave",
              "Deep Wave"
          ],
          "selectedLaceType": "Straight",
          "laceSize": [
              ""
          ],
          "destiny": [],
          "selectedDestiny": "150%",
          "length": [
              "14",
              "16",
              "18",
              "20",
              "22",
              "24",
              "26",
              "28",
              "30"
          ],
          "selectedLength": "8",
          "color": "Tape-Ins",
          "availableTextures": [
              "HD Lace",
              "Transparent Lace"
          ],
          "texture": "HD Lace",
          "closureLength": [
              "14",
              "16",
              "18",
              "20"
          ],
          "selectedClosureLength": "14",
          "hairType": "100% Virgin Human Hair",
          "categorylist": [
              "Bye-Bye-knots-Wigs",
              "13x4-Pre-Everything-Wigs",
              "Straight-Bundle",
              "Deluxe-Tape-Ins"
          ],
          "capSize": [],
          "frontalLength": [],
          "selectedCapSize": "14",
          "selectedFrontalLength": "14"
      }
  ];

    await saveProductData(insertProductlist);

    console.log('Product inserted successfully');
  } catch (error) {
    console.error('Error inserting product:', error);
  }
};

