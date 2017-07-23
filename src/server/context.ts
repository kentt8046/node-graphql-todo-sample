import * as db from "../infrastructure/db";

declare global {
  interface AppContext {
    db: typeof db;
  }
}

export function createContext(): AppContext {
  return { db };
}
