import ToDo from "./pages/ProjectsList";
import { Flex, Text } from "@chakra-ui/react";
import "./App.css";

function App() {
  return (
    <Flex
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      w={"100%"}
    >
      <Text fontSize={60} mb={2}>
        Projects List
      </Text>
      <ToDo />
    </Flex>
  );
}

export default App;
