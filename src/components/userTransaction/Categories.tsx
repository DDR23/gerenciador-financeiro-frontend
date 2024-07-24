import { Group, Menu, Paper, ScrollArea, Stack, Table, UnstyledButton } from "@mantine/core";
import { IconDotsVertical, IconTrash } from '@tabler/icons-react';
import useGet from '../../hooks/useGet';
import Loading from '../_ui/loading/Loading';

interface CategoriesProps {
  CATEGORY_ID: number;
  CATEGORY_NAME: string;
}


export default function Categories() {
  const authToken = localStorage.getItem('token')

  const { data } = useGet<CategoriesProps[]>(`${import.meta.env.VITE_BASE_URL}/category/user`, {
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  })

  if (!data) {
    return <Loading />;
  }

  const rows = data.map((row) => {
    return (
      <Table.Tr key={row.CATEGORY_ID}>
        <Table.Td>{row.CATEGORY_NAME}</Table.Td>
        <Table.Td ta='end'>
          <Group justify='end'>
            <Menu shadow="md">
              <Menu.Target>
                <UnstyledButton display='flex'>
                  <IconDotsVertical size={20} />
                </UnstyledButton>
              </Menu.Target>
              <Menu.Dropdown>
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
      <Paper w='100%' withBorder radius='md' style={{ overflow: 'hidden' }}>
        {data && data.length > 0 ? (
          < ScrollArea h='60vh' offsetScrollbars scrollbarSize={8} >
            <Table verticalSpacing="xs" striped highlightOnHover withRowBorders={false} >
              <Table.Thead pos='sticky' bg='#232323'>
                <Table.Tr>
                  <Table.Th>Name</Table.Th>
                  <Table.Th ta='end'></Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>{rows}</Table.Tbody>
            </Table>
          </ScrollArea>
        ) : (
          <Table h='60vh' verticalSpacing="xs" highlightOnHover withRowBorders={false} ta='center'>
            <Table.Tbody>
              <Table.Tr>
                <Table.Td>Empty...</Table.Td>
              </Table.Tr>
            </Table.Tbody>
          </Table>
        )}
      </Paper>
    </Stack >
  )
}
