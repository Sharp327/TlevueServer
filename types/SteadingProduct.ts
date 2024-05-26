interface ImageType {
  image_id: Number;
  id: Number;
  alt: string;
  src: string;
}

type SteadingProduct = {
  id: number;
  title: string;
  description: string;
  type: string;
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
  categorylist: string[];
}

export type { ImageType, SteadingProduct };
