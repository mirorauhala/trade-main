import { type ChangeEvent } from "react";

interface SearchBarProps {
  // eslint-disable-next-line no-unused-vars
  handleChange: (value: string) => void;
}

const SearchBar = (props: SearchBarProps) => {
  const { handleChange } = props;

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleChange(event.target.value);
  };

  return (
    <div className="flex flex-row items-center rounded-xl border-2 border-black bg-white h-14">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="m-2 h-6 w-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
        />
      </svg>

      <input
        className="w-full rounded-xl py-3 placeholder:text-slate-500 focus:outline-none"
        placeholder="Suche"
        onChange={onChange}
      />
    </div>
  );
};

export default SearchBar;
