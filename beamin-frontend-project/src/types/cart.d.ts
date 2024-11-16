type Cart = {
  Food: Pick<Product, 'food_id' | 'images' | 'name' | 'price'>;
  quantity: number;
};
