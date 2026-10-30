function Statistics({ tasks }) {

  const today = new Date();
  const todayDate = new Date(
    today.getTime() - today.getTimezoneOffset() * 60000
  ).toISOString().split("T")[0];

  const total = tasks.length;

  const aFaire = tasks.filter(
    (t) => t.status === "À faire"
  ).length;

  const enCours = tasks.filter(
    (t) => t.status === "En cours"
  ).length;

  const terminees = tasks.filter(
    (t) => t.status === "Terminée"
  ).length;

  const enRetard = tasks.filter(
    (t) => t.endDate < todayDate && t.status !== "Terminée"
  ).length;

  return (
    <section className="stats">

      <div className="stat">
        <span>Total des tâches</span>
        <strong>{total}</strong>
      </div>

      <div className="stat">
        <span>À faire</span>
        <strong>{aFaire}</strong>
      </div>

      <div className="stat">
        <span>En cours</span>
        <strong>{enCours}</strong>
      </div>

      <div className="stat">
        <span>Terminées</span>
        <strong>{terminees}</strong>
      </div>

      <div className="stat">
        <span>En retard</span>
        <strong style={{ color: "#ef4444" }}>
          {enRetard}
        </strong>
      </div>

    </section>
  );
}

export default Statistics;

