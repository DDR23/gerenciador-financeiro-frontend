import { Tabs } from '@mantine/core';
import { IconSwitchHorizontal, IconCategory } from '@tabler/icons-react';
import Categories from './Categories';
import Transactions from './Transactions';

export default function UserTransaction() {
  
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
        <Transactions />
      </Tabs.Panel>
      <Tabs.Panel value="category">
        <Categories />
      </Tabs.Panel>
    </Tabs>
  );
}
