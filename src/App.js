import React, {Fragment, useContext} from "react";
import { BrowserRouter as Router } from "react-router-dom";

/** Layout */
import Header from "./components/layout/Header";
import Contenido from "./components/layout/Contenido";
import {CRMContext, CRMProvider} from './context/CRMContext';

function App() {

  //Utilizar context en el componente
  const [auth, guardarAuth] = useContext(CRMContext);

  return (
    <Router>
      <Fragment>
        <CRMProvider value={[auth, guardarAuth]}>
          <Header />
          <Contenido />
        </CRMProvider>
      </Fragment>
    </Router>
  );
}

export default App;
