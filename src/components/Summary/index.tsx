import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'
import total from '../../assets/total.svg'
import { useTransaction } from '../../hooks/useTransactions'

import { Container } from "./styles"

export function Summary() {
    const { transactions } = useTransaction();

    const summary = transactions.reduce((acumulator, transaction) => { /* Reduce is used to transform an Array in an unique value with its elements accumulated on it */
        if (transaction.type === 'deposit') {
            acumulator.deposits += transaction.amount;
            acumulator.total += transaction.amount;
        } else {
            acumulator.withdraws += transaction.amount;
            acumulator.total -= transaction.amount;
        }

        return acumulator;
    }, {
        deposits: 0,
        withdraws: 0,
        total: 0
    })

    return (
        <Container>
            <div>
                <header>
                    <p>Entradas</p>
                    <img src={incomeImg} alt="Entradas" />
                </header>
                <strong>
                    {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL' })
                        .format(summary.deposits)}
                    
                </strong>
            </div>
            <div>
                <header>
                    <p>Saidas</p>
                    <img src={outcomeImg} alt="Saidas" />
                </header>
                <strong> 
                    -                    
                    {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL' })
                        .format(summary.withdraws)}
                </strong>
            </div>
            <div className= {summary.total > 0 ? 'highlight-background-positive' : 'highlight-background-negative'}>
                <header>
                    <p>Total</p>
                    <img src={total} alt="" />
                </header>
                <strong>                  
                  {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL' })
                        .format(summary.total)}
                </strong>
            </div>
        </Container>
    )
}