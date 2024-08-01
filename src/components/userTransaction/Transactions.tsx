import { Badge, Group, Menu, Modal, Paper, ScrollArea, Stack, Table, UnstyledButton } from "@mantine/core";
import { IconDotsVertical, IconTrash } from '@tabler/icons-react';
import { useDisclosure } from "@mantine/hooks";
import { useState } from 'react';
import FormatDate from "../../utils/FormatDate";
import FormatPrice from "../../utils/FormatPrice";
import ModalDeleteTransaction from "../_ui/ModalDeleteTransaction/ModalDeleteTransaction";
import { UserTransactionProps } from "./UserTransaction";
import useGet from "../../hooks/useGet";

interface CategoryProps {
  CATEGORY_ID?: number;
  CATEGORY_NAME?: string;
  FK_USER_ID?: number;
}

interface TransactionsProps {
  transactions: UserTransactionProps[]
  token: string | null
}

export default function Transactions({ transactions, token }: TransactionsProps) {

  const [opened, { open, close }] = useDisclosure(false);
  const [selectedTransaction, setSelectedTransaction] = useState<number>();

  const { data } = useGet<CategoryProps[]>(`${import.meta.env.VITE_BASE_URL}/category/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const getCategoryName = (categoryId?: number) => {
    if (!data || !categoryId) return 'Unknown';
    const category = data.find(cat => cat.CATEGORY_ID === categoryId);
    return category ? category.CATEGORY_NAME : 'Unknown';
  };

  const handleOpen = (transaction: number) => {
    setSelectedTransaction(transaction);
    open();
  };

  const rows = transactions.map((row) => (
    <Table.Tr key={row.TRANSACTION_ID}>
      <Table.Td>{row.TRANSACTION_DESCRIPTION}</Table.Td>
      <Table.Td ta='end'>{FormatPrice(row.TRANSACTION_AMOUNT)}</Table.Td>
      <Table.Td ta='end'>{FormatDate(row.TRANSACTION_DATE)}</Table.Td>
      <Table.Td ta='end'><Badge color={row.TRANSACTION_TYPE === 'revenue' ? 'green' : 'red'}>{row.TRANSACTION_TYPE}</Badge></Table.Td>
      <Table.Td ta='end'>{getCategoryName(row.FK_CATEGORY_ID)}</Table.Td>
      <Table.Td ta='end'>
        <Group justify='end'>
          <Menu shadow="md">
            <Menu.Target>
              <UnstyledButton display='flex'>
                <IconDotsVertical size={20} />
              </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item onClick={() => handleOpen(row.TRANSACTION_ID || 0)} c="#e03131" leftSection={<IconTrash size={20} />}>
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
        {transactions && transactions.length > 0 ? (
          <ScrollArea h='60vh' offsetScrollbars scrollbarSize={8}>
            <Table verticalSpacing="xs" striped highlightOnHover withRowBorders={false}>
              <Table.Thead pos='sticky' bg='#232323'>
                <Table.Tr>
                  <Table.Th>Name</Table.Th>
                  <Table.Th ta='end'>Amount</Table.Th>
                  <Table.Th ta='end'>Date</Table.Th>
                  <Table.Th ta='end'>Type</Table.Th>
                  <Table.Th ta='end'>Category</Table.Th>
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
      <Modal
        opened={opened}
        onClose={close}
        withCloseButton={false}
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3
        }}
      >
        <ModalDeleteTransaction token={token} transactionId={selectedTransaction} />
      </Modal>
    </Stack>
  );
}
