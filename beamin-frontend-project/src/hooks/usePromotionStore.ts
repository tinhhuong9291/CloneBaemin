import { create } from 'zustand';
import axios from 'axios';
import envConfig from '@/config/envConfig';

interface Promotion {
  promotion_id: number;
  description: string;
  discount: number;
  start_at: Date;
  end_at: Date;
}

interface PromotionStore {
  promotions: Promotion[];
  fetchPromotions: () => Promise<void>;
}

const usePromotionStore = create<PromotionStore>((set) => ({
  promotions: [],

  fetchPromotions: async () => {
    const response = await axios.get(
      `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/promotions/all`,
    );
    set({ promotions: response.data.data });
  },
}));

export default usePromotionStore;
