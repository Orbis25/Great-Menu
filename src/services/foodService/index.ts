import { initialize, storage } from "../../firebase";
import { Food } from "../../models/Food";
import collections from "../../firebase/colections";
import { generateId, getDateTimeNowStr } from "../../utils";
import { FireSQL } from "firesql";
import { DocumentData } from "firesql/utils";

export default class FoodService {
  db = initialize.firestore();
  storage = initialize.storage();

  async add(model: Food): Promise<void> {
    model.id = generateId();
    model.createdAt = getDateTimeNowStr();
    model.name = model.name.toLowerCase();
    return this.db.collection(collections.foods).doc().set(model);
  }

  async getAll(): Promise<
    firebase.firestore.CollectionReference<firebase.firestore.DocumentData>
  > {
    return this.db.collection(collections.foods);
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

  search = async (name: string): Promise<DocumentData[]> => {
    const fireSQL = new FireSQL(this.db);
    let query = `SELECT * FROM foods`;
    if (name.length && name !== "")
      query = `${query} WHERE name LIKE '${name.toLowerCase()}%'`;
    return fireSQL.query(query);
  };

  getById = async (id: string) => {
    return await this.db
      .collection(collections.foods)
      .where("id", "==", id)
      .get();
  };
}
