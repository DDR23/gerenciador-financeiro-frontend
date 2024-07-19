import { Group, Menu, Paper, Stack, Table, Text, UnstyledButton } from '@mantine/core';
import { IconDotsVertical, IconEdit, IconTrash } from '@tabler/icons-react';

const data = [
  {
    title: 'Foundation',
    amount: 1951,
    deadline: 1951

  },
  {
    title: 'Frankenstein',
    amount: 1818,
    deadline: 1818

  },
  {
    title: 'Solaris',
    amount: 1961,
    deadline: 1961

  },
  {
    title: 'Dune',
    amount: 1965,
    deadline: 1965

  },
  {
    title: 'The Left Hand of Darkness',
    amount: 1969,
    deadline: 1969

  },
  {
    title: 'A Scanner Darkly',
    amount: 1977,
    deadline: 1977

  },
];

// TODO FAZER REQUISIÇÃO DE METAS E MELHORAR LAYOUT DA PAGINA


export default function UserGoal() {
  const rows = data.map((row) => {
    return (
      <Table.Tr key={row.title}>
        <Table.Td>{row.title}</Table.Td>
        <Table.Td ta='end'>{row.amount}</Table.Td>
        <Table.Td ta='end'>{row.deadline}</Table.Td>
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
        <Table verticalSpacing="xs" w='700' striped highlightOnHover withRowBorders={false} >
          <Table.Thead>
            <Table.Tr c='green' >
              <Table.Th>Name</Table.Th>
              <Table.Th ta='end'>Amount</Table.Th>
              <Table.Th ta='end'>Deadline</Table.Th>
              <Table.Th ta='end'></Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Paper>
    </Stack>
  );
}
