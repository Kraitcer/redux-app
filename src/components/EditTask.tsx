import React, { useState } from "react";
import {
  Input,
  Flex,
  Text,
  Textarea,
  Button,
  Select,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";

import { DateTime } from "luxon";

import { Tasks, TasksStatus } from "../pages/Tasks";
import SubTasksList from "./SubTasksList";

interface Props {
  submit: () => void;
  currentTask: Tasks;
  onEdit: (
    id: string,
    taskName: string,
    description: string,
    status: TasksStatus["status"],
    dueDate?: string
  ) => void;
}

const EditTask = React.memo(({ currentTask, onEdit, submit }: Props) => {
  const [title, setTitle] = useState(currentTask.taskName);
  const [description, setDescription] = useState(currentTask.description);
  const [status, setStatus] = useState(currentTask.status);
  const [dueDate, setDueDate] = useState(currentTask.dueDate);

  const creationDate = DateTime.fromISO(currentTask.creationDate);

  const handleDateChange = (value: string) => {
    if (DateTime.fromISO(value) < creationDate) return;
    setDueDate(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onEdit(currentTask.id, title, description, status, dueDate);
    submit();
  };

  return (
    <>
      <Tabs>
        <TabList>
          <Tab>Properties</Tab>
          <Tab>SubTasks</Tab>
          <Tab>Comments</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <form onSubmit={handleSubmit}>
              <Flex gap={2} flexDirection={"column"}>
                <Flex gap={4}>
                  <Text textTransform={"uppercase"} fontSize={"2xl"}>
                    Title
                  </Text>
                  <Input
                    m={0}
                    bg={"white"}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </Flex>
                <Flex gap={4}>
                  <Text textTransform={"uppercase"} fontSize={"2xl"}>
                    description
                  </Text>
                  <Textarea
                    m={0}
                    bg={"white"}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    resize={"none"}
                  />
                </Flex>
                <Flex gap={4}>
                  <Text textTransform={"uppercase"} fontSize={"2xl"}>
                    status
                  </Text>
                  <Select
                    value={status}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      setStatus(e.target.value as TasksStatus["status"])
                    }
                  >
                    <option value="queue">queue</option>
                    <option value="development">development</option>
                    <option value="done">done</option>
                  </Select>
                </Flex>
                <Flex gap={4} justifyContent={"space-between"}>
                  <Text textTransform={"uppercase"} fontSize={"2xl"}>
                    creation Date
                  </Text>
                  <Text textTransform={"uppercase"} fontSize={"2xl"}>
                    {creationDate.day}
                    {creationDate.monthShort}
                  </Text>
                </Flex>
                <Flex gap={4} justifyContent={"space-between"}>
                  <Text textTransform={"uppercase"} fontSize={"2xl"}>
                    Due Date
                  </Text>
                  <Input
                    type="date"
                    w={300}
                    value={dueDate}
                    onChange={(e) => handleDateChange(e.target.value)}
                  />
                </Flex>
                <Button
                  w={"100%"}
                  bg={"blue.400"}
                  color={"white"}
                  onClick={handleSubmit}
                >
                  SUBMIT
                </Button>
              </Flex>
            </form>
          </TabPanel>
          <TabPanel>
            <SubTasksList currentTaskID={currentTask.id} />
          </TabPanel>
          <TabPanel>
            <p>three!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
});

export default EditTask;
