import { Router } from 'express'
import auth from '../auth/auth'

import { ProfileController } from '../controllers/ProfileController'
import { ProfileService } from '../services/ProfileService'

const profileService = new ProfileService()
const profileController = new ProfileController(profileService)
const router = Router()

router
  .get('/profile', auth,
    (req, res) => profileController.getProfile(req, res))

export { router as profileRouter }
