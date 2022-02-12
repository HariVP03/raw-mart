import type { NextPage } from "next";
import Head from "next/head";
import BuyCard from "../src/components/BuyCard";
import Navbar from "../src/components/Navbar";
import prisma from "../lib/prisma";
import { item } from "../types/collectionTypes";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import { chakra, Flex, Image } from "@chakra-ui/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/bundle";
import styles from "../styles/carousel.module.css";
import SectionBox from "../src/components/SectionBox";
import Layout from "../src/components/Layout";
import { onAuthStateChanged } from "firebase/auth";

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
        <title>Raw Mart</title>
        <meta name="description" content="Ecommerce but better" />
        <link rel="icon" href="/store.png" />
      </Head>

      <Layout>
        <main>
          <div className="flex flex-col pb-[10vh] min-h-screen text-gray-200 ">
            {/* <Navbar /> */}
            <Flex mt="9vh">
              <Swiper
                navigation={true}
                modules={[Navigation]}
                className={styles.swiper}
                color="black"
                style={{ height: "50vh", zIndex: 1 }}
              >
                <SwiperSlide className={styles["swiper-slide"]}>
                  <Image
                    w="full"
                    h="full"
                    objectFit="cover"
                    src="https://lh3.google.com/u/0/d/1SnNiP1pevpK5FyYgPMJvcPSYq5rhpv4Y=w1920-h913-iv1"
                    alt="Image 1"
                  />
                </SwiperSlide>
                <SwiperSlide className={styles["swiper-slide"]}>
                  <Image
                    w="full"
                    h="full"
                    src="https://lh3.google.com/u/0/d/1jnvQVFk7BPCCyvok22SaYfE3yRwZ6wNz=w1920-h601-iv1"
                    objectFit="cover"
                    alt="Image 2"
                  />
                </SwiperSlide>

                <SwiperSlide className={styles["swiper-slide"]}>
                  <Image
                    w="full"
                    h="full"
                    objectFit="cover"
                    src="https://lh3.google.com/u/0/d/14Xb-xrd_cIvmxog_nqTtfAywEmoSZ1bh=w1920-h601-iv1"
                    alt="image 3"
                  />
                </SwiperSlide>
              </Swiper>
            </Flex>
            <Flex flexWrap="wrap" justify="space-around" align="center" my={12}>
              <SectionBox
                link="/raw-material"
                name="Raw Material"
                images={[
                  "https://lh3.google.com/u/0/d/1ynaiwMoqy6gMCZ6FS3YXz16ZtOGPEgGO=w1920-h601-iv1",
                  "https://lh3.google.com/u/0/d/16q0Ph8BAYJAT7BXm1mQuz3uQSu1NZDyA=w1920-h601-iv1",
                  "https://lh3.google.com/u/0/d/1Fgo_dR1mTblQatf0Ngjxq51_IObbeTTG=w1920-h601-iv1",
                  "https://lh3.google.com/u/0/d/1oXRj282zGgso8SWnFPNSEV1JF2DQiMa2=w1920-h601-iv1",
                ]}
              />
              <SectionBox
                link="/harvested"
                name="Harvested E-waste"
                images={[
                  "https://lh3.google.com/u/0/d/1C72TgFJB7kYw8MMakXbDy_xzccWRZXKl=w1920-h601-iv1",
                  "https://lh3.google.com/u/0/d/12-XP-g856u21vplhEGyHR4b_7CmZWe5e=w1920-h601-iv2",
                  "https://lh3.google.com/u/0/d/1zbg9q7y8ntGrc1e_5vUAetEPvUkQ25FL=w1920-h601-iv1",
                  "https://lh3.google.com/u/0/d/1cfHfoA7ks8aSZNBLorVq6NOdo0PFlKfm=w1920-h601-iv1",
                ]}
              />
              <SectionBox
                link="/recycled"
                name="Re-cycled"
                images={[
                  "https://lh3.google.com/u/0/d/1cfHfoA7ks8aSZNBLorVq6NOdo0PFlKfm=w1920-h601-iv1",
                  "https://lh3.google.com/u/0/d/1Nmfdwar2dePnTfsRp8aFk-HN9oPsC5Zo=w1920-h601-iv1",
                  "https://lh3.google.com/u/0/d/1BmruI7ajGb4fD8P5R-iPf7ifSwRRWX8Z=w1920-h601-iv1",
                  "https://lh3.google.com/u/0/d/1CjhcGdEkc15V-wYQvS96xo51G7xF5B0c=w1920-h601-iv1",
                ]}
              />
            </Flex>
            <chakra.div px={14} className="flex flex-wrap">
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
            </chakra.div>
          </div>
        </main>
      </Layout>
    </div>
  );
};

export default Home;
