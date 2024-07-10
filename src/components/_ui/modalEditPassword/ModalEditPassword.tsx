import { Button, LoadingOverlay, rem, TextInput } from "@mantine/core";
import { schemaEditName } from "../../../schemas/schemaEditUser";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import usePut from "../../../hooks/usePut";
import { useEffect, useState } from "react";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconCircleCheckFilled, IconX } from "@tabler/icons-react";
import PasswordStrength from "../passwordStrength/PasswordStrength";

interface UserPutValues {
  USER_PASSWORD?: string;
}

interface ModalEditPasswordProps {
  userId: number;
  token: string | null;
}

export default function ModalEditPassword({ userId, token }: ModalEditPasswordProps) {
  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schemaEditName)
  });

  const watchPassword = watch("USER_PASSWORD", "");
  const [posted, setPosted] = useState(false);
  const [data, setData] = useState<UserPutValues>({ USER_PASSWORD: '' });
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
          {...register('USER_PASSWORD')}
          label="New password"
          autoComplete="new-password"
          placeholder="Your new password here"
          required
          error={errors.USER_PASSWORD?.message}
        />
        <PasswordStrength value={watchPassword || ''} />
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