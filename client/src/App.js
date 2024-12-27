import React, { useState, useEffect, useRef } from 'react';
import AuthForm from "./components/Auth";
import {is_auth} from "./services/Auth";
import Group from "./components/Group";

function App() {

  return (
      <div>
          {is_auth() ? <Group />: <AuthForm/>}
      </div>
  );
}

export default App;

