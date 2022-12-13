interface SearchBarProps {
  // eslint-disable-next-line no-unused-vars
  onSort: (type: "alphabet" | "industry") => void;
}

const SortBar = ({ onSort }: SearchBarProps) => {
  return (
    <div className="flex flex-row items-center rounded-xl border-2 border-black bg-white p-2 h-14">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-6 w-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
        />
      </svg>

      <select
        className="w-11/12 p-2 focus:outline-none"
        placeholder="Sort"
        onChange={(event) =>
          onSort(event?.target.value as "alphabet" | "industry")
        }
      >
        <option value="alphabet">Alphabet</option>
        <option value="industry">Industrie</option>
      </select>
    </div>
  );
};

export default SortBar;
