import mongoose, { Schema, Model } from 'mongoose';
import { DeluxeProduct } from '../types/DeluxeProduct';

const deluxeProductSchema: Schema<DeluxeProduct> = new Schema({
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
    default: '0',
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
  images: [
    {
      image_id: Number,
      id: Number,
      alt: String,
      src: String,
    },
  ],
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
  laceType: [String],
  selectedLaceType: {
    type: String,
  },
  laceSize: [String],
  destiny: [String],
  selectedDestiny: {
    type: String,
  },
  color: {
    type: String,
    default: 'Natural Color',
  },
  availableTextures: [String],
  texture: {
    type: String,
    default: 'HD Lace',
  },
  length: [
    {
      value: String,
      price: String,
    },
  ],
  selectedLength: {
    type: String,
    default: '',
  },
  closureLength: [
    {
      value: String,
      price: String,
    },
  ],
  selectedClosureLength: {
    type: String,
    default: '',
  },
  frontalLength: [
    {
      value: String,
      price: String,
    },
  ],
  selectedFrontalLength: {
    type: String,
    default: '',
  },
  capSize: [
    {
      value: String,
      price: String,
    },
  ],
  selectedCapSize: {
    type: String,
    default: '',
  },
  hairType: {
    type: String,
    default: '100% Virgin Human Hair',
  },
  categorylist: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const DeluxeProduct: Model<DeluxeProduct> =
  mongoose.models.DeluxeProduct || mongoose.model<DeluxeProduct>('DeluxeProduct', deluxeProductSchema);

export default DeluxeProduct;
