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
  const { register, handleSubmit } = useForm({
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
      const tokenUser = token?.token as string;
      localStorage.setItem('tokenUser', tokenUser)
      const tokenAdmin = token?.tokenAdmin as string;
      if (tokenAdmin) {
        localStorage.setItem('tokenAdmin', tokenAdmin)
      }
      
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
          label="Email"
          placeholder="your@email.com"
        />
        <PasswordInput
          {...register('USER_PASSWORD')}
          label="Password"
          placeholder="Your password"
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
