import React, { useState, useEffect } from 'react';

import FormGroup from '../FormGroup';

import trashIcon from '../../assets/img/trash-icon.svg';

import styles from './styles.module.scss';
import ClientsService from '../../services/ClientsService';
import Loader from '../Loader';

function FormClient({
  typeModal, closeModal, onSubmit, onRemove,
}) {
  const [name, setName] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentClient, setCurrentClient] = useState([]);
  const [formGenericError, setFormGenericError] = useState(false);

  function handleRemove(clientId) {
    closeModal();
    onRemove(clientId);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (name.length && cnpj.length && email.length) {
      closeModal();
      if (currentClient.id) {
        onSubmit({
          id: currentClient.id, name, cnpj, email,
        });
      } else {
        onSubmit({ name, cnpj, email });
      }

      setFormGenericError(false);
    } else {
      setFormGenericError(true);
    }
  }

  async function getClientData() {
    if (typeModal.type === 'edit') {
      try {
        setIsLoading(true);
        let response = await ClientsService.showClient(typeModal.clientName);

        /**
         * This line is responsible for get the correct current client, because the api looks like
         * use the method `.includes` that may return more than one item in some cases.
         */
        [response] = response.filter((client) => client.name === typeModal.clientName);

        setName(response.name);
        setCnpj(response.cnpj);
        setEmail(response.email);

        setCurrentClient(response);
      } finally {
        setIsLoading(false);
      }
    } else {
      setCurrentClient([]);
    }
  }

  useEffect(() => {
    getClientData();
  }, [typeModal]);

  return (
    <form onSubmit={handleSubmit}>
      <Loader isLoading={isLoading} isFullPage={false} spinnerSize={90} />
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
            onClick={() => handleRemove(currentClient.id)}
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
