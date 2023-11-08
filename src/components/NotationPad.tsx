import { Text, Box, Flex, HStack } from "@chakra-ui/react";
import { useDrag, useDrop } from "react-dnd";
import { dndItemsTypes } from "../utilities/dndItemsTypes";

import { useMotionValue, Reorder, useDragControls } from "framer-motion";
import { useRaisedShadow } from "../utilities/use-raised-shadow";

import {
  FaTrashRestoreAlt,
  IoTrashBinSharp,
  BiEdit,
  MdDone,
  MdDragIndicator,
} from "../utilities/icons";
import { Projects } from "../pages/ProjectsList";
import { SubTasks } from "../pages/Tasks";

interface Props {
  notationFor: Projects | SubTasks;
  nameWidth: string;
  children: React.ReactNode;
  width: string;
  notationID: string;
  notationName: string;
  complited: boolean;
  onDelete: (id: string) => void;
  onEdit: (id: string, name: string) => void;
  onComplete: (id: string) => void;
  index: number;
}

export const NotationPad = ({
  notationFor,
  nameWidth,
  children,
  width,
  notationID,
  notationName,
  complited,
  onDelete,
  onEdit: editNotation,
  onComplete: completeNotation,
  index,
}: Props) => {
  const y = useMotionValue(0);
  const boxShadow = useRaisedShadow(y);
  const dragControls = useDragControls();

  return (
    <Reorder.Item
      value={notationFor}
      id={notationID}
      style={{ boxShadow, y, borderRadius: 10, listStyle: "none" }}
      // dragListener={false}
      dragControls={dragControls}
    >
      <HStack gap={0} mr={0} mb={1} w={"100%"} borderLeftRadius={10}>
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
          {/* <ReorderIcon dragControls={dragControls} /> */}
          <MdDragIndicator
            size={"20px"}
            onPointerDown={(event) => dragControls.start(event)}
          />
        </Flex>
        <Box
          bg={"blue.400"}
          color={"white"}
          w={width}
          h={10}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          cursor={"pointer"}
        >
          <Flex justifyContent={"space-between"} alignItems={"center"}>
            <Text
              // cursor={"none"}
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
                <FaTrashRestoreAlt
                  onClick={() => completeNotation(notationID)}
                />
              ) : (
                <MdDone onClick={() => completeNotation(notationID)} />
              )}
              <IoTrashBinSharp onClick={() => onDelete(notationID)} />
            </Flex>
          </Flex>
        </Flex>
      </HStack>
    </Reorder.Item>
  );
};

export default NotationPad;
