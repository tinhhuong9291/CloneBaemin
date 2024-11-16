import CartCard from '@/components/Card/CartCard';

type CartListProps = {
  data: Cart[];
};

export default function CartList({ data }: CartListProps) {
  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-left text-sm text-gray-500 rtl:text-right">
          <thead className="bg-gray-200 text-xs uppercase text-gray-700">
            <tr>
              <th scope="col" className="px-16 py-3">
                <span className="sr-only">Image</span>
              </th>
              <th scope="col" className="px-6 py-3">
                Product
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Qty
              </th>
              <th scope="col" className="px-6 py-3">
                Money
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((cart: Cart, index: number) => (
              <CartCard key={index} Food={cart.Food} quantity={cart.quantity} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
