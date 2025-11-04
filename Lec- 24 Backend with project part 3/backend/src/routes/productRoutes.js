import { Router } from 'express'
import { listProducts, getProduct, createProduct, updateProduct, deleteProduct } from '../controllers/productController.js'
import { authRequired, adminOnly } from '../middleware/auth.js'

const router = Router()
router.get('/', listProducts)
router.get('/:id', getProduct)
router.post('/', authRequired, adminOnly, createProduct)
router.put('/:id', authRequired, adminOnly, updateProduct)
router.delete('/:id', authRequired, adminOnly, deleteProduct)
export default router


