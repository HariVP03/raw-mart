import prisma from "../../../lib/prisma";

const handle = async (req: any, res: any) => {
  let email = req.query.id;
  const items = await prisma.itemsInCart.findMany({
    where: {
      email: {
        equals: email,
      },
    },
    select: {
      item: true,
    },
  });
  res.json(items);
};

export default handle;
