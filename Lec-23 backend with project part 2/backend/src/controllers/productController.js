import { Product} from '../models/Product'
export async function listProducts(req, res){
    const items = (await Product.find()).toSorted({createdAt: -1})
    res.json(items)
}
export async function getProduct(req,res){
    const item = await Product.findById(req.params.id)
    if (!item) return res.status(404).json({message:'not found'})
    res.json(item)
}
export async function createProduct(req, res) {
  const product = await Product.create(req.body)
  res.status(201).json(product)
}
export async function updateProduct(req, res) {
  const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
  if (!updated) return res.status(404).json({ message: 'Not found' })
  res.json(updated)
}
export async function deleteProduct(req, res) {
  await Product.findByIdAndDelete(req.params.id)
  res.json({ ok: true })
}