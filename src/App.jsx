import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CityProvider } from "./context/CitiesContext";
import { AuthProvider } from "./context/FakeAuth";
import ProtectedRoute from "./pages/ProtectedRoute";
import { lazy, Suspense } from "react";

// lazy is a function in react that accepts a callback in which we call the import javascript function to load the Homepage page layout and use a Suspense React fallback with a component to load before the next Layout is loaded this makes the bundle size more compact when we run npm run build
const Homepage = lazy(() => import("./pages/Homepage"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Product = lazy(() => import("./pages/Product"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const Login = lazy(() => import("./pages/Login"));

import CityList from "./components/CityList";
import City from "./components/City";
import CountryList from "./components/CountryList";
import Form from "./components/Form";
import SpinnerFullPage from "./components/SpinnerFullPage";

function App() {
  return (
    <AuthProvider>
      <CityProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route index element={<Homepage />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="product" element={<Product />} />
              <Route path="login" element={<Login />} />
              <Route
                path="app"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route
                  index
                  // element={<CityList cities={cities} isLoading={isLoading} />}
                  element={<Navigate replace to="cities" />}
                />
                <Route path="cities" element={<CityList />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CityProvider>
    </AuthProvider>
  );
}

export default App;
