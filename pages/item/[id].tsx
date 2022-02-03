import {
  Box,
  Button,
  chakra,
  Container,
  Text,
  Flex,
  Heading,
  Image,
  List,
  ListItem,
  SimpleGrid,
  Stack,
  StackDivider,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BsCart } from "react-icons/bs";
import { MdLocalShipping } from "react-icons/md";
import { Carousel } from "react-responsive-carousel";
import { auth } from "../../firebase";
import prisma from "../../lib/prisma";
import { currencies } from "../../lib/utilities/currencies";
import Navbar from "../../src/components/Navbar";
import { item } from "../../types/collectionTypes";

const ProductPage: React.FC = () => {
  let tempCurrencies = currencies as any;
  const router = useRouter();
  const { id } = router.query;
  const [productName, setProductName] = useState("Loading...");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState(0);
  const [prevPrice, setPrevPrice] = useState(0);
  const [discount, setDiscount] = useState<number | undefined>(0);
  const [currency, setCurrency] = useState("USD");
  const [images, setImages] = useState<string[]>([""]);

  const getItem = async () => {
    fetch(`/api/item/${id}`, {
      method: "GET",
      headers: { "content-type": "application/json" },
    }).then((res) => {
      res.json().then((item: item) => {
        setProductName(item?.name || "");
        setDesc(item?.description || "");
        setPrice(item?.price);
        setPrevPrice(item?.price);
        setDiscount(item?.discount);
        setCurrency(item?.currency || "INR");
        setImages(item?.images);
        if (discount) setPrevPrice(price * (1 - discount / 100));
      });
    });
  };

  useEffect(() => {
    if (router.query.id) {
      getItem();
    }
    if (!discount) setPrevPrice(price);
    else setPrevPrice(price * (1 - discount / 100));
  }, [router.query]);

  useEffect(() => {
    if (!discount) setPrevPrice(price);
    else setPrevPrice(price * (1 - discount / 100));
  }, [discount]);

  return (
    <>
      <Head>
        <title>{productName}</title>
      </Head>
      <Navbar />
      <Flex maxW="100vw" minH="100vh" justify="center" bg="primary">
        <Container maxW={"7xl"}>
          <SimpleGrid
            columns={{ base: 1, lg: 2 }}
            spacing={{ base: 8, md: 10 }}
            py={{ base: 18, md: 24 }}
          >
            <Flex>
              <Image
                rounded={"md"}
                alt={"product image"}
                src={images[0]}
                fit={"cover"}
                align={"center"}
                w={"100%"}
                h={{ base: "100%", sm: "400px", lg: "500px" }}
              />
            </Flex>
            <Stack spacing={{ base: 6, md: 10 }}>
              <Box as={"header"}>
                <Heading
                  lineHeight={1.1}
                  fontWeight={600}
                  fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
                >
                  {productName}
                </Heading>
                <Flex mt={2}>
                  <Text
                    color={useColorModeValue("gray.900", "gray.400")}
                    fontWeight={300}
                    fontSize={"2xl"}
                    mr={2}
                  >
                    {tempCurrencies[currency].symbol}
                    {prevPrice}
                  </Text>
                  <Text
                    color={useColorModeValue("gray.900", "gray.400")}
                    fontWeight={300}
                    decoration="line-through"
                    fontSize={"2xl"}
                  >
                    {tempCurrencies[currency].symbol}
                    {price}
                  </Text>
                </Flex>
              </Box>

              <Stack
                spacing={{ base: 4, sm: 6 }}
                direction={"column"}
                divider={
                  <StackDivider
                    borderColor={useColorModeValue("gray.200", "gray.600")}
                  />
                }
              >
                <VStack spacing={{ base: 4, sm: 6 }}>
                  <Text
                    color={useColorModeValue("gray.500", "gray.400")}
                    fontSize={"2xl"}
                    fontWeight={"300"}
                    w="full"
                  >
                    {desc}
                  </Text>
                </VStack>
              </Stack>

              <Button
                variant="ghost"
                mt={8}
                w="full"
                bg="secondary"
                size={"lg"}
                py={"7"}
              >
                Add to cart
              </Button>

              <Stack
                direction="row"
                alignItems="center"
                justifyContent={"center"}
              >
                <MdLocalShipping />
                <Text>2-3 business days delivery</Text>
              </Stack>
            </Stack>
          </SimpleGrid>
        </Container>
      </Flex>
    </>
  );
};

export default ProductPage;
