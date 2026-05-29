import {
  motion,
} from "framer-motion";

import {
  useNavigate,
} from "react-router-dom";

import {
  ArrowRight,
  Brain,
  Sparkles,
  ShieldCheck,
  BarChart3,
  Mic,
  Video,
  CheckCircle2,
  Star,
} from "lucide-react";

import AnimatedBackground from "../components/AnimatedBackground";

function LandingPage() {
  const navigate =
    useNavigate();

  const features = [
    {
      title:
        "AI Interview Evaluation",

      description:
        "Real-time AI powered scoring and feedback for technical interviews.",

      icon: Brain,
    },

    {
      title:
        "Voice + Camera Monitoring",

      description:
        "Advanced voice recognition and anti-cheat interview protection.",

      icon: Video,
    },

    {
      title:
        "Detailed Analytics",

      description:
        "Track interview growth, performance trends, and AI insights.",

      icon:
        BarChart3,
    },

    {
      title:
        "Smart Feedback",

      description:
        "Get intelligent recommendations to improve confidence and communication.",

      icon:
        Sparkles,
    },
  ];

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

      {/* NAVBAR */}

      <header
        className="
          relative
          z-20
          mx-auto
          flex
          max-w-7xl
          items-center
          justify-between
          px-6
          py-6
        "
      >
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
              rounded-3xl
              bg-gradient-to-br
              from-cyan-400
              to-blue-600
              shadow-lg
              shadow-cyan-500/20
            "
          >
            <Brain
              size={28}
            />
          </div>

          <div>
            <h1
              className="
                text-2xl
                font-black
                tracking-tight
              "
            >
              InterviewAI
            </h1>

            <p
              className="
                text-xs
                text-gray-400
              "
            >
              Next Generation AI Interviews
            </p>
          </div>
        </motion.div>

        {/* Buttons */}

        <div
          className="
            flex
            items-center
            gap-4
          "
        >
          <button
            onClick={() =>
              navigate(
                "/login"
              )
            }
            className="
              rounded-2xl
              border
              border-white/10
              px-5
              py-3
              text-sm
              font-medium
              transition-all

              hover:bg-white/5
            "
          >
            Login
          </button>

          <button
            onClick={() =>
              navigate(
                "/register"
              )
            }
            className="
              rounded-2xl
              bg-gradient-to-r
              from-cyan-500
              to-blue-600
              px-6
              py-3
              text-sm
              font-semibold
              shadow-lg
              shadow-cyan-500/20
              transition-all

              hover:scale-[1.02]
            "
          >
            Get Started
          </button>
        </div>
      </header>

      {/* HERO */}

      <section
        className="
          relative
          z-10
          mx-auto
          flex
          max-w-7xl
          flex-col
          items-center
          px-6
          pb-28
          pt-10
          text-center
        "
      >
        {/* Badge */}

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
            inline-flex
            items-center
            gap-2
            rounded-full
            border
            border-cyan-500/20
            bg-cyan-500/10
            px-5
            py-2
            text-sm
            text-cyan-300
          "
        >
          <Sparkles
            size={16}
          />

          AI Powered Interview Platform
        </motion.div>

        {/* Heading */}

        <motion.h1
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.1,
          }}
          className="
            mt-10
            max-w-5xl
            text-6xl
            font-black
            leading-tight
            tracking-tight
            md:text-7xl
          "
        >
          Crack Technical
          Interviews with
          <span
            className="
              bg-gradient-to-r
              from-cyan-400
              via-blue-500
              to-violet-500
              bg-clip-text
              text-transparent
            "
          >
            {" "}
            AI Intelligence
          </span>
        </motion.h1>

        {/* Description */}

        <motion.p
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.2,
          }}
          className="
            mt-8
            max-w-3xl
            text-xl
            leading-relaxed
            text-gray-400
          "
        >
          Practice real interview
          questions, receive AI powered
          evaluations, improve
          communication skills, and
          prepare for top-tier tech
          companies with an immersive
          interview experience.
        </motion.p>

        {/* CTA */}

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.3,
          }}
          className="
            mt-12
            flex
            flex-col
            gap-5
            sm:flex-row
          "
        >
          <button
            onClick={() =>
              navigate(
                "/register"
              )
            }
            className="
              flex
              items-center
              justify-center
              gap-3
              rounded-3xl
              bg-gradient-to-r
              from-cyan-500
              to-blue-600
              px-8
              py-5
              text-lg
              font-semibold
              shadow-2xl
              shadow-cyan-500/20
              transition-all

              hover:scale-[1.03]
            "
          >
            Start Free Interview

            <ArrowRight
              size={22}
            />
          </button>

          <button
            onClick={() =>
              navigate(
                "/login"
              )
            }
            className="
              flex
              items-center
              justify-center
              gap-3
              rounded-3xl
              border
              border-white/10
              bg-white/5
              px-8
              py-5
              text-lg
              font-medium
              backdrop-blur-xl
              transition-all

              hover:bg-white/10
            "
          >
            Explore Platform
          </button>
        </motion.div>

        {/* TRUST */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0.5,
          }}
          className="
            mt-16
            flex
            flex-wrap
            items-center
            justify-center
            gap-8
            text-gray-500
          "
        >
          <div
            className="
              flex
              items-center
              gap-2
            "
          >
            <CheckCircle2
              size={18}
            />

            AI Evaluation
          </div>

          <div
            className="
              flex
              items-center
              gap-2
            "
          >
            <ShieldCheck
              size={18}
            />

            Anti Cheat Monitoring
          </div>

          <div
            className="
              flex
              items-center
              gap-2
            "
          >
            <Mic
              size={18}
            />

            Voice Recognition
          </div>
        </motion.div>
      </section>

      {/* FEATURES */}

      <section
        className="
          relative
          z-10
          mx-auto
          max-w-7xl
          px-6
          pb-28
        "
      >
        <div
          className="
            mb-16
            text-center
          "
        >
          <h2
            className="
              text-5xl
              font-black
            "
          >
            Built for
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
              Serious Preparation
            </span>
          </h2>

          <p
            className="
              mx-auto
              mt-5
              max-w-2xl
              text-lg
              text-gray-400
            "
          >
            Everything you need to
            practice technical
            interviews at startup and
            FAANG level.
          </p>
        </div>

        <div
          className="
            grid
            gap-8
            md:grid-cols-2
            xl:grid-cols-4
          "
        >
          {features.map(
            (
              feature,
              index
            ) => {
              const Icon =
                feature.icon;

              return (
                <motion.div
                  key={
                    feature.title
                  }
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay:
                      index * 0.1,
                  }}
                  whileHover={{
                    y: -8,
                  }}
                  className="
                    rounded-[32px]
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
                      h-16
                      w-16
                      items-center
                      justify-center
                      rounded-3xl
                      bg-cyan-500/10
                      text-cyan-400
                    "
                  >
                    <Icon
                      size={30}
                    />
                  </div>

                  <h3
                    className="
                      mt-6
                      text-2xl
                      font-bold
                    "
                  >
                    {
                      feature.title
                    }
                  </h3>

                  <p
                    className="
                      mt-4
                      leading-relaxed
                      text-gray-400
                    "
                  >
                    {
                      feature.description
                    }
                  </p>
                </motion.div>
              );
            }
          )}
        </div>
      </section>

      {/* TESTIMONIAL */}

      <section
        className="
          relative
          z-10
          mx-auto
          max-w-5xl
          px-6
          pb-28
        "
      >
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          className="
            rounded-[40px]
            border
            border-white/10
            bg-gradient-to-br
            from-cyan-500/10
            to-blue-600/10
            p-12
            text-center
            backdrop-blur-2xl
          "
        >
          <div
            className="
              mb-6
              flex
              justify-center
              gap-1
              text-yellow-400
            "
          >
            {[...Array(5)].map(
              (_, i) => (
                <Star
                  key={i}
                  size={24}
                  fill="currentColor"
                />
              )
            )}
          </div>

          <h3
            className="
              text-4xl
              font-black
              leading-tight
            "
          >
            “This platform feels like a
            real AI interview product
            from a funded startup.”
          </h3>

          <p
            className="
              mt-6
              text-lg
              text-gray-300
            "
          >
            Practice smarter, improve
            faster, and become interview
            ready with immersive AI
            simulations.
          </p>
        </motion.div>
      </section>

      {/* FOOTER */}

      <footer
        className="
          relative
          z-10
          border-t
          border-white/10
          px-6
          py-8
          text-center
          text-sm
          text-gray-500
        "
      >
        InterviewAI © 2026 • Startup
        Grade AI Interview Platform
      </footer>
    </div>
  );
}

export default LandingPage;