import { Sequelize, DefineAttributes, DefineAttributeColumnOptions } from "sequelize";
import * as Seq from "sequelize";
import * as glob from "glob";

export function defineModel(model: string, attrs: DefineAttributes) {
  return (sequelize: Sequelize) => sequelize.define(model, attrs);
}

export function primaryKey(info?: DefineAttributeColumnOptions): DefineAttributeColumnOptions {
  return {
    type: Seq.INTEGER.UNSIGNED,
    primaryKey: true,
    ...info,
  };
}

export async function loadSchema(sequelize: Sequelize) {
  const files = glob.sync("./schema/**/*.js");
  const schemas = await Promise.all(files.map(s => import(s)));
  schemas.map(s => s.define(sequelize));
}
