type FilterButtonProps = {
  onFilterClick: () => void;
};

function FilterButton({ onFilterClick }: FilterButtonProps) {
  return (
    <div className="mt-8">
      <button
        type="button"
        onClick={onFilterClick}
        className="bg-gradient-to-br from-pink-600 to-purple-900 text-white rounded-lg w-48 h-8"
      >
        Хайх
      </button>
    </div>
  );
}

export default FilterButton;
