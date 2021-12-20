import styled from 'styled-components'
import { GlobalStyle } from '../src/style/global'
import { Dashboard } from './components/Dashboard';
import { Header } from './components/Header';
import Modal from 'react-modal'
import { useState } from 'react';
import { NewTransactionModal } from './components/NewTransactionModal';

Modal.setAppElement('#root')


export function App() {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState<boolean>(false);

    function handleOpenNewTransactionModal() {
        setIsNewTransactionModalOpen(true);
    }
    
    function handleCloseNewTransactionModal() {
        setIsNewTransactionModalOpen(false);
    }

  return (

    
    <>
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal}/>
      <Dashboard />

      <NewTransactionModal 
        isOpen={isNewTransactionModalOpen}
        onRequestClose = {handleCloseNewTransactionModal}
      />

      <GlobalStyle />
    </>
  );
}

