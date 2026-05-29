import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import toast from "react-hot-toast";

import {
  Brain,
  Search,
  Sparkles,
  Trash2,
  Plus,
  Filter,
  FileQuestion,
  Loader2,
} from "lucide-react";

import axiosInstance from "../api/axiosInstance";

import AnimatedBackground from "../components/AnimatedBackground";

function QuestionsPage() {
  const [questions, setQuestions] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [submitting, setSubmitting] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const [title, setTitle] =
    useState("");

  const [category, setCategory] =
    useState("frontend");

  const [difficulty, setDifficulty] =
    useState("easy");

  const [answer, setAnswer] =
    useState("");

  // ========================================
  // FETCH QUESTIONS
  // ========================================

  const fetchQuestions =
    async () => {
      try {
        const response =
          await axiosInstance.get(
            "/api/questions"
          );

        setQuestions(
          Array.isArray(
            response.data
          )
            ? response.data
            : []
        );
      } catch (error) {
        console.error(error);

        toast.error(
          "Failed to load questions"
        );
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    void fetchQuestions();
  }, []);

  // ========================================
  // ADD QUESTION
  // ========================================

  const addQuestion =
    async () => {
      // VALIDATION

      if (!title.trim()) {
        toast.error(
          "Question title is required"
        );

        return;
      }

      if (!answer.trim()) {
        toast.error(
          "Answer is required"
        );

        return;
      }

      try {
        setSubmitting(true);

        const response =
          await axiosInstance.post(
            "/api/questions",
            {
              title,
              category,
              difficulty,
              answer,
            }
          );

        setQuestions((prev) => [
          response.data,
          ...prev,
        ]);

        toast.success(
          "Question added successfully"
        );

        // RESET

        setTitle("");

        setCategory(
          "frontend"
        );

        setDifficulty(
          "easy"
        );

        setAnswer("");
      } catch (error) {
        console.error(error);

        toast.error(
          "Failed to add question"
        );
      } finally {
        setSubmitting(false);
      }
    };

  // ========================================
  // DELETE QUESTION
  // ========================================

  const deleteQuestion =
    async (id) => {
      const confirmed =
        window.confirm(
          "Delete this question?"
        );

      if (!confirmed) return;

      try {
        await axiosInstance.delete(
          `/api/questions/${id}`
        );

        setQuestions((prev) =>
          prev.filter(
            (item) =>
              item.id !== id
          )
        );

        toast.success(
          "Question deleted"
        );
      } catch (error) {
        console.error(error);

        toast.error(
          "Delete failed"
        );
      }
    };

  // ========================================
  // FILTERED QUESTIONS
  // ========================================

  const filteredQuestions =
    useMemo(() => {
      return questions.filter(
        (question) =>
          question.title
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            )
      );
    }, [questions, search]);

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

      {/* HERO */}

      <div
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
            size={15}
          />

          AI Question Management
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
          Questions
          <span
            className="
              bg-gradient-to-r
              from-cyan-400
              to-blue-500
              bg-clip-text
              text-transparent
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
          Manage AI interview
          questions with startup-grade
          admin tools and premium UX.
        </p>
      </div>

      {/* TOP GRID */}

      <div
        className="
          relative
          z-10
          grid
          gap-8
          xl:grid-cols-3
        "
      >
        {/* ADD QUESTION */}

        <div
          className="
            rounded-3xl
            border
            border-white/10
            bg-white/5
            p-8
            backdrop-blur-2xl
            xl:col-span-1
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
                bg-cyan-500/10
                text-cyan-400
              "
            >
              <Plus size={30} />
            </div>

            <div>
              <h2
                className="
                  text-2xl
                  font-bold
                "
              >
                Add Question
              </h2>

              <p
                className="
                  text-sm
                  text-gray-400
                "
              >
                Create interview content
              </p>
            </div>
          </div>

          <div
            className="
              space-y-5
            "
          >
            {/* TITLE */}

            <input
              type="text"
              placeholder="Question title"
              value={title}
              onChange={(e) =>
                setTitle(
                  e.target.value
                )
              }
              className="
                w-full
                rounded-2xl
                border
                border-white/10
                bg-[#111827]
                px-5
                py-4
                outline-none
                transition-all

                focus:border-cyan-400
              "
            />

            {/* CATEGORY */}

            <select
              value={category}
              onChange={(e) =>
                setCategory(
                  e.target.value
                )
              }
              className="
                w-full
                rounded-2xl
                border
                border-white/10
                bg-[#111827]
                px-5
                py-4
                outline-none
              "
            >
              <option value="frontend">
                Frontend
              </option>

              <option value="backend">
                Backend
              </option>

              <option value="java">
                Java
              </option>

              <option value="os">
                OS
              </option>
            </select>

            {/* DIFFICULTY */}

            <select
              value={difficulty}
              onChange={(e) =>
                setDifficulty(
                  e.target.value
                )
              }
              className="
                w-full
                rounded-2xl
                border
                border-white/10
                bg-[#111827]
                px-5
                py-4
                outline-none
              "
            >
              <option value="easy">
                Easy
              </option>

              <option value="medium">
                Medium
              </option>

              <option value="hard">
                Hard
              </option>
            </select>

            {/* ANSWER */}

            <textarea
              placeholder="Expected answer"
              value={answer}
              onChange={(e) =>
                setAnswer(
                  e.target.value
                )
              }
              className="
                h-44
                w-full
                rounded-2xl
                border
                border-white/10
                bg-[#111827]
                px-5
                py-4
                outline-none
                transition-all

                focus:border-cyan-400
              "
            />

            {/* BUTTON */}

            <motion.button
              whileHover={{
                scale: 1.02,
              }}
              whileTap={{
                scale: 0.98,
              }}
              onClick={addQuestion}
              disabled={submitting}
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
                font-semibold
                shadow-lg
                shadow-cyan-500/20
              "
            >
              {submitting ? (
                <>
                  <Loader2
                    className="
                      animate-spin
                    "
                    size={20}
                  />

                  Adding...
                </>
              ) : (
                <>
                  Add Question

                  <Plus
                    size={20}
                  />
                </>
              )}
            </motion.button>
          </div>
        </div>

        {/* QUESTION LIST */}

        <div
          className="
            rounded-3xl
            border
            border-white/10
            bg-white/5
            p-8
            backdrop-blur-2xl
            xl:col-span-2
          "
        >
          {/* HEADER */}

          <div
            className="
              mb-8
              flex
              flex-col
              gap-5
              lg:flex-row
              lg:items-center
              lg:justify-between
            "
          >
            <div>
              <h2
                className="
                  text-3xl
                  font-bold
                "
              >
                Question Library
              </h2>

              <p
                className="
                  mt-2
                  text-gray-400
                "
              >
                Manage all interview
                questions
              </p>
            </div>

            {/* SEARCH */}

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
                lg:w-[340px]
              "
            >
              <Search
                size={20}
                className="
                  text-cyan-400
                "
              />

              <input
                type="text"
                placeholder="Search questions..."
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
                className="
                  w-full
                  bg-transparent
                  outline-none
                  placeholder:text-gray-500
                "
              />
            </div>
          </div>

          {/* EMPTY STATE */}

          {filteredQuestions.length ===
          0 ? (
            <div
              className="
                rounded-3xl
                border
                border-dashed
                border-white/10
                py-20
                text-center
              "
            >
              <FileQuestion
                className="
                  mx-auto
                  mb-5
                  text-cyan-400
                "
                size={60}
              />

              <h3
                className="
                  text-3xl
                  font-bold
                "
              >
                No Questions Found
              </h3>

              <p
                className="
                  mt-3
                  text-gray-400
                "
              >
                Try searching or add a
                new interview question.
              </p>
            </div>
          ) : (
            <div
              className="
                grid
                gap-5
              "
            >
              <AnimatePresence>
                {filteredQuestions.map(
                  (question) => (
                    <motion.div
                      key={
                        question.id
                      }
                      layout
                      initial={{
                        opacity: 0,
                        y: 15,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      exit={{
                        opacity: 0,
                        y: -10,
                      }}
                      whileHover={{
                        y: -4,
                      }}
                      className="
                        rounded-3xl
                        border
                        border-white/10
                        bg-[#111827]
                        p-7
                        transition-all

                        hover:border-cyan-500/30
                      "
                    >
                      <div
                        className="
                          flex
                          flex-col
                          gap-6
                          lg:flex-row
                          lg:items-start
                          lg:justify-between
                        "
                      >
                        <div>
                          <div
                            className="
                              mb-5
                              flex
                              flex-wrap
                              gap-3
                            "
                          >
                            <Badge
                              text={
                                question.category
                              }
                            />

                            <Badge
                              text={
                                question.difficulty
                              }
                            />
                          </div>

                          <h3
                            className="
                              text-2xl
                              font-bold
                              leading-relaxed
                            "
                          >
                            {
                              question.title
                            }
                          </h3>

                          <p
                            className="
                              mt-5
                              max-w-3xl
                              leading-relaxed
                              text-gray-400
                            "
                          >
                            {
                              question.answer
                            }
                          </p>
                        </div>

                        {/* DELETE */}

                        <motion.button
                          whileHover={{
                            scale: 1.05,
                          }}
                          whileTap={{
                            scale: 0.95,
                          }}
                          onClick={() =>
                            deleteQuestion(
                              question.id
                            )
                          }
                          className="
                            flex
                            items-center
                            gap-2
                            rounded-2xl
                            border
                            border-red-500/20
                            bg-red-500/10
                            px-5
                            py-3
                            text-red-400
                            transition-all

                            hover:bg-red-500
                            hover:text-white
                          "
                        >
                          <Trash2
                            size={18}
                          />

                          Delete
                        </motion.button>
                      </div>
                    </motion.div>
                  )
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </div>
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
        inline-flex
        items-center
        gap-2
        rounded-full
        bg-cyan-500/10
        px-4
        py-2
        text-sm
        text-cyan-300
      "
    >
      <Filter size={14} />

      {text}
    </div>
  );
}

export default QuestionsPage;