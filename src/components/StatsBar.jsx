export default function StatsBar({ total, visited }) {
  const percentage = total > 0 ? Math.round(visited / total * 100) : 0;

  return (
    <div className="stats-bar">
      <div className="stat">
        <div className="stat-value">{total}</div>
        <div className="stat-label">Total</div>
      </div>
      <div className="stat-divider"></div>
      <div className="stat">
        <div className="stat-value">{visited}</div>
        <div className="stat-label">Visitados</div>
      </div>
      <div className="stat-divider"></div>
      <div className="stat">
        <div className="stat-value">{percentage}%</div>
        <div className="stat-label">Completado</div>
      </div>
    </div>
  );
}