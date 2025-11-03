import { Order } from '../models/Order.js'
import { Product } from '../models/Product.js'

export async function listOrders(req, res) {
  const filter = req.user.role === 'admin' ? {} : { user: req.user.id }
  const orders = await Order.find(filter).sort({ createdAt: -1 })
  res.json(orders)
}

export async function placeOrder(req, res) {
  const { items = [], shipping } = req.body
  if (!items.length) return res.status(400).json({ message: 'No items' })
  // Calculate total from DB prices for safety
  const ids = items.map((i) => i.product)
  const products = await Product.find({ _id: { $in: ids } })
  let total = 0
  const normalized = items.map((i) => {
    const p = products.find((pp) => pp._id.toString() === i.product)
    const price = p ? p.price : 0
    total += price * i.qty
    return { product: i.product, qty: i.qty, price }
  })
  const order = await Order.create({ user: req.user.id, items: normalized, total, shipping })
  res.status(201).json(order)
}


