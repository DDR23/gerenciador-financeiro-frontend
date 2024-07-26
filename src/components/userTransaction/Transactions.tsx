import { Group, Menu, Modal, Paper, ScrollArea, Stack, Table, UnstyledButton } from "@mantine/core";
import { IconDotsVertical, IconListDetails, IconTrash } from '@tabler/icons-react';
import useGet from '../../hooks/useGet';
import Loading from '../_ui/loading/Loading';
import { useDisclosure } from "@mantine/hooks";
import { useState } from 'react';
import FormatDate from "../../utils/FormatDate";
import FormatPrice from "../../utils/FormatPrice";
import ModalDeleteTransaction from "../_ui/ModalDeleteTransaction/ModalDeleteTransaction";
import ModalDetailsTransaction from "../_ui/ModalDetailsTransaction/ModalDetailsTransaction";

export interface TransactionsProps {
  TRANSACTION_ID?: number
  TRANSACTION_DESCRIPTION?: string
  TRANSACTION_AMOUNT?: number
  TRANSACTION_DATE?: string
  TRANSACTION_TYPE?: 'revenue' | 'expense'
  FK_USER_ID?: number
  FK_CATEGORY_ID?: number
}

export default function Transactions() {
  const authToken = localStorage.getItem('token');
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedTransaction, setSelectedTransaction] = useState<TransactionsProps>();
  const [modalContent, setModalContent] = useState<'details' | 'delete' | null>(null);

  const { data } = useGet<TransactionsProps[]>(`${import.meta.env.VITE_BASE_URL}/transaction/user`, {
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  });

  if (!data) {
    return <Loading />;
  }

  const handleOpen = (transaction: TransactionsProps, content: 'details' | 'delete') => {
    setSelectedTransaction(transaction);
    setModalContent(content);
    open();
  };

  const rows = data.map((row) => (
    <Table.Tr key={row.TRANSACTION_ID}>
      <Table.Td>{row.TRANSACTION_DESCRIPTION}</Table.Td>
      <Table.Td ta='end'>{FormatPrice(row.TRANSACTION_AMOUNT)}</Table.Td>
      <Table.Td ta='end'>{FormatDate(row.TRANSACTION_DATE)}</Table.Td>
      <Table.Td ta='end'>{row.TRANSACTION_TYPE}</Table.Td>
      <Table.Td ta='end'>
        <Group justify='end'>
          <Menu shadow="md">
            <Menu.Target>
              <UnstyledButton display='flex'>
                <IconDotsVertical size={20} />
              </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item onClick={() => handleOpen(row, 'details')} leftSection={<IconListDetails size={20} />}>
                Details
              </Menu.Item>
              <Menu.Item onClick={() => handleOpen(row, 'delete')} c="#e03131" leftSection={<IconTrash size={20} />}>
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
              <Table.Thead pos='sticky' bg='#232323'>
                <Table.Tr>
                  <Table.Th>Name</Table.Th>
                  <Table.Th ta='end'>Amount</Table.Th>
                  <Table.Th ta='end'>Date</Table.Th>
                  <Table.Th ta='end'>Type</Table.Th>
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
      {selectedTransaction !== null && modalContent !== null && (
        <Modal
          opened={opened}
          onClose={close}
          withCloseButton={false}
          overlayProps={{
            backgroundOpacity: 0.55,
            blur: 3
          }}
        >
          {modalContent === 'details' && <ModalDetailsTransaction token={authToken} transaction={selectedTransaction} />}
          {modalContent === 'delete' && <ModalDeleteTransaction token={authToken} transaction={selectedTransaction} />}
        </Modal>
      )}
    </Stack>
  );
}
