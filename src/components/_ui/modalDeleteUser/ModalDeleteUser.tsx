import { Button, LoadingOverlay, Stack, Text } from "@mantine/core";
import { schemaEditUser } from "../../../schemas/schemaEditUser";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconCircleCheckFilled, IconX } from "@tabler/icons-react";
import useDelete from "../../../hooks/useDelete";

interface UserPutValues {
  USER_DELETED?: boolean;
}

interface ModalEditNameProps {
  userId: number;
  token: string | null;
}

export default function ModalDeleteUser({ userId, token }: ModalEditNameProps) {
  const { handleSubmit } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schemaEditUser)
  });

  const [isDelete, setIsDelete] = useState(false);
  const { isDeleted, isDeleting, error } = useDelete(`${import.meta.env.VITE_BASE_URL}/user/delete/${userId}`, isDelete, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const submitForm: SubmitHandler<UserPutValues> = () => {
    setIsDelete(true);
  };

  useEffect(() => {
    if (error) {
      setIsDelete(false)
      notifications.show({
        title: error?.error,
        message: error?.message,
        autoClose: 7000,
        color: 'red',
        icon: <IconX />,
      })
    }
    if (isDeleted) {
      setIsDelete(false)
      notifications.show({
        title: 'Account Deactivated Successfully',
        message: 'Your account has been successfully deactivated. You can reactivate it anytime!',
        autoClose: 2000,
        color: 'green',
        icon: <IconCheck />,
        onClose() {
          window.location.reload()
        }
      })
    }
  }, [error, isDeleted]);

  if (isDeleted) {
    return (
      <Stack align="center" gap={0}>
        <IconCircleCheckFilled color="green" size={100} />
        <Text ta='center'>Account Deactivated Successfully</Text>
        <Text ta='center' c='dimmed'>Your account has been successfully deactivated. You can reactivate it anytime!</Text>
      </Stack>
    )
  }

  if (isDeleting) {
    return (
      <LoadingOverlay
        visible={true}
        zIndex={1000}
        overlayProps={{
          radius: "sm",
          blur: 2
        }}
      />
    )
  }

  return (
    <>
      <form onSubmit={handleSubmit(submitForm)}>
        <Stack align="center" gap={0}>
          <Text ta='center'>Temporarily Deactivate Account?</Text>
          <Text ta='center' size="sm" c='dimmed'>Temporarily deactivating your account does not delete it, you can reactivate it at any time!</Text>
        </Stack>
        <Button
          type='submit'
          fullWidth
          mt="md"
          fw={500}
          color='red'
        >
          Deactivate my account
        </Button>
      </form>
    </>
  )
}
