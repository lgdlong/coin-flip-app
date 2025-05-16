import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import type { UserStats } from "../types";

export default function AdminPage() {
  const [users, setUsers] = useState<UserStats[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase
        .from("users")
        .select("name, flips")
        .order("flips", { ascending: false });

      if (!error && data) setUsers(data);
    };

    fetchUsers();
  }, []);

  return (
    <div className="center-container">
      <div className="main-box">
        <h2>Quản lý người dùng</h2>
        <table>
          <thead>
            <tr>
              <th>Tên</th>
              <th>Số lần tung</th>
            </tr>
          </thead>
          <tbody>
            {users.map(({ name, flips }) => (
              <tr key={name}>
                <td>{name}</td>
                <td>{flips}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
