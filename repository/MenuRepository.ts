import {Menu} from '../models/menu'

export const getMenuRepository = async () => {
  console.log('Data seeded successfully!2');

  seedData();
  const Menus = await Menu.find()
  return Menus
}


const seedData = async () => {
  try {

    const simpleMenuData = [
      {
        title: "Recommended",
        type: "sub",
        megaMenu: true,
        children: [
          {
            title: "Recommended",
            type: "sub",
            children: [
              {
                path: "/",
                title: "Bye-Bye knots Wigs",
                type: "link"
              },
              {
                path: "/",
                title: "13x4 Pre-Everything Wigs",
                type: "link"
              },
              {
                path: "/",
                title: "Put On And Go Wigs",
                type: "link"
              },
              {
                path: "/",
                title: "Vpart Wigs",
                type: "link"
              },
              {
                path: "/",
                title: "Glueless Wigs",
                type: "link"
              },
              {
                path: "/",
                title: "Colored Wigs",
                type: "link"
              },
              {
                path: "/",
                title: "Body Wave Bundles",
                type: "link"
              },
              {
                path: "/",
                title: "Coupon Collection",
                type: "link"
              }
            ]
          }
        ]
      },
    ];

    await Menu.deleteMany({}); // Clear existing data
    const k = await Menu.insertMany(simpleMenuData); // Insert new data

    console.log('Data seeded successfully!4', k);
  } catch (error: any) {
    console.error('Error during seeding:', error);
  }
};


