import mongoose, { Schema, Model } from 'mongoose'
import { AromaticProduct } from '../types/AromaticProduct';

const productSchema: Schema<AromaticProduct> = new Schema({
  title: {
    type: String,
    default: 'jars',
  },
  description: {
    type: String,
  },
  type: {
    type: String,
  },
  category: {
    type: String,
  },
  price: {
    type: Number,
    default: 0,
  },
  new: {
    type: Boolean,
    default: true,
  },
  sale: {
    type: Boolean,
    default: false,
  },
  discount: {
    type: Number,
    default: 10,
  },
  stock: {
    type: Number,
    default: 0,
  },
  images: Array<{
    image_id: Number,
    id: Number,
    alt: String,
    src: String,
  }>,
  total: {
    type: Number,
    default: 0,
  },
  rate: {
    type: Number,
    default: 0,
  },
  candleType: {
    type: String,
    default: 'candle',
  },
  color: Array<String>,
  scent: Array<String>,
  categorylist: Array<String>,
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const AromaticProduct: Model<AromaticProduct> =
  mongoose.models.AromaticProduct || mongoose.model<AromaticProduct>('AromaticProduct', productSchema)
export default AromaticProduct
