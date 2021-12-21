import { FormEvent, useState } from 'react'
import Modal from 'react-modal'
import { Container, TransactionTypeContainer, RadioBox } from './styles'
import  closeImg  from '../../assets/close.svg'
import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'
import { TransactionInput } from '../../shared/interfaces/Transaction/TransactionInput'
import { useTransaction } from '../../hooks/useTransactions'

interface NewTransactionModalProps {
    isOpen: boolean,
    onRequestClose: () => void;
}

export function NewTransactionModal({isOpen, onRequestClose}: NewTransactionModalProps) {
    const [title, setTitle] = useState<string>("")
    const [amount, setAmount] = useState<number>(0)
    const [category, setCategory] = useState<string>("")
    const [type, setType] = useState<string>("deposit")

    const { createTransaction } = useTransaction();

    async function handleCreateNewTransaction(event: FormEvent) {
        event.preventDefault(); //This will prevent the default behavior from HTML.

        const data: TransactionInput = {
            title,
            amount,
            category,
            type
        }

        console.log(data);

        await createTransaction(data);

        cleanFields();

        onRequestClose();
    }

    function cleanFields(): void {
        setTitle('')
        setAmount(0)
        setCategory('deposit')
        setType('')
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