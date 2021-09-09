import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./scss/app.scss";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

//Componentes
import Inicio from "./pages/Inicio";
import Categoria from "./pages/Categoria";
import Header from "./components/Header";
import Receta from "./pages/Receta";

const client = new ApolloClient({
  uri: "https://recetasv4.herokuapp.com/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <Router>
      <ApolloProvider client={client}>
        <div className="App">
          <Header />

          <Switch>
            <Route exact path="/">
              <Inicio />
            </Route>

            <Route path="/categoria/:id">
              <Categoria />
            </Route>

            <Route path="/recetas/:id">
              <Receta />
            </Route>
          </Switch>
        </div>
      </ApolloProvider>
    </Router>
  );
}

export default App;
