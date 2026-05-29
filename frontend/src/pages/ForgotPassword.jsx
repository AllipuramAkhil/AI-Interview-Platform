import {
  motion,
} from "framer-motion";

import {
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import toast from "react-hot-toast";

import {
  Mail,
  ArrowRight,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import {
  forgotPassword,
} from "../api/authApi";

import AnimatedBackground from "../components/AnimatedBackground";

function ForgotPassword() {
  const navigate =
    useNavigate();

  const [email, setEmail] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleForgotPassword =
    async () => {
      // ========================================
      // VALIDATION
      // ========================================

      if (!email.trim()) {
        toast.error(
          "Email is required"
        );

        return;
      }

      const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (
        !emailRegex.test(email)
      ) {
        toast.error(
          "Enter a valid email"
        );

        return;
      }

      try {
        setLoading(true);

        const response =
          await forgotPassword({
            email,
          });

        // SAVE EMAIL

        localStorage.setItem(
          "resetEmail",
          email
        );

        toast.success(
          response.message ||
            "OTP sent successfully"
        );

        setTimeout(() => {
          navigate(
            "/reset-password"
          );
        }, 1200);
      } catch (error) {
        console.error(
          error
        );

        toast.error(
          error.response?.data
            ?.message ||
            error.response
              ?.data ||
            "Failed to send OTP"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div
      className="
        relative
        flex
        min-h-screen
        items-center
        justify-center
        overflow-hidden
        bg-[#030712]
        px-6
        py-10
      "
    >
      <AnimatedBackground />

      {/* Glow */}

      <div
        className="
          absolute
          top-0
          left-1/2
          h-[500px]
          w-[500px]
          -translate-x-1/2
          rounded-full
          bg-cyan-500/10
          blur-3xl
        "
      />

      {/* Card */}

      <motion.div
        initial={{
          opacity: 0,
          y: 50,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.7,
        }}
        className="
          relative
          z-10
          w-full
          max-w-md
          rounded-[32px]
          border
          border-white/10
          bg-white/5
          p-10
          backdrop-blur-2xl
        "
      >
        {/* Top Badge */}

        <div
          className="
            mx-auto
            mb-6
            flex
            h-20
            w-20
            items-center
            justify-center
            rounded-[28px]
            bg-gradient-to-br
            from-cyan-400
            to-blue-600
            shadow-lg
            shadow-cyan-500/20
          "
        >
          <ShieldCheck
            size={38}
            className="
              text-white
            "
          />
        </div>

        {/* Heading */}

        <div
          className="
            text-center
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
              size={15}
            />

            Secure Password Recovery
          </div>

          <h1
            className="
              mt-6
              text-5xl
              font-black
              tracking-tight
              text-white
            "
          >
            Forgot
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
              Password
            </span>
          </h1>

          <p
            className="
              mt-4
              text-gray-400
            "
          >
            Enter your registered email
            to receive OTP verification.
          </p>
        </div>

        {/* Form */}

        <div
          className="
            mt-10
            space-y-6
          "
        >
          {/* Email */}

          <div>
            <label
              className="
                mb-3
                block
                text-sm
                font-medium
                text-gray-300
              "
            >
              Email Address
            </label>

            <div
              className="
                flex
                items-center
                gap-3
                rounded-2xl
                border
                border-white/10
                bg-[#111827]
                px-4
                py-4
                transition-all

                focus-within:border-cyan-400
                focus-within:ring-2
                focus-within:ring-cyan-500/20
              "
            >
              <Mail
                size={20}
                className="
                  text-cyan-400
                "
              />

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }
                className="
                  w-full
                  bg-transparent
                  text-white
                  outline-none
                  placeholder:text-gray-500
                "
              />
            </div>
          </div>

          {/* Submit Button */}

          <motion.button
            whileHover={{
              scale: 1.02,
            }}
            whileTap={{
              scale: 0.98,
            }}
            onClick={
              handleForgotPassword
            }
            disabled={loading}
            className="
              flex
              w-full
              items-center
              justify-center
              gap-3
              rounded-2xl
              bg-gradient-to-r
              from-cyan-500
              to-blue-600
              px-6
              py-4
              text-lg
              font-semibold
              text-white
              shadow-lg
              shadow-cyan-500/20
              transition-all

              disabled:cursor-not-allowed
              disabled:opacity-70
            "
          >
            {loading ? (
              <>
                <div
                  className="
                    h-5
                    w-5
                    animate-spin
                    rounded-full
                    border-2
                    border-white
                    border-t-transparent
                  "
                />

                Sending OTP...
              </>
            ) : (
              <>
                Send OTP

                <ArrowRight
                  size={20}
                />
              </>
            )}
          </motion.button>
        </div>

        {/* Bottom */}

        <p
          className="
            mt-8
            text-center
            text-sm
            text-gray-500
          "
        >
          AI Interview Platform ©
          2026
        </p>
      </motion.div>
    </div>
  );
}

export default ForgotPassword;