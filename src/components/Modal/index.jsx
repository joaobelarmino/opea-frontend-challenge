import React from 'react';
import { createPortal } from 'react-dom';

import closeIcon from '../../assets/img/close.svg';

import styles from './styles.module.scss';

function ModalContent({
  content, closeModal, typeModal,
}) {
  return (
    <div className={styles['modal-overlay']}>
      <div className={styles['modal-container']}>
        <div className={styles['modal-container__header']}>
          <h1>{typeModal.type === 'add' ? 'Cadastrar Empresa' : 'Editar empresa'}</h1>
          <button type="button" onClick={closeModal}>
            <img src={closeIcon} alt="Ícone de fechamento" />
          </button>
        </div>
        <div className={styles['modal-container__main-content']}>
          {content}
        </div>
      </div>
    </div>
  );
}

export default function Modal({
  content, closeModal, typeModal,
}) {
  return createPortal(
    <ModalContent
      content={content}
      closeModal={closeModal}
      typeModal={typeModal}
    />,
    document.getElementById('modal-root'),
  );
}
