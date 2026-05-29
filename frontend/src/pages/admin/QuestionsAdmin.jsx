import { useEffect, useMemo, useState, useCallback } from "react";
import { getAllQuestions, createQuestion, updateQuestion, deleteQuestion } from "../../api/adminApi";
import AddEditQuestionModal from "../../components/AddEditQuestionModal";

export default function QuestionsAdmin() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [debounceTimer, setDebounceTimer] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const fetchQuestions = useCallback(async (opts = {}) => {
    setLoading(true);
    try {
      const params = {
        page: opts.page ?? page,
        pageSize,
        search: opts.search ?? search,
        category: opts.category ?? category,
        role: opts.role ?? roleFilter,
      };
      
      try {
        const res = await getAllQuestions(params);
        // support both paginated {items,total} and plain array
        if (Array.isArray(res)) {
          setQuestions(res);
          setTotal(res.length);
        } else {
          setQuestions(res.items || []);
          setTotal(res.total || (res.items || []).length);
        }
      } catch (apiError) {
        console.error("API Error:", apiError);
        
        // Fallback for API issues
        if (apiError?.response?.status === 404 || apiError?.response?.status === 500) {
          console.warn("Using empty questions as API fallback");
          setQuestions([]);
          setTotal(0);
          alert("Note: Could not fetch questions from server. Please check your backend connection.");
        } else {
          throw apiError;
        }
      }
    } catch (e) {
      console.error("Failed to load questions:", e);
      alert(`Failed to load questions: ${e?.response?.data?.message || e?.message || "Unknown error"}`);
      setQuestions([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, [page, pageSize, search, category, roleFilter]);

  useEffect(() => {
    const load = async () => {
      await fetchQuestions({ page });
    };
    void load();
  }, [fetchQuestions, page]);

  const handleSearchChange = (v) => {
    setSearch(v);
    setPage(1);
    if (debounceTimer) clearTimeout(debounceTimer);
    const t = setTimeout(() => fetchQuestions({ page: 1, search: v }), 450);
    setDebounceTimer(t);
  };

  const handleCategoryChange = (v) => {
    setCategory(v);
    setPage(1);
    void fetchQuestions({ page: 1, category: v, role: roleFilter });
  };

  const handleRoleChange = (v) => {
    setRoleFilter(v);
    setPage(1);
    void fetchQuestions({ page: 1, role: v, category });
  };

  const openAdd = () => { setEditing(null); setModalOpen(true); };
  const openEdit = (q) => { setEditing(q); setModalOpen(true); };

  const handleSave = async (payload) => {
    try {
      if (editing && editing.id) {
        await updateQuestion(editing.id, payload);
        alert("Question updated");
      } else {
        await createQuestion(payload);
        alert("Question created");
      }
      setModalOpen(false);
      void fetchQuestions({ page: 1 });
    } catch (e) {
      console.error(e);
      alert("Failed to save question");
    }
  };

  const handleDelete = async (q) => {
    if (!confirm("Delete this question?")) return;
    try {
      await deleteQuestion(q.id);
      alert("Deleted");
      void fetchQuestions({ page });
    } catch (e) { console.error(e); alert("Failed to delete"); }
  };

  const totalPages = useMemo(() => Math.max(1, Math.ceil(total / pageSize)), [total, pageSize]);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Question Bank</h1>
        <div>
          <button onClick={openAdd} className="px-4 py-2 bg-cyan-500 text-black rounded">Add Question</button>
        </div>
      </div>

      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center">
        <input placeholder="Search..." value={search} onChange={(e) => handleSearchChange(e.target.value)} className="p-2 rounded bg-slate-700 flex-1" />
        <select value={category} onChange={(e) => handleCategoryChange(e.target.value)} className="p-2 rounded bg-slate-700">
          <option value="">All categories</option>
          <option value="frontend">frontend</option>
          <option value="backend">backend</option>
          <option value="ai">ai</option>
          <option value="java">java</option>
          <option value="python">python</option>
        </select>
        <select value={roleFilter} onChange={(e) => handleRoleChange(e.target.value)} className="p-2 rounded bg-slate-700">
          <option value="">All roles</option>
          <option value="frontend">frontend</option>
          <option value="backend">backend</option>
          <option value="ai">ai</option>
          <option value="java">java</option>
          <option value="python">python</option>
        </select>
      </div>

      <div className="bg-slate-800 rounded overflow-auto">
        <table className="min-w-full divide-y divide-slate-700">
          <thead className="bg-slate-900">
            <tr>
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2 text-left">Category</th>
              <th className="px-4 py-2 text-left">Role</th>
              <th className="px-4 py-2 text-left">Difficulty</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} className="p-4">Loading...</td></tr>
            ) : questions.length === 0 ? (
              <tr><td colSpan={5} className="p-4">No questions found.</td></tr>
            ) : (
              questions.map((q) => (
                <tr key={q.id} className="border-t border-slate-700">
                  <td className="px-4 py-3">{q.title}</td>
                  <td className="px-4 py-3">{q.category}</td>
                  <td className="px-4 py-3">{q.role ?? q.category}</td>
                  <td className="px-4 py-3">{q.difficulty}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button onClick={() => openEdit(q)} className="px-3 py-1 bg-yellow-500 text-black rounded">Edit</button>
                      <button onClick={() => handleDelete(q)} className="px-3 py-1 bg-red-600 rounded">Delete</button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-slate-400">{total} items</div>
        <div className="flex gap-2">
          <button disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))} className="px-3 py-1 bg-slate-700 rounded">Prev</button>
          <div className="px-3 py-1 bg-slate-800 rounded">{page} / {totalPages}</div>
          <button disabled={page >= totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))} className="px-3 py-1 bg-slate-700 rounded">Next</button>
        </div>
      </div>

      {modalOpen && (
        <AddEditQuestionModal key={editing?.id ?? "new"} open={modalOpen} onClose={() => setModalOpen(false)} onSave={handleSave} initial={editing} />
      )}
    </div>
  );
}
