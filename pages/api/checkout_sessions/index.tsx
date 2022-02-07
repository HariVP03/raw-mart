import { NextApiHandler } from "next";
import { Stripe } from "stripe";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const handler: NextApiHandler = async (req, res) => {
  let line_items = req.body;
  console.log(line_items);
  const params: Stripe.Checkout.SessionCreateParams = {
    submit_type: "pay",
    payment_method_types: ["card"],
    line_items,
    success_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
  };
  const checkoutSession: Stripe.Checkout.Session =
    await stripe.checkout.sessions.create(params);
  res.json(checkoutSession);
};

export default handler;
