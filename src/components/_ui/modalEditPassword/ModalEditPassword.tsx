import { Button, PasswordInput, Stack, Text, TextInput } from "@mantine/core";
import { schemaEditUser } from "../../../schemas/schemaEditUser";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import usePut from "../../../hooks/usePut";
import { useEffect, useState } from "react";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconCircleCheckFilled, IconX } from "@tabler/icons-react";
import PasswordStrength, { requirements } from "../passwordStrength/PasswordStrength";
import Loading from "../loading/Loading";

interface UserPutValues {
  USER_EMAIL?: string;
  USER_PASSWORD?: string;
}

interface ModalEditPasswordProps {
  userEmail: string;
  userId: number;
  token: string | null;
}

function validatePassword(password: string): string[] {
  const errors = [];
  if (password.length <= 5) {
    errors.push("Password must be at least 6 characters long");
  }
  requirements.forEach(requirement => {
    if (!requirement.re.test(password)) {
      errors.push(requirement.label);
    }
  });
  return errors;
}

export default function ModalEditPassword({ userId, token, userEmail }: ModalEditPasswordProps) {
  const { register, handleSubmit, watch } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schemaEditUser)
  });

  const watchPassword = watch("USER_PASSWORD", "");
  const [posted, setPosted] = useState(false);
  const [data, setData] = useState<UserPutValues>({ USER_EMAIL: userEmail, USER_PASSWORD: '' });
  const { isUpdated, isUpdating, error } = usePut(`${import.meta.env.VITE_BASE_URL}/user/edit/${userId}`, data, posted, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const submitForm: SubmitHandler<UserPutValues> = (formData) => {
    const passwordErrors = validatePassword(formData.USER_PASSWORD || '');
    if (passwordErrors.length > 0) {
      notifications.show({
        title: 'Invalid Password',
        message: `${passwordErrors.join(', ')}`,
        autoClose: 7000,
        color: 'red',
        icon: <IconX />,
      });
      return;
    }
    setData({ ...formData, USER_EMAIL: userEmail });
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
        message: 'Password changed successfully.',
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
        <Text ta='center' c='dimmed'>Password changed successfully</Text>
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
          {...register('USER_EMAIL')}
          value={userEmail}
          autoComplete="username"
          readOnly
          disabled
        />
        <PasswordInput
          {...register('USER_PASSWORD')}
          autoComplete="new-password"
          label="New password"
          placeholder="Your new password"
          required
        />
        <PasswordStrength value={watchPassword || ''} />
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
