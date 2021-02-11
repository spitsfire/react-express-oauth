import "./App.css";
import React, { useState } from "react";
import { Router } from "@reach/router";
import UserList from "./components/UserList.js";
import Login from "./components/Login";

function App() {
  const [user, setUser] = useState({});

  return (
    <section>
      <div>
        <Router>
          <Login path="/" setUser={setUser} />
          <UserList path="/users" user={user} />
        </Router>
      </div>
    </section>
  );
}

export default App;
