import { Group, Paper, SimpleGrid, Text, Title } from "@mantine/core";
import { UserProps } from "../../pages/dashboard/Dashboard";
import { IconArrowDown, IconArrowDownRight, IconArrowUp, IconArrowUpRight, IconWallet } from "@tabler/icons-react";
import FormatPrice from "../../utils/FormatPrice";

interface UserPanelProps {
  user: UserProps | null
}

export default function UserPanel({ user }: UserPanelProps) {

  const usuario = user;

  const entrada = 123998
  const saida = 159757
  const saldo = entrada - saida
  const total = entrada + saida

  //TODO finalizar parte superior do dashboard e desenvolver chart

  return (
    <>
      <Title order={3} mb={20}>Hello, {usuario?.USER_NAME}</Title>
      <SimpleGrid cols={{ base: 1, sm: 3 }}>
        <Paper withBorder p="md" radius="md">
          <Group justify="space-between">
            <Text size="xs" c="dimmed">
              Wallet
            </Text>
            <IconWallet size={20} color="GrayText" />
          </Group>
          <Group align="flex-end" gap="xs" mt={25}>
            <Text size='24px'>{FormatPrice(saldo)}</Text>
            <Text inline c={saldo > 0 ? 'teal' : 'red'} fz="sm" fw={500}>
              {saldo > 0 ? <IconArrowUpRight size={20} /> : <IconArrowDownRight size={20} />}
            </Text>
          </Group>
          <Group fz="xs" c="dimmed" mt={7}>
            total movimentado
            <Text>
              {FormatPrice(total)}
            </Text>
          </Group>
        </Paper>
        <Paper withBorder p="md" radius="md">
          <Group justify="space-between">
            <Text size="xs" c="dimmed">
              Revenue
            </Text>
            <IconArrowDown size={20} color="GrayText" />
          </Group>
          <Group align="flex-end" gap="xs" mt={25}>
            <Text size='24px'>{FormatPrice(entrada)}</Text>
          </Group>
          <Group fz="xs" c="dimmed" mt={7}>
            total movimentado
            <Text>
              {FormatPrice(total)}
            </Text>
          </Group>
        </Paper>
        <Paper withBorder p="md" radius="md">
          <Group justify="space-between">
            <Text size="xs" c="dimmed">
              Expense
            </Text>
            <IconArrowUp size={20} color="GrayText" />
          </Group>
          <Group align="flex-end" gap="xs" mt={25}>
            <Text size='24px'>{FormatPrice(saida)}</Text>
          </Group>
          <Group fz="xs" c="dimmed" mt={7}>
            total movimentado
            <Text>
              {FormatPrice(total)}
            </Text>
          </Group>
        </Paper>
      </SimpleGrid>
    </>
  )
}
