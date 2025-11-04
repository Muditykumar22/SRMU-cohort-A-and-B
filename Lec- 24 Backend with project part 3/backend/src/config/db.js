import mongoose from 'mongoose'

export async function connectDB(uri) {
  const mongoUri = uri || process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/shoplite'
  mongoose.set('strictQuery', true)
  await mongoose.connect(mongoUri, { dbName: process.env.MONGO_DB || 'shoplite' })
  console.log('MongoDB connected')
}


