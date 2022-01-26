import prisma from "../../lib/prisma";
import { auth } from "../../firebase";
import { useSelector } from "react-redux";

const handle = async (req: Request, res: any) => {
  const email = "harryskotch11@gmail.com";
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
