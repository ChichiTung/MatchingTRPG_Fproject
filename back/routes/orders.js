import { Router } from 'express'
import content from '../middleware/content.js'
import upload from '../middleware/upload.js'
import { jwt } from '../middleware/auth.js'
import admin from '../middleware/admin.js'
import { createOrder, getMyOrders, getAllOrders } from '../controllers/orders.js'

const router = Router()

router.post('/', content('application/json'), jwt, createOrder, upload)
router.get('/', jwt, getMyOrders)
router.get('/all', jwt, admin, getAllOrders)

export default router
