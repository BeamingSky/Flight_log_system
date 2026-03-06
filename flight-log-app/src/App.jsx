import { useState, useEffect } from "react";
import Select from "react-select";
import {
  paOptions,
  aircraftOptions,
  instructors,
  students
} from "./data";

const selectStyles = {
  control: (base, state) => ({
    ...base,
    background: "rgba(255,255,255,0.04)",
    border: `1px solid ${state.isFocused ? "#7eb8f7" : "rgba(255,255,255,0.15)"}`,
    borderRadius: "6px",
    boxShadow: state.isFocused ? "0 0 0 3px rgba(126,184,247,0.15)" : "none",
    color: "#fff",
    minHeight: "40px",
    transition: "all 0.2s",
    "&:hover": { borderColor: "rgba(255,255,255,0.35)" }
  }),
  singleValue: (base) => ({ ...base, color: "#f0f6ff", fontWeight: 500 }),
  placeholder: (base) => ({ ...base, color: "rgba(255,255,255,0.35)", fontSize: "0.85rem" }),
  menu: (base) => ({
    ...base,
    background: "#0d2545",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0 16px 40px rgba(0,0,0,0.5)",
    zIndex: 9999
  }),
  menuPortal: (base) => ({ ...base, zIndex: 9999 }),
  option: (base, state) => ({
    ...base,
    background: state.isFocused ? "rgba(126,184,247,0.15)" : "transparent",
    color: state.isFocused ? "#7eb8f7" : "#c8deff",
    fontSize: "0.85rem",
    padding: "9px 14px",
    cursor: "pointer"
  }),
  input: (base) => ({ ...base, color: "#fff" }),
  indicatorSeparator: () => ({ display: "none" }),
  dropdownIndicator: (base, state) => ({
    ...base,
    color: state.isFocused ? "#7eb8f7" : "rgba(255,255,255,0.3)",
    transition: "color 0.2s",
    padding: "0 8px",
    "&:hover": { color: "#7eb8f7" }
  }),
  clearIndicator: (base) => ({
    ...base,
    color: "rgba(255,255,255,0.3)",
    padding: "0 4px",
    "&:hover": { color: "#f87171" }
  }),
  valueContainer: (base) => ({ ...base, padding: "2px 12px" })
};

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow:wght@300;400;500;600;700&family=Barlow+Condensed:wght@400;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  html, body {
    background: #07182e;
    width: 100vw;
    height: 100vh;
    font-family: 'Barlow', sans-serif;
  }

  .app {
  width: 100vw;
    height: 100vh;
    background:
      radial-gradient(ellipse 80% 50% at 50% -20%, rgba(14,60,120,0.6) 0%, transparent 70%),
      linear-gradient(180deg, #07182e 0%, #091f3a 100%);
    display: flex;
    align-items: flex-start;
    justify-content: center;
    // padding: 40px 20px 60px;
    // border: 1px solid red;
  }

  .card {
    width:100vw;
    // border: 1px solid green;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.08);
    // border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04);
    backdrop-filter: blur(20px);
  }

  /* ── HEADER ── */
  .header {
    background: linear-gradient(135deg, #0a3060 0%, #0d3d7a 100%);
    // border-bottom: 1px solid red;
    padding: 24px 28px;
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
  }
  .header::before {
    content: '';
    position: absolute;
    top: -40px; right: -40px;
    width: 180px; height: 180px;
    background: rgba(126,184,247,0.06);
    border-radius: 50%;
    pointer-events: none;
  }
  .header::after {
    content: '';
    position: absolute;
    bottom: -60px; left: -20px;
    width: 140px; height: 140px;
    background: rgba(255,255,255,0.03);
    border-radius: 50%;
    pointer-events: none;
  }
  .header-content { display: flex; flex-direction: column; gap: 4px; position: relative; z-index: 1; }
  .header-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: rgba(126,184,247,0.12);
    border: 1px solid rgba(126,184,247,0.25);
    border-radius: 20px;
    padding: 3px 10px;
    margin-bottom: 8px;
    width: fit-content;
  }
  .header-badge-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: #7eb8f7;
    animation: pulse 2s infinite;
    flex-shrink: 0;
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
  }
  .header-badge-text {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 0.65rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #7eb8f7;
    font-weight: 600;
  }
  .header-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 1.6rem;
    font-weight: 700;
    color: #fff;
    letter-spacing: 0.02em;
    line-height: 1;
  }
  .header-sub {
    font-size: 0.77rem;
    color: rgba(255,255,255,0.4);
    letter-spacing: 0.03em;
    margin-top: 4px;
  }
  .sr-badge {
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 8px;
    padding: 7px 12px;
    text-align: center;
    flex-shrink: 0;
    position: relative;
    z-index: 1;
  }
  .sr-label {
    font-size: 0.58rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.4);
    font-weight: 600;
  }
  .sr-value {
    font-family: 'JetBrains Mono', monospace;
    font-size: 1.3rem;
    font-weight: 500;
    color: #7eb8f7;
    line-height: 1.2;
  }

  /* ── BODY ── */
  .body {
    padding: 24px 28px;
  }

  /* Default: single-column stack */
  .form-grid {
    display: flex;
    flex-direction: column;
  }

  .section { margin-bottom: 18px; }
  .section-label {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 0.62rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.3);
    margin-bottom: 8px;
    padding-left: 2px;
  }
  .col-stack { display: flex; flex-direction: column; gap: 10px; }
  .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }

  .field { display: flex; flex-direction: column; gap: 5px; }
  .field label {
    font-size: 0.68rem;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.45);
  }
  .field input {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 6px;
    color: #f0f6ff;
    font-family: 'Barlow', sans-serif;
    font-size: 0.85rem;
    font-weight: 500;
    height: 40px;
    outline: none;
    padding: 0 12px;
    transition: all 0.2s;
    width: 100%;
    -webkit-appearance: none;
    /* always display uppercase text */
    text-transform: uppercase;
  }
  .field input:focus {
    border-color: #7eb8f7;
    box-shadow: 0 0 0 3px rgba(126,184,247,0.15);
    background: rgba(255,255,255,0.06);
  }
  .field input::placeholder { color: rgba(255,255,255,0.25); font-size: 0.78rem; }
  .field input[readonly] { color: rgba(255,255,255,0.35); cursor: not-allowed; }
  .field input[type="time"] {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.875rem;
    color-scheme: dark;
  }

  .divider { height: 1px; background: rgba(255,255,255,0.06); margin: 2px 0 18px; }

  .flying-time-display {
    background: linear-gradient(135deg, rgba(14,60,120,0.5), rgba(10,48,96,0.5));
    border: 1px solid rgba(126,184,247,0.2);
    border-radius: 10px;
    padding: 6px 10px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 8px;
    min-width: 90px;
  }
  .ft-label {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 0.6rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(126,184,247,0.7);
  }
  .ft-value {
    font-family: 'JetBrains Mono', monospace;
    font-size: 1.1rem;
    font-weight: 500;
    color: #7eb8f7;
    letter-spacing: 0.05em;
  }
  .ft-empty {
    font-family: 'JetBrains Mono', monospace;
    font-size: 1.4rem;
    color: rgba(255,255,255,0.15);
    letter-spacing: 0.1em;
  }

  .submit-btn {
    width: 100%;
    height: 48px;
    background: linear-gradient(135deg, #1255b8 0%, #1a6fd4 100%);
    border: none;
    border-radius: 8px;
    color: #fff;
    cursor: pointer;
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 1rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    transition: all 0.2s;
    position: relative;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(18,85,184,0.4);
    -webkit-tap-highlight-color: transparent;
  }
  .submit-btn::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(255,255,255,0);
    transition: background 0.2s;
  }
  .submit-btn:hover:not(:disabled)::before { background: rgba(255,255,255,0.08); }
  .submit-btn:active:not(:disabled) { transform: translateY(1px); }
  .submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }

  .footer {
    padding: 12px 28px;
    border-top: 1px solid rgba(255,255,255,0.05);
    text-align: center;
  }
  .footer-text {
    font-size: 0.68rem;
    color: rgba(255,255,255,0.2);
    letter-spacing: 0.04em;
  }

  /* ══════════════════════════════════════
     MOBILE PORTRAIT  (≤ 480px)
     Full width, comfortable touch targets
  ══════════════════════════════════════ */
  @media (max-width: 480px) {
    .app { padding: 14px 10px 36px; }
    .card { border-radius: 12px; }
    .header { padding: 16px 14px; }
    .header-title { font-size: 1.25rem; }
    .header-sub { font-size: 0.7rem; }
    .sr-badge { padding: 6px 10px; }
    .sr-value { font-size: 1.1rem; }
    .body { padding: 14px; }
    .field input { height: 44px; font-size: 0.88rem; }
    .submit-btn { height: 50px; }
    .footer { padding: 10px 14px; }
  }

  /* ══════════════════════════════════════
     MOBILE LANDSCAPE  (short + wide)
     Compact header + 2-col grid body
  ══════════════════════════════════════ */
  @media (max-height: 520px) and (orientation: landscape) {
    .app { padding: 8px 12px 16px; }

    .card { max-width: 100%; border-radius: 10px; }

    /* Slim header */
    .header { padding: 8px 14px; align-items: center; }
    .header-content { flex-direction: row; align-items: center; flex-wrap: wrap; gap: 8px; }
    .header-badge { margin-bottom: 0; }
    .header-title { font-size: 1rem; }
    .header-sub { display: none; }
    .sr-badge { padding: 4px 10px; }
    .sr-label { font-size: 0.52rem; }
    .sr-value { font-size: 0.95rem; }

    /* Two-column body */
    .body { padding: 10px 14px; }

    .form-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      column-gap: 14px;
    }

    .span-full { grid-column: 1 / -1; }

    .section { margin-bottom: 10px; }
    .col-stack { gap: 7px; }
    .grid-2 { gap: 7px; }

    .field input { height: 34px; font-size: 0.8rem; }
    .field label { font-size: 0.58rem; }
    .section-label { font-size: 0.56rem; margin-bottom: 6px; }

    .divider { margin: 0 0 10px; }

    .flying-time-display { padding: 8px 12px; margin-bottom: 10px; }
    .ft-value, .ft-empty { font-size: 1.1rem; }
    .ft-label { font-size: 0.58rem; }

    .submit-btn { height: 38px; font-size: 0.82rem; }

    .footer { padding: 6px 14px; }
    .footer-text { font-size: 0.6rem; }
  }

  /* ══════════════════════════════════════
     TABLET / DESKTOP  (≥ 640px portrait+)
     Two-column card form
  ══════════════════════════════════════ */
  @media (min-width: 640px) and (min-height: 521px) {
    // .app { padding: 40px 24px 60px; }

    .form-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      column-gap: 24px;
    }
    .span-full { grid-column: 1 / -1; }

    .header { padding: 28px 32px; }
    .header-title { font-size: 1.75rem; }
    .body { padding: 28px 32px; }
    .footer { padding: 14px 32px; }
  }

  /* Wider desktops: three-column form */
  @media (min-width: 1024px) {
    .form-grid {
      grid-template-columns: repeat(3, 1fr);
      column-gap: 32px;
    }
  }
`;

export default function App() {
  const WEB_APP_URL =
    "https://script.google.com/macros/s/AKfycbzbnVxDoYLqExAtJQ-NUw5ZiC3AeZIwbQoi_epFyF1Y6Lpz8FqeYtwlXspDVFGQ7oWE/exec";
  const emptyForm = {
  pada: null,
  aircraft: null,
  pic: null,  
  student: null,  
  batch: "",
  exercise: "",
  /* new route fields */
  from: "",
  to: "",
  startup: "",
  shutdown: "",
  landings: 0,
  ifSim: "",
  ifActual: "",
  dayNight: "",
  remark: ""
};

  const [form, setForm] = useState(emptyForm);
  const [count, setCount] = useState(() => {
    const saved = localStorage.getItem("flightLogCount");
    return saved ? parseInt(saved, 10) : 1;
  });
  const [loading, setLoading] = useState(false);

  // Persist count to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("flightLogCount", String(count));
  }, [count]);

  const formatTime = (val) => {
    val = val.replace(/\D/g, ''); // Remove non-digits
    if (val.length >= 3) {
      val = val.slice(0, 2) + ':' + val.slice(2, 4);
    }
    return val;
  };

  const calculateFlyingTime = (startup, shutdown) => {
    if (!startup || !shutdown) return "--:--";
    
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    if (!timeRegex.test(startup) || !timeRegex.test(shutdown)) {
      return "--:--";
    }

    const toMins = (t) => {
      const [h, m] = t.split(':').map(Number);
      return h * 60 + m;
    };

    let startMins = toMins(startup);
    let endMins = toMins(shutdown);
    
    let diff = endMins - startMins;
    if (diff < 0) diff += 1440; // Wrap around 24 hours

    const h = Math.floor(diff / 60);
    const m = diff % 60;

    return String(h).padStart(2, '0') + ":" + String(m).padStart(2, '0');
  };

  const validateForm = () =>
  form.pada &&
  form.aircraft &&
  form.pic &&
  form.student &&
  form.exercise &&
  form.from &&
  form.to &&
  form.startup &&
  form.shutdown;

  const dayNightOptions = [
    { value: "Day", label: "Day" },
    { value: "Night", label: "Night" }
  ];

  const addEntry = async () => {
    if (!validateForm()) { return; }
    const entry = {
        srno: count,
        pada: form.pada?.value || "",
        aircraft: form.aircraft?.value || "",
        pic: form.pic?.value || "",
        student: form.student?.value || "",
        batch: form.batch,
        /* include new form fields for route */
        from: form.from,
        to: form.to,
        startup: form.startup,
        exercise: form.exercise,
        shutdown: form.shutdown,
        flyingTime: calculateFlyingTime(form.startup, form.shutdown),
        landings: Number(form.landings) || 0,
        ifSim: form.ifSim,
        ifActual: form.ifActual,
        dayNight: form.dayNight,
        remark: form.remark
      };
    try {
      setLoading(true);
      await fetch(WEB_APP_URL, {
        method: "POST", mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(entry)
      });
      setForm(emptyForm);
      setCount(c => c + 1);
      // no popup on success
    } catch (e) {
      console.error(e);
      // failure silently logged
    } finally {
      setLoading(false);
    }
  };

  const flyTime = calculateFlyingTime(form.startup, form.shutdown);

  return (
    <>
      <style>{styles}</style>
      <div className="app">
        <div className="card">

          {/* Header */}
          <div className="header">
            <div className="header-content">
              <div className="header-badge">
                <div className="header-badge-dot" />
                <span className="header-badge-text">Flight Operations</span>
              </div>
              <div className="header-title">Flight Log Entry</div>
              <div className="header-sub">Complete all required fields before submission</div>
            </div>
            <div className="sr-badge">
              <div className="sr-label">Sr. No</div>
              <div className="sr-value">{String(count).padStart(3, "0")}</div>
            </div>
          </div>

          {/* Body */}
          <div className="body">
            <div className="form-grid">

              {/* Sortie Information */}
              <div className="section">
                <div className="section-label">Sortie Information</div>
                <div className="col-stack">
                  <Select
                    placeholder="Select PA / DA"
                    value={form.pada} options={paOptions}
                    onChange={(val) => {
                      const updated = { ...form, pada: val };
                      if (val?.value?.toUpperCase() === "DA-42") {
                        const defaultAircraft = aircraftOptions.find(
                          (a) => a.value?.toUpperCase() === "VT-BBS"
                        );
                        if (defaultAircraft) updated.aircraft = defaultAircraft;
                      }
                      setForm(updated);
                    }}
                    styles={selectStyles} menuPortalTarget={document.body}
                  />
                  <Select
                    placeholder="Select Aircraft"
                    value={form.aircraft} options={aircraftOptions}
                    onChange={(val) => setForm({ ...form, aircraft: val })}
                    styles={selectStyles} menuPortalTarget={document.body}
                  />
                </div>
              </div>

              {/* Personnel */}
              <div className="section">
                <div className="section-label">Personnel</div>
                <div className="col-stack">
                  <Select
                    placeholder="Search PIC / Instructor..."
                    value={form.pic} options={instructors}
                    onChange={(val) => setForm({ ...form, pic: val })}
                    isSearchable styles={selectStyles} menuPortalTarget={document.body}
                  />
                  <Select
                    placeholder="Search Student..."
                    value={form.student} options={students}
                    onChange={(val) => setForm({ ...form, student: val, batch: val?.batch || "" })}
                    isSearchable styles={selectStyles} menuPortalTarget={document.body}
                  />
                </div>
              </div>
              <div className="field">
                    <label>Batch</label>
                    <input name="batch" placeholder="Auto-filled from student" value={form.batch} readOnly />
                    <div className="grid-2" style={{ marginBottom: 10 }}>
                    <div className="field">
                      <input
                        name="from"
                        placeholder="VIKG"
                        value={form.from}
                        onChange={(e) => setForm({ ...form, from: e.target.value.toUpperCase() })}
                      />
                    </div>
                    <div className="field">
                      <input
                        name="to"
                        placeholder="VIKG"
                        value={form.to}
                        onChange={(e) => setForm({ ...form, to: e.target.value.toUpperCase() })}
                      />
                    </div>
                  </div>
              </div>
              

              {/* Divider */}
              <div className="divider span-full" />

              {/*Flight Details*/}
              <div className="section">
                <div className="section-label">Flight Details</div>



                {/* exercise and landings share a row to save vertical space */}
                <div className="grid-2" style={{ marginTop: 10 }}>
                  <div className="field">
                    <label>Exercise</label>
                    <input
                      name="exercise"
                      placeholder="Training exercise code/name"
                      value={form.exercise}
                      onChange={(e) => setForm({ ...form, exercise: e.target.value.toUpperCase() })}
                    />
                  </div>
                </div>
              </div>

              {/* Flight Times */}
              <div className="section">
                <div className="section-label">Flight Times</div>
                  <div className="grid-2" style={{ marginBottom: 10 }}>
                  <div className="field">
                    <label>Startup</label>
                    <input type="text" placeholder="HH:MM" maxLength="5" value={form.startup}
                      name="startup"
                      onChange={(e) => setForm({ ...form, startup: formatTime(e.target.value) })} />
                  </div>
                  <div className="field">
                    <label>Shutdown</label>
                    <input type="text" placeholder="HH:MM" maxLength="5" value={form.shutdown}
                      name="shutdown"
                      onChange={(e) => setForm({ ...form, shutdown: formatTime(e.target.value) })} />
                  </div>
                </div>
                {/* flying time shown directly under the start/shutdown inputs */}
                <div className="flying-time-display">
                  <div className="ft-label">Total Flying Time</div>
                  {flyTime ? <div className="ft-value">{flyTime}</div> : <div className="ft-empty">--:--</div>}
                </div>
              </div>
              <div className="grid-2" style={{ marginTop: 22 }}>
                <div className="field">
                      <label>Landings</label>
                      <input
                        name="landings"
                        type="number"
                        min="0"
                        step="1"
                        placeholder="Number of landings"
                        value={form.landings}
                        onChange={(e) => setForm({ ...form, landings: e.target.value === "" ? 0 : Number(e.target.value) })}
                      />
                </div>
              </div>
              <div className="grid-2" style={{ marginTop: 10 }}>
                <div className="field">
                  <label>IF Simulated</label>
                  <input name="ifSim" type="text" placeholder="HH:MM" maxLength="5"
                    value={form.ifSim}
                    onChange={(e) => setForm({ ...form, ifSim: formatTime(e.target.value) })}
                  />
                </div>
                <div className="field">
                  <label>IF Actual</label>
                  <input name="ifActual" type="text" placeholder="HH:MM" maxLength="5"
                    value={form.ifActual}
                    onChange={(e) => setForm({ ...form, ifActual: formatTime(e.target.value) })}
                  />
                </div>
              </div>

              <div className="field" style={{ marginTop: 10 }}>
                <label>Day / Night</label>
                <Select
                  placeholder="Day or Night"
                  value={dayNightOptions.find(o => o.value === form.dayNight) || null}
                  options={dayNightOptions}
                  onChange={(val) => setForm({ ...form, dayNight: val?.value || "" })}
                  isSearchable
                  styles={selectStyles}
                  menuPortalTarget={document.body}
                />
              </div>

              {/* Remarks */}
              <div className="section">
                <div className="grid-2" style={{ marginTop: 10 }}>
                  <div className="field">
                    <label>Remarks</label>
                    <input name="remark" placeholder="Optional remarks or notes..." value={form.remark}
                      onChange={(e) => setForm({ ...form, remark: e.target.value.toUpperCase() })} />
                  </div>
                </div>
              </div>

              {/* submit button only */}
              <div className="span-full">
                <button className="submit-btn" onClick={addEntry} disabled={loading}>
                  {loading ? "Saving Entry..." : "Submit Flight Entry"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}