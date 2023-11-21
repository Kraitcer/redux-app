import { GoTasklist } from "../../utilities/icons";
import { Badge, Flex, Text } from "@chakra-ui/react";
import { selectSubTasksOfTheCurrentTask } from "../../store/subTasksReducer";
import { useSelector } from "react-redux";

interface Props {
  currentTaskID: string;
}

const ActiveSubTaskBadge = ({ currentTaskID }: Props) => {
  const activeSubTasks = useSelector(
    selectSubTasksOfTheCurrentTask(currentTaskID)
  );
  return (
    <Flex
      alignItems={"center"}
      gap={1}
      // borderRadius={50}
      // pl={2}
      // mr={1}
      // _hover={{ bg: "white", color: "black" }}
    >
      {activeSubTasks.length > 0 && <GoTasklist size={24} />}
      {/* {activeSubTasks.length > 0 ? (
        <GoTasklist size={24} />
      ) : (
        <Text>Add Sub Tasks</Text>
      )} */}
      {/* {activeSubTasks.length > 0 && <GoTasklist size={24} />} */}
      <Badge>{activeSubTasks.length > 0 && activeSubTasks.length}</Badge>
    </Flex>
  );
};

export default ActiveSubTaskBadge;
