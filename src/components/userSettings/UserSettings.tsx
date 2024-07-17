import { Button, Modal, Paper, Text } from "@mantine/core";
import ProviderUser from "../../utils/ProviderUser";
import { IconEdit, IconKey, IconTrash } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import ModalEditName from "../_ui/modalEditName/ModalEditName";
import ModalEditPassword from "../_ui/modalEditPassword/ModalEditPassword";
import ModalDeleteUser from "../_ui/modalDeleteUser/ModalDeleteUser";

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
        <Text ta='center' mt='md'>{USER_NAME}</Text>
        <Text c="dimmed" ta='center' size="sm" >{USER_EMAIL}</Text>
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
          Edit name
        </Button>
        <Button
          onClick={() => handleOpen('editPassword')}
          rightSection={<IconKey size={20} />}
          fullWidth
          variant="default"
          mt="md"
          fw='200'
          styles={{
            inner: {
              justifyContent: "space-between"
            }
          }}
        >
          Edit password
        </Button>
        <Button
          onClick={() => handleOpen('deleted')}
          rightSection={<IconTrash size={20} />}
          fullWidth
          variant="outline"
          color="#e03131"
          mt="md"
          fw='200'
          styles={{
            inner: {
              justifyContent: "space-between"
            }
          }}
        >
          Delete my account
        </Button>
      </Paper>
      {modalContent === 'editName' && (
        <Modal
          opened={opened}
          onClose={close}
          withCloseButton={false}
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
          withCloseButton={false}
          overlayProps={{
            backgroundOpacity: 0.55,
            blur: 3
          }}>
          <ModalEditPassword userEmail={USER_EMAIL} userId={USER_ID} token={token} />
        </Modal>
      )}
      {modalContent === 'deleted' && (
        <Modal
          opened={opened}
          onClose={close}
          withCloseButton={false}
          overlayProps={{
            backgroundOpacity: 0.55,
            blur: 3
          }}>
          <ModalDeleteUser userId={USER_ID} token={token} />
        </Modal>
      )}
    </>
  );
}
