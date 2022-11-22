import { Router } from 'express'
import { ProfileController } from '../controllers/ProfileController'
import { ProfileService } from '../services/ProfileService'

const profileService = new ProfileService()
const profileController = new ProfileController(profileService)
const router = Router()

router
  .get('/profile/:id',
    (req, res) => profileController.getProfile(req, res))

export { router as profileRouter }
