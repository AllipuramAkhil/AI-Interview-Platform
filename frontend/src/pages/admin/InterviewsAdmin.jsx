import { useEffect, useMemo, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { getInterviewResults, getInterviewAnalytics } from "../../api/adminApi";

export default function InterviewsAdmin() {
  const [results, setResults] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      try {
        const [interviewList, analyticsData] = await Promise.all([getInterviewResults({ page: 1, pageSize: 20 }), getInterviewAnalytics()]);
        if (mounted) {
          const interviews = Array.isArray(interviewList)
            ? interviewList
            : interviewList.items || interviewList.interviews || interviewList || [];
          setResults(interviews);
          setAnalytics(analyticsData || {});
        }
      } catch (e) {
        console.error(e);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    void load();
    return () => { mounted = false; };
  }, []);

  const distribution = useMemo(() => analytics?.scoreDistribution || [], [analytics]);

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Interview Analytics</h1>
          <p className="text-slate-400">Review interview performance and score distribution.</p>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <div className="bg-slate-800 p-4 rounded">
            <div className="text-slate-400 text-sm">Total interviews</div>
            <div className="mt-2 text-xl font-semibold">{analytics?.totalInterviews ?? "—"}</div>
          </div>
          <div className="bg-slate-800 p-4 rounded">
            <div className="text-slate-400 text-sm">Avg score</div>
            <div className="mt-2 text-xl font-semibold">{analytics?.averageScore ?? "—"}</div>
          </div>
          <div className="bg-slate-800 p-4 rounded">
            <div className="text-slate-400 text-sm">Top performer</div>
            <div className="mt-2 text-xl font-semibold">{analytics?.topPerformer?.name ?? "—"}</div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[0.75fr_1fr]">
        <div className="bg-slate-800 p-4 rounded">
          <h2 className="text-lg font-semibold mb-4">Score distribution</h2>
          {distribution.length === 0 ? (
            <div className="text-slate-400 p-6">No distribution data available.</div>
          ) : (
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={distribution}>
                  <XAxis dataKey="range" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip wrapperStyle={{ color: "#000" }} />
                  <Bar dataKey="count" fill="#22c55e" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        <div className="bg-slate-800 p-4 rounded">
          <h2 className="text-lg font-semibold mb-4">Category performance</h2>
          {analytics?.categoryPerformance ? (
            <div className="space-y-3">
              {analytics.categoryPerformance.map((item) => (
                <div key={item.category} className="rounded bg-slate-900 p-3">
                  <div className="flex justify-between text-sm text-slate-400">
                    <span>{item.category}</span>
                    <span>{item.averageScore}%</span>
                  </div>
                  <div className="h-2 rounded bg-slate-700 mt-2">
                    <div className="h-full rounded bg-cyan-500" style={{ width: `${item.averageScore}%` }} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-slate-400 p-6">No category data available.</div>
          )}
        </div>
      </div>

      <div className="mt-6 bg-slate-800 p-4 rounded">
        <h2 className="text-lg font-semibold mb-3">Recent interview results</h2>
        <div className="overflow-auto">
          <table className="min-w-full divide-y divide-slate-700">
            <thead className="bg-slate-900">
              <tr>
                <th className="px-4 py-2 text-left">Candidate</th>
                <th className="px-4 py-2 text-left">Score</th>
                <th className="px-4 py-2 text-left">Category</th>
                <th className="px-4 py-2 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={4} className="p-4">Loading...</td></tr>
              ) : results.length === 0 ? (
                <tr><td colSpan={4} className="p-4">No interview results found.</td></tr>
              ) : (
                results.map((item) => (
                  <tr key={item.id} className="border-t border-slate-700">
                    <td className="px-4 py-3">{item.user?.name ?? item.candidateName ?? "Unknown"}</td>
                    <td className="px-4 py-3">{item.score ?? "—"}</td>
                    <td className="px-4 py-3">{item.category ?? item.role ?? "—"}</td>
                    <td className="px-4 py-3">{item.date ? new Date(item.date).toLocaleDateString() : "—"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
