import { AppShell, Burger, Button, Group, Image, Menu, Tabs, Text, UnstyledButton } from "@mantine/core";
import { useAuth } from "../../contexts/AuthContext"
import { IconHome, IconLogout, IconSettings, IconSwitchHorizontal, IconTargetArrow } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import ProviderUser from "../../utils/ProviderUser";
import UserPanel from "../../components/userPanel/UserPanel";
import UserGoal from "../../components/userGoal/UserGoal";
import UserTransaction from "../../components/userTransaction/UserTransaction";
import UserSettings from "../../components/userSettings/UserSettings";
import { useEffect, useState } from "react";
import useGet from "../../hooks/useGet";
import PageDeactived from "../deactived/Deactived";
import Loading from "../../components/_ui/loading/Loading";
import MenuTrigger from "../../components/_ui/menuTrigger/MenuTrigger";

interface UserProps {
  USER_ID: number;
  USER_NAME: string;
  USER_EMAIL: string;
  USER_ADMIN: boolean;
  USER_DELETED: boolean;
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

  const userId = data ? data.USER_ID : null;
  const userName = data ? data.USER_NAME : '';
  const deactivedAccount = data ? data.USER_DELETED : false;

  return (
    <>
      { selectedTab !== 'settings' && <MenuTrigger /> }
      {deactivedAccount ? (
        <>
          {data ? <PageDeactived data={data} token={authToken} /> : <Loading />}
        </>
      ) : (
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
                  <Menu>
                    <Menu.Target>
                      <Group>
                        <Text c="dimmed" size="sm" inline >Helo, {userName}</Text>
                        <UnstyledButton>
                          <ProviderUser name={userName} size='2.3rem' />
                        </UnstyledButton>
                      </Group>
                    </Menu.Target>
                    <Menu.Dropdown>
                      <Menu.Item c="#e03131" mr='lg' leftSection={<IconLogout size={20} />} onClick={() => logout()} >Sair</Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                </Group>
              </Group>
            </AppShell.Header>
            <AppShell.Navbar p="md" style={{
              justifyContent: 'space-between'
            }}>
              <Tabs.List>
                <Tabs.Tab value="dashboard" leftSection={<IconHome size={20} />}>Dashboard</Tabs.Tab>
                <Tabs.Tab value="goals" leftSection={<IconTargetArrow size={20} />}>Goals</Tabs.Tab>
                <Tabs.Tab value="transactions" leftSection={<IconSwitchHorizontal size={20} />}>Transactions</Tabs.Tab>
                <Tabs.Tab value="settings" leftSection={<IconSettings size={20} />}>Settings</Tabs.Tab>
              </Tabs.List>
              <Group >
                <Button
                  onClick={() => logout()}
                  leftSection={<IconLogout size={20} />}
                  fullWidth
                  variant="outline"
                  color="#e03131"
                  fw={500}
                >
                  Logout
                </Button>
              </Group>
            </AppShell.Navbar>
            <AppShell.Main w='100vw' h='100vh'>
              <Tabs.Panel value="dashboard">
                <UserPanel />
              </Tabs.Panel>
              <Tabs.Panel value="goals" h='100%'>
                {data ? <UserGoal userId={userId} /> : <Loading />}
              </Tabs.Panel>
              <Tabs.Panel value="transactions">
                <UserTransaction />
              </Tabs.Panel>
              <Tabs.Panel value="settings" h='100%'>
                <Group display='flex' h='100%'>{data ? <UserSettings user={data} /> : <Loading />}</Group>
              </Tabs.Panel>
            </AppShell.Main>
          </Tabs>
        </AppShell>
      )}
    </>
  )
}
