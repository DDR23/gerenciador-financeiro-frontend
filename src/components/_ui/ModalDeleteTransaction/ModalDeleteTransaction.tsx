import { TransactionsProps } from "../../userTransaction/Transactions"

interface ModalDeleteTransactionProps {
  token: string | null
  transaction?: TransactionsProps
}

export default function ModalDeleteTransaction({ token, transaction }: ModalDeleteTransactionProps) {

  return (
    <>
      modal de editar
    </>
  )
}
