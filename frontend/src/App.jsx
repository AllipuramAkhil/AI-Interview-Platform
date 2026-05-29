import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  Suspense,
  lazy,
} from "react";

import {
  AnimatePresence,
} from "framer-motion";

import {
  Toaster,
} from "react-hot-toast";

// ========================================
// PUBLIC PAGES
// ========================================

import LoginPage from "./pages/LoginPage";

import RegisterPage from "./pages/RegisterPage";

import VerifyOtp from "./pages/VerifyOtp";

import ForgotPassword from "./pages/ForgotPassword";

import ResetPassword from "./pages/ResetPassword";

import LandingPage from "./pages/LandingPage";

// ========================================
// USER PAGES
// ========================================

import DashboardPage from "./pages/DashboardPage";

import Interview from "./pages/Interview";

import AnalyticsPage from "./pages/AnalyticsPage";

import ResultPage from "./pages/ResultPage";

// ========================================
// COMPONENTS
// ========================================

import ProtectedRoute from "./components/ProtectedRoute";

// ========================================
// ADMIN PAGES
// ========================================

const AdminLayout = lazy(() =>
  import(
    "./pages/admin/AdminLayout"
  )
);

const AdminDashboard = lazy(
  () =>
    import(
      "./pages/admin/Dashboard"
    )
);

const QuestionsAdmin = lazy(
  () =>
    import(
      "./pages/admin/QuestionsAdmin"
    )
);

const UsersAdmin = lazy(() =>
  import(
    "./pages/admin/UsersAdmin"
  )
);

const InterviewsAdmin = lazy(
  () =>
    import(
      "./pages/admin/InterviewsAdmin"
    )
);

const AnalyticsAdmin = lazy(
  () =>
    import(
      "./pages/admin/AnalyticsAdmin"
    )
);

const SettingsAdmin = lazy(
  () =>
    import(
      "./pages/admin/SettingsAdmin"
    )
);

// ========================================
// LOADING SCREEN
// ========================================

function PageLoader() {
  return (
    <div
      className="
        flex
        min-h-screen
        items-center
        justify-center
        overflow-hidden
        bg-[#030712]
        text-white
      "
    >
      {/* Glow */}

      <div
        className="
          absolute
          h-72
          w-72
          rounded-full
          bg-cyan-500/20
          blur-3xl
        "
      />

      {/* Loader */}

      <div
        className="
          relative
          z-10
          flex
          flex-col
          items-center
        "
      >
        <div
          className="
            h-16
            w-16
            animate-spin
            rounded-full
            border-4
            border-cyan-500/30
            border-t-cyan-400
          "
        />

        <p
          className="
            mt-6
            text-lg
            font-medium
            text-slate-300
          "
        >
          Loading Experience...
        </p>
      </div>
    </div>
  );
}

function UserMobileLogout() {
  const location = useLocation();
  const navigate = useNavigate();
  const userPaths = [
    "/dashboard",
    "/interview",
    "/analytics",
    "/results",
  ];

  if (!userPaths.some((path) => location.pathname.startsWith(path))) {
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="fixed bottom-4 left-1/2 z-50 w-[calc(100%-2rem)] -translate-x-1/2 md:hidden">
      <button
        onClick={handleLogout}
        className="w-full rounded-2xl bg-red-500 px-4 py-3 text-sm font-semibold text-white shadow-xl shadow-red-500/20 transition hover:bg-red-400"
      >
        Logout
      </button>
    </div>
  );
}

// ========================================
// APP
// ========================================

function App() {
  return (
    <>
      {/* TOAST SYSTEM */}

      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 3500,

          style: {
            background:
              "#0f172a",

            color: "#ffffff",

            border:
              "1px solid rgba(34,211,238,0.15)",

            borderRadius:
              "18px",

            padding:
              "14px 18px",

            boxShadow:
              "0 10px 40px rgba(0,0,0,0.45)",
          },

          success: {
            iconTheme: {
              primary:
                "#22d3ee",

              secondary:
                "#0f172a",
            },
          },

          error: {
            iconTheme: {
              primary:
                "#ef4444",

              secondary:
                "#0f172a",
            },
          },
        }}
      />

      <BrowserRouter>
        <UserMobileLogout />
        <AnimatePresence
          mode="wait"
        >
          <Suspense
            fallback={
              <PageLoader />
            }
          >
            <Routes>
              {/* ======================================== */}
              {/* PUBLIC ROUTES */}
              {/* ======================================== */}

              <Route
                path="/"
                element={
                  <LandingPage />
                }
              />

              <Route
                path="/login"
                element={
                  <LoginPage />
                }
              />

              <Route
                path="/register"
                element={
                  <RegisterPage />
                }
              />

              <Route
                path="/verify-otp"
                element={
                  <VerifyOtp />
                }
              />

              <Route
                path="/forgot-password"
                element={
                  <ForgotPassword />
                }
              />

              <Route
                path="/reset-password"
                element={
                  <ResetPassword />
                }
              />

              {/* ======================================== */}
              {/* USER ROUTES */}
              {/* ======================================== */}

              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute
                    allowedRoles={[
                      "USER",
                      "ADMIN",
                    ]}
                  >
                    <DashboardPage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/interview"
                element={
                  <ProtectedRoute
                    allowedRoles={[
                      "USER",
                    ]}
                  >
                    <Interview />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/analytics"
                element={
                  <ProtectedRoute
                    allowedRoles={[
                      "USER",
                      "ADMIN",
                    ]}
                  >
                    <AnalyticsPage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/results"
                element={
                  <ProtectedRoute
                    allowedRoles={[
                      "USER",
                      "ADMIN",
                    ]}
                  >
                    <ResultPage />
                  </ProtectedRoute>
                }
              />

              {/* ======================================== */}
              {/* ADMIN ROUTES */}
              {/* ======================================== */}

              <Route
                path="/admin"
                element={
                  <ProtectedRoute
                    allowedRoles={[
                      "ADMIN",
                    ]}
                  >
                    <AdminLayout />
                  </ProtectedRoute>
                }
              >
                <Route
                  index
                  element={
                    <Navigate
                      to="/admin/dashboard"
                      replace
                    />
                  }
                />

                <Route
                  path="dashboard"
                  element={
                    <AdminDashboard />
                  }
                />

                <Route
                  path="questions"
                  element={
                    <QuestionsAdmin />
                  }
                />

                <Route
                  path="users"
                  element={
                    <UsersAdmin />
                  }
                />

                <Route
                  path="interviews"
                  element={
                    <InterviewsAdmin />
                  }
                />

                <Route
                  path="analytics"
                  element={
                    <AnalyticsAdmin />
                  }
                />

                <Route
                  path="settings"
                  element={
                    <SettingsAdmin />
                  }
                />
              </Route>

              {/* ======================================== */}
              {/* FALLBACK */}
              {/* ======================================== */}

              <Route
                path="*"
                element={
                  <Navigate
                    to="/login"
                    replace
                  />
                }
              />
            </Routes>
          </Suspense>
        </AnimatePresence>
      </BrowserRouter>
    </>
  );
}

export default App;