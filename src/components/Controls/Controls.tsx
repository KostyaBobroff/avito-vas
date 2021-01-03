import * as React from 'react';
import { Button } from 'antd';
import { observer } from 'mobx-react';
import copy from 'copy-to-clipboard';
import cogoToast from 'cogo-toast';
import { exportComponentAsPNG } from 'react-component-export-image';
import cn from 'classnames';

import { useBannerStore } from 'store/context';

import styles from './Controls.modules.scss';

interface Props {
  bannerInstance: React.RefObject<HTMLDivElement>;
  className?: string;
}

const Controls: React.FC<Props> = ({ bannerInstance, className }: Props) => {
  const bannerStore = useBannerStore();

  const handleJSONOnClick = React.useCallback(() => {
    if (copy(bannerStore.toJSON())) {
      cogoToast.success('JSON is copied');
      return;
    }

    cogoToast.error('Sorry, you caught error then copied the JSON');
  }, []);

  const handlePNGOnClick = React.useCallback(async () => {
    if (bannerInstance.current) {
      await exportComponentAsPNG(bannerInstance);
      cogoToast.success('PNG is exported');
    }
  }, [bannerInstance.current]);

  const handleHTMLOnClick = React.useCallback(() => {
    if (bannerInstance.current) {
      if (copy(bannerInstance.current.outerHTML)) {
        cogoToast.success('HTML is copied');
        return;
      }
      cogoToast.error('Sorry, you caught error then copied the HTML');
    }
  }, [bannerInstance.current]);

  return (
    <div className={cn(styles.controls, className)}>
      <Button onClick={handleJSONOnClick}>JSON</Button>
      <Button onClick={handleHTMLOnClick}>HTML</Button>
      <Button onClick={handlePNGOnClick}>PNG</Button>
    </div>
  );
};

export default observer(Controls);
