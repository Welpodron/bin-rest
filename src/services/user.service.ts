import { User } from "../models/user.model";
import {
  buildModelGet,
  buildModelWhere,
  buildModelSort,
} from "../utils/models";

export class UserService {
  static get = async (config?: { get?: any; where?: any; sort?: any }) => {
    return await User.findAll({
      attributes: buildModelGet(User, config?.get),
      where: buildModelWhere(User, config?.where),
      order: buildModelSort(User, config?.sort),
    });
  };
}
