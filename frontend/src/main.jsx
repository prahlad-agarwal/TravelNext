import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import { AuthContext } from "./context/AuthContext.jsx";
import UserContext from "./context/UserContext.jsx";
import ListingContext from "./context/ListingContext.jsx";
import BookingContext from "./context/BookingContext.jsx";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthContext>
      <ListingContext>
        <UserContext>
          <BookingContext>
            <App />
          </BookingContext>
        </UserContext>
      </ListingContext>
    </AuthContext>
    <ToastContainer />
  </BrowserRouter>
);
