export * from "./todo";

declare global {
  interface MutationArgs<T> {
    args: T;
  }
}
