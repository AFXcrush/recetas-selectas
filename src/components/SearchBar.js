import { Link } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import { ReactComponent as SearchIcon } from "../assets/img/lupa-icon.svg";
import { ReactComponent as CloseIcon } from "../assets/img/close-icon.svg";

//Hooks
import useFilter from "../hooks/useFilter";
import useClearInput from "../hooks/useClearInput";

const RECETAS = gql`
  query GetRecetas {
    recetas {
      id
      titulo
    }
  }
`;

const SearchBar = ({ placeholder, closeAtClick }) => {
  const { filter, setFilter } = useFilter();
  const { searchInput, setSearchInput } = useClearInput();
  const { loading, error, data } = useQuery(RECETAS);

  const handleFilter = (e) => {
    const searchWord = e.target.value;
    setSearchInput(searchWord);
    const newFilter = data.recetas.filter((value) => {
      return value.titulo.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilter([]);
    } else {
      setFilter(newFilter);
    }
  };

  const clearInput = () => {
    setFilter([]);
    setSearchInput("");
  };

  if (loading) return <p>LOADING...</p>;
  if (error) return <p>HA OCURRIDO UN ERROR</p>;

  return (
    <div className="search">
      <div className="search-input">
        <input
          type="text"
          placeholder={placeholder}
          value={searchInput}
          onChange={handleFilter}
        />
        {filter.length === 0 ? (
          <SearchIcon className="search-icon" />
        ) : (
          <CloseIcon
            className="search-icon pointer"
            onClick={clearInput}
          ></CloseIcon>
        )}
      </div>
      {filter.length !== 0 && (
        <div className="search-result">
          {filter.slice(0, 10).map((value) => (
            <div key={value.id} className="search-link-list">
              <Link
                className="search-link"
                to={`/recetas/${value.id}`}
                onClick={(clearInput, closeAtClick)}
              >
                {value.titulo}
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
