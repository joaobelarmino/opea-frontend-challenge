import React from 'react';

import styles from './styles.module.scss';

function ErrorContainer({ img, alt, text }) {
  return (
    <div className={styles['error-container']}>
      <img src={img} alt={alt} />
      <p>{text}</p>
    </div>
  );
}

export default ErrorContainer;
