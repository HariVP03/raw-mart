import prisma from "../../lib/prisma";

const handle = async (req: Request, res: any) => {
  const items = await prisma.item.findMany();
  console.log(items);
  res.json(items);
};

export default handle;
