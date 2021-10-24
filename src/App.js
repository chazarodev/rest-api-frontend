import React, {Fragment} from "react";
import { BrowserRouter as Router } from "react-router-dom";

/** Layout */
import Header from "./components/layout/Header";
import Contenido from "./components/layout/Contenido";

function App() {
  return (
    <Router>
      <Fragment>
        <Header />
        <Contenido />
      </Fragment>
    </Router>
  );
}

export default App;
