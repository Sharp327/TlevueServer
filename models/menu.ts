import mongoose, { Schema, Model } from 'mongoose'
import { IMenu } from '../types/Menu';

const menuItemSchema = new Schema({
  path: { type: String, required: false },
  title: { type: String },
  type: { type: String, required: true },
  children: [this]
});

const menuSchema: Schema<IMenu> = new Schema({
  title: { type: String, required: true },
  type: { type: String, required: true },
  megaMenu: { type: Boolean },
  children: [menuItemSchema],
  pagetype: { type: String, required: true }
});

const Menu: Model<IMenu> =
  mongoose.models.Menu || mongoose.model<IMenu>('Menu', menuSchema)
export default Menu
