# ShopLite Backend (Simple)

Start MongoDB locally and create a `.env` file with:

```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/shoplite
JWT_SECRET=devsecret
```

Scripts:
- `npm run dev` — start dev server with nodemon
- `npm run start` — start server
- `npm run seed` — seed sample products

API Endpoints
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/products`
- `GET /api/products/:id`
- `POST /api/products` (admin)
- `PUT /api/products/:id` (admin)
- `DELETE /api/products/:id` (admin)
- `GET /api/orders` (auth)
- `POST /api/orders` (auth)
