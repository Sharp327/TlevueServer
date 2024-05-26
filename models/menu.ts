import mongoose, { Schema, Model } from 'mongoose'
import { IChild, IMenu } from '../types/Menu'; // Update with your path

// Schema for nested children
const ChildSchema = new Schema<IChild>({
  title: { type: String, required: true },
  type: { type: String, required: true },
  path: { type: String, default: '' },
  megaMenu: { type: Boolean, default: false },
  children: [{ type: Schema.Types.ObjectId, ref: 'Child' }], // Reference the same model for recursion
});

// Main menu schema
const MenuSchema = new Schema<IMenu>({
  title: { type: String, required: true },
  type: { type: String, required: true },
  megaMenu: { type: Boolean, default: false },
  children: [{ type: Schema.Types.ObjectId, ref: 'Child' }], // Reference the Child schema
});

// Create models
const Child = mongoose.model<IChild>('Child', ChildSchema);
const Menu = mongoose.model<IMenu>('Menu', MenuSchema);

export { Child, Menu };
