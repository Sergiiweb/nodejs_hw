import { User } from "../models/User.model";
import { IUser } from "../types/user.type";

class UserService {
  public async getAll(): Promise<IUser[]> {
    return await User.find();
  }
}

export const userService = new UserService();
