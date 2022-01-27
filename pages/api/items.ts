import prisma from "../../lib/prisma";

const handle = async (req: Request, res: any) => {
  const items = await prisma.item.findMany();
  res.json(items);
};

export default handle;
