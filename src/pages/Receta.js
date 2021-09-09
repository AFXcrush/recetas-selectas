import { useParams } from "react-router";
import { useQuery, gql } from "@apollo/client";
import ReactMarkdown from "react-markdown";

const RECETA = gql`
  query GetReceta($id: ID!) {
    receta(id: $id) {
      id
      titulo
      imagen {
        id
        url
      }
      ingredientes
      preparacion
      categorias {
        titulo
        id
      }
    }
  }
`;

export default function Receta() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(RECETA, {
    variables: { id: id },
  });

  if (loading) return <p>CARGANDO...</p>;
  if (error) return <p>ERROR AL CARGAR PÁGINA</p>;

  return (
    <div className="receta-page">
      <img
        className="receta-img"
        key={data.receta.imagen.id}
        src={data.receta.imagen.url}
        alt={data.receta.titulo}
      />
      <br />
      <span className="titulo">{data.receta.titulo}</span>

      <div className="receta-text">
        <span className="titulo2">Ingredientes</span>
        <ReactMarkdown className="parrafos">
          {data.receta.ingredientes}
        </ReactMarkdown>
        <span className="titulo2">Preparación</span>
        <ReactMarkdown className="parrafos">
          {data.receta.preparacion}
        </ReactMarkdown>
      </div>
    </div>
  );
}
