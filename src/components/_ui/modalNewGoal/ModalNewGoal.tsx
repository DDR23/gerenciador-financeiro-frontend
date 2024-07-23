import { TextInput, Button } from '@mantine/core';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import usePost from '../../../hooks/usePost';
import { schemaGoal } from '../../../schemas/schemaGoal';
import { DatePickerInput } from '@mantine/dates';

//TODO continuar daqui, os valores dos inputs nao tao sendo passados

interface ModalNewGoalValues {
  GOAL_NAME: string;
  GOAL_AMOUNT: number;
  GOAL_DEADLINE: string;
}

export default function ModalNewGoal() {
  const { register, handleSubmit } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schemaGoal)
  })

  const [dateValue, setDateValue] = useState<Date | null>(null);
  const [posted, setPosted] = useState(false);
  const [data, setData] = useState<ModalNewGoalValues>({ GOAL_NAME: '', GOAL_AMOUNT: 0, GOAL_DEADLINE: '' });

  const { isPosted, error } = usePost<ModalNewGoalValues>(`${import.meta.env.VITE_BASE_URL}/goal/create`, data, posted);
  
  console.log(data)
  const submitForm: SubmitHandler<ModalNewGoalValues> = (formData) => {
    setData(formData);
    // setPosted(true);
  };

  useEffect(() => {
    if (error) {
      setPosted(false)
    }
    if (isPosted) {
      setPosted(false)
    }
  }, [error, isPosted]);

  return (
    <>
      <form onSubmit={handleSubmit(submitForm)}>
        <TextInput
          {...register('GOAL_NAME')}
          label="Goal name"
        />
        <TextInput
          {...register('GOAL_AMOUNT')}
          label="Amount"
        />
        <DatePickerInput
          {...register('GOAL_DEADLINE')}
          valueFormat="DD/MM/YYYY"
          minDate={new Date}
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
