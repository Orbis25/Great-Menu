import { initialize, storage } from "../../firebase";
import { Food } from "../../models/Food";
import collections from "../../firebase/colections";
import { generateId, getDateTimeNowStr } from "../../utils";

export default class FoodService {
  db = initialize.firestore();
  storage = initialize.storage();

  async add(model: Food): Promise<void> {
    model.id = generateId();
    model.createdAt = getDateTimeNowStr();
    return this.db.collection(collections.foods).doc().set(model);
  }

  async update(model: Food): Promise<void> {
    model.updatedAt = getDateTimeNowStr();

    const result = await this.db
      .collection(collections.foods)
      .where("id", "==", model.id)
      .get();

    const fireId = result.docs[0].id;

    return await this.db
      .collection(collections.foods)
      .doc(fireId)
      .update(model);
  }

  uploadPhoto = async (
    file: Blob | Uint8Array | ArrayBuffer | any
  ): Promise<any> => {
    const name = generateId();
    const ref = this.storage.ref(storage.food).child(name);
    const resultUpload = ref.put(file);
    await resultUpload;
    return await this.storage.ref(storage.food).child(name).getDownloadURL();
  };
}
