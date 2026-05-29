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
  Lock,
  KeyRound,
  ArrowRight,
  Sparkles,
  Eye,
  EyeOff,
  CheckCircle2,
} from "lucide-react";

import {
  resetPassword,
} from "../api/authApi";

import AnimatedBackground from "../components/AnimatedBackground";

function ResetPassword() {
  const navigate =
    useNavigate();

  const email =
    localStorage.getItem(
      "resetEmail"
    );

  const [otp, setOtp] =
    useState("");

  const [
    newPassword,
    setNewPassword,
  ] = useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const [loading, setLoading] =
    useState(false);

  const [
    showPassword,
    setShowPassword,
  ] = useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  // ========================================
  // RESET PASSWORD
  // ========================================

  const handleResetPassword =
    async (e) => {
      e.preventDefault();

      // VALIDATION

      if (!otp.trim()) {
        toast.error(
          "OTP is required"
        );

        return;
      }

      if (
        !newPassword.trim()
      ) {
        toast.error(
          "Password is required"
        );

        return;
      }

      if (
        newPassword.length < 6
      ) {
        toast.error(
          "Password must be at least 6 characters"
        );

        return;
      }

      if (
        newPassword !==
        confirmPassword
      ) {
        toast.error(
          "Passwords do not match"
        );

        return;
      }

      try {
        setLoading(true);

        const response =
          await resetPassword({
            email,
            otp,
            newPassword,
          });

        toast.success(
          response.message ||
            "Password reset successful"
        );

        // REMOVE RESET EMAIL

        localStorage.removeItem(
          "resetEmail"
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
            "Reset failed"
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

            Secure Password Reset
          </div>

          <h1
            className="
              mt-6
              text-5xl
              font-black
              tracking-tight
            "
          >
            Reset
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
            Enter your OTP and create a
            new secure password.
          </p>
        </div>

        {/* FORM */}

        <form
          onSubmit={
            handleResetPassword
          }
          className="
            mt-10
            space-y-6
          "
        >
          {/* OTP */}

          <InputField
            label="OTP Verification"
            icon={KeyRound}
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) =>
              setOtp(
                e.target.value
              )
            }
          />

          {/* PASSWORD */}

          <PasswordField
            label="New Password"
            value={newPassword}
            onChange={(e) =>
              setNewPassword(
                e.target.value
              )
            }
            showPassword={
              showPassword
            }
            setShowPassword={
              setShowPassword
            }
          />

          {/* CONFIRM PASSWORD */}

          <PasswordField
            label="Confirm Password"
            value={
              confirmPassword
            }
            onChange={(e) =>
              setConfirmPassword(
                e.target.value
              )
            }
            showPassword={
              showConfirmPassword
            }
            setShowPassword={
              setShowConfirmPassword
            }
          />

          {/* RULES */}

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
                  Password Rules
                </h4>

                <p
                  className="
                    mt-1
                    text-sm
                    text-gray-400
                  "
                >
                  Use at least 6
                  characters with strong
                  password protection.
                </p>
              </div>
            </div>
          </div>

          {/* BUTTON */}

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

                Resetting...
              </>
            ) : (
              <>
                Reset Password

                <ArrowRight
                  size={20}
                />
              </>
            )}
          </motion.button>
        </form>

        {/* LOGIN */}

        <p
          className="
            mt-8
            text-center
            text-sm
            text-gray-400
          "
        >
          Back to{" "}

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

// ========================================
// INPUT FIELD
// ========================================

function InputField({
  label,
  icon: Icon,
  type,
  placeholder,
  value,
  onChange,
}) {
  return (
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
        {label}
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
        <Icon
          size={20}
          className="
            text-cyan-400
          "
        />

        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
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
  );
}

// ========================================
// PASSWORD FIELD
// ========================================

function PasswordField({
  label,
  value,
  onChange,
  showPassword,
  setShowPassword,
}) {
  return (
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
        {label}
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
        <Lock
          size={20}
          className="
            text-cyan-400
          "
        />

        <input
          type={
            showPassword
              ? "text"
              : "password"
          }
          placeholder="Enter password"
          value={value}
          onChange={onChange}
          className="
            w-full
            bg-transparent
            text-white
            outline-none
            placeholder:text-gray-500
          "
        />

        <button
          type="button"
          onClick={() =>
            setShowPassword(
              !showPassword
            )
          }
          className="
            text-gray-400
            transition

            hover:text-white
          "
        >
          {showPassword ? (
            <EyeOff
              size={20}
            />
          ) : (
            <Eye
              size={20}
            />
          )}
        </button>
      </div>
    </div>
  );
}

export default ResetPassword;