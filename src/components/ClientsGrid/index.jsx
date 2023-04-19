import React, { useEffect, useMemo, useState } from 'react';
import useClients from '../../hooks/useClients';

import Modal from '../Modal';
import FormClient from '../FormClient';
import SearchField from '../SearchField';
import ErrorContainer from '../ErrorContainer';
import Loader from '../Loader';

import clipboardDisabledIcon from '../../assets/img/clipboard-list-disabled.svg';
import searchTermNotFound from '../../assets/img/search-term-not-found.svg';
import errorIllustration from '../../assets/img/error-listing-data.svg';
import clipboardIcon from '../../assets/img/clipboard-list.svg';
import noData from '../../assets/img/no-data-return.svg';
import styles from './styles.module.scss';

function ClientsGrid() {
  const [typeModal, setTypeModal] = useState('');
  const [search, setSearch] = useState('');
  const [isVisibleModal, setIsVisibleModal] = useState(false);

  const {
    loadClients,
    createClient,
    editClient,
    removeClient,
    clientsList,
    isLoading,
    hasError,
  } = useClients();

  const filteredClientsList = useMemo(() => clientsList.filter((client) => (
    client.name.toLowerCase().includes(search.toLowerCase())
  )), [search, clientsList]);

  function handleToggleModal() {
    setIsVisibleModal((prevState) => !prevState);
  }

  function handleTypeModal(type) {
    setTypeModal(type);
    handleToggleModal();
  }

  function handleSubmit(client) {
    if (typeModal.type === 'add') {
      return createClient(client);
    }
    return editClient(client);
  }

  useEffect(() => {
    loadClients();
  }, []);

  return (
    <>
      <Loader isLoading={isLoading} isFullPage />
      {isVisibleModal && (
        <Modal
          content={(
            <FormClient
              onSubmit={handleSubmit}
              typeModal={typeModal}
              closeModal={handleToggleModal}
              onRemove={removeClient}
            />
          )}
          closeModal={handleToggleModal}
          typeModal={typeModal}
        />
      )}
      {hasError && (
        <ErrorContainer
          img={errorIllustration}
          alt="Ilustração de erro no carregamento da lista de clientes"
          text="Não foi possível carregar a lista de empresas, atualize a página e tente novamente."
        />
      )}
      {!hasError && (
        <>
          <SearchField search={search} onChange={setSearch} />
          <div className={styles['clients-wrapper']}>
            <button
              type="button"
              onClick={() => handleTypeModal({ type: 'add' })}
              className={`${styles['add-card']} ${styles['client-card']}`}
            >
              <figure>
                <img src={clipboardDisabledIcon} alt="Ícone de prancheta" />
              </figure>
              <span>Adicionar empresa</span>
            </button>
            {(filteredClientsList.length === 0 && !isLoading && clientsList.length > 0) && (
              <ErrorContainer
                img={searchTermNotFound}
                alt="Ilustração de registro não encontrado"
                text={`Não encontramos registros com a informação "${search}".`}
              />
            )}
            {(clientsList.length === 0 && !isLoading) && (
              <ErrorContainer
                img={noData}
                alt="Ilustração de nenhum cliente cadastrado"
                text={`Não existe nenhum registro cadastrado, clique no botão 
                "Adicionar empresa" acima e cadastre o primeiro.`}
              />
            )}
            {filteredClientsList.map((client) => (
              <button
                type="button"
                className={styles['client-card']}
                key={client.id}
                onClick={() => handleTypeModal({ type: 'edit', clientName: client.name })}
              >
                <figure>
                  <img src={clipboardIcon} alt="Ícone de prancheta" />
                </figure>
                <div className={styles['client-card__info']}>
                  <span className={styles['client-card__info__name']}>{client.name}</span>
                  <span>{`CNPJ: ${client.cnpj}`}</span>
                  <span>{`Email: ${client.email}`}</span>
                </div>
              </button>
            ))}
          </div>
        </>
      )}
    </>
  );
}

export default ClientsGrid;
