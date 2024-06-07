import { Request, Response } from 'express'
import crypto from 'crypto';
const webhookSecret = "EB3HOX498EOhuSqV3Ev_YFCmAcyp8z43zmS57Lm2p4GOpxwRLU41KI_Jf5b_d2nHQTu3KEAQJjXsWMRm";
import onError from '../middlewares/errors'
import { PayLog } from '../models/payLog';
import { Product } from '../types/Product';
import Order from '../models/order';
import Stripe from 'stripe';
const secretKey = process.env.PUBLIC_STRIPE_SECRET_KEY || "";

const stripe = new Stripe(secretKey);
const host = process.env.PUBLIC_HOST;

export const CheckoutController = async (req: Request, res: Response) => {
  try {
    console.log('webhook');
    // Ensure that the request is a POST request
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method Not Allowed' });
    }

    // Get the raw body and the signature from headers
    const rawBody = JSON.stringify(req.body);
    const signature = req.headers['paypal-transmission-id'] as string;

    // Verify the signature using HMAC with the secret
    const verified = crypto
      .createHmac('sha256', webhookSecret || '')
      .update(rawBody)
      .digest('hex');

    // Check if the computed signature matches the header's signature
    if (signature === verified) {
      console.log('Webhook received:', req.body);

      const { order } = req.body;
      const payLog = new PayLog({
        orderId: order.id,
        amount: order.purchase_units[0].amount.value,
        status: order.status,
        payerEmail: order.payer.email_address,
        createTime: order.create_time,
      });
  
      await payLog.save();
      // Your course fulfillment or other business logic here

      res.status(200).json({ message: 'Webhook received successfully.' });
    } else {
      console.error('Webhook verification failed.');
      res.status(403).json({ message: 'Unauthorized' });
    }
  } catch (error: any) {
    onError(error, req, res)
  }
};

export const AddOrderItemController = async (
  req: Request,
  res: Response
) => {
  try {
    const {cartItems, userid} = req.body;
    await saveOrdersData({...cartItems, userid});

    // const user = await registerUserService(req.body as Product)
    return res.status(201).json({
      // user,
    })
  } catch (error: any) {
    onError(error, req, res)
  }
}


export const getOrderItemController = async (
  req: Request,
  res: Response
) => {
  try {
    const {cartItems} = req.body;
    await saveOrdersData(cartItems);

    // const user = await registerUserService(req.body as Product)
    return res.status(201).json({
      // user,
    })
  } catch (error: any) {
    onError(error, req, res)
  }
}


async function saveOrdersData(cartItems: any) {
  for (const item of cartItems) {
    const newOrder = new Order(item);
    try {
      await newOrder.save();
      console.log(`Saved: ${item.title}`);
    } catch (error) {
      console.error(`Error saving ${item.title}: `, error);
    }
  }
}


export const StripeController = async (
  req: Request,
  res: Response
) => {
  try {
    const {amount} = req.body;
    // await saveOrdersData(cartItems);
    
    const date = new Date().toISOString();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "INV-" + date,
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      cancel_url: `${host}`,
      success_url: `${host}/pages/order-success`,
    });

    return res.status(200).json({ sessionId: session.id });

  } catch (error: any) {
    onError(error, req, res)
  }
}
