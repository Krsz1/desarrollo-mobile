import Dexie from "dexie";
import type { Table } from "dexie";

export interface Fruit {
  id?: number;
  name: string;
  color: string;
  createdAt: number;
}

export interface FruitPayload {
  name: string;
  color?: string;
}

class FruitsDatabase extends Dexie {
  fruits!: Table<Fruit, number>;

  constructor() {
    super("taskContactsDexieDB");
    this.version(1).stores({
      fruits: "++id, name, color, createdAt",
    });
  }
}

export const fruitsDb = new FruitsDatabase();

export const newFunction = (payload: FruitPayload): Fruit => {
  return {
    name: payload.name.trim(),
    color: payload.color?.trim() || "green",
    createdAt: Date.now(),
  };
};