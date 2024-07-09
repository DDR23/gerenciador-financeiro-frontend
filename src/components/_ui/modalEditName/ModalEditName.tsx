import { Button, TextInput } from "@mantine/core";
import { schemaEditName } from "../../../schemas/schemaEditName";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";

interface ModalEditNameProps {
  USER_NAME?: string;
}

export default function ModalEditName() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schemaEditName)
  });

  const submitForm: SubmitHandler<ModalEditNameProps> = (formData) => {
    console.log(formData)
    // setData(formData);
    // setPosted(true);
  };

  return (
    <>
      <form onSubmit={handleSubmit(submitForm)}>
        <TextInput
          {...register('USER_NAME')}
          label="Name"
          placeholder="New name"
          required
          error={errors.USER_NAME?.message}
        />
        <Button type='submit' fullWidth mt="xl">
          Salvar
        </Button>
      </form>
    </>
  )
}