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
  Sparkles,
} from "lucide-react";

export default function AddEditQuestionModal({
  open,
  onClose,
  onSave,
  initial = null,
}) {
  const [title, setTitle] =
    useState("");

  const [category, setCategory] =
    useState(
      "frontend"
    );

  const [role, setRole] =
    useState(
      "frontend"
    );

  const [
    difficulty,
    setDifficulty,
  ] = useState("easy");

  const [answer, setAnswer] =
    useState("");

  useEffect(() => {
    if (initial) {
      setTitle(
        initial?.title || ""
      );

      setCategory(
        initial?.category ||
          "frontend"
      );

      setRole(
        initial?.role ||
          "frontend"
      );

      setDifficulty(
        initial?.difficulty ||
          "easy"
      );

      setAnswer(
        initial?.answer || ""
      );
    }
  }, [initial]);

  const handleSubmit = (
    e
  ) => {
    e.preventDefault();

    onSave({
      title,
      category,
      role,
      difficulty,
      answer,
    });
  };

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
            items-center
            justify-center
            bg-black/70
            backdrop-blur-sm
            p-5
          "
        >
          <motion.form
            initial={{
              opacity: 0,
              scale: 0.9,
              y: 20,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.9,
            }}
            onSubmit={
              handleSubmit
            }
            className="
              w-full
              max-w-2xl
              rounded-3xl
              border
              border-white/10
              bg-[#0f172a]
              p-8
              shadow-2xl
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
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-2xl
                    bg-gradient-to-br
                    from-cyan-400
                    to-blue-600
                  "
                >
                  <Sparkles
                    className="
                      text-white
                    "
                  />
                </div>

                <div>
                  <h3
                    className="
                      text-2xl
                      font-bold
                      text-white
                    "
                  >
                    {initial
                      ? "Edit Question"
                      : "Add Question"}
                  </h3>

                  <p
                    className="
                      text-sm
                      text-gray-400
                    "
                  >
                    Manage interview questions
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={
                  onClose
                }
                className="
                  rounded-xl
                  p-2
                  text-gray-400
                  transition

                  hover:bg-white/5
                  hover:text-white
                "
              >
                <X />
              </button>
            </div>

            <div
              className="
                grid
                gap-5
              "
            >
              <input
                value={title}
                onChange={(e) =>
                  setTitle(
                    e.target.value
                  )
                }
                required
                placeholder="Question Title"
                className="
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/5
                  px-5
                  py-4
                  text-white
                  outline-none

                  focus:border-cyan-400
                "
              />

              <div
                className="
                  grid
                  gap-4
                  md:grid-cols-3
                "
              >
                <select
                  value={
                    category
                  }
                  onChange={(e) =>
                    setCategory(
                      e.target.value
                    )
                  }
                  className="
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/5
                    px-4
                    py-4
                    text-white
                  "
                >
                  <option>
                    frontend
                  </option>

                  <option>
                    backend
                  </option>

                  <option>
                    ai
                  </option>

                  <option>
                    java
                  </option>

                  <option>
                    python
                  </option>
                </select>

                <select
                  value={role}
                  onChange={(e) =>
                    setRole(
                      e.target.value
                    )
                  }
                  className="
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/5
                    px-4
                    py-4
                    text-white
                  "
                >
                  <option>
                    frontend
                  </option>

                  <option>
                    backend
                  </option>

                  <option>
                    ai
                  </option>

                  <option>
                    java
                  </option>

                  <option>
                    python
                  </option>
                </select>

                <select
                  value={
                    difficulty
                  }
                  onChange={(e) =>
                    setDifficulty(
                      e.target.value
                    )
                  }
                  className="
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/5
                    px-4
                    py-4
                    text-white
                  "
                >
                  <option value="easy">
                    easy
                  </option>

                  <option value="medium">
                    medium
                  </option>

                  <option value="hard">
                    hard
                  </option>
                </select>
              </div>

              <textarea
                value={answer}
                onChange={(e) =>
                  setAnswer(
                    e.target.value
                  )
                }
                placeholder="Expected Answer"
                className="
                  h-40
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/5
                  px-5
                  py-4
                  text-white
                  outline-none

                  focus:border-cyan-400
                "
              />

              <div
                className="
                  mt-3
                  flex
                  justify-end
                  gap-3
                "
              >
                <button
                  type="button"
                  onClick={
                    onClose
                  }
                  className="
                    rounded-2xl
                    border
                    border-white/10
                    px-6
                    py-3
                    text-gray-300
                    transition

                    hover:bg-white/5
                  "
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="
                    rounded-2xl
                    bg-gradient-to-r
                    from-cyan-500
                    to-blue-600
                    px-6
                    py-3
                    font-semibold
                    text-white
                    shadow-lg
                    shadow-cyan-500/20
                    transition

                    hover:scale-[1.02]
                  "
                >
                  Save Question
                </button>
              </div>
            </div>
          </motion.form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}