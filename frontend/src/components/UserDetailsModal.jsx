import {
  useEffect,
  useState,
} from "react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  X,
  Mail,
  Shield,
  Trophy,
  Brain,
  CalendarDays,
  User2,
} from "lucide-react";

import {
  getUserDetails,
  getUserInterviews,
} from "../api/adminApi";

export default function UserDetailsModal({
  userId,
  open,
  onClose,
}) {
  const [user, setUser] =
    useState(null);

  const [
    interviews,
    setInterviews,
  ] = useState([]);

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    if (
      !open ||
      !userId
    )
      return;

    let mounted = true;

    const fetchData =
      async () => {
        setLoading(true);

        try {
          const userData =
            await getUserDetails(
              userId
            );

          const interviewData =
            await getUserInterviews(
              userId
            );

          if (mounted) {
            setUser(
              userData
            );

            setInterviews(
              interviewData ||
                []
            );
          }
        } catch (error) {
          console.error(
            error
          );
        } finally {
          setLoading(false);
        }
      };

    fetchData();

    return () => {
      mounted = false;
    };
  }, [open, userId]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          className="
            fixed
            inset-0
            z-50
            flex
            items-start
            justify-center
            overflow-y-auto
            bg-black/70
            backdrop-blur-sm
            p-5
          "
        >
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.92,
              y: 30,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.92,
            }}
            className="
              w-full
              max-w-5xl
              rounded-3xl
              border
              border-white/10
              bg-[#0f172a]
              p-8
              shadow-2xl
            "
          >
            {/* Header */}

            <div
              className="
                mb-8
                flex
                items-start
                justify-between
              "
            >
              <div
                className="
                  flex
                  items-center
                  gap-4
                "
              >
                <div
                  className="
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    rounded-3xl
                    bg-gradient-to-br
                    from-cyan-400
                    to-blue-600
                    text-white
                    shadow-lg
                    shadow-cyan-500/30
                  "
                >
                  <User2
                    size={30}
                  />
                </div>

                <div>
                  <h2
                    className="
                      text-3xl
                      font-bold
                      text-white
                    "
                  >
                    User Details
                  </h2>

                  <p
                    className="
                      mt-1
                      text-sm
                      text-gray-400
                    "
                  >
                    AI interview platform analytics
                  </p>
                </div>
              </div>

              <button
                onClick={
                  onClose
                }
                className="
                  rounded-2xl
                  p-3
                  text-gray-400
                  transition

                  hover:bg-white/5
                  hover:text-white
                "
              >
                <X />
              </button>
            </div>

            {/* Loading State */}

            {loading ? (
              <div
                className="
                  grid
                  gap-6
                "
              >
                <div
                  className="
                    h-40
                    animate-pulse
                    rounded-3xl
                    bg-white/5
                  "
                />

                <div
                  className="
                    h-72
                    animate-pulse
                    rounded-3xl
                    bg-white/5
                  "
                />
              </div>
            ) : (
              <div
                className="
                  grid
                  gap-6
                "
              >
                {/* User Info Cards */}

                <div
                  className="
                    grid
                    gap-5
                    lg:grid-cols-2
                  "
                >
                  {/* Profile Card */}

                  <div
                    className="
                      rounded-3xl
                      border
                      border-white/10
                      bg-white/5
                      p-6
                      backdrop-blur-xl
                    "
                  >
                    <h3
                      className="
                        mb-6
                        text-xl
                        font-semibold
                        text-white
                      "
                    >
                      Profile Information
                    </h3>

                    <div
                      className="
                        space-y-5
                      "
                    >
                      <InfoRow
                        icon={
                          User2
                        }
                        label="Name"
                        value={
                          user?.name ||
                          "—"
                        }
                      />

                      <InfoRow
                        icon={
                          Mail
                        }
                        label="Email"
                        value={
                          user?.email ||
                          "—"
                        }
                      />

                      <InfoRow
                        icon={
                          Shield
                        }
                        label="Role"
                        value={
                          user?.role ||
                          "—"
                        }
                      />

                      <InfoRow
                        icon={
                          Brain
                        }
                        label="Status"
                        value={
                          user?.status ||
                          "—"
                        }
                      />
                    </div>
                  </div>

                  {/* Stats Card */}

                  <div
                    className="
                      rounded-3xl
                      border
                      border-white/10
                      bg-white/5
                      p-6
                      backdrop-blur-xl
                    "
                  >
                    <h3
                      className="
                        mb-6
                        text-xl
                        font-semibold
                        text-white
                      "
                    >
                      Interview Analytics
                    </h3>

                    <div
                      className="
                        grid
                        gap-4
                        sm:grid-cols-2
                      "
                    >
                      <StatsCard
                        title="Total Interviews"
                        value={
                          user?.totalInterviews ||
                          interviews.length
                        }
                      />

                      <StatsCard
                        title="Average Score"
                        value={
                          user?.averageScore ||
                          "0"
                        }
                      />

                      <StatsCard
                        title="Completed"
                        value={
                          interviews.filter(
                            (
                              item
                            ) =>
                              item.status ===
                              "COMPLETED"
                          )
                            .length
                        }
                      />

                      <StatsCard
                        title="AI Rating"
                        value="Excellent"
                      />
                    </div>
                  </div>
                </div>

                {/* Interview History */}

                <div
                  className="
                    rounded-3xl
                    border
                    border-white/10
                    bg-white/5
                    p-6
                    backdrop-blur-xl
                  "
                >
                  <div
                    className="
                      mb-6
                      flex
                      items-center
                      justify-between
                    "
                  >
                    <div>
                      <h3
                        className="
                          text-2xl
                          font-semibold
                          text-white
                        "
                      >
                        Interview History
                      </h3>

                      <p
                        className="
                          mt-1
                          text-sm
                          text-gray-400
                        "
                      >
                        Recent AI interview sessions
                      </p>
                    </div>
                  </div>

                  {interviews.length ===
                  0 ? (
                    <div
                      className="
                        rounded-2xl
                        border
                        border-dashed
                        border-white/10
                        py-16
                        text-center
                      "
                    >
                      <p
                        className="
                          text-gray-400
                        "
                      >
                        No interviews found
                      </p>
                    </div>
                  ) : (
                    <div
                      className="
                        space-y-4
                      "
                    >
                      {interviews.map(
                        (
                          item
                        ) => (
                          <motion.div
                            key={
                              item.id
                            }
                            whileHover={{
                              scale: 1.01,
                            }}
                            className="
                              flex
                              flex-col
                              gap-5
                              rounded-2xl
                              border
                              border-white/10
                              bg-[#111827]
                              p-5
                              transition-all

                              hover:border-cyan-500/30
                            "
                          >
                            <div
                              className="
                                flex
                                flex-col
                                justify-between
                                gap-4
                                lg:flex-row
                              "
                            >
                              <div>
                                <h4
                                  className="
                                    text-lg
                                    font-semibold
                                    text-white
                                  "
                                >
                                  {item.title ||
                                    item.question ||
                                    "Interview"}
                                </h4>

                                <div
                                  className="
                                    mt-3
                                    flex
                                    flex-wrap
                                    gap-3
                                  "
                                >
                                  <Badge
                                    icon={
                                      Trophy
                                    }
                                    text={`Score: ${
                                      item.score ||
                                      "—"
                                    }`}
                                  />

                                  <Badge
                                    icon={
                                      Brain
                                    }
                                    text={
                                      item.status ||
                                      "PENDING"
                                    }
                                  />
                                </div>
                              </div>

                              <div
                                className="
                                  flex
                                  items-center
                                  gap-2
                                  text-sm
                                  text-gray-400
                                "
                              >
                                <CalendarDays
                                  size={
                                    16
                                  }
                                />

                                {item.createdAt
                                  ? new Date(
                                      item.createdAt
                                    ).toLocaleString()
                                  : "—"}
                              </div>
                            </div>
                          </motion.div>
                        )
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ========================================
// INFO ROW
// ========================================

function InfoRow({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div
      className="
        flex
        items-center
        gap-4
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
          bg-cyan-500/10
          text-cyan-400
        "
      >
        <Icon size={20} />
      </div>

      <div>
        <p
          className="
            text-sm
            text-gray-400
          "
        >
          {label}
        </p>

        <h4
          className="
            font-medium
            text-white
          "
        >
          {value}
        </h4>
      </div>
    </div>
  );
}

// ========================================
// STATS CARD
// ========================================

function StatsCard({
  title,
  value,
}) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-white/10
        bg-[#111827]
        p-5
      "
    >
      <p
        className="
          text-sm
          text-gray-400
        "
      >
        {title}
      </p>

      <h3
        className="
          mt-2
          text-3xl
          font-bold
          text-white
        "
      >
        {value}
      </h3>
    </div>
  );
}

// ========================================
// BADGE
// ========================================

function Badge({
  icon: Icon,
  text,
}) {
  return (
    <div
      className="
        flex
        items-center
        gap-2
        rounded-xl
        bg-cyan-500/10
        px-3
        py-2
        text-sm
        text-cyan-300
      "
    >
      <Icon size={15} />

      {text}
    </div>
  );
}