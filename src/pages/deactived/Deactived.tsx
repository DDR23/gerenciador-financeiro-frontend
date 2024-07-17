import { AppShell, Button, Center, Group, Image, LoadingOverlay, Menu, Stack, Text, UnstyledButton } from "@mantine/core";
import ProviderUser from "../../utils/ProviderUser";
import usePut from "../../hooks/usePut";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { schemaEditUser } from "../../schemas/schemaEditUser";
import { yupResolver } from "@hookform/resolvers/yup";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconCircleCheckFilled, IconLogout, IconX } from "@tabler/icons-react";
import { useAuth } from "../../contexts/AuthContext";

interface UserProps {
  USER_ID: number;
  USER_NAME: string;
  USER_EMAIL: string;
  USER_ADMIN: boolean;
  USER_DELETED: boolean;
}

interface PageDeactivedProps {
  data: UserProps | null;
  token: string | null;
}

interface UserPutValues {
  USER_DELETED?: boolean;
}

export default function PageDeactived({ data, token }: PageDeactivedProps) {
  const { handleSubmit } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schemaEditUser)
  });

  const { logout } = useAuth();
  const userName = data?.USER_NAME;
  const userId = data?.USER_ID;
  const [posted, setPosted] = useState(false);
  const { isUpdated, isUpdating, error } = usePut(`${import.meta.env.VITE_BASE_URL}/user/edit/${userId}`, { USER_DELETED: false }, posted, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const submitForm: SubmitHandler<UserPutValues> = () => {
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
        message: 'Account activated successfully.',
        autoClose: 2000,
        color: 'green',
        icon: <IconCheck />,
        onClose() {
          window.location.reload()
        }
      })
    }
  }, [error, isUpdated]);

  if (isUpdating) {
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

  const activedAccount = () => (
    <Stack justify="center" align="center" h='100%' gap={0}>
      <IconCircleCheckFilled color="green" size={100} />
      <Text ta='center'>Account activated successfully</Text>
      <Text ta='center' c='dimmed'>Your account has been successfully activated.</Text>
    </Stack>
  )

  return (
    <AppShell
      header={{ height: 60 }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <Image src='coin.png' style={{
              width: '2rem'
            }} />
          </Group>
          <Group>
            <Menu>
              <Menu.Target>
                <Group>
                  <Text c="dimmed" size="sm" inline >Helo, {userName}</Text>
                  <UnstyledButton>
                    <ProviderUser name='teste' size='2.3rem' />
                  </UnstyledButton>
                </Group>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item mr='lg' leftSection={<IconLogout size={20} />} onClick={() => logout()} >Sair</Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Main h='100vh'>
        {isUpdated ? (activedAccount()) : (
        <Stack justify="center" h='100%' gap={0}>
          <Text ta='center' size="lg">Hello, {userName}</Text>
          <Text ta='center' c='dimmed'>We miss you around here, we'd be happy to have you back!!!</Text>
          <Text ta='center' c='dimmed'>Would you like to activate your account?</Text>
          <Center>
            <form onSubmit={handleSubmit(submitForm)}>
              <Button
                type='submit'
                mt="md"
                fw={500}
              >
                Activate my account
              </Button>
            </form>
          </Center>
        </Stack>
        )}
      </AppShell.Main>
    </AppShell>
  )
}
