import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser, setLoading as setAuthLoading } from "./store/slices/authSlice";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import SignupPage from "./pages/SignupPage";
import ProtectedRoute from "./components/common/ProtectedRoute";
import MainRenderPage from "./pages/MainRenderPage";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const auth = getAuth();
    let unsubscribe: (() => void) | undefined;

    unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      const first_name = firebaseUser?.displayName?.split(" ")[0] || "unknown";
      const last_name = firebaseUser?.displayName?.split(" ")[1] || "unknown";

      if (!firebaseUser?.uid || !firebaseUser.email) {
        return;
      }

      const UserInfo = {
        id: firebaseUser?.uid,
        email: firebaseUser?.email,
        first_name: first_name,
        last_name: last_name,
      }

      dispatch(setUser(UserInfo));
      dispatch(setAuthLoading(false));
    });

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<AuthPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <MainRenderPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;