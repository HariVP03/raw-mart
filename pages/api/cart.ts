import { auth } from "./../../firebase";
import { userState } from "./../../src/store";
import { userSlice } from "./../../src/features/user";
import prisma from "../../lib/prisma";
import { useSelector } from "react-redux";

const handle = async (req: Request, res: any) => {
  // let email = "harryskotch11@gmail.com";
  // let email = auth.currentUser?.email || "";
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
