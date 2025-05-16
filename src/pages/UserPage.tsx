import { useState } from "react";

export default function UserPage() {
  const [name, setName] = useState("");
  const [registered, setRegistered] = useState(false);
  const [flipResult, setFlipResult] = useState("");
  const [totalFlips, setTotalFlips] = useState(0);

  const handleRegister = async () => {
    const res = await fetch("/api/add-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    if (res.ok) setRegistered(true);
  };

  const handleFlip = async () => {
    const outcome = Math.random() < 0.5 ? "Sấp" : "Ngửa";
    setFlipResult(outcome);

    const res = await fetch("/api/add-flip", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    if (res.ok) {
      const data = await res.json();
      setTotalFlips(data.flips);
    }
  };

  return (
    <div className="center-container">
      <div className="main-box">
        {!registered ? (
          <>
            <h2>Nhập tên:</h2>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nhập tên..."
            />
            <button onClick={handleRegister}>Vào chơi</button>
          </>
        ) : (
          <>
            <h2>Chào {name}!</h2>
            <button onClick={handleFlip}>Tung đồng xu</button>
            <p>Kết quả: {flipResult}</p>
            <p>Tổng số lần đã tung: {totalFlips}</p>
          </>
        )}
      </div>
    </div>
  );
}
