import { User } from "../models/user.model";

import {
  buildModelGet,
  buildModelWhere,
  buildModelSort,
} from "../utils/models";

export class UserService {
  static getAll = async (config?: {
    _ignoreProtection?: boolean;
    _whereUnsafe?: any;
    _getUnsafe?: any;
    _sortUnsafe?: any;
    get?: any;
    where?: any;
    sort?: any;
  }) => {
    return await User.findAll({
      attributes: buildModelGet({
        model: User,
        get: config?.get,
        _ignoreProtection: config?._ignoreProtection,
      }),
      where: buildModelWhere({
        model: User,
        where: config?.where,
        _ignoreProtection: config?._ignoreProtection,
      }),
      order: buildModelSort({
        model: User,
        sort: config?.sort,
        _ignoreProtection: config?._ignoreProtection,
      }),
    });
  };
  static getOne = async (config?: {
    _ignoreProtection?: boolean;
    get?: any;
    where?: any;
  }) => {
    return await User.findOne({
      attributes: buildModelGet({
        model: User,
        get: config?.get,
        _ignoreProtection: config?._ignoreProtection,
      }),
      where: buildModelWhere({
        model: User,
        where: config?.where,
        _ignoreProtection: config?._ignoreProtection,
      }),
    });
  };
  static create = async (fields: Record<any, string>) => {
    try {
      const user = await User.create(fields);
    } catch (error) {
      console.error(error);
    } finally {
      return 1;
    }
  };
}
