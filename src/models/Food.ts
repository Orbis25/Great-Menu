import { CommonProp } from "./CommonProp";

export enum FoodState {
  Active,
  SoldOut,
}

export interface Food extends CommonProp {
  name: string;
  price: number;
  category: string;
  description: string;
  photoUrl: string;
  State: FoodState;
}
