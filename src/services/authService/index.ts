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
}
