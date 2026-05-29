import {
  motion,
} from "framer-motion";

import {
  useState,
} from "react";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import toast from "react-hot-toast";

import {
  ShieldCheck,
  KeyRound,
  ArrowRight,
  Sparkles,
  RefreshCcw,
  CheckCircle2,
} from "lucide-react";

import {
  verifyOtp,
  resendOtp,
} from "../api/authApi";

import AnimatedBackground from "../components/AnimatedBackground";

function VerifyOtp() {
  const navigate =
    useNavigate();

  const email =
    localStorage.getItem(
      "verifyEmail"
    );

  const [otp, setOtp] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [
    resendLoading,
    setResendLoading,
  ] = useState(false);

  // ========================================
  // VERIFY OTP
  // ========================================

  const handleVerifyOtp =
    async (e) => {
      e.preventDefault();

      if (!otp.trim()) {
        toast.error(
          "OTP is required"
        );

        return;
      }

      try {
        setLoading(true);

        const response =
          await verifyOtp({
            email,
            otp,
          });

        toast.success(
          response.message ||
            "OTP verified successfully"
        );

        // CLEANUP

        localStorage.removeItem(
          "verifyEmail"
        );

        setTimeout(() => {
          navigate(
            "/login"
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
            "OTP verification failed"
        );
      } finally {
        setLoading(false);
      }
    };

  // ========================================
  // RESEND OTP
  // ========================================

  const handleResendOtp =
    async () => {
      try {
        setResendLoading(
          true
        );

        const response =
          await resendOtp({
            email,
          });

        toast.success(
          response.message ||
            "OTP resent successfully"
        );
      } catch (error) {
        console.error(
          error
        );

        toast.error(
          error.response?.data
            ?.message ||
            error.response
              ?.data ||
            "Failed to resend OTP"
        );
      } finally {
        setResendLoading(
          false
        );
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
          h-[500px]
          w-[500px]
          -translate-x-1/2
          rounded-full
          bg-cyan-500/10
          blur-3xl
        "
      />

      {/* CARD */}

      <motion.div
        initial={{
          opacity: 0,
          y: 40,
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
          rounded-[36px]
          border
          border-white/10
          bg-white/5
          p-10
          backdrop-blur-2xl
        "
      >
        {/* TOP ICON */}

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

        {/* HEADER */}

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

            Secure Email Verification
          </div>

          <h1
            className="
              mt-6
              text-5xl
              font-black
              tracking-tight
            "
          >
            Verify
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
              OTP
            </span>
          </h1>

          <p
            className="
              mt-4
              text-gray-400
            "
          >
            Enter the verification OTP
            sent to your email address.
          </p>
        </div>

        {/* EMAIL DISPLAY */}

        <div
          className="
            mt-8
            rounded-2xl
            border
            border-cyan-500/20
            bg-cyan-500/10
            p-5
            text-center
          "
        >
          <p
            className="
              text-sm
              text-gray-300
            "
          >
            Verification Email
          </p>

          <h3
            className="
              mt-2
              break-all
              text-lg
              font-semibold
              text-cyan-300
            "
          >
            {email ||
              "No Email Found"}
          </h3>
        </div>

        {/* FORM */}

        <form
          onSubmit={
            handleVerifyOtp
          }
          className="
            mt-8
            space-y-6
          "
        >
          {/* OTP */}

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
              Verification OTP
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
                px-5
                py-4
                transition-all

                focus-within:border-cyan-400
                focus-within:ring-2
                focus-within:ring-cyan-500/20
              "
            >
              <KeyRound
                size={20}
                className="
                  text-cyan-400
                "
              />

              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) =>
                  setOtp(
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

          {/* SECURITY */}

          <div
            className="
              rounded-2xl
              border
              border-white/10
              bg-[#111827]
              p-5
            "
          >
            <div
              className="
                flex
                items-start
                gap-3
              "
            >
              <CheckCircle2
                size={20}
                className="
                  mt-0.5
                  text-cyan-400
                "
              />

              <div>
                <h4
                  className="
                    font-semibold
                  "
                >
                  Secure Verification
                </h4>

                <p
                  className="
                    mt-1
                    text-sm
                    text-gray-400
                  "
                >
                  OTP verification helps
                  protect your account and
                  ensures secure platform
                  access.
                </p>
              </div>
            </div>
          </div>

          {/* VERIFY BUTTON */}

          <motion.button
            whileHover={{
              scale: 1.02,
            }}
            whileTap={{
              scale: 0.98,
            }}
            type="submit"
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

                Verifying...
              </>
            ) : (
              <>
                Verify OTP

                <ArrowRight
                  size={20}
                />
              </>
            )}
          </motion.button>
        </form>

        {/* RESEND */}

        <div
          className="
            mt-8
            text-center
          "
        >
          <button
            onClick={
              handleResendOtp
            }
            disabled={
              resendLoading
            }
            className="
              inline-flex
              items-center
              gap-2
              text-sm
              font-medium
              text-cyan-400
              transition

              hover:text-cyan-300
            "
          >
            {resendLoading ? (
              <>
                <div
                  className="
                    h-4
                    w-4
                    animate-spin
                    rounded-full
                    border-2
                    border-cyan-400
                    border-t-transparent
                  "
                />

                Resending...
              </>
            ) : (
              <>
                <RefreshCcw
                  size={16}
                />

                Resend OTP
              </>
            )}
          </button>
        </div>

        {/* LOGIN */}

        <p
          className="
            mt-8
            text-center
            text-sm
            text-gray-400
          "
        >
          Already verified?{" "}

          <Link
            to="/login"
            className="
              font-medium
              text-cyan-400
              transition

              hover:text-cyan-300
            "
          >
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

export default VerifyOtp;