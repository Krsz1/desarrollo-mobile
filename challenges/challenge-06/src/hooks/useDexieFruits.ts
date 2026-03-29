import { useEffect, useState } from "react";
import { fruitsDb, newFunction, Fruit, FruitPayload } from "../config/fruitsDb";

export const useDexieFruits = () => {
  const [fruits, setFruits] = useState<Fruit[]>([]);

  const loadFruits = async () => {
    const data = await fruitsDb.fruits.toArray();
    setFruits(data);
  };

  const addFruit = async (payload: FruitPayload) => {
    const fruit = newFunction(payload);
    await fruitsDb.fruits.add(fruit);
    loadFruits();
  };

  const deleteFruit = async (id: number) => {
    await fruitsDb.fruits.delete(id);
    loadFruits();
  };

  useEffect(() => {
    loadFruits();
  }, []);

  return {
    fruits,
    addFruit,
    deleteFruit,
  };
};