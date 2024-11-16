type Product = {
  food_id: number;
  name: string;
  slug: string;
  price: string;
  description: string;
  is_available: boolean;
  stock_quantity: number;
  Store: {
    store_id: number;
    store_name: string;
    address: string;
  };
  Promotion: {
    promotion_id: number;
    discount: number;
    description: string;
  };
  images: { image_url: string; is_primary: boolean }[];
};
