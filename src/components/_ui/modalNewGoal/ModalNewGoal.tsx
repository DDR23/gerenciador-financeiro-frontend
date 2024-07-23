import { TextInput, Button, Stack, Text } from '@mantine/core';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import usePost from '../../../hooks/usePost';
import { schemaGoal } from '../../../schemas/schemaGoal';
import { DatePickerInput } from '@mantine/dates';
import dayjs from 'dayjs';
import FormatPrice from '../../../utils/FormatPrice';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconCircleCheckFilled, IconX } from '@tabler/icons-react';

interface ModalNewGoalValues {
  GOAL_NAME?: string;
  GOAL_AMOUNT?: number;
  GOAL_DEADLINE?: string;
}

function FormattedTextInput({ label, value, onChange, ...rest }: any) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value.replace(/\D/g, '');
    const numericValue = Number(rawValue) / 100;
    onChange(numericValue);
  };

  return (
    <TextInput
      label={label}
      value={value ? FormatPrice(value * 100) : ''}
      onChange={handleChange}
      {...rest}
    />
  );
}

export default function ModalNewGoal() {
  const { register, handleSubmit, setValue, watch } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schemaGoal)
  });

  const authToken = localStorage.getItem('token');
  const [dateValue, setDateValue] = useState<Date | null>(null);
  const [posted, setPosted] = useState(false);
  const [data, setData] = useState<ModalNewGoalValues>({ GOAL_NAME: '', GOAL_AMOUNT: 0, GOAL_DEADLINE: '' });

  const { isPosted, error } = usePost<ModalNewGoalValues>(`${import.meta.env.VITE_BASE_URL}/goal/create`, data, posted, {
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  });

  console.log(data);

  const submitForm: SubmitHandler<ModalNewGoalValues> = (formData) => {
    const deadline = dateValue ? dayjs(dateValue).format('YYYY-MM-DD') : '';
    const amountInCents = formData.GOAL_AMOUNT ? Math.round(formData.GOAL_AMOUNT * 100) : 0;
    setData({ ...formData, GOAL_DEADLINE: deadline, GOAL_AMOUNT: amountInCents });
    setPosted(true);
  };

  const goalAmount = watch('GOAL_AMOUNT');

  useEffect(() => {
    setValue('GOAL_AMOUNT', goalAmount);
  }, [goalAmount, setValue]);

  useEffect(() => {
    if (error) {
      setPosted(false);
      notifications.show({
        title: error?.error,
        message: error?.message,
        autoClose: 7000,
        color: 'red',
        icon: <IconX />,
      })
    }
    if (isPosted) {
      setPosted(false);
      notifications.show({
        title: 'Success',
        message: 'Goal created successfully.',
        autoClose: 2000,
        color: 'green',
        icon: <IconCheck />,
        onClose() {
          window.location.reload()
        }
      })
    }
  }, [error, isPosted]);

  if (isPosted) {
    return (
      <Stack align="center" gap={0}>
        <IconCircleCheckFilled color="green" size={100} />
        <Text ta='center' c='dimmed'>Goal created successfully</Text>
      </Stack>
    )
  }

  return (
    <>
      <form onSubmit={handleSubmit(submitForm)}>
        <TextInput
          {...register('GOAL_NAME')}
          label="Goal name"
        />
        <FormattedTextInput
          label="Amount"
          value={goalAmount}
          onChange={(value: number) => setValue('GOAL_AMOUNT', value)}
        />
        <DatePickerInput
          valueFormat="DD/MM/YYYY"
          minDate={new Date()}
          label="Deadline"
          placeholder="Pick date"
          value={dateValue}
          onChange={setDateValue}
        />
        <Button type='submit' fullWidth mt="xl" fw={500}>
          Save
        </Button>
      </form>
    </>
  );
}
