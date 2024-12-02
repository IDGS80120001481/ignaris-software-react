import SuggestionClient from "./components/admin/suggestionsclient/SuggestionClient";
import AttentionHistory from "./components/admin/atentionhistory/AttentionHistory";
import HistoryContact from "./components/admin/contacthistory/ContactHistory";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ClientComment from "./components/admin/clientcomment/ClientComment";
import OffersClient from "./components/admin/offersclient/OffersClient";
import CartTracking from "./components/admin/carttracking/CartTracking";
import HistorySale from "./components/admin/historysale/HistorySale";
import Companies from "./components/admin/companies/Companies";
import Dashboard from "./components/admin/dashboard/Dashboard";
import Sidenav from "./components/admin/sidenav/Sidenav";
import ProtectedRoute from "./context/ProtectedRoute";
import Client from "./components/admin/client/Client";
import Login from "./components/admin/auth/Login";
import { useState } from "react";
import ClienteInfo from "./components/admin/clientinfo/ClientInfo";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Sidenav isAuthenticated={isAuthenticated} />
            </ProtectedRoute>
          }
        >
          {/* Sub-rutas bajo /admin */}
          <Route path="client" element={<Client />} />
          <Route path="companies" element={<Companies />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="history-sale" element={<HistorySale />} />
          <Route path="perfil/:idCliente" element={<ClienteInfo />} />
          <Route
            path="history-sale/:idCliente/:nombre"
            element={<HistorySale />}
          />
          <Route path="offers-client" element={<OffersClient />} />
          <Route path="cart-tracking" element={<CartTracking />} />
          <Route path="client-comment" element={<ClientComment />} />
          <Route
            path="client-comment/:idCliente/:nombre"
            element={<ClientComment />}
          />
          <Route path="history-contact" element={<HistoryContact />} />
          <Route path="history-contact/:email" element={<HistoryContact />} />
          <Route path="history-atention" element={<AttentionHistory />} />
          <Route
            path="history-atention/:idCliente/:nombre"
            element={<AttentionHistory />}
          />
          <Route path="suggestion-client" element={<SuggestionClient />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
