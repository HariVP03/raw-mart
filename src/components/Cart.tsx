import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { userState } from "../store";
import CartItem from "./CartItem";

const Cart: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const test = async () => {
    fetch("/api/test", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
      });
  };

  const data = useSelector((state: userState) => state.cart.value);
  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="right" closeOnEsc>
      <DrawerOverlay />
      <DrawerContent minW="400px" bg="secondary">
        <DrawerHeader>Cart</DrawerHeader>
        <DrawerCloseButton />
        <DrawerBody p={1} display="flex" flexDir="column">
          {data === null
            ? "Loading..."
            : data === []
            ? "No items in your cart"
            : data?.map((f: any) => {
                let e = f.item;
                return (
                  <CartItem
                    id={e.id}
                    itemsInCartId={f.id}
                    category={e.category}
                    currency={e.currency}
                    price={e.price}
                    discount={e.discount}
                    prodImage={e.images}
                    key={e.id}
                    productName={e.name}
                  />
                );
              })}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default Cart;
