import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import BuyCard from "../src/components/BuyCard";
import Navbar from "../src/components/Navbar";
import prisma from "../lib/prisma";
import { useSelector } from "react-redux";
import { userState } from "../src/store";
import { item } from "../types/collectionTypes";

export const getStaticProps: GetStaticProps = async () => {
  const items = await prisma.item.findMany();
  return {
    props: { items },
  };
};

const Home: NextPage<{ items: item[] }> = ({ items }) => {
  return (
    <div>
      <Head>
        <title>Mise Mart | Buy and Sell with ease</title>
        <meta name="description" content="Ecommerce but better" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="flex flex-col h-screen w-screen flex-wrap text-gray-200 bg-primary">
          <Navbar />
          <div className="flex mt-5 flex-wrap w-screen ">
            {items.map((e) => {
              return (
                <BuyCard
                  prodImage={e.images}
                  category={e.category}
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
