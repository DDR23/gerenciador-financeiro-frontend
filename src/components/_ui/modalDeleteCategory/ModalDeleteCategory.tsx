import { Button, Stack, Text } from "@mantine/core";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconCircleCheckFilled, IconX } from "@tabler/icons-react";
import useDelete from "../../../hooks/useDelete";
import { schemaCategory } from "../../../schemas/schemaCategory";

interface CategoryPutValues {
  CATEGORY_DELETED?: boolean
}

interface ModalDeleteCategoryProps {
  categoryId: number;
  token: string | null;
}

export default function ModalDeleteCategory({ categoryId, token }: ModalDeleteCategoryProps) {
  const { handleSubmit } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schemaCategory)
  });

  const [isDelete, setIsDelete] = useState(false);
  const { isDeleted, error } = useDelete(`${import.meta.env.VITE_BASE_URL}/category/delete/${categoryId}`, isDelete, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const submitForm: SubmitHandler<CategoryPutValues> = () => {
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
        title: 'Category deleted Successfully',
        message: 'This category has been successfully deleted!',
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
        <Text ta='center'>Category deleted Successfully</Text>
        <Text ta='center' c='dimmed'>This category has been successfully deleted!</Text>
      </Stack>
    )
  }

  return (
    <>
      <form onSubmit={handleSubmit(submitForm)}>
        <Stack align="center" gap={0}>
          <Text ta='center'>Delete category?</Text>
          <Text ta='center' size="sm" c='dimmed'>Do you want to delete this category?</Text>
        </Stack>
        <Button
          type='submit'
          fullWidth
          mt="md"
          fw={500}
          color='red'
        >
          Delete category
        </Button>
      </form>
    </>
  )
}
