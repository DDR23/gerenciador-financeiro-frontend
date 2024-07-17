import { TextInput, PasswordInput, Button, LoadingOverlay, Text } from '@mantine/core';
import { schemaSignin } from '../../../schemas/schemaSignin';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '../../../contexts/AuthContext'
import { useEffect, useState } from 'react';
import usePostAuth from '../../../hooks/usePostAuth';

interface SigninFormValues {
  USER_EMAIL?: string;
  USER_PASSWORD?: string;
}

export default function ModalSignin() {
  const { login } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schemaSignin)
  })

  const [posted, setPosted] = useState(false);
  const [data, setData] = useState<SigninFormValues>({ USER_EMAIL: '', USER_PASSWORD: '' });

  const { token, isPosted, isPosting, error } = usePostAuth<SigninFormValues>(`${import.meta.env.VITE_BASE_URL}/user/login`, data, posted);

  const submitForm: SubmitHandler<SigninFormValues> = (formData) => {
    setData(formData);
    setPosted(true);
  };

  useEffect(() => {
    if (error) {
      setPosted(false)
    }
    if (isPosted) {
      setPosted(false)
      localStorage.setItem('token', token?.token as string)
      localStorage.setItem('tokenAdmin', token?.tokenAdmin as string)
      login();
    }
  }, [error, isPosted]);

  if (isPosting) {
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
        <TextInput
          {...register('USER_EMAIL')}
          autoComplete='username'
          label="Email"
          placeholder="your@email.com"
          required
          error={errors.USER_EMAIL?.message}
        />
        <PasswordInput
          {...register('USER_PASSWORD')}
          autoComplete='current-password'
          label="Password"
          placeholder="Your password"
          required
          error={errors.USER_PASSWORD?.message}
        />
        {error && (
          <Text c="red" size="sm" ta="center" mt={10}>
            {error.message}
          </Text>
        )}
        <Button type='submit' fullWidth mt="xl" fw={500}>
          Sign in
        </Button>
      </form>
    </>
  );
}
