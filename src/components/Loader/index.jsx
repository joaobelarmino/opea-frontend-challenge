import React from 'react';
import { createPortal } from 'react-dom';

import styles from './styles.module.scss';
import spinner from '../../assets/img/spinner-animation.svg';

function LoaderSpinner({ spinnerSize, isFullPage }) {
  return (
    <div className={`${styles['loader-overlay']} ${isFullPage ? styles['full-page'] : ''}`}>
      <img src={spinner} alt="Ícone de carregamento" width={spinnerSize} height={spinnerSize} />
    </div>
  );
}

function Loader({ isLoading, isFullPage, spinnerSize }) {
  if (!isLoading) {
    return null;
  }

  if (isFullPage) {
    return createPortal(
      <LoaderSpinner isFullPage={isFullPage} spinnerSize={spinnerSize} />,
      document.getElementById('loader-root'),
    );
  }

  return <LoaderSpinner spinnerSize={spinnerSize} />;
}

export default Loader;
