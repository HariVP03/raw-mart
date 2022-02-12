import {
  Button,
  Drawer,
  Text,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { userState } from "../store";
import getStripe from "../stripe/getStripe";
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

  const createCheckoutSession = async () => {
    if (data === []) return;
    let temp = data.map((f: any) => {
      let e = f.item;
      return {
        name: e.name,
        amount: e.price * (100 - e.discount),
        currency: e.currency,
        quantity: 1,
        description: e.description,
        images: e.images,
      };
    });
    fetch("/api/checkout_sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(temp),
    })
      .then((res) => res.json())
      .then(async (data) => {
        const stripe = await getStripe();
        const { error } = await stripe!.redirectToCheckout({
          sessionId: data.id,
        });
        console.warn(error.message);
      });
  };
  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="right" closeOnEsc>
      <DrawerOverlay />
      <DrawerContent minW="600px">
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
        <DrawerFooter flexDirection="column" alignItems="center">
          <Button
            isDisabled={data?.length === 0}
            onClick={() => {
              // console.log(data);
              createCheckoutSession();
            }}
          >
            Proceed to Checkout
          </Button>
          <Text fontSize="sm" color="gray.400" w="full" textAlign="center">
            This is only a test website and you will not get these items
          </Text>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default Cart;
