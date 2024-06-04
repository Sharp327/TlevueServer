"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertProduct = exports.getProductsByCategoryRepository = exports.getProductsRepository = exports.getProductRepository = void 0;
const product_1 = __importDefault(require("../models/product"));
const getProductRepository = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield product_1.default.findById(id);
    return product;
});
exports.getProductRepository = getProductRepository;
const getProductsRepository = () => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield product_1.default.find();
    return products;
});
exports.getProductsRepository = getProductsRepository;
const getProductsByCategoryRepository = (filterData) => __awaiter(void 0, void 0, void 0, function* () {
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
    const query = {};
    if (categoryList.length > 0) {
        conditions.push({ categorylist: {
                $in: categoryList, // Primary condition
            } });
        // query.categorylist = {
        //   $in: categoryList, // Primary condition
        // };
    }
    if (conditions.length > 0) {
        query.$or = conditions; // Add the $or condition only if there are conditions to apply
    }
    console.log(query);
    // Query the products with the appropriate conditions
    const products = yield product_1.default.find(query);
    return products;
});
exports.getProductsByCategoryRepository = getProductsByCategoryRepository;
function saveProductData(productData) {
    return __awaiter(this, void 0, void 0, function* () {
        for (const item of productData) {
            const newproduct = new product_1.default(Object.assign({}, item));
            try {
                yield newproduct.save();
                console.log(`Saved: ${item.title}`);
            }
            catch (error) {
                console.error(`Error saving ${item.title}: `, error);
            }
        }
    });
}
const insertProduct = () => __awaiter(void 0, void 0, void 0, function* () {
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
                "laceType": "Body Wave",
                "laceSize": "",
                "destiny": [
                    "150%",
                    "180%",
                    "200%"
                ],
                "selectedDestiny": "150%",
                "closureLength": ["14", "16", "18", "20"],
                "selectedClosureLength": "14",
                "frontalLength": ["14", "16", "18", "20"],
                "selectedFrontalLength": "14",
                "capSize": ["13x4 Lace", "13x6 Lace", "4x4 Lace"],
                "selectedCapSize": "13x4 Lace",
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
                "hairType": "100% Virgin Human Hair",
                "categorylist": [
                    "Bye-Bye knots Wigs",
                    "13x4 Pre-Everything Wigs",
                    "Delux613",
                    "Bodywave",
                    "Deluxe 613"
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
                "laceType": "Straight",
                "laceSize": "",
                "destiny": [
                    "150%",
                    "180%",
                    "200%"
                ],
                "selectedDestiny": "150%",
                "closureLength": ["14", "16", "18", "20"],
                "selectedClosureLength": "14",
                "frontalLength": ["14", "16", "18", "20"],
                "selectedFrontalLength": "14",
                "capSize": ["13x4 Lace", "13x6 Lace", "4x4 Lace"],
                "selectedCapSize": "13x4 Lace",
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
                "hairType": "100% Virgin Human Hair",
                "categorylist": [
                    "Bye-Bye knots Wigs",
                    "13x4 Pre-Everything Wigs",
                    "Delux613",
                    "Straight",
                    "Deluxe 613"
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
                "laceType": "Body Wave",
                "laceSize": "",
                "destiny": [
                    "150%",
                    "180%",
                    "200%"
                ],
                "selectedDestiny": "150%",
                "closureLength": ["14", "16", "18", "20"],
                "selectedClosureLength": "14",
                "frontalLength": ["14", "16", "18", "20"],
                "selectedFrontalLength": "14",
                "capSize": ["13x4 Lace", "13x6 Lace", "4x4 Lace"],
                "selectedCapSize": "13x4 Lace",
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
                "color": "Bundles",
                "availableTextures": [
                    "HD Lace",
                    "Transparent Lace"
                ],
                "texture": "HD Lace",
                "hairType": "100% Virgin Human Hair",
                "categorylist": [
                    "Bye-Bye knots Wigs",
                    "13x4 Pre-Everything Wigs",
                    "Body Bundle",
                    "Deluxe Bundles"
                ]
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
                "laceType": "Deep Wave",
                "laceSize": "",
                "destiny": [
                    "150%",
                    "180%",
                    "200%"
                ],
                "selectedDestiny": "150%",
                "closureLength": ["14", "16", "18", "20"],
                "selectedClosureLength": "14",
                "frontalLength": ["14", "16", "18", "20"],
                "selectedFrontalLength": "14",
                "capSize": ["13x4 Lace", "13x6 Lace", "4x4 Lace"],
                "selectedCapSize": "13x4 Lace",
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
                "color": "Bundles",
                "availableTextures": [
                    "HD Lace",
                    "Transparent Lace"
                ],
                "texture": "HD Lace",
                "hairType": "100% Virgin Human Hair",
                "categorylist": [
                    "Bye-Bye knots Wigs",
                    "13x4 Pre-Everything Wigs",
                    "Body Bundle",
                    "Deluxe Bundles"
                ]
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
                "laceType": "Loose Wave",
                "laceSize": "",
                "destiny": [
                    "150%",
                    "180%",
                    "200%"
                ],
                "selectedDestiny": "150%",
                "closureLength": ["14", "16", "18", "20"],
                "selectedClosureLength": "14",
                "frontalLength": ["14", "16", "18", "20"],
                "selectedFrontalLength": "14",
                "capSize": ["13x4 Lace", "13x6 Lace", "4x4 Lace"],
                "selectedCapSize": "13x4 Lace",
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
                "color": "Bundles",
                "availableTextures": [
                    "HD Lace",
                    "Transparent Lace"
                ],
                "texture": "HD Lace",
                "hairType": "100% Virgin Human Hair",
                "categorylist": [
                    "Bye-Bye knots Wigs",
                    "13x4 Pre-Everything Wigs",
                    "Loose Wave Bundle",
                    "Deluxe Bundles"
                ]
            },
            {
                "title": "Delux Bundles Straight bundle Hair",
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
                "laceType": "Straight",
                "laceSize": "",
                "destiny": [
                    "150%",
                    "180%",
                    "200%"
                ],
                "selectedDestiny": "150%",
                "closureLength": ["14", "16", "18", "20"],
                "selectedClosureLength": "14",
                "frontalLength": ["14", "16", "18", "20"],
                "selectedFrontalLength": "14",
                "capSize": ["13x4 Lace", "13x6 Lace", "4x4 Lace"],
                "selectedCapSize": "13x4 Lace",
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
                "color": "Bundles",
                "availableTextures": [
                    "HD Lace",
                    "Transparent Lace"
                ],
                "texture": "HD Lace",
                "hairType": "100% Virgin Human Hair",
                "categorylist": [
                    "Bye-Bye knots Wigs",
                    "13x4 Pre-Everything Wigs",
                    "Straight Bundle",
                    "Deluxe Bundles"
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
                "laceType": "Body Wave",
                "laceSize": "Deluxe Closure",
                "destiny": [
                    "150%",
                    "180%",
                    "200%"
                ],
                "selectedDestiny": "150%",
                "closureLength": ["14", "16", "18", "20"],
                "selectedClosureLength": "14",
                "frontalLength": ["14", "16", "18", "20"],
                "selectedFrontalLength": "14",
                "capSize": ["13x4 Lace", "13x6 Lace", "4x4 Lace"],
                "selectedCapSize": "13x4 Lace",
                "length": [
                    "8 8 8",
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
                    "28 28 30",
                    "8 10 12",
                    "10 12 14",
                    "12 14 16",
                    "14 16 18",
                    "16 18 20",
                    "18 20 22",
                    "20 22 24",
                    "22 24 26",
                    "24 26 28",
                    "26 28 300"
                ],
                "selectedLength": "8 8 8",
                "color": "Frontal/Closure",
                "availableTextures": [
                    "HD Lace",
                    "Transparent Lace"
                ],
                "texture": "HD Lace",
                "hairType": "100% Virgin Human Hair",
                "categorylist": [
                    "Bye-Bye knots Wigs",
                    "13x4 Pre-Everything Wigs",
                    "Body Bundle",
                    "Deluxe Closure-Frontal"
                ]
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
                "laceType": "Deep Wave",
                "laceSize": "Deluxe Closure",
                "destiny": [
                    "150%",
                    "180%",
                    "200%"
                ],
                "selectedDestiny": "150%",
                "closureLength": ["14", "16", "18", "20"],
                "selectedClosureLength": "14",
                "frontalLength": ["14", "16", "18", "20"],
                "selectedFrontalLength": "14",
                "capSize": ["13x4 Lace", "13x6 Lace", "4x4 Lace"],
                "selectedCapSize": "13x4 Lace",
                "length": [
                    "8 8 8",
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
                    "28 28 30",
                    "8 10 12",
                    "10 12 14",
                    "12 14 16",
                    "14 16 18",
                    "16 18 20",
                    "18 20 22",
                    "20 22 24",
                    "22 24 26",
                    "24 26 28",
                    "26 28 300"
                ],
                "selectedLength": "8 8 8",
                "color": "Frontal/Closure",
                "availableTextures": [
                    "HD Lace",
                    "Transparent Lace"
                ],
                "texture": "HD Lace",
                "hairType": "100% Virgin Human Hair",
                "categorylist": [
                    "Bye-Bye knots Wigs",
                    "13x4 Pre-Everything Wigs",
                    "Deep Bundle",
                    "Deluxe Closure-Frontal"
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
                "laceType": "Loose Wave",
                "laceSize": "Deluxe Closure",
                "destiny": [
                    "150%",
                    "180%",
                    "200%"
                ],
                "selectedDestiny": "150%",
                "closureLength": ["14", "16", "18", "20"],
                "selectedClosureLength": "14",
                "frontalLength": ["14", "16", "18", "20"],
                "selectedFrontalLength": "14",
                "capSize": ["13x4 Lace", "13x6 Lace", "4x4 Lace"],
                "selectedCapSize": "13x4 Lace",
                "length": [
                    "8 8 8",
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
                    "28 28 30",
                    "8 10 12",
                    "10 12 14",
                    "12 14 16",
                    "14 16 18",
                    "16 18 20",
                    "18 20 22",
                    "20 22 24",
                    "22 24 26",
                    "24 26 28",
                    "26 28 300"
                ],
                "selectedLength": "8 8 8",
                "color": "Frontal/Closure",
                "availableTextures": [
                    "HD Lace",
                    "Transparent Lace"
                ],
                "texture": "HD Lace",
                "hairType": "100% Virgin Human Hair",
                "categorylist": [
                    "Bye-Bye knots Wigs",
                    "13x4 Pre-Everything Wigs",
                    "Delux Closure",
                    "Loose Wave Bundle"
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
                "laceType": "Straight",
                "laceSize": "Deluxe Closure",
                "destiny": [
                    "150%",
                    "180%",
                    "200%"
                ],
                "selectedDestiny": "150%",
                "closureLength": ["14", "16", "18", "20"],
                "selectedClosureLength": "14",
                "frontalLength": ["14", "16", "18", "20"],
                "selectedFrontalLength": "14",
                "capSize": ["13x4 Lace", "13x6 Lace", "4x4 Lace"],
                "selectedCapSize": "13x4 Lace",
                "length": [
                    "8 8 8",
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
                    "28 28 30",
                    "8 10 12",
                    "10 12 14",
                    "12 14 16",
                    "14 16 18",
                    "16 18 20",
                    "18 20 22",
                    "20 22 24",
                    "22 24 26",
                    "24 26 28",
                    "26 28 300"
                ],
                "selectedLength": "8 8 8",
                "color": "Frontal/Closure",
                "availableTextures": [
                    "HD Lace",
                    "Transparent Lace"
                ],
                "texture": "HD Lace",
                "hairType": "100% Virgin Human Hair",
                "categorylist": [
                    "Bye-Bye knots Wigs",
                    "13x4 Pre-Everything Wigs",
                    "Straight Bundle",
                    "Deluxe Closure-Frontal"
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
                "laceType": "Body Wave",
                "laceSize": "Deluxe Frontal",
                "destiny": [
                    "150%",
                    "180%",
                    "200%"
                ],
                "selectedDestiny": "150%",
                "closureLength": ["14", "16", "18", "20"],
                "selectedClosureLength": "14",
                "frontalLength": ["14", "16", "18", "20"],
                "selectedFrontalLength": "14",
                "capSize": ["13x4 Lace", "13x6 Lace", "4x4 Lace"],
                "selectedCapSize": "13x4 Lace",
                "length": [
                    "8 8 8",
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
                    "28 28 30",
                    "8 10 12",
                    "10 12 14",
                    "12 14 16",
                    "14 16 18",
                    "16 18 20",
                    "18 20 22",
                    "20 22 24",
                    "22 24 26",
                    "24 26 28",
                    "26 28 300"
                ],
                "selectedLength": "8 8 8",
                "color": "Frontal/Closure",
                "availableTextures": [
                    "HD Lace",
                    "Transparent Lace"
                ],
                "texture": "HD Lace",
                "hairType": "100% Virgin Human Hair",
                "categorylist": [
                    "Bye-Bye knots Wigs",
                    "13x4 Pre-Everything Wigs",
                    "Body Bundle",
                    "Deluxe Closure-Frontal"
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
                "laceType": "Deep Wave",
                "laceSize": "Deluxe Frontal",
                "destiny": [
                    "150%",
                    "180%",
                    "200%"
                ],
                "selectedDestiny": "150%",
                "closureLength": ["14", "16", "18", "20"],
                "selectedClosureLength": "14",
                "frontalLength": ["14", "16", "18", "20"],
                "selectedFrontalLength": "14",
                "capSize": ["13x4 Lace", "13x6 Lace", "4x4 Lace"],
                "selectedCapSize": "13x4 Lace",
                "length": [
                    "8 8 8",
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
                    "28 28 30",
                    "8 10 12",
                    "10 12 14",
                    "12 14 16",
                    "14 16 18",
                    "16 18 20",
                    "18 20 22",
                    "20 22 24",
                    "22 24 26",
                    "24 26 28",
                    "26 28 300"
                ],
                "selectedLength": "8 8 8",
                "color": "Frontal/Closure",
                "availableTextures": [
                    "HD Lace",
                    "Transparent Lace"
                ],
                "texture": "HD Lace",
                "hairType": "100% Virgin Human Hair",
                "categorylist": [
                    "Bye-Bye knots Wigs",
                    "13x4 Pre-Everything Wigs",
                    "Deep Bundle",
                    "Deluxe Closure-Frontal"
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
                "laceType": "Loose Wave",
                "laceSize": "Deluxe Frontal",
                "avaidestiny": [
                    "150%",
                    "180%",
                    "200%"
                ],
                "selectedDestiny": "150%",
                "closureLength": ["14", "16", "18", "20"],
                "selectedClosureLength": "14",
                "frontalLength": ["14", "16", "18", "20"],
                "selectedFrontalLength": "14",
                "capSize": ["13x4 Lace", "13x6 Lace", "4x4 Lace"],
                "selectedCapSize": "13x4 Lace",
                "length": [
                    "8 8 8",
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
                    "28 28 30",
                    "8 10 12",
                    "10 12 14",
                    "12 14 16",
                    "14 16 18",
                    "16 18 20",
                    "18 20 22",
                    "20 22 24",
                    "22 24 26",
                    "24 26 28",
                    "26 28 300"
                ],
                "selectedLength": "8 8 8",
                "color": "Frontal/Closure",
                "availableTextures": [
                    "HD Lace",
                    "Transparent Lace"
                ],
                "texture": "HD Lace",
                "hairType": "100% Virgin Human Hair",
                "categorylist": [
                    "Bye-Bye knots Wigs",
                    "13x4 Pre-Everything Wigs",
                    "Loose Wave Bundle",
                    "Deluxe Closure-Frontal"
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
                "laceType": "Straight",
                "laceSize": "Deluxe Frontal",
                "destiny": [
                    "150%",
                    "180%",
                    "200%"
                ],
                "selectedDestiny": "150%",
                "closureLength": ["14", "16", "18", "20"],
                "selectedClosureLength": "14",
                "frontalLength": ["14", "16", "18", "20"],
                "selectedFrontalLength": "14",
                "capSize": ["13x4 Lace", "13x6 Lace", "4x4 Lace"],
                "selectedCapSize": "13x4 Lace",
                "length": [
                    "8 8 8",
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
                    "28 28 30",
                    "8 10 12",
                    "10 12 14",
                    "12 14 16",
                    "14 16 18",
                    "16 18 20",
                    "18 20 22",
                    "20 22 24",
                    "22 24 26",
                    "24 26 28",
                    "26 28 300"
                ],
                "selectedLength": "8 8 8",
                "color": "Frontal/Closure",
                "availableTextures": [
                    "HD Lace",
                    "Transparent Lace"
                ],
                "texture": "HD Lace",
                "hairType": "100% Virgin Human Hair",
                "categorylist": [
                    "Bye-Bye knots Wigs",
                    "13x4 Pre-Everything Wigs",
                    "Straight Bundle",
                    "Deluxe Closure-Frontal"
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
                "laceType": "Body Wave",
                "laceSize": "",
                "destiny": [
                    "150%",
                    "180%",
                    "200%"
                ],
                "selectedDestiny": "150%",
                "closureLength": ["14", "16", "18", "20"],
                "selectedClosureLength": "14",
                "frontalLength": ["14", "16", "18", "20"],
                "selectedFrontalLength": "14",
                "capSize": ["13x4 Lace", "13x6 Lace", "4x4 Lace"],
                "selectedCapSize": "13x4 Lace",
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
                "selectedLength": "8",
                "color": "Wigs",
                "availableTextures": [
                    "HD Lace",
                    "Transparent Lace"
                ],
                "texture": "HD Lace",
                "hairType": "100% Virgin Human Hair",
                "categorylist": [
                    "Bye-Bye knots Wigs",
                    "13x4 Pre-Everything Wigs",
                    "Body Bundle",
                    "Deluxe Wigs"
                ]
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
                "laceType": "Deep Wave",
                "laceSize": "",
                "destiny": [
                    "150%",
                    "180%",
                    "200%"
                ],
                "selectedDestiny": "150%",
                "closureLength": ["14", "16", "18", "20"],
                "selectedClosureLength": "14",
                "frontalLength": ["14", "16", "18", "20"],
                "selectedFrontalLength": "14",
                "capSize": ["13x4 Lace", "13x6 Lace", "4x4 Lace"],
                "selectedCapSize": "13x4 Lace",
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
                "selectedLength": "8",
                "color": "Wigs",
                "availableTextures": [
                    "HD Lace",
                    "Transparent Lace"
                ],
                "texture": "HD Lace",
                "hairType": "100% Virgin Human Hair",
                "categorylist": [
                    "Bye-Bye knots Wigs",
                    "13x4 Pre-Everything Wigs",
                    "Deep Bundle",
                    "Deluxe Wigs"
                ]
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
                "laceType": "Loose Wave",
                "laceSize": "",
                "destiny": [
                    "150%",
                    "180%",
                    "200%"
                ],
                "selectedDestiny": "150%",
                "closureLength": ["14", "16", "18", "20"],
                "selectedClosureLength": "14",
                "frontalLength": ["14", "16", "18", "20"],
                "selectedFrontalLength": "14",
                "capSize": ["13x4 Lace", "13x6 Lace", "4x4 Lace"],
                "selectedCapSize": "13x4 Lace",
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
                "selectedLength": "8",
                "color": "Wigs",
                "availableTextures": [
                    "HD Lace",
                    "Transparent Lace"
                ],
                "texture": "HD Lace",
                "hairType": "100% Virgin Human Hair",
                "categorylist": [
                    "Bye-Bye knots Wigs",
                    "13x4 Pre-Everything Wigs",
                    "Loose Wave Bundle",
                    "Deluxe Wigs"
                ]
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
                "laceType": "Straight",
                "laceSize": "",
                "destiny": [
                    "150%",
                    "180%",
                    "200%"
                ],
                "selectedDestiny": "150%",
                "closureLength": ["14", "16", "18", "20"],
                "selectedClosureLength": "14",
                "frontalLength": ["14", "16", "18", "20"],
                "selectedFrontalLength": "14",
                "capSize": ["13x4 Lace", "13x6 Lace", "4x4 Lace"],
                "selectedCapSize": "13x4 Lace",
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
                "selectedLength": "8",
                "color": "Wigs",
                "availableTextures": [
                    "HD Lace",
                    "Transparent Lace"
                ],
                "texture": "HD Lace",
                "hairType": "100% Virgin Human Hair",
                "categorylist": [
                    "Bye-Bye knots Wigs",
                    "13x4 Pre-Everything Wigs",
                    "Straight Bundle",
                    "Deluxe Wigs"
                ]
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
                "laceType": "Body Wave",
                "laceSize": "",
                "destiny": [
                    "150%",
                    "180%",
                    "200%"
                ],
                "selectedDestiny": "150%",
                "closureLength": ["14", "16", "18", "20"],
                "selectedClosureLength": "14",
                "frontalLength": ["14", "16", "18", "20"],
                "selectedFrontalLength": "14",
                "capSize": ["13x4 Lace", "13x6 Lace", "4x4 Lace"],
                "selectedCapSize": "13x4 Lace",
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
                "selectedLength": "8",
                "color": "Wigs",
                "availableTextures": [
                    "HD Lace",
                    "Transparent Lace"
                ],
                "texture": "HD Lace",
                "hairType": "100% Virgin Human Hair",
                "categorylist": [
                    "Bye-Bye knots Wigs",
                    "13x4 Pre-Everything Wigs",
                    "Body Bundle",
                    "Deluxe Tape-Ins"
                ]
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
                "laceType": "Deep Wave",
                "laceSize": "",
                "destiny": [
                    "150%",
                    "180%",
                    "200%"
                ],
                "selectedDestiny": "150%",
                "closureLength": ["14", "16", "18", "20"],
                "selectedClosureLength": "14",
                "frontalLength": ["14", "16", "18", "20"],
                "selectedFrontalLength": "14",
                "capSize": ["13x4 Lace", "13x6 Lace", "4x4 Lace"],
                "selectedCapSize": "13x4 Lace",
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
                "selectedLength": "8",
                "color": "Wigs",
                "availableTextures": [
                    "HD Lace",
                    "Transparent Lace"
                ],
                "texture": "HD Lace",
                "hairType": "100% Virgin Human Hair",
                "categorylist": [
                    "Bye-Bye knots Wigs",
                    "13x4 Pre-Everything Wigs",
                    "Deep Bundle",
                    "Deluxe Tape-Ins"
                ]
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
                "laceType": "Loose Wave",
                "laceSize": "",
                "destiny": [
                    "150%",
                    "180%",
                    "200%"
                ],
                "selectedDestiny": "150%",
                "closureLength": ["14", "16", "18", "20"],
                "selectedClosureLength": "14",
                "frontalLength": ["14", "16", "18", "20"],
                "selectedFrontalLength": "14",
                "capSize": ["13x4 Lace", "13x6 Lace", "4x4 Lace"],
                "selectedCapSize": "13x4 Lace",
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
                "selectedLength": "8",
                "color": "Wigs",
                "availableTextures": [
                    "HD Lace",
                    "Transparent Lace"
                ],
                "texture": "HD Lace",
                "hairType": "100% Virgin Human Hair",
                "categorylist": [
                    "Bye-Bye knots Wigs",
                    "13x4 Pre-Everything Wigs",
                    "Loose Wave Bundle",
                    "Deluxe Tape-Ins"
                ]
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
                "laceType": "Straight",
                "laceSize": "",
                "destiny": [
                    "150%",
                    "180%",
                    "200%"
                ],
                "selectedDestiny": "150%",
                "closureLength": ["14", "16", "18", "20"],
                "selectedClosureLength": "14",
                "frontalLength": ["14", "16", "18", "20"],
                "selectedFrontalLength": "14",
                "capSize": ["13x4 Lace", "13x6 Lace", "4x4 Lace"],
                "selectedCapSize": "13x4 Lace",
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
                "selectedLength": "8",
                "color": "Wigs",
                "availableTextures": [
                    "HD Lace",
                    "Transparent Lace"
                ],
                "texture": "HD Lace",
                "hairType": "100% Virgin Human Hair",
                "categorylist": [
                    "Bye-Bye knots Wigs",
                    "13x4 Pre-Everything Wigs",
                    "Straight Bundle",
                    "Deluxe Tape-Ins"
                ]
            }
        ];
        yield saveProductData(insertProductlist);
        console.log('Product inserted successfully');
    }
    catch (error) {
        console.error('Error inserting product:', error);
    }
});
exports.insertProduct = insertProduct;
