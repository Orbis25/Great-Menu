import { Category } from "../../models/Category";
import { initialize } from "../../firebase";
import collections from "../../firebase/colections";
import { generateId, getDateTimeNowStr } from "../../utils";

export default class CategoryService {
  db = initialize.firestore();

  async add(model: Category): Promise<void> {
    model.id = generateId();
    model.createdAt = getDateTimeNowStr();
    return await this.db.collection(collections.category).doc().set(model);
  }

  async getAll(): Promise<
    firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>
  > {
    return await this.db.collection(collections.category).get();
  }

  async remove(id: string): Promise<void> {
    const result = await this.db
      .collection(collections.category)
      .where("id", "==", id)
      .get();
    const fireId = result.docs[0].id;
    return await this.db.collection(collections.category).doc(fireId).delete();
  }

  async notExist(name:string):Promise<boolean>{
    const response = await this.db.collection(collections.category).where("name","==",name).get();
    return response.empty;
  }
}
