import Dashboard from "../../pages/dashboard";
import Insurances from "../../pages/insurances";

interface Routes {
  isIndex?: boolean;
  path: string;
  reverseUrl?: string;
  label: string;
  page: any;
  key: string;
}

const routes: Routes[] = [{
  key:'dashboard',
  path: "/",
  label: 'Dashboard',
  page: Dashboard,
  isIndex: true
}, {
  key:'insurances',
  path: "/insurances",
  label: 'Insurances',
  page: Insurances
}];

export default routes;
