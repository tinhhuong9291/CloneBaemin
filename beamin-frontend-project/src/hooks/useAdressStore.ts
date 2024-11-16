import { create } from 'zustand';
import axios from 'axios';
import envConfig from '@/config/envConfig';

interface Address {
  address_id: number | string;
  address_line1: string;
  address_line2: string;
  city: string;
  postal_code: string;
  address_type: string;
  is_removed: boolean;
}

interface AddressStore {
  addresses: Address[];
  fetchAddresses: () => Promise<void>;
}

const useAddressStore = create<AddressStore>((set) => ({
  addresses: [],

  fetchAddresses: async () => {
    const response = await axios.get(
      `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/addresses`,
    );
    set({ addresses: response.data.data });
  },
}));

export default useAddressStore;
