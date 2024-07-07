interface VariantType {
  variant_id: Number;
  id: Number;
  sku: string;
  size?: string;
  color?: string;
  image_id: Number;
}

interface ImageType {
  image_id: Number;
  id: Number;
  alt: string;
  src: string;
}

type DeluxeProduct = {
  id: number;
  title: string;
  description: string;
  type: string;
  brand: string;
  category: string;
  price: string | number;
  new: boolean;
  sale: boolean;
  discount: string | number;
  stock: string | number;
  variants: VariantType[];
  images: ImageType[];
  createdAt: Date;
  qty: number;
  total: number;
  rate: number;
  laceType: Array<String>;
  selectedLaceType: string;
  laceSize: String;
  destiny: Array<String>;
  selectedDestiny: string;
  length?: { value: string; price: string }[];
  selectedLength: string;
  color: string;
  availableTextures: Array<String>;
  texture: string;
  closureLength?: { value: string; price: string }[];
  selectedClosureLength: string;
  frontalLength?: { value: string; price: string }[];
  selectedFrontalLength: string;
  capSize?: { value: string; price: string }[];
  selectedCapSize?: string;
  hairType: string;
  categorylist: string[];
}

export type { ImageType, DeluxeProduct };
