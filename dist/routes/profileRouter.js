"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileRouter = void 0;
const express_1 = require("express");
const auth_1 = require("../auth/auth");
const ProfileController_1 = require("../controllers/ProfileController");
const ProfileService_1 = require("../services/ProfileService");
const profileService = new ProfileService_1.ProfileService();
const profileController = new ProfileController_1.ProfileController(profileService);
const router = (0, express_1.Router)();
exports.profileRouter = router;
router
    .get('/profile/:id', auth_1.auth, (req, res) => profileController.getProfile(req, res));
