import { create } from 'zustand';
import axios from 'axios';
import envConfig from '@/config/envConfig';
import { getAccessTokenFromLocalStorage } from '@/libs/utils';

interface Partner {
  partner_id: number;
  partner_name: string;
  service_fee: string;
}

interface PartnerResponse {
  data: Partner[];
}

interface PartnerStore {
  partners: Partner[];
  fetchPartners: () => Promise<void>;
}

const usePartnerStore = create<PartnerStore>((set) => ({
  partners: [],

  fetchPartners: async () => {
    try {
      const access_token = getAccessTokenFromLocalStorage();

      if (!access_token) {
        console.warn('Access token is missing. Partners cannot be fetched.');
        return;
      }

      const response = await axios.get<PartnerResponse>(
        `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/partners/all`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        },
      );

      const fetchedPartners = response.data.data;

      // Chỉ set state nếu dữ liệu khác với state hiện tại
      set((state) =>
        state.partners.length !== fetchedPartners.length
          ? { partners: fetchedPartners }
          : state,
      );
    } catch (error) {
      console.error('Failed to fetch partners:', error);
      // Có thể thêm logic thông báo lỗi hoặc xử lý fallback tại đây
    }
  },
}));

export default usePartnerStore;
