import { useState } from "react";

type BookSearchProps = {
  initialValue: string;
  onSearch: (value: string) => void;
};

export function BookSearch({ initialValue, onSearch }: BookSearchProps) {
  const [value, setValue] = useState(initialValue);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(value.trim());
  };

  return (
    <form className="book-search" onSubmit={handleSubmit}>
      <label htmlFor="book-search-input">Buscar</label>
      <input
        id="book-search-input"
        type="text"
        placeholder="Título o descripción"
        value={value}
        onChange={handleChange}
      />
      <button type="submit">Buscar</button>
    </form>
  );
}