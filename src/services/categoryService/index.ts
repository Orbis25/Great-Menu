import { Category } from "../../models/Category";
import { initialize } from "../../firebase";
import collections from "../../firebase/colections";
import { generateId } from "../../utils";

export default class CategoryService {
  db = initialize.firestore();

  async add(model: Category): Promise<void> {
    model.id = generateId();
    return await this.db.collection(collections.category).doc().set(model);
  }

  async getAll(): Promise<
    firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>
  > {
    return await this.db.collection(collections.category).get();
  }
}
