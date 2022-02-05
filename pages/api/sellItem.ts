import { NextApiHandler } from "next";
import { sellItem } from "../../src/types";
import prisma from "../../lib/prisma";

const handle: NextApiHandler = async (req, res) => {
  if (req.method !== "POST") return;
  const item = JSON.parse(req.body || "{}") as sellItem;
  const { category, currency, description, images, name, price, stock } = item;
  console.log(item);
  const setItem = await prisma.item.create({
    data: {
      category,
      currency,
      description,
      name,
      price,
      stock,
      discount: 0,
      images,
      sale: false,
    },
  });
  return res.json(setItem);
};

export default handle;
