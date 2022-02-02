import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  const test = await prisma.itemsInCart.create({
    data: {
      email: "harryskotch11@gmail.com",
      itemId: "61ef855390b46db3ded385a3",
    },
  });
  console.log(test);
  res.json(test);
};

export default handle;
