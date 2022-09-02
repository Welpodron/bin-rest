import { DataTypes, Model } from "sequelize";

import {
  IAttributeWrapper,
  IModelWrapper,
  TStaticImplements,
} from "../utils/models";

import { SequelizeService } from "../services/sequelize.service";

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
    name: {
      type: DataTypes.STRING,
      __isSelectable: true,
      __isSortable: true,
      __isFilterable: true,
    } as IAttributeWrapper<User>,
    age: {
      type: DataTypes.INTEGER,
      __isSelectable: true,
      __isSortable: true,
      __isFilterable: true,
    } as IAttributeWrapper<User>,
  },
  {
    sequelize: SequelizeService,
  }
);
