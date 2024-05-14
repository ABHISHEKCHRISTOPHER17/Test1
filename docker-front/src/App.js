import { useEffect } from "react";
import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import LANDING from "./pages/landing/LANDING";
import REGISTER from "./pages/REGISTER";
import LOGIN from "./pages/LOGIN";
import COMPLETEPROFILE from "./pages/CompleteProfile";
import ResetPasswordPage from "./pages/ResetPassword.js";
import ResetPasswordPage1 from "./pages/Resetpassword1.js";



function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "";
        metaDescription = "";
        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  return (
    <Routes>
       <Route path="/" element={<LANDING />} />
      <Route path="/register" element={<REGISTER />} />
      <Route path="/complete-profile" element={<COMPLETEPROFILE />} />
      <Route path="/login" element={<LOGIN />} />
      <Route path="/resetpassword" element={<ResetPasswordPage />} />
      <Route path="/resetpassword1" element={<ResetPasswordPage1/>} />

    </Routes>
  );
}


export default App;