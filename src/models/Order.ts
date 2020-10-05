import { CommonProp } from "./CommonProp";
import { Food } from "./Food";

export enum OrderState {
  Pending,
  InProgress,
  Completed,
}

export interface ToOrder {
  food: Food;
  qyt: number;
}

export interface Order extends CommonProp {
  orderState: OrderState;
  uidUser: string;
  tableNumber: number;
  total: number;
  orders: ToOrder[];
  time: number;
  canceledMotive?: string;
}
