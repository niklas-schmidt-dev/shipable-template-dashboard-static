import { useMemo, useState } from "react";
import { Activity, AlertTriangle, ArrowUpRight, Clock3 } from "lucide-react";

type AccountHealth = "Strong" | "Watch" | "Risk";
type AccountFilter = "all" | "attention";

type Metric = {
  label: string;
  value: string;
  delta: string;
};

type Account = {
  name: string;
  health: AccountHealth;
  value: string;
  owner: string;
  nextStep: string;
};

type Incident = {
  title: string;
  severity: "low" | "medium" | "high";
  status: string;
};

const metrics: Metric[] = [
  { label: "Pipeline value", value: "$84.2k", delta: "+12.8%" },
  { label: "Active accounts", value: "1,284", delta: "+4.1%" },
  { label: "Needs review", value: "7", delta: "-2" },
  { label: "Median response", value: "14m", delta: "-8m" },
];

const accounts: Account[] = [
  {
    name: "Northstar Labs",
    health: "Strong",
    value: "$18.4k",
    owner: "Mina",
    nextStep: "Renewal notes ready",
  },
  {
    name: "Copper Works",
    health: "Watch",
    value: "$9.8k",
    owner: "Jonas",
    nextStep: "Confirm usage drop",
  },
  {
    name: "Evergreen Market",
    health: "Strong",
    value: "$13.1k",
    owner: "Ada",
    nextStep: "Send expansion brief",
  },
  {
    name: "Atlas Finance",
    health: "Risk",
    value: "$22.6k",
    owner: "Priya",
    nextStep: "Escalate support SLA",
  },
];

const incidents: Incident[] = [
  {
    title: "Checkout latency is elevated for EU customers.",
    severity: "medium",
    status: "monitoring",
  },
  {
    title: "Two accounts missed the weekly sync.",
    severity: "low",
    status: "open",
  },
];

export default function App() {
  const [filter, setFilter] = useState<AccountFilter>("all");
  const visibleAccounts = useMemo(
    () =>
      accounts.filter((account) =>
        filter === "all" ? true : account.health !== "Strong",
      ),
    [filter],
  );
  const attentionCount = accounts.filter(
    (account) => account.health !== "Strong",
  ).length;

  return (
    <main className="dashboard">
      <aside className="rail" aria-label="Workspace">
        <div>
          <p className="eyebrow">Ops console</p>
          <h1>Revenue desk</h1>
        </div>
        <div className="rail__meta">
          <span>Reviews</span>
          <strong>{attentionCount} active</strong>
        </div>
      </aside>

      <section className="workspace" aria-label="Revenue operations">
        <header className="topbar" id="top">
          <div>
            <p className="eyebrow">Today</p>
            <h2>Account review queue</h2>
          </div>
          <div className="actions" role="group" aria-label="Account filters">
            <button
              type="button"
              className={filter === "all" ? "is-active" : ""}
              onClick={() => setFilter("all")}
            >
              All accounts
            </button>
            <button
              type="button"
              className={filter === "attention" ? "is-active" : ""}
              onClick={() => setFilter("attention")}
            >
              Needs attention
            </button>
          </div>
        </header>

        <section className="metric-grid" aria-label="Key metrics">
          {metrics.map((metric) => (
            <article key={metric.label} className="metric-card">
              <span>{metric.label}</span>
              <strong>{metric.value}</strong>
              <small>{metric.delta}</small>
            </article>
          ))}
        </section>

        <div className="content-grid">
          <section className="panel panel--large">
            <div className="panel__header">
              <div>
                <p className="eyebrow">Accounts</p>
                <h3>Priority book</h3>
              </div>
              <Activity size={18} aria-hidden="true" />
            </div>
            <div className="account-table">
              {visibleAccounts.map((account) => (
                <article key={account.name} className="account-row">
                  <div className="account-row__main">
                    <strong>{account.name}</strong>
                    <span>{account.nextStep}</span>
                  </div>
                  <span className={`health health--${account.health.toLowerCase()}`}>
                    {account.health}
                  </span>
                  <span>{account.owner}</span>
                  <strong>{account.value}</strong>
                </article>
              ))}
            </div>
          </section>

          <section className="panel">
            <div className="panel__header">
              <div>
                <p className="eyebrow">Incidents</p>
                <h3>Open signals</h3>
              </div>
              <AlertTriangle size={18} aria-hidden="true" />
            </div>
            <div className="signal-list">
              {incidents.map((incident) => (
                <article key={incident.title} className="signal">
                  <strong>{incident.title}</strong>
                  <span>
                    {incident.severity} severity · {incident.status}
                  </span>
                </article>
              ))}
            </div>
          </section>

          <section className="panel panel--action">
            <div className="panel__header">
              <div>
                <p className="eyebrow">Next</p>
                <h3>Review rhythm</h3>
              </div>
              <Clock3 size={18} aria-hidden="true" />
            </div>
            <p className="callout">Enterprise pipeline sync</p>
            <p className="muted">Today · 14:30 · 8 follow-ups</p>
            <a href="#top">
              Open queue
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </section>
        </div>
      </section>
    </main>
  );
}
