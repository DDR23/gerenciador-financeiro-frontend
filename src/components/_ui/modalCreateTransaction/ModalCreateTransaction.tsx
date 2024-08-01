import { TextInput, Button, Stack, Text, NativeSelect, NumberInput } from '@mantine/core';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconCircleCheckFilled, IconX } from '@tabler/icons-react';
import usePost from '../../../hooks/usePost';
import { UserTransactionProps } from '../../userTransaction/UserTransaction';
import { schemaTransaction } from '../../../schemas/schemaTransaction';
import { CategoryProps } from '../../userTransaction/Categories';
import { DatePickerInput } from '@mantine/dates';
import dayjs from 'dayjs';

interface ModalCreateTransactionProps {
  userId: number
  categories: CategoryProps[]
}

export default function ModalCreateTransaction({ userId, categories }: ModalCreateTransactionProps) {
  const { register, handleSubmit } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schemaTransaction)
  });
  const [dateValue, setDateValue] = useState<Date | null>(null);
  const [amountValue, setAmountValue] = useState<string | number>();
  const authToken = localStorage.getItem('token')
  const [posted, setPosted] = useState(false);
  const [data, setData] = useState<UserTransactionProps>({
    TRANSACTION_ID: 0,
    TRANSACTION_DESCRIPTION: '',
    TRANSACTION_AMOUNT: 0,
    TRANSACTION_DATE: '',
    TRANSACTION_TYPE: 'revenue',
    FK_USER_ID: 0,
    FK_CATEGORY_ID: 0
  });

  console.log(data)

  const { isPosted, error, error409 } = usePost<UserTransactionProps>(`${import.meta.env.VITE_BASE_URL}/transaction/create`, data, posted, {
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  });

  console.log(amountValue)
  const submitForm: SubmitHandler<UserTransactionProps> = (formData) => {
    const transactionDate = dateValue ? dayjs(dateValue).format('YYYY-MM-DD') : '';
    const transactionAmount = amountValue as number * 100;
    setData({ ...formData, TRANSACTION_DATE: transactionDate, TRANSACTION_AMOUNT: transactionAmount, FK_USER_ID: userId });
    setPosted(true);
  };

  useEffect(() => {
    if (error409) {
      setPosted(false)
      notifications.show({
        title: error409?.error,
        message: error409?.message,
        autoClose: 7000,
        color: 'red',
        icon: <IconX />,
      })
    }
    if (error) {
      setPosted(false)
      notifications.show({
        title: error?.error,
        message: error?.message,
        autoClose: 7000,
        color: 'red',
        icon: <IconX />,
      })
    }
    if (isPosted) {
      setPosted(false)
      notifications.show({
        title: 'Success',
        message: 'Transaction created successfully.',
        autoClose: 2000,
        color: 'green',
        icon: <IconCheck />,
        onClose() {
          window.location.reload()
        }
      })
    }
  }, [error409, error, isPosted]);

  if (isPosted) {
    return (
      <Stack align="center" gap={0}>
        <IconCircleCheckFilled color="green" size={100} />
        <Text ta='center' c='dimmed'>Transaction created successfully</Text>
      </Stack>
    )
  }

  return (
    <>
      <Text ta='center' my={20}>Fill in all the fields to register a transaction</Text>
      <form onSubmit={handleSubmit(submitForm)}>
        <TextInput
          {...register('TRANSACTION_DESCRIPTION')}
          label="Description"
          required
        />
        <NumberInput
          label="With prefix"
          placeholder="Dollars"
          prefix="US$ "
          thousandSeparator='.'
          decimalSeparator=','
          decimalScale={2}
          value={amountValue}
          onChange={setAmountValue}
        />
        <DatePickerInput
          valueFormat="MM/DD/YYYY"
          label="Date"
          placeholder="Pick date"
          value={dateValue}
          onChange={setDateValue}
          required
        />
        <NativeSelect
          {...register('TRANSACTION_TYPE')}
          label="Type"
          data={['revenue', 'expense']}
          required
        />
        <NativeSelect
          {...register('FK_CATEGORY_ID')}
          label="Category"
          data={categories.map(cat => ({ value: cat.CATEGORY_ID?.toString() || '', label: cat.CATEGORY_NAME || '' }))}
          required
        />
        <Button type='submit' fullWidth mt="xl" fw={500}>
          Save
        </Button>
      </form>
    </>
  );
}
