import { Router} from 'express'
import { listOrders, placeOder, placeOrder} from '../controllers/orderController'
import { authRequired} from '../middleware/auth'
const router = Router()
router.get('/', authRequired,listOrders)
router.get('/', authRequired, placeOrder)
export default router
