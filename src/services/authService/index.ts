import collections from "../../firebase/colections";
import { initialize } from "../../firebase/index";
import { UserAuthVm } from "../../models/User";

export default class AuthService {
  async login(model: UserAuthVm): Promise<firebase.auth.UserCredential> {
    return await initialize
      .auth()
      .signInWithEmailAndPassword(model.userName, model.password);
  }

  async logout(): Promise<void> {
    localStorage.removeItem("auth");
    return await initialize.auth().signOut();
  }

  async updateProfileName(displayName: string): Promise<void> {
    return await initialize.auth().currentUser?.updateProfile({ displayName });
  }

  async getUserByUid(
    uid: string
  ): Promise<
    firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>
  > {
    return await initialize
      .firestore()
      .collection(collections.users)
      .where("userUid", "==", uid)
      .get();
  }

  async getClaims(): Promise<firebase.auth.IdTokenResult | undefined> {
    return await initialize.auth().currentUser?.getIdTokenResult();
  }
}
