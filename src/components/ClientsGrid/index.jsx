import React, { useEffect, useMemo, useState } from 'react';
import useCrud from '../../hooks/useCrud';

import Modal from '../Modal';
import FormClient from '../FormClient';
import SearchField from '../SearchField';
import ClientCard from '../ClientCard';
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
  } = useCrud();

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
            <ClientCard
              type="add"
              onClick={() => handleTypeModal({ type: 'add' })}
              img={clipboardDisabledIcon}
            >
              <span>Adicionar empresa</span>
            </ClientCard>
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
              <ClientCard
                onClick={() => handleTypeModal({ type: 'edit', clientName: client.name })}
                client={client}
                img={clipboardIcon}
                type="edit"
                key={client.id}
              >
                <span>{client.name}</span>
                <span>{`CNPJ: ${client.cnpj}`}</span>
                <span>{`Email: ${client.email}`}</span>
              </ClientCard>
              // <button
              //   type="button"
              //   className={styles['client-card']}
              //   key={client.id}
              //   onClick={() => handleTypeModal({ type: 'edit', clientName: client.name })}
              // >
              //   <figure>
              //     <img src={clipboardIcon} alt="Ícone de prancheta" />
              //   </figure>
              //   <div className={styles['client-card__info']}>
              //     <span className={styles['client-card__info__name']}>{client.name}</span>
              //     <span>{`CNPJ: ${client.cnpj}`}</span>
              //     <span>{`Email: ${client.email}`}</span>
              //   </div>
              // </button>
            ))}
          </div>
        </>
      )}
    </>
  );
}

export default ClientsGrid;
