import { chakra, Flex } from "@chakra-ui/react";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import BuyCard from "../src/components/BuyCard";
import Layout from "../src/components/Layout";
import Navbar from "../src/components/Navbar";

const Hahaok3: React.FC = () => {
  const [items, setItems] = useState([]);
  const getItems = async () => {
    fetch("/api/recycled", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }).then((res) => {
      res.json().then((data) => {
        setItems(data);
      });
    });
  };

  useEffect(() => {
    getItems();
  }, []);

  return (
    <>
      <Head>
        <title>Raw Mart | Recycled</title>
      </Head>
      <Flex minH="100vw" maxW="100vw" direction="column">
        <Layout>
          <chakra.h2 fontSize="3xl" ml={8}>
            Recycled
          </chakra.h2>
          <Flex maxW="100vw" flexWrap="wrap" m={5}>
            {items?.map((e: any) => {
              return (
                <BuyCard
                  id={e.id}
                  prodImage={e.images}
                  desc={e.description}
                  currency={e.currency}
                  price={e.price}
                  productName={e.name}
                  discount={e.discount}
                  key={e.id}
                />
              );
            })}
          </Flex>
        </Layout>
      </Flex>
    </>
  );
};

export default Hahaok3;
