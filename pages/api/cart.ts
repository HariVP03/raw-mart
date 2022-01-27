import prisma from "../../lib/prisma";

const handle = async (req: Request, res: any) => {
  let temp = req.body as any;
  let email = temp.email;
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
