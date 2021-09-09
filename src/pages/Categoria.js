import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

const CATEGORIA = gql`
  query getCategoria($id: ID!) {
    categoria(id: $id) {
      id
      titulo
      recetas {
        titulo
        id
        imagen {
          id
          url
        }
        categorias {
          id
          titulo
        }
      }
    }
  }
`;

export default function Categoria() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(CATEGORIA, {
    variables: { id: id },
  });

  if (loading) return <p>CARGANDO...</p>;
  if (error) return <p>ERROR AL CARGAR LA CATEGORÍA</p>;

  return (
    <div className="inicio">
      <div className="inicio-solid-bg">
        <section className="inicio-body">
          <h2 className="titulo">{data.categoria.titulo}s</h2>

          {data.categoria.recetas.map((receta) => (
            <article key={receta.id} className="receta-card">
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
          ))}
        </section>
      </div>
    </div>
  );
}
