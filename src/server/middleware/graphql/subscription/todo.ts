import { createSubscription } from "../../../../infrastructure/graphql";

// import { todo } from "../query";

// export const todoUpdated = createSubscription("todoUpdated", todo);
// export const todoRemoved = createSubscription("todoRemoved", todo);

export const todoUpdated = createSubscription("todoUpdated");
export const todoRemoved = createSubscription("todoRemoved");
