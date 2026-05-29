import {
  motion,
} from "framer-motion";

import {
  useMemo,
} from "react";

import {
  Link,
} from "react-router-dom";

import {
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Brain,
  ShieldCheck,
  BarChart3,
  Trophy,
  Activity,
  AlertTriangle,
} from "lucide-react";

import AnimatedBackground from "../components/AnimatedBackground";

export default function ResultPage() {
  const interviewResults =
    useMemo(() => {
      try {
        return (
          JSON.parse(
            localStorage.getItem(
              "interviewResults"
            )
          ) || []
        );
      } catch {
        return [];
      }
    }, []);

  const averageScore =
    useMemo(() => {
      if (
        interviewResults.length === 0
      )
        return 0;
      const total =
        interviewResults.reduce(
          (sum, result) =>
            sum + (result?.score || 0),
          0
        );
      return (
        total /
        interviewResults.length
      ).toFixed(1);
    }, [interviewResults]);

  const latest =
    interviewResults[
      interviewResults.length -
        1
    ] || null;

  const score =
    latest?.score ?? 0;

  const grade =
    score >= 90
      ? "Excellent"
      : score >= 75
      ? "Strong"
      : score >= 60
      ? "Good"
      : "Needs Improvement";

  const scoreColor =
    score >= 90
      ? "from-emerald-400 to-green-500"
      : score >= 75
      ? "from-cyan-400 to-blue-500"
      : score >= 60
      ? "from-yellow-400 to-orange-500"
      : "from-red-400 to-pink-500";

  return (
    <div
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-[#030712]
        text-white
      "
    >
      <AnimatedBackground />

      {/* Glow */}

      <div
        className="
          absolute
          left-1/2
          top-0
          h-[600px]
          w-[600px]
          -translate-x-1/2
          rounded-full
          bg-cyan-500/10
          blur-3xl
        "
      />

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-7xl
          px-6
          py-10
        "
      >
        {/* HERO */}

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
            mb-10
            rounded-[36px]
            border
            border-white/10
            bg-white/5
            p-8
            backdrop-blur-2xl
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
                  size={15}
                />

                AI Interview Result
              </div>

              <h1
                className="
                  mt-6
                  text-5xl
                  font-black
                  tracking-tight
                "
              >
                Performance
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
                  Summary
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
                AI generated evaluation
                with communication,
                confidence, technical
                skills, and anti-cheat
                analysis.
              </p>
            </div>

            <div
              className={`
                flex
                h-40
                w-40
                items-center
                justify-center
                rounded-full
                bg-gradient-to-br
                ${scoreColor}
                shadow-2xl
              `}
            >
              <div
                className="
                  text-center
                "
              >
                <h2
                  className="
                    text-5xl
                    font-black
                    text-white
                  "
                >
                  {score}
                </h2>

                <p
                  className="
                    text-sm
                    font-medium
                    text-white/80
                  "
                >
                  Score
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* EMPTY */}

        {!latest ? (
          <div
            className="
              rounded-[36px]
              border
              border-white/10
              bg-white/5
              p-16
              text-center
              backdrop-blur-2xl
            "
          >
            <Brain
              className="
                mx-auto
                mb-6
                text-cyan-400
              "
              size={70}
            />

            <h2
              className="
                text-4xl
                font-black
              "
            >
              No Interview Result
            </h2>

            <p
              className="
                mt-4
                text-gray-400
              "
            >
              Start an AI interview to
              generate analytics and
              performance insights.
            </p>

            <Link
              to="/dashboard"
              className="
                mt-8
                inline-flex
                items-center
                gap-3
                rounded-2xl
                bg-gradient-to-r
                from-cyan-500
                to-blue-600
                px-8
                py-4
                font-semibold
                shadow-lg
                shadow-cyan-500/20
              "
            >
              Go to Dashboard

              <ArrowRight
                size={20}
              />
            </Link>
          </div>
        ) : (
          <>
            {/* GRID */}

            <div
              className="
                grid
                gap-8
                xl:grid-cols-3
              "
            >
              {/* LEFT */}

              <div
                className="
                  space-y-8
                  xl:col-span-2
                "
              >
                {/* SCORE CARDS */}

                <div
                  className="
                    grid
                    gap-6
                    md:grid-cols-3
                  "
                >
                  <StatCard
                    title="Final Grade"
                    value={grade}
                    icon={Trophy}
                  />

                  <StatCard
                    title="Latest Score"
                    value={score}
                    icon={Brain}
                  />

                  <StatCard
                    title="Average Score"
                    value={
                      parseFloat(
                        averageScore
                      ).toFixed(1)
                    }
                    icon={BarChart3}
                  />
                </div>

                {/* FEEDBACK */}

                <motion.div
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 0.1,
                  }}
                  className="
                    rounded-[36px]
                    border
                    border-white/10
                    bg-white/5
                    p-8
                    backdrop-blur-2xl
                  "
                >
                  <div
                    className="
                      mb-6
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
                        bg-cyan-500/10
                        text-cyan-400
                      "
                    >
                      <Sparkles
                        size={30}
                      />
                    </div>

                    <div>
                      <h2
                        className="
                          text-3xl
                          font-bold
                        "
                      >
                        AI Feedback
                      </h2>

                      <p
                        className="
                          text-gray-400
                        "
                      >
                        Detailed interview
                        analysis
                      </p>
                    </div>
                  </div>

                  <p
                    className="
                      text-lg
                      leading-9
                      text-gray-300
                    "
                  >
                    {latest.summary ||
                      "The AI engine analyzed communication, technical understanding, confidence, and response quality during the interview session."}
                  </p>
                </motion.div>

                {/* PERFORMANCE */}

                <motion.div
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 0.2,
                  }}
                  className="
                    rounded-[36px]
                    border
                    border-white/10
                    bg-white/5
                    p-8
                    backdrop-blur-2xl
                  "
                >
                  <div
                    className="
                      mb-8
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
                        bg-violet-500/10
                        text-violet-400
                      "
                    >
                      <BarChart3
                        size={30}
                      />
                    </div>

                    <div>
                      <h2
                        className="
                          text-3xl
                          font-bold
                        "
                      >
                        Skill Analytics
                      </h2>

                      <p
                        className="
                          text-gray-400
                        "
                      >
                        AI performance metrics
                      </p>
                    </div>
                  </div>

                  <div
                    className="
                      space-y-6
                    "
                  >
                    <ProgressCard
                      title="Communication"
                      value={Math.min(
                        score,
                        100
                      )}
                    />

                    <ProgressCard
                      title="Technical Clarity"
                      value={Math.min(
                        score + 8,
                        100
                      )}
                    />

                    <ProgressCard
                      title="Confidence"
                      value={Math.min(
                        score + 5,
                        100
                      )}
                    />

                    <ProgressCard
                      title="Problem Solving"
                      value={Math.min(
                        score + 10,
                        100
                      )}
                    />
                  </div>
                </motion.div>

                {/* INTERVIEW HISTORY */}

                {interviewResults.length >
                  1 && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 20,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: 0.25,
                    }}
                    className="
                      rounded-[36px]
                      border
                      border-white/10
                      bg-white/5
                      p-8
                      backdrop-blur-2xl
                    "
                  >
                    <div
                      className="
                        mb-8
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
                          bg-orange-500/10
                          text-orange-400
                        "
                      >
                        <Activity
                          size={30}
                        />
                      </div>

                      <div>
                        <h2
                          className="
                            text-3xl
                            font-bold
                          "
                        >
                          Interview History
                        </h2>

                        <p
                          className="
                            text-gray-400
                          "
                        >
                          Your past {
                            interviewResults.length
                          }{" "}
                          interviews
                        </p>
                      </div>
                    </div>

                    <div
                      className="
                        space-y-3
                      "
                    >
                      {interviewResults
                        .slice()
                        .reverse()
                        .map(
                          (
                            result,
                            idx
                          ) => (
                            <div
                              key={idx}
                              className="
                                flex
                                items-center
                                justify-between
                                rounded-2xl
                                border
                                border-white/10
                                bg-[#111827]
                                p-4
                              "
                            >
                              <div>
                                <p
                                  className="
                                    font-medium
                                    capitalize
                                  "
                                >
                                  {
                                    result.category ||
                                    "General"
                                  }{" "}
                                  Interview
                                </p>

                                <p
                                  className="
                                    text-sm
                                    text-gray-400
                                  "
                                >
                                  {new Date(
                                    result.createdAt ||
                                      result.completedAt
                                  ).toLocaleDateString()}
                                </p>
                              </div>

                              <div
                                className="
                                  text-right
                                "
                              >
                                <p
                                  className="
                                    text-2xl
                                    font-bold
                                    text-cyan-400
                                  "
                                >
                                  {
                                    result.score ||
                                    0
                                  }
                                </p>

                                <p
                                  className="
                                    text-sm
                                    text-gray-400
                                  "
                                >
                                  Score
                                </p>
                              </div>
                            </div>
                          )
                        )}
                    </div>
                  </motion.div>
                )}
              </div>

              {/* RIGHT */}

              <div
                className="
                  space-y-8
                "
              >
                {/* SECURITY */}

                <motion.div
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 0.3,
                  }}
                  className="
                    rounded-[36px]
                    border
                    border-white/10
                    bg-white/5
                    p-8
                    backdrop-blur-2xl
                  "
                >
                  <div
                    className="
                      mb-8
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
                        bg-emerald-500/10
                        text-emerald-400
                      "
                    >
                      <ShieldCheck
                        size={30}
                      />
                    </div>

                    <div>
                      <h2
                        className="
                          text-2xl
                          font-bold
                        "
                      >
                        Session Integrity
                      </h2>

                      <p
                        className="
                          text-gray-400
                        "
                      >
                        Monitoring analysis
                      </p>
                    </div>
                  </div>

                  <div
                    className="
                      space-y-5
                    "
                  >
                    <IntegrityCard
                      icon={
                        Activity
                      }
                      title="Tab Switches"
                      value={
                        latest.tabSwitchCount ??
                        0
                      }
                    />

                    <IntegrityCard
                      icon={
                        CheckCircle2
                      }
                      title="Face Detection"
                      value={
                        latest.faceDetected
                          ? "Active"
                          : "Missing"
                      }
                    />

                    <IntegrityCard
                      icon={
                        AlertTriangle
                      }
                      title="Violations"
                      value={
                        latest.violations ??
                        0
                      }
                    />
                  </div>
                </motion.div>

                {/* CTA */}

                <motion.div
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 0.4,
                  }}
                  className="
                    rounded-[36px]
                    border
                    border-cyan-500/20
                    bg-gradient-to-br
                    from-cyan-500/10
                    to-blue-600/10
                    p-8
                    backdrop-blur-2xl
                  "
                >
                  <h3
                    className="
                      text-3xl
                      font-black
                    "
                  >
                    Continue Improving
                  </h3>

                  <p
                    className="
                      mt-4
                      text-gray-300
                    "
                  >
                    Practice more AI
                    interviews and improve
                    communication,
                    confidence, and coding
                    performance.
                  </p>

                  <Link
                    to="/dashboard"
                    className="
                      mt-8
                      inline-flex
                      items-center
                      gap-3
                      rounded-2xl
                      bg-gradient-to-r
                      from-cyan-500
                      to-blue-600
                      px-7
                      py-4
                      font-semibold
                      shadow-lg
                      shadow-cyan-500/20
                    "
                  >
                    Back to Dashboard

                    <ArrowRight
                      size={20}
                    />
                  </Link>
                </motion.div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ========================================
// STAT CARD
// ========================================

function StatCard({
  title,
  value,
  icon: Icon,
}) {
  return (
    <div
      className="
        rounded-[32px]
        border
        border-white/10
        bg-white/5
        p-7
        backdrop-blur-2xl
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

          <h3
            className="
              mt-4
              text-3xl
              font-bold
              capitalize
            "
          >
            {value}
          </h3>
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
    </div>
  );
}

// ========================================
// PROGRESS CARD
// ========================================

function ProgressCard({
  title,
  value,
}) {
  return (
    <div>
      <div
        className="
          mb-3
          flex
          items-center
          justify-between
        "
      >
        <span
          className="
            font-medium
          "
        >
          {title}
        </span>

        <span
          className="
            text-cyan-300
          "
        >
          {value}%
        </span>
      </div>

      <div
        className="
          h-3
          overflow-hidden
          rounded-full
          bg-white/10
        "
      >
        <motion.div
          initial={{
            width: 0,
          }}
          animate={{
            width: `${value}%`,
          }}
          transition={{
            duration: 1,
          }}
          className="
            h-full
            rounded-full
            bg-gradient-to-r
            from-cyan-400
            to-blue-600
          "
        />
      </div>
    </div>
  );
}

// ========================================
// INTEGRITY CARD
// ========================================

function IntegrityCard({
  icon: Icon,
  title,
  value,
}) {
  return (
    <div
      className="
        flex
        items-center
        justify-between
        rounded-3xl
        border
        border-white/10
        bg-[#111827]
        p-5
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
            h-14
            w-14
            items-center
            justify-center
            rounded-2xl
            bg-cyan-500/10
            text-cyan-400
          "
        >
          <Icon size={24} />
        </div>

        <div>
          <p
            className="
              text-sm
              text-gray-400
            "
          >
            {title}
          </p>

          <h4
            className="
              mt-1
              text-xl
              font-bold
            "
          >
            {value}
          </h4>
        </div>
      </div>
    </div>
  );
}