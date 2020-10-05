import { initialize } from "../../firebase";
import collections from "../../firebase/colections";
import { OrderState } from "../../models/Order";

export default class OrderService {
  db = initialize.firestore();

  async getAll() {
    return this.db
      .collection(collections.orders)
      .where("orderState", "==", Number(OrderState.Pending));
  }

  async updateOrder(id: string, time: number): Promise<void> {
    const result = this.db
      .collection(collections.orders)
      .where("id", "==", id)
      .get();
    const orderId = (await result).docs[0].id;
    return await this.db
      .collection(collections.orders)
      .doc(orderId)
      .update({ time });
  }

  async setComplete(id: string): Promise<void> {
    const result = this.db
      .collection(collections.orders)
      .where("id", "==", id)
      .get();
    const orderId = (await result).docs[0].id;
    return await this.db
      .collection(collections.orders)
      .doc(orderId)
      .update({ orderState: OrderState.Completed });
  }
}
