import { Router } from 'express'
import content from '../middleware/content.js'
// import admin from '../middleware/admin'
import upload from '../middleware/upload.js'
import { jwt } from '../middleware/auth.js'
import { createModule, getAllModules, getLivingModules, getModule } from '../controllers/modules.js'

const router = Router()

router.post('/', content('multipart/form-data'), jwt, upload, createModule)
router.get('/', getLivingModules)
router.get('/all', jwt, getAllModules)
router.get('/:id', getModule)
router.patch('/:id', content('multipart/form-data'), jwt, upload, createModule)

export default router
