import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  motion,
} from "framer-motion";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  Area,
  BarChart,
  Bar,
} from "recharts";

import {
  Brain,
  Trophy,
  Activity,
  Sparkles,
  BarChart3,
  TrendingUp,
} from "lucide-react";

import {
  getInterviewHistory,
} from "../api/analyticsApi";

import AnimatedBackground from "../components/AnimatedBackground";

function AnalyticsPage() {
  const [results, setResults] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const loadData =
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

    loadData();
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

  const scoreTrend =
    useMemo(() => {
      return results.map(
        (
          item,
          index
        ) => ({
          name:
            item.startTime
              ? new Date(
                  item.startTime
                ).toLocaleDateString()
              : `Interview ${
                  index + 1
                }`,

          score:
            item.score || 0,
        })
      );
    }, [results]);

  const categoryData =
    useMemo(() => {
      const counts =
        results.reduce(
          (
            acc,
            item
          ) => {
            const key =
              item.category ||
              "General";

            acc[key] =
              (acc[key] ||
                0) + 1;

            return acc;
          },
          {}
        );

      return Object.entries(
        counts
      ).map(
        ([
          category,
          count,
        ]) => ({
          category,
          count,
        })
      );
    }, [results]);

  const feedbackData =
    useMemo(() => {
      const counts =
        results.reduce(
          (
            acc,
            item
          ) => {
            const key =
              item.summary ||
              "AI Feedback";

            acc[key] =
              (acc[key] ||
                0) + 1;

            return acc;
          },
          {}
        );

      return Object.entries(
        counts
      ).map(
        ([
          summary,
          count,
        ]) => ({
          summary,
          count,
        })
      );
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

      {/* Hero */}

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

          AI Powered Analytics
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
          Analytics
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
            Dashboard
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
          Track interview performance,
          AI insights, score trends,
          and category analytics in
          real-time.
        </p>
      </motion.div>

      {/* Stats */}

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
          icon={
            TrendingUp
          }
        />

        <StatsCard
          title="Best Score"
          value={bestScore}
          icon={Trophy}
        />

        <StatsCard
          title="Categories"
          value={
            categoryData.length
          }
          icon={Activity}
        />
      </div>

      {/* Empty State */}

      {results.length ===
      0 ? (
        <div
          className="
            relative
            z-10
            rounded-3xl
            border
            border-dashed
            border-white/10
            bg-white/5
            py-24
            text-center
            backdrop-blur-xl
          "
        >
          <BarChart3
            className="
              mx-auto
              mb-5
              text-cyan-400
            "
            size={60}
          />

          <h2
            className="
              text-3xl
              font-bold
            "
          >
            No Analytics Yet
          </h2>

          <p
            className="
              mt-3
              text-gray-400
            "
          >
            Complete interviews to
            generate AI insights and
            analytics.
          </p>
        </div>
      ) : (
        <div
          className="
            relative
            z-10
            grid
            gap-8
            xl:grid-cols-2
          "
        >
          {/* Score Trend */}

          <ChartCard title="Score Trend">
            <ResponsiveContainer
              width="100%"
              height={340}
            >
              <AreaChart
                data={scoreTrend}
              >
                <defs>
                  <linearGradient
                    id="scoreGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="#06b6d4"
                      stopOpacity={
                        0.7
                      }
                    />

                    <stop
                      offset="100%"
                      stopColor="#06b6d4"
                      stopOpacity={
                        0
                      }
                    />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  stroke="#1e293b"
                />

                <XAxis
                  dataKey="name"
                  stroke="#94a3b8"
                />

                <YAxis
                  stroke="#94a3b8"
                />

                <Tooltip />

                <Area
                  type="monotone"
                  dataKey="score"
                  stroke="#06b6d4"
                  strokeWidth={3}
                  fill="url(#scoreGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Category Analytics */}

          <ChartCard title="Interview Categories">
            <ResponsiveContainer
              width="100%"
              height={340}
            >
              <BarChart
                data={
                  categoryData
                }
              >
                <CartesianGrid
                  stroke="#1e293b"
                />

                <XAxis
                  dataKey="category"
                  stroke="#94a3b8"
                />

                <YAxis
                  stroke="#94a3b8"
                />

                <Tooltip />

                <Bar
                  dataKey="count"
                  fill="#3b82f6"
                  radius={[
                    10,
                    10,
                    0,
                    0,
                  ]}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Performance History */}

          <div
            className="
              rounded-3xl
              border
              border-white/10
              bg-white/5
              p-8
              backdrop-blur-xl
              xl:col-span-2
            "
          >
            <h2
              className="
                mb-8
                text-2xl
                font-bold
              "
            >
              AI Feedback Insights
            </h2>

            <div
              className="
                grid
                gap-5
                md:grid-cols-2
                xl:grid-cols-3
              "
            >
              {feedbackData.map(
                (item) => (
                  <motion.div
                    key={
                      item.summary
                    }
                    whileHover={{
                      y: -5,
                    }}
                    className="
                      rounded-3xl
                      border
                      border-white/10
                      bg-[#111827]
                      p-6
                    "
                  >
                    <p
                      className="
                        text-sm
                        text-gray-400
                      "
                    >
                      {
                        item.summary
                      }
                    </p>

                    <h3
                      className="
                        mt-4
                        text-5xl
                        font-black
                        text-cyan-400
                      "
                    >
                      {
                        item.count
                      }
                    </h3>
                  </motion.div>
                )
              )}
            </div>
          </div>
        </div>
      )}
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
// CHART CARD
// ========================================

function ChartCard({
  title,
  children,
}) {
  return (
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
      <h2
        className="
          mb-8
          text-2xl
          font-bold
        "
      >
        {title}
      </h2>

      {children}
    </div>
  );
}

export default AnalyticsPage;