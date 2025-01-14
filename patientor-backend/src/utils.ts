import { NoIdEntry, Entry } from "./types";
import { v1 } from "uuid";

export const parseNewEntry = (object: unknown): Entry => {
  const entry = NoIdEntry.parse(object);
  return { ...entry, id: v1() };
};

export type UnionOmit<T, K extends string | number | symbol> = T extends unknown
  ? Omit<T, K>
  : never;
