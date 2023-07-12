import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import CreatePassword from "./components/CreatePassword";
import SavePassword from "./components/SavePassword";
import FindPassword from "./components/FindPassword";
import { useState } from "react";

function App() {
  const [masterPassword, setMasterPassword] = useState("");

  return (
    <Router>
      <Switch>
        <Route
          path="/"
          exact
          render={(props) => (
            <Home
              masterPassword={masterPassword}
              setMasterPassword={setMasterPassword}
            />
          )}
        />
        <Route path="/create" component={CreatePassword} />
        <Route path="/save" component={SavePassword} />
        <Route path="/find" component={FindPassword} />
      </Switch>
    </Router>
  );
}

export default App;
