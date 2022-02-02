import { NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

const handle = async (req: any, res: NextApiResponse) => {
  const { id } = req.query;
  const item = await prisma.item.findUnique({
    where: {
      id,
    },
  });
  res.json(item);
};

export default handle;
