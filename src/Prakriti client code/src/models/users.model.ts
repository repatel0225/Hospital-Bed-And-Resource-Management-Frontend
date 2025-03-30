export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password?: string;
  confirmPassword?: string;
  role?: string;
  contactNo: number
}

export interface IUserResponse {
  data: {
    userData: Array<IUser>;
    token: string;
  };
}

export interface IFormLoginValues {
  email: string;
  password: string;
}

export interface ILoggedInEmployeeStore {
  loggedInUser: {
    data: Array<IUser>;
  };
}
