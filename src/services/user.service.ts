import { ApiError } from "../errors/api.error";
import { User } from "../models/User.model";
import { userRepository } from "../repositories/user.repository";
import { IUser } from "../types/user.type";
import { UserValidator } from "../validators/user.validator";

class UserService {
  public async getAll(): Promise<IUser[]> {
    const users = await userRepository.getAll();

    return users;
  }
  public async createUser(): Promise<IUser[]> {
    const createdUser = await User.create(value);
  }
}

export const userService = new UserService();
