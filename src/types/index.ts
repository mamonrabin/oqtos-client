export type TLogo = {
  _id: string;
  headerLogo: string;
  footerLogo: string;
  description: string;
  address: string;
  phone: string;
  whatsapp: string;
  email: string;
  status: string;
};

export type TCategory = {
  _id: string;
  categoryName: string;
  title: string;
  image: string;
  status: string;
  slug: string;
  length: number;
};
export type TSubCategory = {
  _id: string;
  subcategoryName: string;
  image: string;
  category: TCategory;
  status: string;
  slug: string;
  length: number;
};
export type TBrand = {
  _id: string;
  title: string;
  image: string;
  status: string;
  slug: string;
};
export type TBlog = {
  _id: string;
  title: string;
  cardDescription: string;
  content: string;
  image: string;
  images: string[];
  status: string;
  slug: string;
  updatedAt: string;
  createdAt: string;
  tags: string[];
};

export type TBanner = {
  _id: string;
  image: string;
  type: string;
  status: string;
};
export type THomeControl = {
  _id: string;
  landing: string;
  order: string;
  status: string;
  subTitle?: string;
  title?: string;
};

export type TInventory = {
  _id: string;
  color?: string;
  colorName?: string;
  size?: string;
  quantity: number;
};

export type TSpecification = {
  key: string;
  value: string;
};
export type TProduct = {
  _id: string;
  title: string;
  slug: string;
  quantity?: number;
  mrpPrice: number;
  price: number;
  discount?: number;
  discountType?: string;
  soldQuantity?: number;
  description: string;
  category: TCategory;
  subCategory?: TSubCategory;
  brand?: TBrand;
  thumbnailImage: string;
  backviewImage?: string;
  images: string[];
  freeShipping?: boolean;
  sku?: string;
  barcode?: string;
  stock_status?: string;
  status: string;
  inventoryType?: string;
  inventories?: TInventory[];
  video_url?: string;
  label?: string;
  tags?: string[];
  specifications?: TSpecification[];
  averageRating?: number;
  totalReviews?: number;
  metaTitle?: string;
  metaDescription?: string;
  warranty?: string;
  availableQuantity?: number;
};

export type TCartProduct = {
  _id: string;
  product: TProduct;
  price: number;
  image: string;
  name: string;
  slug: string;
};

export type TCartItem = {
  product: TCartProduct;
  quantity: number;
  price: number;
  color?: string;
  size?: string;
};

export type TCoupon = {
  _id: string;
  code: string;
  discount: number;
  discountType: string;
  useLimit: number;
  used: number;
  perUserLimit: number;
  startDate: string;
  expireDate: string;
};

export type TFlashProduct = {
  title: string;
  products: TProduct;
  image: string;
  couponId: TCoupon;
  campaigntype: string;
  couponType: string;
  status: string;
};
export type TSocilaLink = {
  _id: string;
  link: string;
  socialType: string;
  status: string;
};
