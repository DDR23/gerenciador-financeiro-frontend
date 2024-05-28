import { TextInput, PasswordInput, Button } from '@mantine/core';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schemaSignup } from '../../../schemas/schemaSignup';
import PasswordStrength from '../passwordStrength/PasswordStrength';

interface SigninFormValues {
  USER_EMAIL?: string;
  USER_NAME?: string;
  USER_PASSWORD?: string;
}

export default function ModalSignin() {
  const { register, handleSubmit, reset, formState: { errors }, watch } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schemaSignup)
  });

  const watchPassword = watch("USER_PASSWORD", "");

  const submitForm = (data: SigninFormValues) => {
    console.log(data);
    reset();
  };
  
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
        <TextInput
          {...register('USER_NAME')}
          label="Name"
          placeholder="Your Name"
          required
          error={errors.USER_NAME?.message}
        />
        <PasswordInput
          {...register('USER_PASSWORD')}
          label="Password"
          placeholder="Your password"
          required
          error={errors.USER_PASSWORD && errors.USER_PASSWORD.type === "required" ? errors.USER_PASSWORD.message : undefined}
        />
        <PasswordStrength value={watchPassword} />
        <Button type='submit' fullWidth mt="xl">
          Register
        </Button>
      </form>
    </>
  );
}
