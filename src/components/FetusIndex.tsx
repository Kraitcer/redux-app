import {
  Flex,
  HStack,
  NumberInput,
  NumberInputField,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import React from "react";

interface Props {
  newProjectName: string;
}

const FetusIndex = ({ newProjectName }: Props) => {
  return (
    <>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr bg={"blue.400"} color={"white"}>
              <Th color={"white"} textAlign={"center"}>
                Project
              </Th>
              <Th
                //   borderRight={"1px"}
                borderColor={"white"}
                color={"white"}
                textAlign={"center"}
                pl={1}
                pr={1}
              >
                FUN
              </Th>
              <Th
                //   borderRight={"1px"}
                borderColor={"white"}
                color={"white"}
                textAlign={"center"}
                pl={1}
                pr={1}
              >
                EFFECT
              </Th>
              <Th
                //   borderRight={"1px"}
                borderColor={"white"}
                color={"white"}
                textAlign={"center"}
                pl={1}
                pr={1}
              >
                TIME
              </Th>
              <Th
                //   borderRight={"1px"}
                borderColor={"white"}
                color={"white"}
                textAlign={"center"}
                pl={1}
                pr={1}
              >
                URGENCY
              </Th>
              <Th
                //   borderRight={"1px"}
                borderColor={"white"}
                color={"white"}
                textAlign={"center"}
                pl={1}
                pr={1}
              >
                STRATEGY
              </Th>
              <Th
                //   borderRight={"1px"}
                borderColor={"white"}
                color={"white"}
                textAlign={"center"}
                pl={1}
                pr={1}
              >
                TOTAL
              </Th>
            </Tr>
          </Thead>
          <Tbody></Tbody>
          <Tr>
            <Td>{newProjectName}</Td>
            <Td>
              <NumberInput
                // {...register(project.funIndex)}
                size="md"
                // maxW={0}
                defaultValue={0}
                // value={project.fun}
                min={0}
                max={10}
                // onChange={(data) => {
                //   setFitusValue(project.projectName, {
                //     ...project,
                //     fun: parseInt(data),
                //   });
                // }}
              >
                <NumberInputField
                  textAlign={"center"}
                  border={"none"}
                  m={0}
                  p={0}
                  pl={2}
                  fontSize={"1.5rem"}
                  color={"black"}
                  //   w={"40px"}
                />
              </NumberInput>
            </Td>
            <Td>
              <NumberInput
                // {...register(project.funIndex)}
                size="md"
                // maxW={0}
                defaultValue={0}
                // value={project.fun}
                min={0}
                max={10}
                // onChange={(data) => {
                //   setFitusValue(project.projectName, {
                //     ...project,
                //     fun: parseInt(data),
                //   });
                // }}
              >
                <NumberInputField
                  textAlign={"center"}
                  border={"none"}
                  m={0}
                  p={0}
                  pl={2}
                  fontSize={"1.5rem"}
                  color={"black"}
                  //   w={"40px"}
                />
              </NumberInput>
            </Td>
            <Td>
              <NumberInput
                // {...register(project.funIndex)}
                size="md"
                // maxW={0}
                defaultValue={0}
                // value={project.fun}
                min={0}
                max={10}
                // onChange={(data) => {
                //   setFitusValue(project.projectName, {
                //     ...project,
                //     fun: parseInt(data),
                //   });
                // }}
              >
                <NumberInputField
                  textAlign={"center"}
                  border={"none"}
                  m={0}
                  p={0}
                  pl={2}
                  fontSize={"1.5rem"}
                  color={"black"}
                  //   w={"40px"}
                />
              </NumberInput>
            </Td>
            <Td>
              <NumberInput
                // {...register(project.funIndex)}
                size="md"
                // maxW={0}
                defaultValue={0}
                // value={project.fun}
                min={0}
                max={10}
                // onChange={(data) => {
                //   setFitusValue(project.projectName, {
                //     ...project,
                //     fun: parseInt(data),
                //   });
                // }}
              >
                <NumberInputField
                  textAlign={"center"}
                  border={"none"}
                  m={0}
                  p={0}
                  pl={2}
                  fontSize={"1.5rem"}
                  color={"black"}
                  //   w={"40px"}
                />
              </NumberInput>
            </Td>
            <Td>
              <NumberInput
                // {...register(project.funIndex)}
                size="md"
                // maxW={0}
                defaultValue={0}
                // value={project.fun}
                min={0}
                max={10}
                // onChange={(data) => {
                //   setFitusValue(project.projectName, {
                //     ...project,
                //     fun: parseInt(data),
                //   });
                // }}
              >
                <NumberInputField
                  textAlign={"center"}
                  border={"none"}
                  m={0}
                  p={0}
                  pl={2}
                  fontSize={"1.5rem"}
                  color={"black"}
                  //   w={"40px"}
                />
              </NumberInput>
            </Td>
          </Tr>
        </Table>
      </TableContainer>

      <HStack>
        <Flex></Flex>
      </HStack>
    </>
  );
};

export default FetusIndex;
