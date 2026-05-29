import {
  LayoutDashboard,
  FileQuestion,
  BarChart3,
  LogOut,
  Sparkles,
} from "lucide-react";

import {
  motion,
} from "framer-motion";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

function Sidebar() {
  const location =
    useLocation();

  const navigate =
    useNavigate();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon:
        LayoutDashboard,
    },

    {
      name: "Questions",
      path: "/questions",
      icon:
        FileQuestion,
    },

    {
      name: "Analytics",
      path: "/analytics",
      icon:
        BarChart3,
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    navigate("/");
  };

  return (
    <aside
      className="
        hidden md:flex
        w-72
        min-h-screen
        flex-col
        justify-between
        border-r
        border-white/10
        bg-[#030712]/95
        backdrop-blur-2xl
        px-6
        py-8
      "
    >
      {/* Top Section */}

      <div>
        {/* Logo */}

        <motion.div
          initial={{
            opacity: 0,
            x: -20,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          className="
            mb-14
            flex
            items-center
            gap-3
          "
        >
          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-2xl
              bg-gradient-to-br
              from-cyan-400
              to-blue-600
              shadow-lg
              shadow-cyan-500/20
            "
          >
            <Sparkles
              size={24}
              className="
                text-white
              "
            />
          </div>

          <div>
            <h1
              className="
                text-2xl
                font-bold
                text-white
                tracking-tight
              "
            >
              InterviewAI
            </h1>

            <p
              className="
                text-xs
                text-gray-400
                mt-1
              "
            >
              Smart AI Platform
            </p>
          </div>
        </motion.div>

        {/* Navigation */}

        <nav
          className="
            space-y-3
          "
        >
          {menuItems.map(
            (item) => {
              const Icon =
                item.icon;

              const isActive =
                location.pathname ===
                item.path;

              return (
                <motion.button
                  key={
                    item.path
                  }
                  whileHover={{
                    scale: 1.02,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  onClick={() =>
                    navigate(
                      item.path
                    )
                  }
                  className={`
                    group
                    flex
                    w-full
                    items-center
                    gap-4
                    rounded-2xl
                    px-5
                    py-4
                    transition-all
                    duration-300

                    ${
                      isActive
                        ? `
                          bg-gradient-to-r
                          from-cyan-500
                          to-blue-600
                          text-white
                          shadow-lg
                          shadow-cyan-500/20
                        `
                        : `
                          text-gray-400
                          hover:bg-white/5
                          hover:text-white
                        `
                    }
                  `}
                >
                  <Icon
                    size={22}
                  />

                  <span
                    className="
                      text-sm
                      font-medium
                    "
                  >
                    {
                      item.name
                    }
                  </span>
                </motion.button>
              );
            }
          )}
        </nav>
      </div>

      {/* Bottom Section */}

      <div>
        {/* User Card */}

        <div
          className="
            mb-5
            rounded-3xl
            border
            border-white/10
            bg-white/5
            p-4
            backdrop-blur-xl
          "
        >
          <div
            className="
              flex
              items-center
              gap-3
            "
          >
            <div
              className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-full
                bg-gradient-to-br
                from-cyan-400
                to-blue-600
                text-lg
                font-bold
                text-white
              "
            >
              A
            </div>

            <div>
              <h3
                className="
                  text-sm
                  font-semibold
                  text-white
                "
              >
                Welcome Back
              </h3>

              <p
                className="
                  text-xs
                  text-gray-400
                "
              >
                AI Interview User
              </p>
            </div>
          </div>
        </div>

        {/* Logout Button */}

        <motion.button
          whileHover={{
            scale: 1.02,
          }}
          whileTap={{
            scale: 0.98,
          }}
          onClick={
            handleLogout
          }
          className="
            flex
            w-full
            items-center
            justify-center
            gap-3
            rounded-2xl
            border
            border-red-500/20
            bg-red-500/10
            px-5
            py-4
            text-red-400
            transition-all
            duration-300

            hover:bg-red-500
            hover:text-white
          "
        >
          <LogOut
            size={20}
          />

          <span
            className="
              font-medium
            "
          >
            Logout
          </span>
        </motion.button>
      </div>
    </aside>
  );
}

export default Sidebar;