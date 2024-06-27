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
exports.getMenuRepository = void 0;
const menu_1 = __importDefault(require("../models/menu"));
const getMenuRepository = (pagetype) => __awaiter(void 0, void 0, void 0, function* () {
    // seedData();
    const Menus = yield menu_1.default.find({ pagetype: pagetype });
    return Menus;
});
exports.getMenuRepository = getMenuRepository;
function saveMenuData(menuData, pageType) {
    return __awaiter(this, void 0, void 0, function* () {
        for (const item of menuData) {
            const newMenu = new menu_1.default(Object.assign(Object.assign({}, item), { pagetype: pageType }));
            try {
                yield newMenu.save();
                console.log(`Saved: ${item.title} under ${pageType}`);
            }
            catch (error) {
                console.error(`Error saving ${item.title}: `, error);
            }
        }
    });
}
const seedData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deluxMenuData = [
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
                                path: "Glueless Wigs",
                                title: "Glueless Wigs",
                                type: "link"
                            },
                            {
                                path: "Colored Wigs",
                                title: "Colored Wigs",
                                type: "link"
                            },
                            {
                                path: "Body Wave Bundles",
                                title: "Body Wave Bundles",
                                type: "link"
                            },
                            {
                                path: "Coupon Collection",
                                title: "Coupon Collection",
                                type: "link"
                            }
                        ]
                    }
                ]
            },
            {
                title: "Wigs",
                type: "sub",
                megaMenu: true,
                children: [
                    {
                        title: "By Density",
                        type: "sub",
                        children: [
                            {
                                path: "150% Density",
                                title: "150% Density",
                                type: "link"
                            },
                            {
                                path: "180% Density",
                                title: "180% Density",
                                type: "link"
                            },
                            {
                                path: "200% Density and High",
                                title: "200% Density and High",
                                type: "link"
                            },
                            {
                                path: "Deluxe Custom",
                                title: "Deluxe Custom",
                                type: "link"
                            }
                        ]
                    },
                    {
                        title: "By Texture",
                        type: "sub",
                        children: [
                            {
                                path: "Body Wave",
                                title: "Body Wave",
                                type: "link"
                            },
                            {
                                path: "Straight Hair",
                                title: "Straight Hair",
                                type: "link"
                            },
                            {
                                path: "Water Wave",
                                title: "Water Wave",
                                type: "link"
                            },
                            {
                                path: "Deep Wave",
                                title: "Deep Wave",
                                type: "link"
                            },
                            {
                                path: "Curly Hair",
                                title: "Curly Hair",
                                type: "link"
                            },
                            {
                                path: "Loose Deep",
                                title: "Loose Deep",
                                type: "link"
                            },
                            {
                                path: "Loose Wave",
                                title: "Loose Wave",
                                type: "link"
                            },
                            {
                                path: "Kinky Curly",
                                title: "Kinky Curly",
                                type: "link"
                            },
                            {
                                path: "Kinky Straight",
                                title: "Kinky Straight",
                                type: "link"
                            },
                            {
                                path: "Funmi Hair",
                                title: "Funmi Hair",
                                type: "link"
                            }
                        ]
                    }
                ]
            },
            {
                title: "Closures & Frontals",
                type: "sub",
                megaMenu: true,
                children: [
                    {
                        title: "By Lace",
                        type: "sub",
                        children: [
                            {
                                path: "4x4 Lace Closure",
                                title: "4x4 Lace Closure",
                                type: "link"
                            },
                            {
                                path: "13x4 Frontal",
                                title: "13x4 Frontal",
                                type: "link"
                            },
                            {
                                path: "5x5 Lace Closure",
                                title: "5x5 Lace Closure",
                                type: "link"
                            },
                            {
                                path: "6x6 Lace Closure",
                                title: "6x6 Lace Closure",
                                type: "link"
                            },
                            {
                                path: "HD Lace Closure",
                                title: "HD Lace Closure",
                                type: "link"
                            }
                        ]
                    }
                ]
            },
            {
                title: "Hair Bundles",
                type: "sub",
                megaMenu: true,
                children: [
                    {
                        title: "By Lots",
                        type: "sub",
                        children: [
                            {
                                path: "1 Bundle",
                                title: "1 Bundle",
                                type: "link"
                            },
                            {
                                path: "3 Bundles",
                                title: "3 Bundles",
                                type: "link"
                            },
                            {
                                path: "4 Bundles",
                                title: "4 Bundles",
                                type: "link"
                            },
                            {
                                path: "10 Bundles",
                                title: "10 Bundles",
                                type: "link"
                            },
                            {
                                path: "3 Bundles With Closure",
                                title: "3 Bundles With Closure",
                                type: "link"
                            },
                            {
                                path: "3 Bundles With Frontal",
                                title: "3 Bundles With Frontal",
                                type: "link"
                            },
                            {
                                path: "4 Bundles With Closure",
                                title: "4 Bundles With Closure",
                                type: "link"
                            },
                            {
                                path: "4 Bundles With Frontal",
                                title: "4 Bundles With Frontal",
                                type: "link"
                            },
                            {
                                path: "HD Closure with Bundles",
                                title: "HD Closure with Bundles",
                                type: "link"
                            },
                            {
                                path: "HD Frontal with Bundles",
                                title: "HD Frontal with Bundles",
                                type: "link"
                            },
                            {
                                path: "Double Drawn Bundles",
                                title: "Double Drawn Bundles",
                                type: "link"
                            }
                        ]
                    },
                    {
                        title: "By Texture",
                        type: "sub",
                        children: [
                            {
                                path: "Body Wave",
                                title: "Body Wave",
                                type: "link"
                            },
                            {
                                path: "Straight Hair",
                                title: "Straight Hair",
                                type: "link"
                            },
                            {
                                path: "Water Wave",
                                title: "Water Wave",
                                type: "link"
                            },
                            {
                                path: "Deep Wave",
                                title: "Deep Wave",
                                type: "link"
                            },
                            {
                                path: "Curly Hair",
                                title: "Curly Hair",
                                type: "link"
                            },
                            {
                                path: "Loose Deep",
                                title: "Loose Deep",
                                type: "link"
                            },
                            {
                                path: "Loose Wave",
                                title: "Loose Wave",
                                type: "link"
                            },
                            {
                                path: "Kinky Curly",
                                title: "Kinky Curly",
                                type: "link"
                            },
                            {
                                path: "Kinky Straight",
                                title: "Kinky Straight",
                                type: "link"
                            },
                            {
                                path: "Funmi Hair",
                                title: "Funmi Hair",
                                type: "link"
                            }
                        ]
                    }
                ]
            },
            {
                title: "Accessories",
                type: "sub",
                megaMenu: true,
                children: []
            },
            {
                title: "New Arrivals",
                type: "sub",
                megaMenu: true,
                children: []
            },
            {
                title: "Blogs",
                type: "sub",
                megaMenu: true,
                children: [
                    {
                        title: "Blogs",
                        type: "sub",
                        children: []
                    }
                ]
            }
        ];
        const aromaticMenuData = [
            {
                title: "Aromatic Candles",
                type: "sub",
                megaMenu: true,
                children: [
                    {
                        title: "",
                        type: "sub",
                        children: [
                            {
                                path: "Coolheaded",
                                title: "Coolheaded",
                                img: "/images/All candles/molds/VUE Aromatics/Coolheaded/1.jpg",
                                type: "link"
                            }
                        ]
                    },
                    {
                        title: "",
                        type: "sub",
                        children: [
                            {
                                path: "Ease",
                                title: "Ease",
                                img: "/images/All candles/molds/VUE Aromatics/Ease/1.jpg",
                                type: "link"
                            }
                        ]
                    },
                    {
                        title: "",
                        type: "sub",
                        children: [
                            {
                                path: "Exhale",
                                title: "Exhale",
                                img: "/images/All candles/molds/VUE Aromatics/Exhale/1.jpg",
                                type: "link"
                            }
                        ]
                    },
                    {
                        title: "",
                        type: "sub",
                        children: [
                            {
                                path: "Poised",
                                title: "Poised",
                                img: "/images/All candles/molds/VUE Aromatics/Poised/1.jpg",
                                type: "link"
                            }
                        ]
                    },
                    {
                        title: "",
                        type: "sub",
                        children: [
                            {
                                path: "Serenity",
                                title: "Serenity",
                                img: "/images/All candles/molds/VUE Aromatics/Serenity/1.jpg",
                                type: "link"
                            }
                        ]
                    },
                    {
                        title: "",
                        type: "sub",
                        children: [
                            {
                                path: "Suave",
                                title: "Suave",
                                img: "/images/All candles/molds/VUE Aromatics/Suave/1.jpg",
                                type: "link"
                            }
                        ]
                    },
                    {
                        title: "",
                        type: "sub",
                        children: [
                            {
                                path: "Unruffled",
                                title: "Unruffled",
                                img: "/images/All candles/molds/VUE Aromatics/Unruffled/1.jpg",
                                type: "link"
                            }
                        ]
                    }
                ]
            },
            {
                title: "Aromatic Classics",
                type: "sub",
                megaMenu: true,
                children: [
                    {
                        title: "",
                        type: "sub",
                        children: [
                            {
                                path: "Not You Feeling CAUTEE",
                                title: "Not You Feeling CAUTEE",
                                img: "/images/All candles/molds/Aromatic YOU/Not You Feeling CAUTEE/1.jpg",
                                type: "link"
                            }
                        ]
                    },
                    {
                        title: "",
                        type: "sub",
                        children: [
                            {
                                path: "4 the Love of ME",
                                title: "4 the Love of ME",
                                img: "/images/All candles/molds/Aromatic YOU/4 the Love of ME…thats all/1.jpg",
                                type: "link"
                            }
                        ]
                    },
                    {
                        title: "",
                        type: "sub",
                        children: [
                            {
                                path: "Empowered & Endowed",
                                title: "Empowered & Endowed",
                                img: "/images/All candles/molds/Aromatic YOU/No Stress Zone!/1.jpg",
                                type: "link"
                            }
                        ]
                    },
                    {
                        title: "",
                        type: "sub",
                        children: [
                            {
                                path: "You’re Extraordinary",
                                title: "You’re Extraordinary",
                                img: "/images/All candles/molds/Aromatic YOU/You’re Extraordinary/1.jpg",
                                type: "link"
                            }
                        ]
                    },
                    {
                        title: "",
                        type: "sub",
                        children: [
                            {
                                path: "Today, Choose Happiness",
                                title: "Today, Choose Happiness",
                                img: "/images/All candles/molds/Aromatic YOU/Today, Choose Happiness/1.jpg",
                                type: "link"
                            }
                        ]
                    },
                    {
                        title: "",
                        type: "sub",
                        children: [
                            {
                                path: "Devoted to Peace",
                                title: "Devoted to Peace",
                                img: "/images/All candles/molds/Aromatic YOU/4 the Love of ME…thats all/1.jpg",
                                type: "link"
                            }
                        ]
                    },
                    {
                        title: "",
                        type: "sub",
                        children: [
                            {
                                path: "No Stress Zone",
                                title: "No Stress Zone",
                                img: "/images/All candles/molds/Aromatic YOU/No Stress Zone!/1.jpg",
                                type: "link"
                            }
                        ]
                    }
                ]
            },
            {
                title: "Aromatic Sets",
                type: "sub",
                megaMenu: true,
                children: [
                    {
                        title: "",
                        type: "sub",
                        children: [
                            {
                                path: "Bubble Yum",
                                title: "Bubble Yum",
                                img: "/images/All candles/molds/Aromatic Molds/Bubble Yum/Coolheaded/1.jpg",
                                type: "link"
                            }
                        ]
                    },
                    {
                        title: "",
                        type: "sub",
                        children: [
                            {
                                path: "NU-NU’s",
                                title: "NU-NU’s",
                                img: "/images/All candles/molds/Aromatic Molds/NU-NU’S/Coolheaded/1.jpg",
                                type: "link"
                            }
                        ]
                    },
                    {
                        title: "",
                        type: "sub",
                        children: [
                            {
                                path: "Peachy VUE",
                                title: "Peachy VUE",
                                img: "/images/All candles/molds/Aromatic Molds/Peachy VUE/Coolheaded/1.jpg",
                                type: "link"
                            }
                        ]
                    },
                    {
                        title: "",
                        type: "sub",
                        children: [
                            {
                                path: "TLé Shells",
                                title: "TLé Shells",
                                img: "/images/All candles/molds/Aromatic Molds/TLé Shells/Coolheaded/1.jpg",
                                type: "link"
                            }
                        ]
                    }
                ]
            },
            {
                title: "Aromatic Accessories",
                type: "sub",
                megaMenu: true,
                children: [
                    {
                        title: "",
                        type: "sub",
                        children: [
                            {
                                path: "Fall",
                                title: "Fall",
                                img: "https://yankeecandle.scene7.com/is/image/YankeeCandle/PLP_Images_Fall?fmt=jpeg",
                                type: "link"
                            }
                        ]
                    },
                    {
                        title: "",
                        type: "sub",
                        children: [
                            {
                                path: "Spring",
                                title: "Spring",
                                img: "https://yankeecandle.scene7.com/is/image/YankeeCandle/PLP_Images_Winter?fmt=jpeg",
                                type: "link"
                            }
                        ]
                    },
                    {
                        title: "",
                        type: "sub",
                        children: [
                            {
                                path: "Summer",
                                title: "Summer",
                                img: "https://yankeecandle.scene7.com/is/image/YankeeCandle/PLP_Images_Spring?fmt=jpeg",
                                type: "link"
                            }
                        ]
                    },
                    {
                        title: "",
                        type: "sub",
                        children: [
                            {
                                path: "Winter",
                                title: "Winter",
                                img: "https://yankeecandle.scene7.com/is/image/YankeeCandle/PLP_Images_Summer?fmt=jpeg",
                                type: "link"
                            }
                        ]
                    }
                ]
            },
            {
                title: "New Releases",
                type: "sub",
                megaMenu: true,
                children: [
                    {
                        title: "",
                        type: "sub",
                        children: [
                            {
                                path: "Coolheaded",
                                title: "Coolheaded",
                                img: "/images/All candles/molds/VUE Aromatics/Coolheaded/1.jpg",
                                type: "link"
                            }
                        ]
                    },
                    {
                        title: "",
                        type: "sub",
                        children: [
                            {
                                path: "Ease",
                                title: "Ease",
                                img: "/images/All candles/molds/VUE Aromatics/Ease/1.jpg",
                                type: "link"
                            }
                        ]
                    },
                    {
                        title: "",
                        type: "sub",
                        children: [
                            {
                                path: "Exhale",
                                title: "Exhale",
                                img: "/images/All candles/molds/VUE Aromatics/Exhale/1.jpg",
                                type: "link"
                            }
                        ]
                    },
                    {
                        title: "",
                        type: "sub",
                        children: [
                            {
                                path: "Poised",
                                title: "Poised",
                                img: "/images/All candles/molds/VUE Aromatics/Poised/1.jpg",
                                type: "link"
                            }
                        ]
                    },
                    {
                        title: "",
                        type: "sub",
                        children: [
                            {
                                path: "Serenity",
                                title: "Serenity",
                                img: "/images/All candles/molds/VUE Aromatics/Serenity/1.jpg",
                                type: "link"
                            }
                        ]
                    },
                    {
                        title: "",
                        type: "sub",
                        children: [
                            {
                                path: "Suave",
                                title: "Suave",
                                img: "/images/All candles/molds/VUE Aromatics/Suave/1.jpg",
                                type: "link"
                            }
                        ]
                    },
                    {
                        title: "",
                        type: "sub",
                        children: [
                            {
                                path: "Unruffled",
                                title: "Unruffled",
                                img: "/images/All candles/molds/VUE Aromatics/Unruffled/1.jpg",
                                type: "link"
                            }
                        ]
                    }
                ]
            }
        ];
        const steadingMenuData = [
            {
                title: "Goat",
                type: "sub",
                children: [
                    {
                        path: "Female Goat",
                        title: "Female Goat",
                        type: "link"
                    },
                    {
                        path: "Male Goat",
                        title: "Male Goat",
                        type: "link"
                    }
                ]
            },
            {
                title: "Ram",
                type: "sub",
                children: [
                    {
                        path: "Female Ram",
                        title: "Female Ram",
                        type: "link"
                    },
                    {
                        path: "Male Ram",
                        title: "Male Ram",
                        type: "link"
                    }
                ]
            },
            {
                title: "Chicken",
                type: "sub",
                children: [
                    {
                        path: "Agric Chickens",
                        title: "Agric Chickens",
                        type: "link"
                    },
                    {
                        path: "Chicken Old layers",
                        title: "Chicken Old layers",
                        type: "link"
                    }
                ]
            },
            {
                title: "Rooster",
                type: "sub",
                children: [
                    {
                        path: "Female Rooster",
                        title: "Female Rooster",
                        type: "link"
                    },
                    {
                        path: "Male Rooster",
                        title: "Male Rooster",
                        type: "link"
                    }
                ]
            },
            {
                title: "Snail",
                type: "sub",
                children: [
                    {
                        path: "Female Snail",
                        title: "Female Snail",
                        type: "link"
                    },
                    {
                        path: "Male Snail",
                        title: "Male Snail",
                        type: "link"
                    }
                ]
            },
            {
                title: "Catfish",
                type: "sub",
                children: [
                    {
                        path: "white Catfish",
                        title: "white Catfish",
                        type: "link"
                    },
                    {
                        path: "Black Catfish",
                        title: "Black Catfish",
                        type: "link"
                    }
                ]
            }
        ];
        yield saveMenuData(deluxMenuData, 'deluxe');
        yield saveMenuData(aromaticMenuData, 'aromatic');
        yield saveMenuData(steadingMenuData, 'steading');
    }
    catch (error) {
        console.error('Error during seeding:', error);
    }
});
