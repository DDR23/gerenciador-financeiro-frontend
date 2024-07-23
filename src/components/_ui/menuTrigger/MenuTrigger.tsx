import { Menu, Group, ActionIcon, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus, IconTargetArrow, IconSwitchHorizontal, IconCategory } from '@tabler/icons-react';
import { useState } from 'react';

export default function MenuTrigger() {
  const [opened, { open, close }] = useDisclosure(false);
  const [modalContent, setModalContent] = useState<'newGoal' | 'newCategory' | 'newTransaction' | ''>('');

  const handleOpen = (content: 'newGoal' | 'newCategory' | 'newTransaction') => {
    setModalContent(content);
    open();
  };
  return (
    <>
      <Group m={30} style={{
        position: 'absolute',
        zIndex: 10,
        bottom: 0,
        right: 0,
        cursor: 'pointer'
      }}>
        <Menu shadow="md" width={200} position="top-end" offset={15} >
          <Menu.Target>
            <ActionIcon size={50} variant="filled" radius="xl" aria-label="Settings">
              <IconPlus style={{ width: '60%', height: '60%' }} stroke={2} />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item
              onClick={() => handleOpen('newGoal')}
              leftSection={<IconTargetArrow size={20} />}
            >
              New goal
            </Menu.Item>
            <Menu.Item
              onClick={() => handleOpen('newGoal')}
              leftSection={<IconCategory size={20} />}
            >
              New category
            </Menu.Item>
            <Menu.Item
              onClick={() => handleOpen('newTransaction')}
              leftSection={<IconSwitchHorizontal size={20} />}
            >
              New transaction
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
      {modalContent === 'newGoal' && (
        <Modal
          opened={opened}
          onClose={close}
          withCloseButton={false}
          overlayProps={{
            backgroundOpacity: 0.55,
            blur: 3
          }}>
          {/* <ModalEditName userId={USER_ID} token={token} /> */}
        </Modal>
      )}
      {modalContent === 'newCategory' && (
        <Modal
          opened={opened}
          onClose={close}
          withCloseButton={false}
          overlayProps={{
            backgroundOpacity: 0.55,
            blur: 3
          }}>
          {/* <ModalEditName userId={USER_ID} token={token} /> */}
        </Modal>
      )}
      {modalContent === 'newTransaction' && (
        <Modal
          opened={opened}
          onClose={close}
          withCloseButton={false}
          overlayProps={{
            backgroundOpacity: 0.55,
            blur: 3
          }}>
          {/* <ModalEditName userId={USER_ID} token={token} /> */}
        </Modal>
      )}
    </>
  );
}
