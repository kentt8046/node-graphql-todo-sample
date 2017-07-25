import { Sequelize } from "sequelize";
import * as db from "../infrastructure/db";
import { connect } from "../infrastructure/sequelize";

declare global {
  interface AppContext {
    db: typeof db;
    sequelize: Sequelize;
  }
}

export async function createContext(): Promise<AppContext> {
  return { db, sequelize: await connect() };
}
