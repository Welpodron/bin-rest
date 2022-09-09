import { Session } from "../models/session.model";
import {
  buildModelGet,
  buildModelWhere,
  buildModelSort,
  buildModelLimit,
} from "../utils/models";

export class SessionService {
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
      model: Session,
      get: config?.get,
      _ignoreProtection: config?._ignoreProtection,
      _getRaw: config?._getRaw,
      _getRawUnsafe: config?._getRawUnsafe,
    });

    const where = buildModelWhere({
      model: Session,
      where: config?.where,
      _ignoreProtection: config?._ignoreProtection,
      _whereRaw: config?._whereRaw,
      _whereRawUnsafe: config?._whereRawUnsafe,
    });

    const order = buildModelSort({
      model: Session,
      sort: config?.sort,
      _ignoreProtection: config?._ignoreProtection,
      _sortRaw: config?._sortRaw,
      _sortRawUnsafe: config?._sortRawUnsafe,
    });

    const limit = buildModelLimit({
      limit: config?.limit,
      _limitRawUnsafe: config?._limitRawUnsafe,
    });

    return await Session.findAll({
      attributes,
      where,
      order,
      limit,
    });
  };
  static create = async (config: { fields: Record<any, any> }) => {
    return await Session.create({ ...config.fields });
  };
  static delete = async (config: {
    where?: any;
    _whereRaw?: any;
    _whereRawUnsafe?: any;
  }) => {
    const where = buildModelWhere({
      model: Session,
      where: config?.where,
      _whereRaw: config?._whereRaw,
      _whereRawUnsafe: config?._whereRawUnsafe,
    });

    return await Session.destroy({ where });
  };
  static update = async (config: {
    fields: Record<any, any>;
    where?: any;
    _whereRaw?: any;
    _whereRawUnsafe?: any;
  }) => {
    const where = buildModelWhere({
      model: Session,
      where: config?.where,
      _whereRaw: config?._whereRaw,
      _whereRawUnsafe: config?._whereRawUnsafe,
    });

    return await Session.update({ ...config.fields }, { where });
  };
}
