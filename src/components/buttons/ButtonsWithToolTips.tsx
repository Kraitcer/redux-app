import React from "react";
import { Text, Box, Flex, HStack, Tooltip, Button } from "@chakra-ui/react";

interface Props {
  toolTipLabel: string;
  icon: React.ReactNode;
}

const ButtonsWithToolTips = ({ toolTipLabel, icon }: Props) => {
  return (
    <>
      <Tooltip label={toolTipLabel}>{icon}</Tooltip>
    </>
  );
};

export default ButtonsWithToolTips;
