import { Button, LoadingOverlay, PasswordInput, rem } from "@mantine/core";
import { schemaEditName } from "../../../schemas/schemaEditUser";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import usePut from "../../../hooks/usePut";
import { useEffect, useState } from "react";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconCircleCheckFilled, IconX } from "@tabler/icons-react";
import PasswordStrength, { requirements } from "../passwordStrength/PasswordStrength";

interface UserPutValues {
  USER_PASSWORD?: string;
}

interface ModalEditPasswordProps {
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

export default function ModalEditPassword({ userId, token }: ModalEditPasswordProps) {
  const { register, handleSubmit, watch } = useForm({
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
    const passwordErrors = validatePassword(formData.USER_PASSWORD || '');
    if (passwordErrors.length > 0) {
      notifications.show({
        title: 'Invalid Password',
        message: `Please address the following issues: ${passwordErrors.join(', ')}`,
        autoClose: 7000,
        color: 'red',
        icon: <IconX />,
      });
      return;
    }
    console.log('data', data)
    console.log('formData', formData)
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
        <PasswordInput
          {...register('USER_PASSWORD')}
          label="New password"
          autoComplete="password"
          placeholder="Your new password"
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