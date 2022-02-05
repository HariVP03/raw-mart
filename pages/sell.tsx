import {
  Button,
  chakra,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Icon,
  Stack,
  VisuallyHidden,
  Image,
} from "@chakra-ui/react";
import { User } from "firebase/auth";
import Head from "next/head";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { storage } from "../firebase";
import Navbar from "../src/components/Navbar";
import { userState } from "../src/store";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import router from "next/router";
import { sellItem } from "../src/types";
const Sell: React.FC = () => {
  const [itemData, setItemData] = useState<sellItem>({
    name: "",
    currency: "",
    price: 0,
    description: "",
    images: [],
    category: "",
    stock: 0,
  });
  const [img, setImg] = useState<Blob>();
  const [loading, setLoading] = useState<boolean>(false);
  const user = JSON.parse(
    useSelector((state: userState) => state.user.value) || "{}"
  ) as User | null;

  const reset = () => {
    setItemData({
      name: "",
      currency: "",
      price: 0,
      description: "",
      images: [],
      category: "",
      stock: 0,
    });
    setImg(undefined);
  };

  const setName = (name: string) => {
    setItemData({ ...itemData, name });
  };

  const setCurrency = (currency: string) => {
    setItemData({ ...itemData, currency });
  };

  const setPrice = (price: number) => {
    setItemData({ ...itemData, price });
  };

  const setCategory = (category: string) => {
    setItemData({ ...itemData, category });
  };

  const setDesc = (description: string) => {
    setItemData({ ...itemData, description });
  };

  const setStock = (stock: number) => {
    setItemData({ ...itemData, stock });
  };

  const onSubmit = async () => {
    setLoading(true);
    if (
      !img ||
      typeof itemData.stock !== "number" ||
      typeof itemData.price !== "number"
    ) {
      setLoading(false);
      return;
    }
    const imgRef = ref(
      storage,
      `/images/${user?.email}/${Math.random() * 100000}`
    );
    uploadBytes(imgRef, img).then((snap) => {
      getDownloadURL(snap.ref).then((url) => {
        // Send POST Request
        fetch("/api/sellItem", {
          method: "POST",
          body: JSON.stringify({ ...itemData, images: [url] }),
        });
        reset();
        setLoading(false);
        router.push("/");
      });
    });
  };

  return (
    <>
      <Head>
        <title>Sell a Product</title>
      </Head>
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
            <Input
              onChange={(e) => setName(e.target.value)}
              placeholder="Name of the product"
              variant="filled"
              value={itemData.name}
            />
          </FormControl>
          <FormControl mb={2}>
            <FormLabel>Currency</FormLabel>
            <Input
              onChange={(e) => setCurrency(e.target.value)}
              placeholder="Currency Code"
              variant="filled"
              value={itemData.currency}
            />
          </FormControl>
          <FormControl mb={2}>
            <FormLabel>Category</FormLabel>
            <Input
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Category"
              variant="filled"
              value={itemData.category}
            />
          </FormControl>
          <FormControl mb={2}>
            <FormLabel>Stock</FormLabel>
            <Input
              onChange={(e) => setStock(parseInt(e.target.value))}
              placeholder="Stock"
              variant="filled"
              value={itemData.stock}
            />
          </FormControl>
          <FormControl mb={2}>
            <FormLabel>Price</FormLabel>
            <Input
              onChange={(e) => setPrice(parseInt(e.target.value))}
              placeholder="Price"
              value={itemData.price}
              variant="filled"
            />
          </FormControl>
          <FormControl mb={2}>
            <FormLabel>Description</FormLabel>
            <Textarea
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Describe your product"
              variant="filled"
              value={itemData.description}
            />
          </FormControl>
          <Flex
            mt={1}
            justify="center"
            px={6}
            onDragOver={(e) => {
              e.preventDefault();
            }}
            onDragEnter={(e) => {
              e.preventDefault();
            }}
            onDrop={(e) => {
              e.preventDefault();
              setImg(e.dataTransfer.files[0]);
            }}
            pt={5}
            pb={6}
            borderWidth={2}
            borderColor="gray.500"
            borderStyle="dashed"
            rounded="md"
          >
            <Stack spacing={1} textAlign="center">
              <Icon
                mx="auto"
                boxSize={12}
                color="white"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Icon>
              <Flex fontSize="sm" color="gray.600" alignItems="baseline">
                <chakra.label
                  htmlFor="file-upload"
                  cursor="pointer"
                  rounded="md"
                  fontSize="md"
                  transition="color 200ms linear"
                  w="full"
                  textAlign="center"
                  color="red.100"
                  pos="relative"
                  _hover={{
                    color: "red.200",
                  }}
                >
                  <span>Upload an image of your product</span>
                  <VisuallyHidden>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      accept="image/jpeg, image/png,image/jpg"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0] !== null)
                          setImg(e.target.files[0]);
                      }}
                    />
                  </VisuallyHidden>
                </chakra.label>
              </Flex>
              <Text fontSize="xs" color="white">
                PNG, JPG up to 10MB
                {img ? (
                  <Flex minW="200px" mt={2} minH="150px">
                    <Image
                      src={URL.createObjectURL(img)}
                      alt="uploaded image"
                    ></Image>
                  </Flex>
                ) : (
                  ""
                )}
              </Text>
            </Stack>
          </Flex>
          <Flex mt={10} pb="50px">
            <Button
              onClick={() => {
                onSubmit();
              }}
              variant="outline"
              isLoading={loading}
              loadingText="Adding"
              mr={4}
              border="2px solid"
              borderColor="green.400"
            >
              Add
            </Button>
            <Button onClick={reset}>Clear</Button>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default Sell;
