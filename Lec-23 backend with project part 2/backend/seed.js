import 'dotenv/config'
import { connectDB } from './config/db.js'
import { Product } from './models/Product.js'

async function run() {
  await connectDB(process.env.MONGO_URI)
  await Product.deleteMany({})
  await Product.insertMany([
    { title: 'Basic T-Shirt', price: 499, image: 'https://picsum.photos/seed/t1/400/300', description: 'Cotton tee', stock: 20, category: 'Clothing' },
    { title: 'Wireless Headphones', price: 2999, image: 'https://picsum.photos/seed/hp/400/300', description: '20h battery', stock: 15, category: 'Electronics' },
    { title: 'Coffee Mug', price: 249, image: 'https://picsum.photos/seed/mug/400/300', description: '350ml', stock: 30, category: 'Home' },
  ])
  console.log('Seeded products')
  process.exit(0)
}

run().catch((e) => { console.error(e); process.exit(1) })


