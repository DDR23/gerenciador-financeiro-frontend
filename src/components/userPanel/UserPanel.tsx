import { Group, Paper, SimpleGrid, Text, Title } from "@mantine/core";
import { UserProps } from "../../pages/dashboard/Dashboard";
import { IconArrowDown, IconArrowUp, IconWallet } from "@tabler/icons-react";
import FormatPrice from "../../utils/FormatPrice";
import useGet from "../../hooks/useGet";
import { UserTransactionProps } from "../userTransaction/UserTransaction";
import Loading from "../_ui/loading/Loading";

interface UserPanelProps {
  user: UserProps | null
}

export default function UserPanel({ user }: UserPanelProps) {

  const authToken = localStorage.getItem('token');
  const { data } = useGet<UserTransactionProps[]>(`${import.meta.env.VITE_BASE_URL}/transaction/user`, {
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  });

  if (!data) {
    return <Loading />;
  }

  const totalRevenuesValue = data
    .filter(transaction => transaction.TRANSACTION_TYPE === 'revenue')
    .reduce((sum, revenue) => sum + revenue.TRANSACTION_AMOUNT, 0)

  const totalExpenseValue = data
    .filter(transaction => transaction.TRANSACTION_TYPE === 'expense')
    .reduce((sum, revenue) => sum + revenue.TRANSACTION_AMOUNT, 0)

  const balance = totalRevenuesValue - totalExpenseValue;

  return (
    <>
      <Title order={3} mb={20}>Hello, {user?.USER_NAME}</Title>
      <SimpleGrid cols={{ base: 1, sm: 3 }}>
        <Paper withBorder p="md" radius="md">
          <Group justify="space-between">
            <Text size="xs" c="dimmed">
              Wallet
            </Text>
            <IconWallet size={20} color="GrayText" />
          </Group>
          <Group align="flex-end" gap="xs" mt={15}>
            <Text size='24px'>{FormatPrice(balance)}</Text>
          </Group>
        </Paper>
        <Paper withBorder p="md" radius="md">
          <Group justify="space-between">
            <Text size="xs" c="dimmed">
              Revenue
            </Text>
            <IconArrowDown size={20} color="GrayText" />
          </Group>
          <Group align="flex-end" gap="xs" mt={15}>
            <Text size='24px'>{FormatPrice(totalRevenuesValue)}</Text>
          </Group>
        </Paper>
        <Paper withBorder p="md" radius="md">
          <Group justify="space-between">
            <Text size="xs" c="dimmed">
              Expense
            </Text>
            <IconArrowUp size={20} color="GrayText" />
          </Group>
          <Group align="flex-end" gap="xs" mt={15}>
            <Text size='24px'>{FormatPrice(totalExpenseValue)}</Text>
          </Group>
        </Paper>
      </SimpleGrid>
    </>
  )
}
