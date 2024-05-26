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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMenuRepository = void 0;
const menu_1 = require("../models/menu");
const getMenuRepository = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Data seeded successfully!2');
    seedData();
    const Menus = yield menu_1.Menu.find();
    return Menus;
});
exports.getMenuRepository = getMenuRepository;
const seedData = () => __awaiter(void 0, void 0, void 0, function* () {
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
        yield menu_1.Menu.deleteMany({}); // Clear existing data
        const k = yield menu_1.Menu.insertMany(simpleMenuData); // Insert new data
        console.log('Data seeded successfully!4', k);
    }
    catch (error) {
        console.error('Error during seeding:', error);
    }
});
