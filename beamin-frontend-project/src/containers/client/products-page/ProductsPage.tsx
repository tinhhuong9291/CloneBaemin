import CategorySidebar from '@/components/Sidebar/CategorySidebar';
import ProductList from '@/components/List/ProductList';
import axios from 'axios';
import envConfig from '@/config/envConfig';
import CustomPagination from '@/components/Pagination/Pagination';

type ProductPageProps = {
  searchParams: { [key: string]: string | undefined };
};

const ProductsPage = async ({ searchParams }: ProductPageProps) => {
  const page = searchParams['page']?.toString() ?? '1'; // Trang thứ bao nhiêu, mặc định là 1
  const limit = searchParams['limit']?.toString() ?? '6'; // Số sản phẩm hiển thị trên 1 trang
  const sortField = searchParams['sortField']?.toString() ?? 'create_at'; //Sắp xếp theo thuộc tính, vd: sắp xếp theo 'id'
  const sortOrder = searchParams['sortOrder']?.toString() ?? 'asc'; // Sắp xếp tăng dần | giảm dần
  let products: Product[] = [];
  let totalPage;

  try {
    const res = await axios.get(
      `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/foods?sortOrder=${sortOrder}&sortField=${sortField}&limit=${limit}&page=${page}`,
    );
    const payload = res.data.data;
    products = payload.items;
    totalPage = payload.total_page;
  } catch (error) {
    console.error(error);
  }

  let menuList = [];
  try {
    const res = await axios.get(
      `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/menu/all`,
    );
    menuList = res.data.data;
  } catch (error) {
    console.log(error);
  }

  return (
    <section>
      <div className="mx-auto flex w-[1200px] flex-row justify-between gap-8">
        <div className="py-4 md:mt-10 md:basis-1/3">
          <CategorySidebar menuList={menuList} />
        </div>
        <div className="py-4 md:basis-2/3">
          <ProductList data={products} />
        </div>
      </div>
      <CustomPagination
        totalPage={totalPage}
        limit={limit}
        sortField={sortField}
        sortOrder={sortOrder}
      />
    </section>
  );
};

export default ProductsPage;
