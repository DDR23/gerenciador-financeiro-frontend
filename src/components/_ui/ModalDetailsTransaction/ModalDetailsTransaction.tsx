import { SubmitHandler, useForm } from "react-hook-form";
import { schemaTransaction } from "../../../schemas/schemaTransaction";
import { TransactionsProps } from "../../userTransaction/Transactions";
import { yupResolver } from "@hookform/resolvers/yup";
import { Center, NativeSelect, Stack, TextInput } from "@mantine/core";
import useGet from "../../../hooks/useGet";
import Loading from "../loading/Loading";
import { useEffect, useState } from "react";
import SaveEdit from "./SaveEdit";
import { DatePickerInput } from '@mantine/dates';
import dayjs from 'dayjs';

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
  const form = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schemaTransaction),
  });
  // const { register, handleSubmit } = useForm({
  //   mode: 'onBlur',
  //   resolver: yupResolver(schemaTransaction),
  // });
  const [transactionValues, setTransactionValues] = useState<TransactionsProps>();
  const [dateValue, setDateValue] = useState<Date | null>(null);

  const { data } = useGet<CategoryProps[]>(`${import.meta.env.VITE_BASE_URL}/category/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  useEffect(() => {
    if (transaction && transaction.TRANSACTION_DATE) {
      const newDate = new Date(transaction.TRANSACTION_DATE);
      if (dateValue === null || newDate.getTime() !== dateValue.getTime()) {
        setDateValue(newDate);
      }
    }
  }, [transaction]);

  const submitForm: SubmitHandler<TransactionsProps> = (formData) => {
    const transactionDate = dateValue ? dayjs(dateValue).format('YYYY-MM-DD') : '';
    // TODO é preciso adicionar o TRANSACTION_ID
    setTransactionValues({ ...formData, TRANSACTION_DATE: transactionDate });
  };

  if (!data) {
    return <Loading />;
  }

  const filteredCategory = data.find(category => category.CATEGORY_ID === transaction?.FK_CATEGORY_ID);

  console.log(transactionValues)

  return (
    <>
      <Stack gap={0} mb={20}>
        <Center>Transaction details</Center>
        <Center c='dimmed'>Change any field below to edit the transaction details</Center>
      </Stack>
      <form onSubmit={form.handleSubmit(submitForm)}>
        <TextInput
          {...form.register('TRANSACTION_DESCRIPTION')}
          defaultValue={transaction?.TRANSACTION_DESCRIPTION}
          label="Description"
        />
        {/* TODO tentar usar controller com NumberFormat e form.field*/}
        <TextInput
          {...form.register('TRANSACTION_AMOUNT')}
          defaultValue={transaction?.TRANSACTION_AMOUNT}
          label="Amount"
        />
        {/* <Controller
          name="TRANSACTION_AMOUNT"
          control={form.control}
          render={({ field }) => (
            <NumberInput
              {...field}
              prefix="US$ "
              label="Preço do produto"
              decimalScale={2}
              decimalSeparator=","
              thousandSeparator='.'
              defaultValue={(transaction?.TRANSACTION_AMOUNT as number / 100).toFixed(2).replace('.', ',')}
            />
          )}
        /> */}
        <NativeSelect
          {...form.register('TRANSACTION_TYPE')}
          defaultValue={transaction?.TRANSACTION_TYPE}
          label="Type"
          data={['revenue', 'expense']}
        />
        <DatePickerInput
          valueFormat="MM/DD/YYYY"
          minDate={new Date()}
          label="Date"
          value={dateValue}
          onChange={setDateValue}
        />
        <NativeSelect
          {...form.register('FK_CATEGORY_ID')}
          defaultValue={filteredCategory ? filteredCategory.CATEGORY_ID?.toString() : ''}
          label="Category"
          data={data.map(cat => ({ value: cat.CATEGORY_ID?.toString() || '', label: cat.CATEGORY_NAME || '' }))}
        />
        <SaveEdit transactionValues={transactionValues} token={token} />
      </form>
    </>
  );
}
