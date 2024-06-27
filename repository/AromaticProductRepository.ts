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
    categorylist?: {
      $in: any[];
    };
    $or?: any[]; // Make the `$or` property optional
  };

  // const query: QueryType = {
  //   categorylist: {
  //     $in: categoryList, // Primary condition
  //   },
  // };

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

  // Query the products with the appropriate conditions
  const products = await AromaticProduct.find(query).limit(20);

  return products
}

const pictures = [
  '/images/All candles/molds/VUE Aromatics/Coolheaded/1.jpg',
  '/images/All candles/molds/VUE Aromatics/Ease/1.jpg',
  '/images/All candles/molds/VUE Aromatics/Exhale/1.jpg',
  '/images/All candles/molds/VUE Aromatics/Poised/1.jpg',
  '/images/All candles/molds/VUE Aromatics/Serenity/1.jpg',
  '/images/All candles/molds/VUE Aromatics/Suave/1.jpg',
  '/images/All candles/molds/VUE Aromatics/Unruffled/1.jpg',
  '/images/All candles/molds/Aromatic YOU/Not You Feeling CAUTEE/1.jpg',
  '/images/All candles/molds/Aromatic YOU/4 the Love of ME…thats all/1.jpg',
  '/images/All candles/molds/Aromatic YOU/No Stress Zone!/1.jpg',
  '/images/All candles/molds/Aromatic YOU/You’re Extraordinary/1.jpg',
  '/images/All candles/molds/Aromatic YOU/Today, Choose Happiness/1.jpg',
  '/images/All candles/molds/Aromatic YOU/4 the Love of ME…thats all/1.jpg',
  '/images/All candles/molds/Aromatic YOU/No Stress Zone!/1.jpg',
  '/images/All candles/molds/Aromatic Molds/Bubble Yum/Coolheaded/1.jpg',
  '/images/All candles/molds/Aromatic Molds/NU-NU’S/Coolheaded/1.jpg',
  '/images/All candles/molds/Aromatic Molds/Peachy VUE/Coolheaded/1.jpg',
  '/images/All candles/molds/Aromatic Molds/TLé Shells/Coolheaded/1.jpg',
  '/images/All candles/molds/VUE Aromatics/Coolheaded/1.jpg',
  '/images/All candles/molds/VUE Aromatics/Ease/1.jpg',
  '/images/All candles/molds/VUE Aromatics/Exhale/1.jpg',
  '/images/All candles/molds/VUE Aromatics/Poised/1.jpg',
  '/images/All candles/molds/VUE Aromatics/Serenity/1.jpg',
  '/images/All candles/molds/VUE Aromatics/Suave/1.jpg',
  '/images/All candles/molds/VUE Aromatics/Unruffled/1.jpg'
];

const scent = ['Bergamot','Amber','Oriental Musk','Cardamom','Cedar','Lilac'];
const color = ['red', 'green', 'blue', 'pink', 'yellow', 'white'];
const categorylist = [
  {
    title:'Not You Feeling CAUTEE',
    img:'/images/All candles/molds/Aromatic YOU/Not You Feeling CAUTEE/1.jpg'
  },
  {
    title:'4 the Love of ME',
    img:'/images/All candles/molds/Aromatic YOU/4 the Love of ME…thats all/1.jpg'
  },
  {
    title:'No Stress Zone',
    img:'/images/All candles/molds/Aromatic YOU/No Stress Zone!/1.jpg'
  },
  {
    title:'Empowered & Endowed',
    img:'/images/All candles/molds/Aromatic YOU/No Stress Zone!/1.jpg'
  },
  {
    title:'Devoted to Peace',
    img:'/images/All candles/molds/Aromatic YOU/No Stress Zone!/1.jpg'
  },
  {
    title:'You’re Extraordinary',
    img:'/images/All candles/molds/Aromatic YOU/You’re Extraordinary/1.jpg'
  },
  {
    title: 'Today, Choose Happiness',
    img:'/images/All candles/molds/Aromatic YOU/Today, Choose Happiness/1.jpg'
  },
  {
    title:'Fall',
    img:'/images/All candles/molds/Aromatic YOU/Today, Choose Happiness/1.jpg'
  },
  {
    title:'Spring',
    img:'/images/All candles/molds/Aromatic YOU/Today, Choose Happiness/1.jpg'
  },
  {
    title:'Summer',
    img:'/images/All candles/molds/Aromatic YOU/Today, Choose Happiness/1.jpg'
  },
  {
    title:'Winter',
    img:'/images/All candles/molds/Aromatic YOU/Today, Choose Happiness/1.jpg'
  },
  {
    title:'NU-NU’S',
    img:'/images/All candles/molds/Aromatic Molds/NU-NU’S/Coolheaded/1.jpg'
  },
  {
    title:'Peachy VUE',
    img:'/images/All candles/molds/Aromatic Molds/Peachy VUE/Coolheaded/1.jpg'
  },
  {
    title:'TLé Shells',
    img:'/images/All candles/molds/Aromatic Molds/TLé Shells/Coolheaded/1.jpg'
  },
  {
    title:'Coolheaded',
    img:'/images/All candles/molds/VUE Aromatics/Coolheaded/1.jpg'
  },
  {
    title:'Ease',
    img:'/images/All candles/molds/VUE Aromatics/Ease/1.jpg'
  },
  {
    title:'Exhale',
    img:'/images/All candles/molds/VUE Aromatics/Exhale/1.jpg'
  },
  {
    title:'Poised',
    img:'/images/All candles/molds/VUE Aromatics/Poised/1.jpg'
  },
  {
    title:'Serenity',
    img:'/images/All candles/molds/VUE Aromatics/Serenity/1.jpg'
  },
  {
    title:'Suave',
    img:'/images/All candles/molds/VUE Aromatics/Suave/1.jpg'
  },
  {
    title:'Unruffled',
    img:'/images/All candles/molds/VUE Aromatics/Unruffled/1.jpg'
  }
];

const bigcategorylist = [
  'Aromatic Candles',
  'Aromatic Classics',
  'Aromatic Sets',
  'Aromatic Accessories',
  'New Releases'
];

export const insertProduct = async () => {
  try {
    let m = 0;
    for(let i = 0; i< bigcategorylist.length; i++){
      for(let j = 0; j< categorylist.length; j++){
        for(let k = 0; k< color.length; k+=2){
          for(let n = 0; n< scent.length; n+=2){
            const newProduct = new AromaticProduct({
              title: bigcategorylist[i] + " " + categorylist[j].title,
              description: 'Discover the beautiful scents of colorful blooms in the warm desert: notes of rose petals, saguaro cactus, and sage.',
              type: 'aromatic',
              price: 100,
              new: true,
              sale: true,
              discount: 10,
              stock: 10,
              images: [
                { image_id: 1, id: 1, alt: 'Image 1', src: categorylist[j].img },
                { image_id: 2, id: 2, alt: 'Image 2', src: categorylist[j].img },
                { image_id: 3, id: 3, alt: 'Image 3', src: categorylist[j].img },
                { image_id: 4, id: 4, alt: 'Image 4', src: categorylist[j].img },
              ],
              total: 2512,
              rate: 3.5,
              candleType: 'jars',
              scent: [scent[n],scent[n+1]],
              color: [color[k],color[k+1]],
              categorylist: [
                bigcategorylist[i],
                categorylist[j].title
              ],
              createdAt: new Date(),
            });
        
            // Save the product to the database
            await newProduct.save();
            m++;
            console.log(m);
          }
        }
      }
    }
    // const newProduct = new AromaticProduct({
    //   title: 'Lemon Lavender',
    //   description: 'Discover the beautiful scents of colorful blooms in the warm desert: notes of rose petals, saguaro cactus, and sage.',
    //   type: 'aromatic',
    //   price: 100,
    //   new: true,
    //   sale: true,
    //   discount: 10,
    //   stock: 10,
    //   images: [
    //     { image_id: 1, id: 1, alt: 'Image 1', src: 'https://s7d9.scene7.com/is/image/YankeeCandle/233568386_1749339?wid=180&hei=180' },
    //     { image_id: 2, id: 2, alt: 'Image 2', src: 'https://s7d9.scene7.com/is/image/YankeeCandle/HMFC0112_YC_NA_SS23_Fragrance2D_DesertBlooms?wid=1000&hei=1000' },
    //     { image_id: 3, id: 3, alt: 'Image 3', src: 'https://s7d9.scene7.com/is/image/YankeeCandle/233568386_1749339?wid=1000&hei=1000' },
    //     { image_id: 4, id: 4, alt: 'Image 4', src: 'https://s7d9.scene7.com/is/image/YankeeCandle/233568386_1749324?wid=180&hei=180' },
    //   ],
    //   total: 2512,
    //   rate: 3.5,
    //   candleType: 'jars',
    //   scent: ['Bergamot','Amber','Oriental Musk','Cardamom','Cedar','Lilac'],
    //   color: ['red', 'green', 'blue', 'pink', 'yellow', 'white'],
    //   categorylist: [
    //     'signature candles',
    //     'Bubble Yum',
    //     'NU-NU’s',
    //     'Peachy VUE',
    //     'TLé Shells',
    //     'Fall',
    //     'Spring',
    //     'Summer',
    //     'Winter',
    //     'You’re Extraordinary',
    //     'Not You Feeling Cautee',
    //     '4 the Love of ME',
    //     'Aromatic Candles',
    //     'Aromatic Classics',
    //     'Aromatic Sets',
    //     'Aromatic Accessories',
    //     'New Releases'
    //   ],
    //   createdAt: new Date(),
    // });

    // // Save the product to the database
    // await newProduct.save();

    console.log('Product inserted successfully');
  } catch (error) {
    console.error('Error inserting product:', error);
  }
};

