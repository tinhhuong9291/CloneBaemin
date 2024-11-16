'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import useAddressStore from '@/hooks/useAdressStore';
import usePromotionStore from '@/hooks/usePromotionStore';
import usePartnerStore from '@/hooks/usePartnerStore';
import { useEffect } from 'react';

const formSchema = z.object({
  address_id: z.number({
    message: 'Please select an address',
  }),
  serviceFee: z.number({
    message: 'Please select an partner',
  }),
  message: z.string().optional(),
  discount: z.number().optional(),
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function OrderForm(dataFromCart: any) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const { addresses, fetchAddresses } = useAddressStore();
  const { promotions, fetchPromotions } = usePromotionStore();
  const { partners, fetchPartners } = usePartnerStore();

  useEffect(() => {
    fetchAddresses();
    fetchPromotions();
    fetchPartners();
  }, [fetchAddresses, fetchPromotions, fetchPartners]);

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { totalPrice, orderFoods } = dataFromCart;
      const discount = values.discount ?? 1;
      const totalDiscount = 999 * discount;
      const serviceFee = values.serviceFee;
      const shippingPrice: number = 2; // $

      const totalPay = totalPrice - totalDiscount + serviceFee + shippingPrice;
      const body = {
        addressId: values.address_id,
        storeId: 1,
        voucherId: null,
        methodId: null,
        message: values.message,
        totalPrice: totalPay,
        totalDiscount: 999,
        serviceFee: 12,
        shippingPrice: 326,
        orderFoods,
      };

      console.log('Body sent to API:', body); // Log dữ liệu gửi đi

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderData: body }),
      });

      const result = await response.json();
      console.log('Server Response: ', result);

      if (!response.ok) {
        throw new Error(result.error || 'Failed to create order');
      }
    } catch (error) {
      console.error('Error submitting order:', error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="address_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <Select onValueChange={(value) => field.onChange(Number(value))}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an address" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {addresses.map((address) => (
                    <SelectItem
                      key={address.address_id}
                      value={address.address_id.toString()}
                    >
                      {`${address.address_line1}, ${address.address_line2}, ${address.city}`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="discount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Discount</FormLabel>
              <Select onValueChange={(value) => field.onChange(Number(value))}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a Discount" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {promotions.map((pro) => (
                    <SelectItem
                      key={pro.promotion_id}
                      value={pro.discount.toString()}
                    >
                      {`Discount ${pro.discount > 1 ? pro.discount : pro.discount * 100}%`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="serviceFee"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Partner</FormLabel>
              <Select onValueChange={(value) => field.onChange(Number(value))}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a Partner" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {partners.map((par) => (
                    <SelectItem
                      key={par.partner_id}
                      value={par.service_fee.toString()}
                    >
                      {`${par.partner_name}: $${par.service_fee}`}
                    </SelectItem>
                  ))}
                  <SelectItem value="2">SuperSpeed - $2</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Input placeholder="Message" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
}
