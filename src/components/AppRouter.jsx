import { Routes, Route } from "react-router-dom"; // Make sure to import Routes and Route
import { privateRoutes, publicRoutes } from "../../src/router/index.js";
import NotFound from "../pages/NotFound.jsx";
import { AuthContext } from "../context/index.js";
import { useContext } from "react";

const AppRouter = () => {
  //for authorized users
  const { isAuth, isLoading } = useContext(AuthContext);
  console.log(isAuth);
  if (isLoading) {
    return <h1>Loading.......</h1>;
  }
  return (
    <Routes>
      {/* <Route path="*" element={<NotFound />} /> */}
      {
        isAuth
          ? privateRoutes.map((route) => (
              <Route
                key={route.path} // Add a unique key prop for list rendering
                path={route.path}
                element={<route.component />} // Change 'component' to 'element' and render as JSX
                // The 'exact' prop is no longer needed in v6 as routes are exact by default
                // unless you add a wildcard or nested routes.
              />
            ))
          : publicRoutes.map((route) => (
              <Route
                key={route.path} // Add a unique key prop for list rendering
                path={route.path}
                element={<route.component />} // Change 'component' to 'element' and render as JSX
                // The 'exact' prop is no longer needed in v6 as routes are exact by default
                // unless you add a wildcard or nested routes.
              />
            ))
        //---------------------------------
      }
    </Routes>
  );
};

export default AppRouter;

//<Route path="/about" element={<About />} />  //Use 'element' prop
//   <Route exact path="/posts" element={<Posts />} />
//   <Route exact path="/posts/:id" element={<PostIdPage />} />
