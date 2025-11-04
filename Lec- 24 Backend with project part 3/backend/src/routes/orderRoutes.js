import { Router } from 'express'
import { listOrders, placeOrder } from '../controllers/orderController.js'
import { authRequired } from '../middleware/auth.js'

const router = Router()
router.get('/', authRequired, listOrders)
router.post('/', authRequired, placeOrder)
export default router


