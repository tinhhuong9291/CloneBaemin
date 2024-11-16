import ProductsPage from '@/containers/client/products-page';

export default function Products({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  return (
    <>
      <ProductsPage searchParams={searchParams} />
    </>
  );
}
