import { Anchor, Text } from "@mantine/core";
import { useAuth } from "../../services/AuthContext";

export default function Dashboard() {
  const { logout } = useAuth();
  return (
    <>
      <Text c="dimmed" size="sm" ta="center" mt={20}>
        Want to log out?{' '}
        <Anchor size="sm" component="button" onClick={logout}>
          Logout
        </Anchor>
      </Text>
    </>
  )
}