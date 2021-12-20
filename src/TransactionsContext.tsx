import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "./services/api";
import { Transaction } from "./shared/interfaces/Transaction/Transaction";
import { TransactionInput } from "./shared/interfaces/Transaction/TransactionInput";


interface TransactionProviderProps {
    children: ReactNode;
}

interface TransactionsContextData {
    transactions: Transaction[];
    createTransaction: (transaction: TransactionInput) => void; 
}

export const TransactionsContext = createContext<TransactionsContextData>({} as TransactionsContextData);

export function TransactionProvider({children}: TransactionProviderProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([])

    useEffect(() => {
        api.get('transactions')
            .then(response => setTransactions(response.data.transactions))
    }, []);

    function createTransaction(transaction: TransactionInput ): void {
        api.post('/transactions', transaction);
    }

    return (
        <TransactionsContext.Provider value={{transactions, createTransaction}}>
            {children} {/* This is necessary to React understands that childrens will be expected to this component */} 
        </TransactionsContext.Provider >
    );
}