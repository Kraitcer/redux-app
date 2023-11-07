import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
interface CustomModalProps {
  title: string;
  children: React.ReactNode;
  onOpen: boolean;
  onClose: () => void;
  size: string;
}
function AllModal({
  title,
  children,
  onOpen,
  onClose,
  size,
}: CustomModalProps) {
  return (
    <>
      <Modal size={size} isOpen={onOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textTransform={"uppercase"} fontSize={22} pr={"55px"}>
            {title}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>{children}</ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
export default AllModal;
