import { Schema, model } from 'mongoose';

interface IPayLog {
  orderId: string;
  amount: number;
  status: string;
  payerEmail: string;
  createTime: string;
}

const payLogSchema = new Schema<IPayLog>({
  orderId: { type: String, required: true },
  amount: { type: Number, required: true },
  status: { type: String, required: true },
  payerEmail: { type: String, required: true },
  createTime: { type: String, required: true },
});

export const PayLog = model<IPayLog>('PayLog', payLogSchema);