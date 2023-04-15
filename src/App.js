import React from "react";
import Def from "./Components/default";
import Login from "./Components/login";
import { Route, Routes } from "react-router";
 

const App = () => {
  return(
    <>
    <Routes>
      <Route exact path="/" element={< Def/>}/>
      <Route path="/login" element={< Login/>} />

    </Routes>
    </>
  )
}

export default App;