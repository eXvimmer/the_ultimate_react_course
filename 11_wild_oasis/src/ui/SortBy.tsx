import { ChangeEventHandler } from "react";
import Select from "./Select";
import { useSearchParams } from "react-router-dom";
import { SortByValue } from "../types";

interface SortByProps {
  options: { value: SortByValue; label: string }[];
}

function SortBy({ options }: SortByProps) {
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
