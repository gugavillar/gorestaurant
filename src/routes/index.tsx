import { Switch, Route } from "react-router-dom";

import { Admin } from "../pages/Admin";
import { Dashboard } from '../pages/Dashboard';

export function Routes() {
   return (
      <Switch>
         <Route path="/admin" component={Admin} />
         <Route path="/" exact component={Dashboard} />
      </Switch>
   );
}
