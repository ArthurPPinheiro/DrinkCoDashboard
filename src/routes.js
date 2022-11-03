/**
=========================================================
* Soft UI Dashboard React - v4.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/** 
  All of the routes for the Soft UI Dashboard React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Soft UI Dashboard React layouts
import Dashboard from "layouts/dashboard";
import Categories from "layouts/categories";
import CategoriesForm from "layouts/categories/form";
import { CreditCard, Shop } from "@mui/icons-material";
import ProductsForm from "layouts/products/form";
import Products from "layouts/products";
import RecipesForm from "layouts/recipes/form";
import Recipes from "layouts/recipes";
import SignIn from "layouts/authentication/sign-in";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    route: "/dashboard",
    icon: <Shop size="12px" />,
    component: <Dashboard />,
    noCollapse: true,
  },
  
  
  // Categories
  
  {
    type: "collapse",
    name: "Categories",
    key: "categories",
    route: "/categories",
    icon: <CreditCard size="12px" />,
    component: <Categories />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Categories Create",
    key: "categories-create",
    list: false,
    route: "/categories/:method",
    icon: <CreditCard size="12px" />,
    component: <CategoriesForm />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Categories Edit",
    key: "categories-create",
    list: false,
    route: "/categories/:method/:id",
    icon: <CreditCard size="12px" />,
    component: <CategoriesForm />,
    noCollapse: true,
  },

  // Products

  {
    type: "collapse",
    name: "Products",
    key: "products",
    route: "/products",
    icon: <CreditCard size="12px" />,
    component: <Products />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Products Create",
    key: "products-create",
    list: false,
    route: "/products/:method",
    icon: <CreditCard size="12px" />,
    component: <ProductsForm />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Products Edit",
    key: "products-create",
    list: false,
    route: "/products/:method/:id",
    icon: <CreditCard size="12px" />,
    component: <ProductsForm />,
    noCollapse: true,
  },

    // Recipes

    {
      type: "collapse",
      name: "Recipes",
      key: "recipes",
      route: "/recipes",
      icon: <CreditCard size="12px" />,
      component: <Recipes />,
      noCollapse: true,
    },
    {
      type: "collapse",
      name: "Recipes Create",
      key: "recipes-create",
      list: false,
      route: "/recipes/:method",
      icon: <CreditCard size="12px" />,
      component: <RecipesForm />,
      noCollapse: true,
    },
    {
      type: "collapse",
      name: "Recipes Edit",
      key: "recipes-create",
      list: false,
      route: "/recipes/:method/:id",
      icon: <CreditCard size="12px" />,
      component: <RecipesForm />,
      noCollapse: true,
    },
    {
      type: "collapse",
      name: "Sign In",
      list: false,
      key: "sign-in",
      route: "/sign-in",
      component: <SignIn />,
      noCollapse: true,
    },

];

export default routes;
