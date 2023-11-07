import { Text, Box, Flex, HStack } from "@chakra-ui/react";
import { useDrag, useDrop } from "react-dnd";
import { dndItemsTypes } from "../utilities/dndItemsTypes";

import {
  FaTrashRestoreAlt,
  IoTrashBinSharp,
  BiEdit,
  MdDone,
  MdDragIndicator,
} from "../utilities/icons";

interface Props {
  nameWidth: string;
  children: React.ReactNode;
  width: string;
  notationID: string;
  notationName: string;
  complited: boolean;
  onDelete: (id: string) => void;
  onEdit: (id: string, name: string) => void;
  onComplete: (id: string) => void;
  moveItem: (fromIndex: number, toIndex: number) => void;
  index: number;
  // children: number;
}

export const NotationPad = ({
  nameWidth,
  children,
  width,
  notationID,
  notationName,
  complited,
  onDelete,
  onEdit: editNotation,
  onComplete: completeNotation,
  moveItem,
  index,
}: Props) => {
  const [, ref] = useDrag({
    type: dndItemsTypes.PAD,
    item: { id: notationID },
  });

  const [, drop] = useDrop({
    accept: dndItemsTypes.PAD,
    hover: (draggedItem: { index: number }) => {
      if (draggedItem.index !== index) {
        moveItem(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <HStack gap={0} mr={0} mb={1} w={"100%"} ref={(node) => ref(drop(node))}>
      <Flex
        bg={"orange.300"}
        h={10}
        w={"36px"}
        gap={2}
        color={"white"}
        _hover={{ bg: "orange.400" }}
        borderLeftRadius={10}
        justifyContent={"center"}
        alignItems={"center"}
        cursor={"-webkit-grab"}
      >
        <MdDragIndicator size={"20px"} />
      </Flex>
      <Box
        bg={"blue.400"}
        color={"white"}
        w={width}
        h={10}
        // p={1.5}
        // pl={3}
        // pr={2}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        cursor={"pointer"}

        // flexDirection={"raw"}
      >
        <Flex justifyContent={"space-between"} alignItems={"center"}>
          <Text
            as={complited === true ? "del" : undefined}
            m={0}
            ml={2}
            textOverflow={"ellipsis"}
            whiteSpace={"nowrap"}
            overflow={"hidden"}
            w={nameWidth}
          >
            {notationName}
          </Text>
          <Flex>{children}</Flex>
        </Flex>
      </Box>
      <Flex>
        <Flex>
          <Flex
            bg={"orange.300"}
            h={10}
            w={"96px"}
            pt={3}
            pl={3}
            pr={3}
            gap={2}
            color={"white"}
            _hover={{ bg: "orange.400" }}
            borderRightRadius={10}
          >
            <BiEdit onClick={() => editNotation(notationID, notationName)} />
            {complited ? (
              <FaTrashRestoreAlt onClick={() => completeNotation(notationID)} />
            ) : (
              <MdDone onClick={() => completeNotation(notationID)} />
            )}
            <IoTrashBinSharp onClick={() => onDelete(notationID)} />
          </Flex>
        </Flex>
      </Flex>
    </HStack>
  );
};

export default NotationPad;
