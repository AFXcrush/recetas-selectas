import { Link } from "react-router-dom";
import { Fragment, useState } from "react";

//Componentes
import { ReactComponent as LogoReceta } from "../assets/img/recetas-logo.svg";
import { ReactComponent as LogoRecetaIcon } from "../assets/img/recetas-logo-icon.svg";
import { ReactComponent as SearchIcon } from "../assets/img/lupa-icon.svg";
import { ReactComponent as CloseIcon } from "../assets/img/close-icon.svg";

import useScrollHeader from "../hooks/useScrollHeader";
import CategoriesList from "./CategoriesList";
import SearchBar from "./SearchBar";

export default function Header() {
  //Cambiar tamaño del Header cuando scrollea
  const { scroll } = useScrollHeader();
  //Activar y descativar clases
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(!active);
  };

  return (
    <Fragment>
      <div className={scroll ? "header-scroll" : "header"}>
        <Link to="/">
          <LogoReceta className="logo-header" />
          <LogoRecetaIcon className="logo-header-icon"></LogoRecetaIcon>
        </Link>

        <Link to="/">
          <span className="header-link">Inicio</span>
        </Link>

        <CategoriesList />

        <SearchBar placeholder="Buscar" />

        <SearchIcon className="search-icon-sm" onClick={handleClick} />

        <div className={`search-sm ${active ? "search-sm-visible" : ""}`}>
          <SearchBar placeholder="Buscar" closeAtClick={handleClick} />
          <CloseIcon className="close-icon-sm" onClick={handleClick} />
        </div>
      </div>
    </Fragment>
  );
}
