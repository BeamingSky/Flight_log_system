import { useState } from "react";

const WEB_APP_URL =
  "https://script.google.com/macros/s/AKfycbzUmSCupRkcbyqhkHi54KbpmUDFFh8NymfZxJhiApT21MAPxuXUxMy7ICYbc1fmaAlI/exec";

export default function App() {
  const [student, setStudent] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);

  const toMinutes = (hhmm) => {
    if (!hhmm || !hhmm.includes(":")) return 0;
    const [h, m] = hhmm.split(":").map(Number);
    return h * 60 + m;
  };

  const toHHMM = (mins) => {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
  };

  const searchStudent = async () => {
    if (!student) return;

    setLoading(true);
    setStats(null);

    const url =
      `${WEB_APP_URL}?student=${encodeURIComponent(student)}` +
      `&from=${from || ""}&to=${to || ""}`;

    const res = await fetch(url);
    const data = await res.json();

    const sum = (rows) =>
      rows.reduce((acc, r) => acc + toMinutes(r[13]), 0); // Flying Time index 13

    const totalMinutes = sum(data);

    const picMinutes = sum(
      data.filter(r => r[5] === student) // PIC index 5
    );

    const nightMinutes = sum(
      data.filter(r => r[17] === "NIGHT")
    );

    setStats({
      total: toHHMM(totalMinutes),
      pic: toHHMM(picMinutes),
      night: toHHMM(nightMinutes)
    });

    setLoading(false);
  };

  return (
    <div style={{
      padding: "40px",
      background: "#07182e",
      minHeight: "100vh",
      color: "white"
    }}>
      <h1>Flight Analytics</h1>

      <input
        placeholder="Student Name"
        value={student}
        onChange={(e) => setStudent(e.target.value)}
        style={{ padding: "8px", marginRight: "10px" }}
      />

      <br /><br />

      <label>From: </label>
      <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} />

      <label style={{ marginLeft: "10px" }}>To: </label>
      <input type="date" value={to} onChange={(e) => setTo(e.target.value)} />

      <br /><br />

      <button onClick={searchStudent}>
        Search
      </button>

      {loading && <p style={{ marginTop: "20px" }}>Processing...</p>}

      {stats && (
        <div style={{ marginTop: "20px" }}>
          <p>Total Hours: {stats.total}</p>
          <p>Total PIC Hours: {stats.pic}</p>
          <p>Night Hours: {stats.night}</p>
        </div>
      )}
    </div>
  );
}