import { BannerStore } from 'store/bannerStore';

class RootStore {
  bannerStore = new BannerStore(this);
}

export default RootStore;
