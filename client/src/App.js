//import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//import WorkshopTable from "./pages/workshops_table";

import Login from "./pages/Login";
import DashboardSelect from './pages/DashboardSelect';
import WorkshopDashboard from './pages/WorkshopDashboard';

//import "./styles/dashboard-page.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="/dashboards">
          <DashboardSelect />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
