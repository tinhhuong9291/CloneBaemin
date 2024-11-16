import ProductCard from '@/components/Card/ProductCard';
import { cn } from '@/libs/utils';

type ProductListProps = {
  data: Product[];
  classname?: string;
};

export default function ProductList({ data, classname }: ProductListProps) {
  return (
    <div className={cn('grid grid-cols-3 gap-x-8 gap-y-16', classname)}>
      {data.map((product) => (
        <ProductCard key={product.food_id} data={product} />
      ))}
    </div>
  );
}
