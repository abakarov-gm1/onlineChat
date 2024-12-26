import React, { useState, useEffect, useRef } from 'react';
import AuthForm from "./components/Auth";
import {is_auth} from "./services/Auth";
import Home from "./components/Home";

function App() {

  return (
      <div>
          {is_auth() ? <Home />: <AuthForm/>}
      </div>
  );
}

export default App;

