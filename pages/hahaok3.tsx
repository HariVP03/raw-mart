import { chakra, Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import BuyCard from "../src/components/BuyCard";
import Navbar from "../src/components/Navbar";

const Hahaok3: React.FC = () => {
  const [items, setItems] = useState([]);
  const getItems = async () => {
    fetch("/api/hahaok3", {
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
    <Flex minH="100vw" maxW="100vw" direction="column">
      <Navbar />
      <chakra.h2 fontSize="3xl" mt="13vh" ml={8}>
        Hahaok3
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
    </Flex>
  );
};

export default Hahaok3;
