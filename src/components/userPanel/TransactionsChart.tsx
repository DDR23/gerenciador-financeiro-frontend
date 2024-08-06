import { UserTransactionProps } from "../userTransaction/UserTransaction"

interface TransactionChartProps {
  transactions: UserTransactionProps[]
}

export default function TransactionChart({ transactions }: TransactionChartProps ) {
  console.log(transactions)

  return (
    <>
      total de transações {transactions.length}
    </>
  )
}
