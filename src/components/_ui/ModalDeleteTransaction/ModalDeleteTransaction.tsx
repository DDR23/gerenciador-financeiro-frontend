import { notifications } from "@mantine/notifications";
import useDelete from "../../../hooks/useDelete";
import { useEffect, useState } from "react";
import { IconCheck, IconCircleCheckFilled, IconX } from "@tabler/icons-react";
import { Button, Stack, Text } from "@mantine/core";

interface ModalDeleteTransactionProps {
  transactionId?: number
  token: string | null
}

export default function ModalDeleteTransaction({ transactionId, token }: ModalDeleteTransactionProps) {
  const [isDelete, setIsDelete] = useState(false);
  const { isDeleted, error } = useDelete(`${import.meta.env.VITE_BASE_URL}/transaction/delete/${transactionId}`, isDelete, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const deleteTransaction = () => {
    setIsDelete(true);
  };

  useEffect(() => {
    if (error) {
      setIsDelete(false)
      notifications.show({
        title: error?.error,
        message: error?.message,
        autoClose: 7000,
        color: 'red',
        icon: <IconX />,
      })
    }
    if (isDeleted) {
      setIsDelete(false)
      notifications.show({
        title: 'Transaction deleted Successfully',
        message: 'Your transaction has been successfully deleted.',
        autoClose: 2000,
        color: 'green',
        icon: <IconCheck />,
        onClose() {
          window.location.reload()
        }
      })
    }
  }, [error, isDeleted]);

  if (isDeleted) {
    return (
      <Stack align="center" gap={0}>
        <IconCircleCheckFilled color="green" size={100} />
        <Text ta='center'>Transaction deleted Successfully</Text>
        <Text ta='center' c='dimmed'>Your transaction has been successfully deleted.</Text>
      </Stack>
    )
  }

  return (
    <>
      <Stack align="center" gap={0}>
        <Text ta='center'>Delete transaction</Text>
        <Text ta='center' size="sm" c='dimmed'>Are you sure you want to delete this transaction?</Text>
      </Stack>
      <Button
        onClick={deleteTransaction}
        type='submit'
        fullWidth
        mt="md"
        fw={500}
        color='red'
      >
        Delete transaction
      </Button>
    </>
  )
}
