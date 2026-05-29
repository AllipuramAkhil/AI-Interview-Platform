import { useEffect, useState } from "react";
import { getAllUsers, getRoleMappings, updateRoleMapping, exportCsv } from "../../api/adminApi";
import { downloadPdf } from "../../utils/exportUtils";

export default function SettingsAdmin() {
  const [mapping, setMapping] = useState([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await getRoleMappings();
        if (mounted) setMapping(data || []);
      } catch (e) {
        console.error(e);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const handleUpdate = async () => {
    setSaving(true);
    try {
      await updateRoleMapping(mapping);
      alert("Role mapping updated.");
    } catch (e) {
      console.error(e);
      alert("Unable to save mappings.");
    } finally {
      setSaving(false);
    }
  };

  const handleDownloadUsers = async () => {
    try {
      const blob = await exportCsv("/api/admin/export/users");
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "users.csv";
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (e) {
      console.error(e);
      alert("Failed to export users.");
    }
  };

  const handleDownloadInterviews = async () => {
    try {
      const blob = await exportCsv("/api/admin/export/interviews");
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "interview-results.csv";
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (e) {
      console.error(e);
      alert("Failed to export interviews.");
    }
  };

  const handleDownloadQuestions = async () => {
    try {
      const blob = await exportCsv("/api/admin/export/questions");
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "questions.csv";
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (e) {
      console.error(e);
      alert("Failed to export questions.");
    }
  };

  const handleDownloadUsersPdf = async () => {
    try {
      const users = await getAllUsers({ pageSize: 1000 });
      const rows = Array.isArray(users) ? users : users.items || [];
      if (rows.length === 0) {
        alert("No users available for PDF export.");
        return;
      }
      downloadPdf("users.pdf", "User Export", rows.map(({ name, email, role, status, totalInterviews, averageScore }) => ({ name, email, role, status, totalInterviews, averageScore })));
    } catch (e) {
      console.error(e);
      alert("Failed to export users PDF.");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold mb-2">Settings</h1>
        <p className="text-slate-400">Manage role-to-question mapping and exports.</p>
      </div>

      <div className="bg-slate-800 p-4 rounded">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div>
            <h2 className="text-lg font-semibold">Role Mapping</h2>
            <p className="text-slate-400">Assign question roles and keep mappings synced.</p>
          </div>
          <button disabled={saving} onClick={handleUpdate} className="px-4 py-2 bg-cyan-500 text-black rounded">
            {saving ? "Saving..." : "Save Mapping"}
          </button>
        </div>

        <div className="grid gap-3">
          {mapping.length === 0 ? (
            <div className="text-slate-400">No role mapping configured yet.</div>
          ) : (
            mapping.map((entry, index) => (
              <div key={index} className="grid gap-2 sm:grid-cols-[1fr_1fr_auto] items-center p-3 bg-slate-900 rounded">
                <div>{entry.role}</div>
                <input
                  value={entry.category || ""}
                  onChange={(e) => {
                    const next = [...mapping];
                    next[index] = { ...next[index], category: e.target.value };
                    setMapping(next);
                  }}
                  className="p-2 rounded bg-slate-700 w-full"
                />
                <span className="text-slate-400 text-sm">Assigned category</span>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="bg-slate-800 p-4 rounded">
        <h2 className="text-lg font-semibold mb-3">Export Data</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          <button onClick={handleDownloadUsers} className="px-4 py-3 bg-slate-700 rounded">Export Users CSV</button>
          <button onClick={handleDownloadUsersPdf} className="px-4 py-3 bg-slate-700 rounded">Export Users PDF</button>
          <button onClick={handleDownloadInterviews} className="px-4 py-3 bg-slate-700 rounded">Export Interviews CSV</button>
          <button onClick={handleDownloadQuestions} className="px-4 py-3 bg-slate-700 rounded">Export Questions CSV</button>
        </div>
      </div>
    </div>
  );
}
