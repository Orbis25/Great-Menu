export enum AuthLevel {
  Admin,
  User,
}

export interface UserAuthVm {
  userName: string;
  password: string;
}

export interface CurrentUser {
  uid: string;
  userName: string;
  displayName: string;
  email: string;
  photoUrl: string;
  phoneNumber: string;
}

export interface User {
  fullName: string;
  userName: string;
  userUid: string;
  rol: AuthLevel;
}
