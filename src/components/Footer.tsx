import { Flex, Text, Badge, Box } from "@chakra-ui/react";
import React from "react";

interface FooterProps {
  badge: number;
  icon: React.ReactNode;
  name: string;
  onClick: () => void;
}

export const Footer = ({ badge, icon, name, onClick }: FooterProps) => {
  return (
    <>
      <Flex
        justifyContent={"center"}
        alignItems={"center"}
        gap={2}
        bg={"blue.100"}
        // pl={3}
        // pr={3}
        p={2}
        borderRadius={20}
        cursor={"pointer"}
        _hover={{ bg: "blue.300" }}
        onClick={onClick}
        role="group"
      >
        <Badge
          display={"flex"}
          borderRadius={50}
          h={8}
          w={8}
          justifyContent={"center"}
          alignItems={"center"}
          _groupHover={{ bg: "blue.400", color: "white" }}
        >
          {badge}
        </Badge>
        <Text
          display={{ sm: "flex", base: "none", md: "flex" }}
          color={"blue.400"}
          textTransform={"uppercase"}
          fontSize={20}
          p={0}
          m={0}
          _groupHover={{ color: "white" }}
        >
          {name}
        </Text>
        <Flex color={"blue.400"} _groupHover={{ color: "white" }}>
          {icon}
        </Flex>
        {/* <Box role="group" w={20} h={20} bg={"white"}>
          <Box
            _hover={{ fontWeight: "semibold" }}
            _groupHover={{ color: "tomato" }}
          >
            fuck
          </Box>
        </Box> */}
      </Flex>
    </>
  );
};

export default Footer;
