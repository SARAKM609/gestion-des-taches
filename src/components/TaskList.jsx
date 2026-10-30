function TaskList({
  filteredTasks,
  searchTerm,
  setSearchTerm,
  filterStatus,
  setFilterStatus,
  modifierTache,
  supprimerTache,
  today,
}) {
  return (
    <section className="card">
      <h2>Liste des tâches</h2>

      <div className="filters">
        <input
          type="text"
          placeholder="Rechercher par titre ou responsable..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="Tous">Tous les statuts</option>
          <option value="À faire">À faire</option>
          <option value="En cours">En cours</option>
          <option value="Terminée">Terminée</option>
        </select>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Titre</th>
              <th>Début</th>
              <th>Fin</th>
              <th>Statut</th>
              <th>Priorité</th>
              <th>Responsable</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.length === 0 ? (
              <tr>
                <td colSpan="7" className="empty">
                  Aucune tâche trouvée.
                </td>
              </tr>
            ) : (
              filteredTasks.map((task) => {
                const isLate = task.endDate < today && task.status !== "Terminée";
                return (
                  <tr key={task.id}>
                    <td>
                      {task.title}
                      {isLate && <div className="late-label">En retard</div>}
                    </td>
                    <td>{task.startDate}</td>
                    <td>{task.endDate}</td>
                    <td>{task.status}</td>
                    <td>{task.priority}</td>
                    <td>{task.responsable}</td>
                    <td>
                      <div className="actions">
                        <button
                          onClick={() => modifierTache(task)}
                          className="edit-button"
                        >
                          Modifier
                        </button>
                        <button
                          onClick={() => supprimerTache(task.id)}
                          className="delete-button"
                        >
                          Supprimer
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default TaskList;

