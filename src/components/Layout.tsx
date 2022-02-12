import React, { ReactNode, useState } from "react";
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  ComponentWithAs,
  IconProps,
} from "@chakra-ui/react";
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
  FiBell,
  FiChevronDown,
  FiShoppingCart,
} from "react-icons/fi";
import { IconType } from "react-icons";
import { ReactText } from "react";
import { AddIcon } from "@chakra-ui/icons";
import { User, onAuthStateChanged, signInWithRedirect } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { auth, provider } from "../../firebase";
import { setCart } from "../features/cart";
import user, { setUser } from "../features/user";
import { userState } from "../store";
import Cart from "./Cart";
import router, { Router } from "next/router";

interface LinkItemProps {
  name: string;
  icon: any;
  link: string;
}
const LinkItems: Array<LinkItemProps> = [
  { name: "Home", icon: FiHome, link: "/" },
  { name: "Explore", icon: FiCompass, link: "/" },
  { name: "Sell an Item", icon: AddIcon, link: "/sell" },
];

export default function SidebarWithHeader({
  children,
}: {
  children: ReactNode;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);

  const user = JSON.parse(
    useSelector((state: userState) => state.user.value) || "{}"
  ) as User;
  const cart = useSelector((state: userState) => state.cart.value);

  const getData = async (email: string) => {
    fetch(`/api/cart/${email}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        dispatch(setCart(data));
      });
  };
  const [avatar, setAvatar] = useState(
    `https://avatars.dicebear.com/api/avataaars/${(
      Math.random() * 1000
    ).toString()}.png`
  );
  onAuthStateChanged(auth, (res) => {
    if (!res) return;
    dispatch(setUser(JSON.stringify(res)));
    setAvatar(res.photoURL || "");
    if (cart === null) {
      getData(res.email || "");
      setLoading(false);
    }
  });

  const signIn = () => {
    signInWithRedirect(auth, provider);
  };
  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Raw Mart
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem
          key={link.name}
          icon={link.icon}
          onClick={() => {
            router.push(link.link);
          }}
        >
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
}
const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
  return (
    <Link
      href="#"
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        transition="all"
        transitionDuration="200ms"
        _hover={{
          bg: "cyan.400",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  const user = JSON.parse(
    useSelector((state: userState) => state.user.value) || "{}"
  ) as User;
  const { isOpen, onClose, onOpen: onOpenCart } = useDisclosure();
  const signIn = () => {
    signInWithRedirect(auth, provider);
  };
  const dispatch = useDispatch();
  const [avatar, setAvatar] = useState(
    `https://avatars.dicebear.com/api/avataaars/${(
      Math.random() * 1000
    ).toString()}.png`
  );
  onAuthStateChanged(auth, (res) => {
    if (!res) {
      return;
    }
    dispatch(setUser(JSON.stringify(res)));
    setAvatar(res.photoURL || "");
  });
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        Scrap Mart
      </Text>

      <Cart isOpen={isOpen} onClose={onClose} />
      <HStack spacing={{ base: "0", md: "6" }}>
        <IconButton
          size="lg"
          onClick={onOpenCart}
          variant="ghost"
          textAlign="center"
          aria-label="open menu"
          icon={<FiShoppingCart />}
        />
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <Avatar
                  size={"sm"}
                  src={
                    user?.photoURL ||
                    `https://avatars.dicebear.com/api/avataaars/${(
                      Math.random() * 1000
                    ).toString()}.png`
                  }
                />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">{user?.displayName}</Text>
                  <Text fontSize="xs" color="gray.600">
                    User
                  </Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            {auth.currentUser ? (
              <MenuList bg="gray.900" borderColor="gray.700">
                <MenuItem
                  onClick={() => {
                    auth.signOut();
                    // router.push("/");
                  }}
                >
                  Sign out
                </MenuItem>
              </MenuList>
            ) : (
              <MenuList bg="gray.900" borderColor="gray.700">
                <MenuItem onClick={signIn}>Sign in with Google</MenuItem>
              </MenuList>
            )}
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};
