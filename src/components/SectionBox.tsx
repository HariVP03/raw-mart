import React from "react";
import { chakra, Flex } from "@chakra-ui/react";
import router from "next/router";

const SectionBox: React.FC<{
  name: string;
  images: string[];
  link: string;
}> = ({ name = "Name not found", images = ["haha"], link = "/" }) => {
  return (
    <Flex
      m={4}
      direction="column"
      w="300px"
      onClick={() => {
        router.push(link);
      }}
      cursor="pointer"
      h="100px"
      _hover={{ bg: "blue.500" }}
      transition="all 200ms"
      rounded="md"
    >
      <chakra.h2
        display="flex"
        h="full"
        justifyContent="center"
        alignItems="center"
        w="full"
        textAlign="center"
        fontSize="2xl"
        fontWeight="700"
      >
        {name}
      </chakra.h2>
    </Flex>
  );
};

export default SectionBox;
