import { Switch, Route } from "react-router-dom";

import { Admin } from "../pages/Admin";
import { Dashboard } from '../pages/Dashboard';
import { Cart } from '../pages/Cart';
import { Users } from "../pages/Users";

export function Routes() {
   return (
      <Switch>
         <Route path="/" exact component={Dashboard} />
         <Route path="/admin" component={Admin} />
         <Route path="/cart" component={Cart} />
         <Route path="/users/:userId" component={Users} />
      </Switch>
   );
}
