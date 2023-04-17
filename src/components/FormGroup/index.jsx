import React from 'react';

import styles from './styles.module.scss';

function FormGroup({ children }) {
  return (
    <div className={styles['form-group']}>
      <div className={styles['form-group__input']}>
        {children}
      </div>
    </div>
  );
}

export default FormGroup;
