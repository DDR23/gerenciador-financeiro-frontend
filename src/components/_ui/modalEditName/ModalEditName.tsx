import { Button, Stack, Text, TextInput } from "@mantine/core";
import { schemaEditUser } from "../../../schemas/schemaEditUser";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import usePut from "../../../hooks/usePut";
import { useEffect, useState } from "react";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconCircleCheckFilled, IconX } from "@tabler/icons-react";
import Loading from "../loading/Loading";

interface UserPutValues {
  USER_NAME?: string;
}

interface ModalEditNameProps {
  userId: number;
  token: string | null;
}

export default function ModalEditName({ userId, token }: ModalEditNameProps) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schemaEditUser)
  });

  const [posted, setPosted] = useState(false);
  const [data, setData] = useState<UserPutValues>({ USER_NAME: '' });
  const { isUpdated, isUpdating, error } = usePut(`${import.meta.env.VITE_BASE_URL}/user/edit/${userId}`, data, posted, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const submitForm: SubmitHandler<UserPutValues> = (formData) => {
    setData(formData);
    setPosted(true);
  };

  useEffect(() => {
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
    if (isUpdated) {
      setPosted(false)
      notifications.show({
        title: 'Success',
        message: 'Name changed successfully.',
        autoClose: 2000,
        color: 'green',
        icon: <IconCheck />,
        onClose() {
          window.location.reload()
        }
      })
    }
  }, [error, isUpdated]);

  if (isUpdated) {
    return (
      <Stack align="center" gap={0}>
        <IconCircleCheckFilled color="green" size={100} />
        <Text ta='center' c='dimmed'>Name changed successfully</Text>
      </Stack>
    )
  }

  if (isUpdating) {
    return (
      <Loading />
    )
  }

  return (
    <>
      <form onSubmit={handleSubmit(submitForm)}>
        <TextInput
          {...register('USER_NAME')}
          label="New name"
          placeholder="Your new name here"
          required
          error={errors.USER_NAME?.message}
        />
        <Button
          type='submit'
          fullWidth
          mt="xl"
          fw={500}
        >
          Save
        </Button>
      </form>
    </>
  )
}
