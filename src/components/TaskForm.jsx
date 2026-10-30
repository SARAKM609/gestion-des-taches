import { useState, useEffect } from "react";

function TaskForm({ onSave, editTask, onCancel }) {
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("À faire");
  const [priority, setPriority] = useState("Moyenne");
  const [responsable, setResponsable] = useState("");

  useEffect(() => {
    if (editTask) {
      setTitle(editTask.title);
      setStartDate(editTask.startDate);
      setEndDate(editTask.endDate);
      setStatus(editTask.status);
      setPriority(editTask.priority);
      setResponsable(editTask.responsable);
    } else {
      setTitle("");
      setStartDate("");
      setEndDate("");
      setStatus("À faire");
      setPriority("Moyenne");
      setResponsable("");
    }
  }, [editTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !startDate || !endDate || !responsable.trim()) {
      alert("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    if (endDate < startDate) {
      alert("La date de fin ne peut pas être antérieure à la date de début.");
      return;
    }

    const newTask = {
      id: editTask ? editTask.id : Date.now(),
      title,
      startDate,
      endDate,
      status,
      priority,
      responsable,
    };

    onSave(newTask);
    setTitle("");
    setStartDate("");
    setEndDate("");
    setStatus("À faire");
    setPriority("Moyenne");
    setResponsable("");
  };

  return (
    <section className="card">
      <h2>{editTask ? "Modifier la tâche" : "Ajouter une tâche"}</h2>
      <form onSubmit={handleSubmit} className="form-grid">
        <div className="field full">
          <label>Titre de la tâche</label>
          <input
            type="text"
            placeholder="Ex : Créer un site web"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="field">
          <label>Date de début</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <div className="field">
          <label>Date de fin</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        <div className="field">
          <label>Statut</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="À faire">À faire</option>
            <option value="En cours">En cours</option>
            <option value="Terminée">Terminée</option>
          </select>
        </div>

        <div className="field">
          <label>Priorité</label>
          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="Basse">Basse</option>
            <option value="Moyenne">Moyenne</option>
            <option value="Haute">Haute</option>
          </select>
        </div>

        <div className="field full">
          <label>Responsable</label>
          <input
            type="text"
            placeholder="Nom du responsable"
            value={responsable}
            onChange={(e) => setResponsable(e.target.value)}
          />
        </div>

        <div className="form-buttons">
          <button type="submit" className="add-button">
            {editTask ? "Mettre à jour" : "Ajouter"}
          </button>
          {editTask && (
            <button type="button" onClick={onCancel} className="cancel-button">
              Annuler
            </button>
          )}
        </div>
      </form>
    </section>
  );
}

export default TaskForm;
