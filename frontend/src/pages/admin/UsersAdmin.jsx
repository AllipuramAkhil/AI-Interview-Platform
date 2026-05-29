import { useCallback, useEffect, useMemo, useState } from "react";
import { getAllUsers, blockUser, unblockUser } from "../../api/adminApi";
import UserDetailsModal from "../../components/UserDetailsModal";

export default function UsersAdmin() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(12);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [searchTimer, setSearchTimer] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsers = useCallback(async (opts = {}) => {
    setLoading(true);
    try {
      const params = { page: opts.page ?? page, pageSize, search: opts.search ?? search };
      const res = await getAllUsers(params);
      const usersList = Array.isArray(res) ? res : res.items || res.users || [];
      setUsers(usersList);
      setTotal(Array.isArray(usersList) ? usersList.length : res.total || (usersList.length || 0));
    } catch (e) { console.error(e); }
    setLoading(false);
  }, [page, pageSize, search]);

  useEffect(() => {
    const load = async () => {
      await fetchUsers({ page });
    };
    void load();
  }, [fetchUsers, page]);

  const handleSearchChange = (value) => {
    setSearch(value);
    setPage(1);
    if (searchTimer) clearTimeout(searchTimer);
    const timer = setTimeout(() => fetchUsers({ page: 1, search: value }), 400);
    setSearchTimer(timer);
  };

  const handleBlock = async (u) => {
    try {
      if (u.status === "blocked") {
        await unblockUser(u.id);
        alert("User unblocked");
      } else {
        await blockUser(u.id);
        alert("User blocked");
      }
      void fetchUsers({ page });
    } catch (e) { console.error(e); alert("Action failed"); }
  };

  const totalPages = useMemo(() => Math.max(1, Math.ceil(total / pageSize)), [total, pageSize]);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Users</h1>
        <div>
          <input placeholder="Search users..." value={search} onChange={(e) => handleSearchChange(e.target.value)} className="p-2 rounded bg-slate-700" />
        </div>
      </div>

      <div className="bg-slate-800 rounded overflow-auto">
        <table className="min-w-full divide-y divide-slate-700">
          <thead className="bg-slate-900">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Role</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Interviews</th>
              <th className="px-4 py-2 text-left">Avg Score</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={7} className="p-4">Loading...</td></tr>
            ) : users.length === 0 ? (
              <tr><td colSpan={7} className="p-4">No users found.</td></tr>
            ) : (
              users.map((u) => (
                <tr key={u.id} className="border-t border-slate-700">
                  <td className="px-4 py-3">{u.name}</td>
                  <td className="px-4 py-3">{u.email}</td>
                  <td className="px-4 py-3">{u.role}</td>
                  <td className="px-4 py-3">{u.status}</td>
                  <td className="px-4 py-3">{u.totalInterviews ?? 0}</td>
                  <td className="px-4 py-3">{u.averageScore ?? "—"}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button onClick={() => setSelectedUser(u.id)} className="px-3 py-1 bg-sky-600 rounded">View</button>
                      <button onClick={() => handleBlock(u)} className="px-3 py-1 bg-red-600 rounded">{u.status === "blocked" ? "Unblock" : "Block"}</button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-slate-400">{total} users</div>
        <div className="flex gap-2">
          <button disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))} className="px-3 py-1 bg-slate-700 rounded">Prev</button>
          <div className="px-3 py-1 bg-slate-800 rounded">{page} / {totalPages}</div>
          <button disabled={page >= totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))} className="px-3 py-1 bg-slate-700 rounded">Next</button>
        </div>
      </div>

      <UserDetailsModal userId={selectedUser} open={!!selectedUser} onClose={() => setSelectedUser(null)} />
    </div>
  );
}
