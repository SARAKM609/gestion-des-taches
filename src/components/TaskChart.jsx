import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

function TaskChart({ aFaireCount, enCoursCount, termineeCount }) {
  const data = [
    { name: "À faire", value: aFaireCount },
    { name: "En cours", value: enCoursCount },
    { name: "Terminée", value: termineeCount },
  ];

  const COLORS = ["#f59e0b", "#3b82f6", "#10b981"];

  const hasData = aFaireCount > 0 || enCoursCount > 0 || termineeCount > 0;

  return (
    <section className="card chart-card">
      <h2>Aperçu graphique des statuts</h2>
      <div className="chart-container">
        {!hasData ? (
          <div className="empty">Aucune donnée à afficher pour le moment.</div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
                label
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </section>
  );
}

export default TaskChart;