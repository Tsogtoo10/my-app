import FilterButton from "./FilterButton";
const Filter = ({ label, type }: { label: string[]; type: string[] }) => {
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
            className="h-8 w-full bg-slate-200 focus:outline-1 focus:border-none px-2 py-1 rounded-lg"
          />
        </div>
      ))}
    </div>
  );
};
export default Filter;
