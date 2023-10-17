import { ApiError } from "../errors/api.error";
import { User } from "../models/User.model";
import { userRepository } from "../repositories/user.repository";
import { IPaginationResponse, IQuery } from "../types/pagination.type";
import { IUser } from "../types/user.type";

class UserService {
  public async getAll(): Promise<IUser[]> {
    return await userRepository.getAll();
  }

  public async getAllWithPagination(
    query: IQuery,
  ): Promise<IPaginationResponse<IUser>> {
    try {
      const queryStr = JSON.stringify(query);
      const queryObj = JSON.parse(
        queryStr.replace(/\b(gte|lte|gt|lt)\b/, (match) => `$${match}`),
      );

      const {
        page = 1,
        limit = 5,
        sortedBy = "createdAt",
        ...searchObject
      } = queryObj;

      const skip = +limit * (+page - 1);

      const [users, itemsFound] = await Promise.all([
        User.find(searchObject).limit(+limit).skip(skip).sort(sortedBy),
        User.count(searchObject),
      ]);

      return {
        page: +page,
        limit: +limit,
        itemsFound,
        data: users,
      };
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  // public async createUser(dto: IUser): Promise<IUser> {
  //   const user = await userRepository.getOneByParams({ email: dto.email });
  //   if (user) {
  //     throw new ApiError("Email already exist", 409);
  //   }
  //
  //   return await userRepository.createUser(dto);
  // }

  public async updateUser(
    manageUserId: string,
    dto: Partial<IUser>,
    userId: string,
  ): Promise<IUser> {
    this.checkAbilityToManage(userId, manageUserId);

    return await userRepository.updateOneById(manageUserId, dto);
  }

  public async deleteUser(userId: string): Promise<void> {
    await userRepository.deleteUser(userId);
  }

  public async getMe(userId: string): Promise<IUser> {
    return await userRepository.findById(userId);
  }

  private checkAbilityToManage(userId: string, manageUserId: string): void {
    if (userId !== manageUserId) {
      throw new ApiError("You can not manage this user", 403);
    }
  }
}

export const userService = new UserService();
