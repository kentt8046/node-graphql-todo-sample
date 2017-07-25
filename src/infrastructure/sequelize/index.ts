import * as Sequelize from "sequelize";

import { globalOptions } from "./option";
import { loadSchema } from "./util";

export async function connect() {
  const sequelize = new Sequelize("todo", "root", globalOptions);
  await loadSchema(sequelize);
  await sequelize.sync({ force: true });

  return sequelize;
}
