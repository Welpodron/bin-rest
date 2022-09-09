import { User } from "../models/user.model";

import {
  buildModelGet,
  buildModelWhere,
  buildModelSort,
  buildModelLimit,
} from "../utils/models";

export class UserService {
  static getAll = async (config?: {
    _ignoreProtection?: boolean;
    _whereRawUnsafe?: any;
    _getRawUnsafe?: any;
    _sortRawUnsafe?: any;
    _sortRaw?: any;
    _getRaw?: any;
    _whereRaw?: any;
    get?: any;
    where?: any;
    sort?: any;
    limit?: any;
    _limitRawUnsafe?: any;
  }) => {
    const attributes = buildModelGet({
      model: User,
      get: config?.get,
      _ignoreProtection: config?._ignoreProtection,
      _getRaw: config?._getRaw,
      _getRawUnsafe: config?._getRawUnsafe,
    });

    const where = buildModelWhere({
      model: User,
      where: config?.where,
      _ignoreProtection: config?._ignoreProtection,
      _whereRaw: config?._whereRaw,
      _whereRawUnsafe: config?._whereRawUnsafe,
    });

    const order = buildModelSort({
      model: User,
      sort: config?.sort,
      _ignoreProtection: config?._ignoreProtection,
      _sortRaw: config?._sortRaw,
      _sortRawUnsafe: config?._sortRawUnsafe,
    });

    const limit = buildModelLimit({
      limit: config?.limit,
      _limitRawUnsafe: config?._limitRawUnsafe,
    });

    return await User.findAll({
      attributes,
      where,
      order,
      limit,
    });
  };
  static create = async (fields: Record<any, string>) => {
    return await User.create({ ...fields });
  };
}
