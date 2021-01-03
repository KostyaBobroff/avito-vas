import { hot } from 'react-hot-loader/root';
import * as React from 'react';

import EditForm from 'components/EditForm';
import Banner from 'components/Banner';
import Controls from 'components/Controls';
import './styles/styles.scss';

import styles from './App.modules.scss';

const App: React.FC = () => {
  const bannerRef = React.useRef<HTMLDivElement>(null);

  return (
    <>
      <div className={styles.wrapper}>
        <EditForm className={styles.editorForm} />
        <Banner ref={bannerRef} />
      </div>
      <Controls bannerInstance={bannerRef} className={styles.controls} />
    </>
  );
};

export default hot(App);
