import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import store from "./auth/store";
import DashboardPage from "./pages/DashboardPage";
import FeatureDetailsPage from "./pages/FeatureDetailsPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route
            path="/products/:productId/:featureId"
            element={<FeatureDetailsPage />}
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
