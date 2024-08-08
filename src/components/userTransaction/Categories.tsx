import { Group, Menu, Modal, Paper, ScrollArea, Stack, Table, Text, UnstyledButton } from "@mantine/core";
import { IconDotsVertical, IconTrash } from '@tabler/icons-react';
import useGet from '../../hooks/useGet';
import Loading from '../_ui/loading/Loading';
import { useDisclosure } from "@mantine/hooks";
import ModalDeleteCategory from "../_ui/modalDeleteCategory/ModalDeleteCategory";
import { useState } from 'react';

export interface CategoryProps {
  CATEGORY_ID: number
  CATEGORY_NAME: string
  FK_USER_ID: number
}

export default function Categories() {
  const authToken = localStorage.getItem('token');
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const { data } = useGet<CategoryProps[]>(`${import.meta.env.VITE_BASE_URL}/category/user`, {
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  });

  if (!data) {
    return <Loading />;
  }

  const handleDeleteClick = (categoryId: number) => {
    setSelectedCategory(categoryId);
    open();
  };

  const rows = data.map((row) => (
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
              <Menu.Item onClick={() => handleDeleteClick(row.CATEGORY_ID)} c="#e03131" leftSection={<IconTrash size={20} />}>
                Delete
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Stack align='center' justify='center' pt='xl'>
      <Paper w='100%' withBorder radius='md' style={{ overflow: 'hidden' }}>
        {data && data.length > 0 ? (
          <ScrollArea h='60vh' offsetScrollbars scrollbarSize={8}>
            <Table verticalSpacing="xs" striped highlightOnHover withRowBorders={false}>
              <Table.Thead pos='sticky' style={{ backdropFilter: `blur(100px)` }}>
                <Table.Tr>
                  <Table.Th>Name</Table.Th>
                  <Table.Th ta='end'></Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>{rows}</Table.Tbody>
            </Table>
          </ScrollArea>
        ) : (
          <Table h='60vh' verticalSpacing="xs" withRowBorders={false} ta='center'>
            <Table.Tbody>
              <Table.Tr>
                <Table.Td><Text c='dimmed'>No categories...</Text></Table.Td>
              </Table.Tr>
            </Table.Tbody>
          </Table>
        )}
      </Paper>
      {selectedCategory !== null && (
        <Modal
          opened={opened}
          onClose={close}
          withCloseButton={false}
          overlayProps={{
            backgroundOpacity: 0.55,
            blur: 3
          }}
        >
          <ModalDeleteCategory categoryId={selectedCategory} token={authToken} />
        </Modal>
      )}
    </Stack>
  );
}
