import { useEffect, useState } from "react";
import type { UserStats } from "../types";

export default function AdminPage() {
  const [stats, setStats] = useState<UserStats>({});

  useEffect(() => {
    fetch("/api/get-users")
      .then((res) => res.json())
      .then(setStats);
  }, []);

  return (
    <div className="center-container">
      <h2>Quản lý người dùng</h2>
      <table>
        <thead>
          <tr>
            <th>Tên</th>
            <th>Số lần tung</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(stats).map(([name, count]) => (
            <tr key={name}>
              <td>{name}</td>
              <td>{count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
