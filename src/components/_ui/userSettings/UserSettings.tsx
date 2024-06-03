import { Button, Paper, Text } from "@mantine/core";
import ProviderUser from "../../../services/ProviderUser";
import { IconEdit } from "@tabler/icons-react";

export default function UserSettings({ userName, userEmail }: any) {
  return (
    <>
      <Paper radius="md" withBorder maw='90vw' mx='auto' w='30rem' p="lg" >
        <ProviderUser name={userName} size={120} />
        <Text ta="center" fz="lg" fw={500} mt="md">
          {userName}
        </Text>
        <Text ta="center" c="dimmed" fz="sm">
          {userEmail}
        </Text>
        <Button leftSection={<IconEdit />} variant="default" fullWidth mt="md">
          Edit User
        </Button>
      </Paper>
    </>
  )
}