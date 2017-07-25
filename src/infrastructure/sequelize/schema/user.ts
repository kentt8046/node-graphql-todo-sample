import * as Sequelize from "sequelize";

import { defineModel, primaryKey } from "../util";

export const define = defineModel("User", {
  id: primaryKey({type: Sequelize.STRING(64)}),
});
