import "../styles/globals.css";
import type { AppProps } from "next/app";
import { store } from "../src/store";
import { Provider } from "react-redux";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../src/theme/theme";
import "swiper/css/bundle";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51KPw6USAYLD5jJ6ZAC3jDZtCetRhX1eU2LpllyvRxzyDV9NY6qPMOfjx4oCgNcCICnVmwzr0U4uO6oQI8c7Z0w6W00336ju9w2"
);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
