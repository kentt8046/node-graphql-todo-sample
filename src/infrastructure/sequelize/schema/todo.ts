import * as Sequelize from "sequelize";

import { defineModel, primaryKey } from "../util";

export const define = defineModel("Todo", {
  id: primaryKey(),
  body: {
    type: Sequelize.STRING(1024),
  },
  authorId: {
    type: Sequelize.STRING(64),
  },
  done: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});
