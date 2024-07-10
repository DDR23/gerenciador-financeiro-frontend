import { AppShell, Burger, Button, Group, Image, Tabs, Text } from "@mantine/core";
import { useAuth } from "../../contexts/AuthContext"
import { IconCategory2, IconHome, IconLogout, IconSettings, IconSwitchHorizontal, IconTargetArrow } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import ProviderUser from "../../utils/ProviderUser";
import UserPanel from "../../components/userPanel/UserPanel";
import UserGoal from "../../components/userGoal/UserGoal";
import UserCategory from "../../components/userCategory/UserCategory";
import UserTransaction from "../../components/userTransaction/UserTransaction";
import UserSettings from "../../components/userSettings/UserSettings";
import { useEffect, useState } from "react";
import useGet from "../../hooks/useGet";

interface UserProps {
  USER_ID: number;
  USER_NAME: string;
  USER_EMAIL: string;
}

export default function Dashboard() {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(false);
  const { logout } = useAuth();
  const authToken = localStorage.getItem('token')

  const [selectedTab, setSelectedTab] = useState<any>(() => {
    return localStorage.getItem('selectedTab') || 'dashboard';
  });

  useEffect(() => {
    localStorage.setItem('selectedTab', selectedTab);
  }, [selectedTab]);

  const { data } = useGet<UserProps>(`${import.meta.env.VITE_BASE_URL}/me`, {
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  });

  const userName = data ? data.USER_NAME : '';

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !mobileOpened, desktop: !desktopOpened } }}
      padding="md"
    >
      <Tabs
        value={selectedTab}
        onChange={setSelectedTab}
        orientation="vertical"
      >
        <AppShell.Header>
          <Group h="100%" px="md" justify="space-between">
            <Group>
              <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
              <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm" />
              <Image src='coin.png' style={{
                width: '2rem'
              }} />
            </Group>
            <Group>
              <Text c="dimmed" size="sm" inline >Welcome, {userName}</Text>
              <ProviderUser name={userName} size='2.3rem' />
            </Group>
          </Group>
        </AppShell.Header>
        <AppShell.Navbar p="md" style={{
          justifyContent: 'space-between'
        }}>
          <Tabs.List>
            <Tabs.Tab value="dashboard" leftSection={<IconHome />}>Dashboard</Tabs.Tab>
            <Tabs.Tab value="goal" leftSection={<IconTargetArrow />}>Goals</Tabs.Tab>
            <Tabs.Tab value="category" leftSection={<IconCategory2 />}>Category</Tabs.Tab>
            <Tabs.Tab value="transaction" leftSection={<IconSwitchHorizontal />}>Transaction</Tabs.Tab>
            <Tabs.Tab value="settings" leftSection={<IconSettings />}>Settings</Tabs.Tab>
          </Tabs.List>
          <Group >
            <Button
              onClick={() => logout()}
              leftSection={<IconLogout />}
              fullWidth
              variant="outline"
              color="#e03131"
              fw='200'
            >
              Logout
            </Button>
          </Group>
        </AppShell.Navbar>
        <AppShell.Main w='100vw' h='100vh'>
          <Tabs.Panel value="dashboard"><UserPanel /></Tabs.Panel>
          <Tabs.Panel value="goal"><UserGoal /></Tabs.Panel>
          <Tabs.Panel value="category"><UserCategory /></Tabs.Panel>
          <Tabs.Panel value="transaction"><UserTransaction /></Tabs.Panel>
          <Tabs.Panel h='100%' value="settings">
            <Group display='flex' h='100%'>
              {data ? <UserSettings user={data} /> : <>loading...</>}
            </Group>
          </Tabs.Panel>
        </AppShell.Main>
      </Tabs>
    </AppShell>
  )
}