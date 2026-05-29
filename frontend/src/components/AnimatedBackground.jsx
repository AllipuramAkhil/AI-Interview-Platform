import {
  motion,
} from "framer-motion";

export default function AnimatedBackground() {
  return (
    <div
      className="
        pointer-events-none
        absolute
        inset-0
        overflow-hidden
      "
    >
      {/* Main Glow */}

      <div
        className="
          absolute
          -left-40
          top-10
          h-[420px]
          w-[420px]
          rounded-full
          bg-cyan-500/20
          blur-3xl
        "
      />

      <div
        className="
          absolute
          right-0
          top-20
          h-[380px]
          w-[380px]
          rounded-full
          bg-blue-600/10
          blur-3xl
        "
      />

      {/* Floating Orb */}

      <motion.div
        animate={{
          y: [
            0,
            -30,
            0,
          ],
        }}
        transition={{
          duration: 7,
          repeat:
            Infinity,
          ease:
            "easeInOut",
        }}
        className="
          absolute
          left-1/3
          top-1/4
          h-56
          w-56
          rounded-full
          bg-cyan-400/10
          blur-3xl
        "
      />

      {/* Rotating Ring */}

      <motion.div
        animate={{
          rotate: [
            0,
            360,
          ],
        }}
        transition={{
          duration: 25,
          repeat:
            Infinity,
          ease:
            "linear",
        }}
        className="
          absolute
          right-10
          top-1/3
          h-72
          w-72
          rounded-full
          border
          border-cyan-400/10
          shadow-[0_0_120px_rgba(34,211,238,0.12)]
        "
      />

      {/* Bottom Blur */}

      <motion.div
        animate={{
          x: [
            -20,
            20,
            -20,
          ],
        }}
        transition={{
          duration: 9,
          repeat:
            Infinity,
          ease:
            "easeInOut",
        }}
        className="
          absolute
          bottom-10
          left-20
          h-60
          w-60
          rounded-full
          bg-violet-500/10
          blur-3xl
        "
      />

      {/* Grid Overlay */}

      <div
        className="
          absolute
          inset-0
          bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)]
          bg-[size:60px_60px]
        "
      />
    </div>
  );
}