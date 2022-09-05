import { DataTypes, Model } from "sequelize";

import {
  IAttributeWrapper,
  IModelWrapper,
  TStaticImplements,
} from "../utils/models";

import { SequelizeService } from "../services/sequelize.service";
import { User } from "./user.model";

export class Session
  extends Model
  implements TStaticImplements<IModelWrapper, typeof Session>
{
  static __getSpecialFields = (key: string) => {
    return Object.entries(this.getAttributes()).filter((attribute) => {
      const [_, options] = attribute;
      return (<any>options)[key];
    });
  };
  declare fingerprint: string;
  declare refreshToken: string;
  declare expiresIn: string; //??????
}

Session.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      __isSelectable: true,
      __isSortable: true,
      __isFilterable: true,
    } as IAttributeWrapper<Session>,
    fingerprint: {
      type: DataTypes.STRING,
      allowNull: false,
      __isSelectable: false,
      __isSortable: false,
      __isFilterable: false,
    } as IAttributeWrapper<Session>,
    refreshToken: {
      type: DataTypes.STRING,
      allowNull: false,
      __isSelectable: false,
      __isSortable: false,
      __isFilterable: false,
    } as IAttributeWrapper<Session>,
    expiresIn: {
      type: DataTypes.DATE,
      allowNull: false,
      __isSelectable: false,
      __isSortable: false,
      __isFilterable: false,
      validate: {
        isDate: true,
      },
    } as IAttributeWrapper<Session>,
  },
  {
    sequelize: SequelizeService,
  }
);
