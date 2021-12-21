import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../services/api";
import { Transaction } from "../shared/interfaces/Transaction/Transaction";
import { TransactionInput } from "../shared/interfaces/Transaction/TransactionInput";

interface TransactionProviderProps {
    children: ReactNode;
}

interface TransactionsContextData {
    transactions: Transaction[];
    createTransaction: (transaction: TransactionInput) => Promise<void>; 
}

const TransactionsContext = createContext<TransactionsContextData>({} as TransactionsContextData);

export function TransactionProvider({children}: TransactionProviderProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([])

    useEffect(() => {
        api.get('transactions')
            .then(response => setTransactions(response.data.transactions))
    }, []);

    async function createTransaction(transactionInput: TransactionInput ): Promise<void> {
        const response = await api.post('/transactions', {...transactionInput, createdAt: new Date()});

        const transaction = response.data;
        
        setTransactions([
            ...transactions, transaction
        ])                                                                          
    }

    return (
        <TransactionsContext.Provider value={{transactions, createTransaction}}>
            {children} {/* This is necessary to React understands that childrens will be expected to this component */} 
        </TransactionsContext.Provider >
    );
}

export function useTransaction() {
    return useContext(TransactionsContext);
}