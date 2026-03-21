import { useState } from "react";
import type { ChangeEvent } from "react";

export function useForm<T extends Record<string, string>>(initialValues: T) {
  const [values, setValues] = useState<T>(initialValues);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }) as T);
  };

  const reset = () => setValues(initialValues);

  return { values, handleChange, reset };
}
