import { ChangeEventHandler } from "react";
import Select from "./Select";
import { useSearchParams } from "react-router-dom";
import { SortByValue } from "../types";

interface Option<T, K extends keyof T> {
  value: SortByValue<T, K>;
  label: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type InferKeys<T> = T extends Option<infer _, infer V> ? V : never;

interface SortByProps<T, K extends keyof T> {
  options: Option<T, K>[];
}

function SortBy<T>({ options }: SortByProps<T, InferKeys<Option<T, keyof T>>>) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy") || "";

  const handleChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  };

  return (
    <Select
      type="white"
      options={options}
      value={sortBy}
      onChange={handleChange}
    />
  );
}

export default SortBy;
