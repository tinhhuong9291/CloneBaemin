'use client';

import { getAccessTokenFromLocalStorage } from '@/libs/utils';
import Image from 'next/image';
import Link from 'next/link';
type ProductCardProps = {
  data: Product;
};

export default function ProductCard({ data }: ProductCardProps) {
  async function addToCart() {
    try {
      const access_token = getAccessTokenFromLocalStorage();
      const response = await fetch(
        `http://localhost:8080/api/v1/carts/${data.food_id}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
          body: JSON.stringify({
            quantity: 1,
          }),
        },
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <>
      <div className="cursor-pointer text-center">
        <Link href={`/products/${data.food_id}`}>
          <div className="duration-300 hover:scale-90">
            <Image
              src={data.images[0].image_url}
              alt={data.name}
              height={250}
              width={250}
              className="w-full"
            />
          </div>
          <h3 className="mb-4 mt-2 line-clamp-2 min-h-[64px] overflow-hidden text-ellipsis duration-300 hover:text-primary">
            {data.name}
          </h3>
          <p className="line-clamp-2 overflow-hidden text-ellipsis text-sm leading-6 text-gray-600">
            {data.description}
          </p>
          <span className="block py-5 text-2xl font-bold text-secondary">
            ${data.price}
          </span>
        </Link>
        <button
          onClick={addToCart}
          type="button"
          className="rounded-full border-none bg-secondary px-12 py-3 font-bold text-primary-foreground duration-300 hover:bg-primary"
        >
          Add to cart
        </button>
        <Link
          href={`/products/${data.food_id}`}
          className="mt-4 block text-sm font-bold text-primary duration-300 hover:text-foreground"
        >
          Read more
        </Link>
      </div>
    </>
  );
}
