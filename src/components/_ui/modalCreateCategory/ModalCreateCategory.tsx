import { TextInput, Button, Stack, Text } from '@mantine/core';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconCircleCheckFilled, IconX } from '@tabler/icons-react';
import { schemaCategory } from '../../../schemas/schemaCategory';
import usePost from '../../../hooks/usePost';

interface CreateCategoryValues {
  CATEGORY_NAME?: string;
}

export default function ModalCreateCategory() {
  const { register, handleSubmit } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schemaCategory)
  });

  const authToken = localStorage.getItem('token')
  const [posted, setPosted] = useState(false);
  const [data, setData] = useState<CreateCategoryValues>({ CATEGORY_NAME: '' });

  const { isPosted, error, error409 } = usePost<CreateCategoryValues>(`${import.meta.env.VITE_BASE_URL}/category/create`, data, posted, {
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  });

  const submitForm: SubmitHandler<CreateCategoryValues> = (formData) => {
    setData(formData);
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
        message: 'Category created successfully.',
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
        <Text ta='center' c='dimmed'>Category created successfully</Text>
      </Stack>
    )
  }

  return (
    <>
      <form onSubmit={handleSubmit(submitForm)}>
        <TextInput
          {...register('CATEGORY_NAME')}
          label="Name"
          required
        />
        <Button type='submit' fullWidth mt="xl" fw={500}>
          Save
        </Button>
      </form>
    </>
  );
}
