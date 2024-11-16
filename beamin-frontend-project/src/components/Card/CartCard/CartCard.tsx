import Image from 'next/image';
import { Trash2 } from 'lucide-react';

const CartCard = ({ Food, quantity }: Cart) => {
  return (
    <>
      <tr className="border-b-2 bg-white">
        <td className="p-4">
          <Image
            src={Food.images[0].image_url}
            alt={Food.name}
            width={100}
            height={100}
            className="border-1 max-h-full w-16 max-w-full rounded-lg border-solid border-gray-700 md:w-32"
          />
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
          {Food.name}
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
          ${Food.price}
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
          {quantity}
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
          ${quantity * Number(Food.price)}
        </td>

        {/* Action */}
        <td className="px-6 py-4">
          <button className="rounded-full border-none bg-transparent p-2 text-red-600 outline-none duration-300 hover:bg-slate-200">
            <Trash2 size={24} />
          </button>
        </td>
      </tr>
    </>
  );
};

export default CartCard;
