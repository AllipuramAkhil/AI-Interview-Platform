import { useEffect, useMemo, useState } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { getAIInsights } from "../../api/adminApi";

export default function AnalyticsAdmin() {
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      try {
        const data = await getAIInsights();
        if (mounted) setInsights(data);
      } catch (e) {
        console.error(e);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    void load();
    return () => { mounted = false; };
  }, []);

  const strengths = useMemo(() => insights?.strengths || [], [insights]);
  const weaknesses = useMemo(() => insights?.weaknesses || [], [insights]);
  const communication = insights?.communicationScore ?? 0;
  const technical = insights?.technicalScore ?? 0;
  const pieData = [
    { name: "Communication", value: communication },
    { name: "Technical", value: technical },
  ];
  const COLORS = ["#22c55e", "#38bdf8"];

  return (
    <div>
      {loading ? (
        <div className="min-h-[420px] flex items-center justify-center text-slate-400">Loading insights...</div>
      ) : (
        <>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">AI Interview Insights</h1>
          <p className="text-slate-400">Personalized interview feedback and performance insights.</p>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="bg-slate-800 p-4 rounded">
            <div className="text-slate-400 text-sm">Strengths</div>
            <div className="mt-2 text-xl font-semibold">{strengths.length}</div>
          </div>
          <div className="bg-slate-800 p-4 rounded">
            <div className="text-slate-400 text-sm">Weaknesses</div>
            <div className="mt-2 text-xl font-semibold">{weaknesses.length}</div>
          </div>
          <div className="bg-slate-800 p-4 rounded">
            <div className="text-slate-400 text-sm">Comm score</div>
            <div className="mt-2 text-xl font-semibold">{communication}</div>
          </div>
          <div className="bg-slate-800 p-4 rounded">
            <div className="text-slate-400 text-sm">Tech score</div>
            <div className="mt-2 text-xl font-semibold">{technical}</div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[0.9fr_0.7fr]">
        <div className="bg-slate-800 p-4 rounded">
          <h2 className="text-lg font-semibold mb-4">Weak skill areas</h2>
          {weaknesses.length === 0 ? (
            <div className="text-slate-400 p-6">No insights available yet.</div>
          ) : (
            <ul className="space-y-3">
              {weaknesses.map((item) => (
                <li key={item} className="rounded bg-slate-900 p-3">{item}</li>
              ))}
            </ul>
          )}
        </div>

        <div className="bg-slate-800 p-4 rounded">
          <h2 className="text-lg font-semibold mb-4">Performance trends</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={insights?.trend || []}>
                <XAxis dataKey="date" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Area type="monotone" dataKey="score" stroke="#22c55e" fill="#22c55e66" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-slate-800 p-4 rounded">
        <h2 className="text-lg font-semibold mb-4">Feedback overview</h2>
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="bg-slate-900 p-4 rounded">
            <h3 className="text-sm uppercase text-slate-400 mb-3">Strengths</h3>
            {strengths.length === 0 ? <div className="text-slate-500">No strengths available.</div> : (
              <ul className="space-y-2">
                {strengths.map((item) => <li key={item} className="text-slate-100">• {item}</li>)}
              </ul>
            )}
          </div>
          <div className="bg-slate-900 p-4 rounded">
            <h3 className="text-sm uppercase text-slate-400 mb-3">Communication vs Technical</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={50} outerRadius={90} label>
                    {pieData.map((entry, index) => (
                      <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
        </>
      )}
    </div>
  );
}
