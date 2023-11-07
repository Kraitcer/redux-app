import { GoTasklist } from "../../utilities/icons";
import { Badge, Flex } from "@chakra-ui/react";
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
    <Flex alignItems={"center"} gap={1}>
      {activeSubTasks.length > 0 && <GoTasklist size={24} />}
      <Badge>{activeSubTasks.length > 0 && activeSubTasks.length}</Badge>
    </Flex>
  );
};

export default ActiveSubTaskBadge;
