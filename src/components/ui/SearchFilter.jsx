export const SearchFilter = ({search, setSearch, filter, setFilter, countries, setCountries}) => {
    
  const handleInput = (event) => {
    event.preventDefault();
    setSearch(event.target.value);
  };

  const handleSelectChange = (event) => {
    event.preventDefault();
    setFilter(event.target.value);
  }

  const sortCountries = (value) => {
    const sortCountries = [...countries].sort((a, b) => {
        return value === "asc" ? a.name.common.localeCompare(b.name.common) : b.name.common.localeCompare(a.name.common)
    })
    setCountries(sortCountries);
  }

  return (
    <section className="section-searchFilter container">
      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={handleInput}
      />

      <div>
        <button onClick={() => sortCountries("asc")}>ASC</button>
      </div>
      <div>
        <button onClick={() => sortCountries("desc")}>DESC</button>
      </div>

      <div>
        <select className="select-section" value={filter} onChange={handleSelectChange}>
        <option value="all">All</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>
    </section>
  );
};
