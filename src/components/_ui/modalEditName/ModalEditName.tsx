import { Button, LoadingOverlay, rem, TextInput } from "@mantine/core";
import { schemaEditName } from "../../../schemas/schemaEditName";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import usePut from "../../../hooks/usePut";
import { useEffect, useState } from "react";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconCircleCheckFilled, IconX } from "@tabler/icons-react";

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
    resolver: yupResolver(schemaEditName)
  });

  const [posted, setPosted] = useState(false);
  const [data, setData] = useState<UserPutValues>({ USER_NAME: '' });
  const { isUpdated, isUpdating, error } = usePut(`${import.meta.env.VITE_BASE_URL}/user/edit/${userId}`, data, posted, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const submitForm: SubmitHandler<UserPutValues> = (formData) => {
    console.log(formData)
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
      <>
        <div style={{
          display: 'flex',
          justifyContent: 'center'
        }}>
          <IconCircleCheckFilled color="green" size={150} />
        </div>
      </>
    )
  }

  if (isUpdating) {
    return (
      <>
        <div style={{ padding: rem(100) }}>
          <LoadingOverlay
            visible={true}
            zIndex={1000}
            overlayProps={{
              radius: "sm",
              blur: 2
            }}
          />
        </div>
      </>
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
          fw='200'
        >
          Save
        </Button>
      </form>
    </>
  )
}