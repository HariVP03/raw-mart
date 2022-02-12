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
      w="400px"
      onClick={() => {
        router.push(link);
      }}
      cursor="pointer"
      h="400px"
      _hover={{ bg: "gray.700" }}
      transition="all 200ms"
      rounded="md"
    >
      <Flex w="full" h="20%">
        <chakra.h2
          display="flex"
          h="full"
          alignItems="center"
          justifyContent="center"
          w="full"
          textAlign="center"
          fontSize="3xl"
          fontWeight="700"
        >
          {name}
        </chakra.h2>
      </Flex>
      <Flex direction="column" mb={8} align="center" maxW="400px" h="60%">
        <Flex maxW="400px">
          <Flex
            m={5}
            w="100px"
            h="100px"
            rounded="md"
            bg={`url(${images[0]})`}
          ></Flex>
          <Flex
            m={5}
            w="100px"
            h="100px"
            rounded="md"
            bg={`url(${images[1]})`}
          ></Flex>
        </Flex>

        <Flex>
          <Flex
            m={5}
            w="100px"
            h="100px"
            rounded="md"
            bg={`url(${images[2]})`}
          ></Flex>
          <Flex
            m={5}
            w="100px"
            h="100px"
            rounded="md"
            bg={`url(${images[3]})`}
          ></Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SectionBox;
