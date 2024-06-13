import { Request, Response } from 'express'
import crypto from 'crypto';
const webhookSecret = "EB3HOX498EOhuSqV3Ev_YFCmAcyp8z43zmS57Lm2p4GOpxwRLU41KI_Jf5b_d2nHQTu3KEAQJjXsWMRm";
import onError from '../middlewares/errors'
import { PayLog } from '../models/payLog';
import { Product } from '../types/Product';
import Order from '../models/order';
import Stripe from 'stripe';

const secretKey = "sk_test_51JrgTaHz47FoVxKIhnTmCeehkEDRlmGiX40lvjCBERiy48AjLcRRlb1nD0ion5luM6J5Z06EeMnGBJ4Q60ZYvGWg001mQYv1aQ";

const stripe = new Stripe(secretKey);
const host = process.env.PUBLIC_HOST || "https://tlevue.com";
const endpointSecret = "whsec_6211c5da3208c3663bbdadb1b3e80307d433107a9ba9937d1d450015dbc7aa16";

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
            unit_amount: amount * 100,
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


export const StripeHookController = async (
  req: Request,
  res: Response
) => {
  try {
    // await saveOrdersData(cartItems);
    const sig = req.headers['stripe-signature'];

    let event;
  
    try {
      event = stripe.webhooks.constructEvent(req.body, sig||[], endpointSecret);
    } catch (err) {
      res.status(400).send(`Webhook Error: ${err}`);
      return;
    }

    console.log(event);

    // Handle the event
    switch (event.type) {
      case 'checkout.session.async_payment_failed':
        const checkoutSessionAsyncPaymentFailed = event.data.object;
        // Then define and call a function to handle the event checkout.session.async_payment_failed
        break;
      case 'checkout.session.async_payment_succeeded':
        const checkoutSessionAsyncPaymentSucceeded = event.data.object;
        // Then define and call a function to handle the event checkout.session.async_payment_succeeded
        break;
      case 'checkout.session.completed':
        const checkoutSessionCompleted = event.data.object;
        // Then define and call a function to handle the event checkout.session.completed
        break;
      case 'checkout.session.expired':
        const checkoutSessionExpired = event.data.object;
        // Then define and call a function to handle the event checkout.session.expired
        break;
      case 'payment_method.attached':
        const paymentMethodAttached = event.data.object;
        // Then define and call a function to handle the event payment_method.attached
        break;
      case 'payment_method.automatically_updated':
        const paymentMethodAutomaticallyUpdated = event.data.object;
        // Then define and call a function to handle the event payment_method.automatically_updated
        break;
      case 'payment_method.detached':
        const paymentMethodDetached = event.data.object;
        // Then define and call a function to handle the event payment_method.detached
        break;
      case 'payment_method.updated':
        const paymentMethodUpdated = event.data.object;
        // Then define and call a function to handle the event payment_method.updated
        break;
      case 'product.created':
        const productCreated = event.data.object;
        // Then define and call a function to handle the event product.created
        break;
      case 'product.deleted':
        const productDeleted = event.data.object;
        // Then define and call a function to handle the event product.deleted
        break;
      case 'product.updated':
        const productUpdated = event.data.object;
        // Then define and call a function to handle the event product.updated
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
    res.send();
  } catch (error: any) {
    onError(error, req, res)
  }
}
