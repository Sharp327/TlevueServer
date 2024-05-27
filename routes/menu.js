"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const MenuController_1 = require("../controllers/MenuController");
const router = (0, express_1.Router)();
router.get('/getMenu', MenuController_1.getMenuController);
exports.default = router;
