import mongoose from 'mongoose'
const orderItemSchema = new mongoose.Schema(
    {
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true},
        qty: { type: Number, required: true },
        price: { type: Number, required: true },
    },
    {_id: false}
)
const orderSchema =  new mongoose.Schema(
    {
        user: { type : mongoose.Schema.Types.ObjectId, ref:'User', required: true},  
        items: [orderItemSchema],
        total: { type: Number, required: true },
        shipping: {
      name: String,
      address: String,
      phone: String,
    },
    status: { type: String, default: 'placed' }, 
    },
    {timestamps: true}
)
export const Order = mongoose.model('Order', orderSchema)
