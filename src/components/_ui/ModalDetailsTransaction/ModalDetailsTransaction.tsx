import { SubmitHandler, useForm } from "react-hook-form";
import { schemaTransaction } from "../../../schemas/schemaTransaction";
import { TransactionsProps } from "../../userTransaction/Transactions";
import { yupResolver } from "@hookform/resolvers/yup";
import { Center, NativeSelect, Stack, TextInput } from "@mantine/core";
import useGet from "../../../hooks/useGet";
import Loading from "../loading/Loading";
import { useState } from "react";
import SaveEdit from "./SaveEdit";

interface ModalDetailsTransactionProps {
  token: string | null;
  transaction?: TransactionsProps;
}

interface CategoryProps {
  CATEGORY_ID?: number;
  CATEGORY_NAME?: string;
  FK_USER_ID?: number;
}

export default function ModalDetailsTransaction({ token, transaction }: ModalDetailsTransactionProps) {
  const { register, handleSubmit } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schemaTransaction),
  });
  const [transactionValues, setTransactionValues] = useState<TransactionsProps>();

  const { data } = useGet<CategoryProps[]>(`${import.meta.env.VITE_BASE_URL}/category/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!data) {
    return <Loading />;
  }

  const filteredCategory = data.find(category => category.CATEGORY_ID === transaction?.FK_CATEGORY_ID);

  const submitForm: SubmitHandler<TransactionsProps> = (formData) => {
    const transactionId = transaction?.TRANSACTION_ID;
    setTransactionValues({
      ...formData,
      TRANSACTION_ID: transactionId,
      TRANSACTION_AMOUNT: formData.TRANSACTION_AMOUNT ? Math.round(formData.TRANSACTION_AMOUNT) : 0,
      TRANSACTION_DATE: formData.TRANSACTION_DATE,
    });
  };
  
  // TODO ao enviar ta batendo erro 500 no servidor
  return (
    <>
      <Stack gap={0} mb={20}>
        <Center>Transaction details</Center>
        <Center c='dimmed'>Change any field below to edit the transaction details</Center>
      </Stack>
      <form onSubmit={handleSubmit(submitForm)}>
        <TextInput
          {...register('TRANSACTION_DESCRIPTION')}
          defaultValue={transaction?.TRANSACTION_DESCRIPTION}
          label="Description"
        />
        <TextInput
          {...register('TRANSACTION_AMOUNT')}
          defaultValue={transaction?.TRANSACTION_AMOUNT}
          label="Amount"
        />
        <NativeSelect
          {...register('TRANSACTION_TYPE')}
          defaultValue={transaction?.TRANSACTION_TYPE}
          label="Type"
          data={['revenue', 'expense']}
        />
        <TextInput
          {...register('TRANSACTION_DATE')}
          defaultValue={transaction?.TRANSACTION_DATE}
          label="Date"
        />
        <NativeSelect
          {...register('FK_CATEGORY_ID')}
          defaultValue={filteredCategory ? filteredCategory.CATEGORY_ID?.toString() : ''}
          label="Category"
          data={data.map(cat => ({ value: cat.CATEGORY_ID?.toString() || '', label: cat.CATEGORY_NAME || '' }))}
        />
        <SaveEdit transactionValues={transactionValues} token={token} />
      </form>
    </>
  );
}
