import { FormEvent, useState } from 'react'
import Modal from 'react-modal'
import { Container, TransactionTypeContainer, RadioBox } from './styles'
import  closeImg  from '../../assets/close.svg'
import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'
import { api } from '../../services/api'

interface NewTransactionModalProps {
    isOpen: boolean,
    onRequestClose: () => void;
}

export function NewTransactionModal({isOpen, onRequestClose}: NewTransactionModalProps) {
    const [title, setTitle] = useState<string>("")
    const [amount, setAmount] = useState<number>(0)
    const [category, setCategory] = useState<string>("")
    const [type, setType] = useState<string>("deposit")

    function handleCreateNewTransaction(event: FormEvent) {
        event.preventDefault(); //This will prevent the default behavior from HTML.

        const data = {
            title,
            amount,
            category,
            type
        }

        api.post('/transactions', data)
    }


    return (
        <Modal
         isOpen={isOpen}
         onRequestClose={onRequestClose}
         overlayClassName="react-modal-overlay"
         className="react-modal-content"
        >
        
        <button 
            type="button" 
            onClick={onRequestClose} 
            className="react-modal-close"
        >
            <img src={closeImg} alt="Fechar modal" />
        </button>

        <Container onSubmit={handleCreateNewTransaction}>
            <h2>Cadastrar transação</h2>

            <input 
                placeholder='Título' 
                value = {title}
                onChange={(event) => setTitle(event.target.value)}
            />

            <input 
                type="number" 
                placeholder='Valor' 
                value = {amount}
                onChange={(event) => setAmount(Number(event.target.value))}
            />

            <TransactionTypeContainer>
                <RadioBox
                    type="button"
                    onClick={() => { setType('deposit'); }}
                    isActive={type==='deposit'}
                    activeColor="green"
                >
                    <img src={incomeImg} alt="Entrada" />
                    <span>Entrada</span>
                </RadioBox>
                
                <RadioBox
                    type="button"
                    onClick={() => { setType('withdraw'); }}
                    isActive={type==='withdraw'}
                    activeColor="red"
                >
                    <img src={outcomeImg} alt="Saida" />
                    <span>Saida</span>
                </RadioBox>

            </TransactionTypeContainer>

            <input 
                placeholder='Categoria' 
                value = {category}
                onChange={(event) => setCategory(event.target.value)}
            />

            <button 
                type="submit"
                
            >
                Cadastrar
            </button>
        </Container>

        </Modal>
    )
}