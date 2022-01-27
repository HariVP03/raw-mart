import prisma from "../../../lib/prisma";

const handle = async (req: Request, res: any) => {
  const temp = req.body as any;
  const id = temp.id;
  const item = await prisma.item.findUnique({
    where: {
      id,
    },
  });
  res.json(item);
};

export default handle;
