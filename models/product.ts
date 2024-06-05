import mongoose, { Schema, Model } from 'mongoose'
import { Product } from '../types/Product';

const productSchema: Schema<Product> = new Schema({
  title: {
    type: String,
    required: [true, 'Please enter your title'],
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
    type: String,
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
  qty: {
    type: Number,
    default: 0,
  },
  total: {
    type: Number,
    default: 0,
  },
  rate: {
    type: Number,
    default: 0,
  },
  laceType: Array<String>,
  selectedLaceType: {
    type: String,
  },
  laceSize: Array<String>,
  destiny: Array<String>,
  selectedDestiny: {
    type: String,
  },
  length: Array<String>,
  selectedLength: {
    type: String,
  },
  color: {
    type: String,
    default: 'Natural Color',
  },
  availableTextures: Array<String>,
  texture: {
    type: String,
    default: 'HD Lace',
  },
  closureLength: Array<String>,
  selectedClosureLength: {
    type: String,
    default: '14',
  },
  frontalLength: Array<String>,
  selectedFrontalLength: {
    type: String,
    default: '14',
  },
  capSize: Array<String>,
  selectedCapSize: {
    type: String,
    default: '14',
  },
  hairType: {
    type: String,
    default: '100% Virgin Human Hair',
  },
  categorylist: Array<String>,
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const Product: Model<Product> =
  mongoose.models.Product || mongoose.model<Product>('Product', productSchema)
export default Product
