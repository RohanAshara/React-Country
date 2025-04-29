import { useEffect, useState, useTransition } from "react";
import { Pagination } from "@mui/material";
import { getCountryData } from "../api/postApi";
import { Loader } from "../components/ui/Loader";
import { CountryCard } from "../components/layout/CountryCard";
import { SearchFilter } from "../components/ui/SearchFilter";

export const Country = () => {
  const [isPending, startTransition] = useTransition();
  const [countries, setCountries] = useState([]);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const [currentPage, setCurrentPage] = useState(1);
  const countriesPerPage = 8; // Set how many countries per page

  useEffect(() => {
    startTransition(async () => {
      const res = await getCountryData();
      setCountries(res.data);
    });
  }, []);

  if (isPending) return <Loader />;

  const searchCountry = (country) => {
    if(search){
        return country.name.common.toLowerCase().includes(search.toLowerCase());
    }
    return country;
  }

  const filterRegion = (country) => {
    if(filter === "all") return country
    return country.region === filter;
  }

  const filterCountries = countries.filter((country) => searchCountry(country) && filterRegion(country))

  // Calculate the index range for the current page
  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountries = filterCountries.slice(
    indexOfFirstCountry,
    indexOfLastCountry
  );

  return (
    <section className="country-section container">
      <SearchFilter
        search={search}
        setSearch={setSearch}
        filter={filter}
        setFilter={setFilter}
        countries={countries}
        setCountries={setCountries}
      />

      <ul className="grid grid-four-cols">
        {currentCountries.map((curCountry, index) => (
          <CountryCard country={curCountry} key={index} />
        ))}
      </ul>

      {/* Pagination */}
      <div
        className="pagination-container"
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <Pagination
          count={Math.ceil(filterCountries.length / countriesPerPage)}
          page={currentPage}
          onChange={(event, value) => {
            setCurrentPage(value)
            window.scrollTo({top: 0, behavior: "smooth"})
          }}
          color="primary"
          size="large"
        />
      </div>
    </section>
  );
};
