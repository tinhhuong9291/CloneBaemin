import { cartActions } from '@/actions/cart.action';
import CartList from '@/components/List/CartList';
import { cookies } from 'next/headers';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import OrderForm from '@/components/Form/OrderForm';

export default async function CartPage() {
  let carts: Cart[] = [];
  try {
    const cookieStore = cookies();
    const access_token = cookieStore.get('access_token');
    const { payload } = await cartActions.getAll(access_token?.value ?? '');
    carts = payload.data;
  } catch (error) {
    console.log(error);
  }
  const totalPrice = carts.reduce((acc, item) => {
    const itemTotal = item.quantity * parseFloat(item.Food.price);
    return acc + itemTotal;
  }, 0);
  const promotion = 0;
  const pay = totalPrice - promotion;
  const orderFoods = carts.map((c) => ({
    foodId: c.Food.food_id,
    quantity: c.quantity,
    priceAtTimeOfOrder: c.Food.price,
    discountAtOrder: null,
  }));
  const dataFromCart = {
    totalPrice,
    orderFoods,
  };

  return (
    <>
      <section className="mx-auto md:w-[1200px]">
        <h2 className="mt-5">🛒 Your Cart</h2>
        <div className="flex items-start justify-between gap-9">
          <div className="py-4 md:basis-3/4">
            <CartList data={carts} />
          </div>
          <div className="mt-4 overflow-hidden rounded-md pb-4 shadow-lg md:basis-1/4">
            <h5 className="bg-gray-200 px-4 py-[7px]">Orders</h5>
            <div className="space-y-4 p-6">
              <div className="flex justify-between">
                <span>Quantity of products:</span>
                <span className="font-bold">
                  {carts.length.toString().padStart(2, '0')}
                </span>
              </div>
              <div className="flex justify-between">
                <span>SubTotal:</span>
                <span className="font-bold">${totalPrice}</span>
              </div>
              <div className="flex justify-between">
                <span>Promotion:</span>
                <span className="font-bold">{promotion}</span>
              </div>
              <div className="mt-5 flex justify-between border-t py-4">
                <span className="text italic">Total:</span>
                <span className="text-xl font-bold text-red-600">${pay}</span>
              </div>

              <div>
                <Dialog>
                  <DialogTrigger className="block w-full rounded-xl border-none bg-primary px-12 py-3 text-center font-bold text-primary-foreground">
                    Orders now
                  </DialogTrigger>
                  <DialogContent className="!w-[1000px]">
                    <DialogHeader>
                      <DialogTitle>Order Confirmation</DialogTitle>
                    </DialogHeader>
                    <OrderForm dataFromCart={dataFromCart} />
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
