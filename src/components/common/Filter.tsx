import { useState } from "react";
import FilterButton from "./FilterButton";
type FilterProps = {
  label: string[];
  type: string[];
  onFilterClick: (filters: Record<string, string>) => void;
};
const Filter: React.FC<FilterProps> = ({ label, type, onFilterClick }) => {
  const [filterValues, setFilterValues] = useState<Record<string, string>>(
    Object.fromEntries(label.map((item) => [item, ""]))
  );

  const handleFilterClick = () => {
    console.log("Filters:", filterValues);
    onFilterClick(filterValues);
  };
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {label.map((item, index) => (
        <div
          key={index}
          className="form-control w-full flex flex-col items-center"
        >
          <label className="label mb-2">
            <span className="text-base font-bold text-black">{item}</span>
          </label>
          <input
            type={type[index]}
            onChange={(e) =>
              setFilterValues((prevValues) => ({
                ...prevValues,
                [item]: e.target.value,
              }))
            }
            className="h-8 w-full bg-slate-200 focus:outline-1 focus:border-none px-2 py-1 rounded-lg"
          />
        </div>
      ))}

      <FilterButton onFilterClick={handleFilterClick} />
    </div>
  );
};
export default Filter;
