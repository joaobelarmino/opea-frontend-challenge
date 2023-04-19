import React from 'react';

import styles from './styles.module.scss';

function ClientCard({
  onClick, img, children, type,
}) {
  // if (type) {
  //   return (
  //     <button
  //       type="button"
  //       onClick={() => handleTypeModal({ type: 'add' })}
  //       className={`${styles['add-card']} ${styles['client-card']}`}
  //     >
  //       <figure>
  //         <img src={clipboardDisabledIcon} alt="Ícone de prancheta" />
  //       </figure>
  //       <span>Adicionar empresa</span>
  //     </button>
  //   );
  // }

  return (

    <button
      type="button"
      className={`${type === 'add' ? styles['add-card'] : ''} ${styles['client-card']}`}
      onClick={onClick}
    >
      <figure>
        <img src={img} alt="Ícone de prancheta" />
      </figure>
      <div className={styles['client-card__info']}>
        {children}
      </div>
    </button>
  );
}

export default ClientCard;
