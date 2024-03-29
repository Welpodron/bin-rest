import { CONFIG } from "../config";

import { DataTypes, Model } from "sequelize";

import {
  IAttributeWrapper,
  IModelWrapper,
  TStaticImplements,
} from "../utils/models";

import { SequelizeService } from "../services/sequelize.service";
import { hashSync } from "bcrypt";
import { Session } from "./session.model";

export class User
  extends Model
  implements TStaticImplements<IModelWrapper, typeof User>
{
  static __getSpecialFields = (key: string) => {
    return Object.entries(this.getAttributes()).filter((attribute) => {
      const [_, options] = attribute;
      return (<any>options)[key];
    });
  };
  declare id: number;
  declare email: string;
  declare password: string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      __isSelectable: true,
      __isSortable: true,
      __isFilterable: true,
    } as IAttributeWrapper<User>,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
      __isSelectable: true,
      __isSortable: true,
      __isFilterable: true,
    } as IAttributeWrapper<User>,
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        this.setDataValue(
          "password",
          hashSync(<string>value, CONFIG.BCRYPT_HASH_ROUNDS)
        );
      },
      validate: {
        notEmpty: true,
      },
      __isSelectable: false,
      __isSortable: false,
      __isFilterable: false,
    } as IAttributeWrapper<User>,
  },
  {
    sequelize: SequelizeService,
  }
);

User.hasMany(Session);
