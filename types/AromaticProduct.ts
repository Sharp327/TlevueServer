interface ImageType {
  image_id: Number;
  id: Number;
  alt: string;
  src: string;
}

type AromaticProduct = {
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
  images: ImageType[];
  createdAt: Date;
  total: number;
  rate: number;
  candleType: string;
  scent: Array<String>;
  color: Array<String>;
  categorylist: string[];
}

export type { ImageType, AromaticProduct };