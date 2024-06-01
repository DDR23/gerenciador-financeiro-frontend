import { AppShell, Burger, Button, Group, Image, Tabs, Text } from "@mantine/core";
import { useAuth } from "../../services/AuthContext"
import { IconCategory2, IconHome, IconLogout, IconSettings, IconSwitchHorizontal, IconTargetArrow } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import ProviderUser from "../../services/ProviderUser";
import UserPanel from "../../components/_ui/userPanel/UserPanel";
import UserGoal from "../../components/_ui/userGoal/UserGoal";
import UserCategory from "../../components/_ui/userCategory/UserCategory";
import UserTransaction from "../../components/_ui/userTransaction/UserTransaction";
import UserSettings from "../../components/_ui/userSettings/UserSettings";
import { useEffect, useState } from "react";
import useGet from "../../services/useGet";

export default function Dashboard() {
  const authToken = localStorage.getItem('token')
  const { logout } = useAuth();

  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  const [selectedTab, setSelectedTab] = useState<any>(() => {
    const storedTab = localStorage.getItem('selectedTab');
    return storedTab || 'dashboard';
  });
  
  const { data } = useGet(`${import.meta.env.VITE_BASE_URL}/me`, {
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  });
  
  const userName = data ? data.USER_NAME: '';

  useEffect(() => {
    localStorage.setItem('selectedTab', selectedTab);
  }, [selectedTab]);

  return (
    <>
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
                <ProviderUser name={userName} />
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
              <Button onClick={() => logout()} fullWidth leftSection={<IconLogout />} >
                Logout
              </Button>
            </Group>
          </AppShell.Navbar>
          <AppShell.Main>
            <Tabs.Panel value="dashboard"><UserPanel /></Tabs.Panel>
            <Tabs.Panel value="goal"><UserGoal /></Tabs.Panel>
            <Tabs.Panel value="category"><UserCategory /></Tabs.Panel>
            <Tabs.Panel value="transaction"><UserTransaction /></Tabs.Panel>
            <Tabs.Panel value="settings"><UserSettings /></Tabs.Panel>
          </AppShell.Main>
        </Tabs>
      </AppShell>
    </>
  )
}