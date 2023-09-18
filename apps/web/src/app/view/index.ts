import React from "react";

const Login = React.lazy(() => import("./auth/login"));
const Dashboard = React.lazy(() => import("./dashboard"));
const Products = React.lazy(() => import("./products"));
const Product = React.lazy(() => import("./products/product"));
const SignUp = React.lazy(() => import("./auth/signup"));
const CreateBusiness = React.lazy(() => import("./business/create"));
const Unit = React.lazy(() => import("./unit"));
const Category = React.lazy(() => import("./category"));

export {
  Login,
  Dashboard,
  Products,
  Product,
  SignUp,
  CreateBusiness,
  Unit,
  Category,
};
