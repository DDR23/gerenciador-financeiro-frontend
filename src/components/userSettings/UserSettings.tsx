import { Button, Modal, Paper } from "@mantine/core";
import ProviderUser from "../../utils/ProviderUser";
import { IconEdit } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import ModalEditName from "../_ui/modalEditName/ModalEditName";

export default function UserSettings({ userName, userEmail }: any) {
  const [opened, { open, close }] = useDisclosure(false);
  const [modalContent, setModalContent] = useState<'editName' | 'editPassword' | 'deleted' | ''>('');

  const handleOpen = (content: 'editName' | 'editPassword' | 'deleted') => {
    setModalContent(content);
    open();
  };

  return (
    <>
      <Paper radius="md" withBorder maw="90vw" m="auto" w="30rem" p="lg">
        <ProviderUser name={userName} size={120} />
        <Button
          onClick={() => handleOpen('editName')}
          rightSection={<IconEdit />}
          variant="default"
          fullWidth
          mt="md"
          fw={200}
          styles={{
            inner: {
              justifyContent: "space-between"
            }
          }}
        >
          {userName}
        </Button>
        <Button
          onClick={() => handleOpen('editPassword')}
          rightSection={<IconEdit />}
          variant="default"
          fullWidth
          mt="md"
          fw={200}
          styles={{
            inner: {
              justifyContent: "space-between"
            }
          }}
        >
          {userEmail}
        </Button>
        <Button
          onClick={() => handleOpen('deleted')}
          fullWidth
          variant="outline"
          color="#e03131"
          mt="md"
          fw={200}
        >
          Apager minha conta
        </Button>
      </Paper>
      {modalContent === 'editName' && (
        <Modal
          opened={opened}
          onClose={close}
          title='Editar nome'
          // closeOnClickOutside={false}
          withCloseButton={true}
          overlayProps={{
            backgroundOpacity: 0.55,
            blur: 3
          }}>
          <ModalEditName />
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