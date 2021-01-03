import { MobXProviderContext } from 'mobx-react';
import * as React from 'react';

import RootStore from 'store/RootStore';
import { BannerStore } from 'store/bannerStore';

export const useRootStore = (): RootStore => {
  return React.useContext(MobXProviderContext).rootStore;
};

export const useBannerStore = (): BannerStore => {
  return useRootStore().bannerStore;
};
