"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileRouter = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../auth/auth"));
const ProfileController_1 = require("../controllers/ProfileController");
const ProfileService_1 = require("../services/ProfileService");
const profileService = new ProfileService_1.ProfileService();
const profileController = new ProfileController_1.ProfileController(profileService);
const router = (0, express_1.Router)();
exports.profileRouter = router;
router
    .get('/profile', auth_1.default, (req, res) => profileController.getProfile(req, res));
