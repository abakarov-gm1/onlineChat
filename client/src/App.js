import React, { useState, useEffect, useRef } from 'react';
import AuthForm from "./components/Auth";
import {is_auth} from "./services/Auth";

function App() {

  return (
      <div>
          {is_auth() ? "главная страница ": <AuthForm/>}
      </div>
  );
}

export default App;

