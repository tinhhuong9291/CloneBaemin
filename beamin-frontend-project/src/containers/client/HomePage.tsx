'use client';
import { Footer, Header, TopHeader } from '@/components';
import ProductList from '@/components/List/ProductList';
import envConfig from '@/config/envConfig';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import axios from 'axios';

const HomePage = () => {
  const [inputValue, setInputValue] = useState(''); // Giá trị người dùng nhập
  const [inputSearch, setInputSearch] = useState(''); // Giá trị debounce
  const [products, setProducts] = useState<Product[]>([]);

  const fetchFoods = async (searchQuery: string) => {
    const url =
      searchQuery !== '' ? `/foods?name=${searchQuery}` : '/foods/all';
    try {
      const res = await axios.get(
        `${envConfig.NEXT_PUBLIC_API_ENDPOINT}${url}`,
      );
      let data;
      if (url === '/foods/all') {
        data = res.data.data;
      } else {
        data = res.data.data.items;
      }

      setProducts(data);
    } catch (error) {
      console.error('Lỗi khi gọi API:', error);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setInputSearch(inputValue);
    }, 3000); // Đợi 3 giây trước khi cập nhật inputSearch

    return () => clearTimeout(delayDebounce); // Xóa timeout khi inputValue thay đổi
  }, [inputValue]);

  useEffect(() => {
    fetchFoods(inputSearch);
  }, [inputSearch]);

  return (
    <>
      <TopHeader />
      <Header />

      <div className="mx-auto my-9 w-[1200px]">
        <h3>Search</h3>
        <Input
          className="mb-3 w-80"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Search foods..."
        />
        <ProductList data={products} classname="grid-cols-4" />
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
