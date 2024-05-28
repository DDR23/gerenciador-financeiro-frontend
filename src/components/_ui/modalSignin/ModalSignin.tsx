import { TextInput, PasswordInput, Button } from '@mantine/core';
import { schemaSignin } from '../../../schemas/schemaSignin';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

interface SigninFormValues {
  USER_EMAIL: string;
  USER_PASSWORD?: string;
}

export default function ModalSignin() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schemaSignin)
  })

  const submitForm = (data: SigninFormValues) => {
    console.log(data)
    reset()
  }
  
  return (
    <>
      <form onSubmit={handleSubmit(submitForm)}>
        <TextInput
          {...register('USER_EMAIL')}
          label="Email"
          placeholder="your@email.com"
          required
          error={errors.USER_EMAIL?.message}
          />
        <PasswordInput
          {...register('USER_PASSWORD')}
          label="Password"
          placeholder="Your password"
          required
        />
        <Button type='submit' fullWidth mt="xl">
          Sign in
        </Button>
      </form>
    </>
  );
}