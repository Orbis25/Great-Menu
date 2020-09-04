import { CommonProp } from "./CommonProp";

export interface Category extends CommonProp {
  name: string;
  description?: string;
}
