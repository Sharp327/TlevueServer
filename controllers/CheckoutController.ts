import { Request, Response } from 'express'
import crypto from 'crypto';
const webhookSecret = "EJ-oQDbYyqCXK6jSoyXe_0krlh75IXzED4WmkibzoZHsxjyXY_hOt7GJYg2E3RnobpzmR4xOeHbN-Qtu";
import onError from '../middlewares/errors'
import { PayLog } from '../models/payLog';

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
