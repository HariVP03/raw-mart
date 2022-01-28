import prisma from "../../lib/prisma";

const handle = async (req: any, res: any) => {
  const { email, itemId } = req.body;
  const exists = await prisma.itemsInCart.count({
    where: {
      itemId,
      AND: {
        email,
      },
    },
  });
  if (exists !== 0) return;
  const addToCart = await prisma.itemsInCart.create({
    data: {
      email,
      itemId,
    },
  });
  const id = addToCart.itemId;
  const item = await prisma.item.findUnique({
    where: {
      id,
    },
  });
  res.json(item);
};

export default handle;
