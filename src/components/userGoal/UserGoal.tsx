import { Group, Menu, Paper, Stack, Table, Text, UnstyledButton } from '@mantine/core';
import { IconDotsVertical, IconEdit, IconTrash } from '@tabler/icons-react';
import useGet from '../../hooks/useGet';
import Loading from '../_ui/loading/Loading';
import FormatDate from '../../utils/FormatDate';
import FormatPrice from '../../utils/FormatPrice';

// TODO FAZER REQUISIÇÃO DE METAS E MELHORAR LAYOUT DA PAGINA

interface GoalProps {
  FK_USER_ID: number;
  GOAL_AMOUNT: number;
  GOAL_DEADLINE: string;
  GOAL_ID: number;
  GOAL_NAME: string;
}

interface UserGoalProps {
  userId: number | null
}

export default function UserGoal({ userId }: UserGoalProps) {
  const authToken = localStorage.getItem('token')

  const { data } = useGet<GoalProps[]>(`${import.meta.env.VITE_BASE_URL}/goal/user/${userId}`, {
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  })

  if (!data) {
    return <Loading />;
  }

  const rows = data.map((row) => {
    return (
      <Table.Tr key={row.GOAL_ID}>
        <Table.Td>{row.GOAL_NAME}</Table.Td>
        <Table.Td ta='end'>{FormatPrice(row.GOAL_AMOUNT)}</Table.Td>
        <Table.Td ta='end'>{FormatDate(row.GOAL_DEADLINE)}</Table.Td>
        <Table.Td ta='end'>
          <Group justify='end'>
            <Menu shadow="md">
              <Menu.Target>
                <UnstyledButton display='flex'>
                  <IconDotsVertical size={20} />
                </UnstyledButton>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item onClick={() => console.log('editar')} leftSection={<IconEdit size={20} />}>
                  Edit
                </Menu.Item>
                <Menu.Item onClick={() => console.log('deletar')} c="#e03131" leftSection={<IconTrash size={20} />}>
                  Delete
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Table.Td>
      </Table.Tr>
    );
  });

  return (
    <Stack align='center' justify='center' pt='xl'>
      <Text size='lg'>Minhas metas</Text>
      <Paper withBorder radius='md' style={{ overflow: 'hidden' }}>
        {data && data.length > 0 ? (
          <Table verticalSpacing="xs" w='900' striped highlightOnHover withRowBorders={false} >
            <Table.Thead>
              <Table.Tr  >
                <Table.Th>Name</Table.Th>
                <Table.Th ta='end'>Amount</Table.Th>
                <Table.Th ta='end'>Deadline</Table.Th>
                <Table.Th ta='end'></Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        ) : (
          <Table verticalSpacing="xs" w='900' striped highlightOnHover withRowBorders={false} ta='center'>
            <Table.Tbody>
              <Table.Tr>
                <Table.Td>Vazio por enquanto...</Table.Td>
              </Table.Tr>
            </Table.Tbody>
          </Table>
        )}
      </Paper>
    </Stack>
  );
}
