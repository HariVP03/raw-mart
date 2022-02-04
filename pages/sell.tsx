import {
  Button,
  chakra,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import React, { useState } from "react";
import Navbar from "../src/components/Navbar";

const Sell: React.FC = () => {
  const [itemData, setItemData] = useState<{
    name: string;
    currency: string;
    price: number;
    description: string;
    images: string[];
  }>({
    name: "",
    currency: "",
    price: 0,
    description: "",
    images: [],
  });

  const setName = (name: string) => {
    setItemData({ ...itemData, name });
  };

  const setCurrency = (currency: string) => {
    setItemData({ ...itemData, currency });
  };

  const setPrice = (price: number) => {
    setItemData({ ...itemData, price });
  };

  const setDesc = (description: string) => {
    setItemData({ ...itemData, description });
  };

  const addImg = (img: string) => {
    const temp = JSON.parse(JSON.stringify(itemData));
    temp.images.push(img);
    setItemData(temp);
  };

  return (
    <>
      <Navbar />
      <Flex w="100vw" h="100vh" pt="9vh" justify="center">
        <Flex w="60vw" h="full" direction="column">
          <chakra.h1
            mt={3}
            fontSize="4xl"
            w="full"
            fontWeight="semibold"
            textAlign="center"
          >
            Sell an item
          </chakra.h1>
          <FormControl mb={2}>
            <FormLabel>Product Name</FormLabel>
            <Input placeholder="Name of the product" variant="filled" />
          </FormControl>
          <FormControl mb={2}>
            <FormLabel>Currency</FormLabel>
            <Input placeholder="Currency Code" variant="filled" />
          </FormControl>
          <FormControl mb={2}>
            <FormLabel>Price</FormLabel>
            <Input placeholder="Price" variant="filled" />
          </FormControl>
          <FormControl mb={2}>
            <FormLabel>Description</FormLabel>
            <Textarea placeholder="Describe your product" variant="filled" />
          </FormControl>
          <Flex mt={10}>
            <Button variant="outline" mr={4} border="2px">
              Add
            </Button>
            <Button>Close</Button>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default Sell;
