import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  motion,
} from "framer-motion";

import {
  useNavigate,
} from "react-router-dom";

import {
  Brain,
  Trophy,
  Clock3,
  Sparkles,
  ArrowRight,
  Activity,
  BarChart3,
  CheckCircle2,
} from "lucide-react";

import {
  getInterviewHistory,
} from "../api/analyticsApi";

import AnimatedBackground from "../components/AnimatedBackground";

function DashboardPage() {
  const navigate =
    useNavigate();

  const [results, setResults] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchData =
      async () => {
        try {
          const backendResults =
            await getInterviewHistory();

          if (
            Array.isArray(
              backendResults
            )
          ) {
            const localResults =
              JSON.parse(
                localStorage.getItem(
                  "interviewResults"
                ) || "[]"
              );

            const merged = [
              ...backendResults,

              ...localResults.filter(
                (local) =>
                  !backendResults.some(
                    (
                      backend
                    ) =>
                      backend.interviewId ===
                      local.interviewId
                  )
              ),
            ];

            setResults(
              merged
            );
          }
        } catch (error) {
          console.error(
            error
          );

          const localResults =
            JSON.parse(
              localStorage.getItem(
                "interviewResults"
              ) || "[]"
            );

          setResults(
            localResults
          );
        } finally {
          setLoading(false);
        }
      };

    fetchData();
  }, []);

  // ========================================
  // STATS
  // ========================================

  const averageScore =
    useMemo(() => {
      if (
        results.length === 0
      )
        return 0;

      return (
        results.reduce(
          (
            acc,
            curr
          ) =>
            acc +
            (curr.score ||
              0),
          0
        ) /
        results.length
      ).toFixed(1);
    }, [results]);

  const bestScore =
    useMemo(() => {
      if (
        results.length === 0
      )
        return 0;

      return Math.max(
        ...results.map(
          (item) =>
            item.score || 0
        )
      );
    }, [results]);

  const completedInterviews =
    useMemo(() => {
      return results.filter(
        (item) =>
          item.status ===
          "COMPLETED"
      ).length;
    }, [results]);

  // ========================================
  // LOADING
  // ========================================

  if (loading) {
    return (
      <div
        className="
          min-h-screen
          bg-[#030712]
          p-10
        "
      >
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
              h-[500px]
              animate-pulse
              rounded-3xl
              bg-white/5
            "
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-[#030712]
        p-6
        text-white
        md:p-10
      "
    >
      <AnimatedBackground />

      {/* HERO SECTION */}

      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="
          relative
          z-10
          mb-10
        "
      >
        <div
          className="
            inline-flex
            items-center
            gap-2
            rounded-full
            border
            border-cyan-500/20
            bg-cyan-500/10
            px-4
            py-2
            text-sm
            text-cyan-300
          "
        >
          <Sparkles
            size={16}
          />

          AI Powered Interview Platform
        </div>

        <h1
          className="
            mt-6
            text-5xl
            font-black
            tracking-tight
            md:text-6xl
          "
        >
          Welcome Back
          <span
            className="
              bg-gradient-to-r
              from-cyan-400
              to-blue-500
              bg-clip-text
              text-transparent
            "
          >
            {" "}
            Candidate
          </span>
        </h1>

        <p
          className="
            mt-4
            max-w-2xl
            text-lg
            text-gray-400
          "
        >
          Practice interviews, improve
          communication, track AI
          insights, and grow your
          technical confidence.
        </p>
      </motion.div>

      {/* STATS */}

      <div
        className="
          relative
          z-10
          mb-10
          grid
          gap-6
          md:grid-cols-2
          xl:grid-cols-4
        "
      >
        <StatsCard
          title="Total Interviews"
          value={
            results.length
          }
          icon={Brain}
        />

        <StatsCard
          title="Average Score"
          value={
            averageScore
          }
          icon={BarChart3}
        />

        <StatsCard
          title="Best Score"
          value={bestScore}
          icon={Trophy}
        />

        <StatsCard
          title="Completed"
          value={
            completedInterviews
          }
          icon={
            CheckCircle2
          }
        />
      </div>

      {/* MAIN GRID */}

      <div
        className="
          relative
          z-10
          grid
          gap-8
          xl:grid-cols-3
        "
      >
        {/* LEFT SECTION */}

        <div
          className="
            space-y-8
            xl:col-span-2
          "
        >
          {/* START INTERVIEW */}

          <motion.div
            whileHover={{
              y: -5,
            }}
            className="
              rounded-3xl
              border
              border-cyan-500/20
              bg-gradient-to-br
              from-cyan-500/10
              to-blue-600/10
              p-8
              backdrop-blur-xl
            "
          >
            <div
              className="
                flex
                flex-col
                gap-6
                lg:flex-row
                lg:items-center
                lg:justify-between
              "
            >
              <div>
                <div
                  className="
                    mb-4
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    rounded-3xl
                    bg-cyan-500/10
                    text-cyan-400
                  "
                >
                  <Brain
                    size={34}
                  />
                </div>

                <h2
                  className="
                    text-3xl
                    font-bold
                  "
                >
                  Start New Interview
                </h2>

                <p
                  className="
                    mt-3
                    max-w-xl
                    text-gray-400
                  "
                >
                  Practice technical
                  interviews with AI
                  powered evaluation,
                  feedback, and real-time
                  scoring.
                </p>
              </div>

              <button
                onClick={() =>
                  navigate(
                    "/interview"
                  )
                }
                className="
                  flex
                  items-center
                  justify-center
                  gap-3
                  rounded-2xl
                  bg-gradient-to-r
                  from-cyan-500
                  to-blue-600
                  px-8
                  py-4
                  font-semibold
                  text-white
                  shadow-lg
                  shadow-cyan-500/20
                  transition-all

                  hover:scale-[1.02]
                "
              >
                Start Now

                <ArrowRight
                  size={20}
                />
              </button>
            </div>
          </motion.div>

          {/* RECENT INTERVIEWS */}

          <div
            className="
              rounded-3xl
              border
              border-white/10
              bg-white/5
              p-8
              backdrop-blur-xl
            "
          >
            <div
              className="
                mb-8
                flex
                items-center
                justify-between
              "
            >
              <div>
                <h2
                  className="
                    text-2xl
                    font-bold
                  "
                >
                  Recent Interviews
                </h2>

                <p
                  className="
                    mt-2
                    text-sm
                    text-gray-400
                  "
                >
                  Your latest AI interview
                  sessions
                </p>
              </div>

              <button
                onClick={() =>
                  navigate(
                    "/analytics"
                  )
                }
                className="
                  rounded-2xl
                  border
                  border-white/10
                  px-5
                  py-3
                  text-sm
                  transition

                  hover:bg-white/5
                "
              >
                View Analytics
              </button>
            </div>

            {results.length ===
            0 ? (
              <div
                className="
                  rounded-2xl
                  border
                  border-dashed
                  border-white/10
                  py-20
                  text-center
                "
              >
                <Activity
                  className="
                    mx-auto
                    mb-4
                    text-cyan-400
                  "
                  size={50}
                />

                <h3
                  className="
                    text-2xl
                    font-bold
                  "
                >
                  No Interviews Yet
                </h3>

                <p
                  className="
                    mt-3
                    text-gray-400
                  "
                >
                  Start your first AI
                  interview session.
                </p>
              </div>
            ) : (
              <div
                className="
                  space-y-5
                "
              >
                {results
                  .slice(0, 5)
                  .map(
                    (
                      item,
                      index
                    ) => (
                      <motion.div
                        key={
                          index
                        }
                        whileHover={{
                          y: -3,
                        }}
                        className="
                          flex
                          flex-col
                          gap-5
                          rounded-3xl
                          border
                          border-white/10
                          bg-[#111827]
                          p-6
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
                            <h3
                              className="
                                text-xl
                                font-semibold
                              "
                            >
                              {item.category ||
                                "AI Interview"}
                            </h3>

                            <div
                              className="
                                mt-4
                                flex
                                flex-wrap
                                gap-3
                              "
                            >
                              <Badge
                                text={`Score: ${
                                  item.score ||
                                  0
                                }`}
                              />

                              <Badge
                                text={
                                  item.status ||
                                  "Completed"
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
                            <Clock3
                              size={16}
                            />

                            {item.startTime
                              ? new Date(
                                  item.startTime
                                ).toLocaleDateString()
                              : "Recent"}
                          </div>
                        </div>
                      </motion.div>
                    )
                  )}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT PANEL */}

        <div
          className="
            space-y-8
          "
        >
          {/* AI INSIGHTS */}

          <div
            className="
              rounded-3xl
              border
              border-white/10
              bg-white/5
              p-8
              backdrop-blur-xl
            "
          >
            <div
              className="
                mb-6
                flex
                items-center
                gap-3
              "
            >
              <div
                className="
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-3xl
                  bg-cyan-500/10
                  text-cyan-400
                "
              >
                <Sparkles
                  size={28}
                />
              </div>

              <div>
                <h3
                  className="
                    text-xl
                    font-bold
                  "
                >
                  AI Insights
                </h3>

                <p
                  className="
                    text-sm
                    text-gray-400
                  "
                >
                  Smart recommendations
                </p>
              </div>
            </div>

            <div
              className="
                space-y-5
              "
            >
              <InsightCard
                title="Communication"
                description="Improve concise answering and confidence."
              />

              <InsightCard
                title="Technical Skills"
                description="Practice more advanced DSA and system design."
              />

              <InsightCard
                title="Consistency"
                description="Maintain regular interview practice sessions."
              />
            </div>
          </div>
        </div>
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
  icon: Icon,
}) {
  return (
    <motion.div
      whileHover={{
        y: -4,
      }}
      className="
        rounded-3xl
        border
        border-white/10
        bg-white/5
        p-8
        backdrop-blur-xl
      "
    >
      <div
        className="
          flex
          items-center
          justify-between
        "
      >
        <div>
          <p
            className="
              text-sm
              text-gray-400
            "
          >
            {title}
          </p>

          <h2
            className="
              mt-4
              text-5xl
              font-black
            "
          >
            {value}
          </h2>
        </div>

        <div
          className="
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-3xl
            bg-cyan-500/10
            text-cyan-400
          "
        >
          <Icon size={30} />
        </div>
      </div>
    </motion.div>
  );
}

// ========================================
// BADGE
// ========================================

function Badge({
  text,
}) {
  return (
    <div
      className="
        rounded-xl
        bg-cyan-500/10
        px-4
        py-2
        text-sm
        text-cyan-300
      "
    >
      {text}
    </div>
  );
}

// ========================================
// INSIGHT CARD
// ========================================

function InsightCard({
  title,
  description,
}) {
  return (
    <motion.div
      whileHover={{
        y: -2,
      }}
      className="
        rounded-2xl
        border
        border-white/10
        bg-[#111827]
        p-5
      "
    >
      <h4
        className="
          text-lg
          font-semibold
        "
      >
        {title}
      </h4>

      <p
        className="
          mt-2
          text-sm
          text-gray-400
        "
      >
        {description}
      </p>
    </motion.div>
  );
}

export default DashboardPage;