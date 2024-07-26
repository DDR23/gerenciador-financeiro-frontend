import { Button } from "@mantine/core";
import { TransactionsProps } from "../../userTransaction/Transactions";
import usePut from "../../../hooks/usePut";
import { useEffect, useState } from "react";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";

interface SaveEditProps {
  transactionValues?: TransactionsProps;
  token: string | null;
}

export default function SaveEdit({ transactionValues, token }: SaveEditProps) {
  const [posted, setPosted] = useState(false);
  const [data, setData] = useState<TransactionsProps>();
  const [isConfirmation, setIsConfirmation] = useState(false);

  const { isUpdated, error } = usePut(`${import.meta.env.VITE_BASE_URL}/transaction/edit/${transactionValues?.TRANSACTION_ID}`, data, posted, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const handleClick = () => {
    if (isConfirmation) {
      setData(transactionValues);
      setPosted(true);
    } else {
      setIsConfirmation(true);
    }
  };

  useEffect(() => {
    if (error) {
      setPosted(false);
      notifications.show({
        title: error?.error,
        message: error?.message,
        autoClose: 7000,
        color: 'red',
        icon: <IconX />,
      });
    }
    if (isUpdated) {
      setPosted(false);
      notifications.show({
        title: 'Success',
        message: 'Transaction updated successfully.',
        autoClose: 2000,
        color: 'green',
        icon: <IconCheck />,
        onClose() {
          window.location.reload();
        },
      });
    }
  }, [error, isUpdated]);

  // TODO é preciso ajeitar a dinamica de EncodedVideoChunk, caso o usuario cancele um envio no segundo click, reedite e envie, os valores da segunda edição nao são contabilizados, o ideal seria bloquear os inputs, pra que seja obrigado a fechar o modal
  return (
    <Button
      onClick={handleClick}
      type="submit"
      fullWidth
      mt="xl"
      fw={500}
    >
      {isConfirmation ? "You sure about that?" : "Save Edit"}
    </Button>
  );
}
