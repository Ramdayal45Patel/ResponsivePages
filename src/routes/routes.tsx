
import { Routes, Route } from "react-router-dom";
import { PageRoutes } from "./configs";
import Pages from "../components/Pages"; // Import the component to be rendered
import { Provider } from "react-redux"; // Import Provider
import { store } from "../Redux/Store/store"; // Import your Redux store
import { useSelector } from "react-redux";

const renderPaths = (paths: any, Element: any) => {
  return paths.map((path: any) => {
    return <Route key={path} path={path} element={Element} />;
  });
};



function Routers() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path={PageRoutes.HOME} element={<Pages />} />
      </Routes>
    </Provider>
  );
}

export default Routers;
