import { AppShell, Burger, Button, Group, Image, Tabs, Text } from "@mantine/core";
import { useAuth } from "../../services/AuthContext";
import { notifications } from "@mantine/notifications";
import { IconCategory2, IconCheck, IconHome, IconLogout, IconSettings, IconSwitchHorizontal, IconTargetArrow } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import ProviderUser from "../../services/ProviderUser";

export default function Dashboard() {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  const { logout } = useAuth();

  const doLogout = () => {
    notifications.show({
      title: 'Bye',
      message: 'We look forward to seeing you soon',
      autoClose: 7000,
      color: 'green',
      icon: <IconCheck />,
    })
    logout()
  }

  const userName = 'Andre Campos'

  return (
    <>
      <AppShell
        header={{ height: 60 }}
        navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !mobileOpened, desktop: !desktopOpened } }}
        padding="md"
      >
        <Tabs
          defaultValue="dashboard"
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
              <Button onClick={doLogout} fullWidth leftSection={<IconLogout />} >
                Logout
              </Button>
            </Group>
          </AppShell.Navbar>
          <AppShell.Main>
            <Tabs.Panel value="dashboard">Dashboard</Tabs.Panel>
            <Tabs.Panel value="goal">Goals</Tabs.Panel>
            <Tabs.Panel value="category">Category</Tabs.Panel>
            <Tabs.Panel value="transaction">Transaction</Tabs.Panel>
            <Tabs.Panel value="settings">Settings</Tabs.Panel>
          </AppShell.Main>
        </Tabs>
      </AppShell>
    </>
  )
}