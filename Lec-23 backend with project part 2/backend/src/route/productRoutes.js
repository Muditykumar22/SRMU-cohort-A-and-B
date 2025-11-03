import {Router} from 'express'
import { listProducts, getProduct, createProduct, updateProduct, deleteProduct} from '../controllers/productController'
import { authRequired, adminOnly } from '../middleware/auth'
import { get } from 'mongoose'
const router= Router()
router.get('/', listProducts)
router.get('/:id', getProduct)
router.post('/', authRequired, adminOnly, createProduct)
router.put('/:id', authRequired, adminOnly, updateProduct)
router.delete('/:id', authRequired, adminOnly, deleteProduct)
export default router