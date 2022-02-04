import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import BuyCard from "../src/components/BuyCard";
import Navbar from "../src/components/Navbar";
import prisma from "../lib/prisma";
import { item } from "../types/collectionTypes";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import { Flex, Image } from "@chakra-ui/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/bundle";
import styles from "../styles/carousel.module.css";

const Home: NextPage = () => {
  const [items, setItems] = useState<item[] | null>();
  const getItems = async () => {
    fetch("/api/items", {
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
    <div>
      <Head>
        <title>Mise Mart | Buy and Sell with ease</title>
        <meta name="description" content="Ecommerce but better" />
        <link rel="icon" href="/store.png" />
      </Head>

      <main>
        <div className="flex flex-col pb-[10vh] min-h-screen w-screen text-gray-200 ">
          <Navbar />
          <Flex w="100vw" mt="9vh">
            <Swiper
              navigation={true}
              modules={[Navigation]}
              className={styles.swiper}
              color="black"
              style={{ height: "50vh" }}
            >
              <SwiperSlide className={styles["swiper-slide"]}>
                <Image
                  w="full"
                  h="full"
                  objectFit="cover"
                  src="https://images.unsplash.com/photo-1607083207685-aaf05f2c908c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                  alt="Cyan-Illustrated-And-Traditional-Maximalist-Maha-Navmi-Sale-Instagram-Post"
                />
              </SwiperSlide>
              <SwiperSlide className={styles["swiper-slide"]}>
                <Image
                  w="full"
                  h="full"
                  objectFit="cover"
                  src="https://images.unsplash.com/photo-1536408803730-06d570c65a79?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                  alt="Cyan-Illustrated-And-Traditional-Maximalist-Maha-Navmi-Sale-Instagram-Post"
                />
              </SwiperSlide>

              <SwiperSlide className={styles["swiper-slide"]}>
                <Image
                  w="full"
                  h="full"
                  objectFit="cover"
                  src="https://images.unsplash.com/photo-1585750130716-42e238075a88?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                  alt="Cyan-Illustrated-And-Traditional-Maximalist-Maha-Navmi-Sale-Instagram-Post"
                />
              </SwiperSlide>
            </Swiper>
          </Flex>
          <div className="flex mt-[10vh] flex-wrap w-screen">
            {items?.map((e) => {
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
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
