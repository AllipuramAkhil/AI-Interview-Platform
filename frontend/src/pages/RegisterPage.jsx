import {
  useState,
} from "react";

import {
  motion,
} from "framer-motion";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import toast from "react-hot-toast";

import {
  Brain,
  Lock,
  Mail,
  User,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Eye,
  EyeOff,
  CheckCircle2,
} from "lucide-react";

import {
  registerUser,
} from "../api/authApi";

import AnimatedBackground from "../components/AnimatedBackground";

function RegistrationPage() {
  const navigate =
    useNavigate();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const [role, setRole] = useState("USER");

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
  // REGISTER
  // ========================================

  const handleRegister =
    async (e) => {
      e.preventDefault();

      // VALIDATION

      if (!name.trim()) {
        toast.error(
          "Name is required"
        );

        return;
      }

      if (!email.trim()) {
        toast.error(
          "Email is required"
        );

        return;
      }

      if (!password.trim()) {
        toast.error(
          "Password is required"
        );

        return;
      }

      if (
        password.length < 6
      ) {
        toast.error(
          "Password must be at least 6 characters"
        );

        return;
      }

      if (
        password !==
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
          await registerUser({
            name,
            email,
            password,
            role,
          });

        toast.success(
          response.message ||
            "Registration successful"
        );

        // SAVE EMAIL FOR OTP

        localStorage.setItem(
          "verifyEmail",
          email
        );

        setTimeout(() => {
          navigate(
            "/verify-otp"
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
            "Registration failed"
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
        overflow-hidden
        bg-[#030712]
        text-white
      "
    >
      <AnimatedBackground />

      {/* LEFT SECTION */}

      <div
        className="
          relative
          hidden
          flex-1
          overflow-hidden
          lg:flex
        "
      >
        {/* Glow */}

        <div
          className="
            absolute
            right-0
            top-10
            h-[500px]
            w-[500px]
            rounded-full
            bg-cyan-500/10
            blur-3xl
          "
        />

        <div
          className="
            relative
            z-10
            flex
            w-full
            flex-col
            justify-between
            p-14
          "
        >
          {/* Logo */}

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
                shadow-lg
                shadow-cyan-500/20
              "
            >
              <Brain
                size={34}
              />
            </div>

            <div>
              <h1
                className="
                  text-3xl
                  font-black
                  tracking-tight
                "
              >
                InterviewAI
              </h1>

              <p
                className="
                  text-sm
                  text-gray-400
                "
              >
                AI Powered Interview
                Platform
              </p>
            </div>
          </div>

          {/* HERO */}

          <div
            className="
              max-w-xl
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
                px-5
                py-2
                text-sm
                text-cyan-300
              "
            >
              <Sparkles
                size={16}
              />

              Join the Future of AI Interviews
            </div>

            <h2
              className="
                mt-8
                text-6xl
                font-black
                leading-tight
                tracking-tight
              "
            >
              Build Your
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
                Interview Confidence
              </span>
            </h2>

            <p
              className="
                mt-6
                text-lg
                leading-relaxed
                text-gray-400
              "
            >
              Practice technical
              interviews with AI driven
              evaluation, analytics,
              coding rounds, and startup
              grade interview simulation.
            </p>

            {/* Features */}

            <div
              className="
                mt-10
                space-y-5
              "
            >
              <FeatureItem text="AI Based Evaluation System" />

              <FeatureItem text="Live Coding + Voice Recognition" />

              <FeatureItem text="Detailed Analytics Dashboard" />

              <FeatureItem text="Professional Interview Experience" />
            </div>
          </div>

          {/* Bottom */}

          <div
            className="
              flex
              items-center
              gap-3
              text-sm
              text-gray-500
            "
          >
            <ShieldCheck
              size={16}
            />

            Startup Grade Security &
            Authentication
          </div>
        </div>
      </div>

      {/* RIGHT SECTION */}

      <div
        className="
          relative
          z-10
          flex
          w-full
          items-center
          justify-center
          px-6
          py-10
          lg:max-w-xl
        "
      >
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
            duration: 0.7,
          }}
          className="
            w-full
            rounded-[36px]
            border
            border-white/10
            bg-white/5
            p-10
            backdrop-blur-2xl
          "
        >
          {/* MOBILE LOGO */}

          <div
            className="
              mb-8
              flex
              items-center
              gap-4
              lg:hidden
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
              "
            >
              <Brain
                size={28}
              />
            </div>

            <div>
              <h2
                className="
                  text-2xl
                  font-black
                "
              >
                InterviewAI
              </h2>

              <p
                className="
                  text-sm
                  text-gray-400
                "
              >
                AI Interview Platform
              </p>
            </div>
          </div>

          {/* Heading */}

          <div>
            <h1
              className="
                text-5xl
                font-black
                tracking-tight
              "
            >
              Create
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
                Account
              </span>
            </h1>

            <p
              className="
                mt-4
                text-gray-400
              "
            >
              Start your AI interview
              preparation journey.
            </p>
          </div>

          {/* FORM */}

          <form
            onSubmit={
              handleRegister
            }
            className="
              mt-10
              space-y-6
            "
          >
            {/* NAME */}

            <InputField
              label="Full Name"
              icon={User}
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) =>
                setName(
                  e.target.value
                )
              }
            />

            {/* EMAIL */}

            <InputField
              label="Email Address"
              icon={Mail}
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
            />

            {/* ROLE */}

            <SelectField
              label="Register as"
              value={role}
              onChange={(e) =>
                setRole(
                  e.target.value
                )
              }
              options={[
                { value: "USER", label: "User" },
                { value: "ADMIN", label: "Admin" },
              ]}
            />

            {/* PASSWORD */}

            <PasswordField
              label="Password"
              value={password}
              onChange={(e) =>
                setPassword(
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

            {/* PASSWORD RULES */}

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
                    Password should be
                    at least 6 characters
                    long for secure
                    authentication.
                  </p>
                </div>
              </div>
            </div>

            {/* SUBMIT */}

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

                  Creating Account...
                </>
              ) : (
                <>
                  Create Account

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
            Already have an account?{" "}

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

function SelectField({
  label,
  value,
  onChange,
  options,
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
          rounded-2xl
          border
          border-white/10
          bg-[#111827]
          px-5
          py-4
        "
      >
        <select
          value={value}
          onChange={onChange}
          className="
            w-full
            bg-transparent
            text-white
            outline-none
            placeholder:text-gray-500
          "
        >
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="bg-[#111827] text-white"
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

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

// ========================================
// FEATURE ITEM
// ========================================

function FeatureItem({
  text,
}) {
  return (
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
          h-10
          w-10
          items-center
          justify-center
          rounded-xl
          bg-cyan-500/10
          text-cyan-400
        "
      >
        <Sparkles
          size={18}
        />
      </div>

      <span
        className="
          text-gray-300
        "
      >
        {text}
      </span>
    </div>
  );
}

export default RegistrationPage;