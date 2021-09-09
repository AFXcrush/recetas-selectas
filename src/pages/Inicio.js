import { useQuery, gql } from "@apollo/client";
import { Link } from "react-router-dom";

const RECETAS = gql`
  query GetRecetas {
    recetas {
      titulo
      imagen {
        id
        name
        url
      }
      categorias {
        id
        titulo
      }
      id
    }
  }
`;

export default function Inicio() {
  const { loading, error, data } = useQuery(RECETAS);

  if (loading) return <p>LOADING...</p>;
  if (error) return <p>HA OCURRIDO UN ERROR</p>;

  return (
    <div className="inicio">
      <div className="inicio-solid-bg">
        <section className="inicio-body">
          {data.recetas.map((receta) => (
            <div key={receta.id} className="cards-container">
              <article className="receta-card">
                <div className="card-img-container">
                  <Link to={`/recetas/${receta.id}`}>
                    <img
                      key={receta.imagen.id}
                      src={receta.imagen.url}
                      alt={receta.titulo}
                      className="card-img"
                    />
                  </Link>
                </div>

                <div className="card-text-container">
                  {receta.categorias.map((c) => (
                    <small key={c.id} className="card-category">
                      {c.titulo}
                    </small>
                  ))}
                  <Link to={`/recetas/${receta.id}`}>
                    <span className="card-title">{receta.titulo}</span>
                  </Link>
                </div>
              </article>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
