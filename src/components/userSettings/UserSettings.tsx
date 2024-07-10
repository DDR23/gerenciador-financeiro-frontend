import { Button, Modal, Paper } from "@mantine/core";
import ProviderUser from "../../utils/ProviderUser";
import { IconEdit } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import ModalEditName from "../_ui/modalEditName/ModalEditName";

interface UserProps {
  USER_ID: number;
  USER_NAME: string;
  USER_EMAIL: string;
}

interface UserSettingsProps {
  user: UserProps;
}

export default function UserSettings({ user }: UserSettingsProps) {
  const token = localStorage.getItem('token')
  const { USER_ID, USER_NAME, USER_EMAIL } = user;
  const [opened, { open, close }] = useDisclosure(false);
  const [modalContent, setModalContent] = useState<'editName' | 'editPassword' | 'deleted' | ''>('');

  const handleOpen = (content: 'editName' | 'editPassword' | 'deleted') => {
    setModalContent(content);
    open();
  };

  return (
    <>
      <Paper radius="md" withBorder maw="90vw" m="auto" w="30rem" p="lg">
        <ProviderUser name={USER_NAME} size={120} />
        <Button
          onClick={() => handleOpen('editName')}
          rightSection={<IconEdit size={20} />}
          variant="default"
          fullWidth
          mt="md"
          fw='200'
          styles={{
            inner: {
              justifyContent: "space-between"
            }
          }}
        >
          {USER_NAME}
        </Button>
        <Button
          onClick={() => handleOpen('editPassword')}
          rightSection={<IconEdit size={20} />}
          variant="default"
          fullWidth
          mt="md"
          fw='200'
          styles={{
            inner: {
              justifyContent: "space-between"
            }
          }}
        >
          {USER_EMAIL}
        </Button>
        <Button
          onClick={() => handleOpen('deleted')}
          fullWidth
          variant="outline"
          color="#e03131"
          mt="md"
          fw='200'
        >
          Delete my account
        </Button>
      </Paper>
      {modalContent === 'editName' && (
        <Modal
          opened={opened}
          onClose={close}
          // closeOnClickOutside={false}
          withCloseButton={true}
          overlayProps={{
            backgroundOpacity: 0.55,
            blur: 3
          }}>
          <ModalEditName userId={USER_ID} token={token} />
        </Modal>
      )}
      {modalContent === 'editPassword' && (
        <Modal
          opened={opened}
          onClose={close}
          title='EDITAR SENHA'
          // closeOnClickOutside={false}
          withCloseButton={true}
          overlayProps={{
            backgroundOpacity: 0.55,
            blur: 3
          }}>
          {/* COLOCAR MODAL AQUI */}
        </Modal>
      )}
      {modalContent === 'deleted' && (
        <Modal
          opened={opened}
          onClose={close}
          title='DELETAR CONTA'
          // closeOnClickOutside={false}
          withCloseButton={true}
          overlayProps={{
            backgroundOpacity: 0.55,
            blur: 3
          }}>
          {/* COLOCAR MODAL AQUI */}
        </Modal>
      )}
    </>
  );
}