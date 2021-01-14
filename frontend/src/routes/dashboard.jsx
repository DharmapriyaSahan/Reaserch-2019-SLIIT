import Home from "../views/Home/Home.jsx";
import LoadBalancers from "../views/Home/elb";
import TargetGroups from "../views/Home/tgroup";

var dashRoutes = [
  // {
  //   path: "/home",
  //   name: "Home",
  //   icon: "design_app",
  //   component: Home
  // },
  {
    path: "/home",
    name: "Instances",
    icon: "design_app",
    component: Home
  },
  {
    path: "/elb",
    name: "LoadBalancers",
    icon: "design_app",
    component: LoadBalancers
  },
  {
    path: "/target-groups",
    name: "Target-Groups",
    icon: "design_app",
    component: TargetGroups
  },
  { redirect: true, path: "/", pathTo: "/home", name: "Dashboard" },
  { redirect: true, path: "/home", pathTo: "/home", name: "Dashboard" }
];
export default dashRoutes;
