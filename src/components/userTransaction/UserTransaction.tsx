import { Tabs } from '@mantine/core';
import { IconSwitchHorizontal, IconCategory } from '@tabler/icons-react';
import Categories from './Categories';
import Transactions from './Transactions';
import useGet from '../../hooks/useGet';
import Loading from '../_ui/loading/Loading';

export interface UserTransactionProps {
  TRANSACTION_ID: number
  TRANSACTION_DESCRIPTION: string
  TRANSACTION_AMOUNT: number
  TRANSACTION_DATE: string
  TRANSACTION_TYPE: 'revenue' | 'expense'
  FK_USER_ID: number
  FK_CATEGORY_ID: number
}

export default function UserTransaction() {
  const authToken = localStorage.getItem('token');
  const { data } = useGet<UserTransactionProps[]>(`${import.meta.env.VITE_BASE_URL}/transaction/user`, {
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  });

  if (!data) {
    return <Loading />;
  }
  
  return (
    <Tabs variant="default" defaultValue="transactions">
      <Tabs.List bg='#232323'>
        <Tabs.Tab value="transactions" leftSection={<IconSwitchHorizontal size={20} />}>
          Transactions
        </Tabs.Tab>
        <Tabs.Tab value="category" leftSection={<IconCategory size={20} />}>
          Category
        </Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="transactions">
        <Transactions transactions={data} token={authToken} />
      </Tabs.Panel>
      <Tabs.Panel value="category">
        <Categories />
      </Tabs.Panel>
    </Tabs>
  );
}
