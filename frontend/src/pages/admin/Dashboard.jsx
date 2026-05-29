import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getAdminStats, getInterviewResults } from "../../api/adminApi";
import { retryPendingSaves } from "../../api/interviewApi";

function StatCard({ title, value }) {
  return (
    <motion.div whileHover={{ y: -4 }} className="bg-slate-800 p-4 rounded-lg shadow">
      <div className="text-sm text-slate-400">{title}</div>
      <div className="text-2xl font-bold mt-2">{value}</div>
    </motion.div>
  );
}

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [pendingCount, setPendingCount] = useState(0);
  const [retrying, setRetrying] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await getAdminStats();
        if (mounted) setStats(data);

        // If backend didn't compute average score or totals, derive them from interview results
        if (mounted && (!data || !data.averageScore)) {
          try {
            const interviewList = await getInterviewResults({ page: 1, pageSize: 1000 });
            const items = interviewList.items || interviewList || [];
            const totalInterviews = items.length;
            const averageScore = totalInterviews > 0 ? (items.reduce((acc, it) => acc + (Number(it.score) || 0), 0) / totalInterviews).toFixed(1) : 0;
            const totalQuestions = items.reduce((acc, it) => acc + (it.totalQuestions || 0), 0);

            if (mounted) {
              setStats((prev) => ({
                ...(prev || {}),
                totalInterviews: prev?.totalInterviews ?? totalInterviews,
                averageScore: prev?.averageScore ?? averageScore,
                totalQuestions: prev?.totalQuestions ?? totalQuestions,
              }));
            }
          } catch (e) {
            console.warn("Failed to compute fallback admin stats:", e);
          }
        }
      } catch (e) {
        console.error(e);
      }
    })();
    return () => { mounted = false; };
  }, []);

  // read pending queue count and listen for changes from other tabs
  useEffect(() => {
    const readPending = () => {
      try {
        const raw = localStorage.getItem("pendingInterviewSaves");
        const q = JSON.parse(raw || "[]");
        setPendingCount(Array.isArray(q) ? q.length : 0);
      } catch {
        setPendingCount(0);
      }
    };

    readPending();

    const onStorage = (ev) => {
      if (ev.key === "pendingInterviewSaves") readPending();
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const handleRetryPending = async () => {
    setRetrying(true);
    try {
      const res = await retryPendingSaves();
      alert(`Retry processed: ${res.processed}. Remaining: ${res.remaining ?? 0}`);
      const raw = localStorage.getItem("pendingInterviewSaves");
      const q = JSON.parse(raw || "[]");
      setPendingCount(Array.isArray(q) ? q.length : 0);
    } catch (e) {
      console.error(e);
      alert("Retry failed: " + (e.message || e));
    } finally {
      setRetrying(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6">Overview</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Users" value={stats?.totalUsers ?? "—"} />
        <StatCard title="Total Interviews" value={stats?.totalInterviews ?? "—"} />
        <StatCard title="Total Questions" value={stats?.totalQuestions ?? "—"} />
        <StatCard title="Average Score" value={stats?.averageScore ?? "—"} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-slate-800 p-4 rounded-lg">Most used category: <b>{stats?.mostUsedCategory ?? "—"}</b></div>
        <div className="bg-slate-800 p-4 rounded-lg">Active users (last 7 days): <b>{stats?.activeUsers ?? "—"}</b></div>
      </div>

      <div className="mt-6 flex items-center gap-4">
        <div className="bg-slate-800 p-4 rounded-lg">Pending interview saves: <b>{pendingCount}</b></div>
        <button onClick={handleRetryPending} disabled={retrying} className="px-4 py-2 bg-cyan-500 text-black rounded-lg">
          {retrying ? "Retrying..." : "Retry pending saves"}
        </button>
      </div>
    </div>
  );
}
