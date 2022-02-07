import { NextApiHandler } from "next";
import { Stripe } from "stripe";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const handler: NextApiHandler = async (req, res) => {
  let line_items = req.body;
  console.log(line_items);
  const params: Stripe.Checkout.SessionCreateParams = {
    submit_type: "pay",
    payment_method_types: ["card"],
    // line_items: [
    //   {
    //     name: "Hah product",
    //     amount: 500,
    //     currency: "USD",
    //     quantity: 1,
    //     description: "haha ok",
    //     images: [
    //       "https://images.unsplash.com/photo-1644186194243-ab96433ecf47?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    //     ],
    //   },
    // ],
    line_items,
    success_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
  };
  const checkoutSession: Stripe.Checkout.Session =
    await stripe.checkout.sessions.create(params);
  res.json(checkoutSession);
};

export default handler;
