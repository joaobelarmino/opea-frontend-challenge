import React, { useState, useEffect } from 'react';

import FormGroup from '../FormGroup';

import trashIcon from '../../assets/img/trash-icon.svg';

import styles from './styles.module.scss';
import ClientsService from '../../services/ClientsService';

function FormClient({
  typeModal, closeModal, onSubmit, onRemove,
}) {
  const [name, setName] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [email, setEmail] = useState('');
  const [currentClient, setCurrentClient] = useState([]);
  const [formGenericError, setFormGenericError] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    if (name.length && cnpj.length && email.length) {
      setFormGenericError(false);
      onSubmit({ name, cnpj, email });
    } else {
      setFormGenericError(true);
    }
  }

  async function getClientData() {
    if (typeModal.type === 'edit') {
      const [response] = await ClientsService.showClient(typeModal.clientName);
      setName(response.name);
      setCnpj(response.cnpj);
      setEmail(response.email);

      setCurrentClient(response);
    }
  }

  useEffect(() => {
    getClientData();
  }, [typeModal]);

  return (
    <form onSubmit={handleSubmit}>
      <FormGroup>
        <label htmlFor="client-name">Nome</label>
        <input
          type="text"
          id="client-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <label htmlFor="client-cnpj">CNPJ</label>
        <input
          type="text"
          id="client-cnpj"
          value={cnpj}
          onChange={(e) => setCnpj(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <label htmlFor="client-email">E-mail</label>
        <input
          type="email"
          id="client-email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormGroup>
      {formGenericError && (
        <div className={styles['form-client__error-message']}>
          <span>Preencha todos os campos antes de executar a ação de envio do formulário.</span>
        </div>
      )}
      <div className={styles['form-client__actions']}>
        {typeModal.type === 'edit' && (
        <div className={styles['remove-action']}>
          <button
            type="button"
            onClick={() => onRemove(currentClient.id)}
          >
            <img src={trashIcon} alt="Ícone de lixeira" />

          </button>
        </div>
        )}
        <div>
          <button
            type="button"
            onClick={closeModal}
            className={styles['cancel-action']}
          >
            <span>Cancelar</span>
          </button>
          <button
            type="submit"
            className={styles['submit-action']}
          >
            <span>{typeModal.type === 'add' ? 'Cadastrar' : 'Salvar'}</span>
          </button>
        </div>
      </div>
    </form>
  );
}

export default FormClient;