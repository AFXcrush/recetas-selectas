import { Link } from "react-router-dom";
import { useState } from "react";
import { useQuery, gql } from "@apollo/client";

const CATEGORIAS = gql`
  query GetCategorias {
    categorias {
      id
      titulo
    }
  }
`;

export default function CategoriesList() {
  const { loading, error, data } = useQuery(CATEGORIAS);
  const [active, setActive] = useState(false);

  if (loading) return <p>Cargando categorías...</p>;
  if (error) return <p>HUBO UN ERROR AL CARGAR CATEGORÍAS</p>;

  const handleClick = () => {
    setActive(!active);
  };

  return (
    <div className="categories-container" onClick={handleClick}>
      <button className="categories-btn">Categorías ▼</button>

      <div className={`categories-list ${active ? "active" : ""}`}>
        {data.categorias.map((categoria) => (
          <Link key={categoria.id} to={`/categoria/${categoria.id}`}>
            <button className="categories-link">{categoria.titulo}</button>
          </Link>
        ))}
      </div>
    </div>
  );
}
